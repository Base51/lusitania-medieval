# Plano de Implementação da Versão Inglesa

## 1. Estado do Documento

- Estado: planeado
- Data da decisão: 13 de outubro de 2026
- Idioma de origem: português de Portugal (`pt-PT`)
- Idioma de destino: inglês internacional (`en`)
- Alojamento: GitHub Pages com domínio próprio
- Estratégia escolhida: páginas HTML estáticas em `/en/`

Este documento define o âmbito, a arquitetura, a sequência de trabalho, os requisitos de SEO e os critérios de aceitação para lançar uma versão inglesa completa do website Lusitania Medieval.

## 2. Objetivo

Disponibilizar uma experiência inglesa completa, indexável e funcional sem alterar as URLs portuguesas existentes nem introduzir uma nova plataforma de publicação.

O lançamento será considerado bem-sucedido quando:

1. As oito páginas públicas portuguesas tiverem uma versão inglesa equivalente.
2. O utilizador conseguir alternar diretamente entre versões equivalentes de cada página.
3. Cada versão tiver conteúdo, metadados e dados estruturados no idioma correto.
4. Os pares de páginas estiverem ligados por `hreflang` recíproco.
5. Formulário, consentimento, analytics e navegação continuarem funcionais.
6. O sitemap apresentar as 16 páginas indexáveis sem URLs quebradas.
7. A versão portuguesa não sofrer alterações de URL nem perda dos seus sinais canónicos.

## 3. Decisão de Arquitetura

### 3.1 Solução escolhida

Manter o website estático atual e criar oito páginas adicionais dentro do diretório `/en/`.

Esta solução foi escolhida porque:

- o site tem poucas páginas;
- as atualizações de conteúdo são ocasionais;
- o GitHub Pages serve HTML estático sem configuração adicional;
- todas as páginas inglesas ficam diretamente rastreáveis;
- não exige migração, dependências ou pipeline de build;
- preserva integralmente as URLs portuguesas existentes.

### 3.2 Alternativas não adotadas

| Alternativa | Motivo para não adotar nesta fase |
|---|---|
| Tradução por JavaScript, query string ou fragmento | Não cria URLs linguísticas robustas e torna indexação, partilha e canonicalização menos previsíveis. |
| Subdomínio ou domínio separado | Fragmenta autoridade, acrescenta configuração e aumenta a manutenção. |
| Gerador estático com templates | Resolve duplicação, mas o custo de migração não se justifica ainda para dois idiomas e alterações ocasionais. |
| Migração do português para `/pt/` | Alteraria URLs estabelecidas e exigiria redirecionamentos permanentes que não fazem parte desta fase. |

### 3.3 Limite da decisão

A arquitetura estática deve ser reavaliada quando ocorrer pelo menos uma destas condições:

- entrada de um terceiro idioma;
- publicação frequente de novas páginas ou artigos;
- alterações recorrentes em cabeçalho, rodapé ou componentes comuns;
- divergências frequentes entre as versões portuguesa e inglesa;
- várias pessoas passam a editar conteúdo regularmente;
- necessidade de CMS ou aprovação editorial estruturada.

Nessa situação, a opção preferencial será avaliar Eleventy, mantendo as mesmas URLs públicas e produzindo HTML estático.

## 4. Âmbito

### 4.1 Incluído

- oito páginas inglesas indexáveis;
- seletor de idioma no cabeçalho desktop e no menu mobile;
- tradução de conteúdo, navegação, rodapé, CTAs e acessibilidade;
- tradução de títulos, descrições, Open Graph e Twitter Cards;
- localização de JSON-LD e breadcrumbs;
- `canonical`, `hreflang` e `x-default` em todos os pares;
- tradução do formulário e das mensagens dinâmicas;
- banner de cookies bilingue;
- experiência inglesa para erros 404 sob `/en/`;
- sitemap bilingue;
- documentação de manutenção e publicação;
- validação funcional, SEO, acessibilidade e desempenho.

### 4.2 Não incluído

