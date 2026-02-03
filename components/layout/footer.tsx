import { Locale } from "@/types";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { FooterClient } from "./footer-client";

export async function Footer({ lang }: { lang: Locale }) {
    const dict = await getDictionary(lang);

    return <FooterClient lang={lang} dict={dict} />;
}
