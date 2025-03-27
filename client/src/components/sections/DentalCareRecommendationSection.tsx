import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

const DentalCareRecommendationSection = () => {
  return (
    <section id="dental-care-recommendation" className="py-10 md:py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
            Personalized Dental Care Recommendations
          </h2>
          <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
            Answer a few questions about your dental health and habits to receive customized care 
            recommendations from our dental experts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-primary/10 text-primary">
              <CardTitle className="text-center">Your Personal Dental Care Journey</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-8 px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Complete Assessment</h3>
                  <p className="text-sm text-gray-600">
                    Answer questions about your dental health, habits, and concerns.
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Receive personalized dental care recommendations based on your answers.
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Book Appointment</h3>
                  <p className="text-sm text-gray-600">
                    Schedule an appointment with our specialists for proper treatment.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link href="/dental-care-assessment">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Start Your Dental Assessment
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-gray-500">
                  Takes only 2-3 minutes to complete
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-10 text-center">
            <h3 className="font-semibold text-xl mb-4">Why Get a Personalized Recommendation?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-primary">Understand Your Dental Health</h4>
                <p className="text-sm text-gray-600">
                  Gain insights into your current dental health status and potential risks.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-primary">Tailored Home Care Tips</h4>
                <p className="text-sm text-gray-600">
                  Receive customized advice for your daily oral hygiene routine.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-primary">Prioritize Treatments</h4>
                <p className="text-sm text-gray-600">
                  Understand which dental treatments should be your priority.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-primary">Prevention Focused</h4>
                <p className="text-sm text-gray-600">
                  Learn preventive measures specific to your dental condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalCareRecommendationSection;