const testimonials = [
    {
      name: "Youssef B.",
      text: "Amazing stay! The riad in Marrakech was breathtaking. Highly recommend Morocco Stays.",
    },
    {
      name: "Sara E.",
      text: "The desert camp in Merzouga was an unforgettable experience. Everything was perfect.",
    },
    {
      name: "Omar T.",
      text: "Loved the clean, modern apartment in Rabat. Booking was easy and smooth.",
    },
    {
      name: "Lina K.",
      text: "The photos didn’t do justice! Beautiful views and warm hosts.",
    },
  ];
  
  const TestimonialsSection = () => {
    return (
      <section className="relative">
        <div className="sticky top-24 z-10 animate-fade-in bg-gray-100 rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Ce que disent les clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow">
                <p className="italic text-gray-600 mb-2">“{t.text}”</p>
                <p className="text-sm font-semibold text-right">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;
  