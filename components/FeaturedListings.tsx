import Image from "next/image";
import Link from "next/link";

interface Listing {
  id: number;
  title: string;
  city: string;
  price: number;
  image: string;
}

const FeaturedListings = ({
  listings,
  loading,
}: {
  listings: Listing[];
  loading: boolean;
}) => {
  const featured = listings.slice(0, 3);

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#e1c287] py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Des solutions de logement adaptées à vos besoins
          </h2>
          {/* Optional "View All" Link */}
          {/* <Link href="/hotels" className="text-white hover:underline text-sm font-medium">Voir tout</Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-white">Chargement...</p>
          ) : featured.length === 0 ? (
            <p className="text-white">Aucune offre trouvée.</p>
          ) : (
            featured.map((room) => (
              <Link
                key={room.id}
                href={`/room/${room.id}`}
                className="bg-white shadow-md rounded-lg transition ease-in hover:scale-90 overflow-hidden"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={room.image || "/images/default-room.jpg"}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-[#e1c287]">
                  <h3 className="text-lg font-bold mb-1 text-[#f5f5f5]">{room.title}</h3>
                  {/* <p className="text-sm text-gray-500 mb-2">{room.city}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {Number(room.price).toFixed(2)} Dh / nuit
                  </p> */}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
