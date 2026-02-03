"use client";

import { Locale } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const partners = [
    {
        name: { en: "GAD Industries", ar: "صناعات جاد" },
        logo: "/images/partners/gad-industries.jpg",
        url: "https://www.facebook.com/Gad.Industries/?locale=ar_AR",
        description: { en: "Industrial Solutions", ar: "حلول صناعية" }
    },
    {
        name: { en: "Premium Language Centre", ar: "مركز بريميوم للغات" },
        logo: "/images/partners/plc.jpg",
        url: "https://www.facebook.com/plc.kl/",
        description: { en: "Language Education", ar: "تعليم اللغات" }
    },
    {
        name: { en: "Linex Architects", ar: "لاينكس للمعمار" },
        logo: "/images/partners/linex-architects.jpg",
        url: "https://www.facebook.com/p/Linex-Architects-100093201830630/",
        description: { en: "Architectural Design", ar: "التصميم المعماري" }
    },
    {
        name: { en: "Egyptian House For Architecture", ar: "البيت المصري للهندسة المعمارية" },
        logo: "/images/partners/egyptian-house.png",
        url: "https://www.facebook.com/people/Egyptian-House-For-Architecture-Planning/100063859246418",
        description: { en: "Architecture & Planning", ar: "الهندسة المعمارية والتخطيط" }
    },
    {
        name: { en: "Shine Company", ar: "شركة شاين" },
        logo: "/images/partners/shine-company.jpg",
        url: "https://shinecompany.org/",
        description: { en: "Professional Services", ar: "خدمات احترافية" }
    },
    {
        name: { en: "Saobracaj", ar: "ساوبراتشاي" },
        logo: "/images/partners/saobracaj.jpg",
        url: "https://www.saobracaj.rs/en/",
        description: { en: "Transport Solutions", ar: "حلول النقل" }
    }
];

export function PartnersSection({ lang }: { lang: Locale }) {
    const isRTL = lang === "ar";
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Lower threshold for mobile
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white"
        >
            {/* Animated Background Elements - Reduced for mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Orbs - Hidden on mobile */}
                <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-purple-600/5 rounded-full blur-3xl animate-pulse" />
                <div className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px"
                    }}
                />
            </div>

            {/* Top Transition Gradient */}
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-neutral-50 to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-10 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs md:text-sm font-medium mb-4 md:mb-6 backdrop-blur-sm">
                        {isRTL ? "شراكات استراتيجية" : "Strategic Partnerships"}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 px-2">
                        {isRTL ? "الشركات المساندة" : "Supporting Companies"}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                        {isRTL
                            ? "شركاء نجاحنا الذين نفخر بالتعاون معهم لتقديم أفضل الخدمات"
                            : "Our valued partners who help us deliver excellence in every project"
                        }
                    </p>
                </div>

                {/* Partners Grid - Responsive Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-2 sm:px-0">
                    {partners.map((partner, index) => (
                        <Link
                            key={partner.name.en}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative transition-all duration-700 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-16"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }} // Faster delay
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className={`relative bg-white backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 lg:p-8 border border-border/30 transition-all duration-500 overflow-hidden shadow-sm ${hoveredIndex === index
                                    ? "border-primary/30 shadow-lg scale-[1.02] md:scale-105"
                                    : "hover:shadow-md"
                                    }`}
                            >
                                {/* Glow Effect on Hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent rounded-2xl md:rounded-3xl transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                                        }`}
                                />

                                {/* Corner Accent - Mobile optimized */}
                                <div className="absolute top-0 right-0 w-24 h-24">
                                    <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-500 ${hoveredIndex === index ? "bg-primary-300 scale-150" : "bg-white/30"
                                        }`} />
                                </div>

                                {/* Logo Container */}
                                <div className="relative z-10 mb-4 md:mb-6 flex justify-center">
                                    <div
                                        className={`relative w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-lg transition-all duration-500 ${hoveredIndex === index ? "shadow-2xl shadow-primary/30 scale-105" : ""
                                            }`}
                                    >
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name[lang]}
                                            fill
                                            className="object-contain p-3 md:p-4"
                                            sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                                        />
                                    </div>
                                </div>

                                {/* Partner Info */}
                                <div className="relative z-10 text-center">
                                    <h3 className={`text-lg lg:text-xl font-bold text-foreground mb-1 md:mb-2 transition-colors duration-300 ${hoveredIndex === index ? "text-black" : ""
                                        }`}>
                                        {partner.name[lang]}
                                    </h3>
                                    <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                                        {partner.description[lang]}
                                    </p>

                                    {/* Visit Button */}
                                    <div className={`flex items-center justify-center gap-2 text-primary text-xs md:text-sm font-medium transition-all duration-300 ${hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                                        }`}>
                                        <svg
                                            className="w-4 h-4 md:w-5 md:h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        <span>{isRTL ? "زيارة الموقع" : "Visit Website"}</span>
                                        <svg
                                            className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${isRTL ? "rotate-180" : ""} ${hoveredIndex === index ? "translate-x-1" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Decorative Line */}
                <div
                    className={`mt-16 lg:mt-20 flex justify-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                </div>
            </div>
        </section>
    );
}
