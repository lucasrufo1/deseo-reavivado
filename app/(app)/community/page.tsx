"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Heart, Send } from "lucide-react";

import { useSession } from "@/lib/session";

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
    text: "llevo 5 días aplicando las dosis y ayer mi esposo me escribió en pleno trabajo solo para preguntarme cómo estaba 🥹 puede parecer una tontería pero hacía MESES que no lo hacía sin que yo le escribiera primero jajaja todavía no me lo creo chicas ❤️",
    replies: [
      {
        id: "c1-r1",
        author: "Camila R.",
        text: "jajajaja a mí me pasó algo parecido!!! el mío empezó a buscarme para conversar otra vez y yo tipo qué está pasando 😂❤️",
      },
    ],
  },
  {
    id: "c2",
    author: "Antonella P.",
    text: "Entré bastante desconfiada la verdad. Ya había intentado tantas cosas con mi marido que pensé que esto sería más de lo mismo. Empecé con la dosis de la añoranza y me sorprendió lo sencillo que era aplicarla... todavía nos falta mucho pero esta semana él mismo propuso que saliéramos a cenar. Eso antes ni pasaba 🥹",
  },
  {
    id: "c3",
    author: "Isabella F.",
    text: "el módulo de la dosis de la chispa me dejó sin palabras.. yo pensaba que después de tantos años juntos ya era normal que no tuviéramos de qué hablar. empecé a cambiar algunas cositas en nuestras conversaciones y ayer terminamos riéndonos como cuando éramos novios 😭 no saben cuánto extrañaba eso",
    replies: [
      {
        id: "c3-r1",
        author: "Renata V.",
        text: "siii esa dosis me encantó también!! a veces son detalles tan pequeños que una ni se imagina que pueden hacer diferencia ❤️",
      },
    ],
  },
  {
    id: "c4",
    author: "Fernanda G.",
    text: "Lo que más me gustó fue entender que no tenía que estar todo el tiempo buscando su atención. Antes me frustraba muchísimo cuando él llegaba del trabajo y se quedaba con el celular. Ahora estoy aprendiendo a manejar esos momentos de otra manera y me siento mucho más tranquila. El contenido está muy bien explicado, de verdad.",
  },
  {
    id: "c5",
    author: "Natalia S.",
    text: "llevaba meses sintiendo que éramos más compañeros de casa que esposos... solo hablábamos de las cuentas, los niños y los problemas. esta semana fue diferente, no sé explicarlo bien pero lo sentí más cercano. ayer hasta me abrazó por detrás mientras preparaba la cena jajajaja 🥹 para algunas será algo normal pero yo extrañaba muchísimo esos detalles",
  },
  {
    id: "c6",
    author: "Juliana C.",
    text: "llevo como dos semanas aquí y lo que más me sorprendió fue la dosis de la confesión... mi esposo siempre ha sido muy cerrado para hablar de lo que siente y yo terminaba insistiendo hasta que discutíamos. esta vez tuvimos una conversación muy bonita sin que se sintiera como un interrogatorio. todavía estoy aprendiendo pero me está gustando mucho el método ❤️",
  },
  {
    id: "c7",
    author: "Ximena L.",
    text: "tenía muchísimo tiempo sintiéndome invisible para mi marido. me arreglaba, intentaba acercarme y parecía que ni se daba cuenta 😞 empecé a poner en práctica algunas de las dosis y ayer me dijo que estaba muy bonita sin que yo le preguntara nada jajaja casi no lo podía creer 😍 sé que apenas estoy empezando pero me hizo mucha ilusión volver a escuchar eso",
  },
  {
    id: "c8",
    author: "Daniela M.",
    text: "chicas ayer pasó algo que no esperaba jajaja mi esposo llegó del trabajo y en vez de ir directo al celular se sentó conmigo a contarme cómo le había ido 🥹 puede parecer poca cosa pero llevábamos meses casi sin conversar. me emocioné muchísimo la verdad ❤️",
  },
  {
    id: "c9",
    author: "Gabriela T.",
    text: "Yo pensaba que para recuperar la atención de mi marido tenía que cambiar mi apariencia o hacer algo extraordinario. Lo que más me gustó de las dosis es que son cosas pequeñas que puedes incorporar en el día a día. Apenas llevo una semana y ya estoy viendo nuestra relación de otra manera. Muy contenta con el contenido!!",
  },
  {
    id: "c10",
    author: "Mariana P.",
    text: "la dosis de la añoranza fue mi favorita hasta ahora 😂 mi esposo siempre era de los que podían pasar todo el día sin mandarme ni un mensaje y esta semana me escribió para decirme que me extrañaba!!! tuve que leerlo dos veces jajajaja hacía tanto que no me decía algo así 😭❤️",
  },
  {
    id: "c11",
    author: "Patricia C.",
    text: "Llevamos 14 años casados y sinceramente pensé que la etapa de los detalles bonitos ya había quedado atrás. Hace unos días mi marido me invitó a salir los dos solos, sin niños, sin amigos, solo nosotros. No sé si se imaginan lo especial que fue para mí 🥹 todavía tenemos cosas que mejorar pero estoy disfrutando mucho este proceso.",
  },
  {
    id: "c12",
    author: "Alejandra R.",
    text: "entré porque ya estaba cansada de sentir que siempre era yo la que buscaba cariño... apenas voy por las primeras dosis pero algo que me está gustando muchísimo es que ahora entiendo mejor cómo acercarme sin terminar reclamándole por todo. ayer tuvimos una noche super bonita juntos y hacía tiempo que no me sentía así de tranquila ❤️",
  },
  {
    id: "c13",
    author: "Luciana G.",
    text: "chicas no se desesperen si al principio no ven cambios!! yo también quería hacer todo de una vez jajaja pero es mejor ir con calma ❤️",
  },
  {
    id: "c14",
    author: "Paola M.",
    text: "Ayer mi esposo me dio un beso antes de salir al trabajo y me dijo que me veía bonita 🥹 hacía muchísimo que no tenía esos detalles conmigo. No saben lo feliz que me hizo empezar el día así",
  },
  {
    id: "c15",
    author: "Karina S.",
    text: "una pregunta, ustedes aplican una dosis por día o esperan unos días antes de probar otra?? apenas estoy empezando y no quiero hacer todo mal jajaja",
  },
  {
    id: "c16",
    author: "Verónica R.",
    text: "Mi consejo para las que van empezando es que lean bien cada explicación antes de ponerla en práctica. Yo al principio estaba súper ansiosa por ver resultados y quería probar todas las dosis 😂 después entendí que cada situación es diferente. Paciencia chicas!!",
  },
  {
    id: "c17",
    author: "Andrea P.",
    text: "hoy cumplimos 11 años de casados y mi marido se acordó solito de la fecha 😭❤️ hasta llegó con mi chocolate favorito jajaja qué bonito volver a tener esos momentos",
  },
  {
    id: "c18",
    author: "Rocío C.",
    text: "me gustó mucho la dosis de la confesión. Siempre nos costó hablar de ciertas cosas sin terminar discutiendo y esta vez pude escucharlo con más calma. todavía tenemos mucho que trabajar pero me quedé contenta con nuestra conversación",
  },
  {
    id: "c19",
    author: "Mónica V.",
    text: "llevo 3 días aquí, apenas voy por las primeras lecciones. hay alguna chica que también esté empezando?? así nos vamos contando cómo nos va 🥰",
  },
  {
    id: "c20",
    author: "Claudia A.",
    text: "No todo cambia de un día para otro chicas, eso lo aprendí después de muchos años de matrimonio. Pero esta semana cenamos juntos sin estar cada uno mirando su celular y terminamos hablando de nuestro primer viaje como novios jajaja. Fue un momento muy lindo, de esos que una extraña sin darse cuenta ❤️",
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

/**
 * Comment composer — UI only. Nothing is sent or stored: submitting just clears the
 * field and shows a short confirmation. Wire it to a backend when the community goes live.
 */
function CommentComposer() {
  const email = useSession((s) => s.email);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const name = email?.trim() || "Tú";
  const canSend = text.trim().length > 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;
    setText("");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 rounded-2xl border border-border bg-card p-4"
    >
      <InitialAvatar name={name} className="h-9 w-9 text-sm" />

      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="new-comment" className="sr-only">
          Escribe un comentario
        </label>
        <textarea
          id="new-comment"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (sent) setSent(false);
          }}
          rows={2}
          maxLength={500}
          placeholder="Escribe un comentario..."
          className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />

        <div className="flex items-center justify-between gap-3">
          <p role="status" className="text-xs text-muted-foreground">
            {sent ? "¡Gracias! Tu comentario será revisado antes de publicarse." : ""}
          </p>
          <button
            type="submit"
            disabled={!canSend}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Publicar
          </button>
        </div>
      </div>
    </form>
  );
}

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-3">
      <CommentComposer />
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