- alteração do design geral do website;
- migração para `/pt/`;
- deteção automática por idioma do navegador ou localização;
- redirecionamento automático entre idiomas;
- CMS, framework frontend ou gerador estático;
- terceiro idioma;
- nova identidade visual ou novos recursos gráficos;
- reformulação ampla do formulário ou das integrações externas;
- correção de itens não relacionados do backlog técnico;
- dimensão personalizada de idioma em analytics.

## 5. Mapa de URLs

| Página | Português | Inglês |
|---|---|---|
| Início | `https://lusitaniamedieval.com/` | `https://lusitaniamedieval.com/en/` |
| Sobre nós | `/sobre-nos.html` | `/en/about-us.html` |
| Team building | `/team-building.html` | `/en/team-building.html` |
| Casamentos | `/casamentos.html` | `/en/weddings.html` |
| Eventos | `/eventos.html` | `/en/events.html` |
| Termos e condições | `/termos-condicoes.html` | `/en/terms-and-conditions.html` |
| Política de privacidade | `/politica-privacidade.html` | `/en/privacy-policy.html` |
| Livro de reclamações | `/livro-reclamacoes.html` | `/en/complaints-book.html` |

Regras:

1. As URLs portuguesas permanecem inalteradas.
2. Os slugs ingleses são traduzidos e estáveis.
3. A homepage inglesa utiliza `/en/`, não `/en/index.html`, como URL pública e canónica.
4. Links internos ingleses utilizam caminhos absolutos a partir da raiz, por exemplo `/en/events.html`.
5. Recursos partilhados nas páginas inglesas utilizam `/assets/`, `/css/` e `/js/` para não depender da profundidade da página.
6. Não são criadas variantes duplicadas com parâmetros como `?lang=en`.

## 6. Requisitos de Conteúdo

### 6.1 Variante linguística

Usar inglês internacional, com vocabulário claro para clientes empresariais, casais, municípios e organizadores de eventos internacionais.

O atributo HTML será:

```html
<html lang="en">
```

Não usar `en-US` ou `en-GB` no `hreflang`, porque a página não está limitada a um único mercado regional. Quando for necessário um locale regional no Open Graph, usar `en_GB`, mantendo o conteúdo editorial internacional.

### 6.2 Princípios de tradução

- traduzir intenção e proposta de valor, não apenas palavras isoladas;
- preservar o posicionamento premium e a autoridade histórica;
- usar terminologia consistente em todas as páginas;
- evitar tradução literal de expressões comerciais portuguesas;
- não inventar certificações, capacidades, áreas de atuação ou garantias;
- manter nomes legais, NIF, contactos e destinos oficiais sem alteração;
- adaptar títulos e descrições à pesquisa em inglês sem repetição artificial de palavras-chave.

### 6.3 Conteúdo que deve ser localizado

- títulos e texto visível;
- navegação desktop e mobile;
- CTAs e botões;
- formulário, ajuda, validação e mensagens de estado;
- consentimento de marketing;
- banner e gestão de cookies;
- rodapé e links legais;
- atributos `alt`, `title`, `aria-label` e outros textos acessíveis;
- `title` e `meta description`;
- Open Graph e Twitter Cards;
- nomes, descrições e breadcrumbs no JSON-LD;
- fragmentos da homepage e os respetivos links;
- mensagens da página 404.

### 6.4 Conteúdo sujeito a revisão

As versões inglesas de Termos e Condições, Política de Privacidade e Livro de Reclamações exigem revisão do responsável do negócio e, quando aplicável, validação jurídica antes da publicação.

Não adicionar uma cláusula que declare uma versão linguística como prevalecente sem aprovação explícita.

## 7. Especificação da Interface

### 7.1 Seletor de idioma

Adicionar um controlo compacto `PT | EN` ao cabeçalho desktop e ao menu mobile.

Requisitos:

- cada opção aponta diretamente para a página equivalente;
- a versão ativa utiliza `aria-current="page"`;
- os links incluem `lang` e `hreflang` adequados;
- existe um nome acessível, mesmo que visualmente sejam mostradas apenas as siglas;
- o controlo pode ser utilizado por teclado;
- foco, hover e contraste seguem o design existente;
- o controlo não desloca o CTA nem colide com o botão do menu mobile;
- não existe redirecionamento automático nem preferência obrigatória em `localStorage`.

