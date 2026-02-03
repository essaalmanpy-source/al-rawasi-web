"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Locale } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

interface FooterClientProps {
    lang: Locale;
    dict: any;
}

// SVG City Skyline Component - Optimized and responsive
function CitySkyline() {
    return (
        <svg
            className="w-full h-auto min-h-[100px] md:min-h-[150px] lg:min-h-[200px]"
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax slice"
        >
            {/* Background buildings - far layer */}
            <g className="opacity-30">
                <rect x="50" y="100" width="30" height="100" fill="url(#building1)" />
                <rect x="120" y="80" width="40" height="120" fill="url(#building2)" />
                <rect x="200" y="60" width="25" height="140" fill="url(#building1)" />
                <rect x="280" y="90" width="35" height="110" fill="url(#building3)" />
                <rect x="360" y="50" width="20" height="150" fill="url(#building2)" />
                <rect x="420" y="70" width="45" height="130" fill="url(#building1)" />
                <rect x="520" y="40" width="30" height="160" fill="url(#building3)" />
                <rect x="600" y="80" width="40" height="120" fill="url(#building2)" />
                <rect x="700" y="55" width="25" height="145" fill="url(#building1)" />
                <rect x="780" y="75" width="50" height="125" fill="url(#building3)" />
                <rect x="880" y="45" width="35" height="155" fill="url(#building2)" />
                <rect x="960" y="65" width="28" height="135" fill="url(#building1)" />
                <rect x="1040" y="85" width="42" height="115" fill="url(#building3)" />
                <rect x="1130" y="55" width="32" height="145" fill="url(#building2)" />
                <rect x="1220" y="70" width="38" height="130" fill="url(#building1)" />
                <rect x="1320" y="90" width="45" height="110" fill="url(#building3)" />
            </g>

            {/* Middle buildings layer */}
            <g className="opacity-50">
                <rect x="80" y="120" width="35" height="80" fill="url(#building4)" />
                <rect x="150" y="100" width="50" height="100" fill="url(#building5)" />
                <rect x="240" y="85" width="30" height="115" fill="url(#building4)" />
                <rect x="320" y="110" width="40" height="90" fill="url(#building6)" />
                <rect x="400" y="75" width="28" height="125" fill="url(#building5)" />
                <rect x="480" y="95" width="55" height="105" fill="url(#building4)" />
                <rect x="580" y="70" width="35" height="130" fill="url(#building6)" />
                <rect x="660" y="105" width="45" height="95" fill="url(#building5)" />
                <rect x="760" y="80" width="30" height="120" fill="url(#building4)" />
                <rect x="840" y="100" width="60" height="100" fill="url(#building6)" />
                <rect x="940" y="75" width="38" height="125" fill="url(#building5)" />
                <rect x="1020" y="110" width="32" height="90" fill="url(#building4)" />
                <rect x="1100" y="85" width="48" height="115" fill="url(#building6)" />
                <rect x="1200" y="95" width="40" height="105" fill="url(#building5)" />
                <rect x="1300" y="115" width="52" height="85" fill="url(#building4)" />
            </g>

            {/* Front buildings layer - Simplified for better mobile performance */}
            <g className="opacity-80">
                <rect x="30" y="140" width="45" height="60" fill="url(#building7)" />
                <rect x="100" y="125" width="60" height="75" fill="url(#building8)" />
                <rect x="190" y="135" width="35" height="65" fill="url(#building9)" />
                <rect x="260" y="120" width="55" height="80" fill="url(#building7)" />
                <rect x="350" y="145" width="40" height="55" fill="url(#building8)" />
                <rect x="430" y="130" width="48" height="70" fill="url(#building9)" />
                <rect x="510" y="140" width="38" height="60" fill="url(#building7)" />
                <rect x="590" y="125" width="65" height="75" fill="url(#building8)" />
                <rect x="690" y="135" width="42" height="65" fill="url(#building9)" />
                <rect x="770" y="145" width="50" height="55" fill="url(#building7)" />
                <rect x="860" y="130" width="58" height="70" fill="url(#building8)" />
                <rect x="960" y="140" width="35" height="60" fill="url(#building9)" />
                <rect x="1030" y="125" width="52" height="75" fill="url(#building7)" />
                <rect x="1120" y="145" width="45" height="55" fill="url(#building8)" />
                <rect x="1200" y="135" width="62" height="65" fill="url(#building9)" />
                <rect x="1300" y="140" width="48" height="60" fill="url(#building7)" />
                <rect x="1380" y="130" width="55" height="70" fill="url(#building8)" />
            </g>

            {/* Accent elements */}
            <circle cx="200" cy="40" r="10" fill="url(#accent1)" className="opacity-60" />
            <circle cx="750" cy="30" r="8" fill="url(#accent2)" className="opacity-50" />
            <circle cx="1250" cy="35" r="12" fill="url(#accent1)" className="opacity-40" />

            {/* Small stars - Reduced count for mobile */}
            <polygon points="100,25 102,30 107,30 103,34 105,39 100,36 95,39 97,34 93,30 98,30" fill="url(#accent2)" className="opacity-40" />
            <polygon points="500,20 501.5,25 506,25 502.5,28 504,33 500,30 496,33 497.5,28 494,25 498.5,25" fill="url(#accent1)" className="opacity-30" />
            <polygon points="900,28 902,33 907,33 903,37 905,42 900,39 895,42 897,37 893,33 898,33" fill="url(#accent2)" className="opacity-35" />

            <defs>
                {/* Gradients */}
                <linearGradient id="building1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9D1F65" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#9D1F65" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="building2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C4A574" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#9D1F65" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="building3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9D1F65" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C4A574" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="building4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="building5" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="building6" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.65" />
                </linearGradient>
                <linearGradient id="building7" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="building8" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#e879f9" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="building9" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.55" />
                </linearGradient>
                <radialGradient id="accent1">
                    <stop offset="0%" stopColor="#f9a8d4" />
                    <stop offset="100%" stopColor="#ec4899" />
                </radialGradient>
                <radialGradient id="accent2">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#9333ea" />
                </radialGradient>
            </defs>
        </svg>
    );
}

