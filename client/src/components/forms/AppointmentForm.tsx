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
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { appointmentSchema, Appointment } from "@shared/schema";
import AppointmentSuccess from "./AppointmentSuccess";

const formSchema = appointmentSchema.extend({
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentForm = () => {
  const { toast } = useToast();
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

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
      message: "",
      consent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof appointmentSchema>) => 
      apiRequest("POST", "/api/appointments", data),
    onSuccess: (response: any) => {
      // Set the submitted appointment data from the response
      // Our server returns data in a nested 'data' property
      const appointmentData = response?.data || response;
      setSubmittedAppointment(appointmentData);
      setShowSuccessPage(true);
      
      // Show a toast notification
      toast({
        title: "Appointment Confirmed",
        description: "Your appointment has been successfully booked.",
        variant: "default",
      });
      
      // Reset the form
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    const { consent, ...appointmentData } = data;
    mutation.mutate(appointmentData);
  };
  
  const closeSuccessPage = () => {
    setShowSuccessPage(false);
    setSubmittedAppointment(null);
  };

  // Show success page if appointment was submitted successfully
  if (showSuccessPage && submittedAppointment) {
    return (
      <AppointmentSuccess 
        appointment={submittedAppointment} 
        onClose={closeSuccessPage} 
      />
    );
  }
  
  // Otherwise show the form
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
      <h3 className="font-heading font-semibold text-xl md:text-2xl text-dark mb-4 md:mb-6">
        Request an Appointment
      </h3>

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
                    <SelectItem value="root-canal">Root Canal Treatment</SelectItem>
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
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-md transition duration-300 text-sm md:text-base"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Request Appointment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
