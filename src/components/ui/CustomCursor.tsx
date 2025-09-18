"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", onMove);

    let running = true;
    const tick = () => {
      if (!running) return;
      posX = lerp(posX, mouseX, 0.16);
      posY = lerp(posY, mouseY, 0.16);
      gsap.set(cursor, { x: posX, y: posY });

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    // Hover effects on interactive elements
    const onEnter = () => {
      gsap.to(cursor, {
        scale: 2.5,
        duration: 0.28,
        ease: "power3.out",
        backgroundColor: "rgba(255,255,255,0.95)",
      });
    };
    const onLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.28,
        ease: "power3.out",
        backgroundColor: "rgba(255,255,255,0.8)",
      });
    };

    // Attach to all anchors and buttons
    const interactive = Array.from(
      document.querySelectorAll("a, button, .interactive-link")
    ) as HTMLElement[];
    interactive.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    // Hide on touch devices (optional)
    const touchHandler = () => {
      gsap.to(cursor, { autoAlpha: 0, duration: 0.2 });
    };
    window.addEventListener("touchstart", touchHandler, { passive: true });

    return () => {
      running = false;
      document.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
      window.removeEventListener("touchstart", touchHandler);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden />;
}
