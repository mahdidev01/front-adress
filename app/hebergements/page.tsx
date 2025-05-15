"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { ZoomIn } from "lucide-react"; // Icône de loupe

const HebergementPage = () => {
  const [loading, setLoading] = useState(true);

  // Inside your component
  const logement1Images = [
    { src: "/images/apps/studio/1.jpg" },
    { src: "/images/apps/studio/2.jpg" },
    { src: "/images/apps/studio/3.jpg" },
    { src: "/images/apps/studio/4.jpg" },
    { src: "/images/apps/studio/5.jpg" },
    { src: "/images/apps/studio/6.jpg" },
    { src: "/images/apps/studio/6.jpg" },
    { src: "/images/apps/studio/7.jpg" },
    { src: "/images/apps/studio/8.jpg" },
    { src: "/images/apps/studio/9.jpg" },
    { src: "/images/apps/studio/10.jpg" },
    { src: "/images/apps/studio/11.jpg" },
    { src: "/images/apps/studio/12.jpg" },
    { src: "/images/apps/studio/13.jpg" },
    { src: "/images/apps/studio/14.jpg" },
    { src: "/images/apps/studio/15.jpg" },
    { src: "/images/apps/studio/16.jpg" },
  ];

  const logement2Images = [
    { src: "/images/apps/app-moyen/1.jpg" },
    { src: "/images/apps/app-moyen/2.jpg" },
    { src: "/images/apps/app-moyen/3.jpg" },
    { src: "/images/apps/app-moyen/4.jpg" },
    { src: "/images/apps/app-moyen/5.jpg" },
    { src: "/images/apps/app-moyen/6.jpg" },
    { src: "/images/apps/app-moyen/7.jpg" },
    { src: "/images/apps/app-moyen/8.jpg" },
    { src: "/images/apps/app-moyen/9.jpg" },
    { src: "/images/apps/app-moyen/10.jpg" },
    { src: "/images/apps/app-moyen/11.jpg" },
    { src: "/images/apps/app-moyen/12.jpg" },
    { src: "/images/apps/app-moyen/13.jpg" },
    { src: "/images/apps/app-moyen/14.jpg" },
    { src: "/images/apps/app-moyen/15.jpg" },
    { src: "/images/apps/app-moyen/16.jpg" },
    { src: "/images/apps/app-moyen/17.jpg" },
    { src: "/images/apps/app-moyen/18.jpg" },
    { src: "/images/apps/app-moyen/19.jpg" },
  ];

  const logement3Images = [
    { src: "/images/apps/app-grand/1.jpg" },
    { src: "/images/apps/app-grand/2.jpg" },
    { src: "/images/apps/app-grand/3.jpg" },
    { src: "/images/apps/app-grand/4.jpg" },
    { src: "/images/apps/app-grand/5.jpg" },
    { src: "/images/apps/app-grand/6.jpg" },
    { src: "/images/apps/app-grand/7.jpg" },
    { src: "/images/apps/app-grand/8.jpg" },
    { src: "/images/apps/app-grand/9.jpg" },
    { src: "/images/apps/app-grand/10.jpg" },
    { src: "/images/apps/app-grand/11.jpg" },
    { src: "/images/apps/app-grand/12.jpg" },
    { src: "/images/apps/app-grand/13.jpg" },
    { src: "/images/apps/app-grand/14.jpg" },
    { src: "/images/apps/app-grand/15.jpg" },
    { src: "/images/apps/app-grand/16.jpg" },
  ];

  const [lightboxOpen1, setLightboxOpen1] = useState(false);
  const [lightboxIndex1, setLightboxIndex1] = useState(0);
  const visibleImages1 = logement1Images.slice(0, 6);

  const [lightboxOpen2, setLightboxOpen2] = useState(false);
  const [lightboxIndex2, setLightboxIndex2] = useState(0);
  const visibleImages2 = logement2Images.slice(0, 6);

  const [lightboxOpen3, setLightboxOpen3] = useState(false);
  const [lightboxIndex3, setLightboxIndex3] = useState(0);
  const visibleImages3 = logement3Images.slice(0, 6);

  // const [lightboxOpen, setLightboxOpen] = useState(false);
  // const [lightboxIndex, setLightboxIndex] = useState(0);

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
      <section className="w-screen bg-[#e1c287]/10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
        <div className="w-full px-6 grid md:grid-cols-[2fr_1fr] items-center gap-10">
          {/* IMAGE FULL WIDTH */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
              {visibleImages1.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setLightboxIndex1(i);
                    setLightboxOpen1(true);
                  }}
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md cursor-pointer group"
                >
                  <Image
                    src={img.src}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-[#e1c287]" />
                  </div>
                </div>
              ))}

              <Lightbox
                open={lightboxOpen1}
                close={() => setLightboxOpen1(false)}
                slides={logement1Images}
                index={lightboxIndex1}
                plugins={[Zoom, Thumbnails]}
              />
            </div>
          </div>

          {/* DETAILS FULL WIDTH */}
          <div className="px-4">
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Studio à louer à Casablanca – Lumineux, moderne et fonctionnel
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Découvrez ce studio à louer à Casablanca, idéalement situé et
              baigné de lumière naturelle. Parfait pour un séjour confortable en
              solo ou en couple. Il comprend une zone de couchage cosy, une
              kitchenette moderne et une salle de bain fonctionnelle.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Casablanca</li>
              <li>🛏️ Lit Double</li>
              <li>📶 Internet sans-fil (WIFI)</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver
            </a>
          </div>
        </div>
      </section>

      <section className="w-screen bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
        <div className="w-full px-6 grid md:grid-cols-[1fr_2fr] items-center gap-10">
          {/* TEXT SECTION */}
          <div className="px-4">
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Appartement à Louer à Casablanca avec Terrasse – Confort &
              Intimité
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Profitez de la vue sur le lac depuis nos chambres de luxe dotées
              d&apos;un lit king-size, d&apos;un mobilier élégant et d&apos;un
              coin salon spacieux. Parfait pour les clients à la recherche de
              confort, de luxe et d&apos;équipements modernes.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Casablanca</li>
              <li>🛏️ Lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver
            </a>
          </div>

          {/* IMAGE GRID */}
          <div className="w-full px-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {visibleImages2.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setLightboxIndex2(i);
                    setLightboxOpen2(true);
                  }}
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md cursor-pointer group"
                >
                  <Image
                    src={img.src}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-[#e1c287]" />
                  </div>
                </div>
              ))}

              <Lightbox
                open={lightboxOpen2}
                close={() => setLightboxOpen2(false)}
                slides={logement2Images}
                index={lightboxIndex2}
                plugins={[Zoom, Thumbnails]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-screen bg-[#e1c287]/10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
        <div className="w-full px-6 grid md:grid-cols-[2fr_1fr] items-center gap-10">
          {/* IMAGE AREA */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-2">
              {visibleImages3.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setLightboxIndex3(i);
                    setLightboxOpen3(true);
                  }}
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md cursor-pointer group"
                >
                  <Image
                    src={img.src}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-[#e1c287]" />
                  </div>
                </div>
              ))}

              <Lightbox
                open={lightboxOpen3}
                close={() => setLightboxOpen3(false)}
                slides={logement3Images}
                index={lightboxIndex3}
                plugins={[Zoom, Thumbnails]}
              />
            </div>
          </div>

          {/* DETAILS TEXT */}
          <div className="px-4">
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Appartement Supérieur à Louer à Casablanca – Terrasse Privée et
              Haut Standing
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Offrez-vous une expérience premium dans cet appartement supérieur
              à louer à Casablanca. Très lumineux et doté d’une belle terrasse,
              il allie élégance, confort et ensoleillement exceptionnel. Idéal
              pour les voyageurs exigeants.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Casablanca</li>
              <li>🛏️ Lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver
            </a>
          </div>
        </div>
      </section>
      {/* Final Call to Action */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#e1c287] text-white text-center py-12">
        <div className="max-w-7xl mx-auto px-6">
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
        </div>
      </section>
    </div>
  );
};

export default HebergementPage;