export function FooterClient({ lang, dict }: FooterClientProps) {
    const footerRef = useRef<HTMLElement>(null);
    const isInView = useInView(footerRef, { once: true, margin: "-50px" });
    const isRTL = lang === 'ar';

    const quickLinks = [
        { key: "about", href: "about" },
        { key: "services", href: "services" },
        { key: "projects", href: "projects" },
    ];

    const services = [
        { ar: 'الاستشارات الهندسية', en: 'Engineering Consulting' },
        { ar: 'التصميم المعماري', en: 'Architectural Design' },
        { ar: 'إدارة المشاريع', en: 'Project Management' },
        { ar: 'التخطيط العمراني', en: 'Urban Planning' },
    ];

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden transition-colors duration-500 bg-neutral-50 border-t border-border/30"
        >
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }} />

            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Main Content */}
            <div className="container-custom relative z-10 pt-16 md:pt-20 pb-8 md:pb-12 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-14 lg:gap-12 mb-16 md:mb-20">
                    {/* Brand Section */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 p-2.5 border border-border/10">
                                <Image
                                    src="/images/logo.png"
                                    alt="Al-Rawasi Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-2xl text-foreground">
                                    {lang === 'ar' ? 'الرواســي' : 'Al-Rawasi'}
                                </span>
                                <span className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                                    {lang === 'ar' ? 'للاستشارات الهندسية' : 'Engineering Consultants'}
                                </span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed border-s-2 border-primary/50 ps-5">
                            {lang === 'ar' ?
                                'شركة ليبية رائدة في مجال الاستشارات الهندسية والتخطيط العمراني، نقدم حلولاً مبتكرة للمشاريع الكبرى.' :
                                'A leading Libyan engineering consultancy firm providing innovative solutions for major urban planning and infrastructure projects.'}
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="font-heading font-bold text-xl mb-8 text-foreground relative inline-block">
                            {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                            <span className="absolute -bottom-2.5 left-0 w-10 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        href={`/${lang}/${item.href}`}
                                        className="group text-muted-foreground hover:text-primary transition-all duration-300 inline-flex items-center gap-3 text-base"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors group-hover:scale-125" />
                                        {dict.navigation[item.key as keyof typeof dict.navigation]}
                                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="font-heading font-bold text-xl mb-8 text-foreground relative inline-block">
                            {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
                            <span className="absolute -bottom-2.5 left-0 w-10 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                        </h3>
                        <ul className="space-y-4 text-base text-muted-foreground">
                            {services.map((service, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                    {lang === 'ar' ? service.ar : service.en}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="font-heading font-bold text-xl mb-8 text-foreground relative inline-block">
                            {dict.contact.footer_heading}
                            <span className="absolute -bottom-2.5 left-0 w-10 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                        </h3>
                        <div className="space-y-6 text-base text-muted-foreground">
                            {/* HQ */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-1">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <span className="block font-bold mb-1.5 text-foreground">{dict.contact.hq_label}</span>
                                    <span className="leading-snug block opacity-90">{dict.contact.hq_address}</span>
                                </div>
                            </div>

                            {/* Email Only */}
                            <div className="flex items-center gap-4 group">
                                <a
                                    href={`mailto:${dict.contact.email}`}
                                    className="flex items-center gap-4 w-full group/email"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="group-hover/email:text-primary transition-colors truncate font-medium">
                                        {dict.contact.email}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* City Skyline Illustration - Adjusted position for responsive overlap */}
            <motion.div
                className="relative z-0 -mt-24 md:-mt-32 pointer-events-none opacity-80 md:opacity-100"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
                <CitySkyline />
            </motion.div>

            {/* Copyright Bar */}
            <div className="relative z-10 bg-foreground/5 backdrop-blur-md border-t border-border/5">
                <div className="container-custom py-6 md:py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-center md:text-start"
                    >
                        © {new Date().getFullYear()} {lang === 'ar' ? 'شركة الرواسي للاستشارات الهندسية. جميع الحقوق محفوظة' : 'Al-Rawasi Engineering Consultants. All rights reserved.'}
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-4 md:gap-6"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        <Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors p-2 md:p-0">
                            {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                        </Link>
                        <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-gray-400/50" />
                        <Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors p-2 md:p-0">
                            {lang === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