Exemplo conceptual numa página portuguesa:

```html
<nav class="language-switcher" aria-label="Selecionar idioma">
  <a href="/eventos.html" lang="pt-PT" hreflang="pt-PT" aria-current="page">PT</a>
  <a href="/en/events.html" lang="en" hreflang="en">EN</a>
</nav>
```

### 7.2 Caminhos e recursos

Uma cópia literal de uma página raiz para `/en/` quebraria referências como `css/styles.css` e `assets/...`.

Nas páginas inglesas, usar:

```html
<link rel="stylesheet" href="/css/styles.css">
<script src="/js/main.js"></script>
<img src="/assets/img/brand/logo_dark_theme.png" alt="Lusitania Medieval">
```

### 7.3 Banner de cookies

Centralizar em `js/cookie-consent.js` um pequeno dicionário PT/EN selecionado por `document.documentElement.lang`.

Manter:

- a mesma chave de consentimento em `localStorage` para ambos os idiomas;
- a lógica atual de Google Consent Mode;
- os mesmos estados `granted` e `denied`;
- o comportamento atual de GA, Ads e Meta Pixel.

O consentimento já dado numa língua deve ser respeitado na outra.

### 7.4 Formulário

A homepage inglesa reutiliza os endpoints atuais de Formspree e Make.

Regras de compatibilidade:

- traduzir labels, ajuda, placeholders, estados e mensagens de erro/sucesso;
- preservar os nomes dos campos enviados;
- preservar os valores técnicos atuais das opções quando forem consumidos pelas integrações;
- preservar normalização e validação internacional do telefone;
- preservar o disparo de conversão apenas após sucesso;
- não ativar nem refatorar o handler antigo de `mailto` em `js/main.js` sem evidência de que é necessário;
- realizar apenas uma submissão controlada aos endpoints reais durante a validação final.

### 7.5 Página 404

Manter `404.html` na raiz como fallback do GitHub Pages.

Quando `window.location.pathname` começar por `/en/`, a página deve apresentar conteúdo, links e atributo `lang` em inglês. Nos restantes caminhos, apresenta português de Portugal.

Requisitos permanentes:

- `noindex, follow`;
- ausência no sitemap;
- CTA para a homepage do idioma correto;
- links de navegação válidos;
- teste no ambiente publicado, porque o comportamento de fallback não é totalmente reproduzido por todos os servidores locais.

## 8. Especificação SEO

### 8.1 Canonical

Cada página é canónica para si própria.

Exemplo português:

```html
<link rel="canonical" href="https://lusitaniamedieval.com/eventos.html">
```

Exemplo inglês:

```html
<link rel="canonical" href="https://lusitaniamedieval.com/en/events.html">
```

Nunca apontar o canonical inglês para a página portuguesa.

### 8.2 Hreflang

Cada página indexável inclui o mesmo conjunto completo e recíproco:

```html
<link rel="alternate" hreflang="pt-PT" href="https://lusitaniamedieval.com/eventos.html">
<link rel="alternate" hreflang="en" href="https://lusitaniamedieval.com/en/events.html">
<link rel="alternate" hreflang="x-default" href="https://lusitaniamedieval.com/eventos.html">
```

Regras:

1. A página inclui uma referência para si própria.
2. A contraparte inclui exatamente o mesmo conjunto.
3. `x-default` aponta para a versão portuguesa correspondente.
4. URLs são absolutas, HTTPS e canónicas.
5. A 404 não recebe `hreflang`.

### 8.3 Metadados sociais

Cada versão deve ter `og:url`, `og:title`, `og:description`, Twitter title e Twitter description coerentes com o respetivo idioma.

Locales definidos:

- páginas portuguesas: `og:locale="pt_PT"` e alternate `en_GB`;
- páginas inglesas: `og:locale="en_GB"` e alternate `pt_PT`.

A imagem social pode continuar partilhada enquanto não existir uma imagem OG específica por idioma.

### 8.4 Dados estruturados

Nas páginas inglesas:

