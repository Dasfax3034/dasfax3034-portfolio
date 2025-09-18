import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { navigationItems } from "@/lib/pages";

const socialLinks = [
  { href: "https://github.com/dasfax3034", icon: Github, label: "GitHub" },
  {
    href: "https://linkedin.com/in/dasfax3034",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:contact@dasfax3034.dev", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dasfax3034</h3>
            <p className="text-sm text-muted-foreground">
              16 y/o Fullstack Developer – Building digital experiences with
              Next.js, SwiftUI & Creative Coding
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 Dasfax3034. All rights reserved.
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
