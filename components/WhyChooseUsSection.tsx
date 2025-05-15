import { FaCheckCircle, FaClock, FaStar, FaUserTie, FaHeadset, FaTools } from "react-icons/fa";

const features = [
  {
    icon: <FaCheckCircle className="text-green-600 w-6 h-6" />,
    title: "Simplicité",
    desc: "Réservez votre studio ou appartement en quelques clics, sans tracas."
  },
  {
    icon: <FaClock className="text-blue-600 w-6 h-6" />,
    title: "Rapidité",
    desc: "Processus de réservation ultra-rapide et accès immédiat à vos logements."
  },
  {
    icon: <FaStar className="text-yellow-600 w-6 h-6" />,
    title: "Qualité garantie",
    desc: "Logements vérifiés, entretenus et équipés pour un confort optimal."
  },
  {
    icon: <FaUserTie className="text-indigo-600 w-6 h-6" />,
    title: "Expertise",
    desc: "Des années d’expérience dans la location pour répondre à vos besoins."
  },
  {
    icon: <FaHeadset className="text-purple-600 w-6 h-6" />,
    title: "Conciergerie incluse",
    desc: "Accompagnement humain et professionnel pendant tout votre séjour."
  },
  {
    icon: <FaTools className="text-red-600 w-6 h-6" />,
    title: "Service personnalisé",
    desc: "Solutions sur mesure selon vos attentes spécifiques."
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Pourquoi choisir Youradress ?
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Chez Youradress, nous savons que chaque détail compte. C’est pourquoi nous mettons tout en œuvre pour vous offrir une expérience de location sans stress, à la hauteur de vos attentes. Voici ce qui nous distingue :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div>{item.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
