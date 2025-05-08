import {
    About,
    Brokerage,
    DrawdownPlanInput,
    IRA,
    Predictions,
    Roth,
  } from "@/services/drawdown-plan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useFormState } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
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
import { defaultFormValues } from "@/lib/form-schema"; // Import the schema and defaults

  
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
      age: z.coerce.number(),
      birth_month: z.string(),
      end_of_plan_age: z.coerce.number(),
      filing_status: z.enum(["Single", "MFJ"]),
      state_of_residence: z.string(),
    }),
    social_security: z.object({
      amount: z.coerce.number().max(10000, { message: "This should be a monthly amount." }),
      starts: z.coerce.number(),
    }),
    predictions: z.object({
      inflation: z.coerce.number(),
      returns: z.coerce.number(),
    }),
    cash: z.object({
      amount: z.coerce.number(),
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
      old_conversions: z.coerce.number(),
      conversion_year_minus_1: z.coerce.number(),
      conversion_year_minus_2: z.coerce.number(),
      conversion_year_minus_3: z.coerce.number(),
      conversion_year_minus_4: z.coerce.number(),

    }),
    ACA: z.object({
      premium: z.coerce.number().max(10000, { message: "This should be a monthly amount." }),
      slcsp: z.coerce.number().max(10000, { message: "This should be a monthly amount." }),
      people_covered: z.coerce.number().min(1, { message: "Must cover at least 1 person" }).max(8, { message: "Can cover up to 8 people" }).optional(),
    }).optional(),
    roth_conversion_preference: z.enum(["anytime", "before_socsec", "never"]),
    spending_preference: z.enum(["max_spend", "max_assets"]),
    annual_spending: z.coerce.number().optional(),
    pessimistic: z.object({
      taxes: z.boolean(),
      healthcare: z.boolean(),
    }),
  }).refine((schema) => 
    schema.social_security.starts > schema.about.age ||
    schema.social_security.starts === -1, { 
    message: "Make a selection",
    path: ["social_security.starts"]
});

  interface DrawdownPlanFormProps {
    onSubmit: (data: DrawdownPlanInput) => Promise<void>;
    onFormEdit: () => void; // Add the new prop
  }
  
  export function DrawdownPlanForm({ onSubmit, onFormEdit }: DrawdownPlanFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultFormValues, // Use the imported defaults
    });
  
    const [formValues, setFormValues] = useState<DrawdownPlanInput | null>(null);
    const currentYear = 2025;
    const currentAge = useWatch({control: form.control, name: "about.age"});
    const socialSecurityStartAges = Array.from({ length: 71 - (Number(currentAge)+1) }, (_, i) => Number(currentAge)+ 1 + i);
    const conversionYears = Array.from({ length: 4 }, (_, i) => currentYear - 1 - i);
    const [hasErrors, setHasErrors] = useState(false); // To style the button
    // const [isFormEdited, setIsFormEdited] = useState(false); // Local state for form edit, managed by onFormEdit prop
    const prevFilingStatusRef = useRef<string | undefined>(form.getValues("about.filing_status"));

    const { setFocus } = form;
    const { isSubmitted } = useFormState({ control: form.control }); // Get isSubmitted state

    const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        setHasErrors(false);
        setFormValues(values);
        await onSubmit(values);
        prevFilingStatusRef.current = values.about.filing_status; // Update prev status on successful submit
      } catch (error) {
        console.error("Submission failed:", error);
      }
    };
  
    const handleError = (errors: any) => {
      console.log("Validation errors:", errors);
      setHasErrors(true);
    };

    const filingStatus = form.watch("about.filing_status"); // Watch for changes in filing status

    useEffect(() => {
      // Only run if filingStatus has actually changed from its previous value
      // and the form is not in a "just submitted" state (to prevent reset on re-render after submit)
      if (filingStatus !== prevFilingStatusRef.current) {
        // console.log("Filing status CHANGED from", prevFilingStatusRef.current, "to", filingStatus); // DEBUG
        const currentPeopleCoveredString = form.getValues("ACA.people_covered");
        const currentPeopleCovered = Number(currentPeopleCoveredString); // Convert to number
        // console.log("Current ACA people covered (string):", currentPeopleCoveredString, " (parsed as number):", currentPeopleCovered); // DEBUG

        if (filingStatus === "MFJ" && currentPeopleCovered === 1) {
          // console.log("Condition MET: MFJ and 1 person. Setting to 2."); // DEBUG
          form.setValue("ACA.people_covered", 2, { shouldValidate: true, shouldDirty: true });
          onFormEdit(); // Notify parent that form has been edited
        } else if (filingStatus === "Single" && currentPeopleCovered === 2) {
          // console.log("Condition MET: Single and 2 people. Setting to 1."); // DEBUG
          form.setValue("ACA.people_covered", 1, { shouldValidate: true, shouldDirty: true });
          onFormEdit(); // Notify parent that form has been edited
        }
        prevFilingStatusRef.current = filingStatus; // Update the ref to the new current status
      }
    }, [filingStatus, form, onFormEdit, isSubmitted]);
    
    // const handleInputChange = (fieldOnChange: (...event: any[]) => void) => (e: any) => {
    //   fieldOnChange(e);
    //   onFormEdit(); // Notify the parent component of the edit
    // };

    const handleInputChange = (fieldOnChange: (...event: any[]) => void) => (e: any) => {
      fieldOnChange(e);
      // setIsFormEdited(true); // This local state is not strictly needed if onFormEdit handles parent state
      onFormEdit(); // Notify the parent component of the edit
    };
  
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
          className="space-y-8 p-4"
        >
          <FormField
            control={form.control}
            name="about.age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Age (end of ${currentYear})`}</FormLabel>
                <FormControl>
                  <Input placeholder="Age" type="number" {...field} onChange={handleInputChange(field.onChange)} />
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
                <FormLabel>Month of Birth</FormLabel>
                <Select onValueChange={handleInputChange(field.onChange)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month of birth" />
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
                    onChange={handleInputChange(field.onChange)}
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
                <Select onValueChange={handleInputChange(field.onChange)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tax filing status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="MFJ">Married Filing Jointly</SelectItem>
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
                <Select onValueChange={handleInputChange(field.onChange)} defaultValue={field.value}>
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
        <FormLabel>Inflation Rate (%)</FormLabel>
        <FormControl>
          <Input placeholder="Inflation Rate (%)" type="number" {...field} onChange={handleInputChange(field.onChange)} />
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
        <FormLabel>Investment Returns (%)</FormLabel>
        <FormControl>
          <Input placeholder="Rate of Return (%)" type="number" {...field} onChange={handleInputChange(field.onChange)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

            <Separator/>

          <FormField
            control={form.control}
            name="cash.amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cash</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cash"
                    type="number"
                    {...field}
                    onChange={handleInputChange(field.onChange)}
                  />
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
                    onChange={handleInputChange(field.onChange)}
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
                <div className="flex items-center gap-1">
                <FormLabel>Brokerage Cost Basis</FormLabel>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger
                          type="button"
                          onClick={(e) => e.stopPropagation()} // Prevent form submission
                      ><AlertTriangle size={16} className="text-yellow-700" onClick={(e) => e.stopPropagation()} // Prevent form submission
/></TooltipTrigger>
                      <TooltipContent className="max-w-xs break-words">The calculation of the amount of earnings subject to capital gains taxes is an approximation.</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
                <FormControl>
                  <Input placeholder="Brokerage Cost Basis" type="number" {...field} onChange={handleInputChange(field.onChange)} />
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
                <FormLabel>Brokerage Distributions (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brokerage Distributions (%)"
                    type="number"
                    {...field}
                    onChange={handleInputChange(field.onChange)}
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
                  <Input placeholder="IRA Balance" type="number" {...field} onChange={handleInputChange(field.onChange)} />
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
                        <TooltipTrigger
                          type="button"
                          onClick={(e) => e.stopPropagation()} // Prevent form submission
                      ><AlertTriangle size={16} className="text-yellow-700" onClick={(e) => e.stopPropagation()} // Prevent form submission
/></TooltipTrigger>
                      <TooltipContent className="max-w-xs break-words">DrawdownCalc uses withdrawal rules for Roth IRAs that differ from the IRS rules.  Please fill out all of the Roth fields.</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
                <FormControl>
                  <Input placeholder="Roth Balance" type="number" {...field} onChange={handleInputChange(field.onChange)} />
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
                      {`${yearLabel} Roth Additions`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${yearLabel} Roth Additions`}
                        type="number"
                        {...field}
                        onChange={handleInputChange(field.onChange)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
  

          <FormField
            control={form.control}
            name="Roth.old_conversions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Older Roth Additions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Older Roth Additions"
                    type="number"
                    {...field}
                    onChange={handleInputChange(field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<Separator/>
  
  <FormField
    control={form.control}
    name="social_security.starts"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Social Security Starts</FormLabel>
        <FormControl>
          <Select onValueChange={handleInputChange(field.onChange)} defaultValue={field.value.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Social Security Starts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">Already Started</SelectItem>
                <ScrollArea className="h-32">
                {socialSecurityStartAges.map((age) => (
                  <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                ))}
                </ScrollArea>
              </SelectContent>
            </Select>
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
        <FormLabel>Monthly Benefit</FormLabel>
                <FormControl>
                  <Input
            placeholder="Monthly Benefit"
                    type="number"
                    {...field}
                    onChange={handleInputChange(field.onChange)}
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
        name="ACA.premium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Monthly ACA Premium</FormLabel>
            <FormControl>
              <Input
                placeholder="Full Monthly ACA Premium"
                type="number"
                {...field}
                onChange={handleInputChange(field.onChange)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    <FormField
        control={form.control}
        name="ACA.slcsp"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-1">
            <FormLabel>SLCSP Monthly</FormLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  onClick={(e) => e.stopPropagation()} // Prevent form submission
                ><AlertTriangle size={16} className="text-yellow-700" onClick={(e) => e.stopPropagation()} // Prevent form submission
                  /></TooltipTrigger>
                  <TooltipContent className="max-w-xs break-words">Entering the SLCSP will enable a very experimental feature that calculates (and currently underestimates) ACA subsidies.  Enter 0 to disable this feature.</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>
            <FormControl>
              <Input
                placeholder="SLCSP Monthly Premium"
                type="number"
                {...field}
                onChange={handleInputChange(field.onChange)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
              <FormField
                control={form.control}
                name="ACA.people_covered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ACA People Covered</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ACA People Covered"
                        type="number"
                        {...field}
                        onChange={handleInputChange(field.onChange)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
    </>
  )}

          {/* <div className="space-y-4">
            <p className="text-sm font-medium">Be Pessimistic about:</p>
            <div className="flex flex-col space-y-2">
                <FormField
                control={form.control}
                name="pessimistic.taxes"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={handleInputChange(field.onChange)} />
                    </FormControl>
                    <FormLabel className="font-normal">Taxes</FormLabel>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="pessimistic.healthcare"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={handleInputChange(field.onChange)} />
                    </FormControl>
                    <FormLabel className="font-normal">Healthcare Costs</FormLabel>
                    </FormItem>
                )}
                />
            </div>
            </div>

            <Separator/> */}

          <FormField
            control={form.control}
            name="roth_conversion_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roth Conversions</FormLabel>
                <Select onValueChange={handleInputChange(field.onChange)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Roth conversion strategy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="anytime">Anytime</SelectItem>
                    <SelectItem value="before_socsec">Before Social Security</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator/>

          <FormField
            control={form.control}
            name="spending_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleInputChange(field.onChange)}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="max_spend" id="spending" />
                      </FormControl>
                      <FormLabel htmlFor="spending">Maximize Spending</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="max_assets" id="assets" />
                      </FormControl>
                      <FormLabel htmlFor="assets">Maximize End-of-Plan Assets</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {form.watch("spending_preference") === "max_assets" && (
            <FormField
              control={form.control}
            
              name="annual_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Spending</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Annual Spending"
                      type="number"
                      {...field}
                      onChange={handleInputChange(field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
  
          <Button type="submit"
                  className={hasErrors ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"}
          >Calculate Drawdown Plan</Button>
        </form>
      </Form>
    );
  }
