import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Texte à gauche */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Youradreess, YourChoice</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Chez <b>Youradress</b>, la location de studio ou d’appartement devient <b>une
            expérience fluide, personnalisée et rassurante.</b>
            <br /><br />Que vous cherchiez
            un logement pour quelques jours ou plusieurs semaines, nous vous
            proposons des espaces soigneusement sélectionnés, <b>lumineux</b>, <b>équipés </b>
            et <b>situés</b> dans les meilleurs quartiers.
            <br /><br />Notre service de
            conciergerie intégré <b>vous accompagne</b> à chaque étape : check-in
            simplifié, assistance sur mesure, recommandations locales… Pour un
            séjour sans souci, qui vous ressemble.
          </p>
        </div>

        {/* Image à droite */}
        <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/about.jpg" // Remplace avec ton image réelle
            alt="À propos"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
