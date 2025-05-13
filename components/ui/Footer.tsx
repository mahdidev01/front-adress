// components/ui/Footer.tsx
"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-xl font-bold text-yellow-500 mb-2">YourAdress</h3>
          <p className="text-sm text-gray-600">
            Votre plateforme marocaine pour réserver facilement des logements.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Entreprise</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/about">À propos</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/conditions-generales-vente">
                Conditions Générales de Vente
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contactez-nous</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <p className="text-sm text-gray-600">Tel : +212 6 67 29 15 75</p>
            </li>
            <li>
              <p className="text-sm text-gray-600">contact@youradress.com</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} YourAdress. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
