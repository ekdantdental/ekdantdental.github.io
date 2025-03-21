import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, MessageSquare } from 'lucide-react';
import { Appointment } from '@shared/schema';

interface AppointmentSuccessProps {
  appointment: Appointment;
  onClose: () => void;
}

const AppointmentSuccess = ({ appointment, onClose }: AppointmentSuccessProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const sendWhatsAppNotification = () => {
    // Format appointment details for WhatsApp
    const message = `
*New Appointment at Ekdant Dental & ENT Clinic*
Name: ${appointment.firstName} ${appointment.lastName}
Service: ${appointment.service}
Date: ${formatDate(appointment.preferredDate)}
Time: ${appointment.preferredTime}
Phone: ${appointment.phone}
Email: ${appointment.email}
${appointment.message ? `Message: ${appointment.message}` : ''}
    `.trim();
    
    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918379009320&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-white text-center py-4 md:py-6">
        <div className="flex justify-center mb-3 md:mb-4">
          <div className="rounded-full bg-white p-2 md:p-3">
            <Check className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Appointment Confirmed!</h2>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div>
            <p className="text-xs md:text-sm text-gray-500">Patient Name</p>
            <p className="text-sm md:text-base font-medium">{appointment.firstName} {appointment.lastName}</p>
          </div>
          
          <div>
            <p className="text-xs md:text-sm text-gray-500">Service</p>
            <p className="text-sm md:text-base font-medium">{appointment.service}</p>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500">Date</p>
              <p className="text-sm md:text-base font-medium">{formatDate(appointment.preferredDate)}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500">Time</p>
              <p className="text-sm md:text-base font-medium">{appointment.preferredTime}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-3 md:p-4 rounded-md mt-3 md:mt-4">
            <p className="text-center text-xs md:text-sm text-gray-700">
              We'll contact you shortly to confirm your appointment.
            </p>
            <p className="text-center text-xs md:text-sm text-gray-700 mt-2">
              Click the "WhatsApp" button below to send your appointment details 
              to our clinic. You'll need to tap "Send" in WhatsApp after it opens.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-4">
        <Button 
          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm py-2"
          onClick={sendWhatsAppNotification}
        >
          <MessageSquare className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          Send via WhatsApp
        </Button>
        <Button 
          className="flex-1 text-xs md:text-sm py-2"
          variant="outline"
          onClick={onClose}
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentSuccess;