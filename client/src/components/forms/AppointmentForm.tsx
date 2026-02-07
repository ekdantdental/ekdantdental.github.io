import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaWhatsapp } from "react-icons/fa";
import { clinicInfo } from "@/lib/data";

// Simplified form schema - just 3 fields
const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a date"),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      preferredDate: "",
    },
  });

  const formatWhatsAppMessage = (data: FormValues): string => {
    const formattedDate = new Date(data.preferredDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    let message = `Hi! I'd like to book an appointment.\n\n`;
    message += `*Name:* ${data.name}\n`;
    message += `*Phone:* ${data.phone}\n`;
    message += `*Preferred Date:* ${formattedDate}\n`;
    message += `\nPlease confirm my appointment. Thank you!`;

    return encodeURIComponent(message);
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    const whatsappMessage = formatWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${clinicInfo.whatsappNumber.replace('+', '')}?text=${whatsappMessage}`;
    
    toast({
      title: "Opening WhatsApp",
      description: "Complete your booking on WhatsApp.",
    });

    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  const inputClass = "text-base h-12 bg-white border-slate-200 focus:border-primary focus:ring-primary";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-slate-900 mb-2">
          Book Your Visit
        </h3>
        <p className="text-slate-500 text-sm">
          Quick booking via WhatsApp - we'll confirm within hours
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">Your Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className={inputClass}
                    placeholder="Enter your full name"
                    autoComplete="name"
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
                <FormLabel className="text-sm font-medium text-slate-700">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    {...field} 
                    className={inputClass}
                    placeholder="e.g., 9876543210"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">Preferred Date</FormLabel>
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

          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 mt-6"
            disabled={isSubmitting}
          >
            <FaWhatsapp className="text-xl" />
            {isSubmitting ? "Opening WhatsApp..." : "Book via WhatsApp"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-xs text-slate-400 mt-4">
        We'll confirm your appointment within 2 hours
      </p>
    </div>
  );
};

export default AppointmentForm;
