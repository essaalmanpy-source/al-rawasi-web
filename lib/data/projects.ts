
import { Locale } from "@/types";

export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    images?: string[];
    location: string;
    year: string;
    desc: string;
}

export interface GalleryProject {
    id: number;
    image: string;
    title?: string;
}

export const getProjects = (lang: Locale): Project[] => [
    {
        id: 0,
        title: lang === 'ar' ? "صيانة وتحوير مسجد بلال بن رباح" : "Maintenance and Modification of Bilal Bin Rabah Mosque",
        category: lang === 'ar' ? "عمارة إسلامية" : "Islamic Architecture",
        image: "/images/bilal-mosque.jpg",
        location: lang === 'ar' ? "البيضاء، ليبيا" : "Al Bayda, Libya",
        year: "2026",
        desc: lang === 'ar'
            ? "صرح ديني ومعماري متميز يتم تنفيذه بأعلى المعايير الهندسية، يمزج بين الأصالة والتصميم الحديث."
            : "A distinguished religious landmark under development, blending authenticity with modern design."
    },
    {
        id: 1,
        title: lang === 'ar' ? "تصميم وتطوير سوق الجمعة-شحات" : "Design and Development of Souq Al-Jumaa - Shahat",
        category: lang === 'ar' ? "مجمع تجاري" : "Commercial Complex",
        image: "/images/shahat-mall.jpg",
        location: lang === 'ar' ? "شحات، سوق الجمعة" : "Shahat, Souq Al-Jumaa",
        year: "2026",
        desc: lang === 'ar'
            ? "مجمع تجاري متكامل يتم إنشاؤه بأحدث التقنيات العالمية، ليكون وجهة تسوق عصرية."
            : "An integrated commercial complex built with the latest global technologies."
    },
    {
        id: 2,
        title: lang === 'ar' ? "قسم الإصدار - وحدة الاستقرار المالي ليبيا" : "Issue Department - Financial Stability Unit Libya",
        category: lang === 'ar' ? "مبنى حكومي" : "Government Building",
        image: "/images/central-bank.jpg",
        location: "",
        year: "2024",
        desc: lang === 'ar'
            ? "تصميم وتنفيذ مبنى إداري متطور يتميز بأعلى معايير الأمان والأنظمة الذكية."
            : "Design and construction of an advanced administrative building with top-tier security."
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
        id: 6,
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
        id: 7,
        title: lang === 'ar' ? "صيانة وتحوير مسجد عثمان بن عفان" : "Maintenance and Modification of Othman Bin Affan Mosque",
        category: lang === 'ar' ? "عمارة إسلامية" : "Islamic Architecture",
        image: "/images/othman-mosque.jpg",
        images: ["/images/othman-mosque.jpg", "/images/othman-mosque-1.jpg"],
        location: lang === 'ar' ? "البيضاء، ليبيا" : "Al Bayda, Libya",
        year: "",
        desc: lang === 'ar'
            ? "مشروع صيانة وتحوير شامل لجامع عثمان بن عفان بما يحافظ على طابعه الإسلامي."
            : "Comprehensive maintenance and modification project for Othman Bin Affan Mosque preserving its Islamic character."
    },
    {
        id: 8,
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
        id: 9,
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
        id: 10,
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

export const getGalleryProjects = (): GalleryProject[] => [
    { id: 101, image: "/images/othman-mosque.jpg" },
    { id: 102, image: "/images/othman-mosque-1.jpg" },
    { id: 103, image: "/images/gallery-project-1.jpg" },
    { id: 104, image: "/images/gallery-project-2.jpg" },
    { id: 105, image: "/images/gallery-project-3.jpg" },
    { id: 106, image: "/images/gallery-project-4.jpg" },
    { id: 107, image: "/images/gallery-project-5.jpg" },
    { id: 108, image: "/images/gallery-project-6.jpg" },
    { id: 109, image: "/images/gallery-project-7.png" },
    { id: 110, image: "/images/gallery-project-8.jpg" },
    { id: 111, image: "/images/gallery-project-9.jpg" },
    { id: 112, image: "/images/gallery-project-10.jpg" },
    { id: 113, image: "/images/gallery-project-11.jpg" },
    { id: 114, image: "/images/gallery-project-12.jpg" },
    { id: 115, image: "/images/gallery-project-13.jpg" },
    { id: 116, image: "/images/gallery-project-14.jpg" },
];
