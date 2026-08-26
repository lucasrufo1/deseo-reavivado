# Como criar um novo produto a partir do DeckApp

Este guia mostra, passo a passo, como gerar uma nova instância de produto. Na prática você altera **um arquivo de configuração** e troca **algumas imagens** — o núcleo não muda.

## Passo 1 — Duplicar o projeto

Clone ou copie o repositório DeckApp para uma nova pasta/repo do produto. Mantenha o nome interno `deckapp` em `package.json` e na estrutura (o núcleo é o mesmo); a identidade vem da configuração, não do nome do diretório.

```bash
cp -r deckapp meu-produto
cd meu-produto
npm install
```

## Passo 2 — Editar `config/product.ts`

Este é o **único** arquivo de identidade. Ajuste cada campo:

```ts
export const productConfig: ProductConfig = {
  appName: "Meu Produto",              // H1 no login + metadata
  appShortName: "MeuApp",              // nome curto na home screen (PWA)
  description: "Curso completo de X",  // metadata + manifest
  primaryColor: "#4F46E5",             // cor principal (botões, links)
  accentColor: "#FFFFFF",              // texto/ícone sobre a cor principal
  logoUrl: "/icons/logo.png",          // arquivo em /public/icons
  bannerUrl: "/images/banner.jpg",     // arquivo em /public/images
  themeColor: "#4F46E5",               // barra do navegador / status bar (PWA)
  backgroundColor: "#FFFFFF",          // splash/background (PWA)
};
```

> **Contraste:** garanta que `accentColor` sobre `primaryColor` atinja pelo menos 4.5:1 (texto). Verifique em um conferidor de contraste WCAG antes de publicar.

## Passo 3 — Substituir as imagens

Coloque os arquivos em `/public`:

| Arquivo | Caminho | Uso |
|---------|---------|-----|
| Logo | `public/icons/logo.png` | login, header, menu |
| Banner | `public/images/banner.jpg` | topo do feed |
| Ícone PWA 192 | `public/icons/icon-192.png` | manifest |
| Ícone PWA 512 | `public/icons/icon-512.png` | manifest / splash |

> Os placeholders atuais são quadrados/retângulos cinza. Ao adicionar imagens reais, você pode trocar os componentes `Logo` e `Banner` por `<img>`/`next/image` apontando para os caminhos do `productConfig`. Mantenha as proporções para não causar layout shift.

## Passo 4 — Configurar o manifest PWA

**Você não precisa editar o manifest manualmente.** Ele é gerado em [`app/manifest.ts`](../app/manifest.ts) a partir do `productConfig`:

- `name` ← `appName`
- `short_name` ← `appShortName`
- `theme_color` ← `themeColor`
- `background_color` ← `backgroundColor`

Basta garantir que os ícones `icon-192.png` e `icon-512.png` existam em `public/icons`. Para validar, rode `npm run build && npm run start` e abra o DevTools → Application → Manifest.

## Passo 5 — Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_APP_URL` para o domínio do produto. As demais variáveis são reservadas para fases futuras (ver [ROADMAP](./ROADMAP.md)).

## Passo 6 — Deploy independente

Cada produto é deployado **separadamente** (domínio e hosting próprios). Em uma plataforma como a Vercel:

1. Conecte o repositório do produto.
2. Defina as variáveis de ambiente (`NEXT_PUBLIC_APP_URL`, etc.).
3. Deploy. O build gera o service worker do PWA automaticamente (`next-pwa`).

Como cada instância é um deploy isolado, atualizações no núcleo do DeckApp são propagadas atualizando o código base e re-deployando cada produto (ex.: via merge/rebase do upstream).

## Checklist final

- [ ] `config/product.ts` totalmente preenchido
- [ ] Logo, banner e ícones PWA substituídos em `/public`
- [ ] Contraste `accentColor` sobre `primaryColor` ≥ 4.5:1
- [ ] `NEXT_PUBLIC_APP_URL` apontando para o domínio correto
- [ ] Manifest validado no DevTools (build de produção)
- [ ] Nenhum nome/cor/logo hardcoded fora de `config/product.ts`
