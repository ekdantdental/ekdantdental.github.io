import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { clinicInfo, doctors } from "@/lib/data";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const leadDoctor = doctors[0]; // Dr. Reshma Rathod

  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {clinicInfo.googleRating} rating · {clinicInfo.googleReviewCount}+ reviews
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight">
              Your Smile,{" "}
              <span className="text-cyan-400">Our Priority</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
              {clinicInfo.tagline}. Trusted by{" "}
              <span className="font-semibold text-white">{clinicInfo.patientCount} patients</span>{" "}
              since {clinicInfo.established}.
            </p>

            {/* Single CTA */}
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 text-base md:text-lg"
              onClick={() => scrollToSection("appointment-form")}
            >
              Book Consultation Today
            </Button>
          </div>

          {/* Right Content - Doctor Feature */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Doctor Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  {/* Doctor Image */}
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-cyan-400/50">
                      <img
                        src={leadDoctor.image}
                        alt={leadDoctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80";
                        }}
                      />
                    </div>
                    {/* Online Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-2 border-slate-800">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-white mb-1">
                      {leadDoctor.name}
                    </h3>
                    <p className="text-cyan-400 text-sm font-medium mb-2">
                      {leadDoctor.title}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Lead Prosthodontist & Implantologist with 10+ years of experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                Available Today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
