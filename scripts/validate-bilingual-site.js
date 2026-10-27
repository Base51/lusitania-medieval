const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const origin = 'https://lusitaniamedieval.com';
const pairs = [
  ['index.html', 'en/index.html', `${origin}/`, `${origin}/en/`],
  ['sobre-nos.html', 'en/about-us.html', `${origin}/sobre-nos.html`, `${origin}/en/about-us.html`],
  ['team-building.html', 'en/team-building.html', `${origin}/team-building.html`, `${origin}/en/team-building.html`],
  ['casamentos.html', 'en/weddings.html', `${origin}/casamentos.html`, `${origin}/en/weddings.html`],
  ['eventos.html', 'en/events.html', `${origin}/eventos.html`, `${origin}/en/events.html`],
  ['termos-condicoes.html', 'en/terms-and-conditions.html', `${origin}/termos-condicoes.html`, `${origin}/en/terms-and-conditions.html`],
  ['politica-privacidade.html', 'en/privacy-policy.html', `${origin}/politica-privacidade.html`, `${origin}/en/privacy-policy.html`],
  ['livro-reclamacoes.html', 'en/complaints-book.html', `${origin}/livro-reclamacoes.html`, `${origin}/en/complaints-book.html`]
];

const errors = [];
const pageCache = new Map();
const pageResults = new Map();

function report(file, message) {
  errors.push(`${file}: ${message}`);
}

function read(relativePath) {
  if (!pageCache.has(relativePath)) {
    pageCache.set(relativePath, fs.readFileSync(path.join(root, relativePath), 'utf8'));
  }
  return pageCache.get(relativePath);
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];
}

function attributes(tag) {
  const result = {};
  const pattern = /([:@\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let match;
  while ((match = pattern.exec(tag))) {
    result[match[1].toLowerCase()] = match[2] ?? match[3];
  }
  return result;
}

function one(values, file, label) {
  if (values.length !== 1) {
    report(file, `expected one ${label}, found ${values.length}`);
    return null;
  }
  return values[0];
}

function localTarget(sourceFile, reference) {
  const [withoutQuery, fragment = ''] = reference.split('#', 2);
  const cleanPath = withoutQuery.split('?', 1)[0];
  let targetPath;

  if (!cleanPath) {
    targetPath = sourceFile;
  } else if (cleanPath.startsWith('/')) {
    targetPath = cleanPath.slice(1);
  } else {
    targetPath = path.posix.join(path.posix.dirname(sourceFile), cleanPath);
  }

  if (!targetPath || targetPath.endsWith('/')) {
    targetPath += 'index.html';
  }

  return { targetPath: path.posix.normalize(targetPath), fragment };
}

function validateLocalReference(file, reference) {
  if (!reference || /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(reference)) {
    return;
  }

  if (reference === '#') {
    report(file, 'contains an empty fragment link');
    return;
  }

  const { targetPath, fragment } = localTarget(file, reference);
  const absoluteTarget = path.join(root, ...targetPath.split('/'));
  if (!fs.existsSync(absoluteTarget) || !fs.statSync(absoluteTarget).isFile()) {
    report(file, `broken local reference ${reference} -> ${targetPath}`);
    return;
  }

  if (fragment && targetPath.toLowerCase().endsWith('.html')) {
    const targetHtml = read(targetPath);
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`\\bid=(?:"${escaped}"|'${escaped}')`).test(targetHtml)) {
      report(file, `missing fragment #${fragment} in ${targetPath}`);
    }
  }
}

function validateReferences(file, html) {
  const referenceTags = html.match(/<(?:a|link|script|img|source|video)\b[^>]*>/gi) || [];
  for (const tag of referenceTags) {
    const attrs = attributes(tag);
    for (const attribute of ['href', 'src', 'poster']) {
      if (attrs[attribute]) {
        validateLocalReference(file, attrs[attribute]);
      }
    }
  }
}

function validateJsonAndScripts(file, html) {
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const attrs = attributes(`<script ${match[1]}>`);
    if (attrs.src) continue;
    if ((attrs.type || '').toLowerCase() === 'application/ld+json') {
      try {
        JSON.parse(match[2]);
      } catch (error) {
        report(file, `invalid JSON-LD: ${error.message}`);
      }
      continue;
    }
    try {
      new vm.Script(match[2], { filename: file });
    } catch (error) {
      report(file, `invalid inline JavaScript: ${error.message}`);
    }
  }
}

