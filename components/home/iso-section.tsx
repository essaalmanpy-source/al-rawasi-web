"use client";

import { Locale } from "@/types";
import Image from "next/image";
import { FadeIn, TextReveal } from "@/components/ui/animation-wrappers";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Shield } from "lucide-react";

export function ISOSection({ lang }: { lang: Locale }) {
    const certificates = [
        {
            name: "ISO 9001:2015",
            title: lang === 'ar' ? "نظام إدارة الجودة" : "Quality Management System",
            description: lang === 'ar'
                ? "معيار دولي لأنظمة إدارة الجودة يضمن تقديم خدمات تلبي متطلبات العملاء والمعايير المعمول بها"
                : "International standard for quality management systems ensuring services meet customer requirements and applicable standards",
            image: "/images/certificates/iso-9001.jpg",
            icon: Award,
            color: "from-blue-500 to-blue-700"
        },
        {
            name: "ISO 14001:2015",
            title: lang === 'ar' ? "نظام الإدارة البيئية" : "Environmental Management System",
            description: lang === 'ar'
                ? "معيار دولي يوضح التزامنا بالحفاظ على البيئة وتقليل التأثير البيئي لأنشطتنا"
                : "International standard demonstrating our commitment to environmental protection and reducing environmental impact",
            image: "/images/certificates/iso-14001.jpg",
            icon: Shield,
            color: "from-green-500 to-green-700"
        },
        {
            name: "ISO 45001:2018",
            title: lang === 'ar' ? "نظام إدارة الصحة والسلامة المهنية" : "Occupational Health & Safety Management",
            description: lang === 'ar'
                ? "معيار دولي يضمن توفير بيئة عمل آمنة وصحية لجميع الموظفين والمتعاملين"
                : "International standard ensuring a safe and healthy work environment for all employees and stakeholders",
            image: "/images/certificates/iso-45001.jpg",
            icon: BadgeCheck,
            color: "from-amber-500 to-amber-700"
        }
    ];

    return (
        <section className="py-16 md:py-28 lg:py-32 bg-neutral-50 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            </div>

            <div className="container-custom relative z-10 px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <FadeIn direction="up">
                        <span className="inline-block py-2 px-6 rounded-full bg-primary/5 backdrop-blur-md border border-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 shadow-lg">
                            {lang === 'ar' ? "الشهادات والاعتمادات" : "Certifications & Accreditations"}
                        </span>
                    </FadeIn>

                    <div className="mb-4 md:mb-6">
                        <TextReveal
                            text={lang === 'ar' ? "معتمدون دولياً" : "Internationally Certified"}
                            className="justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground"
                        />
                    </div>

                    <FadeIn delay={0.2}>
                        <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-light leading-relaxed px-2">
                            {lang === 'ar'
                                ? "نلتزم بأعلى معايير الجودة والسلامة والحفاظ على البيئة من خلال حصولنا على شهادات الأيزو الدولية"
                                : "We adhere to the highest standards of quality, safety, and environmental protection through our international ISO certifications"}
                        </p>
                    </FadeIn>
                </div>

                {/* Certificates Grid - Stacked on Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {certificates.map((cert, index) => (
                        <FadeIn key={cert.name} delay={0.1 * index} direction="up">
                            <CertificateCard cert={cert} lang={lang} />
                        </FadeIn>
                    ))}
                </div>

                {/* Bottom Section */}
                <FadeIn delay={0.5}>
                    <div className="mt-12 md:mt-16 text-center px-4">
                        <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto">
                            {lang === 'ar'
                                ? "جميع شهاداتنا صادرة من هيئات اعتماد دولية معترف بها وتخضع للمراجعة والتدقيق الدوري"
                                : "All our certifications are issued by recognized international accreditation bodies and subject to regular review and audit"}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

function CertificateCard({ cert, lang }: { cert: any; lang: Locale }) {
    const Icon = cert.icon;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
        >
            {/* Gradient Overlay */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`} />

            {/* Icon - Adjusted position for mobile */}
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 md:top-6 md:right-6 md:rtl:left-6 z-10">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
            </div>

            {/* Certificate Image - Adjusted height for mobile */}
            <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-2xl shrink-0">
                <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
            </div>

            {/* Content - Equal height flex */}
            <div className="p-5 md:p-6 space-y-2 md:space-y-3 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-heading">
                    {cert.name}
                </h3>
                <h4 className="text-base md:text-lg font-semibold text-accent">
                    {cert.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {cert.description}
                </p>
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
        </motion.div>
    );
}
