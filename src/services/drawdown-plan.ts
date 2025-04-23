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
}

export interface About {
    /**
     * The age of the user.
     */
    age: number;
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

export interface Roth {
    /**
     * The balance in the Roth account.
     */
    balance: number;
    /**
     * The year when the first contribution was made.
     */
    year_opened: number;
    /**
     * The amount of contributions made to the Roth account.
     */
    contributions: number;
    /**
     * The amount of conversions older than 5 years old.
     */
    old_conversions: number;
    /**
     * The conversion amount for each of the last 5 years.
     */
    recent_conversions: number[][];
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
   * The brokerage account balance.
   */
  bal_brokerage: number;
  /**
   * The amount withdrawn from the brokerage account.
   */
  wd_brokerage: number;
  /**
   * The capital gains distribution.
   */
  cgd: number;
  /**
   * The IRA balance.
   */
  bal_ira: number;
  /**
   * The amount withdrawn from the IRA.
   */
  wd_ira: number;
  /**
   * The Roth account balance.
   */
  bal_roth: number;
  /**
   * The amount withdrawn from the Roth account.
   */
  wd_roth: number;
  /**
   * The amount converted from IRA to Roth.
   */
  ira_to_roth: number;
  /**
   * The social security income.
   */
  social_security: number;
  /**
   * The federal tax amount.
   */
  fed_tax: number;
  /**
   * The state tax amount.
   */
  state_tax: number;
  /**
   * The total tax amount.
   */
  total_tax: number;
  /**
   * The spending goal for the year.
   */
  spend_goal: number;
}

/**
 * Asynchronously calculates the drawdown plan based on user input.
 *
 * @param input The user's input data.
 * @returns A promise that resolves to an array of DrawdownPlanYear objects.
 */
export async function calculateDrawdownPlan(
  input: DrawdownPlanInput
): Promise<DrawdownPlanYear[]> {
  // TODO: Implement this by calling an external API.

  return [
    {
      age: 55,
      bal_brokerage: 410000,
      wd_brokerage: 28488,
      cgd: 24379,
      bal_ira: 1246210,
      wd_ira: 0,
      bal_roth: 700000,
      wd_roth: 70447,
      ira_to_roth: 0,
      social_security: 24600,
      fed_tax: 0,
      state_tax: 1159,
      total_tax: 1159,
      spend_goal: 106776,
    },
    {
      age: 56,
      bal_brokerage: 381931,
      wd_brokerage: 35526,
      cgd: 22135,
      bal_ira: 1327214,
      wd_ira: 0,
      bal_roth: 670474,
      wd_roth: 57449,
      ira_to_roth: 0,
      social_security: 9888,
      fed_tax: 0,
      state_tax: 1194,
      total_tax: 1194,
      spend_goal: 109979,
    },
  ];
}
