import TestimonialCard from "@/components/shared/TestimonialCard";
import { testimonials } from "@/lib/data";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-light relative">
      <div className="absolute inset-0 bg-primary opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-2 md:px-0">
            Don't just take our word for it. Here's what some of our patients
            have to say about their experience at Ekdant Dental and ENT Clinic.
          </p>
        </div>

        <div className="testimonial-slider relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
