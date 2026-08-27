"use client";

import { Menu } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

/** Top app bar: logo on the left, hamburger menu on the right. */
export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Image src="/icons/icon.webp" alt="Logo" width={46} height={46} className="rounded-lg" priority />

      <button
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary-soft"
      >
        <Menu className="h-6 w-6 text-primary" aria-hidden="true" />
      </button>
    </header>
  );
}