- traduzir nomes, descrições e breadcrumbs;
- usar a URL inglesa da página;
- adicionar ou atualizar `inLanguage` para `en` onde o tipo Schema.org o permitir;
- preservar contactos, morada, coordenadas e área real de atuação;
- preservar os identificadores estáveis da organização;
- referenciar a mesma entidade Lusitania Medieval, não criar uma organização duplicada por idioma.

### 8.5 Sitemap

Atualizar `sitemap.xml` para:

- declarar `xmlns:xhtml="http://www.w3.org/1999/xhtml"`;
- conter 16 valores `<loc>` únicos;
- repetir as três alternativas `pt-PT`, `en` e `x-default` em cada entrada;
- incluir a própria URL entre as alternativas;
- manter prioridades e frequências equivalentes entre cada par;
- excluir a 404.

### 8.6 Robots

`robots.txt` já contém `Allow: /`, que inclui `/en/`. Não é necessária uma regra adicional.

Confirmar apenas que continua a referenciar:

```text
Sitemap: https://lusitaniamedieval.com/sitemap.xml
```

## 9. Ficheiros Afetados

### 9.1 Novos ficheiros

- `en/index.html`
- `en/about-us.html`
- `en/team-building.html`
- `en/weddings.html`
- `en/events.html`
- `en/terms-and-conditions.html`
- `en/privacy-policy.html`
- `en/complaints-book.html`

### 9.2 Ficheiros modificados

| Ficheiro ou grupo | Alteração prevista |
|---|---|
| Oito páginas HTML portuguesas | Seletor de idioma, `hreflang`, locale social e metadados complementares. |
| `css/styles.css` | Estados e responsividade do seletor de idioma. |
| `js/cookie-consent.js` | Dicionário de textos PT/EN escolhido pelo atributo `lang`. |
| `404.html` | Conteúdo bilingue dependente do caminho pedido. |
| `sitemap.xml` | 16 URLs com alternates recíprocos. |
| `README.md` | Estrutura e manutenção bilingue. |
| `docs/07_website_tecnico.md` | Estado técnico e checklist após a implementação. |
| `docs/08_website_versao_inglesa.md` | Atualização do estado e registo das decisões finais. |

### 9.3 Ficheiros apenas verificados

- `robots.txt`, porque já permite o novo diretório;
- `js/main.js`, para confirmar que não existem textos executados sem tradução;
- imagens e ícones existentes, que serão reutilizados.

## 10. Plano de Execução

### Fase 0 — Preparação

1. Confirmar worktree limpo e criar um ponto de recuperação Git antes da implementação.
2. Para este marco substancial, criar uma tag descritiva de recuperação antes das alterações.
3. Fechar o mapa de URLs definido na secção 5.
4. Criar um glossário curto de marca, serviços e CTAs.
5. Definir intenções de pesquisa por página.
6. Preparar e rever a tradução, com circuito separado para páginas legais.

Saída: conteúdo aprovado e URLs congeladas.

### Fase 1 — Base partilhada

1. Implementar o seletor de idioma numa página representativa.
2. Adicionar estilos desktop e mobile.
3. Validar foco, contraste, alinhamento e ausência de sobreposição.
4. Aplicar o seletor às restantes páginas portuguesas.
5. Tornar o banner de cookies bilingue.

Saída: componentes partilhados prontos para reutilização.

### Fase 2 — Páginas inglesas

1. Criar `en/index.html` e validar todos os caminhos de recursos.
2. Traduzir e validar o formulário e as mensagens dinâmicas.
3. Criar as quatro páginas institucionais e comerciais restantes.
4. Criar as três páginas legais e submetê-las a revisão.
5. Validar links, fragmentos, CTAs e navegação dentro de `/en/`.

Saída: oito páginas inglesas navegáveis, ainda sem lançamento.

### Fase 3 — SEO técnico

1. Adicionar canonical próprio a todas as páginas inglesas.
2. Adicionar os conjuntos recíprocos de `hreflang` às 16 páginas.
3. Localizar títulos, descrições e metadados sociais.
4. Localizar JSON-LD e breadcrumbs.
5. Atualizar o sitemap.
6. Confirmar que nenhuma página indexável contém `noindex`.

Saída: cluster linguístico completo e rastreável.

### Fase 4 — Erros e documentação

