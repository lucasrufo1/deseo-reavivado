/**
 * content.ts — Mapeia o ID de cada produto à URL do conteúdo e ao PDF para download.
 * Ao criar um novo produto, basta adicionar uma entrada aqui.
 *
 * Os IDs devem coincidir com os `id` dos produtos em app/(app)/feed/page.tsx.
 * Produtos com `isLocked` (bônus em atualização) não precisam de entrada.
 */
export const contentUrls: Record<string, string> = {
  "1": "https://metodo-deseo-reavivado-s3kdt9f.gamma.site/",
  "2": "https://protocolo-desbloqueo-de--2tlsdc7.gamma.site/",
};

export const contentPdfs: Record<string, string> = {
  "1": "/docs/Metodo-Deseo-Reavivado.pdf",
  "2": "/docs/Protocolo-Desbloqueo-de-7-Dias.pdf",
};
