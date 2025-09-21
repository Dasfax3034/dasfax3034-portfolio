"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Card } from "@/components/ui/card";
import projects from "@/lib/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  Trophy,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Mail,
  Code2,
  Calendar,
  Zap,
} from "lucide-react";
import ProjectsCounter from "@/components/highlights/ProjectsCounter";
import HackathonBadge from "@/components/highlights/HackathonBadge";
import ClientProgress from "@/components/highlights/ClientProgress";
import TechStack from "@/components/highlights/TechStack";
import ExperienceCards from "@/components/highlights/ExperienceCards";
import CodeAnimation from "@/components/highlights/CodeAnimation";
import Image from "next/image";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const t = useTranslations("HomePage");
  const tProjects = useTranslations("Projects");
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Projets featured (les 3 premiers avec featured: true)
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  // Données pour les highlights avec composants animés
  const highlights = [
    {
      title: t("highlights.projects.title"),
      description: t("highlights.projects.description"),
      header: <ProjectsCounter />,
      className: "md:col-span-2 lg:col-span-1",
      icon: <Rocket className="size-4 text-blue-500" />,
    },
    {
      title: t("highlights.hackathon.title"),
      description: t("highlights.hackathon.description"),
      header: <HackathonBadge />,
      className: "md:col-span-1",
      icon: <Trophy className="size-4 text-amber-500" />,
    },
    {
      title: t("highlights.tech.title"),
      description: t("highlights.tech.description"),
      header: <TechStack />,
      className: "md:col-span-2",
      icon: <Code2 className="size-4 text-purple-500" />,
    },
    {
      title: t("highlights.clients.title"),
      description: t("highlights.clients.description"),
      header: <ClientProgress />,
      className: "md:col-span-2",
      icon: <Briefcase className="size-4 text-green-500" />,
    },
    {
      title: t("highlights.experience.title"),
      description: t("highlights.experience.description"),
      header: <ExperienceCards />,
      className: "md:col-span-1",
      icon: <Calendar className="size-4 text-cyan-500" />,
    },
    {
      title: t("highlights.cleanCode.title"),
      description: t("highlights.cleanCode.description"),
      header: <CodeAnimation />,
      className: "md:col-span-1",
      icon: <Zap className="size-4 text-indigo-500" />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du hero avec effet magnétique
      if (titleRef.current) {
        // Wrap each character in spans for both lines separately
        const line1 = titleRef.current.querySelector(".title-line1");
        const line2 = titleRef.current.querySelector(".title-line2");
        const wrapChars = (el: Element | null) => {
          if (!el) return;
          const text = el.textContent || "";
          const words = text.split(" ");
          el.innerHTML = words
            .map((word) => {
              const chars = word
                .split("")
                .map((char) => `<span class="inline-block hover-char">${char}</span>`)
                .join("");
              return `<span class="inline-block">${chars}</span>`;
            })
            .join(" ");
        };
        wrapChars(line1);
        wrapChars(line2);
        const titleChars = titleRef.current.querySelectorAll(
          ".title-line1 span, .title-line2 span"
        );

        // Animation d'entrée
        gsap.from(titleChars, {
          opacity: 0,
          y: 100,
          rotation: 15,
          scale: 0.3,
          duration: 1.2,
          stagger: {
            amount: 1,
            from: "center",
            ease: "power2.out",
          },
          ease: "elastic.out(1, 0.8)",
          delay: 0.3,
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.5,
          delay: 1.8,
          ease: "power3.out",
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          scale: 0.5,
          y: 50,
          duration: 1,
          stagger: 0.2,
          delay: 2.5,
          ease: "elastic.out(1, 0.8)",
        });
      }

      // Animation des projets featured avec parallax
      if (projectsRef.current) {
        const projectCards =
          projectsRef.current.querySelectorAll(".project-card");

        projectCards.forEach((card) => {
          const image = card.querySelector(".project-image");
          const content = card.querySelector(".project-content");

          gsap.fromTo(
            [image, content],
            {
              opacity: 0,
              y: 80,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              stagger: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Parallax sur l'image
          gsap.to(image, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }

      // Animation de la bio avec morphing
      if (bioRef.current) {
        const portrait = bioRef.current.querySelector(".bio-portrait");
        const bioContent = bioRef.current.querySelector(".bio-content");

        gsap.fromTo(
          portrait,
          {
            scale: 0.5,
            opacity: 0,
            rotation: -180,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 2,
            ease: "elastic.out(1, 0.8)",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          bioContent,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Starfield Canvas Animation
  useEffect(() => {
    // Animation and fade-out durations (ms)
    const maxDuration = 3000;
    const fadeDuration = 2000;
    const startTime = performance.now();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
    }));
    let mouseX = width / 2;
    let mouseY = height / 2;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);
    const onResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);
    let frameId: number;
    const render = () => {
      // Calculate fade factor
      const elapsed = performance.now() - startTime;
      let factor = 1;
      if (elapsed > maxDuration) {
        factor = Math.max(0, 1 - (elapsed - maxDuration) / fadeDuration);
      }
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = factor;
      stars.forEach((star) => {
        const dx = (star.x - mouseX) * 0.02;
        const dy = (star.y - mouseY) * 0.02;
        star.x += dx;
        star.y += dy;
        // Reset stars that move too far off-screen to avoid wrapping jumps
        if (
          star.x < -star.size ||
          star.x > width + star.size ||
          star.y < -star.size ||
          star.y > height + star.size
        ) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      // Schedule next frame until fade completes
      const elapsedTotal = performance.now() - startTime;
      if (elapsedTotal < maxDuration + fadeDuration) {
        frameId = requestAnimationFrame(render);
      }
    };
    render();
    // After maxDuration, remove listeners to freeze animation
    const timeoutId = setTimeout(() => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    }, maxDuration);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with modern design */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-12 pt-20 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
      >
        <canvas ref={canvasRef} className="absolute inset-0 size-full" />

        {/* Gradient orbs for visual appeal */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-accent/10 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-primary">
                    {t("hero.availability")}
                  </span>
                </div>

                <h1
                  ref={titleRef}
                  className="text-5xl md:text-7xl font-bold font-satoshi leading-tight cursor-default"
                >
                  <div className="title-line1 block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
                    {t("hero.title")}
                  </div>
                  <div className="title-line2 block text-2xl md:text-3xl text-muted-foreground font-medium mt-2">
                    (aka Dasfax3034)
                  </div>
                </h1>
              </div>

              <p
                ref={subtitleRef}
                className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                {t("hero.subtitle")}
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" passHref>
                  <Button size="lg" animations={"light"}>
                    <span className="relative z-10">{t("hero.cta1")}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Link passHref href="/contact">
                  <Button variant="outline" size="lg" animations={"border"}>
                    {t("hero.cta2")}
                    <Mail className="size-4 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">
                    {t("hero.projects")}
                  </div>
                </div>
                <div className="flex flex-col align-center">
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">
                    {t("hero.experience")}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">
                    {t("hero.passion")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Profile */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl rotate-12 group-hover:rotate-24 transition-transform duration-500" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl -rotate-12 group-hover:-rotate-24 transition-transform duration-500" />

                <div className="relative w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-border/50 shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                  <Image
                    src="/profile.png"
                    alt={t("hero.profileAlt")}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />

                  {/* Overlay with tech stack */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Stack actuel</div>
                      <div className="flex gap-2 flex-wrap">
                        {["React", "Next.js", "TypeScript", "Tailwind"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-md"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section - Bento Grid Premium */}
      <section
        ref={highlightsRef}
        className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-satoshi text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
            {t("highlights.title")}
          </h2>
          <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <BentoGridItem
                key={index}
                className={`highlight-card cursor-pointer group ${highlight.className}`}
                title={highlight.title}
                description={highlight.description}
                header={highlight.header}
                icon={highlight.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section
        ref={projectsRef}
        className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-muted/30 to-background"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-satoshi text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
            {t("featuredProjects.title")}
          </h2>
          <div className="space-y-12">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.key}
                className="project-card pb-0 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-6 lg:gap-8 px-6 pt-8 pb-0`}
                >
                  {/* Image */}
                  <div className="project-image lg:w-1/2 relative h-64 lg:h-80 overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={tProjects(`Title.${project.key}`)}
                      fill
                      className="object-cover transition-transform duration-700"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="project-content lg:w-1/2 flex flex-col justify-center">
                    <span className="inline-block py-1 text-xs font-medium bg-accent/10 text-accent-foreground rounded-full mb-2 ">
                      {tProjects(`Status.${project.status}`)}
                    </span>
                    <h3 className="text-2xl font-bold font-satoshi mb-3">
                      {tProjects(`Title.${project.key}`)}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {tProjects(`Description.${project.key}`)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button asChild size="sm" className="group">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t("featuredProjects.viewOnline")}
                            <ExternalLink className=" h-3 w-3 transition-transform group-hover:scale-110" />
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link href="/projects">
                          {t("featuredProjects.details")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/projects" passHref>
              <Button size="lg" animations={"light"}>
                {t("featuredProjects.cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bio Section - Modern Cards Grid */}
      <section
        ref={bioRef}
        className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-background via-muted/20 to-background"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-satoshi mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
              {t("bio.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("bio.description")}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Passion Card */}
            <Card className="bio-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl animate-pulse" />
              </div>
              <h3 className="text-lg font-bold font-satoshi mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t("bio.passion.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("bio.passion.description")}
              </p>
            </Card>

            {/* Learning Card */}
            <Card className="bio-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl" />
              </div>
              <h3 className="text-lg font-bold font-satoshi mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t("bio.learning.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("bio.learning.description")}
              </p>
            </Card>

            {/* Innovation Card */}
            <Card className="bio-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl" />
              </div>
              <h3 className="text-lg font-bold font-satoshi mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t("bio.innovation.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("bio.innovation.description")}
              </p>
            </Card>

            {/* Collaboration Card */}
            <Card className="bio-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl" />
              </div>
              <h3 className="text-lg font-bold font-satoshi mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t("bio.collaboration.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("bio.collaboration.description")}
              </p>
            </Card>

            {/* Quality Card */}
            <Card className="bio-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl" />
              </div>
              <h3 className="text-lg font-bold font-satoshi mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t("bio.quality.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("bio.quality.description")}
              </p>
            </Card>

            {/* Vision Card */}
            <Card className="bio-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl" />
              </div>
              <h3 className="text-lg font-bold font-satoshi mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t("bio.vision.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("bio.vision.description")}
              </p>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/about" passHref>
              <Button size="lg" animations={"light"}>
                {t("bio.cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
