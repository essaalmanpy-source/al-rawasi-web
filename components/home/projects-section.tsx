"use client";

import { Locale } from "@/types";
import { ProjectsShowcase } from "@/components/home/projects-showcase";
import { getProjects } from "@/lib/data/projects";

export function ProjectsSection({ lang }: { lang: Locale }) {
    const projects = getProjects(lang);

    // Display the first 5 projects on the home page showcase
    const displayedProjects = projects.slice(0, 5);

    return (
        <ProjectsShowcase projects={displayedProjects} lang={lang} isHomePage={true} />
    );
}
