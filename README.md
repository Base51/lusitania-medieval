# Lusitânia Medieval

> Experiências medievais imersivas em Portugal para empresas, casamentos e eventos.

## Sobre

Website institucional da Lusitania Medieval com foco em:

- Team Building corporativo
- Casamentos medievais
- Feiras e eventos

O projeto privilegia posicionamento premium, SEO técnico e desempenho em mobile. O website está disponível em português de Portugal na raiz e em inglês internacional em `/en/`.

## Início Rápido

### Opção 1: servidor com Node (recomendado)

```bash
npx --yes http-server . -p 5500 -c-1
```

### Opção 2: servidor com Python

```bash
python -m http.server 5500
```

Depois, abrir `http://localhost:5500`.

### Validação estática bilingue

```bash
node scripts/validate-bilingual-site.js
```

O comando valida os oito pares PT/EN, SEO recíproco, JSON-LD, scripts, links, recursos, integrações, sitemap e 404 sem dependências adicionais.

## Páginas Principais

Português:

- `index.html` (home)
- `sobre-nos.html`
- `team-building.html`
- `casamentos.html`
- `eventos.html`
- `politica-privacidade.html`
- `termos-condicoes.html`
- `livro-reclamacoes.html`

Inglês:

- `en/index.html` (home pública em `/en/`)
- `en/about-us.html`
- `en/team-building.html`
- `en/weddings.html`
- `en/events.html`
- `en/privacy-policy.html`
- `en/terms-and-conditions.html`
- `en/complaints-book.html`

Partilhada:

- `404.html`

## Estrutura do Projeto

```text
lusitania-medieval/
├── assets/          # Imagens, ícones, fontes, vídeo
├── css/             # Estilos globais
├── js/              # Scripts (interações + consentimento cookies)
├── en/              # Oito páginas em inglês
├── docs/            # Documentação estratégica e técnica
├── robots.txt       # Regras de rastreamento
├── sitemap.xml      # Mapa do site
├── index.html
└── 404.html
```

## Estado Técnico Atual

- Metadados SEO base implementados (title, description, canonical, OG, Twitter)
- Pares PT/EN com `hreflang` recíproco e `x-default` para português
- Dados estruturados JSON-LD nas páginas principais
- Consent mode + banner de cookies bilingue com controlo de analytics
- `sitemap.xml` com 16 URLs e alternâncias linguísticas
- 404 única com conteúdo PT/EN selecionado pelo caminho pedido
- `loading` e `decoding` aplicados nas imagens

## Próximas Melhorias Prioritárias

1. Obter revisão editorial/jurídica das três páginas legais inglesas
2. Realizar uma única submissão bem-sucedida e controlada do formulário inglês com validação das conversões
3. Criar o commit de lançamento, publicar e validar deep links e a 404 no GitHub Pages
4. Submeter o sitemap e inspecionar as URLs inglesas no Google Search Console

## Documentação

Consultar a pasta `docs/`:

- [Identidade](docs/01_identidade.md)
- [Modelo de Negócio](docs/02_modelo_negocio.md)
- [Plano Financeiro](docs/03_plano_financeiro.md)
- [Marketing](docs/04_marketing.md)
- [Operações](docs/05_operacoes.md)
- [Candidaturas](docs/06_candidaturas.md)
- [Website Técnico e SEO](docs/07_website_tecnico.md)
- [Implementação da Versão Inglesa](docs/08_website_versao_inglesa.md)
- [Documento Mestre](docs/Lusitania_Medieval_Documento_Mestre_Completo_v1.0.md)

## Licença

Este projeto está licenciado sob a licença MIT. Consulte [LICENSE](LICENSE).
