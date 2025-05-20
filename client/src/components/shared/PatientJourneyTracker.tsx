import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Define the journey steps
const journeySteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "Meet with our specialists to discuss your concerns and goals.",
    icon: "🗓️"
  },
  {
    id: 2,
    title: "Diagnosis & Assessment",
    description: "Complete examination including any necessary tests and imaging.",
    icon: "🔬"
  },
  {
    id: 3,
    title: "Treatment Planning",
    description: "Receive a personalized treatment plan designed for your specific needs.",
    icon: "📋"
  },
  {
    id: 4,
    title: "Treatment",
    description: "Experience expert care from our skilled professionals.",
    icon: "💉"
  },
  {
    id: 5,
    title: "Follow-up Care",
    description: "Continue with follow-up appointments to ensure optimal results.",
    icon: "👨‍⚕️"
  }
];

interface PatientJourneyTrackerProps {
  className?: string;
  initialActiveStep?: number;
}

const PatientJourneyTracker = ({ 
  className,
  initialActiveStep = 1 
}: PatientJourneyTrackerProps) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance through steps for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setActiveStep((prev) => {
          const nextStep = prev >= journeySteps.length ? 1 : prev + 1;
          return nextStep;
        });
        
        // Reset animation state after transition completes
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 5000); // Change step every 5 seconds

    return () => clearTimeout(timer);
  }, [activeStep, isAnimating]);

  // Handle manual step selection
  const handleStepClick = (stepId: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveStep(stepId);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Your Patient Journey
      </h2>
      
      {/* Progress bar */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
        <div className="flex justify-between relative z-10">
          {journeySteps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-all duration-300 border-2",
                  activeStep === step.id 
                    ? "bg-primary text-white border-primary" 
                    : activeStep > step.id 
                      ? "bg-primary/20 border-primary" 
                      : "bg-white border-gray-300"
                )}
              >
                {step.icon}
              </button>
              <span className="hidden md:block text-center text-sm font-medium">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step details */}
      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl text-primary">
            {journeySteps[activeStep - 1].icon}
          </div>
          <h3 className="text-xl font-semibold">
            Step {activeStep}: {journeySteps[activeStep - 1].title}
          </h3>
        </div>
        <p className="text-gray-600">
          {journeySteps[activeStep - 1].description}
        </p>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => handleStepClick(activeStep > 1 ? activeStep - 1 : journeySteps.length)}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            disabled={isAnimating}
          >
            Previous
          </button>
          <button 
            onClick={() => handleStepClick(activeStep < journeySteps.length ? activeStep + 1 : 1)}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={isAnimating}
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientJourneyTracker;