"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Link as IntlLink } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/lib/pages";
import { Button } from "./ui/button";
import gsap from "gsap";
import { AnimatedLink } from "./AnimateLink";

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header");
  const [isScrolled, setIsScrolled] = useState(false);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Enhanced appearance animation using GSAP timeline + logo hover
  useEffect(() => {
    const logoEl = logoRef.current;
    if (!logoEl) return;
    // collect navigation link elements
    const navEls = linkRefs.current.filter(
      (el): el is HTMLAnchorElement => el !== null
    );
    // build timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    // logo letters animate in staggered with rotation & scale
    const letters = logoEl.querySelectorAll(".logo-letter");
    tl.from(
      letters,
      {
        opacity: 0,
        y: 30,
        stagger: { each: 0.05, from: "start" },
        duration: 0.6,
      },
      0
    );
    // nav links slide in staggered
    if (navEls.length) {
      tl.from(
        navEls,
        { opacity: 0, y: 30, stagger: 0.15, duration: 0.6 },
        "-=0.7"
      );
    }
    // magnifier effect on mouse move
    const onLogoMove = (e: MouseEvent) => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        const maxDist = 80; // smaller influence radius
        const strength = 0.4; // reduce max scale effect
        const factor = Math.max(0, (maxDist - dist) / maxDist);
        const scale = 1 + factor * strength;
        gsap.to(letter, { scale, duration: 0.2, ease: "power1.out" });
      });
    };
    const onLogoLeaveMagnify = () => {
      letters.forEach((letter) => {
        gsap.to(letter, { scale: 1, duration: 0.3, ease: "power3.out" });
      });
    };
    logoEl.addEventListener("mousemove", onLogoMove);
    logoEl.addEventListener("mouseleave", onLogoLeaveMagnify);
    return () => {
      logoEl.removeEventListener("mousemove", onLogoMove);
      logoEl.removeEventListener("mouseleave", onLogoLeaveMagnify);
      tl.kill();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        isScrolled
          ? "md:backdrop-blur md:bg-background/60 md:border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link
          href="/"
          passHref
          ref={(el) => {
            logoRef.current = el;
          }}
          className="font-semibold text-2xl font-satoshi inline-block"
        >
          {Array.from("Dasfax3034").map((char, i) => (
            <span key={i} className="logo-letter inline-block">
              {char}
            </span>
          ))}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <AnimatedLink key={item.href} href={item.href}>
              {t(item.label)}
            </AnimatedLink>
          ))}
          <Button
            variant={"outline"}
            size={"icon"}
            animations={"border"}
            className="text-xs font-semibold !bg-transparent rounded-full"
            asChild
          >
            <IntlLink
              href={`/${pathname.split("/")[2] || ""}`}
              locale={locale === "fr" ? "en" : "fr"}
            >
              {locale === "fr" ? "EN" : "FR"}
            </IntlLink>
          </Button>
        </nav>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden">
          {/* Placeholder for mobile menu button */}
          <Button variant="ghost" className="flex w-8 py-2 flex-col justify-between" size="icon">
            <span className="sr-only">Open menu</span>
            <span className="w-full h-0.5 transition-all transform mix-blend-difference"></span>
            <span className="w-full h-0.5 transition-all transform mix-blend-difference"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}
