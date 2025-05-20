import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Smile, MessageSquare, Headphones, Info, Film, ArrowLeft, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'wouter';

const DentalAnxietyResourcesPage = () => {
  const [anxietyScore, setAnxietyScore] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  // Dental Anxiety Assessment Questions
  const questions = [
    "How anxious do you feel about having your teeth cleaned?",
    "How fearful are you of dental pain?",
    "How anxious do you feel about getting an injection in your mouth?",
    "How nervous do you get about upcoming dental appointments?",
    "How anxious do you feel in the waiting room?",
  ];

  // Answer choices
  const anxietyLevels = [
    { value: 1, label: "Not Anxious" },
    { value: 2, label: "Slightly Anxious" },
    { value: 3, label: "Moderately Anxious" },
    { value: 4, label: "Very Anxious" },
    { value: 5, label: "Extremely Anxious" }
  ];

  // Relaxation techniques
  const relaxationTechniques = [
    {
      id: "breathing",
      title: "Deep Breathing Exercise",
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      description: "A simple breathing technique to reduce anxiety in the moment",
      steps: [
        "Find a comfortable seated position and close your eyes if possible",
        "Inhale slowly through your nose for a count of 4",
        "Hold your breath for a count of 2",
        "Exhale slowly through your mouth for a count of 6",
        "Repeat this cycle 5-10 times, focusing only on your breath"
      ],
      benefits: "Helps activate your parasympathetic nervous system, reducing heart rate and creating a calming effect within minutes."
    },
    {
      id: "visualization",
      title: "Positive Visualization",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      description: "Mental imagery technique to create a sense of calm and safety",
      steps: [
        "Close your eyes and take a few deep breaths",
        "Imagine yourself in a peaceful place (beach, forest, garden)",
        "Engage all your senses - what do you see, hear, smell, and feel?",
        "Visualize yourself feeling calm, safe, and relaxed in this place",
        "Return to this mental image whenever you feel anxious at the dentist"
      ],
      benefits: "Engaging in positive visualization before and during dental visits can significantly reduce stress hormones and muscle tension."
    },
    {
      id: "progressive",
      title: "Progressive Muscle Relaxation",
      icon: <Smile className="h-5 w-5 text-blue-500" />,
      description: "Technique to release physical tension in your body",
      steps: [
        "Starting with your feet, tense the muscles for 5 seconds",
        "Release and notice the feeling of relaxation for 10 seconds",
        "Move up to your calves, thighs, abdomen, hands, arms, shoulders, and face",
        "Tense and release each muscle group in sequence",
        "Focus on the difference between tension and relaxation"
      ],
      benefits: "Particularly effective for people who hold tension in their body when anxious, which is common during dental procedures."
    },
    {
      id: "distraction",
      title: "Distraction Techniques",
      icon: <Headphones className="h-5 w-5 text-green-500" />,
      description: "Methods to focus your mind away from dental anxiety",
      steps: [
        "Bring headphones and listen to your favorite music or podcast",
        "Try counting exercises, like counting backward from 100 by 7",
        "Focus on wiggling your toes or another subtle movement",
        "Use a stress ball or fidget object in your hand",
        "Ask if you can watch TV if the office has screens available"
      ],
      benefits: "Redirecting your attention can reduce the intensity of anxiety by occupying the mind with more pleasant or neutral stimuli."
    }
  ];

  // Communication cards for talking to your dentist
  const communicationTips = [
    {
      title: "Establish a Signal",
      content: "Agree on a hand signal with your dentist that means 'I need a break' before the procedure begins."
    },
    {
      title: "Share Your Fears",
      content: "Let your dental team know about specific triggers or past experiences that have contributed to your anxiety."
    },
    {
      title: "Ask Questions",
      content: "Understanding each step of the procedure ahead of time can reduce uncertainty and fear."
    },
    {
      title: "Request Information",
      content: "Ask for explanations about what tools will be used and what sensations you might feel."
    },
    {
      title: "Discuss Pain Management",
      content: "Talk about pain control options and express any concerns about discomfort during treatment."
    }
  ];

  // Handle answering a question
  const handleAnswer = (answerValue: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerValue;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate anxiety score (average of all answers)
      const total = newAnswers.reduce((sum, val) => sum + val, 0);
      const avgScore = Math.round((total / questions.length) * 20); // Convert to a 0-100 scale
      setAnxietyScore(avgScore);
      setShowResults(true);
    }
  };

  // Reset the assessment
  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setAnxietyScore(null);
    setShowResults(false);
  };

  // Get anxiety level text based on score
  const getAnxietyLevel = () => {
    if (!anxietyScore) return "";
    
    if (anxietyScore < 20) return "Minimal anxiety";
    if (anxietyScore < 40) return "Mild anxiety";
    if (anxietyScore < 60) return "Moderate anxiety";
    if (anxietyScore < 80) return "High anxiety";
    return "Severe anxiety";
  };

  // Get color for anxiety score
  const getAnxietyColor = () => {
    if (!anxietyScore) return "bg-gray-200";
    
    if (anxietyScore < 20) return "bg-green-500";
    if (anxietyScore < 40) return "bg-emerald-500";
    if (anxietyScore < 60) return "bg-yellow-500";
    if (anxietyScore < 80) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <h1 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
            Dental Anxiety Support Resources
          </h1>
          <p className="text-gray-600 md:text-lg max-w-3xl">
            Dental anxiety is common and completely normal. We've created these resources to help you 
            feel more comfortable and in control during your dental visits at Ekdant Multi Speciality and Implant Center.
          </p>
        </div>

        <Tabs defaultValue="assessment" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="assessment" className="text-sm md:text-base">
              <MessageSquare className="h-4 w-4 mr-2 hidden sm:inline-block" />
              Anxiety Assessment
            </TabsTrigger>
            <TabsTrigger value="techniques" className="text-sm md:text-base">
              <Heart className="h-4 w-4 mr-2 hidden sm:inline-block" />
              Coping Techniques
            </TabsTrigger>
            <TabsTrigger value="communication" className="text-sm md:text-base">
              <Info className="h-4 w-4 mr-2 hidden sm:inline-block" />
              Talking to Your Dentist
            </TabsTrigger>
          </TabsList>

          {/* Anxiety Assessment Tab */}
          <TabsContent value="assessment">
            <Card>
              <CardHeader>
                <CardTitle>Dental Anxiety Assessment</CardTitle>
                <CardDescription>
                  Answer these questions to understand your level of dental anxiety and receive personalized coping strategies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showResults ? (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
                    </div>

                    <div className="py-4">
                      <h3 className="text-lg font-medium mb-6">{questions[currentQuestion]}</h3>
                      <div className="space-y-3">
                        {anxietyLevels.map((level) => (
                          <Button
                            key={level.value}
                            variant={answers[currentQuestion] === level.value ? "default" : "outline"}
                            className="w-full justify-start text-left h-auto py-3 px-4"
                            onClick={() => handleAnswer(level.value)}
                          >
                            {level.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">Your Dental Anxiety Level</h3>
                      <div className="relative h-36 w-36 mx-auto mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{anxietyScore}</span>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={anxietyScore ? (
                              anxietyScore < 20 ? "#10b981" :
                              anxietyScore < 40 ? "#059669" :
                              anxietyScore < 60 ? "#eab308" :
                              anxietyScore < 80 ? "#f97316" : "#ef4444"
                            ) : "#e5e7eb"}
                            strokeWidth="3"
                            strokeDasharray={`${anxietyScore}, 100`}
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">{getAnxietyLevel()}</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-lg mb-3">What This Means</h3>
                      <p className="mb-4 text-gray-700">
                        {anxietyScore && anxietyScore < 20 && "You have minimal dental anxiety. Regular dental visits should be relatively comfortable for you, but it's still good to be aware of coping techniques."}
                        {anxietyScore && anxietyScore >= 20 && anxietyScore < 40 && "You have mild dental anxiety. You may feel nervous before or during dental visits, but it's usually manageable with simple coping techniques."}
                        {anxietyScore && anxietyScore >= 40 && anxietyScore < 60 && "You have moderate dental anxiety. Dental visits likely cause significant stress, but with proper techniques and communication, this can be reduced."}
                        {anxietyScore && anxietyScore >= 60 && anxietyScore < 80 && "You have high dental anxiety. Dental visits are very stressful for you. Consider discussing this with your dentist and exploring the coping techniques we recommend."}
                        {anxietyScore && anxietyScore >= 80 && "You have severe dental anxiety or dental phobia. This level of fear can interfere with getting needed dental care. Please discuss this with Dr. Reshma Rathod or our staff so we can provide extra support."}
                      </p>
                      
                      <h3 className="font-medium text-lg mb-3">Recommended Next Steps</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Check out our <Button onClick={() => {
                            const tabsList = document.querySelector('button[value="techniques"]');
                            if (tabsList) (tabsList as HTMLButtonElement).click();
                          }} variant="link" className="p-0 h-auto">coping techniques</Button> tab to learn practical strategies.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Review the <Button onClick={() => {
                            const tabsList = document.querySelector('button[value="communication"]');
                            if (tabsList) (tabsList as HTMLButtonElement).click();
                          }} variant="link" className="p-0 h-auto">communication tips</Button> to improve your experience.</span>
                        </li>
                        {anxietyScore && anxietyScore >= 60 && (
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>Consider mentioning your anxiety score when <Link href="#appointment" className="text-primary hover:underline">booking your appointment</Link> so we can provide additional support.</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    <Button onClick={resetAssessment} variant="outline" className="w-full">
                      Retake Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coping Techniques Tab */}
          <TabsContent value="techniques">
            <Card>
              <CardHeader>
                <CardTitle>Dental Anxiety Coping Techniques</CardTitle>
                <CardDescription>
                  Explore these effective methods to help manage dental anxiety before and during your appointment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {relaxationTechniques.map(technique => (
                    <Card 
                      key={technique.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${selectedTechnique === technique.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedTechnique(technique.id === selectedTechnique ? null : technique.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full mr-3">
                            {technique.icon}
                          </div>
                          <CardTitle className="text-lg">{technique.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-2">{technique.description}</p>
                        {selectedTechnique === technique.id && (
                          <div className="mt-4 space-y-4 animate-in fade-in-50 duration-300">
                            <div>
                              <h4 className="font-medium text-sm mb-2">How to do it:</h4>
                              <ol className="space-y-1 ml-5 list-decimal text-sm text-gray-700">
                                {technique.steps.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">Why it works:</h4>
                              <p className="text-sm text-gray-700">{technique.benefits}</p>
                            </div>
                          </div>
                        )}
                        {selectedTechnique !== technique.id && (
                          <Button variant="ghost" size="sm" className="mt-2 text-primary">
                            View Details
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Film className="h-5 w-5 mr-2 text-blue-500" />
                    Try Our Guided Relaxation
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Many patients find our guided meditation helpful before dental procedures. You can listen 
                    before your appointment or even during treatment with headphones.
                  </p>
                  <div className="bg-white p-4 rounded-md">
                    <audio
                      controls
                      className="w-full"
                      src="https://cdn.freesound.org/previews/531/531942_11470196-lq.mp3"
                    >
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-xs text-gray-500 mt-2">
                      5-minute dental relaxation exercise (preview only - actual audio available at our clinic)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Communicating With Your Dental Team</CardTitle>
                <CardDescription>
                  Effective communication with your dentist and dental team can significantly reduce anxiety and improve your experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {communicationTips.map((tip, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                      <h3 className="font-medium text-lg mb-2">{tip.title}</h3>
                      <p className="text-gray-700">{tip.content}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Conversation Starters</h3>
                  <p className="text-gray-600 mb-4">
                    If you're not sure how to bring up your anxiety, here are some phrases you can use:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      "I feel nervous about dental visits. Could you explain what will happen during today's appointment?"
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      "I'd like to establish a signal I can use if I need a break during the procedure."
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      "I've had difficult dental experiences in the past. Can we discuss how to make this visit more comfortable?"
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      "I'm concerned about pain during the procedure. What options do we have for managing discomfort?"
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                  <h3 className="font-medium text-lg mb-3 text-green-800">Our Commitment to You</h3>
                  <p className="text-gray-700 mb-4">
                    At Ekdant Multi Speciality and Implant Center, we're committed to creating a comfortable environment 
                    for all patients, especially those with dental anxiety. Our team is trained to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Listen to your concerns without judgment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Explain procedures in detail before starting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Provide breaks when needed during treatment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Offer various comfort measures and distraction techniques</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Adapt our approach based on your individual needs</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Remember, dental anxiety is common and nothing to be embarrassed about. Our team at Ekdant Multi Speciality and Implant Center 
            is here to support you and ensure you receive the dental care you need in the most comfortable way possible.
          </p>
          <Link href="#appointment">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DentalAnxietyResourcesPage;