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
      <div className="h-16 max-w-7xl items-center flex  mx-auto">
        <div className="gap-4 flex">
          {items.map((it) => {
            const active = pathname === it.href;

            return (
              <Link href={it.href} key={it.href}
                className={`p-1.5 rounded-2xl duration-200
                  hover:bg-white/10
                  hover:-translate-y-1
                ${active ? "bg-white/15 text-white" : ""}
                `}>
                {it.label}</Link>
            )
          })}
        </div>
      </div>
    </nav>
  );
}
