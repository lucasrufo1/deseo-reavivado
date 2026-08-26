# DeckApp

**DeckApp é um produto base (app shell) para criação de aplicativos PWA de entrega de produtos digitais.**

A ideia central: o DeckApp é desenvolvido **uma vez**, com arquitetura, estrutura e componentes bem definidos. A partir dele são geradas **instâncias de produto** — cada uma com sua própria identidade visual, nome, conteúdo e configuração — **sem alterar o núcleo do projeto**.

> Pense no DeckApp como o **motor**. Cada produto criado com ele é um **veículo diferente** usando o mesmo motor.

## Qual problema resolve

Criar um app PWA de entrega de produtos digitais do zero para cada cliente é repetitivo e caro. O DeckApp resolve isso separando o **núcleo reutilizável** (rotas, navegação, sessão, componentes, PWA) da **configuração por produto** (nome, cores, logo, banner). Para lançar um novo produto, você altera essencialmente **um único arquivo** e troca algumas imagens.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 14 (App Router) |
| Estilização | Tailwind CSS + shadcn/ui |
| PWA | next-pwa |
| Estado / sessão | Zustand + `persist` (localStorage) |
| Linguagem | TypeScript |
| Ícones | lucide-react |

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env.local

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

> O service worker do PWA fica **desabilitado em desenvolvimento** (ver `next.config.js`) para evitar problemas de cache. Para testá-lo, rode `npm run build && npm run start`.

## Como funciona o sistema de produtos

Toda a identidade de um produto vive em [`/config/product.ts`](../config/product.ts). Esse é o **único arquivo** que muda entre instâncias. As cores definidas ali são injetadas em variáveis CSS no `app/layout.tsx` e consumidas pelos componentes via tokens do Tailwind (`bg-primary`, `text-primary-foreground`, etc.). O manifest PWA também é gerado a partir desse arquivo.

Nenhum nome, cor, logo ou banner deve aparecer hardcoded em qualquer outro arquivo.

Para criar um novo produto, veja [HOW_TO_CREATE_A_PRODUCT.md](./HOW_TO_CREATE_A_PRODUCT.md).
Para entender a arquitetura, veja [ARCHITECTURE.md](./ARCHITECTURE.md).
Para o que vem a seguir, veja [ROADMAP.md](./ROADMAP.md).

## Telas

- **/login** — Logo, nome do app, input de e-mail e botão Entrar. Valida o e-mail, salva a sessão, exibe splash de 1.5s e vai para o feed.
- **/feed** — Banner + grid de produtos (2 colunas no mobile, 3 no desktop).
- **/community** — "Em breve".
- **/profile** — E-mail da sessão + botão Sair.

Todas as telas internas compartilham Header (menu + logo) e Bottom Nav fixo (Início, Feed, Comunidade, Perfil).
