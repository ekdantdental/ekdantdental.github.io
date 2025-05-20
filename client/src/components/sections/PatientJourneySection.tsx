import React from 'react';
import PatientJourneyTracker from '../shared/PatientJourneyTracker';

const PatientJourneySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Path to Better Health</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Ekdant Multi Speciality and Implant Center, we guide you through every step of your healthcare journey. 
            Our process is designed to ensure you receive the best care in a comfortable, supportive environment.
          </p>
        </div>
        
        <PatientJourneyTracker />
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            "Our goal is to make your healthcare experience as smooth and effective as possible. We're with you at every step."
          </p>
          <div className="mt-4">
            <a 
              href="#appointment" 
              className="inline-flex items-center justify-center h-10 px-6 font-medium text-white transition-colors bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Begin Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;