import { Home, LayoutGrid, Users, User, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Bottom navigation items (max 5 per UX guidance). */
export const navItems: NavItem[] = [
  { label: "Inicio", href: "/feed", icon: Home },
  { label: "Avisos", href: "/news", icon: LayoutGrid },
  { label: "Comunidad", href: "/community", icon: Users },
  { label: "Perfil", href: "/profile", icon: User },
];
