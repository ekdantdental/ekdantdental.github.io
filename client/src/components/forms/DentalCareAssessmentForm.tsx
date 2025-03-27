import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { dentalCareRecommendationSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

// Extend the schema to add validation rules
const formSchema = dentalCareRecommendationSchema.extend({
  email: z.string().email('Please enter a valid email address'),
  age: z.coerce.number().min(1, 'Age is required').max(120, 'Age must be less than 120'),
});

// Define the concerns list
const concernsList = [
  { value: 'cavities', label: 'Cavities or Tooth Decay' },
  { value: 'gum_disease', label: 'Gum Disease or Bleeding Gums' },
  { value: 'bad_breath', label: 'Bad Breath (Halitosis)' },
  { value: 'teeth_alignment', label: 'Crooked or Misaligned Teeth' },
  { value: 'teeth_whitening', label: 'Teeth Discoloration or Staining' },
  { value: 'missing_teeth', label: 'Missing Teeth' },
  { value: 'grinding_teeth', label: 'Teeth Grinding or Clenching' },
];

const DentalCareAssessmentForm = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const [painValue, setPainValue] = useState<number>(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      hasPain: 'no',
      teethSensitivity: 'low',
      bleedingGums: 'no',
      lastDentalVisit: 'less_than_6_months',
      dailyBrushingFrequency: 2,
      flossingFrequency: 'occasionally',
      concerns: [],
    },
  });

  const dentalAssessmentMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest('POST', '/api/dental-recommendations', data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Assessment Complete',
        description: 'Your dental care recommendations have been generated successfully.',
      });
      if (onSuccess && data) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to submit your assessment. Please try again.',
        variant: 'destructive',
      });
      console.error('Dental assessment error:', error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // If user has pain, include the pain level
    if (values.hasPain === 'yes') {
      values.painLevel = painValue;
    }
    
    dentalAssessmentMutation.mutate(values);
  };

  const hasPainValue = form.watch('hasPain');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasPain"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you currently experiencing any tooth or gum pain?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {hasPainValue === 'yes' && (
          <FormItem className="space-y-3">
            <FormLabel>How would you rate your pain level? (1-10)</FormLabel>
            <div className="pt-2">
              <Slider
                defaultValue={[painValue]}
                max={10}
                min={1}
                step={1}
                value={[painValue]}
                onValueChange={(value) => setPainValue(value[0])}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs">Mild (1)</span>
                <span className="text-xs">Moderate (5)</span>
                <span className="text-xs">Severe (10)</span>
              </div>
              <div className="text-center mt-2 font-medium">
                Selected: {painValue}
              </div>
            </div>
          </FormItem>
        )}

        <FormField
          control={form.control}
          name="teethSensitivity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How would you describe your teeth sensitivity to hot, cold, or sweet?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sensitivity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low (Rarely bothers me)</SelectItem>
                  <SelectItem value="medium">Medium (Occasional discomfort)</SelectItem>
                  <SelectItem value="high">High (Frequent/severe discomfort)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bleedingGums"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do your gums bleed when brushing or flossing?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastDentalVisit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When was your last dental visit?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="less_than_6_months">Less than 6 months ago</SelectItem>
                  <SelectItem value="6_to_12_months">6-12 months ago</SelectItem>
                  <SelectItem value="more_than_12_months">More than 12 months ago</SelectItem>
                  <SelectItem value="never">Never visited a dentist</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dailyBrushingFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many times do you brush your teeth daily?</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))} 
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">0 (Do not brush daily)</SelectItem>
                  <SelectItem value="1">1 time per day</SelectItem>
                  <SelectItem value="2">2 times per day</SelectItem>
                  <SelectItem value="3">3 or more times per day</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flossingFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How often do you floss?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flossing frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="occasionally">Occasionally (few times a week)</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="concerns"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>What are your main dental concerns? (Select all that apply)</FormLabel>
                <FormDescription>
                  Choose any concerns you currently have about your dental health.
                </FormDescription>
              </div>
              {concernsList.map((concern) => (
                <FormField
                  key={concern.value}
                  control={form.control}
                  name="concerns"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={concern.value}
                        className="flex flex-row items-start space-x-3 space-y-0 my-1"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(concern.value)}
                            onCheckedChange={(checked) => {
                              let updatedValue: string[] = [...(field.value || [])];
                              if (checked) {
                                updatedValue.push(concern.value);
                              } else {
                                updatedValue = updatedValue.filter(
                                  (value) => value !== concern.value
                                );
                              }
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {concern.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full md:w-auto" 
          disabled={dentalAssessmentMutation.isPending}
        >
          {dentalAssessmentMutation.isPending ? 'Generating Recommendations...' : 'Get Your Recommendations'}
        </Button>
      </form>
    </Form>
  );
};

export default DentalCareAssessmentForm;