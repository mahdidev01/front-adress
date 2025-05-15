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
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#e1c287] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-white">
            Des solutions de logement adaptées à vos besoins
          </h2>
          <Link
            href="/hebergements"
            className="text-sm bg-white text-[#e1c287] font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition w-fit"
          >
            Voir tous les logements
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-white">Chargement en cours...</p>
          ) : featured.length === 0 ? (
            <p className="text-white">
              Aucun logement disponible pour le moment.
            </p>
          ) : (
            featured.map((room) => (
              <Link
                key={room.id}
                href={`/room/${room.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition hover:scale-[0.97] overflow-hidden"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={room.image || "/images/default-room.jpg"}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {room.title}
                  </h3>
                  <p className="text-sm text-gray-500">{room.city}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {Number(room.price).toFixed(2)} Dh / nuit
                  </p>
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
