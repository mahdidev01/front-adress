"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";

interface Booking {
  id: number;
  title: string;
  city: string;
  date_from: string;
  date_to: string;
  total_paid_amount: number;
}

export default function EspaceClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const customerData = localStorage.getItem("customer");

    if (!customerData) {
      console.warn("Aucune authentification trouvée.");
      router.push("/login");
      return;
    }

    const { id_customer, secure_key } = JSON.parse(customerData);

    const fetchBookings = async () => {
      try {
        const res = await fetch("https://booking.youradress.com/module/apirooms/customerbookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_customer, secure_key }),
        });

        const data = await res.json();

        if (data.success) {
          setCustomer(data.customer);
          setBookings(data.bookings);
        } else {
          console.warn("Erreur de récupération des réservations");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des réservations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const today = new Date();
  const upcoming = bookings.filter(b => new Date(b.date_from) >= today);
  const past = bookings.filter(b => new Date(b.date_from) < today);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Espace Client</h1>
      <p className="text-gray-600 mb-10">
        Bonjour {customer?.firstname} {customer?.lastname}, voici vos réservations.
      </p>

      {/* Réservations à venir */}
      <h2 className="text-2xl font-semibold mb-4">🗓️ Réservations à venir</h2>
      {loading ? (
        <Skeleton className="h-40 w-full mb-4" />
      ) : upcoming.length === 0 ? (
        <p className="text-gray-500 mb-6">Aucune réservation à venir.</p>
      ) : (
        upcoming.map((b) => (
          <Card key={b.id} className="mb-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.city}</p>
              <p className="text-sm mt-1">
                Du {format(new Date(b.date_from), "dd MMM yyyy")} au {format(new Date(b.date_to), "dd MMM yyyy")}
              </p>
              <p className="text-sm">{parseFloat(b.total_paid_amount).toFixed(2)} MAD</p>
              <div className="mt-4">
                <Link href={`/room/${b.id}`}>
                  <Button variant="outline">Voir les détails</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <Separator className="my-10" />

      {/* Réservations passées */}
      <h2 className="text-2xl font-semibold mb-4">📜 Réservations passées</h2>
      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : past.length === 0 ? (
        <p className="text-gray-500">Aucune réservation passée.</p>
      ) : (
        past.map((b) => (
          <Card key={b.id} className="mb-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.city}</p>
              <p className="text-sm mt-1">
                Du {format(new Date(b.date_from), "dd MMM yyyy")} au {format(new Date(b.date_to), "dd MMM yyyy")}
              </p>
              <p className="text-sm">{parseFloat(b.total_paid_amount).toFixed(2)} MAD</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
