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

  // Common input class with 16px font to prevent iOS zoom
  const inputClass = "text-base h-12";
  const selectTriggerClass = "text-base h-12";

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
      <h3 className="font-heading font-semibold text-xl md:text-2xl text-dark mb-4 md:mb-6">
        Request an Appointment
      </h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-3">
        <FaWhatsapp className="text-green-600 text-2xl flex-shrink-0" />
        <p className="text-sm text-green-800">
          Sent directly via WhatsApp for quick confirmation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">First Name*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className={inputClass}
                      autoComplete="given-name"
                      inputMode="text"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Last Name*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className={inputClass}
                      autoComplete="family-name"
                      inputMode="text"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email*</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      className={inputClass}
                      autoComplete="email"
                      inputMode="email"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Phone*</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      {...field} 
                      className={inputClass}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="e.g., 9876543210"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Service Required*</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-base">
                    <SelectItem value="general" className="py-3">General Dentistry</SelectItem>
                    <SelectItem value="cosmetic" className="py-3">Cosmetic Dentistry</SelectItem>
                    <SelectItem value="root-canal" className="py-3">Root Canal Treatment</SelectItem>
                    <SelectItem value="dental-implants" className="py-3">Dental Implants</SelectItem>
                    <SelectItem value="orthodontics" className="py-3">Orthodontics</SelectItem>
                    <SelectItem value="pediatric" className="py-3">Pediatric Dentistry</SelectItem>
                    <SelectItem value="emergency" className="py-3">Emergency Care</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Preferred Date*</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      className={inputClass}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Preferred Time*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-base">
                      <SelectItem value="morning" className="py-3">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon" className="py-3">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening" className="py-3">Evening (5PM - 9PM)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Collapsible Anxiety Section - simplified for mobile */}
          <details className="border rounded-lg border-blue-100 bg-blue-50">
            <summary className="p-4 cursor-pointer text-sm font-medium text-blue-800 list-none flex justify-between items-center">
              <span>Dental Anxiety Support (Optional)</span>
              <span className="text-blue-600">▼</span>
            </summary>
            <div className="px-4 pb-4 space-y-4">
              <p className="text-xs text-blue-700">
                Help us make your visit comfortable.{" "}
                <Link href="/dental-anxiety-resources" className="underline">Learn more</Link>
              </p>

              <FormField
                control={form.control}
                name="anxietyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Anxiety Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue="none"
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={`${selectTriggerClass} bg-white`}>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-base">
                        <SelectItem value="none" className="py-3">None/Minimal</SelectItem>
                        <SelectItem value="mild" className="py-3">Mild</SelectItem>
                        <SelectItem value="moderate" className="py-3">Moderate</SelectItem>
                        <SelectItem value="severe" className="py-3">Severe</SelectItem>
                        <SelectItem value="phobia" className="py-3">Dental Phobia</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel className="text-sm">Preferred Accommodations</FormLabel>
                {[
                  { id: "extra_time", label: "Extra time" },
                  { id: "detailed_explanations", label: "Detailed explanations" },
                  { id: "signal", label: "Break signal" },
                  { id: "headphones", label: "Headphones/music" },
                  { id: "sedation", label: "Sedation options" }
                ].map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="anxietyAccommodations"
                    render={({ field }) => (
                      <label 
                        htmlFor={item.id}
                        className="flex items-center space-x-3 py-2 cursor-pointer"
                      >
                        <Checkbox
                          id={item.id}
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = Array.isArray(field.value) ? field.value : [];
                            return checked
                              ? field.onChange([...currentValues, item.id])
                              : field.onChange(currentValues.filter((value) => value !== item.id));
                          }}
                          className="h-5 w-5"
                        />
                        <span className="text-sm">{item.label}</span>
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>
          </details>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={3} 
                    value={field.value || ''} 
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="text-base resize-none" 
                    placeholder="Any other concerns or requirements"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <label className="flex items-start space-x-3 cursor-pointer py-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-5 w-5 mt-0.5"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I consent to having my information collected as per privacy policy.*
                  </span>
                </label>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition duration-300 text-base flex items-center justify-center gap-2 shadow-lg"
            disabled={isSubmitting}
          >
            <FaWhatsapp className="text-xl" />
            {isSubmitting ? "Opening WhatsApp..." : "Book via WhatsApp"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
