"use client";

import { Locale } from "@/types";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn, TextReveal } from "@/components/ui/animation-wrappers";
import { motion } from "framer-motion";

export function ClientsSection({ lang }: { lang: Locale }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    // 1. Define Clients Data 
    const clients = [
        { name: lang === 'ar' ? "صندوق تنمية وإعمار ليبيا" : "Libya Reconstruction Fund", logo: "/images/clients/reconstruction-fund-new.png" },
        { name: lang === 'ar' ? "ليبيانا للهاتف المحمول" : "Libyana Mobile Phone", logo: "/images/clients/libyana.png" },
        { name: lang === 'ar' ? "المصرف التجاري الوطني" : "National Commercial Bank", logo: "/images/clients/ncb.png" },
        { name: lang === 'ar' ? "مصرف الوحدة" : "Wahda Bank", logo: "/images/clients/wahda.png" },
        { name: lang === 'ar' ? "وزارة المالية" : "Ministry of Finance", logo: "/images/clients/finance-ministry-transparent.png" },
        { name: lang === 'ar' ? "الهيئة العامة للأوقاف" : "General Authority for Awqaf", logo: "/images/clients/awqaf.jpg" },
        { name: lang === 'ar' ? "مصرف التجارة والتنمية" : "Bank of Commerce & Development", logo: "/images/clients/bcd.png" },
        { name: lang === 'ar' ? "مصرف ليبيا المركزي" : "Central Bank of Libya", logo: "/images/clients/cbl-final.png" },
        { name: lang === 'ar' ? "حكومة الوحدة الوطنية (وزارة الزراعة)" : "Ministry of Agriculture", logo: "/images/clients/ministry-agra.png" },
        { name: lang === 'ar' ? "نادي الأخضر الرياضي" : "Al-Akhdar Sport Club", logo: "/images/clients/akhdar-transparent.png" },
        { name: lang === 'ar' ? "المجلس البلدي البيضاء" : "Al-Bayda Municipal Council", logo: "/images/clients/al-bayda-municipal.png" },
        { name: lang === 'ar' ? "بريد ليبيا" : "Libya Post", logo: "/images/clients/libya-post.png" },
        { name: lang === 'ar' ? "جامعة السيد محمد بن علي السنوسي الإسلامية" : "Al-Senussi Islamic University", logo: "/images/clients/senussi-university.png" },
        { name: lang === 'ar' ? "وزارة الصحة" : "Ministry of Health", logo: "/images/clients/ministry-health.png" },
        { name: lang === 'ar' ? "وزارة العدل" : "Ministry of Justice", logo: "/images/clients/ministry-justice.png" },
        { name: lang === 'ar' ? "مصرف شمال أفريقيا" : "North Africa Bank", logo: "/images/clients/nab-bank.png" },
        { name: lang === 'ar' ? "شركة إعمار ليبيا القابضة" : "Emaar Libya Holding Co.", logo: "/images/clients/emaar-libya.png" },
    ];

    // Triple duplication ensures smooth scrolling
    const displayClients = [...clients, ...clients, ...clients];

    // Auto-Scroll Logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        let animationFrameId: number;

        const animate = () => {
            if (scrollContainer && !isPaused) {
                // Slower scroll on mobile for better readability
                scrollContainer.scrollLeft += isTouchDevice ? 0.5 : 0.8;
                const singleSetWidth = scrollContainer.scrollWidth / 3;
                if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
                    scrollContainer.scrollLeft = singleSetWidth;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        if (scrollContainer) {
            const singleSetWidth = scrollContainer.scrollWidth / 3;
            // Initialize scrol position if starting
            if (scrollContainer.scrollLeft < 10) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
        }

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isTouchDevice]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
        setIsPaused(true);
        // Resume after user interaction
        setTimeout(() => setIsPaused(false), 2000);
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
    };

    return (
        <section className="py-16 md:py-28 lg:py-32 bg-neutral-50 relative group/section overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
            </div>

            {/* Smooth Transition Masks */}
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-24 md:h-32 bg-gradient-to-t from-neutral-50 to-transparent z-10 pointer-events-none" />

            <div className="container-custom relative z-10 mb-10 md:mb-16 text-center px-4">
                <FadeIn direction="up">
                    <span className="inline-block py-1.5 md:py-2 px-4 md:px-6 rounded-full bg-primary/5 backdrop-blur-md border border-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 shadow-lg">
                        {lang === 'ar' ? "شركاء النجاح" : "Our Partners"}
                    </span>
                </FadeIn>

                <div className="mb-4 md:mb-6">
                    <TextReveal text={lang === 'ar' ? "نفخر بثقة كبرى المؤسسات" : "Trusted by Major Institutions"} className="justify-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground" />
                </div>

                <FadeIn delay={0.2}>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed px-2">
                        {lang === 'ar'
                            ? "علاقات استراتيجية راسخة مع وصفوة المؤسسات في القطاعين العام والخاص."
                            : "Established strategic relationships with elite institutions in both public and private sectors."}
                    </p>
                </FadeIn>

                {/* Manual Controls - Hidden on mobile, they usually swipe */}
                <div className="hidden md:flex gap-4 justify-center mt-8 rtl:flex-row-reverse">
                    <button
                        onClick={scrollLeft}
                        className="w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 backdrop-blur-sm"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 backdrop-blur-sm"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="relative w-full overflow-hidden" dir="ltr">
                {/* Gradient Masks for seamless fade - Smaller on mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide py-4 px-4 items-center"
                    style={{
                        scrollBehavior: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
                >
                    {displayClients.map((client, idx) => (
                        <ClientCard key={`${client.name}-${idx}`} client={client} isMobile={isTouchDevice} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}

function ClientCard({ client, isMobile }: { client: { name: string, logo: string }, isMobile?: boolean }) {
    return (
        <div className="group flex flex-col items-center gap-2 md:gap-4 shrink-0 cursor-pointer select-none">
            <div className="w-[120px] h-[80px] sm:w-[150px] sm:h-[100px] md:w-[280px] md:h-[180px] flex items-center justify-center p-2 md:p-4 transition-all duration-500 group-hover:-translate-y-2">
                <div className="relative w-full h-full">
                    <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain p-1 md:p-2 transition-all duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                        sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 280px"
                    />
                </div>
            </div>
            {/* Name hidden on mobile for cleaner look, visible on larger screens */}
            <span className="hidden md:block text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center max-w-[240px] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                {client.name}
            </span>
        </div>
    );
}
