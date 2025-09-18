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

  useEffect(() => {
    // Animate front/back labels separately with GSAP
    const handlers: Array<{
      link: HTMLAnchorElement;
      onEnter: () => void;
      onLeave: () => void;
    }> = [];
    linkRefs.current.forEach((link) => {
      if (!link) return;
      const labels = link.querySelector(".labels") as HTMLElement | null;
      const front = labels?.querySelector(".label-front") as HTMLElement | null;
      const back = labels?.querySelector(".label-back") as HTMLElement | null;
      if (!front || !back) return;

      // initial positions
      gsap.set(front, { yPercent: 0 });
      gsap.set(back, { yPercent: 100 });

      const onEnter = () => {
        gsap.to(front, { yPercent: -100, duration: 0.5, ease: "power3.out" });
        gsap.to(back, { yPercent: 0, duration: 0.5, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(front, { yPercent: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(back, { yPercent: 100, duration: 0.5, ease: "power3.out" });
      };

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      handlers.push({ link, onEnter, onLeave });
    });
    return () => {
      handlers.forEach(({ link, onEnter, onLeave }) => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    };
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
    // hover scale for logo
    const onEnterLogo = () =>
      gsap.to(logoEl, { scale: 1.1, duration: 0.3, ease: "power3.out" });
    const onLeaveLogo = () =>
      gsap.to(logoEl, { scale: 1, duration: 0.3, ease: "power3.out" });
    logoEl.addEventListener("mouseenter", onEnterLogo);
    logoEl.addEventListener("mouseleave", onLeaveLogo);
    return () => {
      logoEl.removeEventListener("mouseenter", onEnterLogo);
      logoEl.removeEventListener("mouseleave", onLeaveLogo);
      tl.kill();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        isScrolled
          ? "backdrop-blur bg-background/60 border-b"
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
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              passHref
              className={cn(
                "relative inline-block overflow-hidden align-middle font-medium"
              )}
            >
              <span className="labels relative block overflow-hidden">
                {/* hidden measure to define height */}
                <span className="label-measure block invisible">
                  {t(item.label)}
                </span>
                <span className="label-front absolute inset-0 flex items-center justify-center">
                  {t(item.label)}
                </span>
                <span className="label-back absolute inset-0 flex items-center justify-center">
                  {t(item.label)}
                </span>
              </span>
            </Link>
          ))}
          <Button
            variant={"outline"}
            size={"icon"}
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
      </div>
    </header>
  );
}
