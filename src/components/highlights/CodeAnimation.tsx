import React, { useEffect, useRef, useState } from "react";

const CodeAnimation: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(
    [
      { text: "const portfolio = {", visible: false },
      { text: "\u00A0\u00A0\u00A0\u00A0\u00A0design: 'premium',", visible: false },
      { text: "\u00A0\u00A0\u00A0\u00A0\u00A0animations: 'smooth',", visible: false },
      { text: "\u00A0\u00A0\u00A0\u00A0\u00A0performance: '⚡'", visible: false },
      { text: "}", visible: false },
    ]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          lines.forEach((_, index) => {
            setTimeout(() => {
              setLines(prev => prev.map((line, i) => 
                i === index ? { ...line, visible: true } : line
              ));
            }, index * 300);
          });
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [lines]);

  return (
    <div
      ref={ref}
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-lg flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 w-full h-full text-xs font-mono">
        <div className="flex space-x-1 mb-2">
          <div className="size-2 bg-red-500 rounded-full"></div>
          <div className="size-2 bg-yellow-500 rounded-full"></div>
          <div className="size-2 bg-green-500 rounded-full"></div>
        </div>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              line.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            <span className="text-purple-400">{line.text}</span>
          </div>
        ))}
        <div className="w-1 h-3 bg-purple-400 animate-pulse inline-block"></div>
      </div>
    </div>
  );
};

export default CodeAnimation;
