Aplicacao web desenvolvida em React + Vite para apoiar a analise de risco de lesao em atletas com base em dados de carga, recuperacao e sinais de alerta. O sistema integra o Gemini para gerar uma avaliacao estruturada com nivel de risco, fatores-chave e recomendacoes praticas.

## Visao Geral

O KINETIX AI foi desenhado para ser uma interface rapida de triagem esportiva:

- Entrada de dados fisiologicos e comportamentais do atleta.
- Processamento assistido por IA com resposta estruturada em JSON.
- Exibicao clara do diagnostico de risco e orientacoes de acao.
- Tratamento de erro para ausencia de chave de API e falhas de avaliacao.

## Principais Funcionalidades

- Avaliacao de risco em tres niveis: Baixo, Moderado e Alto.
- Score numerico de risco (0 a 100).
- Analise textual em pt-BR.
- Recomendacoes acionaveis para treino e recuperacao.
- Fatores determinantes com impacto Positivo, Negativo ou Neutro.
- Interface moderna com animacoes e experiencia responsiva.

## Stack Tecnologica

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide React
- Google GenAI SDK (@google/genai)

## Estrutura do Projeto

```text
.
|- src/
|  |- components/
|  |  |- Logo.tsx
|  |- services/
|  |  |- geminiService.ts
|  |- App.tsx
|  |- index.css
|  |- main.tsx
|- index.html
|- metadata.json
|- package.json
|- tsconfig.json
|- vite.config.ts
```

## Pre-requisitos

- Node.js 18 ou superior
- NPM 9 ou superior
- Chave de API valida para Gemini

## Configuracao de Ambiente

Crie um arquivo .env.local na raiz do projeto com a variavel abaixo:

```env
VITE_GEMINI_API_KEY=SUA_CHAVE_AQUI
```

Importante:

- Nunca commitar chaves reais no repositorio.
- Em Vite, variaveis client-side devem comecar com VITE_.

## Como Executar Localmente

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

```text
http://localhost:3000
```

## Scripts Disponiveis

- npm run dev: sobe o servidor de desenvolvimento.
- npm run build: gera o build de producao.
- npm run preview: executa preview local do build.
- npm run lint: valida tipagem TypeScript sem emitir arquivos.
- npm run clean: remove a pasta dist.

## Fluxo de Avaliacao

1. Usuario preenche o formulario com dados do atleta.
2. A camada de servico em src/services/geminiService.ts monta o prompt clinico-esportivo.
3. O Gemini retorna um JSON tipado com score, nivel, analise e recomendacoes.
4. A interface em src/App.tsx renderiza o resultado para decisao rapida.

## Boas Praticas e Seguranca

- Validar dados de entrada antes de uso clinico-operacional.
- Registrar logs de erro sem expor informacoes sensiveis.
- Manter a chave de API fora de controle de versao.
- Considerar limite de taxa e custos de chamadas ao modelo.

## Limites e Responsabilidade

Este projeto oferece suporte a tomada de decisao, mas nao substitui avaliacao medica, fisioterapeutica ou preparacao fisica profissional. Use os resultados como apoio tecnico complementar.

## Solucao de Problemas

### Tela branca ao abrir o app

Se o Vite sobe, mas a interface fica em branco, verifique os pontos abaixo:

1. A variavel deve estar em .env.local com prefixo VITE_:

```env
VITE_GEMINI_API_KEY=SUA_CHAVE_AQUI
```

2. No frontend Vite, a leitura deve ser feita via import.meta.env (nao process.env).
3. Sempre reinicie o servidor apos alterar .env.local.
4. Confirme se a chave nao esta vazia e se nao possui espacos extras no inicio/fim.

## Roadmap Sugerido

- Historico de avaliacoes por atleta.
- Dashboard comparativo por periodo.
- Exportacao de laudos em PDF.
- Integracao com dados de wearables.

## Autor

Projeto KINETIX AI.
