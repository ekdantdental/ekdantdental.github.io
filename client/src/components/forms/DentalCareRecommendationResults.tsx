import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { AlertCircle, CheckCircle, Clock, Home, Lightbulb, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface RecommendationsData {
  generalAdvice: string[];
  specificTreatments: string[];
  homeCareTips: string[];
  urgency: 'urgent' | 'normal' | 'routine';
  followUp: 'immediate' | '1_month' | '3_months' | '6_months';
}

interface DentalCareRecommendationResultsProps {
  data: {
    id: number;
    name: string;
    email: string;
    age: number;
    recommendations: RecommendationsData;
    [key: string]: any;
  };
}

const UrgencyBadge = ({ urgency }: { urgency: string }) => {
  switch (urgency) {
    case 'urgent':
      return (
        <Badge variant="destructive" className="ml-2">
          <AlertCircle className="h-3 w-3 mr-1" />
          Urgent
        </Badge>
      );
    case 'normal':
      return (
        <Badge variant="default" className="ml-2 bg-amber-500">
          <Clock className="h-3 w-3 mr-1" />
          Moderate Priority
        </Badge>
      );
    case 'routine':
      return (
        <Badge variant="outline" className="ml-2 border-green-500 text-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Routine
        </Badge>
      );
    default:
      return null;
  }
};

const FollowUpText = ({ followUp }: { followUp: string }) => {
  switch (followUp) {
    case 'immediate':
      return <span className="font-semibold text-red-600">as soon as possible</span>;
    case '1_month':
      return <span className="font-semibold text-amber-600">within 1 month</span>;
    case '3_months':
      return <span className="font-semibold text-blue-600">within 3 months</span>;
    case '6_months':
      return <span className="font-semibold text-green-600">within 6 months</span>;
    default:
      return <span className="font-semibold">at your convenience</span>;
  }
};

const DentalCareRecommendationResults = ({ data }: DentalCareRecommendationResultsProps) => {
  if (!data || !data.recommendations) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Error Loading Recommendations</CardTitle>
          <CardDescription>
            We couldn't load your personalized dental care recommendations. Please try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { recommendations, name } = data;
  const { generalAdvice, specificTreatments, homeCareTips, urgency, followUp } = recommendations;

  const hasNoRecommendations =
    (!generalAdvice || generalAdvice.length === 0) &&
    (!specificTreatments || specificTreatments.length === 0) &&
    (!homeCareTips || homeCareTips.length === 0);

  return (
    <Card className="mt-6 border-t-4 border-t-primary">
      <CardHeader className="bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-xl md:text-2xl">
              Your Personalized Dental Care Plan
              <UrgencyBadge urgency={urgency} />
            </CardTitle>
            <CardDescription className="mt-2">
              Prepared for: {name}
            </CardDescription>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge variant="outline" className="text-xs md:text-sm">
              Recommendation ID: {data.id}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {hasNoRecommendations ? (
          <div className="text-center py-8">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Specific Recommendations</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Based on your assessment, no specific dental care recommendations were generated.
              Consider scheduling a dental check-up for a more comprehensive evaluation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold">Recommended Follow-up</h3>
              </div>
              <p className="ml-12">
                We recommend scheduling a dental appointment{' '}
                <FollowUpText followUp={followUp} />.
              </p>
            </div>

            <Separator className="my-6" />

            {specificTreatments && specificTreatments.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Recommended Treatments</h3>
                </div>
                <ul className="ml-12 space-y-2">
                  {specificTreatments.map((treatment, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {homeCareTips && homeCareTips.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Home Care Tips</h3>
                </div>
                <ul className="ml-12 space-y-2">
                  {homeCareTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {generalAdvice && generalAdvice.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">General Advice</h3>
                </div>
                <ul className="ml-12 space-y-2">
                  {generalAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="bg-gray-50 p-4 rounded-lg my-6">
          <h4 className="font-semibold text-sm mb-2">Important Note</h4>
          <p className="text-sm text-gray-600">
            These recommendations are based on the information you provided and are for general guidance only.
            They do not replace professional dental advice, diagnosis, or treatment.
            Please consult with our dental professionals for a comprehensive evaluation.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row gap-4 bg-gray-50 rounded-b-lg">
        <Link href="/book-appointment">
          <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
            Book An Appointment
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full md:w-auto">
            Return to Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DentalCareRecommendationResults;