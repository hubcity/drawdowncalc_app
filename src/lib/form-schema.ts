import * as z from "zod";
import { formSchema } from "@/components/drawdown-plan-form";

export const defaultFormValues: z.infer<typeof formSchema> = {
    about: { age: 59, birth_month: "1", end_of_plan_age: 89, filing_status: "Single", state_of_residence: "FL" },
    social_security: { amount: 3000, starts: 70 },
    predictions: { inflation: 2.8, returns: 6.5 },
    cash: { amount: 0 },
    brokerage: { balance: 0, basis: 0, distributions: 6.0 },
    IRA: { balance: 600000 },
    Roth: {
        balance: 600000,
        old_conversions: 1,
        conversion_year_minus_1: 0,
        conversion_year_minus_2: 0,
        conversion_year_minus_3: 0,
        conversion_year_minus_4: 0,
    },
    ACA: { premium: 0, slcsp: 0, people_covered: 1 },
    spending_preference: "max_spend",
    annual_spending: 70000,
    pessimistic: { taxes: false, healthcare: false },
    roth_conversion_preference: "anytime",
};