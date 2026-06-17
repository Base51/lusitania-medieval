# Lusitânia Medieval

> Experiências medievais imersivas em Portugal para empresas, casamentos e eventos.

## Sobre

Website institucional da Lusitania Medieval com foco em:

- Team Building corporativo
- Casamentos medievais
- Feiras e eventos

O projeto privilegia posicionamento premium, SEO técnico e desempenho em mobile.

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

## Páginas Principais

- `index.html` (home)
- `team-building.html`
- `casamentos.html`
- `eventos.html`
- `politica-privacidade.html`
- `termos-condicoes.html`
- `livro-reclamacoes.html`
- `404.html`

## Estrutura do Projeto

```text
lusitania-medieval/
├── assets/          # Imagens, ícones, fontes, vídeo
├── css/             # Estilos globais
├── js/              # Scripts (interações + consentimento cookies)
├── docs/            # Documentação estratégica e técnica
├── robots.txt       # Regras de rastreamento
├── sitemap.xml      # Mapa do site
├── index.html
└── 404.html
```

## Estado Técnico Atual

- Metadados SEO base implementados (title, description, canonical, OG, Twitter)
- Dados estruturados JSON-LD nas páginas principais
- Consent mode + banner de cookies com controlo de analytics
- `robots.txt` e `sitemap.xml` publicados
- `loading` e `decoding` aplicados nas imagens

## Próximas Melhorias Prioritárias

1. Converter imagens legadas `.png/.jpg` de portfólio para `.webp`
2. Atualizar caminhos das imagens no HTML após conversão
3. Definir `width` e `height` nas imagens principais para reduzir CLS
4. Executar auditoria Lighthouse mobile e corrigir pontos críticos

## Documentação

Consultar a pasta `docs/`:

- [Identidade](docs/01_identidade.md)
- [Modelo de Negócio](docs/02_modelo_negocio.md)
- [Plano Financeiro](docs/03_plano_financeiro.md)
- [Marketing](docs/04_marketing.md)
- [Operações](docs/05_operacoes.md)
- [Candidaturas](docs/06_candidaturas.md)
- [Website Técnico e SEO](docs/07_website_tecnico.md)
- [Documento Mestre](docs/Lusitania_Medieval_Documento_Mestre_Completo_v1.0.md)

## Licença

Este projeto está licenciado sob a licença MIT. Consulte [LICENSE](LICENSE).
