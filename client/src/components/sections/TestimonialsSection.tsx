import { Star, ThumbsUp, ExternalLink } from "lucide-react";
import { googleReviews, clinicInfo } from "@/lib/data";

interface GoogleReviewCardProps {
  review: {
    id: number;
    name: string;
    profileImage: string;
    rating: number;
    date: string;
    text: string;
    helpful: number;
  };
}

const GoogleReviewCard = ({ review }: GoogleReviewCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={review.profileImage}
            alt={review.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
            }}
          />
        </div>

        {/* Name and Rating */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate">
            {review.name}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < review.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>

        {/* Google Icon */}
        <div className="flex-shrink-0">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
        {review.text}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors">
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Real reviews from real patients on Google
          </p>
        </div>

        {/* Reviews */}
        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4 snap-x snap-mandatory">
            {googleReviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[300px] w-[300px] flex-shrink-0 snap-center"
              >
                <GoogleReviewCard review={review} />
              </div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4">
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span>←</span> Swipe to read more <span>→</span>
            </p>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {googleReviews.map((review) => (
            <GoogleReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <a
            href={clinicInfo.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 shadow-sm transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            See All Reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="text-gray-500 text-xs mt-3">
            We'd love to hear about your experience!
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