function validatePage(file, language, selfUrl, ptUrl, enUrl) {
  const html = read(file);
  const htmlTag = one(tags(html, 'html'), file, 'html element');
  if (htmlTag && attributes(htmlTag).lang !== language) {
    report(file, `lang must be ${language}`);
  }

  const linkTags = tags(html, 'link').map(attributes);
  const canonicals = linkTags.filter((attrs) => attrs.rel === 'canonical');
  const canonical = one(canonicals, file, 'canonical');
  if (canonical && canonical.href !== selfUrl) {
    report(file, `canonical is ${canonical.href}, expected ${selfUrl}`);
  }

  const expectedAlternates = new Map([
    ['pt-PT', ptUrl],
    ['en', enUrl],
    ['x-default', ptUrl]
  ]);
  const alternates = linkTags.filter((attrs) => attrs.rel === 'alternate' && attrs.hreflang);
  if (alternates.length !== 3) {
    report(file, `expected 3 hreflang links, found ${alternates.length}`);
  }
  for (const [hreflang, expectedUrl] of expectedAlternates) {
    const matches = alternates.filter((attrs) => attrs.hreflang === hreflang);
    if (matches.length !== 1 || matches[0].href !== expectedUrl) {
      report(file, `invalid ${hreflang} alternate`);
    }
  }

  const metaTags = tags(html, 'meta').map(attributes);
  const meta = (attribute, value) => metaTags.filter((attrs) => attrs[attribute] === value);
  const description = one(meta('name', 'description'), file, 'meta description');
  if (description && !description.content.trim()) report(file, 'empty meta description');

  const ogUrl = one(meta('property', 'og:url'), file, 'og:url');
  if (ogUrl && ogUrl.content !== selfUrl) report(file, `og:url is not self-referencing`);

  const expectedLocale = language === 'en' ? 'en_GB' : 'pt_PT';
  const expectedAlternateLocale = language === 'en' ? 'pt_PT' : 'en_GB';
  const ogLocale = one(meta('property', 'og:locale'), file, 'og:locale');
  const ogLocaleAlternate = one(meta('property', 'og:locale:alternate'), file, 'og:locale:alternate');
  if (ogLocale && ogLocale.content !== expectedLocale) report(file, `og:locale must be ${expectedLocale}`);
  if (ogLocaleAlternate && ogLocaleAlternate.content !== expectedAlternateLocale) {
    report(file, `og:locale:alternate must be ${expectedAlternateLocale}`);
  }

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) report(file, 'missing or empty title');

  const switchers = tags(html, 'nav').map(attributes)
    .filter((attrs) => (attrs.class || '').split(/\s+/).includes('language-switcher'));
  if (switchers.length !== 2) report(file, `expected 2 language switchers, found ${switchers.length}`);

  const currentLinks = tags(html, 'a').map(attributes).filter((attrs) => attrs['aria-current'] === 'page');
  const expectedPath = new URL(selfUrl).pathname;
  if (currentLinks.length !== 2 || currentLinks.some((attrs) => attrs.href !== expectedPath)) {
    report(file, `active language links must point to ${expectedPath} exactly twice`);
  }

  for (const id of ['G-KWH7E5N39M', 'AW-1010499385', '979892094871998']) {
    if (!html.includes(id)) report(file, `missing integration ID ${id}`);
  }

  if (language === 'en') {
    const forbidden = [
      'Sobre N\u00f3s',
      'Servi\u00e7os',
      'Pedir Proposta',
      'Navega\u00e7\u00e3o',
      'Todos os direitos reservados',
      'Pol\u00edtica de Privacidade',
      'Termos e Condi\u00e7\u00f5es',
      'Livro de Reclama\u00e7\u00f5es',
      'Voltar ao In\u00edcio',
      'Contacto'
    ];
    for (const phrase of forbidden) {
      if (html.includes(phrase)) report(file, `residual Portuguese UI text: ${phrase}`);
    }
  }

  validateReferences(file, html);
  validateJsonAndScripts(file, html);
  pageResults.set(file, {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: description ? description.content.trim() : '',
    alternates: [...expectedAlternates.entries()]
  });
}

function valuesFrom(html, tagName, attributeName) {
  return tags(html, tagName).map(attributes).map((attrs) => attrs[attributeName]).filter((value) => value !== undefined).sort();
}

function validateHomepageContract() {
  const pt = read('index.html');
  const en = read('en/index.html');
  for (const endpoint of [
    'https://formspree.io/f/xvzbkdvd',
    'https://hook.eu1.make.com/51jdg64waukyzfnciddstq9sdln4jr7s'
  ]) {
    if (!pt.includes(endpoint)) report('index.html', `missing endpoint ${endpoint}`);
    if (!en.includes(endpoint)) report('en/index.html', `missing endpoint ${endpoint}`);
  }

  const formPattern = /<form\b[^>]*id="contactForm"[^>]*>([\s\S]*?)<\/form>/i;
  const ptForm = pt.match(formPattern);
  const enForm = en.match(formPattern);
  if (!ptForm || !enForm) {
    report('homepage pair', 'contactForm missing');
    return;
  }

  const formTags = ['input', 'select', 'textarea'];
  const names = (formHtml) => formTags.flatMap((tagName) => valuesFrom(formHtml, tagName, 'name')).sort();
  if (JSON.stringify(names(ptForm[1])) !== JSON.stringify(names(enForm[1]))) {
    report('homepage pair', 'submitted field names differ');
  }

  if (JSON.stringify(valuesFrom(ptForm[1], 'option', 'value')) !== JSON.stringify(valuesFrom(enForm[1], 'option', 'value'))) {
    report('homepage pair', 'technical option values differ');
  }
}

