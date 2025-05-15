"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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
  ];

  const logement2Images = [
    { src: "/images/apps/app-moyen/1.jpg" },
    { src: "/images/apps/app-moyen/2.jpg" },
    { src: "/images/apps/app-moyen/3.jpg" },
    { src: "/images/apps/app-moyen/4.jpg" },
    { src: "/images/apps/app-moyen/5.jpg" },
    { src: "/images/apps/app-moyen/6.jpg" },
  ];

  const logement3Images = [
    { src: "/images/apps/app-grand/1.jpg" },
    { src: "/images/apps/app-grand/2.jpg" },
    { src: "/images/apps/app-grand/3.jpg" },
    { src: "/images/apps/app-grand/4.jpg" },
    { src: "/images/apps/app-grand/5.jpg" },
    { src: "/images/apps/app-grand/6.jpg" },
  ];

  const [lightboxOpen1, setLightboxOpen1] = useState(false);
  const [lightboxIndex1, setLightboxIndex1] = useState(0);

  const [lightboxOpen2, setLightboxOpen2] = useState(false);
  const [lightboxIndex2, setLightboxIndex2] = useState(0);

  const [lightboxOpen3, setLightboxOpen3] = useState(false);
  const [lightboxIndex3, setLightboxIndex3] = useState(0);

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
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* IMAGE */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <div className="grid grid-cols-3 gap-2">
              {logement1Images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setLightboxIndex1(i);
                    setLightboxOpen1(true);
                  }}
                  className="relative w-full h-40 rounded-xl overflow-hidden shadow-md cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
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

          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Studio à louer à Casablanca – Lumineux, moderne et fonctionnel
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Découvrez ce studio à louer à Casablanca, idéalement situé et
              baigné de lumière naturelle.Parfait pour un séjour confortable en
              solo ou en couple, ill comprend une zone de couchagecosy, une
              kitchenette moderne et une salle de bain fonctionnelle. Grâce à sa
              configurationoptimisée et son agencement ouvert baigné de lumière,
              chaque mètre carré est pensé pourmaximiser le confort et le
              bien-être, sans superflu. Situé en plein cœur de la ville, il
              alliepraticité, design raffiné et accessibilité.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Casablanca</li>
              <li>🛏️ Lit Double</li>
              <li>📶 Internet sans-fil (WIFI)</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver
            </a>
          </div>
        </div>
      </section>
      <section className="w-screen bg-[#e1c287]/10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Appartement à Louer à Casablanca avec Terrasse – Confort &
              Intimité
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Profitez de la vue sur le lac depuis nos chambres de luxe dotées
              d'un lit king-size, d'un mobilier élégant et d'un coin salon
              spacieux. Parfait pour les clients à la recherche de confort, de
              luxe et d'équipements modernes.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Casablanca</li>
              <li>🛏️ lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e1c287] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#d1b070] transition"
            >
              Réserver
            </a>
          </div>
          {/* IMAGE */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
              <div className="grid grid-cols-3 gap-2">
                {logement2Images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setLightboxIndex2(i);
                      setLightboxOpen2(true);
                    }}
                    className="relative w-full h-40 rounded-xl overflow-hidden shadow-md cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={`Photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
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
        </div>
      </section>
      <section className="w-screen bg-[#e1c287]/10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          {/* IMAGE */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
              <div className="grid grid-cols-3 gap-2">
                {logement3Images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setLightboxIndex3(i);
                      setLightboxOpen3(true);
                    }}
                    className="relative w-full h-40 rounded-xl overflow-hidden shadow-md cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={`Photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
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
          </div>

          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold text-[#e1c287] mb-4">
              Appartement Supérieur à Louer à Casablanca – Terrasse Privée et
              Haut Standing
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Offrez-vous une expérience premium dans cet appartement supérieur
              à louer àCasablanca. Très lumineux et doté d’une belle terrasse,
              il allie élégance, confort etensoleillement exceptionnel. Ce
              superbe appartement supérieur à Casablanca se distinguepar son
              design raffiné et ses espaces généreux : une chambre élégante, un
              salon lumineux,un coin repas, une cuisine moderne et une grande
              terrasse privée. Idéal pour les voyageursexigeants, ce bien
              combine parfaitement luxe, espace et confort urbain.
            </p>
            <ul className="text-gray-600 space-y-1 mb-6 list-disc list-inside text-sm">
              <li>📍 Casablanca</li>
              <li>🛏️ Lit double</li>
              <li>📶 Wifi haut débit</li>
              <li>🛁 Salle de bain privée</li>
            </ul>
            <a
              href="https://youradress.hotelrunner.com/bv3/search"
              target="_blank"
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
