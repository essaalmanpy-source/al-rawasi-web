import { HeroSection } from "@/components/home/hero-section";
import { ClientsSection } from "@/components/home/clients-section";
import { PartnersSection } from "@/components/home/partners-section";
import { ISOSection } from "@/components/home/iso-section";
import { Locale } from "@/types";
import { getDictionary } from "@/dictionaries/get-dictionary";

export default async function HomePage({ params }: { params: { lang: Locale } }) {
    const dict = await getDictionary(params.lang);

    return (
        <div className="flex flex-col">
            <HeroSection lang={params.lang} dict={dict} />
            <ClientsSection lang={params.lang} />
            <ISOSection lang={params.lang} />
            <PartnersSection lang={params.lang} />
        </div>
    );
}
