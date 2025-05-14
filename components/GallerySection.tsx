import Image from "next/image";

const galleryItems = [
  {
    src: "/images/gallery/casa.avif",
    title: "Casablanca",
    desc: "Beachfront bliss",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/kech.avif",
    title: "Marrakech",
    desc: "The red city",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    src: "/images/gallery/fes.avif",
    title: "Fès",
    desc: "Medina maze",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/merzouga.avif",
    title: "Merzouga",
    desc: "Sahara dunes",
    colSpan: 3,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/tanger.avif",
    title: "Tanger",
    desc: "Mediterranean gate",
    colSpan: 3,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/atlas.jpeg",
    title: "Atlas",
    desc: "Snow & sun",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/chefch.avif",
    title: "Chefchaouen",
    desc: "The blue pearl",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/pic1.avif",
    title: "Rabat",
    desc: "Capital charm",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    src: "/images/gallery/agadir.avif",
    title: "Agadir",
    desc: "Beach city",
    colSpan: 2,
    rowSpan: 1,
  },
];

const GallerySection = () => {
  return (
    <section className="relative">
      <div className="sticky top-24 z-10 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-12 text-center">
          Explorez le Maroc en images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 col-span-${item.colSpan} row-span-${item.rowSpan}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-white text-lg font-bold">{item.title}</h3>
                <p className="text-white text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
