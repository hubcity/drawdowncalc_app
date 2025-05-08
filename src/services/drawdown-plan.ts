/**
 * Represents the user's input data for generating a drawdown plan.
 */
export interface DrawdownPlanInput {
  /**
   * Information about the user.
   */
  about: About;
  /**
   * Social security details.
   */
  social_security: SocialSecurity;
  /**
   * Prediction parameters.
   */
  predictions: Predictions;
  /**
   * Brokerage account details.
   */
  brokerage: Brokerage;
  /**
   * Traditional IRA account details.
   */
  IRA: IRA;
  /**
   * Roth account details.
   */
  Roth: Roth;

  ACA: ACA;

  cash: Cash;

  roth_conversion_preference: string;

  spending_preference: string;
  
  pessimistic: Pessimistic;

  annual_spending: number;
}

export interface Pessimistic {
  taxes: boolean;
  healthcare: boolean;
}
export interface About {
    /**
     * The age of the user.
     */
    age: number;
    /**
     * The birth month of the user.
     */
    birth_month: string;
    /**
     * The age at the end of the plan.
     */
    end_of_plan_age: number;
    /**
     * The filing status of the user.
     */
    filing_status: string;
    /**
     * The state of residence of the user.
     */
    state_of_residence: string;
}

export interface SocialSecurity {
    /**
     * The amount of social security benefit.
     */
    amount: number;
    /**
     * The age when social security starts.
     */
    starts: number;
}

export interface Predictions {
    /**
     * The expected inflation rate.
     */
    inflation: number;
    /**
     * The expected rate of return.
     */
    returns: number;
}

export interface Brokerage {
    /**
     * The balance in the brokerage account.
     */
    balance: number;
    /**
     * The cost basis of the brokerage account.
     */
    basis: number;
    /**
     * The percent of the account that will be returned to the user in the form of capital gains and dividends each year.
     */
    distributions: number;
}

export interface IRA {
    /**
     * The balance in the traditional IRA account.
     */
    balance: number;
}

export interface ACA {
    premium: number;
    slcsp: number;
    people_covered: number;
}

export interface Cash {
    amount: number;
}

export interface Roth {
    /**
     * The balance in the Roth account.
     */
    balance: number;
    /**
     * The year when the first contribution was made.
     */
    conversion_year_minus_4: number;
    conversion_year_minus_3: number;
    conversion_year_minus_2: number;
    conversion_year_minus_1: number;
    /**
     * The amount of conversions older than 5 years old.
     */
    old_conversions: number;
}

/**
 * Represents a year in the drawdown plan.
 */
export interface DrawdownPlanYear {
  /**
   * The age of the retiree.
   */
  age: number;
  /**
   * The amount withdrawn from cash reserves.
   */
  Cash_Withdraw: number;
  /**
   * The brokerage account balance.
   */
  Brokerage_Balance: number;
  /**
   * The amount withdrawn from the brokerage account.
   */
  Brokerage_Withdraw: number;
  /**
   * The IRA balance.
   */
  IRA_Balance: number;
  /**
   * The amount withdrawn from the IRA.
   */
  IRA_Withdraw: number;
  /**
   * The Roth account balance.
   */
  Roth_Balance: number;
  /**
   * The amount withdrawn from the Roth account.
   */
  Roth_Withdraw: number;
  /**
   * The amount converted from IRA to Roth.
   */
  IRA_to_Roth: number;
  /**
   * The spendable amount from capital gains distributions.
   */
  CGD_Spendable: number;
  /**
   * The total capital gains distribution amount.
   */
  Capital_Gains_Distribution: number;
  /**
   * The total capital gains realized.
   */
  Total_Capital_Gains: number;
  /**
   * The ordinary income amount.
   */
  Ordinary_Income: number;
  /**
   * The Federal Adjusted Gross Income.
   */
  Fed_AGI: number;
  /**
   * The social security income.
   */
  Social_Security: number;
  /**
   * The federal tax amount.
   */
  Fed_Tax: number;
  /**
   * The state tax amount.
   */
  State_Tax: number;
  /**
   * The total tax amount.
   */
  Total_Tax: number;
  /**
   * The ACA healthcare payment amount.
   */
  ACA_HC_Payment: number;
  /**
   * The ACA help/subsidy amount.
   */
  ACA_Help: number;
  /**
   * The actual spending amount for the year.
   */
  True_Spending: number;

  Required_RMD: number;
}

export interface DrawdownPlanResponse {
  planYears: DrawdownPlanYear[];
  spendingFloor?: number;
  endOfPlanAssets?: number;
  status?: string;
}

/**
 * Asynchronously calculates the drawdown plan based on user input.
 *
 * @param input The user's input data.
 * @returns A promise that resolves to a DrawdownPlanResponse.
 */
export async function calculateDrawdownPlan(payload: any): Promise<DrawdownPlanResponse> {
  const response = await fetch('http://localhost:5001/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Attempt to parse error message from backend if available
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // If parsing error JSON fails, stick with the HTTP status
      console.error("Could not parse error response JSON:", e);
    }
    throw new Error(errorMessage);
  }

  const rawData: { retire: { [key: string]: any }, spending_floor?: number, endofplan_assets?: number, status?: string } = await response.json();

  // Transform the rawData into DrawdownPlanYear[]
  const formattedPlan: DrawdownPlanYear[] = Object.keys(rawData.retire)
    .map(yearIndex => {
      const yearData = rawData.retire[yearIndex];
      // Assuming the 'age' is the yearIndex + startAge from the original input.
      // This might need adjustment if 'age' is directly available in yearData.
      // For now, let's assume 'age' is part of yearData or we derive it.
      // If 'age' is not in yearData, you'll need to pass startAge to this function
      // or find another way to determine it.
      // Let's assume for now 'age' is directly in yearData or we'll add it.
      // If 'age' is missing, you might need to add it based on the key, e.g.
      // const age = parseInt(yearIndex) + (payload.startage || some_default_start_age);
      return {
        age: yearData.age || (parseInt(yearIndex) + (payload.startage || 0)), // Example: derive age if not present
        Cash_Withdraw: yearData.Cash_Withdraw,
        Brokerage_Balance: yearData.Brokerage_Balance,
        Brokerage_Withdraw: yearData.Brokerage_Withdraw,
        IRA_Balance: yearData.IRA_Balance,
        IRA_Withdraw: yearData.IRA_Withdraw,
        Required_RMD: yearData.Required_RMD,
        Roth_Balance: yearData.Roth_Balance,
        Roth_Withdraw: yearData.Roth_Withdraw,
        IRA_to_Roth: yearData.IRA_to_Roth,
        CGD_Spendable: yearData.CGD_Spendable,
        Capital_Gains_Distribution: yearData.Capital_Gains_Distribution,
        Total_Capital_Gains: yearData.Total_Capital_Gains,
        Ordinary_Income: yearData.Ordinary_Income,
        Fed_AGI: yearData.Fed_AGI,
        Social_Security: yearData.Social_Security,
        Fed_Tax: yearData.Fed_Tax,
        State_Tax: yearData.State_Tax,
        Total_Tax: yearData.Total_Tax,
        ACA_HC_Payment: yearData.ACA_HC_Payment,
        ACA_Help: yearData.ACA_Help,
        True_Spending: yearData.True_Spending,
      };
    })
    .sort((a, b) => a.age - b.age); // Ensure sorted by age

  return {
    planYears: formattedPlan,
    spendingFloor: rawData.spending_floor,
    endOfPlanAssets: rawData.endofplan_assets,
    status: rawData.status,
  };
}