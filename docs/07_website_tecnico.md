# Website Tecnico, SEO e Performance

## 1. Objetivo

Este documento concentra o estado tecnico atual do website da Lusitania Medieval e define prioridades praticas de melhoria.

## 2. Estado Atual (27 de outubro de 2026)

### 2.1 Estrutura e Paginas

Paginas publicas indexaveis implementadas:

- 8 paginas em portugues na raiz;
- 8 paginas equivalentes em ingles sob `/en/`;
- uma pagina `404.html` partilhada, com localizacao dependente do caminho e `noindex, follow`.

O mapa completo de URLs e as regras de manutencao estao em `docs/08_website_versao_inglesa.md`.

### 2.2 SEO Tecnico Base

Ja implementado:

- title e meta description por pagina
- canonical por pagina
- `hreflang` reciproco `pt-PT`, `en` e `x-default` nos 16 HTML indexaveis
- `og:locale` e locale alternativo por idioma
- Open Graph e Twitter cards
- JSON-LD localizado nas paginas principais e de servico
- robots.txt com referencia ao sitemap
- sitemap.xml com 16 URLs, namespace XHTML e alternancias linguisticas

### 2.3 Consentimento e Analytics

Ja implementado:

- Google tag com consent mode default denied
- Banner de cookies e preferencia persistida em localStorage
- Textos do banner selecionados por `document.documentElement.lang`
- A mesma decisao de consentimento e respeitada nos dois idiomas
- Ativacao de analytics apenas apos consentimento

### 2.4 Internacionalizacao

Ja implementado:

- portugues de Portugal mantido nas URLs de raiz;
- ingles internacional em `/en/`, com slugs ingleses estaveis;
- seletor `PT | EN` no cabecalho desktop e no menu mobile;
- recursos ingleses referenciados a partir da raiz (`/assets/`, `/css/`, `/js/`);
- homepage inglesa com formulario, validacao e mensagens localizadas;
- endpoints, nomes de campos e valores tecnicos das integracoes preservados;
- 404 inglesa ativada apenas quando o caminho comeca por `/en/`.

### 2.5 Imagens

Ja implementado:

- atributo loading em todas as tags img
- atributo decoding em todas as tags img
- fetchpriority alto na imagem principal das paginas de servico

Pendente critico:

- conversao de imagens legadas de portfolio para WebP

### 2.6 Validacao bilingue local

Concluido em 27 de outubro de 2026:

- `node scripts/validate-bilingual-site.js`: oito pares e auditoria global aprovados;
- 16 paginas indexaveis responderam com HTTP 200 e o atributo `lang` correto;
- crawl interno recursivo: 28 destinos, sem links ou fragmentos quebrados;
- 404 local validada em caminhos PT e EN, com HTTP 404 e conteudo localizado;
- seletor, menu mobile, consentimento persistente e formulario ingles validados sem submissao real;
- imagens lazy carregadas sem falhas;
- Lighthouse mobile PT: performance 60, acessibilidade 95, boas praticas 100 e SEO 100;
- Lighthouse mobile EN: performance 70, acessibilidade 95, boas praticas 100 e SEO 100;
- CLS: 0 em PT e 0,008 em EN, sem regressao relevante.

Os dois idiomas apresentam os mesmos achados Lighthouse de contraste e ordem de headings. Nao foram introduzidos pela versao inglesa e permanecem no backlog geral.

## 3. Backlog Prioritario

## P0 (Antes da publicacao bilingue)

1. Registar revisao editorial e juridica das tres paginas legais inglesas
2. Realizar uma submissao bem-sucedida e controlada do formulario ingles e validar conversoes
3. Publicar e validar deep links e 404 inglesa no dominio real
4. Submeter o sitemap e inspecionar URLs no Google Search Console

## P1 (Curto prazo)

1. Converter assets de portfolio legados em .png/.jpg para .webp
2. Definir imagem OG dedicada (1200x630) em vez do logo
3. Validar structured data no Rich Results Test
4. Corrigir os achados comuns de contraste e ordem de headings do Lighthouse

## P2 (Evolucao)

1. Criar FAQPage JSON-LD onde fizer sentido
2. Melhorar interligacao interna entre paginas de servico
3. Executar ciclo mensal de auditoria Lighthouse mobile + regressao

## 4. Checklist de Publicacao

Antes de cada release:

1. Confirmar sitemap.xml atualizado
2. Confirmar canonical, `hreflang` e meta description nos dois idiomas
3. Confirmar ausencia de links ou recursos quebrados em `/en/`
4. Confirmar banner de cookies e persistencia de consentimento nos dois idiomas
5. Confirmar revisao das paginas legais inglesas
6. Confirmar formulario e conversoes sem submissao duplicada
7. Confirmar desempenho mobile sem regressao relevante
8. Apos publicar, testar uma URL inexistente sob `/en/`

## 5. Comandos Uteis

Servidor local Node:

```bash
npx --yes http-server . -p 5500 -c-1
```

Servidor local Python:

```bash
python -m http.server 5500
```

Validacao estatica dos oito pares bilingues:

```bash
node scripts/validate-bilingual-site.js
```

## 6. Proxima Execucao Recomendada

Sequencia sugerida para concluir o lancamento bilingue:

1. Rever o texto legal ingles
2. Realizar uma submissao bem-sucedida e controlada do formulario
3. Publicar e validar 404, sitemap e URLs no dominio real
4. Submeter o sitemap no Google Search Console

## 7. QA Rapido para Lancamento de Campanha (Google Ads)

Executar antes de ativar ou escalar campanhas:

1. Abrir janela anonima e confirmar estado inicial de consentimento denied.
2. Submeter o formulario com cookies rejeitados e validar que NAO existe evento de conversao Ads.
3. Aceitar cookies, submeter o formulario com sucesso e validar 1 evento de conversao com send_to AW-1010499385/xjisCIbvv9McELn-6-ED.
4. Repetir submissao valida e confirmar que nao ocorre disparo duplicado por uma unica submissao.
5. Confirmar que o evento Meta Lead continua a disparar apenas no sucesso.
6. Validar no Tag Assistant (ou DevTools Network) que nao existem erros de tag/consentimento.
7. Fazer teste rapido em mobile e desktop para garantir que o fluxo de formulario nao regrediu.
