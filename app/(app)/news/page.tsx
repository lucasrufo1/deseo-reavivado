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
            <Image src={contentImage} alt="" fill sizes="(max-width: 672px) calc(100vw - 2rem), 640px" className="object-cover" priority />
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
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{text}</p>
      </div>
    </article>
  );
}

const postText = `¡Bienvenida a este nuevo capítulo! 🎉

Me emociona mucho que estés aquí. Tomar esta decisión ya dice mucho de ti como prometida, y estoy muy feliz de acompañarte en este camino de la espera al altar.

Aquí dentro vas a encontrar la guía completa, la metodología y todos los materiales de apoyo para vivir esta etapa con calma y claridad. No sientas que tienes que consumir todo de una vez. Ve a tu ritmo: cada página que recorras te va preparando, paso a paso, para el día más importante de tu vida. No hay prisa. 💛

Cuando sientas que algo cambió en ti durante este proceso, cuéntamelo. Esos momentos son exactamente la razón por la que hago esto. ¡Nos vemos adentro!`;

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Post
        id="post-1"
        authorName="Diana Montellano"
        authorImage="/images/profile.webp"
        contentImage="/images/family.webp"
        text={postText}
      />
    </div>
  );
}
