"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/types";
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/animation-wrappers";

interface ContactContentProps {
    dict: any;
    lang: Locale;
}

export function ContactContent({ dict, lang }: ContactContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    if (!dict) return null;

    return (
        <main ref={containerRef} className="relative bg-background min-h-screen transition-colors duration-500">
            {/* Hero Section - Reduced Height, Softer */}
            <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 
                    dark:bg-gradient-to-b dark:from-secondary-dark dark:via-secondary-dark/95 dark:to-secondary-dark
                    light:bg-gradient-to-b light:from-white light:via-white/95 light:to-white"
                />

                {/* Subtle Vignette Effect */}
                <div className="absolute inset-0 
                    dark:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]
                    light:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(var(--primary-rgb),0.02)_100%)]"
                />

                {/* Soft Blurred Orbs - Very Subtle */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/8 rounded-full blur-[80px] md:blur-[150px]"
                    animate={{
                        opacity: [0.4, 0.6, 0.4],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/5 rounded-full blur-[60px] md:blur-[120px]"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                <div className="container-custom relative z-10 text-center px-4 md:px-6 lg:px-8">
                    {/* Badge */}
                    <FadeIn direction="up" delay={0.1}>
                        <span className="inline-block py-2 px-4 md:py-2.5 md:px-6 rounded-full border backdrop-blur-sm text-accent text-[10px] md:text-xs font-medium uppercase tracking-[0.25em] mb-6 md:mb-10
                            dark:bg-white/5 dark:border-white/10 light:bg-primary/5 light:border-primary/10">
                            {dict.navigation.contact}
                        </span>
                    </FadeIn>

                    {/* Main Heading - Reduced Weight */}
                    <FadeIn direction="up" delay={0.2}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 md:mb-8 leading-relaxed tracking-tight px-2">
                            {lang === 'ar' ? "تواصل معنا" : "Contact Us"}
                        </h1>
                    </FadeIn>

                    {/* Subtitle - Better Line Height */}
                    <FadeIn direction="up" delay={0.3}>
                        <p className="max-w-xl md:max-w-2xl mx-auto text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose font-light px-4">
                            {lang === 'ar'
                                ? 'نحن هنا للإجابة على استفساراتكم ومساعدتكم في تحقيق مشاريعكم'
                                : 'We are here to answer your questions and help you achieve your projects'}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Information Section - Softer Background */}
            <section className="relative py-12 md:py-20 lg:py-28">
                {/* Soft Top Fade */}
                <div className="absolute top-0 left-0 right-0 h-16 md:h-32 
                    dark:bg-gradient-to-b dark:from-secondary-dark dark:to-transparent
                    light:bg-gradient-to-b light:from-white light:to-transparent"
                />

                {/* Slightly Lighter Background */}
                <div className="absolute inset-0 
                    dark:bg-gradient-to-b dark:from-secondary-dark dark:via-[#1a1f2e] dark:to-secondary-dark
                    light:bg-neutral-50"
                />

                <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <FadeIn direction="up">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">

                                {/* Address Information Card - Premium visible effects */}
                                <div className="lg:col-span-2 p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-lg relative overflow-hidden
                                    dark:bg-white/[0.05] dark:border-white/[0.12] dark:hover:bg-white/[0.07] dark:hover:border-white/[0.18]
                                    light:bg-white light:border-border/50 light:hover:border-primary/20">
                                    {/* Visible gradient overlay for depth */}
                                    <div className="absolute inset-0 pointer-events-none
                                        dark:bg-gradient-to-br dark:from-white/[0.06] dark:via-white/[0.02] dark:to-primary/[0.05]
                                        light:bg-gradient-to-br light:from-primary/[0.02] light:to-transparent"
                                    />
                                    {/* Clear inner shadow for layered depth */}
                                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none
                                        dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),_inset_0_-2px_4px_rgba(0,0,0,0.1)]
                                        light:shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                                    />
                                    <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10 relative z-10">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center text-white shadow-[0_8px_24px_rgba(var(--primary-rgb),0.35)] shrink-0">
                                            <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-medium text-foreground mb-1">
                                                {lang === 'ar' ? 'مواقعنا' : 'Our Locations'}
                                            </h3>
                                            <p className="text-muted-foreground text-xs md:text-sm tracking-wide">
                                                {lang === 'ar' ? 'تفضل بزيارتنا' : 'Visit Us'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative z-10">
                                        {/* HQ */}
                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary/80" />
                                                <h4 className="font-medium text-foreground/90">{dict.contact.hq_label}</h4>
                                            </div>
                                            <p className="text-muted-foreground leading-loose pl-5 border-l dark:border-white/5 light:border-border/20 text-sm md:text-base">
                                                {dict.contact.hq_address}
                                            </p>
                                        </div>

                                        <div className="space-y-6 md:space-y-8">
                                            {/* Benghazi */}
                                            <div className="space-y-2 md:space-y-3">
                                                <h4 className="font-medium text-foreground/80 text-sm">{dict.contact.benghazi_label}</h4>
                                                <p className="text-muted-foreground text-sm leading-loose">{dict.contact.benghazi_address}</p>
                                            </div>
                                            {/* Tripoli */}
                                            <div className="space-y-2 md:space-y-3">
                                                <h4 className="font-medium text-foreground/80 text-sm">{dict.contact.tripoli_label}</h4>
                                                <p className="text-muted-foreground text-sm leading-loose">{dict.contact.tripoli_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Contact Card - Premium visible effects */}
                                <div className="p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl transition-all duration-500 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl relative overflow-hidden
                                    dark:bg-gradient-to-br dark:from-primary/[0.15] dark:via-primary/[0.08] dark:to-primary/[0.04] dark:border-primary/[0.2] dark:hover:border-primary/[0.3] dark:shadow-[0_15px_50px_rgba(0,0,0,0.2)]
                                    light:bg-white light:border-border/50 light:hover:border-primary/20 light:shadow-lg">
                                    {/* Visible radial gradient for premium feel */}
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(var(--primary-rgb),0.08)_0%,_transparent_50%)] pointer-events-none" />
                                    {/* Clear inner highlight and shadow */}
                                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none
                                        dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-1px_2px_rgba(0,0,0,0.15)] 
                                        light:shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/[0.1] rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8 backdrop-blur-md border border-white/[0.15] shadow-[0_8px_24px_rgba(0,0,0,0.15)] relative z-10">
                                        <Mail className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>

                                    <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 relative z-10 text-foreground">
                                        {lang === 'ar' ? 'راسلنا' : 'Email Us'}
                                    </h3>

                                    <div className="relative z-10 mb-6 md:mb-8 w-full group/email text-center">
                                        <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-primary/90 text-sm md:text-base font-medium tracking-tight break-all transition-all duration-300 mb-2
                                            dark:bg-white/[0.03] dark:border-white/[0.06] dark:group-hover/email:bg-white/[0.06] dark:group-hover/email:border-white/[0.1]
                                            light:bg-primary/[0.03] light:border-primary/[0.06] light:group-hover/email:bg-primary/[0.06] light:group-hover/email:border-primary/[0.1] border">
                                            {dict.contact.email}
                                        </div>
                                        <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px] mx-auto">
                                            {lang === 'ar'
                                                ? 'اضغط على الزر أدناه لإرسال رسالة مباشرة'
                                                : 'Click the button below to send a direct message'}
                                        </p>
                                    </div>

                                    <a
                                        href={`mailto:${dict.contact.email}`}
                                        className="inline-flex items-center justify-center gap-3 px-6 py-3.5 md:px-8 md:py-4 bg-primary hover:bg-primary-light text-white font-medium rounded-xl md:rounded-2xl transition-all duration-300 w-full shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 relative z-10 text-sm md:text-base"
                                    >
                                        <span>{lang === 'ar' ? 'إرسال بريد إلكتروني الآن' : 'Send Email Now'}</span>
                                        <Send className="w-4 h-4 flex-shrink-0" />
                                    </a>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Form Card - Premium visible effects */}
                        <FadeIn direction="up" delay={0.2}>
                            <div className="mt-12 md:mt-16 p-6 md:p-10 lg:p-14 rounded-2xl md:rounded-3xl transition-all duration-500 backdrop-blur-xl border relative overflow-hidden
                                dark:bg-white/[0.04] dark:border-white/[0.1] dark:shadow-[0_15px_50px_rgba(0,0,0,0.2)]
                                light:bg-white light:border-border/50 light:shadow-lg">
                                {/* Visible top-to-bottom gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent pointer-events-none" />
                                {/* Clear inner shadow for depth */}
                                <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none
                                    dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.06),_inset_0_-2px_4px_rgba(0,0,0,0.08)] 
                                    light:shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
                                <h3 className="text-xl md:text-2xl font-medium mb-3 text-center relative z-10 text-foreground">
                                    {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
                                </h3>
                                <p className="text-muted-foreground mb-8 md:mb-12 text-center leading-loose relative z-10 text-sm md:text-base">
                                    {lang === 'ar'
                                        ? 'املأ النموذج أدناه وسنتواصل معك في أقرب وقت'
                                        : 'Fill in the form below and we will get back to you soon'}
                                </p>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
                                    {/* Name Field */}
                                    <div className="space-y-2 md:space-y-3">
                                        <label className="block text-sm font-medium text-muted-foreground">
                                            {lang === 'ar' ? 'الاسم' : 'Name'}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border outline-none transition-all duration-300 text-sm md:text-base
                                                dark:border-white/[0.06] dark:bg-white/[0.02] dark:focus:bg-white/[0.04] dark:focus:border-primary/30 dark:text-white
                                                light:border-border/60 light:bg-white light:focus:border-primary/50 light:text-foreground"
                                            placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2 md:space-y-3">
                                        <label className="block text-sm font-medium text-muted-foreground">
                                            {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border outline-none transition-all duration-300 text-sm md:text-base
                                                dark:border-white/[0.06] dark:bg-white/[0.02] dark:focus:bg-white/[0.04] dark:focus:border-primary/30 dark:text-white
                                                light:border-border/60 light:bg-white light:focus:border-primary/50 light:text-foreground"
                                            placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                                        />
                                    </div>

                                    {/* Subject Field */}
                                    <div className="space-y-2 md:space-y-3 md:col-span-2">
                                        <label className="block text-sm font-medium text-muted-foreground">
                                            {lang === 'ar' ? 'الموضوع' : 'Subject'}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border outline-none transition-all duration-300 text-sm md:text-base
                                                dark:border-white/[0.06] dark:bg-white/[0.02] dark:focus:bg-white/[0.04] dark:focus:border-primary/30 dark:text-white
                                                light:border-border/60 light:bg-white light:focus:border-primary/50 light:text-foreground"
                                            placeholder={lang === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div className="space-y-2 md:space-y-3 md:col-span-2">
                                        <label className="block text-sm font-medium text-muted-foreground">
                                            {lang === 'ar' ? 'الرسالة' : 'Message'}
                                        </label>
                                        <textarea
                                            rows={6}
                                            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border outline-none transition-all duration-300 resize-none leading-loose text-sm md:text-base
                                                dark:border-white/[0.06] dark:bg-white/[0.02] dark:focus:bg-white/[0.04] dark:focus:border-primary/30 dark:text-white
                                                light:border-border/60 light:bg-white light:focus:border-primary/50 light:text-foreground"
                                            placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                                        />
                                    </div>

                                    {/* Submit Button - Brand Color, Rounded, More Padding */}
                                    <div className="md:col-span-2 flex justify-center pt-4 md:pt-6">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-primary hover:bg-primary-light text-white font-medium rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 text-sm md:text-base"
                                        >
                                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                                            <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    );
}
