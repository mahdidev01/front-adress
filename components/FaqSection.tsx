"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    id: "q1",
    question: "Comment réserver un logement ?",
    answer:
      "Rien de plus simple ! Parcourez les logements disponibles sur notre site, choisissez vos dates, remplissez vos informations, puis confirmez votre réservation en ligne en quelques clics. Une confirmation vous sera envoyée par e-mail dès validation.",
  },
  {
    id: "q2",
    question: "Puis-je annuler ma réservation ?",
    answer: `
    Toute annulation doit être notifiée par écrit (email). Des frais d'annulation s'appliquent comme décrit sur la page Conditions Générales de Vente.`,
  },
  {
    id: "q3",
    question: "Le paiement est-il sécurisé ?",
    answer:
      "Oui, tous les paiements effectués sur notre site sont 100 % sécurisés grâce à notre partenaire Payzone, reconnu pour son haut niveau de sécurité. Vos données bancaires sont cryptées et protégées.",
  },
];

const FaqSection = () => {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#fff9f1] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700 ease-out">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8 text-[#e1c287]" />
        </div>
        <h2 className="text-3xl font-bold text-center text-[#e1c287] mb-10">
          Réponses à vos questions fréquentes
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-lg font-semibold bg-white rounded-xl px-6 py-4 shadow hover:shadow-md transition-all duration-200 text-gray-800 hover:text-[#e1c287]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 bg-white px-6 py-4 rounded-b-xl border-t border-gray-100 leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
