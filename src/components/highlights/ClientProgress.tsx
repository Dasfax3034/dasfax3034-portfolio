import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Briefcase } from "lucide-react";

const ClientProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(100);

  const animateProgress = () => {
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: function () {
        setProgress(Math.floor(this.targets()[0].value));
      }
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={animateProgress}
      className="flex flex-col items-center justify-center p-6 relative overflow-hidden 
                 flex-1 w-full h-full min-h-[6rem] col-span-2
                 bg-gradient-to-br from-green-50 to-emerald-100 
                 dark:from-green-950/50 dark:to-emerald-950/50 
                 rounded-lg"
    >
      <Briefcase className="h-8 w-8 text-green-600 mb-4" />
      <div className="w-full max-w-48 bg-green-200 dark:bg-green-800 rounded-full h-2 mb-3">
        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-sm font-medium text-green-700 dark:text-green-300">
        {progress}% Satisfaction
      </div>
    </div>
  );
};

export default ClientProgress;
