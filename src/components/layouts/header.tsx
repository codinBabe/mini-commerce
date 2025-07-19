"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User, Search, Heart, X } from "lucide-react";
import { Button, Input } from "../ui";
import { cn } from "@/lib";
import { useCart } from "@/store/cart";
import { usePathname } from "next/navigation";
import { useHasMounted } from "@/hooks";

const Header = () => {
  const pathname = usePathname();
  const hasMounted = useHasMounted();
  const totalItems = useCart((state) => state.getTotalItems());

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#B5B5B5] bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          Mini Commerce
        </Link>

        {/* Search - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xs ml-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-full bg-[var(--bg-input)]"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 ml-6">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-[var(--color-black)] font-medium"
                : "text-[var(--text-secondary)]"
            }
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? "text-[var(--color-black)] font-medium"
                : "text-[var(--text-secondary)]"
            }
          >
            About
          </Link>
          <Link
            href="/contact"
            className={
              pathname === "/contact"
                ? "text-[var(--color-black)] font-medium"
                : "text-[var(--text-secondary)]"
            }
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className={
              pathname === "/blog"
                ? "text-[var(--color-black)] font-medium"
                : "text-[var(--text-secondary)]"
            }
          >
            Blog
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/favorites">
            <Heart className="h-5 w-5" />
          </Link>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {hasMounted && totalItems > 0 && (
                <span
                  className={cn(
                    "absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full",
                    "bg-red-500 text-white text-xs font-medium flex items-center justify-center"
                  )}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/profile">
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white shadow-sm">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
