# Repo Doctor

**Repo Doctor** é uma ferramenta académica e técnica para analisar a saúde de um repositório de software.

O objectivo é produzir uma avaliação estruturada sobre a qualidade mínima de um projecto, considerando documentação, licença, segurança, estrutura, dependências, testes, integração contínua, arquitectura e riscos de exposição acidental de informação sensível.

A ideia central é simples:

> Um repositório saudável deve ser compreensível, auditável, seguro, reproduzível e preparado para manutenção.

Repo Doctor não substitui auditorias profissionais de segurança, ferramentas SAST, scanners de vulnerabilidades ou revisão humana. É uma ferramenta de diagnóstico inicial, útil para projectos académicos, portfólio, revisão de entregas, qualidade de engenharia e preparação de repositórios públicos.

---

## Funcionalidades

A ferramenta verifica:

- existência e qualidade mínima do `README.md`;
- presença de licença;
- presença de `.gitignore`;
- presença de `SECURITY.md`;
- presença de `CONTRIBUTING.md`;
- existência de documentação de arquitectura;
- existência de testes;
- existência de CI/CD;
- existência de Docker;
- organização estrutural do repositório;
- dependências declaradas em `package.json`;
- sinais de ficheiros inúteis ou artefactos de build;
- possíveis metadados de IA;
- riscos de exposição como `.env`, chaves privadas, tokens ou segredos;
- estado básico do histórico Git, quando disponível.

---

## Exemplo de output

```txt
Repository Health Score: 78/100
Risk Level: medium

Missing:
- SECURITY.md
- Architecture documentation
- Tests

Critical findings:
- Possible .env file committed
```

---

## Arquitectura

```txt
repo-doctor/
│
├── apps/
│   ├── cli/              # Interface de linha de comandos
│   └── web/              # Dashboard visual demonstrativo
│
├── packages/
│   └── core/             # Motor de análise e scoring
│
├── docs/
│   ├── architecture.md
│   ├── scoring-model.md
│   └── security-model.md
│
├── prisma/               # Modelo opcional para histórico de análises
├── samples/              # Relatórios de exemplo
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Instalação

```bash
npm install
```

---

## Executar a CLI

Analisar o repositório actual:

```bash
npm run doctor
```

Analisar outro caminho:

```bash
npm run doctor -- /caminho/para/repositorio
```

Gerar relatório Markdown:

```bash
npm run doctor -- . --format markdown --output report.md
```

Gerar relatório JSON:

```bash
npm run doctor -- . --format json --output report.json
```

---

## Executar o dashboard web

```bash
npm run dev:web
```

Depois abrir:

```txt
http://localhost:3000
```

---

## Docker

```bash
docker compose up --build
```

---

## Segurança

Repo Doctor deve ser usado apenas em repositórios próprios, autorizados ou disponibilizados para análise académica.

A ferramenta não envia dados para servidores externos. A análise é local.

Os resultados podem conter informação sensível, como caminhos de ficheiros, nomes de variáveis ou suspeitas de segredos. Por esse motivo, os relatórios devem ser tratados com cuidado.

---

## Licença

Este projecto é disponibilizado sob a licença MIT.
