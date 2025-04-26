"use client";

import {
    About,
    Brokerage,
    DrawdownPlanInput,
    IRA,
    Predictions,
    Roth,
    SocialSecurity,
  } from "@/services/drawdown-plan";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  import * as z from "zod";
  
  import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
  
const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
];

  
  const formSchema = z.object({
    about: z.object({
      age: z.number().min(18, { message: "Age must be greater than 18" }),
      end_of_plan_age: z.number(),
      filing_status: z.enum(["single", "married"]),
      state_of_residence: z.string(),
    }),
    social_security: z.object({
      amount: z.number(),
      starts: z.number(),
    }),
    predictions: z.object({
      inflation: z.number(),
      returns: z.number(),
    }),
    brokerage: z.object({
      balance: z.number(),
      basis: z.number(),
      distributions: z.number(),
    }),
    IRA: z.object({
      balance: z.number(),
    }),
    Roth: z.object({
      balance: z.number(),
      year_opened: z.number(),
      contributions: z.number(),
      old_conversions: z.number(),
      recent_conversions: z.array(z.array(z.number())),
    }),
  });
  
  interface DrawdownPlanFormProps {
    onSubmit: (data: DrawdownPlanInput) => Promise<void>;
  }
  
  export function DrawdownPlanForm({ onSubmit }: DrawdownPlanFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        about: {
          age: 55,
          end_of_plan_age: 96,
          filing_status: "single",
          state_of_residence: "DC",
        },
        social_security: {
          amount: 45240,
          starts: 69,
        },
        predictions: {
          inflation: 3.0,
          returns: 6.5,
        },
        brokerage: {
          balance: 300000,
          basis: 150000,
          distributions: 6.0,
        },
        IRA: {
          balance: 300000,
        },
        Roth: {
          balance: 200000,
          year_opened: 2020,
          contributions: 10000,
          old_conversions: 10000,
          recent_conversions: [
            [2020, 5000],
            [2021, 6000],
            [2022, 4000],
            [2023, 4500],
            [2024, 4000],
          ],
        },
      },
    });
  
    const [formValues, setFormValues] = useState<DrawdownPlanInput | null>(null);
  
    function handleFormSubmit(values: z.infer<typeof formSchema>) {
      setFormValues(values);
      onSubmit(values);
    }
  
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8 p-4"
        >
          <FormField
            control={form.control}
            name="about.age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Age" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="about.end_of_plan_age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End of Plan Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="End of Plan Age"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
         <FormField
            control={form.control}
            name="about.filing_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filing Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a filing status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married Filing Jointly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="about.state_of_residence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State of Residence</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

            <Separator/>
  
          <FormField
            control={form.control}
            name="social_security.amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Security Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Social Security Amount"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="social_security.starts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Security Starts</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Social Security Starts"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <Separator/>
  
          <FormField
            control={form.control}
            name="predictions.inflation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inflation Rate</FormLabel>
                <FormControl>
                  <Input placeholder="Inflation Rate" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="predictions.returns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate of Return</FormLabel>
                <FormControl>
                  <Input placeholder="Rate of Return" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="brokerage.balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Balance</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brokerage Balance"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="brokerage.basis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Basis</FormLabel>
                <FormControl>
                  <Input placeholder="Brokerage Basis" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="brokerage.distributions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brokerage Distributions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brokerage Distributions"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="IRA.balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IRA Balance</FormLabel>
                <FormControl>
                  <Input placeholder="IRA Balance" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="Roth.balance"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="flex items-center gap-1">
                  Roth Balance
                  <AlertTriangle size={16} className="text-yellow-500" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Roth Balance" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="Roth.year_opened"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roth Year Opened</FormLabel>
                <FormControl>
                  <Input placeholder="Roth Year Opened" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="Roth.contributions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roth Contributions</FormLabel>
                <FormControl>
                  <Input placeholder="Roth Contributions" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="Roth.old_conversions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roth Old Conversions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Roth Old Conversions"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type="submit">Calculate Drawdown Plan</Button>
        </form>
      </Form>
    );
  }

