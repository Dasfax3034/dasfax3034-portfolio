import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, GraduationCap, MapPin, Calendar } from "lucide-react";

const skills = {
  frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  backend: ["Node.js", "Python", "Express", "Prisma", "PostgreSQL"],
  mobile: ["SwiftUI", "Swift", "iOS Development"],
  tools: ["Git", "Vercel", "Stripe", "Figma", "VS Code"],
};

const timeline = [
  {
    year: "2023",
    title: "Découverte du développement",
    description: "Premiers pas en programmation au collège, passion immédiate pour le code",
  },
  {
    year: "2024",
    title: "Premiers projets freelance",
    description: "Création de sites web pour des entreprises locales",
  },
  {
    year: "2024",
    title: "Hackathon IDF",
    description: "17e place sur 100+ équipes, projet innovant en 48h",
  },
  {
    year: "2025",
    title: "Développement iOS",
    description: "Apprentissage de SwiftUI et développement d'applications mobiles",
  },
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">À propos de moi</h1>
          <p className="text-xl text-muted-foreground">
            Développeur passionné, entrepreneur en herbe
          </p>
        </div>
      </section>

      {/* Personal Info */}
      <section className="max-w-4xl mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Qui suis-je ?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>16 ans</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Île-de-France, France</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>Lycéen & Développeur</span>
              </div>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Salut ! Je m&apos;appelle <strong>Dasfax3034</strong>, et à 16 ans, je suis déjà passionné 
                par le développement web et mobile depuis plusieurs années.
              </p>
              <p>
                Mon parcours a commencé de façon... peu conventionnelle. Au collège, j&apos;ai découvert 
                le monde du hacking éthique, ce qui m&apos;a rapidement mené vers la programmation. 
                Cette curiosité initiale s&apos;est transformée en véritable passion pour créer des 
                solutions digitales innovantes.
              </p>
              <p>
                Aujourd&apos;hui, je combine mes études avec des projets freelance, développant des 
                sites e-commerce, des applications corporate et des expériences web interactives. 
                Mon objectif à long terme ? Intégrer une université prestigieuse comme le MIT pour 
                approfondir mes connaissances en informatique et innovation technologique.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Mes compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize text-lg">
                  {category === "frontend" ? "Frontend" : 
                   category === "backend" ? "Backend" :
                   category === "mobile" ? "Mobile" : "Outils"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Mon parcours</h2>
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{event.year}</Badge>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {event.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Goals & CTA */}
      <section className="max-w-4xl mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Mes objectifs</CardTitle>
            <CardDescription>
              Construire des applications qui allient design, technologie et impact positif
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Je rêve d&apos;intégrer le MIT ou une université similaire pour approfondir mes 
              connaissances en computer science. En attendant, je continue à apprendre, 
              à créer et à repousser les limites de ce qui est possible avec le code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/projects">
                  Voir mes projets
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Travaillons ensemble
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}