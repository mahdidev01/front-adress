"use client";

import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="bg-[#e1c287] text-white text-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Prêt à louer un studio ou un appartement à Casablanca ?
        </h2>
        <p className="text-white/90 text-lg">
          Explorez nos logements et réservez votre prochain séjour en toute
          confiance.
        </p>
        <Link
          href="/hebergements"
          className="inline-block bg-white text-[#e1c287] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          👉 Voir nos logements
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
