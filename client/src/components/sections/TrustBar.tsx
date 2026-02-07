import { Star, Calendar, Users, Award, Clock, Shield } from "lucide-react";
import { clinicInfo, trustIndicators } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  star: <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500" />,
  calendar: <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
  users: <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
  award: <Award className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
  clock: <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
  shield: <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
};

const TrustBar = () => {
  return (
    <section className="bg-gradient-to-r from-slate-50 to-gray-100 border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* Mobile: Horizontal scroll */}
        <div className="flex md:hidden overflow-x-auto gap-6 pb-2 snap-x snap-mandatory scrollbar-hide">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="flex items-center gap-3 min-w-[140px] snap-center"
            >
              <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-sm">
                {iconMap[indicator.icon]}
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-900">
                    {indicator.value}
                  </span>
                </div>
                <p className="text-xs text-gray-600 whitespace-nowrap">
                  {indicator.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="flex items-center gap-4 justify-center"
            >
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-sm">
                {iconMap[indicator.icon]}
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {indicator.value}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{indicator.label}</p>
                <p className="text-xs text-gray-400">{indicator.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Rating Highlight - Mobile */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <a
            href={clinicInfo.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">
              {clinicInfo.googleRating}
            </span>
            <span className="text-gray-500">
              ({clinicInfo.googleReviewCount}+ reviews on Google)
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
