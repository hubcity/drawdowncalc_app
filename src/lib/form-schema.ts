import * as z from "zod";
import { formSchema } from "@/components/drawdown-plan-form";

export const defaultFormValues: z.infer<typeof formSchema> = {
    about: { age: 65, birth_month: "5", end_of_plan_age: 95, filing_status: "Single", state_of_residence: "DC" },
    social_security: { amount: 3000, starts: 70 },
    predictions: { inflation: 3.0, returns: 6.5 },
    cash: { amount: 2000 },
    brokerage: { balance: 250000, basis: 100000, distributions: 6.0 },
    IRA: { balance: 600000 },
    Roth: {
        balance: 150000,
        old_conversions: 0,
        conversion_year_minus_1: 40000,
        conversion_year_minus_2: 40000,
        conversion_year_minus_3: 40000,
        conversion_year_minus_4: 0,
    },
    ACA: { premium: 800, slcsp: 0, people_covered: 1 },
    spending_preference: "max_spend",
    annual_spending: 0,
    pessimistic: { taxes: false, healthcare: false },
    roth_conversion_preference: "anytime",
};