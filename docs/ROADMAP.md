# Roadmap

Fases planejadas para o DeckApp. O estado atual é o **shell base** (estrutura, navegação, sessão local e PWA). As fases abaixo adicionam capacidades reais sem quebrar o princípio núcleo vs. configuração.

## Fase 1 — Estado atual (concluído)

- Estrutura completa de pastas (App Router).
- Configuração por produto em `config/product.ts`.
- Sessão local com Zustand + persist (localStorage).
- Telas: login, feed, comunidade, perfil.
- Navegação: Header, Bottom Nav, Side Menu.
- PWA via `next-pwa` + manifest gerado da config.

## Fase 2 — Autenticação real via magic link

- Substituir o login local por **magic link** (e-mail com link de acesso).
- Provedor de e-mail transacional (ex.: Resend) ou auth gerenciado.
- Sessão validada por token; `lib/session.ts` passa a refletir o estado real.
- Guarda de rota continua no `(app)/layout.tsx`, agora baseada em token válido.

## Fase 3 — Integração com webhook de pagamento

- Receber eventos de uma plataforma de pagamento (ex.: Hotmart, Kiwify, Stripe) via webhook.
- Liberar acesso ao produto conforme a compra do usuário.
- Variável `PAYMENT_WEBHOOK_SECRET` (já reservada em `.env.example`).
- Mapear compras → entitlements por produto.

## Fase 4 — Painel de administração por produto

- Área administrativa para gerenciar conteúdo do feed, banners e produtos.
- Controle de acesso por papel (admin vs. usuário).
- Edição de catálogo sem necessidade de redeploy.

## Fase 5 — Banco de dados com Supabase

- Persistir usuários, produtos, compras e conteúdo no Supabase.
- Variáveis `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (já reservadas).
- Substituir os dados placeholder do feed por consultas reais.
- Base para a área de comunidade ("Em breve" → funcional).

## Princípios mantidos em todas as fases

- Identidade do produto permanece em `config/product.ts` (zero hardcode no núcleo).
- Cada produto continua sendo um deploy independente.
- Atualizações de núcleo são propagadas para as instâncias via base compartilhada.
