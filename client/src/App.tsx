import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import DentalCareAssessmentPage from "@/pages/DentalCareAssessmentPage";
import DentalAnxietyResourcesPage from "@/pages/DentalAnxietyResourcesPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/layout/StructuredData";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/dental-care-assessment" component={DentalCareAssessmentPage} />
      <Route path="/dental-anxiety-resources" component={DentalAnxietyResourcesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
      <StructuredData />
    </QueryClientProvider>
  );
}

export default App;
