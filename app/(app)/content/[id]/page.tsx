"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";

import { contentUrls, contentPdfs } from "@/config/content";

export default function ContentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const url = contentUrls[id];
  const pdfUrl = contentPdfs[id];

  if (!url) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
        Contenido no encontrado.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Back button bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver
        </button>

        {pdfUrl && (
          <a
            href={pdfUrl}
            download
            aria-label="Descargar PDF"
            className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary-soft"
          >
            <Download className="h-5 w-5 text-primary" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 top-12 flex flex-col items-center justify-center gap-4 bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Cargando contenido...</p>
        </div>
      )}

      {/* Fullscreen content */}
      <iframe
        src={url}
        title="Contenido"
        className="flex-1 w-full border-none"
        allow="fullscreen"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
