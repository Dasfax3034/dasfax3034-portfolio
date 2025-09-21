import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { navigationItems } from "@/lib/pages";
import { AnimatedLink } from "./AnimateLink";
import { useTranslations } from "next-intl";

const socialLinks = [
  { href: "https://github.com/dasfax3034", icon: Github, label: "GitHub" },
  {
    href: "https://linkedin.com/in/dasfax3034",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:yassnem9@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("title")}</h3>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">{t("navigation")}</h4>
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <AnimatedLink
                  key={item.href}
                  href={item.href}
                  className="text-sm w-fit"
                >
                  {tHeader(item.label)}
                </AnimatedLink>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">{t("connect")}</h4>
            <div className="flex flex-col space-y-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div className="flex items-center space-x-2" key={link.href}>
                    <Icon className="size-4" />
                    <AnimatedLink
                      href={link.href}
                      className="text-sm w-fit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </AnimatedLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">{t("richesse")}</p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
