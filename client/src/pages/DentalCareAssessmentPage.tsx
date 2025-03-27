import React, { useState } from 'react';
import DentalCareAssessmentForm from '@/components/forms/DentalCareAssessmentForm';
import DentalCareRecommendationResults from '@/components/forms/DentalCareRecommendationResults';
import { Stethoscope, Brain, ClipboardCheck } from 'lucide-react';

const DentalCareAssessmentPage = () => {
  const [recommendationResults, setRecommendationResults] = useState<any>(null);

  const handleAssessmentComplete = (data: any) => {
    // Scroll to top when results are shown
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRecommendationResults(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!recommendationResults ? (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
                Personalized Dental Care Assessment
              </h1>
              <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
                Answer a few questions about your dental health to receive customized care
                recommendations from our dental experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-blue-100 p-3 inline-block rounded-full mb-3">
                  <ClipboardCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quick Assessment</h3>
                <p className="text-sm text-gray-600">
                  Complete a short questionnaire about your dental health concerns and habits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-green-100 p-3 inline-block rounded-full mb-3">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart Analysis</h3>
                <p className="text-sm text-gray-600">
                  Our system analyzes your inputs to generate personalized recommendations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-purple-100 p-3 inline-block rounded-full mb-3">
                  <Stethoscope className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-sm text-gray-600">
                  Receive specific treatment suggestions, home care tips, and general advice.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow">
              <h2 className="font-semibold text-xl mb-6 text-center">Your Dental Assessment</h2>
              <DentalCareAssessmentForm onSuccess={handleAssessmentComplete} />
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
                Your Personalized Dental Care Plan
              </h1>
              <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
                Based on your assessment, we've generated the following recommendations 
                for your dental health.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <DentalCareRecommendationResults data={recommendationResults} />
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setRecommendationResults(null)}
                  className="text-primary hover:underline"
                >
                  Take the assessment again
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DentalCareAssessmentPage;