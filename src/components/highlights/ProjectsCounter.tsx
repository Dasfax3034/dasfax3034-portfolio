import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Rocket } from "lucide-react";

const ProjectsCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const animateCounter = () => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 6,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(counter.value)),
    });

    // Animation des points
    const dots = ref.current?.querySelectorAll(".dot");
    if (dots) {
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );
    }

    // Petite translation rocket
    const rocket = ref.current?.querySelector(".rocket");
    if (rocket) {
      gsap.fromTo(
        rocket,
        { y: 10 },
        { y: -10, repeat: 1, yoyo: true, duration: 0.6, ease: "power1.inOut" }
      );
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounter();
          observer.unobserve(element);
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
      onMouseEnter={animateCounter}
      className="relative flex flex-col items-center justify-center col-span-2 w-full min-h-[8rem] h-full
                 bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50
                 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden"
    >
      {/* Fond subtil animé */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse-slow"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-4xl font-bold font-satoshi text-primary mb-2 drop-shadow-sm">
          {count}+
        </div>

        <Rocket className="rocket h-10 w-10 text-primary/70 mb-3" />

        <div className="flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`dot w-3 h-3 rounded-full transition-all duration-300 ${
                i < count ? "bg-primary shadow-lg" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCounter;
