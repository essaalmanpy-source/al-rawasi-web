"use client";

import { Locale } from "@/types";
import { Building2, Ruler, ClipboardCheck, TreePine, Search, ShieldCheck, Lightbulb, Microscope, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, MouseEvent, useState, useEffect } from "react";

interface ServicesPreviewProps {
    lang: Locale;
    limit?: number;
}

// Premium 3D Tilt Card with Background Animation
function ServiceCard({
    service,
    lang,
    index,
    isMobile
}: {
    service: { icon: any; title: string; desc: string; href: string };
    lang: Locale;
    index: number;
    isMobile: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for 3D tilt (Desktop only)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-8, 8]), springConfig);

    // Background image 3D movement
    const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [15, -15]), springConfig);
    const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [15, -15]), springConfig);
    const bgScale = useSpring(isHovered ? 1.1 : 1, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    const Icon = service.icon;

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 1200,
            }}
            className="h-full"
        >
            <div className="block h-full group cursor-pointer">
                <div className="relative h-full overflow-hidden rounded-2xl transition-all duration-500 ease-out border backdrop-blur-md
                    border-border/30 bg-white shadow-sm hover:border-primary/30 hover:shadow-lg">

                    {/* Animated Background Image Layer */}
                    <motion.div
                        className="absolute inset-0 z-0 overflow-hidden rounded-2xl"
                        style={{
                            x: bgX,
                            y: bgY,
                            scale: bgScale,
                        }}
                    >
                        <Image
                            src="/images/services-bg.jpg"
                            alt=""
                            fill
                            className="object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                            quality={isMobile ? 60 : 75}
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                        {/* Gradient overlay for depth */}
                        <div className="absolute inset-0 
                            bg-gradient-to-t from-white/95 via-white/50 to-transparent"
                        />
                    </motion.div>

                    {/* Hover Glow Effect - Reduced intensity on mobile */}
                    <div
                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(${isMobile ? '300px' : '600px'} circle at 50% 50%, rgba(var(--primary-rgb), 0.08), transparent 40%)`,
                        }}
                    />

                    {/* Content Layer */}
                    <div
                        className="relative z-10 p-6 md:p-8 h-full flex flex-col"
                        style={{ transform: isMobile ? "none" : "translateZ(40px)" }}
                    >
                        {/* Icon Container */}
                        <motion.div
                            className="w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-6 rounded-xl bg-gradient-to-br from-primary/25 via-primary/15 to-purple-600/15 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5"
                            style={{ transform: isMobile ? "none" : "translateZ(50px)" }}
                            whileHover={isMobile ? {} : { scale: 1.08, rotateZ: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-300" strokeWidth={1.5} />
                        </motion.div>

                        {/* Title */}
                        <h3
                            className="text-lg md:text-[1.35rem] font-bold font-heading text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors duration-400 leading-tight"
                            style={{ transform: isMobile ? "none" : "translateZ(30px)" }}
                        >
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p
                            className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 md:mb-5 group-hover:text-foreground/80 transition-colors duration-400 flex-grow"
                            style={{ transform: isMobile ? "none" : "translateZ(20px)" }}
                        >
                            {service.desc}
                        </p>
                    </div>

                    {/* Subtle top highlight */}
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>
        </motion.div>
    );
}

export function ServicesPreview({ lang, limit }: ServicesPreviewProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const isRTL = lang === 'ar';
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const services = [
        {
            icon: Search,
            title: lang === 'ar' ? "الدراسات والتخطيط" : "Studies & Planning",
            desc: lang === 'ar' ? "تصميم المواقع، تحليل احتياجات المشاريع، والدراسات البيئية." : "Site design, project needs analysis, and environmental studies.",
            href: "/services/planning"
        },
        {
            icon: Ruler,
            title: lang === 'ar' ? "التصاميم الهندسية" : "Engineering Designs",
            desc: lang === 'ar' ? "تطوير التصاميم الإنشائية، وأنظمة الكهروميكانيك والاتصالات." : "Structural development, electromechanical, and telecom systems.",
            href: "/services/engineering"
        },
        {
            icon: ClipboardCheck,
            title: lang === 'ar' ? "إدارة المشاريع" : "Project Management",
            desc: lang === 'ar' ? "الإشراف الفني، مراقبة الجودة، وإدارة الجداول الزمنية والتكاليف." : "Technical supervision, quality control, and schedule/cost management.",
            href: "/services/management"
        },
        {
            icon: ShieldCheck,
            title: lang === 'ar' ? "استشارات السلامة المهنية" : "Occupational Safety",
            desc: lang === 'ar' ? "مراجعة نظم السلامة في الموقع لضمان الامتثال للقوانين المحلية." : "Reviewing site safety systems to ensure local law compliance.",
            href: "/services/safety"
        },
        {
            icon: Lightbulb,
            title: lang === 'ar' ? "الاستشارات الفنية التخصصية" : "Specialized Consulting",
            desc: lang === 'ar' ? "حل المشاكل أثناء التنفيذ وتقديم المشورة للمواد والمعدات." : "Problem solving during execution and equipment/material advice.",
            href: "/services/consulting"
        },
        {
            icon: Building2,
            title: lang === 'ar' ? "تنمية العقارات" : "Real Estate Development",
            desc: lang === 'ar' ? "إعادة تأهيل المدن المتضررة وتطوير المشاريع العقارية الكبرى." : "Rehabilitating affected cities and developing major real estate projects.",
            href: "/services/real-estate"
        },
        {
            icon: TreePine,
            title: lang === 'ar' ? "التخطيط الحضري" : "Urban Planning",
            desc: lang === 'ar' ? "رؤية مستدامة لتطوير الفضاءات الحضرية والمجتمعات." : "Sustainable vision for urban spaces and community development.",
            href: "/services/urban-planning"
        },
        {
            icon: Microscope,
            title: lang === 'ar' ? "الإشراف على الاختبارات الهندسية" : "Testing Supervision",
            desc: lang === 'ar' ? "رقابة دقيقة على الاختبارات المعملية والميدانية لضمان الجودة." : "Rigorous control of lab and field tests to ensure quality.",
            href: "/services/testing"
        },
        {
            icon: GraduationCap,
            title: lang === 'ar' ? "التدريب" : "Training",
            desc: lang === 'ar' ? "تطوير الكفاءات البشرية في المجالات الهندسية المختلفة." : "Human resources development in various engineering fields.",
            href: "/services/training"
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-16 md:py-28 lg:py-36 overflow-hidden" id="services">
            {/* Background with Viewport-Triggered Fade */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <Image
                    src="/images/services-bg.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    quality={isMobile ? 60 : 85}
                    priority
                />
                <div className="absolute inset-0 
                    bg-white/90 md:bg-white/80 backdrop-blur-[2px]"
                />
                {/* Subtle noise texture - lighter on mobile */}
                <div className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }} />
            </motion.div>

            {/* Top Transition Mask */}
            <div className="absolute top-0 inset-x-0 h-24 md:h-40 pointer-events-none z-10
                bg-gradient-to-b from-background to-transparent"
            />

            {/* Top Architectural Divider */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />

            {/* Content */}
            <div className="container-custom relative z-10 px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16 lg:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="inline-block px-4 md:px-5 py-1.5 md:py-2 mb-4 md:mb-6 text-xs md:text-sm font-medium rounded-full border 
                            text-primary/80 bg-primary/5 border-primary/10"
                    >
                        {lang === 'ar' ? 'ماذا نقدم' : 'What We Offer'}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-4 md:mb-6 tracking-tight"
                    >
                        {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2"
                    >
                        {lang === 'ar'
                            ? 'نقدم مجموعة شاملة من الخدمات الهندسية والاستشارية بأعلى معايير الجودة والاحترافية'
                            : 'We provide a comprehensive range of engineering and consulting services with the highest standards of quality and professionalism'}
                    </motion.p>
                </div>

                {/* Services Grid - Single column on mobile, responsive grid on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 px-0 md:px-0">
                    {services.slice(0, limit).map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{
                                duration: 0.6,
                                delay: isMobile ? 0.2 : 0.6 + (idx * 0.08), // Faster stagger on mobile
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            style={{ perspective: 1200 }}
                            className="h-[280px] md:h-full" // Fixed height for consistency on mobile
                        >
                            <ServiceCard service={service} lang={lang} index={idx} isMobile={isMobile} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    className="mt-12 md:mt-16 lg:mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                >
                    <Link
                        href={limit ? `/${lang}/services` : `/${lang}/contact`}
                        className="group inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-primary via-primary-dark to-purple-700 text-white font-bold text-sm md:text-base rounded-full shadow-[0_8px_30px_rgba(var(--primary-rgb),0.25)] hover:shadow-[0_15px_50px_rgba(var(--primary-rgb),0.35)] hover:-translate-y-1 active:scale-95 transition-all duration-400 ease-out relative overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative z-10">
                            {limit
                                ? (lang === 'ar' ? 'عرض جميع الخدمات' : 'View All Services')
                                : (lang === 'ar' ? 'اطلب استشارة هندسية' : 'Request Engineering Consultation')
                            }
                        </span>
                        {isRTL ? (
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                        ) : (
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Transition Mask */}
            <div className="absolute bottom-0 inset-x-0 h-24 md:h-40 pointer-events-none z-10
                bg-gradient-to-t from-background to-transparent"
            />

            {/* Bottom Divider */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 1.6 }}
            />
        </section>
    );
}