function validateSitemap() {
  const file = 'sitemap.xml';
  const xml = read(file);
  if (!xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) report(file, 'missing XHTML namespace');
  if ((xml.match(/<urlset\b/g) || []).length !== 1 || (xml.match(/<\/urlset>/g) || []).length !== 1) {
    report(file, 'invalid urlset root count');
  }

  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  if (blocks.length !== 16) report(file, `expected 16 url entries, found ${blocks.length}`);

  const expectedUrls = new Set(pairs.flatMap((pair) => [pair[2], pair[3]]));
  const foundUrls = [];
  const blockByLoc = new Map();
  for (const block of blocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) {
      report(file, 'url entry without loc');
      continue;
    }
    foundUrls.push(locMatch[1]);
    blockByLoc.set(locMatch[1], block);
  }
  if (new Set(foundUrls).size !== foundUrls.length) report(file, 'duplicate loc entries');
  for (const expected of expectedUrls) {
    if (!blockByLoc.has(expected)) report(file, `missing loc ${expected}`);
  }
  for (const actual of foundUrls) {
    if (!expectedUrls.has(actual)) report(file, `unexpected loc ${actual}`);
  }

  for (const [, , ptUrl, enUrl] of pairs) {
    const expected = new Map([['pt-PT', ptUrl], ['en', enUrl], ['x-default', ptUrl]]);
    for (const selfUrl of [ptUrl, enUrl]) {
      const block = blockByLoc.get(selfUrl);
      if (!block) continue;
      const alternateTags = tags(block, 'xhtml:link').map(attributes);
      if (alternateTags.length !== 3) report(file, `${selfUrl} must have 3 alternates`);
      for (const [hreflang, href] of expected) {
        const matches = alternateTags.filter((attrs) => attrs.hreflang === hreflang && attrs.href === href);
        if (matches.length !== 1) report(file, `${selfUrl} has invalid ${hreflang} alternate`);
      }
    }

    const ptBlock = blockByLoc.get(ptUrl) || '';
    const enBlock = blockByLoc.get(enUrl) || '';
    for (const element of ['changefreq', 'priority']) {
      const pattern = new RegExp(`<${element}>([^<]+)<\\/${element}>`);
      if (ptBlock.match(pattern)?.[1] !== enBlock.match(pattern)?.[1]) {
        report(file, `${element} differs for ${ptUrl} and ${enUrl}`);
      }
    }
  }

  if (xml.includes('/404.html')) report(file, '404 must not be listed');
}

function validate404() {
  const file = '404.html';
  const html = read(file);
  if (!/<html\s+lang="pt-PT">/i.test(html)) report(file, 'default lang must be pt-PT');
  if (!/<meta\s+name="robots"\s+content="noindex, follow">/i.test(html)) report(file, 'robots must be noindex, follow');
  if ((html.match(/rel="canonical"/g) || []).length !== 1 || !html.includes(`${origin}/404.html`)) {
    report(file, 'invalid canonical');
  }
  if (/hreflang=/i.test(html)) report(file, 'must not contain hreflang');
  if (!html.includes("window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')")) {
    report(file, 'missing /en/ path detection');
  }
  if (html.indexOf('const isEnglish') > html.indexOf('<script src="/js/cookie-consent.js">')) {
    report(file, 'language localization must run before cookie consent');
  }
  for (const expected of ['Page not found', 'data-href-en="/en/"', 'data-href-en="/en/privacy-policy.html"']) {
    if (!html.includes(expected)) report(file, `missing English 404 value ${expected}`);
  }
  validateReferences(file, html);
  validateJsonAndScripts(file, html);
}

for (const [ptFile, enFile, ptUrl, enUrl] of pairs) {
  validatePage(ptFile, 'pt-PT', ptUrl, ptUrl, enUrl);
  validatePage(enFile, 'en', enUrl, ptUrl, enUrl);
}

validateHomepageContract();
validateSitemap();
validate404();

const titles = new Map();
const descriptions = new Map();
for (const [file, result] of pageResults) {
  for (const [value, collection, label] of [
    [result.title, titles, 'title'],
    [result.description, descriptions, 'meta description']
  ]) {
    if (!value) continue;
    if (collection.has(value)) report(file, `duplicate ${label} also used by ${collection.get(value)}`);
    else collection.set(value, file);
  }
}

for (const [ptFile, enFile] of pairs) {
  const pairErrors = errors.filter((error) => error.startsWith(`${ptFile}:`) || error.startsWith(`${enFile}:`));
  console.log(`${ptFile} <-> ${enFile}: ${pairErrors.length ? 'FAIL' : 'PASS'}`);
}

if (errors.length) {
  console.error('\nValidation errors:');
  for (const error of errors) console.error(`- ${error}`);
  console.error(`\nGLOBAL STATIC AUDIT: FAIL (${errors.length} errors)`);
  process.exit(1);
}

console.log('\nGLOBAL STATIC AUDIT: PASS');