const MapSection = () => {
    return (
      <section className="relative">
        <div className="sticky top-24 z-10 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Où nous trouver
          </h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Morocco Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63262.40123580042!2d-7.589991830031025!3d33.55804234174098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sma!4v1744988820503!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    );
  };
  
  export default MapSection;
  