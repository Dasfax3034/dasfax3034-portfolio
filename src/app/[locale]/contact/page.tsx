"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Send, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@dasfax3034.dev",
    href: "mailto:contact@dasfax3034.dev",
    description: "Pour toute demande professionnelle",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "@dasfax3034",
    href: "https://github.com/dasfax3034",
    description: "Explorez mes projets open source",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "Dasfax3034",
    href: "https://linkedin.com/in/dasfax3034",
    description: "Connectons-nous professionnellement",
  },
];

const serviceTypes = [
  "Développement web (Next.js/React)",
  "Application mobile (iOS/SwiftUI)",
  "Site e-commerce",
  "Site vitrine/corporate",
  "Consultation technique",
  "Formation/Mentoring",
  "Autre",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log("Formulaire soumis:", formData);
    // Pour l'instant, on peut rediriger vers mailto
    const subject = encodeURIComponent(`Demande: ${formData.service || "Contact"}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:contact@dasfax3034.dev?subject=${subject}&body=${body}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">Contact</h1>
          <p className="text-xl text-muted-foreground">
            Parlons de votre projet ensemble
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-4xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg mb-2">Localisation</CardTitle>
              <CardDescription>Île-de-France, France</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg mb-2">Disponibilité</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mb-2">Freelance ouvert</Badge>
                <br />
                Réponse sous 24h
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Send className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg mb-2">Langues</CardTitle>
              <CardDescription>Français, English</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-moi un message</CardTitle>
              <CardDescription>
                Décrivez votre projet et je vous répondrai rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Type de service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Sélectionnez un service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Contact Methods */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Autres moyens de contact</h2>
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{method.title}</h3>
                          <p className="text-primary hover:underline">
                            <a href={method.href} target="_blank" rel="noopener noreferrer">
                              {method.value}
                            </a>
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Quels sont vos tarifs ?</h4>
                <p className="text-sm text-muted-foreground">
                  Mes tarifs varient selon la complexité du projet. 
                  Contactez-moi pour un devis personnalisé.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Combien de temps pour un projet ?</h4>
                <p className="text-sm text-muted-foreground">
                  De 1 à 4 semaines selon l&apos;ampleur. Je fournis toujours 
                  une estimation détaillée avant de commencer.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Travaillez-vous en équipe ?</h4>
                <p className="text-sm text-muted-foreground">
                  Principalement en solo, mais je peux collaborer avec 
                  des designers ou d&apos;autres développeurs si nécessaire.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}