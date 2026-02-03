"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { Locale } from "@/types";

interface HeaderClientProps {
    lang: Locale;
    dict: any;
    logo: React.ReactNode;
}

export function HeaderClient({ lang, dict, logo }: HeaderClientProps) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > 50;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    });

    const navItems = [
        { key: "home", href: "" },
        { key: "about", href: "about" },
        { key: "services", href: "services" },
        { key: "projects", href: "projects" },
        { key: "contact", href: "contact" },
    ];

    // Check if current path matches nav item
    const isActive = (href: string) => {
        const fullPath = `/${lang}/${href}`;
        return pathname === fullPath || (href === "" && (pathname === `/${lang}` || pathname === `/${lang}/`));
    };

    return (
        <motion.header
            className={`fixed w-full z-50 transition-all duration-500 ease-out ${isScrolled
                ? "py-2 md:py-3 bg-white/95 backdrop-blur-xl shadow-lg border-b border-border/20"
                : "py-3 md:py-5 bg-white/80 backdrop-blur-md border-b border-border/10"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="container-custom flex items-center justify-between px-4 md:px-6">
                {/* Logo - Smaller on mobile */}
                <motion.div
                    className="relative z-10 scale-90 md:scale-100 origin-left rtl:origin-right"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    {logo}
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.key}
                            href={`/${lang}/${item.href}`}
                            className={`relative px-4 xl:px-5 py-2.5 text-base xl:text-lg font-bold tracking-wide transition-all duration-300 rounded-lg group overflow-hidden ${isActive(item.href) ? "text-primary" : "text-foreground/80 hover:text-foreground"
                                }`}
                        >
                            {/* Hover background glow */}
                            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 rounded-lg" />

                            {/* Text */}
                            <span className="relative z-10">
                                {dict.navigation[item.key]}
                            </span>

                            {/* Underline reveal animation */}
                            <motion.span
                                className={`absolute bottom-1 left-1/2 h-[2px] bg-primary rounded-full ${isActive(item.href) ? "w-6" : "w-0"
                                    }`}
                                style={{ x: "-50%" }}
                                whileHover={{ width: 24 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />

                            {/* Active indicator */}
                            {isActive(item.href) && (
                                <motion.span
                                    layoutId="activeNavIndicator"
                                    className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Language Switcher */}
                    <Link
                        href={lang === "ar" ? "/en" : "/ar"}
                        className="relative px-3 md:px-4 py-2 text-sm md:text-base font-bold text-foreground rounded-lg border border-border/20 hover:bg-foreground/5 active:scale-95 transition-all duration-300 overflow-hidden group min-h-[44px] flex items-center justify-center"
                    >
                        <span className="relative z-10">{lang === "ar" ? "EN" : "ع"}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Link>

                    {/* CTA Button - Hidden on mobile, visible on tablet+ */}
                    <Link
                        href={`/${lang}/contact`}
                        className="hidden md:inline-flex items-center gap-2 px-4 lg:px-6 py-2.5 text-sm lg:text-base font-bold bg-primary text-white rounded-full transition-all duration-300 hover:bg-primary/90 active:scale-95 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group overflow-hidden min-h-[44px]"
                    >
                        <span className="relative z-10">{dict.navigation.contact}</span>
                        <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Mobile Menu Button - Larger touch target */}
                    <button
                        className="lg:hidden p-3 rounded-xl text-foreground bg-foreground/5 backdrop-blur-sm border border-border/20 hover:bg-foreground/10 active:scale-95 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Full screen on mobile */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-border/20 shadow-2xl overflow-y-auto"
                            style={{ maxHeight: 'calc(100vh - 80px)' }}
                        >
                            <div className="container-custom py-6 px-4 flex flex-col gap-2">
                                {navItems.map((item, idx) => (
                                    <motion.div
                                        key={item.key}
                                        initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05, type: "spring", stiffness: 150, damping: 20 }}
                                    >
                                        <Link
                                            href={`/${lang}/${item.href}`}
                                            className={`flex items-center justify-between px-4 py-4 text-lg font-semibold rounded-xl transition-all active:scale-[0.98] min-h-[56px] ${isActive(item.href)
                                                ? "text-primary bg-primary/10 border-primary/20 border"
                                                : "text-foreground/80 hover:text-primary hover:bg-primary/5 active:bg-primary/10"
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span>{dict.navigation[item.key]}</span>
                                            <ChevronRight className={`w-5 h-5 transition-colors ${lang === 'ar' ? 'rotate-180' : ''}
                                                ${isActive(item.href) ? 'text-primary' : 'text-foreground/30'}`} />
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* CTA in mobile menu */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="pt-4 mt-2 border-t border-border/20"
                                >
                                    <Link
                                        href={`/${lang}/contact`}
                                        className="flex items-center justify-center gap-2 w-full px-6 py-4 text-lg font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] min-h-[56px]
                                            text-white bg-primary hover:bg-primary/90 active:bg-primary/80"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {dict.navigation.contact}
                                        <ChevronRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
