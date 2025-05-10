import * as z from "zod";

export const defaultFormValues: z.infer<typeof formSchema> = {
    about: { age: 55, birth_month: "5", end_of_plan_age: 96, filing_status: "Single", state_of_residence: "DC" },
    social_security: { amount: 2500, starts: 70 },
    predictions: { inflation: 2.5, returns: 5.5 },
    cash: { amount: 5000 },
    brokerage: { balance: 200000, basis: 150000, distributions: 5.0 },
    IRA: { balance: 500000 },
    Roth: {
        balance: 40000,
        old_conversions: 0,
        conversion_year_minus_1: 10000,
        conversion_year_minus_2: 10000,
        conversion_year_minus_3: 10000,
        conversion_year_minus_4: 0,
    },
    ACA: { premium: 800, slcsp: 0, people_covered: 1 },
    spending_preference: "max_spend",
    annual_spending: 0,
    pessimistic: { taxes: false, healthcare: false },
    roth_conversion_preference: "anytime",
};