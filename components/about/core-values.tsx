"use client";

import { motion } from "framer-motion";
import { Locale } from "@/types";
import { ShieldCheck, Users, Zap, Award, HeartHandshake, Leaf } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animation-wrappers";
import { SectionHeading } from "@/components/ui/section-heading";

export function CoreValues({ lang }: { lang: Locale }) {
    const values = [
        {
            icon: ShieldCheck,
            title: lang === 'ar' ? "النزاهة" : "Integrity",
            desc: lang === 'ar' ? "نلتزم بأعلى المعايير الأخلاقية في جميع تعاملاتنا." : "We adhere to the highest ethical standards in all our dealings."
        },
        {
            icon: Award,
            title: lang === 'ar' ? "التميز" : "Excellence",
            desc: lang === 'ar' ? "لا نقبل بأقل من الجودة الفائقة في كل تفصيل." : "We accept nothing less than superior quality in every detail."
        },
        {
            icon: Zap,
            title: lang === 'ar' ? "الابتكار" : "Innovation",
            desc: lang === 'ar' ? "نبحث دائماً عن حلول إبداعية للتحديات الهندسية." : "We always seek creative solutions to engineering challenges."
        },
        {
            icon: Users,
            title: lang === 'ar' ? "العمل الجماعي" : "Teamwork",
            desc: lang === 'ar' ? "نؤمن بأن النجاح العظيم هو نتاج جهد جماعي." : "We believe that great success is the result of collective effort."
        },
        {
            icon: HeartHandshake,
            title: lang === 'ar' ? "الالتزام" : "Commitment",
            desc: lang === 'ar' ? "نفي بوعودنا ونسلم المشاريع في وقتها المحدد." : "We keep our promises and deliver projects on time."
        },
        {
            icon: Leaf,
            title: lang === 'ar' ? "الاستدامة" : "Sustainability",
            desc: lang === 'ar' ? "نصمم للمستقبل مع مراعاة التأثير البيئي." : "We design for the future considering environmental impact."
        }
    ];

    return (
        <section className="py-32 relative overflow-hidden transition-colors duration-500
            dark:bg-gradient-to-b dark:from-secondary-dark/90 dark:via-secondary-dark dark:to-secondary-dark
            light:bg-white">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-40 right-20 w-80 h-80 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                <SectionHeading
                    title={lang === 'ar' ? "قيمنا الجوهرية" : "Core Values"}
                    subtitle={lang === 'ar' ? "المبادئ التي تقودنا نحو النجاح" : "Principles guiding us to success"}
                    align="center"
                    dark
                />

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {values.map((val, idx) => (
                        <StaggerItem key={idx}>
                            <motion.div
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="p-8 rounded-2xl border transition-all duration-300 h-full group
                                    dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-primary/30
                                    light:bg-neutral-50 light:border-border/50 light:hover:bg-white light:hover:border-primary/30 light:shadow-sm light:hover:shadow-md"
                            >
                                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <val.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {val.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {val.desc}
                                </p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
