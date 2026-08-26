# Arquitetura

Este documento explica a estrutura do DeckApp, as decisões técnicas por trás dela e **onde alterar cada coisa ao criar um novo produto**.

## Princípio central: núcleo vs. configuração

O DeckApp separa estritamente duas coisas:

- **Núcleo (engine)** — rotas, navegação, sessão, componentes, PWA. **Não muda** entre produtos.
- **Configuração (vehicle)** — nome, cores, logo, banner, conteúdo. Vive em `/config/product.ts` e nas imagens de `/public`.

Regra de ouro: **nenhum valor de identidade visual ou nome de produto pode aparecer hardcoded** fora de `/config/product.ts`.

## Estrutura de pastas

```
deckapp/
├── app/                      # App Router (rotas, layouts, manifest)
│   ├── layout.tsx            # Layout raiz: metadata + injeção das cores da marca em CSS vars
│   ├── page.tsx              # Rota "/": decide entre /feed e /login conforme a sessão
│   ├── globals.css           # Tokens de tema (CSS vars) + base Tailwind
│   ├── manifest.ts           # Manifest PWA gerado a partir de productConfig
│   ├── login/page.tsx        # Rota pública de login
│   └── (app)/                # Grupo de rotas PROTEGIDAS (não cria segmento de URL)
│       ├── layout.tsx        # Guarda de auth + Header/BottomNav/SideMenu
│       ├── feed/page.tsx
│       ├── community/page.tsx
│       └── profile/page.tsx
├── components/
│   ├── ui/                   # Primitivos shadcn/ui (Button, Input)
│   ├── layout/               # Header, BottomNav, SideMenu, Logo, nav-items
│   └── product/              # ProductCard, ProductGrid, Banner
├── config/
│   └── product.ts            # ÚNICO arquivo que muda entre instâncias
├── lib/
│   ├── session.ts            # Store de sessão (Zustand + persist)
│   └── utils.ts              # cn() e validação de e-mail
├── public/
│   ├── icons/                # Ícones PWA (icon-192.png, icon-512.png, logo)
│   └── images/               # Banner e demais imagens do produto
└── docs/                     # Esta documentação
```

## Por que Next.js App Router

- **Layouts aninhados** modelam naturalmente a separação entre rotas públicas e protegidas: o `(app)/layout.tsx` envolve todas as telas internas com a guarda de sessão e a navegação compartilhada, sem repetição.
- **Route Groups** (`(app)`) agrupam rotas protegidas **sem** adicionar segmento à URL — `/feed`, `/community`, `/profile` permanecem limpas.
- **`app/manifest.ts`** permite gerar o manifest PWA a partir do `productConfig` em tempo de build, mantendo o princípio de zero hardcode (uma alternativa estática em `public/manifest.json` exigiria valores fixos).
- **Metadata API** centraliza título, descrição e `theme_color` derivados da config.

## Rotas públicas vs. protegidas

- **Pública:** `/login` (e a raiz `/`, que apenas redireciona).
- **Protegidas:** tudo dentro de `(app)/`.

A proteção acontece em `app/(app)/layout.tsx`:

1. Lê `isAuthenticated` e `hasHydrated` da store de sessão.
2. Enquanto a store não hidratou do localStorage, mostra um placeholder (evita flash de conteúdo).
3. Se hidratou e **não** está autenticado, redireciona para `/login`.
4. Caso contrário, renderiza Header + conteúdo + BottomNav + SideMenu.

## Como o Zustand gerencia a sessão sem backend

Em [`lib/session.ts`](../lib/session.ts), usamos Zustand com o middleware `persist` apontando para o `localStorage` (chave `deckapp-session`). A store expõe:

- `email: string | null`
- `isAuthenticated: boolean`
- `login(email)` / `logout()`
- `hasHydrated` — flag interna que indica que a leitura do localStorage terminou.

A flag `hasHydrated` é essencial em SSR/CSR: no primeiro render o cliente ainda não leu o localStorage, então tratamos esse estado intermediário explicitamente em vez de assumir "não autenticado" e redirecionar indevidamente.

Nesta fase **não há backend**: submeter um e-mail válido já "autentica". A troca por autenticação real (magic link) está no [ROADMAP](./ROADMAP.md).

## Como as cores chegam aos componentes

1. `productConfig.primaryColor` / `accentColor` são lidos em `app/layout.tsx`.
2. O layout injeta `--brand-primary` e `--brand-accent` em `:root` via uma tag `<style>`.
3. `tailwind.config.ts` mapeia `primary` / `accent` para essas variáveis.
4. Componentes usam apenas tokens (`bg-primary`, `text-primary-foreground`) — nunca hex.

Tons neutros de superfície/texto/borda usam variáveis HSL definidas em `globals.css`.

## Onde alterar ao criar um novo produto

| O que mudar | Onde |
|-------------|------|
| Nome, descrição, cores | `config/product.ts` |
| Logo, banner, ícones PWA | arquivos em `public/icons` e `public/images` |
| `name` do pacote / deploy | independente por instância (ver guia) |
| **Nada mais** | o núcleo permanece intacto |
