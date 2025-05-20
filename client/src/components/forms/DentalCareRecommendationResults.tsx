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
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Home, 
  Lightbulb, 
  MessageCircle, 
  AlertTriangle,
  Activity,
  Gauge,
  Heart,
  Calendar,
  Smile,
  List
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface RecommendationsData {
  generalAdvice: string[];
  specificTreatments: string[];
  homeCareTips: string[];
  urgency: 'urgent' | 'normal' | 'routine';
  followUp: 'immediate' | '1_month' | '3_months' | '6_months';
  riskScore?: number;
  riskCategory?: 'high' | 'moderate' | 'low';
  componentScores?: {
    pain: number;
    hygiene: number;
    periodontal: number;
    age: number;
    careHistory: number;
    concerns: number;
  };
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
  const { 
    generalAdvice, 
    specificTreatments, 
    homeCareTips, 
    urgency, 
    followUp,
    riskScore,
    riskCategory,
    componentScores
  } = recommendations;

  const hasNoRecommendations =
    (!generalAdvice || generalAdvice.length === 0) &&
    (!specificTreatments || specificTreatments.length === 0) &&
    (!homeCareTips || homeCareTips.length === 0);
    
  // Get color for risk score progress bar
  const getRiskScoreColor = () => {
    if (!riskCategory) return 'bg-blue-500';
    
    switch(riskCategory) {
      case 'high': return 'bg-red-500';
      case 'moderate': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };
  
  // Get label for risk category
  const getRiskCategoryLabel = () => {
    if (!riskCategory) return 'Assessment';
    
    switch(riskCategory) {
      case 'high': return 'High Risk';
      case 'moderate': return 'Moderate Risk';
      case 'low': return 'Low Risk';
      default: return 'Assessment';
    }
  };

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
            {/* Dental Health Risk Score */}
            {riskScore !== undefined && (
              <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full mr-3 ${
                    riskCategory === 'high' ? 'bg-red-100' : 
                    riskCategory === 'moderate' ? 'bg-amber-100' : 'bg-green-100'
                  }`}>
                    <Gauge className={`h-5 w-5 ${
                      riskCategory === 'high' ? 'text-red-600' : 
                      riskCategory === 'moderate' ? 'text-amber-600' : 'text-green-600'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold">Your Dental Health Risk Assessment</h3>
                  <Badge className={`ml-auto ${
                    riskCategory === 'high' ? 'bg-red-500' : 
                    riskCategory === 'moderate' ? 'bg-amber-500' : 'bg-green-500'
                  }`}>
                    {getRiskCategoryLabel()}
                  </Badge>
                </div>
                
                <div className="ml-12 mb-3">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Low Risk</span>
                    <span className="font-medium">{riskScore}/100</span>
                    <span>High Risk</span>
                  </div>
                  <Progress 
                    value={riskScore} 
                    max={100} 
                    className={`h-3 ${getRiskScoreColor()}`} 
                  />
                </div>
                
                {componentScores && (
                  <div className="ml-12 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {componentScores.pain > 0 && (
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm">Pain: {componentScores.pain}</span>
                      </div>
                    )}
                    {componentScores.hygiene > 0 && (
                      <div className="flex items-center">
                        <Smile className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">Hygiene: {componentScores.hygiene}</span>
                      </div>
                    )}
                    {componentScores.periodontal > 0 && (
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-pink-500 mr-2" />
                        <span className="text-sm">Gum Health: {componentScores.periodontal}</span>
                      </div>
                    )}
                    {componentScores.careHistory > 0 && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="text-sm">Care History: {componentScores.careHistory}</span>
                      </div>
                    )}
                    {componentScores.concerns > 0 && (
                      <div className="flex items-center">
                        <List className="h-4 w-4 text-indigo-500 mr-2" />
                        <span className="text-sm">Concerns: {componentScores.concerns}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="ml-12 mt-3 text-xs text-gray-500">
                  This risk assessment is based on the information you provided and helps guide your recommended care plan.
                </p>
              </div>
            )}
          
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
              <div className="mb-8 p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Recommended Professional Treatments</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {specificTreatments.map((treatment, index) => (
                    <div key={index} className="flex items-start bg-white p-3 rounded-md shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{treatment}</span>
                    </div>
                  ))}
                </div>
                <p className="ml-12 mt-4 text-sm text-blue-700">
                  These treatments are recommended based on your specific dental health needs.
                </p>
              </div>
            )}

            {homeCareTips && homeCareTips.length > 0 && (
              <div className="mb-8 p-4 border border-green-100 rounded-lg bg-green-50">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Daily Home Care Tips</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {homeCareTips.map((tip, index) => (
                    <div key={index} className="flex items-start bg-white p-3 rounded-md shadow-sm border border-green-100">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{tip}</span>
                    </div>
                  ))}
                </div>
                <p className="ml-12 mt-4 text-sm text-green-700">
                  Following these home care practices will help maintain your dental health between professional visits.
                </p>
              </div>
            )}

            {generalAdvice && generalAdvice.length > 0 && (
              <div className="mb-8 p-4 border border-purple-100 rounded-lg bg-purple-50">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Important Dental Health Advice</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {generalAdvice.map((advice, index) => (
                    <div key={index} className="flex items-start bg-white p-3 rounded-md shadow-sm border border-purple-100">
                      <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{advice}</span>
                    </div>
                  ))}
                </div>
                <p className="ml-12 mt-4 text-sm text-purple-700">
                  These insights will help you better understand and maintain your long-term oral health.
                </p>
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