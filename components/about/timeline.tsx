"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Locale } from "@/types";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

export function Timeline({ lang }: { lang: Locale }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const events = [
        { year: "2001", title: lang === 'ar' ? "التأسيس" : "Foundation", desc: lang === 'ar' ? "انطلقت شركة الرواسي برؤية واضحة لتقديم خدمات هندسية متميزة." : "Al-Rawasi launched with a clear vision to provide distinct engineering services." },
        { year: "2018", title: lang === 'ar' ? "التوسع" : "Expansion", desc: lang === 'ar' ? "توسيع نطاق الخدمات ليشمل التخطيط العمراني وإدارة المشاريع الكبرى." : "Expanded services to include urban planning and major project management." },
        { year: "2020", title: lang === 'ar' ? "شراكات استراتيجية" : "Strategic Partnerships", desc: lang === 'ar' ? "توقيع اتفاقيات تعاون مع شركات عالمية لتعزيز الخبرات المحلية." : "Signed cooperation agreements with global firms to enhance local expertise." },
        { year: "2023", title: lang === 'ar' ? "الريادة" : "Leadership", desc: lang === 'ar' ? "تصنيف الشركة كواحدة من أفضل المكاتب الاستشارية في المنطقة." : "Ranked as one of the top consultancy firms in the region." },
    ];

    return (
        <section ref={sectionRef} className="py-32 bg-background overflow-hidden relative transition-colors duration-500">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                <SectionHeading
                    title={lang === 'ar' ? "رحلة نجاح" : "Journey of Success"}
                    subtitle={lang === 'ar' ? "تاريخ حافل بالإنجازات المتواصلة" : "A history full of continuous achievements"}
                    align="center"
                    dark
                />

                <div className="relative mt-20 max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/20 -translate-x-1/2 rounded-full" />
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary to-accent -translate-x-1/2 rounded-full z-0"
                    />

                    <div className="space-y-24">
                        {events.map((event, idx) => (
                            <TimelineNode key={idx} event={event} idx={idx} isRTL={lang === 'ar'} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineNode({ event, idx, isRTL }: { event: any, idx: number, isRTL: boolean }) {
    const isEven = idx % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative flex items-center justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
        >
            {/* Content Side */}
            <div className={`w-[42%] ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-foreground/5 backdrop-blur-sm p-6 rounded-2xl border border-border/10 hover:bg-foreground/[0.08] hover:border-primary/30 transition-all duration-300 relative group
                    dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                    {/* Arrow */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground/5 rotate-45 border-border/10 transition-colors
                        ${isEven ? '-right-2 border-r border-t' : '-left-2 border-l border-b'}
                        dark:bg-white/5 dark:border-white/10`}
                    />


                    <h3 className="text-xl font-bold text-primary mb-2 relative z-10">{event.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{event.desc}</p>
                </div>
            </div>

            {/* Center Node */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                    className="w-4 h-4 bg-background border-4 border-primary rounded-full shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.2)]"
                />
            </div>

            {/* Empty Side */}
            <div className="w-[42%]" />
        </motion.div>
    );
}
