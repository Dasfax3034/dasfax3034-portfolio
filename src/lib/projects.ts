export interface Project {
    key: string; // sert aussi pour les traductions
    category: "client" | "personal" | "hackathon";
    tech: string[];
    status: "Completed" | "Near Completion" | "In Progress" | "Prototype";
    year: string;
    liveUrl?: string;
    githubUrl?: string;
    presentationUrl?: string;
    featured?: boolean;
    image: string;
}

const projects: Project[] = [
    {
        key: "first-line-shop",
        category: "client",
        tech: ["Next.js", "TypeScript", "Stripe", "Supabase", "Tailwind CSS"],
        status: "Near Completion",
        year: "2025",
        liveUrl: "https://first-line-shop.com/",
        featured: true,
        image: "/images/projects/first-line-shop.png"
    },
    {
        key: "3x8-group",
        category: "client",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
        status: "Near Completion",
        year: "2025",
        liveUrl: "https://3x8group.com/",
        featured: true,
        image: "/images/projects/3x8-group.png"
    },
    {
        key: "xplorafit",
        category: "client",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
        status: "Completed",
        year: "2024",
        liveUrl: "https://xplorafit.com/",
        image: "/images/projects/xplorafit.png"
    },
    {
        key: "stop83",
        category: "client",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
        status: "Completed",
        year: "2024",
        liveUrl: "https://stop83.com/",
        image: "/images/projects/stop83.png"
    },
    {
        key: "first-line-production",
        category: "client",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
        status: "Completed",
        year: "2024",
        featured: true,
        liveUrl: "https://firstlineproduction.com/",
        image: "/images/projects/first-line-production.png"
    },
    {
        key: "carolol",
        category: "client",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
        status: "Completed",
        year: "2025",
        liveUrl: "https://carolol.be/",
        image: "/images/projects/carolol.png"
    },
    {
        key: "rentrez-dans-lart",
        category: "personal",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
        status: "Completed",
        year: "2024",
        liveUrl: "https://rentrezdanslart.com/",
        image: "/images/projects/rentrez-dans-lart.png"
    },
    {
        key: "virtual-cook",
        category: "personal",
        tech: ["SwiftUI", "iOS"],
        status: "In Progress",
        year: "2024",
        githubUrl: "https://github.com/Dasfax3034/VirtualCook",
        image: "/images/projects/virtual-cook.png"
    },
    {
        key: "flowticket",
        category: "personal",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe Connect"],
        status: "Prototype",
        year: "2025",
        image: "/images/projects/flowticket.png"
    },
    {
        key: "hackathon-idf",
        category: "hackathon",
        tech: ["PHP", "Node.js", "Express", "MongoDB", "Python"],
        status: "Completed",
        year: "2024",
        presentationUrl: "https://transfonum.monlycee.net/hack-ton-lycee/",
        image: "/images/projects/hack-ton-lycee.png"
    }
];

export default projects;
