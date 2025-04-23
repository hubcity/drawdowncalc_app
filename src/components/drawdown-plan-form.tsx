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
  
  const formSchema = z.object({
    about: z.object({
      age: z.number().min(18, { message: "Age must be greater than 18" }),
      end_of_plan_age: z.number(),
      filing_status: z.string(),
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
                <FormControl>
                  <Input placeholder="Filing Status" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="State of Residence" {...field} />
                </FormControl>
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
              <FormItem>
                <FormLabel>Roth Balance</FormLabel>
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
