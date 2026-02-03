"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectScene } from "@/components/home/project-scene";
import { Locale } from "@/types";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    location: string;
    year: string;
    desc: string;
}

interface ProjectsShowcaseProps {
    projects: Project[];
    lang: Locale;
}

export function ProjectsShowcase({ projects, lang, isHomePage = false }: ProjectsShowcaseProps & { isHomePage?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Optional: Add global scroll management here if needed
    // Currently, ProjectScene handles its own internal parallax.
    // This container ensures a smooth dark environment.

    return (
        <div ref={containerRef} className="relative transition-colors duration-500
            dark:bg-secondary-dark
            light:bg-white text-foreground">
            {/* Introductory Header - Pinned or Floating */}
            <div className="py-24 container-custom text-center">
                <span className="inline-block py-1 px-3 rounded-full text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6
                    dark:bg-white/5 dark:border-white/10
                    light:bg-primary/5 light:border-primary/10">
                    {lang === 'ar' ? "أعمالنا المختارة" : "Selected Works"}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-foreground">
                    {lang === 'ar' ? "التميز الهندسي" : "Engineering Excellence"}
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                    {lang === 'ar'
                        ? "نحول التحديات المعقدة إلى حلول هندسية مستدامة."
                        : "Transforming complex challenges into sustainable engineering solutions."}
                </p>
            </div>

            {/* Scenes Stack */}
            <div className="relative z-10">
                {projects.map((project, index) => (
                    <ProjectScene
                        key={project.id}
                        project={project}
                        index={index}
                        lang={lang}
                    />
                ))}
            </div>

            {/* Footer / Closing Statement */}
            <div className="py-32 flex flex-col items-center justify-center text-center transition-colors duration-500
                dark:bg-black/20
                light:bg-neutral-50 light:border-y light:border-border/10">
                {isHomePage ? (
                    <a
                        href={`/${lang}/projects`}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-primary-dark to-purple-700 text-white font-bold text-base rounded-full shadow-[0_8px_30px_rgba(var(--primary-rgb),0.25)] hover:shadow-[0_15px_50px_rgba(var(--primary-rgb),0.35)] hover:-translate-y-1 transition-all duration-400 ease-out relative overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative z-10">{lang === 'ar' ? "عرض جميع المشاريع" : "View All Projects"}</span>
                    </a>
                ) : (
                    <div className="max-w-3xl px-6">
                        <h3 className="text-4xl md:text-6xl font-bold font-heading mb-8 text-foreground">
                            {lang === 'ar' ? "هل أنت مستعد لبناء المستقبل؟" : "Ready to Build the Future?"}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                            {lang === 'ar'
                                ? "دعنا نحول رؤيتك إلى واقع ملموس بأعلى معايير الجودة والاحترافية."
                                : "Let's turn your vision into reality with the highest standards of quality and professionalism."}
                        </p>
                        <a
                            href={`/${lang}/contact`}
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-accent font-bold text-lg rounded-full shadow-[0_0_30px_rgba(255,198,0,0.3)] hover:shadow-[0_0_50px_rgba(255,198,0,0.5)] transition-all duration-300 transform hover:-translate-y-1
                                dark:text-secondary-dark dark:hover:bg-white
                                light:text-primary light:hover:bg-primary light:hover:text-white"
                        >
                            <span>{lang === 'ar' ? "تواصل معنا اليوم" : "Contact Us Today"}</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
