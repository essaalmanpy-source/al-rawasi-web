"use client";

import { motion } from "framer-motion";
import { Locale } from "@/types";
import { StaggerContainer, StaggerItem } from "@/components/ui/animation-wrappers";
import { Target, Lightbulb, Users } from "lucide-react";

export function VisionMission({ lang }: { lang: Locale }) {
    const isRTL = lang === 'ar';

    return (
        <section className="py-12 md:py-24 lg:py-32 overflow-hidden relative transition-colors duration-500
            bg-neutral-50 border-y border-border/10">
            {/* Decorative Background Elements - Hidden on mobile for cleaner look */}
            <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
                {/* Primary blur - positioned opposite to content */}
                <div className={`absolute top-20 w-96 h-96 bg-primary rounded-full blur-3xl transition-all duration-500
                    ${isRTL ? 'right-10' : 'left-10'}`}
                />
                {/* Accent blur - positioned opposite to visual card */}
                <div className={`absolute bottom-20 w-80 h-80 bg-accent rounded-full blur-3xl transition-all duration-500
                    ${isRTL ? 'left-10' : 'right-10'}`}
                />
            </div>

            <div className="container-custom relative z-10 px-4 md:px-6">
                {/* Grid - Single column on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Visual Side - Hidden on mobile, visible on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`relative h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] hidden md:block ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                        {/* Background shadow layer */}
                        <div className={`absolute inset-0 bg-primary/20 rounded-2xl md:rounded-3xl transform scale-95
                            ${isRTL ? '-rotate-3' : 'rotate-3'}`}
                        />

                        {/* Main card with gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transform hover:rotate-0 transition-all duration-700
                            ${isRTL ? 'rotate-2' : '-rotate-2'}`}
                        >
                            {/* Abstract Decorative Elements inside the card */}
                            <div className={`absolute top-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2
                                ${isRTL ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`}
                            />
                            <div className={`absolute bottom-0 w-48 md:w-64 h-48 md:h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2
                                ${isRTL ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}
                            />

                            {/* Vision text - centered */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white/20 text-5xl md:text-7xl lg:text-9xl font-black font-heading uppercase tracking-tighter select-none">
                                    {isRTL ? 'رؤيتنا' : 'Vision'}
                                </h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className={`space-y-6 md:space-y-10 lg:space-y-12 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                        <StaggerContainer>
                            {/* Vision Block */}
                            <StaggerItem>
                                <div className="group">
                                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="p-2 md:p-3 bg-primary/20 rounded-lg md:rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Lightbulb className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                                            {isRTL ? 'رؤيتنــا' : 'Our Vision'}
                                        </h2>
                                    </div>
                                    <p className={`text-muted-foreground text-base md:text-lg leading-relaxed border-primary/40
                                        ${isRTL
                                            ? 'pr-3 md:pr-4 border-r-2'
                                            : 'pl-3 md:pl-4 border-l-2'
                                        }`}
                                    >
                                        {isRTL
                                            ? 'الارتقاء بمعايير الجودة والأمان والوقاية والخدمة ضمن نطاق المشاريع الهندسية العامة والخاصة من خلال تقديم تصاميم مميزة والإشراف على تنفيذ المشاريع بالشكل المتطور والذي يحاكي المشاريع العالمية.'
                                            : 'Elevating standards of quality, safety, prevention, and service within public and private engineering projects by providing distinctive designs and supervising execution in an advanced manner that emulates global projects.'}
                                    </p>
                                </div>
                            </StaggerItem>

                            {/* Divider */}
                            <StaggerItem>
                                <motion.div
                                    className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent my-4 md:my-8"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                            </StaggerItem>

                            {/* Mission Block */}
                            <StaggerItem>
                                <div className="group">
                                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="p-2 md:p-3 bg-accent/20 rounded-lg md:rounded-xl text-accent group-hover:bg-accent group-hover:text-secondary-dark transition-colors duration-300">
                                            <Target className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                                            {isRTL ? 'مهمتنــا' : 'Our Mission'}
                                        </h2>
                                    </div>
                                    <p className={`text-muted-foreground text-base md:text-lg leading-relaxed border-accent/40
                                        ${isRTL
                                            ? 'pr-3 md:pr-4 border-r-2'
                                            : 'pl-3 md:pl-4 border-l-2'
                                        }`}
                                    >
                                        {isRTL
                                            ? 'تسخير أحدث التقنيات والخبرات العالمية لتقديم خدمات هندسية دقيقة ومبتكرة، تضمن لعملائنا الجودة العالية، والكفاءة الاقتصادية، والتميز المعماري.'
                                            : 'Harnessing the latest technologies and global expertise to provide precise and innovative engineering services, ensuring our clients high quality, economic efficiency, and architectural excellence.'}
                                    </p>
                                </div>
                            </StaggerItem>

                            {/* Divider */}
                            <StaggerItem>
                                <motion.div
                                    className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent my-4 md:my-8"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                            </StaggerItem>

                            {/* Environment Block */}
                            <StaggerItem>
                                <div className="group">
                                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="p-2 md:p-3 bg-green-500/20 rounded-lg md:rounded-xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                            <Users className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                                            {isRTL ? 'بيئة العمل' : 'Our Environment'}
                                        </h2>
                                    </div>
                                    <div className={`text-muted-foreground text-base md:text-lg leading-relaxed border-green-500/40 space-y-3 md:space-y-4
                                        ${isRTL
                                            ? 'pr-3 md:pr-4 border-r-2'
                                            : 'pl-3 md:pl-4 border-l-2'
                                        }`}
                                    >
                                        <p>
                                            {isRTL
                                                ? 'تهدف الشركة إلى خلق بيئة للعمل تطبق المسؤوليات الإدارية العليا وتضمن تفاعل الأفراد والأساليب والسياسات والتكنولوجيا لتحقيق جودة عالية للمخرجات.'
                                                : 'The company aims to create a work environment that applies senior management responsibilities and ensures the interaction of individuals, methods, policies, and technology to achieve high-quality outputs.'}
                                        </p>
                                        <p>
                                            {isRTL
                                                ? 'بيئة تعطي فرصة القيادة الجماعية والمشاركة في اتخاذ القرارات وزيادة الحوافز لرفع كفاءة الأفراد.'
                                                : 'An environment that provides opportunities for collective leadership, participation in decision-making, and increasing incentives to raise individual efficiency.'}
                                        </p>
                                        <p className="hidden md:block">
                                            {isRTL
                                                ? 'بيئة تدعم النشاطات الاجتماعية التي من شأنها تعزيز الروابط والتواصل بين أفراد الشركة.'
                                                : 'An environment that supports social activities to strengthen bonds and communication among company members.'}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
