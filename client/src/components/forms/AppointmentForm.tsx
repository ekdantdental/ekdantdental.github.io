import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { FaWhatsapp } from "react-icons/fa";

// WhatsApp number for appointments
const WHATSAPP_NUMBER = "918379009320";

// Service labels for better display
const SERVICE_LABELS: Record<string, string> = {
  "general": "General Dentistry",
  "cosmetic": "Cosmetic Dentistry",
  "root-canal": "Restorative and Root Canal Treatment",
  "dental-implants": "Dental Implants",
  "orthodontics": "Orthodontics",
  "pediatric": "Pediatric Dentistry",
  "emergency": "Emergency Care",
};

// Time slot labels
const TIME_LABELS: Record<string, string> = {
  "morning": "Morning (9AM - 12PM)",
  "afternoon": "Afternoon (12PM - 5PM)",
  "evening": "Evening (5PM - 9PM)",
};

// Anxiety level labels
const ANXIETY_LABELS: Record<string, string> = {
  "none": "None/Minimal",
  "mild": "Mild anxiety",
  "moderate": "Moderate anxiety",
  "severe": "Severe anxiety",
  "phobia": "Dental phobia",
};

// Accommodation labels
const ACCOMMODATION_LABELS: Record<string, string> = {
  "extra_time": "Extra time during appointment",
  "detailed_explanations": "Detailed explanations of procedures",
  "signal": "Hand signal to take breaks",
  "headphones": "Using headphones/music",
  "sedation": "Discussion about sedation options",
};

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  anxietyLevel: z.string().optional(),
  anxietyAccommodations: z.array(z.string()).optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      anxietyLevel: "none",
      anxietyAccommodations: [],
      message: "",
      consent: false,
    },
  });

  const formatWhatsAppMessage = (data: FormValues): string => {
    const formattedDate = new Date(data.preferredDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    let message = `*New Appointment Request* 🦷\n\n`;
    message += `*Name:* ${data.firstName} ${data.lastName}\n`;
    message += `*Phone:* ${data.phone}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Service:* ${SERVICE_LABELS[data.service] || data.service}\n`;
    message += `*Preferred Date:* ${formattedDate}\n`;
    message += `*Preferred Time:* ${TIME_LABELS[data.preferredTime] || data.preferredTime}\n`;

    if (data.anxietyLevel && data.anxietyLevel !== "none") {
      message += `\n*Dental Anxiety Level:* ${ANXIETY_LABELS[data.anxietyLevel] || data.anxietyLevel}\n`;
    }

    if (data.anxietyAccommodations && data.anxietyAccommodations.length > 0) {
      const accommodations = data.anxietyAccommodations
        .map(a => ACCOMMODATION_LABELS[a] || a)
        .join(", ");
      message += `*Preferred Accommodations:* ${accommodations}\n`;
    }

    if (data.message) {
      message += `\n*Additional Information:*\n${data.message}\n`;
    }

    message += `\n---\n_Sent from Ekdant Dental Website_`;

    return encodeURIComponent(message);
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    const whatsappMessage = formatWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    
    // Show success toast
    toast({
      title: "Redirecting to WhatsApp",
      description: "Your appointment details will be sent via WhatsApp.",
      variant: "default",
    });

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form after short delay
    setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
      <h3 className="font-heading font-semibold text-xl md:text-2xl text-dark mb-4 md:mb-6">
        Request an Appointment
      </h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-3">
        <FaWhatsapp className="text-green-600 text-2xl flex-shrink-0" />
        <p className="text-sm text-green-800">
          Your appointment request will be sent directly via WhatsApp for quick confirmation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">First Name*</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm md:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Last Name*</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm md:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Email Address*</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="text-sm md:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Phone Number*</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} className="text-sm md:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Service Required*</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-sm md:text-base">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-sm md:text-base">
                    <SelectItem value="general">General Dentistry</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Dentistry</SelectItem>
                    <SelectItem value="root-canal">Restorative and Root Canal Treatment</SelectItem>
                    <SelectItem value="dental-implants">Dental Implants</SelectItem>
                    <SelectItem value="orthodontics">Orthodontics</SelectItem>
                    <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
                    <SelectItem value="emergency">Emergency Care</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Preferred Date*</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="text-sm md:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Preferred Time*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-sm md:text-base">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm md:text-base">
                      <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md border-blue-100 bg-blue-50">
            <h4 className="text-sm md:text-base font-medium text-blue-800">Dental Anxiety Support</h4>
            <p className="text-sm text-blue-700 mb-2">
              We understand that dental visits can cause anxiety. Help us make your visit more comfortable by sharing your anxiety level and preferences.
            </p>
            <p className="text-xs text-blue-600 mb-4">
              Not sure about your anxiety level? <Link href="/dental-anxiety-resources" className="underline">Take our anxiety assessment</Link>
            </p>

            <FormField
              control={form.control}
              name="anxietyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Dental Anxiety Level</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue="none"
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-sm md:text-base bg-white">
                        <SelectValue placeholder="Select your anxiety level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm md:text-base">
                      <SelectItem value="none">None/Minimal</SelectItem>
                      <SelectItem value="mild">Mild anxiety</SelectItem>
                      <SelectItem value="moderate">Moderate anxiety</SelectItem>
                      <SelectItem value="severe">Severe anxiety</SelectItem>
                      <SelectItem value="phobia">Dental phobia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel className="text-sm md:text-base">Preferred Accommodations</FormLabel>
              <p className="text-xs text-gray-600 mb-2">Select any accommodations that would help you feel more comfortable</p>
              
              <div className="space-y-2">
                {[
                  { id: "extra_time", label: "Extra time during appointment" },
                  { id: "detailed_explanations", label: "Detailed explanations of procedures" },
                  { id: "signal", label: "Hand signal to take breaks" },
                  { id: "headphones", label: "Using headphones/music" },
                  { id: "sedation", label: "Discussion about sedation options" }
                ].map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="anxietyAccommodations"
                    render={({ field }) => {
                      return (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={item.id}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValues = Array.isArray(field.value) ? field.value : [];
                              return checked
                                ? field.onChange([...currentValues, item.id])
                                : field.onChange(currentValues.filter((value) => value !== item.id));
                            }}
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Additional Information</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={3} 
                    value={field.value || ''} 
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="text-sm md:text-base" 
                    placeholder="Please share any other concerns, questions, or special requirements"
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 md:space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs md:text-sm">
                    I consent to having my information collected and stored as per privacy policy.*
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-md transition duration-300 text-sm md:text-base flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            <FaWhatsapp className="text-lg" />
            {isSubmitting ? "Opening WhatsApp..." : "Book via WhatsApp"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
