import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const years = [2022, 2023, 2024, 2025];

const ExperienceCards: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = el.querySelectorAll(".year-card");

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, rotate: -5 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/50 dark:to-blue-950/50 rounded-2xl relative overflow-hidden"
    >
      <h3 className="text-sm font-medium text-cyan-700 dark:text-cyan-300 mb-4">
        Expérience
      </h3>

      <div className="flex gap-4">
        {years.map((year, i) => (
          <div
            key={year}
            className={cn(
              "year-card w-16 h-20 transform bg-white dark:bg-cyan-900 rounded-xl shadow-md flex items-center justify-center font-bold text-cyan-600 dark:text-cyan-300 cursor-pointer",
              i === 0 ? "rotate-0" : i === 1 ? "rotate-1" : i === 2 ? "rotate-2" : "rotate-3"
            )}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCards;
