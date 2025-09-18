import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Trophy } from "lucide-react";

const HackathonBadge: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const badge = element.querySelector(".badge");
    const trophy = element.querySelector(".trophy");
    const particles = element.querySelectorAll(".particle");

    const tl = gsap.timeline({ paused: true });
    tl.to(badge, { scale: 1.2, duration: 0.4, ease: "back.out(1.7)" })
      .to(trophy, { rotation: 360, duration: 0.8, ease: "power2.inOut", repeat: 1, yoyo: true }, "<")
      .to(particles, {
        x: () => `${gsap.utils.random(-30, 30)}px`,
        y: () => `${gsap.utils.random(-30, -60)}px`,
        opacity: 1,
        scale: 1.2,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }, "<0.1");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center col-span-2 w-full h-full min-h-[8rem]
                 bg-gradient-to-tr from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50
                 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden"
    >
      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle absolute size-2 bg-amber-400 rounded-full opacity-0 scale-0"
          style={{
            left: `${20 + i * (i < 4 ? 4 : 10)}%`,
            top: `${30 + (i % 2) * (i < 4 ? 40 : 20)}%`,
          }}
        />
      ))}

      {/* Badge */}
      <div className="badge relative flex flex-col items-center z-10">
        <Trophy className="trophy h-14 w-14 text-amber-500 mb-2 drop-shadow-lg" />
        <div className="text-3xl font-bold font-satoshi text-amber-700 dark:text-amber-300 mb-1 animate-pulse">
          17e
        </div>
        <div className="text-xs text-amber-600 dark:text-amber-400 text-center">
          / 150 équipes
        </div>
      </div>
    </div>
  );
};

export default HackathonBadge;
