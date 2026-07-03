"use client";

import { useEffect, useState } from "react";
import { Menu, Close, ArrowRight } from "./icons";

const links = [
  { href: "#story", label: "The Ridge" },
  { href: "#rooms", label: "Rooms" },
  { href: "#experiences", label: "Days Here" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Getting Here" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile sheet is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-timber/92 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-baseline gap-2 text-on-timber"
        >
          <span className="font-serif text-xl font-600 tracking-tight sm:text-2xl">
            Kayon
          </span>
          <span className="text-xs uppercase tracking-[0.35em] text-ember-bright">
            Ridge
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-on-timber/80 transition-colors hover:text-on-timber"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-500 text-on-ember shadow-soft transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Reserve
            <ArrowRight width={16} height={16} />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-on-timber md:hidden cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="md:hidden"
      >
        {open && (
          <div className="grain-dark relative border-t border-white/10 bg-timber px-5 pb-8 pt-2">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/8 py-4 font-serif text-lg text-on-timber cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-3.5 font-500 text-on-ember cursor-pointer"
            >
              Reserve your stay
              <ArrowRight width={18} height={18} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
