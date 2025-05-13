"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("customer");
      if (stored) {
        try {
          setCustomer(JSON.parse(stored));
        } catch (e) {
          console.error("Invalid customer data");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    router.push("/login");
  };

  const isLoggedIn = !!customer;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          <img
            src="/logo.png" // 🖼️ Remplace par le bon chemin relatif vers ton logo
            alt="YourAdress Logo"
            className="w-[90px] h-auto"
          />
        </Link>

        <nav className="space-x-6 hidden md:flex">
          <Link href="/" className="text-gray-700 hover:text-yellow-500">
            Accueil
          </Link>
          <Link href="/hotels" className="text-gray-700 hover:text-yellow-500">
            Hebergements
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-yellow-500">
            À propos
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-yellow-500">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600">
                Bonjour, {customer.firstname}
              </span>
              <Link href="/espace-client">
                <Button className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Mes réservations
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button>Se connecter</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Créer un compte</Button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-yellow-500"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4 mb-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
            <Link href="/hotels" onClick={() => setIsOpen(false)}>
              Hebergements
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              À propos
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/espace-client" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Mes réservations</Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Se connecter</Button>
                </Link>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Créer un compte
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
