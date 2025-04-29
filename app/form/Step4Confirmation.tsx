"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Step4Confirmation({
  formData,
  setFormData,
  nights,
  totalPrice,
  houseRules,
  paymentMethod,
  hotelName,
  prevStep,
  router,
}: any) {
  const handleConfirm = async () => {
    if (!formData.isSigned) {
      alert("Veuillez signer le contrat.");
      return;
    }

    // Vérifie que toutes les infos nécessaires sont présentes
    if (
      !formData.name ||
      !formData.surname ||
      !formData.phone ||
      !formData.email ||
      !formData.idNumber ||
      !formData.roomId ||
      !formData.date_from ||
      !formData.date_to
    ) {
      alert("Merci de compléter toutes les informations du formulaire.");
      return;
    }

    try {
      const today = new Date();
      const bookingXml = `
        <prestashop>
  <booking>
    <id_property>2</id_property> <!-- ID de l'hôtel -->
    <currency>MAD</currency> <!-- Monnaie -->
    <booking_status>2</booking_status> <!-- Status réservation -->
    <payment_status>2</payment_status> <!-- Pas encore payé -->
    <source>booking.youradress.com</source> <!-- Origine de la réservation -->
    <booking_date>2025-04-28</booking_date> <!-- Date de réservation (peut être today) -->
    <remark>Test réservation API</remark>
    <id_language>1</id_language>

    <associations>
      <customer_detail>
        <id_customer>2</id_customer> <!-- Client existant dans ta base -->
        <firstname>mahdi</firstname>
        <lastname>lasana</lastname>
        <email>e.mahdimiftah@gmail.com</email>
        <phone>0612345678</phone>
        <address>Rue des Fleurs</address>
        <city>Casablanca</city>
        <zip>20000</zip>
        <state_code>CAS</state_code>
        <country_code>MA</country_code>
      </customer_detail>

      <price_details>
        <total_paid>1000.00</total_paid> <!-- 0 = gratuit pour test -->
        <total_price_with_tax>1000.00</total_price_with_tax> <!-- Prix total -->
      </price_details>

      <payment_detail>
        <payment_type>online</payment_type> <!-- Paiement sur place (test) -->
        <payment_method>cash</payment_method> <!-- Mode : cash -->
        <transaction_id>fdfdf454544</transaction_id> <!-- ID factice -->
      </payment_detail>

      <room_types>
        <room_type>
          <id_room_type>11</id_room_type> <!-- ID du type de chambre -->
          <checkin_date>2025-06-15</checkin_date> <!-- Date arrivée -->
          <checkout_date>2025-06-16</checkout_date> <!-- Date départ -->
          <number_of_rooms>1</number_of_rooms>
          <rooms>
            <room>
              <id_room>21</id_room> <!-- ID chambre (optionnel sinon système choisira) -->
              <adults>2</adults>
              <child>0</child>
              <child_ages></child_ages>
              <unit_price_without_tax>166.66</unit_price_without_tax> <!-- Exemple prix -->
              <id_tax_rules_group>1</id_tax_rules_group>
              <total_tax>100.00</total_tax>
            </room>
          </rooms>
        </room_type>
      </room_types>

    </associations>
  </booking>
</prestashop>

      `.trim();

      try {
        const response = await fetch("/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/xml",
          },
          body: bookingXml,
        });

        console.log(response.status, response.statusText);

        const text = await response.text();
        console.log("Réponse API:", text);

        if (!response.ok) {
          console.error(
            "Erreur réseau lors de la création de la réservation :",
            text
          );
          alert(
            "Erreur réseau lors de la création de la réservation. Merci de réessayer."
          );
          return;
        }

        // ✅ Même s'il y a <errors>, on considère la réservation OK
        router.push("/reservation");
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau, impossible de créer la réservation.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau, impossible de créer la réservation.");
    }

    router.push("/reservation");
  };

  return (
    <div className="border p-8">
      <h2 className="pb-4 text-lg font-semibold">4. Contrat de réservation</h2>
      <p className="text-sm text-gray-700 mb-4">
        Ce contrat est établi entre{" "}
        <strong>
          {formData.name} {formData.surname}
        </strong>{" "}
        et {hotelName}.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        Numéro d'identité : <strong>{formData.idNumber}</strong>
      </p>
      {nights > 0 && (
        <p className="text-sm text-gray-700 mb-4">
          Durée du séjour : <strong>{nights} nuit(s)</strong>
        </p>
      )}
      <p className="text-sm text-gray-700 mb-4">
        Prix total : <strong>{totalPrice} MAD</strong>
      </p>
      <p className="text-sm text-gray-700 mb-4">
        Règles de la maison : {houseRules}
      </p>
      <p className="text-sm text-gray-700 mb-4">Paiement : {paymentMethod}</p>

      <div className="flex border p-6 mt-8 items-center gap-2 mb-4 bg-white rounded-lg shadow-lg">
        <Checkbox
          id="agree"
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isSigned: checked === true })
          }
        />
        <label htmlFor="agree" className="text-sm">
          Je signe électroniquement ce contrat
        </label>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline" className="rounded-full">
          Retour
        </Button>
        <Button
          className="bg-yellow-500 p-6 rounded-full text-black hover:bg-yellow-300"
          onClick={handleConfirm}
        >
          Confirmer
        </Button>
      </div>
    </div>
  );
}
