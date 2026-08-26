"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __deferredInstallPrompt: BeforeInstallPromptEvent | null;
  }
}

/**
 * Exposes the PWA install prompt. The actual `beforeinstallprompt` event is
 * captured very early by an inline script in the root layout and stored on
 * `window.__deferredInstallPrompt` — this hook reads it from there and reacts
 * to the custom `deckapp:installable` / `deckapp:installed` events.
 *
 * Note: iOS Safari does NOT support `beforeinstallprompt`, so `isInstallable`
 * will always be false there (installation is done via the Share menu).
 */
export function usePWAInstall() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // The event may have already been captured before this component mounted.
    if (window.__deferredInstallPrompt) {
      setIsInstallable(true);
    }

    const onInstallable = () => setIsInstallable(true);
    const onInstalled = () => setIsInstallable(false);

    window.addEventListener("deckapp:installable", onInstallable);
    window.addEventListener("deckapp:installed", onInstalled);

    return () => {
      window.removeEventListener("deckapp:installable", onInstallable);
      window.removeEventListener("deckapp:installed", onInstalled);
    };
  }, []);

  async function handleInstall() {
    const promptEvent = window.__deferredInstallPrompt;
    if (!promptEvent) return;

    await promptEvent.prompt();
    // The prompt can only be used once.
    window.__deferredInstallPrompt = null;
    setIsInstallable(false);
  }

  return { isInstallable, handleInstall };
}
