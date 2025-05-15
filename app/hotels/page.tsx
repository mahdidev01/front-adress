"use client";

import { useEffect, useState } from "react";
import {
  Hotel,
  Plane,
  HeartHandshake,
  Star,
  Clock4,
  Sparkles,
  Settings,
  Smile,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

const HebergementPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      {/* Title */}
      {loading ? (
        <Skeleton className="w-72 h-8 mx-auto mb-4" />
      ) : (
        <h1 className="text-4xl font-bold text-center mb-4">
          Découvrez nos logements soigneusement sélectionnés pour votre confort
          et votre tranquillité.
        </h1>
      )}

      {/* Values */}
      <section className="w-full py-16 bg-[#e1c287]/10">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* IMAGE */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="https://booking.youradress.com/143-large_default/appartement-2-chambres.jpg"
              alt="Studio Marrakech"
              fill
              className="object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Studio lumineux à Marrakech
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Situé au cœur de Gueliz, ce studio moderne offre un espace
              chaleureux et fonctionnel, idéal pour les couples ou les voyageurs
              solo.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Marrakech, Gueliz</li>
              <li>🛏️ 1 lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver ce logement
            </a>
          </div>
        </div>
      </section>
      <section className="w-full py-16 bg-[#e1c287]/10">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Studio lumineux à Marrakech
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Situé au cœur de Gueliz, ce studio moderne offre un espace
              chaleureux et fonctionnel, idéal pour les couples ou les voyageurs
              solo.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Marrakech, Gueliz</li>
              <li>🛏️ 1 lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver ce logement
            </a>
          </div>
          {/* IMAGE */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="https://booking.youradress.com/143-large_default/appartement-2-chambres.jpg"
              alt="Studio Marrakech"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-16 bg-[#e1c287]/10">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* IMAGE */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src="https://booking.youradress.com/143-large_default/appartement-2-chambres.jpg"
              alt="Studio Marrakech"
              fill
              className="object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Studio lumineux à Marrakech
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Situé au cœur de Gueliz, ce studio moderne offre un espace
              chaleureux et fonctionnel, idéal pour les couples ou les voyageurs
              solo.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Marrakech, Gueliz</li>
              <li>🛏️ 1 lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver ce logement
            </a>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-[#e1c287] text-white text-center py-12">
        <h2 className="text-2xl font-bold mb-2">
          Besoin d’un autre type de logement ?
        </h2>
        <p className="mb-4">
          Contactez-nous et nous vous proposerons une solution sur mesure.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#e1c287] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Nous contacter
        </Link>
      </section>
    </div>
  );
};

export default HebergementPage;
