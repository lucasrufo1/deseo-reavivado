"use client";

import { useState, useEffect } from "react";
import { Heart, User } from "lucide-react";

interface CommentData {
  id: string;
  author: string;
  text: string;
  replies?: CommentData[];
}

const comments: CommentData[] = [
  {
    id: "c1",
    author: "Valentina R.",
    text: "4 días aplicando las frases y hoy mi hijo se fue a bañar sin que yo tuviera que repetirlo ni una vez.. me quedé mirando sin creer jajaja estaba tan acostumbrada a la pelea de siempre que ni sabía qué hacer con ese silencio 😂 esto funciona chicas",
    replies: [
      {
        id: "c1-r1",
        author: "Carmen T.",
        text: "jajaja me pasó exactamente lo mismo!! el silencio da hasta susto al principio 😂",
      },
    ],
  },
  {
    id: "c2",
    author: "Mariana C.",
    text: "Entré bastante desconfiada lo admito. Empecé por el bono de las rutinas antes que por el material principal y ya con eso valió todo. Mi hija de 6 años ya está recogiendo sus cosas antes de dormir sola.. sin que yo diga nada. Muy contenta la verdad",
  },
  {
    id: "c3",
    author: "Lucía F.",
    text: "el módulo de las frases de conexión me dejó sin palabras.. yo pensaba que el problema era mi hijo pero era la forma en que yo le hablaba. al tercer día ya lo noté diferente, más tranquilo. no esperaba ver resultados tan rápido honestamente",
    replies: [
      {
        id: "c3-r1",
        author: "Paola V.",
        text: "siii yo también lo noté rápido.. más de lo que esperaba la verdad",
      },
    ],
  },
  {
    id: "c4",
    author: "Daniela M.",
    text: "Lo que más me gustó fue entender cómo funciona el cerebro de los niños. Parece simple pero cambia todo. Dejé de tomarlo personal cuando no obedecía.. ahora entiendo lo que está pasando y se me hace mucho más fácil manejar la situación",
  },
  {
    id: "c5",
    author: "Sofía G.",
    text: "tengo 2 hijos y terminaba cada día agotada de tanto repetir todo.. esta semana fue diferente, no sé explicarlo bien pero el ambiente en casa estaba más liviano sabes?? mi esposo me preguntó qué había cambiado jajaja le dije que era mi secreto 😄 para las que están dudando.. entren sin miedo",
  },
  {
    id: "c6",
    author: "Gabriela S.",
    text: "llevo como dos semanas aquí y lo que más me sorprendió fue lo del cerebro emocional.. cuando entendí eso dije wow.. todo tiene sentido ahora. mi hijo no es difícil, yo simplemente no sabía cómo hablarle. el contenido está muy bien explicado",
  },
  {
    id: "c7",
    author: "Rosa M.",
    text: "mi niño tiene 7 años y era una batalla campal cada noche para dormir.. desde que empecé a usar las frases la hora de dormir cambió completamente.. anoche me pidió él solito irse a la cama jajaja casi no lo puedo creer 😄",
  },
];

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
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <User className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
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
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <User className="h-4 w-4" aria-hidden="true" />
        </div>
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
