"use client";

import { motion } from "framer-motion";
import { Locale } from "@/types";
import Image from "next/image";
import { Quote } from "lucide-react";

export function DirectorMessage({ lang }: { lang: Locale }) {
    const isRTL = lang === 'ar';

    const messageAr = `على مدى سنوات الدراسة وسنوات سيرتي المهنية التي زادت عن خمسة وعشرين عاماً، والتي شهدت العديد من المحطات، لم يغادرني حلم يتمثل في إحداث تطوير في قطاع الهندسة والعقارات والمعالم الحيوية والتاريخية في مدينتي وبلادي. ومن خلال تأسيس شركة الرواسي الليبية للاستشارات الهندسية بدأنا بترجمة جزء من الحلم إلى أرض الواقع، من واقع قناعتي أن البدايات المتواضعة لا تفرض قيوداً على حجم الإنجازات التي يمكن تحقيقها.

لقد نجحنا في (الرواسي) بتشكيل فريق من المتخصصين الأكثر كفاءة والأعلى مهارة، وتمكنا من إبرام اتفاقيات مساندة فنية مع مؤسسات محلية وشركات أجنبية، ومن خلال هذه الكفاءات المجتمعة فإننا نسعى جاهدين إلى تعزيز مستوى الخدمات التي نقدمها، ونهدف إلى تقديم رمز متأصل للرقي والفخامة والجمال محتفياً بالهوية الدينية والتاريخية لبلادنا الحبيبة.`;

    const messageEn = `Throughout my years of study and my professional career spanning over twenty-five years, which witnessed many milestones, a dream never left me - to bring development to the engineering, real estate, and vital historical landmarks sector in my city and country. Through establishing Al-Rawasi Libyan Company for Engineering Consultations, we began translating part of that dream into reality, based on my conviction that humble beginnings do not impose limitations on the magnitude of achievements that can be accomplished.

At Al-Rawasi, we have succeeded in forming a team of the most competent and highly skilled specialists, and we have managed to conclude technical support agreements with local institutions and foreign companies. Through these combined competencies, we strive to enhance the level of services we provide, aiming to present an ingrained symbol of sophistication, luxury, and beauty that celebrates the religious and historical identity of our beloved country.`;

    return (
        <section className="py-32 relative overflow-hidden transition-colors duration-500
            dark:bg-gradient-to-b dark:from-secondary-dark dark:to-secondary-dark/95
            light:bg-neutral-50">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className={`relative ${isRTL ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl transform rotate-3" />
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform -rotate-2" />

                            {/* Main Image Container */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                                <Image
                                    src="/images/director.jpg"
                                    alt={lang === 'ar' ? "المدير العام" : "General Manager"}
                                    fill
                                    className="object-cover"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 via-transparent to-transparent" />
                            </div>

                            {/* Floating Quote Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                                className="absolute -top-6 -right-6 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl"
                            >
                                <Quote className="w-8 h-8 text-white" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className={`${isRTL ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}
                    >
                        {/* Title */}
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-12 font-heading leading-tight">
                            {lang === 'ar' ? 'كلمة المدير' : "Director's Word"}
                        </h2>

                        {/* Quote Content */}
                        <div className="relative">
                            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20 transform rotate-180" />
                            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                                {(lang === 'ar' ? messageAr : messageEn).split('\n\n').map((paragraph, idx) => (
                                    <motion.p
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.2 }}
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>
                        </div>

                        {/* Signature */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-10 pt-8 border-t border-border/10"
                        >
                            <p className="text-primary font-bold text-xl mb-1">
                                {lang === 'ar' ? 'المدير العام' : 'General Manager'}
                            </p>
                            <p className="text-muted-foreground text-sm opacity-60">
                                {lang === 'ar' ? 'شركة الرواسي الليبية للاستشارات الهندسية' : 'Al-Rawasi Libyan Engineering Consultations'}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
