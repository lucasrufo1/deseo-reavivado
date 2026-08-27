"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface CommentData {
  id: string;
  author: string;
  text: string;
  replies?: CommentData[];
}

const comments: CommentData[] = [
  {
    id: "c1",
    author: "Valeria M.",
    text: "llevo 5 días aplicando lo que enseña la guía y ayer tuve la primera conversación con mi prometido sobre la boda sin que terminara en pelea.. me quedé en shock la verdad jajaja no sabía que se podía hablar de esto tan tranquilas 😂 esto sí funciona chicas",
    replies: [
      {
        id: "c1-r1",
        author: "Camila R.",
        text: "jajaja a mí me pasó igual!! pensé que era la única pareja que peleaba por todo lo de la boda 😂",
      },
    ],
  },
  {
    id: "c2",
    author: "Antonella P.",
    text: "Entré bastante desconfiada la verdad. Empecé por el bono de comunicación antes que por la guía principal y ya con eso valió toda la inversión. Mi mamá y mi suegra ya no chocan tanto organizando todo.. sin que yo tenga que estar mediando cada cosa. Muy contenta la verdad",
  },
  {
    id: "c3",
    author: "Isabella F.",
    text: "el módulo sobre soltar el control me dejó sin palabras.. yo pensaba que el problema era la boda pero era la ansiedad que traía desde antes. al tercer día ya me sentí diferente, más en paz. no esperaba resultados tan rápido honestamente",
    replies: [
      {
        id: "c3-r1",
        author: "Renata V.",
        text: "siii a mí también me tocó ese módulo justo en el momento que lo necesitaba.. una locura",
      },
    ],
  },
  {
    id: "c4",
    author: "Fernanda G.",
    text: "Lo que más me gustó fue entender por qué me ponía tan ansiosa antes de tomar cada decisión de la boda. Parece simple pero cambia todo. Dejé de tomarme personal cada comentario de la familia.. ahora entiendo lo que está pasando y se me hace mucho más fácil manejar la situación",
  },
  {
    id: "c5",
    author: "Natalia S.",
    text: "llevo semanas organizando todo prácticamente sola y terminaba agotada de tanto discutir los detalles.. esta semana fue diferente, no sé explicarlo bien pero el ambiente en casa estaba más liviano sabes?? mi prometido me preguntó qué había cambiado jajaja le dije que era mi secreto 😄 para las que están dudando.. entren sin miedo",
  },
  {
    id: "c6",
    author: "Juliana C.",
    text: "llevo como dos semanas aquí y lo que más me sorprendió fue el capítulo sobre las expectativas.. cuando entendí eso dije wow.. todo tiene sentido ahora. mi prometido no era el problema, yo simplemente no sabía cómo comunicar lo que sentía. el contenido está muy bien explicado",
  },
  {
    id: "c7",
    author: "Ximena L.",
    text: "tenía una relación bien tensa con mi futura suegra y era una batalla cada vez que hablábamos de la boda.. desde que empecé a aplicar la guía todo cambió.. ayer ella misma me llamó para ayudarme con los detalles jajaja casi no lo puedo creer 😄",
  },
];

/** Deterministic hash so the same name always gets the same avatar color. */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Medium-saturation palette (Google/Gmail-style default avatars) — all pass
// >=3:1 contrast with white text, most pass the full 4.5:1 AA threshold.
const AVATAR_COLORS = [
  "#E53935", "#D81B60", "#8E24AA", "#5E35B1",
  "#3949AB", "#1E88E5", "#00897B", "#43A047",
  "#F4511E", "#6D4C41", "#546E7A",
];

function avatarColor(name: string): string {
  return AVATAR_COLORS[hashString(name) % AVATAR_COLORS.length];
}

/** Google-contacts-style placeholder: initial letter over a color derived from the name. */
function InitialAvatar({ name, className }: { name: string; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className}`}
      style={{ backgroundColor: avatarColor(name) }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </div>
  );
}

function LikeButton({ id }: { id: string }) {
  const likedKey = `comment-liked-${id}`;
  const [liked, setLiked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(likedKey) === "true");
    setHydrated(true);
  }, [likedKey]);

  function toggleLike() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(likedKey, String(next));
  }

  return (
    <button
      onClick={toggleLike}
      aria-label={liked ? "Quitar me gusta" : "Me gusta"}
      aria-pressed={liked}
      className="transition-transform active:scale-110"
    >
      <Heart
        className="h-5 w-5 transition-colors"
        style={{ color: hydrated && liked ? "#e11d48" : undefined }}
        fill={hydrated && liked ? "#e11d48" : "none"}
      />
    </button>
  );
}

function ReplyCard({ comment }: { comment: CommentData }) {
  return (
    <div className="flex gap-3 pt-3 mt-1">
      <InitialAvatar name={comment.author} className="h-7 w-7 text-xs" />
      <div className="flex flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground">{comment.author}</span>
        <p className="text-sm leading-relaxed text-foreground">{comment.text}</p>
        <div className="flex justify-end">
          <LikeButton id={comment.id} />
        </div>
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: CommentData }) {
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <article className="flex gap-3 rounded-2xl border border-border bg-card p-4">
      {/* Left column: avatar + connector line */}
      <div className="flex flex-col items-center">
        <InitialAvatar name={comment.author} className="h-9 w-9 text-sm" />
        {hasReplies && (
          <div className="mt-1 w-0.5 flex-1 rounded-full bg-border" />
        )}
      </div>

      {/* Right column: content + replies */}
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-sm font-semibold">{comment.author}</span>
        <p className="text-sm leading-relaxed text-foreground">{comment.text}</p>

        <div className="flex justify-end">
          <LikeButton id={comment.id} />
        </div>

        {comment.replies?.map((reply) => (
          <ReplyCard key={reply.id} comment={reply} />
        ))}
      </div>
    </article>
  );
}

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
