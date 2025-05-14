"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "q1",
    question: "How do I book a stay?",
    answer:
      "Simply browse listings, pick your dates, fill in your information, and confirm your booking.",
  },
  {
    id: "q2",
    question: "Can I cancel my reservation?",
    answer:
      "Yes, cancellation policies depend on the listing. Please check the details on each listing page.",
  },
  {
    id: "q3",
    question: "Is payment secure?",
    answer:
      "Absolutely. All payments are processed securely via our trusted partners like CMI and Wafacash.",
  },
];

const FaqSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="sticky top-24 z-10 animate-in fade-in duration-700 ease-out">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Questions fréquemment posées
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg font-medium bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 bg-white px-6 py-4 rounded-b-xl border-t border-gray-100">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
