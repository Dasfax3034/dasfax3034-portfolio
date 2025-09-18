import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Simulation d'articles de blog (en attendant l'intégration MDX)
const blogPosts = [
  {
    id: 1,
    title: "Comment j'ai créé ma première app iOS en SwiftUI à 16 ans",
    description: "Mon parcours d'apprentissage de SwiftUI, les défis rencontrés et les leçons apprises lors du développement de ma première application iOS native.",
    date: "2025-01-15",
    readTime: "8 min",
    category: "iOS Development",
    language: "fr",
    slug: "premiere-app-ios-swiftui",
    featured: true,
  },
  {
    id: 2,
    title: "Next.js + GSAP : créer une expérience web fluide",
    description: "Guide complet pour intégrer GSAP dans un projet Next.js et créer des animations web performantes qui améliorent l'expérience utilisateur.",
    date: "2025-01-10",
    readTime: "12 min",
    category: "Web Development",
    language: "fr",
    slug: "nextjs-gsap-animations",
    featured: true,
  },
  {
    id: 3,
    title: "Why I started coding in middle school",
    description: "My journey from curiosity to passion, how I discovered programming and why starting early gave me a unique perspective on technology.",
    date: "2025-01-05",
    readTime: "6 min",
    category: "Career",
    language: "en",
    slug: "why-i-started-coding",
    featured: false,
  },
  {
    id: 4,
    title: "Building an e-commerce platform at 16",
    description: "The challenges and lessons learned while developing First Line Shop, from payment integration to user experience design.",
    date: "2024-12-20",
    readTime: "10 min",
    category: "Case Study",
    language: "en",
    slug: "building-ecommerce-platform",
    featured: false,
  },
  {
    id: 5,
    title: "Freelance à 16 ans : mes conseils pour commencer",
    description: "Comment j'ai commencé le freelance en développement web, les erreurs à éviter et mes conseils pour jeunes développeurs.",
    date: "2024-12-15",
    readTime: "7 min",
    category: "Business",
    language: "fr",
    slug: "freelance-conseils-jeunes-dev",
    featured: false,
  },
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Mes réflexions sur le développement, l&apos;entrepreneuriat et la tech
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8">Articles en vedette</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Featured</Badge>
                    <Badge variant="outline">{post.category}</Badge>
                    <Badge variant="secondary" className="text-xs">
                      {post.language.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Lire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="max-w-6xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Tous les articles</h2>
          <div className="text-sm text-muted-foreground">
            {blogPosts.length} article{blogPosts.length > 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <Badge variant="secondary" className="text-xs">
                    {post.language.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <BookOpen className="h-5 w-5" />
              Restez informé
            </CardTitle>
            <CardDescription>
              Abonnez-vous pour recevoir mes derniers articles sur le développement et l&apos;entrepreneuriat
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Newsletter bientôt disponible ! En attendant, suivez-moi sur GitHub pour mes derniers projets.
            </p>
            <Button variant="outline" asChild>
              <Link href="https://github.com/dasfax3034" target="_blank">
                Suivre sur GitHub
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}