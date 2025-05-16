"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccessMessage("Message envoyé");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSuccessMessage("Erreur lors de l'envoi du message.");
    }

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#e1c287]">
        Contactez-nous
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CONTACT INFOS */}
        <div className="bg-[#fff9f1] rounded-xl p-6 shadow space-y-6">
          <h2 className="text-2xl font-semibold text-[#e1c287] mb-4">
            Nos coordonnées
          </h2>
          <div className="flex items-center gap-4">
            <Phone className="text-[#e1c287]" />
            <span className="text-gray-800 font-medium text-sm">
              +212 6 67 29 15 75
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-[#e1c287]" />
            <span className="text-gray-800 font-medium text-sm">
              contact@youradress.com
            </span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-[#e1c287] mt-1" />
            <p className="text-gray-800 font-medium text-sm">
              332 Bd BRAHIM ROUDANI, ETAGE 5, APPT 21, RESIDENCE RAYHANE
              Q.MAARIF
              <br />
              Casablanca, Maroc
            </p>
          </div>
        </div>

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-6 border border-gray-100"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium text-gray-700"
            >
              Nom
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vous@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-1 font-medium text-gray-700"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Écrivez votre message ici..."
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#e1c287] hover:bg-[#d1b070] text-white cursor-pointer"
          >
            Envoyer
          </Button>
        </form>
        {successMessage && (
          <div className="mt-6 w-full rounded-lg bg-green-50 text-green-800 text-center px-4 py-3 font-semibold shadow-md animate-fade-in">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