1. Tornar a 404 sensível ao caminho `/en/`.
2. Atualizar a documentação técnica e o inventário do projeto.
3. Registar qualquer divergência aprovada entre os idiomas.

Saída: experiência de erro e manutenção documentadas.

### Fase 5 — QA e publicação

1. Executar testes automáticos locais.
2. Realizar QA visual desktop e mobile.
3. Validar consentimento e uma submissão controlada do formulário.
4. Executar Lighthouse nas duas homepages.
5. Publicar no GitHub Pages.
6. Testar deep links e 404 no domínio real.
7. Submeter o sitemap e inspecionar URLs no Google Search Console.

Saída: versão inglesa publicada e monitorizada.

### 10.1 Trabalho paralelo permitido

Após o glossário estar fechado, a tradução das páginas pode decorrer em paralelo com a implementação do seletor e do banner de cookies.

As seguintes tarefas devem permanecer sequenciais:

- fechar URLs antes de criar `hreflang` e sitemap;
- finalizar páginas antes do crawl completo;
- concluir revisão legal antes da publicação;
- publicar antes de validar fallback 404 e indexação no domínio real.

## 11. Critérios de Aceitação

### 11.1 Funcionais

- [ ] As oito URLs inglesas respondem com sucesso.
- [ ] Nenhum CSS, JavaScript, ícone ou imagem está quebrado em `/en/`.
- [ ] O seletor abre a página equivalente nos dois sentidos.
- [ ] Navegação e fragmentos funcionam em desktop e mobile.
- [ ] O banner de cookies mostra o idioma correto.
- [ ] Uma decisão de consentimento é mantida ao mudar de idioma.
- [ ] O formulário inglês valida, envia e mostra estados em inglês.
- [ ] Conversões são disparadas apenas após submissão bem-sucedida e consentida.
- [ ] A 404 apresenta o idioma esperado para caminhos ingleses e portugueses.

### 11.2 SEO

- [ ] Existem 16 URLs indexáveis únicas no sitemap.
- [ ] Cada página tem exatamente um canonical próprio.
- [ ] Cada página tem `pt-PT`, `en` e `x-default` recíprocos.
- [ ] O atributo `lang` corresponde ao conteúdo.
- [ ] Títulos e descrições são únicos e localizados.
- [ ] `og:url` corresponde à URL canónica.
- [ ] JSON-LD usa idioma, URL e breadcrumbs corretos.
- [ ] Não existem canonicals ingleses apontados para português.
- [ ] A 404 permanece `noindex, follow` e fora do sitemap.
- [ ] `robots.txt` não bloqueia `/en/`.

### 11.3 Qualidade

- [ ] Não existem textos portugueses residuais nas páginas inglesas, exceto nomes legais ou próprios.
- [ ] As páginas legais têm revisão registada.
- [ ] Não existem links internos quebrados.
- [ ] Não existem sobreposições no cabeçalho entre 320 px e desktop largo.
- [ ] Navegação por teclado e foco visível funcionam.
- [ ] Lighthouse da homepage inglesa permanece materialmente equivalente ao da portuguesa.
- [ ] Não há regressão relevante de CLS ou tempo de carregamento.

## 12. Validação Técnica

### 12.1 Servidor local

```bash
npx --yes http-server . -p 5500 -c-1
```

URLs mínimas:

- `http://127.0.0.1:5500/`
- `http://127.0.0.1:5500/en/`
- `http://127.0.0.1:5500/eventos.html`
- `http://127.0.0.1:5500/en/events.html`

### 12.2 Crawl de links

```bash
npx --yes linkinator http://127.0.0.1:5500 --recurse
```

Falhas exclusivamente externas devem ser separadas de falhas em páginas, recursos e fragmentos internos.

### 12.3 Validações adicionais

1. Analisar `sitemap.xml` como XML e confirmar 16 `<loc>` únicos.
2. Auditar cada HTML para um canonical e três alternates.
3. Validar homepage e uma página de serviço de cada idioma no Schema.org Validator ou Rich Results Test.
4. Executar Lighthouse mobile em `/` e `/en/`.
5. Testar o formulário localmente sem envio e realizar uma única submissão real identificada como teste.
6. Confirmar no Tag Assistant ou no separador Network que consentimento e eventos não disparam em duplicado.
7. Após publicar, testar diretamente uma URL inglesa inexistente para validar a 404.

