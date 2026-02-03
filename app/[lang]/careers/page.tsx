import { PageHeader } from "@/components/ui/page-header";
import { Locale } from "@/types";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Button } from "@/components/ui/button";

export default async function CareersPage({ params }: { params: { lang: Locale } }) {
    const dict = await getDictionary(params.lang);

    return (
        <>
            <PageHeader
                title={dict.navigation.careers}
                subtitle={params.lang === 'ar' ? 'انضم إلى فريقنا المتميز' : 'Join our distinguished team'}
                lang={params.lang}
            />

            <section className="py-20">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">{params.lang === 'ar' ? 'فرص العمل المتاحة' : 'Open Positions'}</h2>
                        <p className="text-gray-500">{params.lang === 'ar' ? 'لا توجد وظائف شاغرة حالياً.' : 'No open positions at the moment.'}</p>
                    </div>

                    <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl text-center">
                        <h3 className="font-bold text-lg mb-2">{params.lang === 'ar' ? 'أرسل سيرتك الذاتية' : 'Submit your CV'}</h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            {params.lang === 'ar'
                                ? 'نحن نبحث دائماً عن المواهب. أرسل سيرتك الذاتية وسنتواصل معك عندما تتوفر فرصة مناسبة.'
                                : 'We are always looking for talent. Send us your CV and we will contact you when a suitable opportunity arises.'}
                        </p>
                        <Button variant="outline">{params.lang === 'ar' ? 'تقديم طلب عام' : 'General Application'}</Button>
                    </div>
                </div>
            </section>
        </>
    );
}
