"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";

const BASE_LIKES = 321;

function Post({
  id,
  authorName,
  authorImage,
  contentImage,
  text,
}: {
  id: string;
  authorName: string;
  authorImage: string;
  contentImage?: string;
  text: string;
}) {
  const likedKey = `post-liked-${id}`;
  const savedKey = `post-saved-${id}`;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage after mount.
  useEffect(() => {
    setLiked(localStorage.getItem(likedKey) === "true");
    setSaved(localStorage.getItem(savedKey) === "true");
    setHydrated(true);
  }, [likedKey, savedKey]);

  function toggleLike() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(likedKey, String(next));
  }

  function toggleSave() {
    const next = !saved;
    setSaved(next);
    localStorage.setItem(savedKey, String(next));
  }

  const likes = BASE_LIKES + (liked ? 1 : 0);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image src={authorImage} alt={authorName} fill sizes="40px" className="object-cover" priority />
        </div>
        <span className="text-sm font-semibold">{authorName}</span>
      </div>

      {/* Content image */}
      {contentImage && (
        <div className="px-4">
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
            <Image src={contentImage} alt="" fill sizes="(max-width: 672px) calc(100vw - 2rem), 640px" className="object-cover object-top" priority />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 px-4 pt-3">
        <button
          onClick={toggleLike}
          aria-label={liked ? "Quitar me gusta" : "Me gusta"}
          aria-pressed={liked}
          className="flex items-center gap-1.5 transition-transform active:scale-110"
        >
          <Heart
            className="h-6 w-6 transition-colors"
            style={{ color: hydrated && liked ? "#e11d48" : undefined }}
            fill={hydrated && liked ? "#e11d48" : "none"}
          />
          <span className="text-sm font-medium tabular-nums text-muted-foreground">
            {hydrated ? likes : BASE_LIKES} me gusta
          </span>
        </button>

        <button
          onClick={toggleSave}
          aria-label={saved ? "Quitar guardado" : "Guardar"}
          aria-pressed={saved}
          className="ml-auto transition-transform active:scale-110"
        >
          <Bookmark
            className="h-6 w-6 transition-colors"
            style={{ color: hydrated && saved ? "var(--brand-primary)" : undefined }}
            fill={hydrated && saved ? "var(--brand-primary)" : "none"}
          />
        </button>
      </div>

      {/* Text */}
      <div className="px-4 pb-4 pt-2">
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-line"><RichText text={text} /></p>
      </div>
    </article>
  );
}

// Text between ** ** is rendered in bold.
const postText = `**¡Bienvenida a este nuevo comienzo! ❤️**

¡Qué alegría tenerte aquí! Me emociona mucho saber que decidiste dar este paso, porque sé lo difícil que puede ser sentir que el hombre que amas ya no te mira ni te busca como antes.

Pero quiero que sepas algo: todavía hay mucho que puedes hacer para recuperar esa conexión tan bonita que alguna vez tuvieron. Y me hace muy feliz poder acompañarte en este camino. 💕

Aquí dentro vas a encontrar las 21 Dosis de Adicción Emocional del Método Deseo Reavivado, junto con las explicaciones y los materiales que preparé para ayudarte a ponerlas en práctica en tu relación.

Mi consejo es que vayas a tu ritmo. No necesitas aprenderlo todo en un solo día. Lee cada paso con calma, entiende cómo aplicarlo y empieza poco a poco. A veces, los pequeños detalles son los que abren la puerta a los cambios más bonitos.

Y cuando empieces a notar esas primeras miradas, un mensaje inesperado o un gesto de cariño que hacía tiempo no recibías, ¡me encantará que me lo cuentes! Porque saber que otras mujeres vuelven a sentirse amadas y valoradas es lo que le da sentido a todo esto.

**Te mando un abrazo enorme. ¡Nos vemos adentro! ❤️**

Con cariño,
**Lidia Olvera**`;

/** Renders `**bold**` segments; everything else stays plain text. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
      )}
    </>
  );
}

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Post
        id="post-1"
        authorName="Lidia Olvera"
        authorImage="/images/profile.webp"
        contentImage="/images/couple.webp"
        text={postText}
      />
    </div>
  );
}
