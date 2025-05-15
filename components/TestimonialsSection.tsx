// components/TestimonialsCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Lina Benslimane.",
    text: "J’ai réservé un studio via Youradress pour quelques jours à Casablanca, et c’était parfait. Tout était propre, lumineux, calme, et surtout : un vrai service de conciergerie ! J’ai eu de l’aide pour mon check-in tardif, ce qui m’a vraiment soulagée.",
  },
  {
    name: "Mehdi Laraki.",
    text: "Très bonne expérience de location avec Youradress. L’appartement était fidèle aux photos, bien situé et super confortable. J’ai adoré l’accompagnement de leur conciergerie qui m’a conseillé des restos et un pressing. Je recommande vivement.",
  },
  {
    name: "Sofia El Idrissi.",
    text: "J’ai testé plusieurs plateformes, mais Youradress a clairement un avantage : le service humain. Leur studio était parfait pour une semaine à Casablanca, et la conciergerie a été très réactive quand j’ai eu besoin d’une rallonge de séjour.",
  },
  {
    name: "Walid Aït Benhaddou.",
    text: "Franchement bluffé ! J’ai loué un appartement avec Youradress pour une mission pro et j’ai été surpris par la qualité du service. Tout est bien organisé, la location est rapide, et la conciergerie est super efficace sans être intrusive.",
  },
  {
    name: "Yasmine Cherkaoui.",
    text: "Le studio que j’ai loué avec Youradress était moderne, hyper propre et très bien situé. Mention spéciale à la conciergerie, vraiment aux petits soins ! Elle m’a aidée à réserver un taxi, c’est ce genre de détail qui fait la différence.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="relative rounded-xl p-10">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Ce que nos clients disent de nous
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000 }}
        navigation
        modules={[Navigation, Autoplay]}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            
            <div className="bg-[#fff9f1] rounded-lg p-6 shadow h-full flex flex-col justify-between">
              <p className="italic text-gray-600 mb-4">“{t.text}”</p>
              <p className="text-sm font-semibold text-right">— {t.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
