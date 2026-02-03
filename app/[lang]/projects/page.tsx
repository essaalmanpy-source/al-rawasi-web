
import { Metadata } from "next";
import { Locale } from "@/types";
import { getProjects, getGalleryProjects } from "@/lib/data/projects";
import ProjectsClient from "@/app/[lang]/projects/client";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
    const isAr = params.lang === "ar";
    return {
        title: isAr ? "مشاريعنا | الرواسي للاستشارات الهندسية" : "Our Projects | Al-Rawasi Engineering Consultants",
        description: isAr
            ? "اكتشف مجموعة مشاريعنا المتميزة التي تعكس التزامنا بالتميز الهندسي والابتكار."
            : "Explore our distinguished portfolio of projects reflecting our commitment to engineering excellence and innovation.",
    };
}

export default function ProjectsPage({ params }: { params: { lang: Locale } }) {
    const projects = getProjects(params.lang);
    const galleryProjects = getGalleryProjects();

    return (
        <ProjectsClient
            lang={params.lang}
            projects={projects}
            galleryProjects={galleryProjects}
        />
    );
}
