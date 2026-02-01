export type Locale = 'ar' | 'en';

export interface LayoutProps {
    children: React.ReactNode;
    params: {
        lang: Locale;
    };
}

export interface PageProps {
    params: {
        lang: Locale;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export interface NavItem {
    title: string;
    href: string;
}
