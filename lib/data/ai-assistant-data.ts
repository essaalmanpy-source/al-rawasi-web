import { Locale } from "@/types";

// ============================================
// AI Assistant Knowledge Base
// ============================================

export interface FAQItem {
    keywords: string[];
    question: { ar: string; en: string };
    answer: { ar: string; en: string };
}

export interface AssistantData {
    greeting: { ar: string; en: string };
    fallback: { ar: string; en: string };
    suggestions: { ar: string[]; en: string[] };
    faqs: FAQItem[];
}

export const assistantData: AssistantData = {
    greeting: {
        ar: "مرحباً! أنا المساعد الافتراضي لشركة الرواسي للاستشارات الهندسية. كيف يمكنني مساعدتك اليوم؟",
        en: "Hello! I'm the virtual assistant for Al-Rawasi Engineering Consultants. How can I help you today?",
    },
    fallback: {
        ar: "شكراً لتواصلك. للحصول على معلومات أكثر تفصيلاً، يرجى التواصل معنا مباشرة عبر البريد الإلكتروني أو الهاتف.",
        en: "Thank you for reaching out. For more detailed information, please contact us directly via email or phone.",
    },
    suggestions: {
        ar: [
            "ما هي خدماتكم؟",
            "أين يقع مقركم؟",
            "ما هي شهادات الأيزو لديكم؟",
            "كيف أتواصل معكم؟",
        ],
        en: [
            "What services do you offer?",
            "Where is your office located?",
            "What ISO certifications do you have?",
            "How can I contact you?",
        ],
    },
    faqs: [
        // Services
        {
            keywords: ["خدمات", "services", "تقدم", "offer", "provide"],
            question: {
                ar: "ما هي خدماتكم؟",
                en: "What services do you offer?",
            },
            answer: {
                ar: "نقدم مجموعة شاملة من الخدمات الهندسية تشمل:\n\n• الدراسات والتخطيط\n• التصاميم الهندسية\n• إدارة المشاريع\n• استشارات السلامة المهنية\n• الاستشارات الفنية التخصصية\n• تنمية العقارات\n• التخطيط الحضري\n• الإشراف على الاختبارات الهندسية\n• التدريب",
                en: "We offer a comprehensive range of engineering services including:\n\n• Studies & Planning\n• Engineering Designs\n• Project Management\n• Occupational Safety Consulting\n• Specialized Technical Consulting\n• Real Estate Development\n• Urban Planning\n• Engineering Testing Supervision\n• Training",
            },
        },
        // Location
        {
            keywords: ["موقع", "عنوان", "أين", "location", "address", "where", "office"],
            question: {
                ar: "أين يقع مقركم؟",
                en: "Where is your office located?",
            },
            answer: {
                ar: "يقع مقرنا الرئيسي في مدينة البيضاء، ليبيا. نحن نخدم العملاء في جميع أنحاء ليبيا والمنطقة.",
                en: "Our headquarters is located in Al-Bayda City, Libya. We serve clients throughout Libya and the region.",
            },
        },
        // ISO Certifications
        {
            keywords: ["أيزو", "شهادات", "اعتماد", "iso", "certifications", "certified"],
            question: {
                ar: "ما هي شهادات الأيزو لديكم؟",
                en: "What ISO certifications do you have?",
            },
            answer: {
                ar: "نحن حاصلون على ثلاث شهادات أيزو دولية:\n\n• ISO 9001:2015 - نظام إدارة الجودة\n• ISO 14001:2015 - نظام الإدارة البيئية\n• ISO 45001:2018 - نظام إدارة الصحة والسلامة المهنية\n\nهذه الشهادات تؤكد التزامنا بأعلى معايير الجودة والسلامة والحفاظ على البيئة.",
                en: "We hold three international ISO certifications:\n\n• ISO 9001:2015 - Quality Management System\n• ISO 14001:2015 - Environmental Management System\n• ISO 45001:2018 - Occupational Health & Safety Management\n\nThese certifications confirm our commitment to the highest standards of quality, safety, and environmental protection.",
            },
        },
        // Contact
        {
            keywords: ["تواصل", "اتصال", "هاتف", "بريد", "contact", "email", "phone", "call"],
            question: {
                ar: "كيف أتواصل معكم؟",
                en: "How can I contact you?",
            },
            answer: {
                ar: "يمكنك التواصل معنا عبر:\n\n📧 البريد الإلكتروني: info@alrawasi.ly\n📞 الهاتف: +218 91 000 0000\n\nأو زيارة صفحة التواصل على موقعنا لإرسال رسالة مباشرة.",
                en: "You can contact us via:\n\n📧 Email: info@alrawasi.ly\n📞 Phone: +218 91 000 0000\n\nOr visit our contact page to send a direct message.",
            },
        },
        // Projects
        {
            keywords: ["مشاريع", "أعمال", "projects", "work", "portfolio"],
            question: {
                ar: "ما هي أبرز مشاريعكم؟",
                en: "What are your notable projects?",
            },
            answer: {
                ar: "لدينا سجل حافل من المشاريع الناجحة في مختلف القطاعات تشمل:\n\n• المشاريع الحكومية والعامة\n• المباني التجارية والإدارية\n• المجمعات السكنية\n• المرافق الصحية والتعليمية\n• البنية التحتية\n\nيمكنك الاطلاع على تفاصيل مشاريعنا في قسم المشاريع على الموقع.",
                en: "We have a proven track record of successful projects across various sectors including:\n\n• Government & Public Projects\n• Commercial & Administrative Buildings\n• Residential Complexes\n• Healthcare & Educational Facilities\n• Infrastructure\n\nYou can view our project details in the Projects section of our website.",
            },
        },
        // Experience
        {
            keywords: ["خبرة", "سنوات", "تأسيس", "experience", "years", "established", "history"],
            question: {
                ar: "منذ متى وأنتم تعملون في هذا المجال؟",
                en: "How long have you been in business?",
            },
            answer: {
                ar: "تأسست شركة الرواسي للاستشارات الهندسية لتكون واحدة من الشركات الرائدة في مجال الاستشارات الهندسية في ليبيا. نمتلك فريقاً من المهندسين والخبراء ذوي الكفاءة العالية والخبرة الواسعة في مختلف التخصصات الهندسية.",
                en: "Al-Rawasi Engineering Consultants was established to be one of the leading engineering consultancy firms in Libya. We have a team of highly qualified engineers and experts with extensive experience in various engineering disciplines.",
            },
        },
        // Vision
        {
            keywords: ["رؤية", "هدف", "vision", "goal", "mission"],
            question: {
                ar: "ما هي رؤيتكم؟",
                en: "What is your vision?",
            },
            answer: {
                ar: "رؤيتنا هي الارتقاء بمعايير الجودة والأمان والوقاية والخدمة ضمن نطاق المشاريع الهندسية العامة والخاصة من خلال تقديم تصاميم مميزة والإشراف على تنفيذ المشاريع بالشكل المتطور الذي يحاكي المشاريع العالمية.",
                en: "Our vision is to elevate standards of quality, safety, prevention, and service within public and private engineering projects by providing distinctive designs and supervising execution in an advanced manner that emulates global projects.",
            },
        },
        // Clients
        {
            keywords: ["عملاء", "شركاء", "clients", "partners", "customers"],
            question: {
                ar: "من هم عملاؤكم؟",
                en: "Who are your clients?",
            },
            answer: {
                ar: "نفتخر بالتعامل مع نخبة من المؤسسات في القطاعين العام والخاص، بما في ذلك:\n\n• صندوق تنمية وإعمار ليبيا\n• المصرف التجاري الوطني\n• مصرف الوحدة\n• وزارة المالية\n• مصرف ليبيا المركزي\n• وغيرها من المؤسسات الكبرى",
                en: "We are proud to work with elite institutions in both public and private sectors, including:\n\n• Libya Reconstruction Fund\n• National Commercial Bank\n• Wahda Bank\n• Ministry of Finance\n• Central Bank of Libya\n• And many other major institutions",
            },
        },
    ],
};

// ============================================
// Helper function to find matching FAQ
// ============================================
export function findMatchingFAQ(query: string, lang: Locale): FAQItem | null {
    const normalizedQuery = query.toLowerCase().trim();

    // Find the FAQ with the most keyword matches
    let bestMatch: FAQItem | null = null;
    let maxMatches = 0;

    for (const faq of assistantData.faqs) {
        const matches = faq.keywords.filter((keyword) =>
            normalizedQuery.includes(keyword.toLowerCase())
        ).length;

        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = faq;
        }
    }

    return maxMatches > 0 ? bestMatch : null;
}

// ============================================
// Get response for user message
// ============================================
export function getAssistantResponse(message: string, lang: Locale): string {
    const matchingFAQ = findMatchingFAQ(message, lang);

    if (matchingFAQ) {
        return matchingFAQ.answer[lang];
    }

    return assistantData.fallback[lang];
}
