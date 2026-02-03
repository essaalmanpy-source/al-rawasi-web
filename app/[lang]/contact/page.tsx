import { Locale } from "@/types";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { ContactContent } from "@/components/contact/contact-content";

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
    const dict = await getDictionary(params.lang);

    return (
        <main>
            <ContactContent dict={dict} lang={params.lang} />
        </main>
    );
}

