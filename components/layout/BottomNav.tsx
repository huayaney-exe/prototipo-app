"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Clock, User } from "lucide-react";

const navItems = [
  { href: "/home", icon: Home, label: "Inicio" },
  { href: "/banco", icon: CreditCard, label: "Pagar" },
  { href: "/historial", icon: Clock, label: "Historial" },
  { href: "/cuenta", icon: User, label: "Cuenta" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegación principal">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
