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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

  
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

const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];
  
  const formSchema = z.object({
    about: z.object({
      age: z.coerce.number().min(18, { message: "Age must be greater than 18" }),
      birth_month: z.string(),
      end_of_plan_age: z.coerce.number(),
      filing_status: z.enum(["single", "married"]),
      state_of_residence: z.string(),
    }),
    social_security: z.object({
      amount: z.coerce.number(),
      starts: z.coerce.number(),
    }),
    predictions: z.object({
      inflation: z.coerce.number(),
      returns: z.coerce.number(),
    }),
    brokerage: z.object({
      balance: z.coerce.number(),
      basis: z.coerce.number(),
      distributions: z.coerce.number(),
    }),
    IRA: z.object({
      balance: z.coerce.number(),
    }),
    Roth: z.object({
      balance: z.coerce.number(),
      year_opened: z.coerce.number(),
      old_conversions: z.coerce.number(),
      conversion_year_minus_1: z.coerce.number(),
      conversion_year_minus_2: z.coerce.number(),
      conversion_year_minus_3: z.coerce.number(),
      conversion_year_minus_4: z.coerce.number(),

    }),
    aca: z.object({
      full_premium: z.coerce.number().optional(),
      slcsp_premium: z.coerce.number().optional(),
      people_covered: z.coerce.number().optional(),
    }).optional(),
    spending_preference: z.enum(["maximize_spending", "maximize_assets"]),
    annual_spending: z.coerce.number().optional(),
    pessimistic: z.object({
      taxes: z.boolean(),
      healthcare_costs: z.boolean(),
  }).optional(),
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
          birth_month: "1",
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
          balance: 333333,
        },
        Roth: {
          balance: 200000,
          year_opened: 2020,
          old_conversions: 10000,
          conversion_year_minus_1: 0,
          conversion_year_minus_2: 0,
          conversion_year_minus_3: 0,
          conversion_year_minus_4: 0,
        },
        aca: {
          full_premium: 0,
          slcsp_premium: 0,
          people_covered: 1, // Default to 1
        },
        spending_preference: "maximize_spending",
        annual_spending: 0,
        pessimistic: {
          taxes: true,
          healthcare_costs: true,
      }
    },
    });
  
    const [formValues, setFormValues] = useState<DrawdownPlanInput | null>(null);
    const currentYear = 2025;
    const conversionYears = Array.from({ length: 4 }, (_, i) => currentYear - 1 - i);

  
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
            name="about.birth_month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Month</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select birth month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className="h-32">
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
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
                <FormLabel>Tax Filing Status</FormLabel>
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
                    <ScrollArea className="h-32">
                        {states.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
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

            <Separator/>

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
                <FormLabel>Brokerage Cost Basis</FormLabel>
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

            <Separator/>
  
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

            <Separator/>
  
          <FormField
            control={form.control}
            name="Roth.balance"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                    <FormLabel >
                      Roth Balance
                    </FormLabel>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><AlertTriangle size={16} className="text-yellow-500" /></TooltipTrigger>
                        <TooltipContent>Roth 5-year rules are only partially implemented!  After age 59.5 all Roth funds are considered available.</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
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
                <FormLabel>Year of First Roth Contribution or Conversion</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Year of First Roth Contribution"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {conversionYears.map((year, index) => (
            <FormField
              key={year}
              control={form.control}
              name={`Roth.conversion_year_minus_${index + 1}`}
              render={({ field }) => {
                const yearLabel = year;

                
                return (
                  <FormItem>
                    <FormLabel>
                      {`Roth Conversions ${yearLabel}`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Roth Conversions ${yearLabel}`}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
  

{form.getValues("about.age") <= 60 && (
          <FormField
            control={form.control}
            name="Roth.old_conversions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Older Conversions</FormLabel>
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
        )}

<Separator/>
  
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

          <FormField
            control={form.control}
    name="social_security.amount"
            render={({ field }) => (
              <FormItem>
        <FormLabel>Annual Benefit</FormLabel>
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

  <Separator/>

{form.getValues("about.age") <= 65 && (
    <>
    <FormField
        control={form.control}
        name="aca.full_premium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full ACA Premium</FormLabel>
            <FormControl>
              <Input
                placeholder="Full ACA Premium"
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
        name="aca.slcsp_premium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SLCSP Premium</FormLabel>
            <FormControl>
              <Input
                placeholder="SLCSP Premium"
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
        name="aca.people_covered"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of People Covered</FormLabel>
            <FormControl>
              <Input
                placeholder="People Covered"
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )}
          <Separator />

          <div className="space-y-4">
            <p className="text-sm font-medium">Pessimistic about:</p>
            <div className="flex flex-col space-y-2">
                <FormField
                control={form.control}
                name="pessimistic.taxes"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Taxes</FormLabel>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="pessimistic.healthcare_costs"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Healthcare Costs</FormLabel>
                    </FormItem>
                )}
                />
            </div>
            </div>

            <Separator/>

          <FormField
            control={form.control}
            name="spending_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="maximize_spending" id="spending" />
                      </FormControl>
                      <FormLabel htmlFor="spending">Maximize Spending</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="maximize_assets" id="assets" />
                      </FormControl>
                      <FormLabel htmlFor="assets">Maximize End-of-Plan Assets</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {form.watch("spending_preference") === "maximize_assets" && (
            <FormField
              control={form.control}
            
              name="annual_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Living Expenses</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Annual Spending"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
  
          <Button type="submit">Calculate Drawdown Plan</Button>
        </form>
      </Form>
    );
  }
