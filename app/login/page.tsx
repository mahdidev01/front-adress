"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://booking.youradress.com/module/apirooms/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Échec de la connexion.");
        setLoading(false);
        return;
      }

      // ✅ Stocker l’utilisateur localement
      localStorage.setItem("customer", JSON.stringify(data));

      toast.success("Connexion réussie !");
      router.push("/espace-client");
    } catch (err) {
      console.error("Erreur login:", err);
      toast.error("Erreur serveur. Réessayez.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Se connecter</h1>
            <p className="text-sm text-gray-500 mt-2">
              Connectez-vous à votre compte YourAdress
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Vous n’avez pas de compte ?{" "}
            <a href="/register" className="text-yellow-500 font-semibold hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/images/gallery/casa.avif"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
}
