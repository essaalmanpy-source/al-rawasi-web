"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "@/components/ui/project-card";
import { Locale } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    location: string;
    year: string;
}

interface ProjectsScrollWrapperProps {
    projects: Project[];
    lang: Locale;
}

export function ProjectsScrollWrapper({ projects, lang }: ProjectsScrollWrapperProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const isRTL = lang === 'ar';

    useGSAP(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: isRTL ? "100vw" : "-100vw", // Basic scrolling logic, needs adjustment for content width
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top",
                    scrub: 0.6,
                    pin: true,
                    // snap: 1 / (projects.length - 1), // Optional snapping
                },
            }
        );

        // Correct logic: Translate based on total width
        // We need to calculate the total scrollable width
        const scrollWidth = sectionRef.current?.scrollWidth;
        const windowWidth = window.innerWidth;
        const amountToScroll = (scrollWidth || 0) - windowWidth;

        // Kill previous instance to reset with correct values
        pin.kill();

        if (amountToScroll > 0) {
            gsap.to(sectionRef.current, {
                x: isRTL ? amountToScroll : -amountToScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=" + (amountToScroll + 500), // Scroll distance matching content
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });
        }

    }, { scope: triggerRef, dependencies: [projects, isRTL] });

    return (
        <section className="relative overflow-hidden bg-secondary-dark" ref={triggerRef}>
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary-dark via-transparent to-secondary-dark" />
            </div>

            {/* Header / Intro pinned at start */}
            <div className="absolute top-12 left-0 w-full z-10 px-8 md:px-16 flex justify-between items-end pointer-events-none">
                <div className="pointer-events-auto">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-2 font-heading tracking-tighter">
                        {lang === 'ar' ? "مشارعنا" : "Selected"} <br />
                        <span className="text-accent">{lang === 'ar' ? "المختارة" : "Works"}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md mt-4 text-lg">
                        {lang === 'ar'
                            ? "استكشف مجموعة مختارة من مشاريعنا الهندسية المعقدة والمبتكرة."
                            : "Explore a curated selection of our most complex and innovative engineering feats."}
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="hidden md:flex flex-col items-center gap-2 animate-pulse">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground rotate-90 origin-right translate-x-2">Scroll</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="h-screen flex items-center pl-[5vw] pr-[5vw] md:pl-[30vw] md:pr-[10vw]" ref={sectionRef}>
                <div className="flex gap-8 md:gap-16 px-4">
                    {projects.map((project, index) => (
                        <div key={project.id} className="w-[85vw] md:w-[600px] flex-shrink-0">
                            <ProjectCard
                                {...project}
                                index={index}
                            />
                        </div>
                    ))}

                    {/* "View All" Card at the end */}
                    <div className="w-[300px] flex-shrink-0 flex items-center justify-center">
                        <a href="/projects" className="group flex flex-col items-center justify-center h-[200px] w-[200px] rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-accent hover:border-accent transition-all duration-500 cursor-pointer">
                            <span className="text-lg font-bold text-white group-hover:text-secondary-dark transition-colors">
                                {lang === 'ar' ? "عرض الكل" : "View All"}
                            </span>
                            <ArrowRight className={`w-6 h-6 text-white mt-2 group-hover:text-secondary-dark transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
