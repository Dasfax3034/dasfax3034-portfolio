"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface AnimatedLinkProps {
  href: string;
    target?: string;
    rel?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}: AnimatedLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const labels = link.querySelector(".labels") as HTMLElement | null;
    const front = labels?.querySelector(".label-front") as HTMLElement | null;
    const back = labels?.querySelector(".label-back") as HTMLElement | null;

    if (!front || !back) return;

    // Initial positions
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

    return () => {
      link.removeEventListener("mouseenter", onEnter);
      link.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Link
      href={href}
      ref={linkRef}
      onClick={onClick}
      target={target}
      rel={rel}
      className={cn(
        "relative inline-block overflow-hidden align-middle font-medium",
        className
      )}
    >
      <span className="labels relative block overflow-hidden">
        {/* Hidden measure to define height */}
        <span className="label-measure block invisible">{children}</span>
        <span className="label-front absolute inset-0 flex items-center justify-center">
          {children}
        </span>
        <span className="label-back absolute inset-0 flex items-center justify-center">
          {children}
        </span>
      </span>
    </Link>
  );
}
