"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Locale } from "@/types";
import { assistantData, getAssistantResponse } from "@/lib/data/ai-assistant-data";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AIAssistantProps {
    lang: Locale;
}

export function AIAssistant({ lang }: AIAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Add mobile detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isRTL = lang === "ar";

    // Initialize with greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: "greeting",
                    role: "assistant",
                    content: assistantData.greeting[lang],
                    timestamp: new Date(),
                },
            ]);
        }
    }, [isOpen, lang, messages.length]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, isOpen]);

    // Focus input when opened (Desktop only to prevent keyboard jump on mobile)
    useEffect(() => {
        if (isOpen && !isMobile) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isMobile]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate typing delay for natural feel
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

        const response = getAssistantResponse(userMessage.content, lang);

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        setTimeout(() => handleSend(), 100);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button - Hides when main menu is open if needed, currently fixed */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-4 md:bottom-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform ${isRTL ? "left-4 md:left-6" : "right-4 md:right-6"
                    } ${isOpen ? "hidden" : ""}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageCircle className="w-6 h-6" />

                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed z-50 bg-white shadow-2xl overflow-hidden flex flex-col
                            ${isMobile
                                ? "inset-0 rounded-none h-[100dvh] w-full" // Fullscreen on mobile with dvh
                                : `bottom-6 w-[380px] max-h-[80vh] h-[600px] rounded-2xl border border-border/30 ${isRTL ? "left-6" : "right-6"}`
                            }`}
                        dir={isRTL ? "rtl" : "ltr"}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">
                                        {isRTL ? "المساعد الذكي" : "AI Assistant"}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {isRTL ? "الرواسي للاستشارات الهندسية" : "Al-Rawasi Engineering"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors bg-white/50 backdrop-blur-sm"
                            >
                                <X className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50 scroll-smooth">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.role === "assistant"
                                            ? "bg-gradient-to-br from-primary to-primary-dark text-white"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {message.role === "assistant" ? (
                                            <Bot className="w-4 h-4" />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${message.role === "assistant"
                                            ? "bg-white border border-border/30 text-foreground rounded-tl-none shadow-sm"
                                            : "bg-primary text-white rounded-tr-none shadow-sm"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white border border-border/30 rounded-2xl rounded-tl-none p-3 flex gap-1 shadow-sm">
                                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions (show only at start) */}
                        {messages.length <= 1 && (
                            <div className="px-4 py-2 border-t border-border/30 bg-white shrink-0">
                                <p className="text-xs text-muted-foreground mb-2">
                                    {isRTL ? "اقتراحات سريعة:" : "Quick suggestions:"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {assistantData.suggestions[lang].slice(0, 3).map((suggestion, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="text-xs px-3 py-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors border border-primary/10"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-border/30 bg-white shrink-0 pb-safe-area"> {/* Handle safe area on iPhone */}
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base transition-all appearance-none" // text-base prevents iOS zoom
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                                >
                                    <Send className={`w-5 h-5 ${isRTL ? "rotate-2" : ""}`} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
