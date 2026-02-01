import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = defaultLocale;

        // e.g. incoming request is /products
        // The new URL is now /ar/products
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|favicon.ico|.*\\..*).*)',
    ],
};
