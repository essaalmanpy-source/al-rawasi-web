"use client";

import { Locale } from "@/types";
import { ProjectsShowcase } from "@/components/home/projects-showcase";

export function ProjectsSection({ lang }: { lang: Locale }) {

    // Immersive, high-ticket engineering projects
    const projects = [
        {
            id: 0, // Using 0 to ensure unique ID
            title: lang === 'ar' ? "صيانه وتحوير مسجد بلال بن رباح" : "Maintenance and Modification of Bilal Bin Rabah Mosque",
            category: lang === 'ar' ? "عمارة إسلامية" : "Islamic Architecture",
            image: "/images/bilal-mosque.jpg",
            location: lang === 'ar' ? "البيضاء، ليبيا" : "Al Bayda, Libya",
            year: "2026 (Under Development)",
            desc: lang === 'ar'
                ? "صرح ديني ومعماري متميز يتم تنفيذه بأعلى المعايير الهندسية، يمزج بين الأصالة والتصميم الحديث (قيد التطوير)."
                : "A distinguished religious and architectural landmark under development, blending authenticity with modern design."
        },
        {
            id: 1,
            title: lang === 'ar' ? "تصميم وتطوير سوق الجمعه-شحات" : "Design and Development of Souq Al-Jumaa - Shahat",
            category: lang === 'ar' ? "مجمع تجاري" : "Commercial Complex",
            image: "/images/shahat-mall.jpg",
            location: lang === 'ar' ? "شحات، سوق الجمعة" : "Shahat, Souq Al-Jumaa",
            year: "2026 (Under Development)",
            desc: lang === 'ar'
                ? "مجمع تجاري متكامل يتم إنشاؤه بأحدث التقنيات العالمية، ليكون وجهة تسوق عصرية في قلب مدينة شحات."
                : "An integrated commercial complex built with the latest global technologies to be a modern shopping destination in Shahat."
        },
        {
            id: 2,
            title: lang === 'ar' ? "قسم الإصدار - وحدة الاستقرار المالي ليبيا" : "Issue Department - Financial Stability Unit Libya",
            category: lang === 'ar' ? "مبنى حكومي" : "Government Building",
            image: "/images/central-bank.jpg",
            location: "",
            year: "2024 (Completed)",
            desc: lang === 'ar'
                ? "تصميم وتنفيذ مبنى إداري متطور يتميز بأعلى معايير الأمان والأنظمة الذكية، يعكس هيبة المؤسسة المالية."
                : "Design and construction of an advanced administrative building featuring top-tier security and smart systems."
        },
        {
            id: 3,
            title: lang === 'ar' ? "تصميم داخلي وخارجي لمركز مبيعات ليبيانا" : "Internal and External Design for Libyana Sales Center",
            category: lang === 'ar' ? "تصميم تجاري" : "Commercial Design",
            image: "/images/libyana-center.jpg",
            location: lang === 'ar' ? "ليبيا" : "Libya",
            year: "",
            desc: lang === 'ar'
                ? "تصميم عصري متكامل يعكس هوية الشركة ويعزز تجربة العملاء من خلال مساحات ذكية وجذابة."
                : "A modern integrated design reflecting the company identity and enhancing customer experience through smart, attractive spaces."
        },

        {
            id: 5,
            title: lang === 'ar' ? "صيانه وتطوير المصرف التجاري الوطني إدارة فروع بنغازي - البركه ليبيا" : "Maintenance and Development of National Commercial Bank - Benghazi Branches Administration - Al-Berka, Libya",
            category: lang === 'ar' ? "مبنى تجاري" : "Commercial Building",
            image: "/images/ncb-building.jpg",
            location: lang === 'ar' ? "ليبيا" : "Libya",
            year: "",
            desc: lang === 'ar'
                ? "إعادة تأهيل وتطوير شامل للمرافق لضمان بيئة عمل متطورة وخدمات بنكية متميزة."
                : "Comprehensive rehabilitation and development of facilities to ensure a modern work environment and excellent banking services."
        },
        {
            id: 6,
            title: lang === 'ar' ? "إشراف على تنفيذ فندق 5 نجوم - فندق التلال السياحي" : "Supervision of 5-Star Hotel Execution - Al-Tilal Tourist Hotel",
            category: lang === 'ar' ? "سياحي" : "Tourism",
            image: "/images/al-tilal-hotel.jpg",
            location: lang === 'ar' ? "البيضاء، ليبيا" : "Al Bayda, Libya",
            year: "",
            desc: lang === 'ar'
                ? "الإشراف الهندسي الدقيق على تنفيذ مشروع فندق سياحي فاخر وفق أعلى معايير الجودة العالمية."
                : "Precise engineering supervision of a luxury tourist hotel execution according to the highest global quality standards."
        },
        {
            id: 7,
            title: lang === 'ar' ? "مصرف ليبيا المركزي / شحات" : "Central Bank of Libya / Shahat",
            category: lang === 'ar' ? "مبنى حكومي" : "Government Building",
            image: "/images/cbl-shahat.jpg",
            location: lang === 'ar' ? "شحات، ليبيا" : "Shahat, Libya",
            year: "",
            desc: lang === 'ar'
                ? "تصميم وتنفيذ مبنى فرع المصرف المركزي وفق أحدث المعايير الأمنية والإنشائية."
                : "Design and execution of the Central Bank branch building according to the latest security and structural standards."
        },
        {
            id: 8,
            title: lang === 'ar' ? "المصرف التجاري الوطني - فرع الفائدية" : "National Commercial Bank - Al-Faidiya Branch",
            category: lang === 'ar' ? "مبنى مصرفي" : "Banking Building",
            image: "/images/ncb-faidiya.jpg",
            location: lang === 'ar' ? "ليبيا، الفائدية" : "Al-Faidiya, Libya",
            year: "",
            desc: lang === 'ar'
                ? "إنشاء مبنى جديد - ليبيا الفائدية"
                : "Construction of a new building - Al-Faidiya, Libya"
        },
        {
            id: 9,
            title: lang === 'ar' ? "صيانه وتحوير مسجد عثمان بن عفان" : "Maintenance and Modification of Othman Bin Affan Mosque",
            category: lang === 'ar' ? "عمارة إسلامية" : "Islamic Architecture",
            image: "/images/othman-mosque.jpg",
            location: lang === 'ar' ? "البيضاء، ليبيا" : "Al Bayda, Libya",
            year: "",
            desc: lang === 'ar'
                ? "مشروع صيانة وتحوير شامل لجامع عثمان بن عفان بما يحافظ على طابعه الإسلامي."
                : "Comprehensive maintenance and modification project for Othman Bin Affan Mosque preserving its Islamic character."
        },
        {
            id: 2,
            title: lang === 'ar' ? "جسر المستقبل" : "Future Bridge",
            category: lang === 'ar' ? "بنية تحتية عملاقة" : "Mega Infrastructure",
            image: "/images/hero-bg.jpg",
            location: lang === 'ar' ? "القاهرة، مصر" : "Cairo, Egypt",
            year: "2023",
            desc: lang === 'ar'
                ? "شريان حيوي يربط ضفتي النهر بتقنيات بناء معلقة هي الأولى من نوعها في المنطقة."
                : "A vital artery connecting river banks featuring region-first suspension construction technologies."
        },
        {
            id: 3,
            title: lang === 'ar' ? "مصنع الطاقة الخضراء" : "Green Energy Plant",
            category: lang === 'ar' ? "طاقة متجددة" : "Renewable Energy",
            image: "/images/hero-bg.jpg",
            location: lang === 'ar' ? "الرياض، السعودية" : "Riyadh, KSA",
            year: "2025",
            desc: lang === 'ar'
                ? "محطة توليد طاقة هجينة تعمل بالطاقة الشمسية والرياح، تهدف لتزويد المدينة الصناعية بالطاقة النظيفة."
                : "Hybrid solar and wind power generation plant aiming to supply the industrial city with clean energy."
        },
        {
            id: 4,
            title: lang === 'ar' ? "متحف التاريخ" : "History Museum",
            category: lang === 'ar' ? "ثقافي" : "Cultural",
            image: "/images/hero-bg.jpg",
            location: lang === 'ar' ? "عمان، الأردن" : "Amman, Jordan",
            year: "2024",
            desc: lang === 'ar'
                ? "تصميم هندسي فريد يدمج بين العمارة التراثية والتقنيات الحديثة لعرض التاريخ بأسلوب تفاعلي."
                : "Unique engineering design merging heritage architecture with modern tech for interactive history display."
        }
    ];

    const displayedProjects = projects.slice(0, 3);

    return (
        <ProjectsShowcase projects={displayedProjects} lang={lang} isHomePage={true} />
    );
}
