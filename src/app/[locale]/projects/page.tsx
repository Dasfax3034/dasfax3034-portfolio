"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  {
    id: 1,
    title: "First Line Shop",
    description: "Plateforme e-commerce complète avec gestion des commandes, paiements Stripe et interface administrateur. Système de panier avancé et gestion d'inventaire.",
    category: "client",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    status: "Terminé",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "3x8 Group",
    description: "Site corporate moderne avec animations GSAP fluides, design responsive et optimisation SEO. Interface élégante pour présenter les services de l'entreprise.",
    category: "client",
    tech: ["Next.js", "GSAP", "Framer Motion", "TypeScript", "Tailwind CSS"],
    status: "Terminé",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Xplorafit",
    description: "Landing page pour application sportive avec design moderne et animations interactives. Focus sur l'expérience utilisateur et la conversion.",
    category: "client",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    status: "Terminé",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Personnel",
    description: "Portfolio moderne avec thème sombre/clair, animations GSAP et architecture modulaire. Optimisé pour les performances et le SEO.",
    category: "personal",
    tech: ["Next.js", "TypeScript", "Shadcn/ui", "Tailwind CSS", "GSAP"],
    status: "En cours",
    year: "2025",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Hack ton lycée - Solution",
    description: "Application web développée en 48h pour améliorer la communication entre élèves et administration. Interface intuitive et fonctionnalités collaboratives.",
    category: "hackathon",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    status: "Prototype",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "FitTracker iOS",
    description: "Application iOS native pour le suivi d'activités sportives avec SwiftUI. Interface moderne et intégration HealthKit.",
    category: "ios",
    tech: ["SwiftUI", "Swift", "HealthKit", "Core Data"],
    status: "En développement",
    year: "2025",
    liveUrl: null,
    githubUrl: "#",
    featured: false,
  },
];

const categories = [
  { id: "all", label: "Tous les projets" },
  { id: "client", label: "Projets clients" },
  { id: "personal", label: "Projets personnels" },
  { id: "hackathon", label: "Hackathons" },
  { id: "ios", label: "Applications iOS" },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "En cours":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "En développement":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Prototype":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">Mes Projets</h1>
          <p className="text-xl text-muted-foreground">
            Une sélection de mes réalisations en développement web et mobile
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold">{projects.length}+</div>
            <div className="text-sm text-muted-foreground">Projets réalisés</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {projects.filter(p => p.category === "client").length}
            </div>
            <div className="text-sm text-muted-foreground">Projets clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">2+</div>
            <div className="text-sm text-muted-foreground">Années d&apos;expérience</div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Projects Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={getStatusColor(project.status)}
                            variant="secondary"
                          >
                            {project.status}
                          </Badge>
                          <Badge variant="outline">{project.year}</Badge>
                          {project.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <Link href={project.liveUrl} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={project.githubUrl} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Aucun projet trouvé dans cette catégorie.
                </p>
              </div>
            )}
          </div>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto py-16 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Intéressé par mon travail ?</CardTitle>
            <CardDescription>
              N&apos;hésitez pas à me contacter pour discuter de vos projets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/contact">
                Démarrer un projet
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}