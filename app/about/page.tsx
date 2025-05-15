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

const AproposPage = () => {
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
          À propos de Youradress
        </h1>
      )}

      {/* Intro */}
      {loading ? (
        <Skeleton className="w-[90%] h-5 mb-12 mx-auto" />
      ) : (
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Experts de la location d’hébergements uniques au Maroc. Chez
          Youradress, nous croyons que chaque location est bien plus qu’un
          simple logement : c’est le début d’une expérience authentique,
          confortable et fluide.
        </p>
      )}

      {/* Values */}
      <section className="grid gap-6 md:grid-cols-3 mb-16">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 border rounded-2xl p-6 space-y-4"
            >
              <Skeleton className="w-8 h-8" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))
        ) : (
          <>
            {/* Mission */}
            <div className="bg-[#fff9f1] border rounded-2xl p-6 hover:shadow-md transition">
              <Hotel className="w-8 h-8 text-[#e1c287] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Notre mission</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Vous permettre de réserver un hébergement en toute confiance, en
                quelques clics. Grâce à une sélection rigoureuse de studios et
                appartements, nous facilitons la location pour tous vos séjours
                au Maroc.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#fff9f1] border rounded-2xl p-6 hover:shadow-md transition">
              <Plane className="w-8 h-8 text-[#e1c287] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Notre vision</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Devenir la référence nationale pour la location d’appartements
                et studios, en valorisant l’hospitalité locale, la conciergerie
                personnalisée et la transparence.
              </p>
            </div>

            {/* Valeurs */}
            <div className="bg-[#fff9f1] border rounded-2xl p-6 hover:shadow-md transition">
              <HeartHandshake className="w-8 h-8 text-[#e1c287] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nos valeurs</h3>
              <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>🙏 Hospitalité & Accueil</li>
                <li>✨ Transparence des prix</li>
                <li>♿️ Accessibilité pour tous</li>
                <li>✅ Fiabilité des partenaires</li>
                <li>💡 Service sur mesure</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Final Call to Action */}
      <section className="mt-20 bg-[#fff9f1] rounded-2xl px-6 py-12 text-center">
        {loading ? (
          <>
            <Skeleton className="w-60 h-6 mx-auto mb-4" />
            <Skeleton className="w-3/4 h-4 mx-auto mb-3" />
            <Skeleton className="w-2/3 h-4 mx-auto mb-3" />
            <Skeleton className="w-1/3 h-10 mx-auto" />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🙌 Merci de faire partie de l’aventure
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Avec <strong>Youradress</strong>, réservez votre prochaine
              location en toute sérénité. Qu’il s’agisse d’un séjour d’affaires,
              de vacances ou d’une escapade citadine, nous sommes là pour vous
              proposer le meilleur du logement au Maroc.
            </p>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver maintenant
            </a>
          </>
        )}
      </section>
    </div>
  );
};

export default AproposPage;
