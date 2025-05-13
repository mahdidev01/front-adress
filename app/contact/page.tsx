"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Replace with API call
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Contactez-nous</h1>

      {/* Contact direct */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <Phone className="text-yellow-600" />
          <span className="text-gray-700 font-medium">+212 6 67 29 15 75</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-yellow-600" />
          <span className="text-gray-700 font-medium">
            contact@youradress.com
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="text-yellow-600" />
          <p className="text-gray-700 font-medium">
            332 Bd BRAHIM ROUDANI, ETAGE 5, APPT 21, RESIDENCE RAYHANE Q.MAARIF
            <br />
            Casablanca, Maroc
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
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

        <Button type="submit" className="w-full">
          Envoyer
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
