import React from 'react';

export function FundamentalsContent() {
  return (
    <div className="text-left">
      <h2 className="text-xl font-semibold mb-3">Omissions</h2>
      <p className="mb-3">
        Let’s start by first talking about what DrawdownCalc doesn’t do.
      </p>
      <p className="mb-3">
        Here is a certainly incomplete list of current or future life situations not supported by DrawdownCalc (and thereby potentially making this website useless to you):
      </p>
      <ul className="list-disc list-inside mb-3 space-y-1">
        <li>A spouse with their own retirement accounts</li>
        <li>The future financial situation of a surviving spouse</li>
        <li>The complexities of taking social security as a couple</li>
        <li>Moving to a different state during retirement</li>
      </ul>
      <p className="mb-3">
        Here is an incomplete list of financial concepts or concerns that are ignored or unimplemented by DrawdownCalc:
      </p>
      <ul className="list-disc list-inside mb-3 space-y-1">
        <li>Medicaid</li>
        <li>HSA</li>
        <li>AMT</li>
        <li>Itemized deductions</li>
        <li>Capital loses</li>
        <li>IRMAA</li>
        <li>Medicare premiums</li>
        <li>ACA cost sharing subsidies (not the same thing as ACA premium subsidies)</li>
        <li>Additional income in retirement</li>
      </ul>
        <p></p>
      <h2 className="text-xl font-semibold mb-3">Calculation</h2>
      <p className="mb-3">
        DrawdownCalc turns the question of how to efficiently manage your money in your retirement accounts into a mixed-integer linear programming math problem. Doing that means that there are some limitations on what can be computed and additional limitations on what can be computed quickly. Here are some of the areas where DrawdownCalc makes compromises regarding what it computes:
      </p>

      <h3 className="text-base font-semibold mb-2">Capital Gains Taxes</h3>
      <p className="mb-3">
        How much tax is owed on the sale of stocks or mutual funds seems like a fairly straight-forward calculation. There are different ways to compute the taxes owed on a sale and all of them require the calculation of a cost basis. Many mutual funds use an average cost basis. That’s what DrawdownCalc would prefer to use (especially since other methods, like specific lot basis, would require collecting a lot more information from the user). Unfortunately, computing the average cost basis is not a calculation that fits into a linear programming model. As an alternative, DrawdownCalc calculates the cost basis as if the sale associated with a brokerage withdrawal is the first sale that has ever happened in that account. This will be inaccurate for every withdrawal except the first one. So it’s wrong, but it’s the least wrong calculation that DrawdownCalc has found.
      </p>

      <h3 className="text-base font-semibold mb-2">ACA Premium Subsidies</h3>
      <p className="mb-3">
        The IRS calculation of ACA premium subsidies is based on a sliding scale depending on the user’s AGI as a percentage of the Federal Poverty Level (FPL). Implementing such a sliding scale in an MiLP is not simple. DrawdownCalc has chosen to implement a stairstep type estimate that sometimes underestimates the subsidy available.  The current version of DrawdownCalc assumes that the subsidy rules in place in 2025 will continue to be in place in the future.
      </p>

      <h3 className="text-base font-semibold mb-2">Roth Withdrawal Rules</h3>
      <p className="mb-3">
        The IRS rules for withdrawals from Roth accounts are surprisingly complex. (If you don’t think so, try implementing them in software while requiring as little data from the user as possible). DrawdownCalc allows full access to Roth balances if the user is older than 59.5 and the account has been open for at least 5 years. Otherwise access is limited to those additions to the account that are at least 5 years old. These rules, while more strict than the IRS rules, were relatively simple to implement. The IRS also allows early withdrawals with penalties under certain circumstances. DrawdownCalc does not support those scenarios.
      </p>

      <h3 className="text-base font-semibold mb-2">Taxability of Social Security</h3>
      <p className="mb-3">
        DrawdownCalc assumes that 85% of all social security benefits are subject to tax. This will be inaccurate for users with a low AGI.
      </p>

      <h2 className="text-xl font-semibold mb-3">Resulting Plan</h2>
      <p className="mb-3">
        DrawdownCalc can work to produce a plan that maximizes your spending (not counting taxes and ACA premiums) in the first year of retirement such that the plan can continue to produce that same amount of available spending (taking inflation into account) for every year of retirement. Or if you choose, it can work to produce a plan to maximize your end-of-plan assets based on a set spending level.
      </p>
      <p className="mb-3">
        In the best case the resulting plan is within 99.99% of the optimal plan based on your form inputs, the assumptions about predictable inflation, investing return rates and other factors and the simplified model of the tax environment. If the solver hasn’t found a solution after 1.5 minutes, it will return the best answer that it has found. Most users will see a solution within that time. In rare cases the solver may fail and will be run again in search of a solution. If the solver can find a solution it should be returned within 5 minutes.
      </p>
    </div>
  );
}