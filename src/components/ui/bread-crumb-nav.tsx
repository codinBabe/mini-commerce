"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-10 flex items-center flex-wrap gap-x-2 text-[var(--text-secondary)]">
      <Link
        href="/"
        className={`hover:underline ${
          segments.length === 0 ? "text-[var(--color-black)] font-medium" : ""
        }`}
      >
        Home
      </Link>

      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const href = "/" + segments.slice(0, i + 1).join("/");

        return (
          <span key={i} className="flex items-center gap-x-2">
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link
              href={href}
              className={`hover:underline ${
                isLast ? "text-[var(--color-black)] font-medium" : ""
              }`}
            >
              {seg.charAt(0).toUpperCase() + seg.slice(1)}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
