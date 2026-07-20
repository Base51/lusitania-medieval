# Website Tecnico, SEO e Performance

## 1. Objetivo

Este documento concentra o estado tecnico atual do website da Lusitania Medieval e define prioridades praticas de melhoria.

## 2. Estado Atual (Scan)

### 2.1 Estrutura e Paginas

Paginas publicas identificadas:

- index.html
- team-building.html
- casamentos.html
- eventos.html
- politica-privacidade.html
- termos-condicoes.html
- livro-reclamacoes.html
- 404.html

### 2.2 SEO Tecnico Base

Ja implementado:

- title e meta description por pagina
- canonical por pagina
- Open Graph e Twitter cards
- JSON-LD nas paginas principais
- robots.txt com referencia ao sitemap
- sitemap.xml com paginas principais e legais

### 2.3 Consentimento e Analytics

Ja implementado:

- Google tag com consent mode default denied
- Banner de cookies e preferencia persistida em localStorage
- Ativacao de analytics apenas apos consentimento

### 2.4 Imagens

Ja implementado:

- atributo loading em todas as tags img
- atributo decoding em todas as tags img
- fetchpriority alto na imagem principal das paginas de servico

Pendente critico:

- conversao de imagens legadas de portfolio para WebP

## 3. Backlog Prioritario

## P0 (Impacto imediato)

1. Converter assets de portfolio em .png/.jpg para .webp
2. Atualizar referencias HTML para os novos ficheiros
3. Definir width e height nas imagens acima da dobra para reduzir CLS

## P1 (Curto prazo)

1. Definir imagem OG dedicada (1200x630) em vez do logo
2. Rever links placeholder (exemplo: Facebook com href="#")
3. Validar structured data no Rich Results Test

## P2 (Evolucao)

1. Criar FAQPage JSON-LD onde fizer sentido
2. Melhorar interligacao interna entre paginas de servico
3. Executar ciclo mensal de auditoria Lighthouse mobile + regressao

## 4. Checklist de Publicacao

Antes de cada release:

1. Confirmar sitemap.xml atualizado
2. Confirmar canonical e meta description nas paginas alteradas
3. Confirmar ausencia de links quebrados
4. Confirmar banner de cookies funcional
5. Confirmar desempenho mobile sem regressao relevante

## 5. Comandos Uteis

Servidor local Node:

```bash
npx --yes http-server . -p 5500 -c-1
```

Servidor local Python:

```bash
python -m http.server 5500
```

## 6. Proxima Execucao Recomendada

Sequencia sugerida para proxima iteracao:

1. Converter imagens de portfolio para WebP
2. Atualizar caminhos no HTML
3. Inserir width/height nas imagens criticas
4. Rodar auditoria Lighthouse mobile e corrigir os 3 piores pontos

## 7. QA Rapido para Lancamento de Campanha (Google Ads)

Executar antes de ativar ou escalar campanhas:

1. Abrir janela anonima e confirmar estado inicial de consentimento denied.
2. Submeter o formulario com cookies rejeitados e validar que NAO existe evento de conversao Ads.
3. Aceitar cookies, submeter o formulario com sucesso e validar 1 evento de conversao com send_to AW-1010499385/xjisCIbvv9McELn-6-ED.
4. Repetir submissao valida e confirmar que nao ocorre disparo duplicado por uma unica submissao.
5. Confirmar que o evento Meta Lead continua a disparar apenas no sucesso.
6. Validar no Tag Assistant (ou DevTools Network) que nao existem erros de tag/consentimento.
7. Fazer teste rapido em mobile e desktop para garantir que o fluxo de formulario nao regrediu.
