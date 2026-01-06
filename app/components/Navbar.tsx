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
      {/* 스크롤 영역 */}
      <div className="h-16 max-w-7xl mx-auto flex items-center px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* iOS/모바일에서 스크롤 감도 개선 */}
        <div className="flex flex-nowrap gap-4 min-w-max py-2">
          {items.map((it) => {
            const active = pathname === it.href;

            return (
              <Link
                href={it.href}
                key={it.href}
                className={[
                  "shrink-0 p-1.5 rounded-2xl duration-200 transition",
                  "hover:bg-white/10 hover:-translate-y-1",
                  active ? "bg-white/15 text-white" : "text-white/80",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-5 animate-pulse rounded-l-3xl
                      md:hidden  bg-gradient-to-l from-black/20 to-transparent" />

    </nav>
  );
}
