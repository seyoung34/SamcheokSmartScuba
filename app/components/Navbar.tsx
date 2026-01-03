// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/safety", label: "Safety" },
    { href: "/gallery", label: "Gallery" },
    { href: "/location", label: "Location" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={pathname === it.href ? "text-white" : "text-gray-400"}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
