interface TestimonialProps {
  testimonial: {
    id: number;
    name: string;
    image: string;
    text: string;
    rating: number;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 relative">
      <div className="text-[#06B6D4] text-2xl md:text-3xl absolute -top-3 md:-top-4 left-4 md:left-6">
        <i className="fas fa-quote-left"></i>
      </div>
      <div className="pt-3 md:pt-4">
        <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">{testimonial.text}</p>
        <div className="flex items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 md:mr-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-dark text-sm md:text-base">{testimonial.name}</h4>
            <div className="text-yellow-400 text-xs md:text-sm">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
