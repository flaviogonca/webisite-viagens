# Kosmopolita — website público

React + TypeScript + Vite + Tailwind v4 + Motion + React Router + React Hook Form + Zod.

    npm install
    npm run dev        # desenvolvimento
    npm run build      # tsc + build de produção
    npm run typecheck

## Substituir placeholders
- `src/config/agency.ts`: nome, contactos, morada, redes, logótipo (todos PLACEHOLDER).
- `src/data/*`: serviços, destinos (o campo `image` aceita fotografia real), FAQs, testemunhos de demonstração.
- `public/sitemap.xml`, `public/robots.txt` e `siteUrl`: trocar `www.example.com` pelo domínio real.

## Integração Laravel (contratos propostos, ainda não existem)
Defina `VITE_API_BASE_URL` em `.env`. Sem API, os dados vêm de `src/data` e os formulários mostram um erro honesto
(com alternativa por WhatsApp) em vez de simularem um envio.

GET /api/public/{services,destinations,faqs} · POST /api/public/{service-requests,contact}
