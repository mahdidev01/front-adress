// /app/set-password/page.tsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://booking.youradress.com/module/apirooms/setpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();

    if (result.success) {
      alert("Mot de passe défini !");
      router.push(`/login?email=${email}`);
    } else {
      alert(result.message || "Erreur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Définir un mot de passe</h2>
      <input
        type="email"
        value={email}
        readOnly
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nouveau mot de passe"
        required
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Valider
      </button>
    </form>
  );
}
