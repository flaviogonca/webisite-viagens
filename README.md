# Kosmopolita — website público

Website público de uma agência de viagens com atuação em Angola e serviços internacionais: consultoria, vistos, agendamentos, voos, hotéis e assistência documental.

Este projeto cobre **apenas o website público**. O painel administrativo, o painel dos agentes e o backend (Laravel) ficam fora do âmbito. O frontend já está preparado para os integrar.

> "Kosmopolita" é um nome provisório. Todos os dados da agência estão em `src/config/agency.ts`.

## Tecnologias

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion (animações) · React Router · React Hook Form + Zod · Lucide · three.js (vision board 3D).

## Começar

Requer Node 20 ou superior.

```bash
npm install
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # verificação de tipos + build de produção em dist/
npm run preview    # servir o build localmente
npm run typecheck  # só verificação de tipos
```

Não existem testes automáticos neste momento. A verificação é feita por `npm run build`.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, serviços, rota de voo interativa, vision board 3D, vistos, diferenciais, como funciona, testemunhos, FAQ |
| `/sobre` | História, missão, visão, valores |
| `/servicos` | Catálogo completo de serviços |
| `/destinos` | Catálogo com filtro por região |
| `/destinos/:slug` | Detalhe de cada destino |
| `/vistos` | Assistência para vistos, documentação, FAQ e formulário |
| `/contactos` | Formulário, email, telefone, WhatsApp, morada |
| `/solicitar-servico` | Pedido de serviço (aceita `?servico=` e `?destino=`) |
| `/creditos` | Autores e licenças das fotografias |
| `/privacidade`, `/termos` | Rascunhos, texto jurídico por fornecer |

## Estrutura

```
src/
├── app/            router e componente raiz
├── components/
│   ├── art/        ilustrações SVG de reserva
│   ├── cards/      cartões reutilizáveis
│   ├── common/     logótipo, carimbo, cabeçalho de página
│   ├── forms/      formulários e campos
│   ├── layout/     navbar, rodapé, layout
│   ├── sections/   secções da home (Hero, FlightJourney, VisionBoard…)
│   └── ui/         botão, reveal, tilt, ícones
├── config/         agency.ts (identidade) e env.ts
├── data/           serviços, destinos, FAQs, créditos, vision board
├── hooks/          useSeo, useAsync…
├── pages/          uma página por rota
├── schemas/        validação com Zod
├── services/       cliente de API e camada de dados
├── styles/         tokens do design system (Tailwind @theme)
├── types/
└── utils/
```

## Design system

Os tokens estão em `src/styles/index.css` (`@theme`):

- **Cores:** marinha `#0b2a33`, mar `#1f6f78`, névoa `#eef1ee`, papel `#f7f9f7`, açafrão `#e9b44c` (carimbo de visto, cor de ação).
- **Tipos de letra:** Bricolage Grotesque (títulos) e Hanken Grotesk (texto), servidos localmente via `@fontsource`.
- **Movimento:** todas as animações respeitam `prefers-reduced-motion`.

## Conteúdo e placeholders

Nada do que é específico da agência foi inventado. Substitua antes de publicar:

- `src/config/agency.ts`: nome, email, telefone, WhatsApp, morada, redes sociais, logótipo, URL do site. Redes sem `href` ficam ocultas.
- `src/data/content.ts`: testemunhos marcados como **demonstração**, a substituir por reais. FAQs e textos de apoio.
- `src/pages/Legal.tsx`: privacidade e termos são rascunhos, devem ser validados juridicamente.
- `public/sitemap.xml` e `public/robots.txt`: trocar `www.example.com` pelo domínio real.
- Fotografias: ver abaixo.

O website nunca promete aprovação de vistos: a decisão pertence às autoridades consulares competentes.

## Fotografias

- Ficam em `public/images/`, em JPEG com cerca de 1600 px no lado maior (poucas centenas de KB).
- Originais em alta resolução podem ficar em `assets-source/`, que está no `.gitignore` e não vai para o site.
- Cada fotografia tem de constar em `src/data/credits.ts` (aparece em `/creditos`). As licenças CC BY e CC BY-SA do Wikimedia Commons exigem atribuição.
- Evite descarregar do Unsplash por script, porque o site bloqueia pedidos automáticos. Descarregue à mão ou use o Wikimedia Commons.
- Para trocar a fotografia de um destino, edite o campo `image` em `src/data/destinations.ts`. Sem `image`, é usada uma ilustração SVG.
- O vision board usa a lista de `src/data/visionBoard.ts`.

## Integração com o backend Laravel

Os contratos abaixo são **propostas**. Ainda não existem no backend.

| Método | Endpoint |
| --- | --- |
| GET | `/api/public/services` |
| GET | `/api/public/destinations` |
| GET | `/api/public/faqs` |
| POST | `/api/public/service-requests` |
| POST | `/api/public/contact` |

- Copie `.env.example` para `.env` e defina `VITE_API_BASE_URL`.
- O cliente está em `src/services/api/` e o catálogo em `src/services/catalog.ts`. Sem API configurada, usa os dados estáticos de `src/data/`.
- **Formulários:** sem API, o envio falha com uma mensagem clara e oferece continuar por WhatsApp. O site nunca simula um pedido recebido.
- Não coloque credenciais ou segredos no frontend. Tudo o que começa por `VITE_` é público.

## Idiomas

O português é o idioma principal, e `agency.languages` já está preparado para acrescentar inglês. Os textos ainda estão nos componentes e ficheiros de `src/data/`, por isso a internacionalização exige extraí-los para ficheiros de tradução.

## Licença

Por definir.
