import Image from "next/image";
import Link from "next/link";

interface Listing {
  id: number;
  title: string;
  city: string;
  price: number;
  image: string;
}

const FeaturedListings = ({ listings, loading }: { listings: Listing[]; loading: boolean }) => {
  const featured = listings.slice(0, 3);

  return (
    <section className="relative">
      <div className="sticky top-20 z-10 animate-fade-in bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Des solutions de logement adaptées à vos besoins
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : featured.length === 0 ? (
            <p>No listings found.</p>
          ) : (
            featured.map((room) => (
              <Link
                key={room.id}
                href={`/room/${room.id}`}
                className="bg-white shadow-md border rounded-lg transition ease-in hover:scale-90 overflow-hidden"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={room.image || "/images/default-room.jpg"}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{room.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{room.city}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {Number(room.price).toFixed(2)} Dh / night
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