## 13. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Conteúdo PT e EN fica dessincronizado | Médio | Checklist obrigatório para alterar sempre o par correspondente. |
| Recursos quebrados em `/en/` | Alto | Usar caminhos a partir da raiz e executar crawl completo. |
| `hreflang` incompleto ou não recíproco | Alto | Gerar matriz de pares e validar automaticamente as 16 páginas. |
| Canonical inglês aponta para PT | Alto | Regra de self-canonical e auditoria antes do lançamento. |
| Tradução legal incorreta | Alto | Bloquear publicação até revisão do responsável. |
| Formulário altera o contrato com Make/Formspree | Alto | Preservar nomes e valores técnicos; executar submissão controlada. |
| Seletor colide com navegação mobile | Médio | Validar larguras desde 320 px e ambos os estados do menu. |
| 404 inglesa não funciona como esperado no GitHub Pages | Médio | Testar no domínio publicado antes de anunciar o lançamento. |
| Manutenção manual torna-se excessiva | Médio | Reavaliar templates quando forem atingidos os gatilhos da secção 3.3. |

## 14. Publicação e Rollback

### 14.1 Publicação

1. Confirmar todos os critérios de aceitação.
2. Criar commit dedicado à versão bilingue.
3. Publicar através do processo atual do GitHub Pages.
4. Validar o domínio real antes de divulgar as novas URLs.
5. Submeter o sitemap atualizado no Google Search Console.

### 14.2 Rollback

Se existir uma regressão crítica após a publicação:

1. regressar ao commit ou tag de recuperação criado na Fase 0;
2. confirmar que as páginas portuguesas e o sitemap anterior voltaram ao estado funcional;
3. corrigir a versão inglesa numa branch separada;
4. repetir QA antes de nova publicação.

Não remover apenas os `hreflang` portugueses mantendo URLs inglesas parcialmente publicadas. O rollback deve preservar a consistência entre páginas, alternates e sitemap.

## 15. Monitorização Após o Lançamento

### Primeiras 24 horas

- confirmar respostas HTTP e recursos no domínio real;
- verificar formulário e consentimento;
- confirmar sitemap acessível;
- inspecionar `/en/` no Google Search Console.

### Primeiras 2 a 4 semanas

- acompanhar indexação das oito páginas inglesas;
- verificar seleção incorreta de idioma nos resultados;
- procurar avisos de canonical ou duplicação;
- acompanhar consultas, impressões e cliques em inglês;
- comparar leads por caminho `/en/`;
- corrigir termos de pesquisa sem alterar URLs.

O `hreflang` ajuda a apresentar a versão correta, mas não aumenta ranking por si só. O crescimento orgânico inglês dependerá da qualidade do conteúdo, intenção de pesquisa, ligações internas, autoridade e referências externas.

## 16. Estimativa e Dependências

### Estimativa inicial

- implementação e QA técnico: 1 a 2 dias de trabalho focado;
- tradução, revisão editorial e validação legal: 1 a 2 dias, dependente da disponibilidade dos revisores;
- monitorização: acompanhamento leve durante as primeiras 2 a 4 semanas.

### Dependências de lançamento

- tradução final aprovada;
- revisão das páginas legais;
- acesso ao processo de publicação do GitHub Pages;
- acesso ao Google Search Console para submissão e inspeção;
- janela para uma submissão controlada do formulário.

## 17. Regra de Manutenção

Qualquer alteração futura a conteúdo, navegação, metadados ou estrutura deve responder a estas perguntas antes do merge:

1. Existe uma página equivalente no outro idioma?
2. O conteúdo equivalente também precisa de atualização?
3. Canonical, `hreflang`, Open Graph e JSON-LD continuam coerentes?
4. O sitemap precisa de alteração?
5. A mudança afeta formulário, consentimento ou analytics?
6. A alteração foi validada em desktop e mobile nos dois idiomas?

A versão bilingue deve ser tratada como uma única funcionalidade distribuída por dois conjuntos de páginas, não como dois websites independentes.