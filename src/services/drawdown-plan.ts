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

  // Replace the placeholder data below with the actual data from the API call
  return [
    { age: 55, Cash_Withdraw: 15000, Brokerage_Balance: 400000, Brokerage_Withdraw: 105823, IRA_Balance: 1158000, IRA_Withdraw: 0, Roth_Balance: 772000, Roth_Withdraw: 0, IRA_to_Roth: 14931, CGD_Spendable: 0, Capital_Gains_Distribution: 18798, Total_Capital_Gains: 60069, Ordinary_Income: 14931, Fed_AGI: 75000, Fed_Tax: 1748, State_Tax: 3500, Total_Tax: 5248, ACA_HC_Payment: 3975, ACA_Help: 469, Social_Security: 0, True_Spending: 111600 },
    { age: 56, Cash_Withdraw: 0, Brokerage_Balance: 285923, Brokerage_Withdraw: 89963, IRA_Balance: 1181911, IRA_Withdraw: 0, Roth_Balance: 813672, Roth_Withdraw: 9012, IRA_to_Roth: 14854, CGD_Spendable: 18250, Capital_Gains_Distribution: 12522, Total_Capital_Gains: 47881, Ordinary_Income: 14854, Fed_AGI: 62735, Fed_Tax: 0, State_Tax: 2716, Total_Tax: 2716, ACA_HC_Payment: 2909, ACA_Help: 565, Social_Security: 0, True_Spending: 111600 },
    { age: 57, Cash_Withdraw: 0, Brokerage_Balance: 190462, Brokerage_Withdraw: 105003, IRA_Balance: 1206714, IRA_Withdraw: 0, Roth_Balance: 847362, Roth_Withdraw: 0, IRA_to_Roth: 15078, CGD_Spendable: 12157, Capital_Gains_Distribution: 5461, Total_Capital_Gains: 47048, Ordinary_Income: 15078, Fed_AGI: 62126, Fed_Tax: 37, State_Tax: 2690, Total_Tax: 2727, ACA_HC_Payment: 2834, ACA_Help: 579, Social_Security: 0, True_Spending: 111600 },
    { age: 58, Cash_Withdraw: 0, Brokerage_Balance: 83060, Brokerage_Withdraw: 83060, IRA_Balance: 1232128, IRA_Withdraw: 0, Roth_Balance: 891746, Roth_Withdraw: 30086, IRA_to_Roth: 28377, CGD_Spendable: 5302, Capital_Gains_Distribution: 0, Total_Capital_Gains: 33146, Ordinary_Income: 28377, Fed_AGI: 61523, Fed_Tax: 1426, State_Tax: 2664, Total_Tax: 4089, ACA_HC_Payment: 2759, ACA_Help: 594, Social_Security: 0, True_Spending: 111600 },
    { age: 59, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1244656, IRA_Withdraw: 0, Roth_Balance: 920281, Roth_Withdraw: 122305, IRA_to_Roth: 61046, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 61046, Fed_AGI: 61046, Fed_Tax: 5365, State_Tax: 2646, Total_Tax: 8011, ACA_HC_Payment: 2694, ACA_Help: 607, Social_Security: 0, True_Spending: 111600 },
    { age: 60, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1223830, IRA_Withdraw: 60453, Roth_Balance: 888211, Roth_Withdraw: 61700, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 60453, Fed_AGI: 60453, Fed_Tax: 5313, State_Tax: 2620, Total_Tax: 7933, ACA_HC_Payment: 2620, ACA_Help: 621, Social_Security: 0, True_Spending: 111600 },
    { age: 61, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1202909, IRA_Withdraw: 59866, Roth_Balance: 854597, Roth_Withdraw: 62135, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 59866, Fed_AGI: 59866, Fed_Tax: 5261, State_Tax: 2594, Total_Tax: 7856, ACA_HC_Payment: 2545, ACA_Help: 636, Social_Security: 0, True_Spending: 111600 },
    { age: 62, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1181884, IRA_Withdraw: 59285, Roth_Balance: 819390, Roth_Withdraw: 62566, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 59285, Fed_AGI: 59285, Fed_Tax: 5210, State_Tax: 2569, Total_Tax: 7780, ACA_HC_Payment: 2471, ACA_Help: 650, Social_Security: 0, True_Spending: 111600 },
    { age: 63, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1160746, IRA_Withdraw: 58709, Roth_Balance: 782541, Roth_Withdraw: 62992, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 58709, Fed_AGI: 58709, Fed_Tax: 5160, State_Tax: 2544, Total_Tax: 7704, ACA_HC_Payment: 2397, ACA_Help: 665, Social_Security: 0, True_Spending: 111600 },
    { age: 64, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1139485, IRA_Withdraw: 58139, Roth_Balance: 744000, Roth_Withdraw: 63414, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 58139, Fed_AGI: 58139, Fed_Tax: 5110, State_Tax: 2520, Total_Tax: 7629, ACA_HC_Payment: 2324, ACA_Help: 679, Social_Security: 0, True_Spending: 111600 },
    { age: 65, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1118090, IRA_Withdraw: 57575, Roth_Balance: 703712, Roth_Withdraw: 62706, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 57575, Fed_AGI: 57575, Fed_Tax: 5060, State_Tax: 2495, Total_Tax: 7555, ACA_HC_Payment: 1125, ACA_Help: 694, Social_Security: 0, True_Spending: 111600 },
    { age: 66, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1096553, IRA_Withdraw: 67368, Roth_Balance: 662788, Roth_Withdraw: 54664, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 67368, Fed_AGI: 67368, Fed_Tax: 7288, State_Tax: 3144, Total_Tax: 10432, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 0, True_Spending: 111600 },
    { age: 67, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1064157, IRA_Withdraw: 66714, Roth_Balance: 628789, Roth_Withdraw: 55217, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 66714, Fed_AGI: 66714, Fed_Tax: 7218, State_Tax: 3113, Total_Tax: 10331, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 0, True_Spending: 111600 },
    { age: 68, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 1031337, IRA_Withdraw: 66066, Roth_Balance: 593062, Roth_Withdraw: 55764, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 66066, Fed_AGI: 66066, Fed_Tax: 7147, State_Tax: 3083, Total_Tax: 10231, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 0, True_Spending: 111600 },
    { age: 69, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 998071, IRA_Withdraw: 65425, Roth_Balance: 555555, Roth_Withdraw: 56307, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 65425, Fed_AGI: 65425, Fed_Tax: 7078, State_Tax: 3053, Total_Tax: 10131, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 0, True_Spending: 111600 },
    { age: 70, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 964338, IRA_Withdraw: 64790, Roth_Balance: 516213, Roth_Withdraw: 38453, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 84017, Fed_AGI: 84017, Fed_Tax: 11239, State_Tax: 3024, Total_Tax: 14263, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 22620, True_Spending: 111600 },
    { age: 71, Cash_Withdraw: 0, Brokerage_Balance: -0, Brokerage_Withdraw: -0, IRA_Balance: 930115, IRA_Withdraw: 62791, Roth_Balance: 493994, Roth_Withdraw: 21574, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 101245, Fed_AGI: 101245, Fed_Tax: 15100, State_Tax: 2905, Total_Tax: 18005, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 72, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 896796, IRA_Withdraw: 61808, Roth_Balance: 488474, Roth_Withdraw: 22358, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 100262, Fed_AGI: 100262, Fed_Tax: 14953, State_Tax: 2853, Total_Tax: 17806, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 73, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 863361, IRA_Withdraw: 60835, Roth_Balance: 481955, Roth_Withdraw: 23134, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 99289, Fed_AGI: 99289, Fed_Tax: 14808, State_Tax: 2801, Total_Tax: 17609, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 74, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 829796, IRA_Withdraw: 59877, Roth_Balance: 474412, Roth_Withdraw: 23898, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 98331, Fed_AGI: 98331, Fed_Tax: 14666, State_Tax: 2750, Total_Tax: 17416, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 75, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: -0, IRA_Balance: 796081, IRA_Withdraw: 58923, Roth_Balance: 465822, Roth_Withdraw: 24660, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: -0, Ordinary_Income: 97377, Fed_AGI: 97377, Fed_Tax: 14524, State_Tax: 2699, Total_Tax: 17222, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 76, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 762208, IRA_Withdraw: 57971, Roth_Balance: 456153, Roth_Withdraw: 25418, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 96425, Fed_AGI: 96425, Fed_Tax: 14381, State_Tax: 2648, Total_Tax: 17029, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 77, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 728167, IRA_Withdraw: 57038, Roth_Balance: 445372, Roth_Withdraw: 26162, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 95492, Fed_AGI: 95492, Fed_Tax: 14242, State_Tax: 2598, Total_Tax: 16840, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 78, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 693934, IRA_Withdraw: 56108, Roth_Balance: 433454, Roth_Withdraw: 26904, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 94562, Fed_AGI: 94562, Fed_Tax: 14103, State_Tax: 2548, Total_Tax: 16652, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 79, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 659500, IRA_Withdraw: 55196, Roth_Balance: 420365, Roth_Withdraw: 27632, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 93650, Fed_AGI: 93650, Fed_Tax: 13968, State_Tax: 2500, Total_Tax: 16467, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 80, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 624839, IRA_Withdraw: 54287, Roth_Balance: 406079, Roth_Withdraw: 28357, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 92741, Fed_AGI: 92741, Fed_Tax: 13832, State_Tax: 2451, Total_Tax: 16283, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 81, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 589940, IRA_Withdraw: 53380, Roth_Balance: 390557, Roth_Withdraw: 29079, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 91834, Fed_AGI: 91834, Fed_Tax: 13696, State_Tax: 2403, Total_Tax: 16099, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 82, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 554793, IRA_Withdraw: 52492, Roth_Balance: 373761, Roth_Withdraw: 29788, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 90946, Fed_AGI: 90946, Fed_Tax: 13564, State_Tax: 2355, Total_Tax: 15919, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 83, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: -0, IRA_Balance: 519370, IRA_Withdraw: 51606, Roth_Balance: 355662, Roth_Withdraw: 30494, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: -0, Ordinary_Income: 90060, Fed_AGI: 90060, Fed_Tax: 13432, State_Tax: 2308, Total_Tax: 15740, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 84, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 483659, IRA_Withdraw: 50734, Roth_Balance: 336217, Roth_Withdraw: 31189, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 89188, Fed_AGI: 89188, Fed_Tax: 13302, State_Tax: 2262, Total_Tax: 15564, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 85, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 447636, IRA_Withdraw: 49866, Roth_Balance: 315392, Roth_Withdraw: 31882, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 88320, Fed_AGI: 88320, Fed_Tax: 13172, State_Tax: 2215, Total_Tax: 15387, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 86, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 411287, IRA_Withdraw: 49008, Roth_Balance: 293144, Roth_Withdraw: 32566, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 87462, Fed_AGI: 87462, Fed_Tax: 13044, State_Tax: 2169, Total_Tax: 15214, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 87, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 374589, IRA_Withdraw: 48159, Roth_Balance: 269433, Roth_Withdraw: 33243, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 86613, Fed_AGI: 86613, Fed_Tax: 12918, State_Tax: 2124, Total_Tax: 15042, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 88, Cash_Withdraw: 0, Brokerage_Balance: -0, Brokerage_Withdraw: -0, IRA_Balance: 337522, IRA_Withdraw: 54355, Roth_Balance: 244216, Roth_Withdraw: 29023, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: -0, Ordinary_Income: 92809, Fed_AGI: 92809, Fed_Tax: 14481, State_Tax: 2537, Total_Tax: 17018, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 89, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 292790, IRA_Withdraw: 46485, Roth_Balance: 222506, Roth_Withdraw: 34578, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 84939, Fed_AGI: 84939, Fed_Tax: 12668, State_Tax: 2035, Total_Tax: 14703, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 90, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 254674, IRA_Withdraw: 45661, Roth_Balance: 194314, Roth_Withdraw: 35235, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 84115, Fed_AGI: 84115, Fed_Tax: 12545, State_Tax: 1991, Total_Tax: 14536, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 91, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: -0, IRA_Balance: 216116, IRA_Withdraw: 47617, Roth_Balance: 164484, Roth_Withdraw: 33959, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: -0, Ordinary_Income: 86071, Fed_AGI: 86071, Fed_Tax: 13089, State_Tax: 2127, Total_Tax: 15216, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 92, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 174224, IRA_Withdraw: 45889, Roth_Balance: 134961, Roth_Withdraw: 35243, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 84343, Fed_AGI: 84343, Fed_Tax: 12748, State_Tax: 2024, Total_Tax: 14772, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 93, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: -0, IRA_Balance: 132695, IRA_Withdraw: 44164, Roth_Balance: 103106, Roth_Withdraw: 36524, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: -0, Ordinary_Income: 82618, Fed_AGI: 82618, Fed_Tax: 12406, State_Tax: 1922, Total_Tax: 14328, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 94, Cash_Withdraw: 0, Brokerage_Balance: 0, Brokerage_Withdraw: 0, IRA_Balance: 91540, IRA_Withdraw: 42441, Roth_Balance: 68845, Roth_Withdraw: 37803, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 80895, Fed_AGI: 80895, Fed_Tax: 12065, State_Tax: 1819, Total_Tax: 13884, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
    { age: 95, Cash_Withdraw: 0, Brokerage_Balance: -0, Brokerage_Withdraw: 0, IRA_Balance: 50767, IRA_Withdraw: 50767, Roth_Balance: 32097, Roth_Withdraw: 32097, IRA_to_Roth: 0, CGD_Spendable: 0, Capital_Gains_Distribution: 0, Total_Capital_Gains: 0, Ordinary_Income: 89221, Fed_AGI: 89221, Fed_Tax: 14134, State_Tax: 2369, Total_Tax: 16503, ACA_HC_Payment: 0, ACA_Help: 0, Social_Security: 45240, True_Spending: 111600 },
  ];
}
