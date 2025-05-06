"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
  useSidebar, // Import useSidebar
} from "@/components/ui/sidebar";
import { DrawdownPlanForm } from "@/components/drawdown-plan-form";
import { calculateDrawdownPlan, DrawdownPlanInput, DrawdownPlanYear } from "@/services/drawdown-plan";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Loader2 } from "lucide-react";
import * as d3 from "d3";


// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#800080'];
const COLORS_SPENDING = ['#4E8BAF', '#76C0C0', '#8FBC8F', '#A9A9A9', '#5F9EA0', '#696969'];
//const COLORS_SPENDING = ['#85BB65', '#A9A9A9', '#D3D3D3'];
const COLORS = ['#D98B5F', '#E0B550', '#8F8F4C', '#708090', '#B38CB4', '#9370DB'];
const COLORS_OTHER = ['#191970', '#006400', '#8B0000', '#483D8B', '#B8860B', '#595959'];

function toCsv(data: DrawdownPlanYear[] | null): string {
  if (!data || data.length === 0) {
    return '';
  }

  const header = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  return `${header}\n${rows.join('\n')}`;
}

function downloadCsv(data: DrawdownPlanYear[] | null) {
  const csvData = toCsv(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'drawdown_plan.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Utility function to format numbers as currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
  }).format(value / 100);
};

const formatYAxis = (val: number | { valueOf(): number; }) => {
  const value = typeof val === 'number' ? val : val.valueOf();
  if (value >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value / 1000000) + 'M';
  } else if (value >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value / 1000) + 'K';
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  }
};

// --- New AppContent Component ---
function AppContent() {
  const [drawdownPlan, setDrawdownPlan] = useState<DrawdownPlanYear[] | null>(null);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const withdrawChartRef = useRef(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const incomeChartRef = useRef<HTMLDivElement>(null);
  const spendingChartRef = useRef<HTMLDivElement>(null);
  const incomeTypeChartRef = useRef<HTMLDivElement>(null); // <-- Add ref for the new chart
  const rothConversionChartRef = useRef<HTMLDivElement>(null); // <-- Ref for Roth Conversion chart
  const automaticIncomeChartRef = useRef<HTMLDivElement>(null); // Ref for the new automatic income chart
  const pageRef = useRef(null);

  const { setOpen, toggleSidebar } = useSidebar(); // Call useSidebar here

  useEffect(() => {
    if (drawdownPlan && chartRef.current && incomeChartRef.current
      && spendingChartRef.current && incomeTypeChartRef.current
      && rothConversionChartRef.current && automaticIncomeChartRef.current) {
      // Clear previous charts
      d3.select(chartRef.current).select("svg").remove();
      d3.select(incomeChartRef.current).select("svg").remove();
      d3.select(spendingChartRef.current).select("svg").remove();
      d3.select(incomeTypeChartRef.current).select("svg").remove(); // <-- Clear the new chart too
      d3.select(rothConversionChartRef.current).select("svg").remove(); // <-- Clear Roth Conversion chart
      d3.select(automaticIncomeChartRef.current).select("svg").remove(); // <-- Clear)
      const data = drawdownPlan;
      const margin = { top: 20, right: 30, bottom: 30, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // --- Tooltip Setup ---
      // Select the tooltip div (we'll add this div in the JSX later)
      const tooltip = d3.select("#chart-tooltip");

      // Function to format keys for display
      const formatKey = (key: string) => {
        return key.replace(/_/g, ' '); // Replace underscores with spaces
      };

      // Function to create the stacked bar chart
      const createStackedBarChart = (ref: React.RefObject<HTMLDivElement> | null, yMax: number, yLabel: string, dataKeys: string[], colors: string[], yFormat = d3.formatPrefix(".1", 1e3)) => {
        const svg = d3.select(ref?.current) // Use ref.current here
          .append("svg")
          .attr("width", '100%')
          .attr("height", height + margin.top + margin.bottom)
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
          .domain(data.map(d => d.age.toString()))
          .range([0, width])
          .padding(0.1);

        const y = d3.scaleLinear()
          .domain([0, yMax])
          .nice()
          .range([height, 0]);

        const stack = d3.stack()
          .keys(dataKeys);

        const stackedData = stack(data);

        svg.selectAll(".series")
          .data(stackedData)
          .enter().append("g")
          .attr("class", "series")
          .style("fill", (d, i) => colors[i])
          .selectAll("rect")
          .data(d => d)
          .enter().append("rect")
          .attr("x", d => x(d.data.age.toString()) || "0")
          .attr("y", d => y(d[1])) // Use the top value of the segment
          .attr("height", d => Math.max(0, y(d[0]) - y(d[1]))) // Ensure height is not negative
          .attr("width", x.bandwidth())
          .on("mouseover", function(event, d) { // `function` syntax to access `this` if needed, or arrow for lexical scope
            // console.log("Mouseover fired!", { event, d }); // <-- Add console log
            tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
            const segmentValue = d[1] - d[0];
            // Find the key corresponding to this segment
            // The `d` object in the stack layout doesn't directly contain the key easily.
            // We need to find which key's stack produced this segment.
            // A slightly roundabout way: find the index of the series this rect belongs to.
            const seriesIndex = stackedData.findIndex(series => series.some(segment => segment === d));
            const segmentKey = dataKeys[seriesIndex] || "Unknown";
            // console.log("Tooltip Data:", { age: d.data.age, key: segmentKey, value: segmentValue }); // <-- Log tooltip content

            tooltip.html(`<strong>Age:</strong> ${d.data.age}<br/><strong>${formatKey(segmentKey)}:</strong> ${formatCurrency(segmentValue)}`)
                   .style("left", (event.pageX + 15) + "px") // Position tooltip near cursor
                   .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
            // console.log("Mouseout fired!"); // <-- Add console log
            tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x).tickSize(0).tickPadding(10));

        svg.append("g")
          .call(d3.axisLeft(y).tickFormat(yFormat));

        svg.append("text")
          .attr("x", width / 2)
          .attr("y", height + margin.bottom - 5)
          .style("text-anchor", "middle")
          .text("");

        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(yLabel);

        const legend = svg.append("g")
          .attr("class", "legend")
          .attr("transform", `translate(${width - 100}, -10)`);

      };

      // Income Sources Chart
      const incomeSourcesYMax = d3.max(data, d => d.Brokerage_Withdraw + d.IRA_Withdraw + d.Roth_Withdraw + d.Social_Security + d.CGD_Spendable + d.Cash_Withdraw) || 0;
      createStackedBarChart(
        incomeChartRef, // Pass ref object
        incomeSourcesYMax,
        "Income Sources",
        ["Brokerage_Withdraw", "IRA_Withdraw", "Roth_Withdraw", "Social_Security", "CGD_Spendable", "Cash_Withdraw"],
        COLORS
      );

      // Spending Categories Chart
      const spendingCategoriesYMax = d3.max(data, d => d.Fed_Tax + d.State_Tax + d.ACA_HC_Payment) || 0;
      createStackedBarChart(
        spendingChartRef, // Pass ref object
        spendingCategoriesYMax,
        "Mandatory Expenses",
        ["Fed_Tax", "State_Tax", "ACA_HC_Payment"],
        COLORS_SPENDING,
        d3.formatPrefix(".1", 1e3)
      );

      // Account Balances Chart
      const accountBalanceYMax = d3.max(data, d => d.Brokerage_Balance + d.IRA_Balance + d.Roth_Balance) || 0;
      createStackedBarChart(
        chartRef, // Pass ref object
        accountBalanceYMax,
        "Account Balance",
        ["Brokerage_Balance", "IRA_Balance", "Roth_Balance"],
        COLORS,
        formatYAxis
      );

      // Income Type Chart (Ordinary vs Capital Gains)
      const incomeTypeYMax = d3.max(data, d => d.Ordinary_Income + d.Total_Capital_Gains) || 0;
      createStackedBarChart(
        incomeTypeChartRef, // Pass ref object
        incomeTypeYMax,
        "AGI",
        ["Ordinary_Income", "Total_Capital_Gains"], // <-- Keys for the new chart
        COLORS_OTHER // <-- Example colors, adjust as needed
      );

      // Automatic Income Chart
      // Assuming RMDs are part of IRA_Withdraw for ages >= RMD age, and CGD_Spendable is separate.
      // If RMD is a separate field in DrawdownPlanYear, use that.
      // For now, let's assume 'IRA_Withdraw' for RMDs (this might need adjustment based on your data structure)
      // and 'Ordinary_Income' for other non-SS, non-CGD income.
      const automaticIncomeYMax = d3.max(data, d => (d.Required_RMD + d.Social_Security + d.CGD_Spendable + d.Cash_Withdraw)) || 0;
      createStackedBarChart(
        automaticIncomeChartRef,
        automaticIncomeYMax,
        "Automatic Income",
        ["Required_RMD", "Social_Security", "CGD_Spendable", "Cash_Withdraw"], // Adjust IRA_Withdraw if RMD is separate
        [COLORS[1], COLORS[3], COLORS[4], COLORS[5]] // Example colors
      );

      // Roth Conversion Chart
      const rothConversionYMax = d3.max(data, d => d.IRA_to_Roth) || 0;
      createStackedBarChart(
        rothConversionChartRef, // Pass ref object
        rothConversionYMax,
        "Roth Conversions",
        ["IRA_to_Roth"], // Data key
        [COLORS_OTHER[5]] // Example color (purple)
      );
    }
  }, [drawdownPlan]);

  const handleSubmit = async (input: DrawdownPlanInput) => {
    console.log(input);
    const apiPayload = {
      arguments: {
        pessimistic_taxes: input.pessimistic.taxes,
        pessimistic_healthcare: input.pessimistic.healthcare,
        objective: {
          type: input.spending_preference,
          value: input.annual_spending,
        }
      },
      startage: input.about.age,
      birthmonth: Number(input.about.birth_month),
      endage: input.about.end_of_plan_age,
      inflation: input.predictions.inflation,
      returns: input.predictions.returns,
      taxes: {
        filing_status: input.about.filing_status,
        state: input.about.state_of_residence,
      },
      income: {
        social_security: {
          amount: input.social_security.amount * 12.0,
          age: input.social_security.starts === -1 ? `${input.about.age - 1}-` : `${input.social_security.starts}-`
        },
        cash: { amount: input.cash.amount, age: `${input.about.age}`, tax: false } // Assuming cash is for startAge and not taxable by default
      },
      aca: { premium: input.ACA.premium, slcsp: input.ACA.slcsp },
      aftertax: {
        bal: input.brokerage.balance,
        basis: input.brokerage.basis,
        distributions: input.brokerage.distributions
      },
      IRA: { bal: input.IRA.balance },
      roth: {
        bal: input.Roth.balance, // Assuming input.Roth.balance is a number
        contributions: [
          // Older conversions (age at conversion would be current age - 5 or more)
          // We'll use current age - 5 as a representative age for "older"
          ...(input.Roth.old_conversions > 0 ? [[input.about.age - 5, input.Roth.old_conversions]] : []),
          // Recent conversions, mapping year offset to age at conversion
          ...(input.Roth.conversion_year_minus_4 > 0 ? [[input.about.age - 4, input.Roth.conversion_year_minus_4]] : []),
          ...(input.Roth.conversion_year_minus_3 > 0 ? [[input.about.age - 3, input.Roth.conversion_year_minus_3]] : []),
          ...(input.Roth.conversion_year_minus_2 > 0 ? [[input.about.age - 2, input.Roth.conversion_year_minus_2]] : []),
          ...(input.Roth.conversion_year_minus_1 > 0 ? [[input.about.age - 1, input.Roth.conversion_year_minus_1]] : []),
        ].sort((a, b) => a[0] - b[0]) // Sort by age at conversion, ascending
        // contributions: input.rothContributions.map(c => [parseInt(c.age), parseInt(c.amount)])
      }
    };

    console.log("Submitting payload:", apiPayload); // For debugging
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setLoading(true);
    try {
      // The 'input' to calculateDrawdownPlan should now be the apiPayload
      const plan = await calculateDrawdownPlan(apiPayload as any); // Using 'as any' for now, ideally update DrawdownPlanInput type
      setDrawdownPlan(plan);
      setSubmitted(true);
      setIsFormEdited(false); // Reset isFormEdited to false on successful submission
    } catch (error) {
      console.error("Failed to calculate drawdown plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
    // setShowFieldDescriptions(true); // Show field descriptions
    setOpen(true); // Use setOpen from the hook
  };

  return (
    <> {/* Use Fragment to return multiple elements */}
      {/* --- Tooltip Div --- */}
      <div id="chart-tooltip" style={{
        position: 'absolute', opacity: 0, pointerEvents: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px', borderRadius: '3px',
        fontSize: '12px', whiteSpace: 'nowrap',
        zIndex: 9999 // Add a high z-index
      }}></div>
      <Sidebar collapsible="icon"> {/* defaultOpen controls initial state */}
        <div className="p-2"> {/* Add padding if needed */}
            {(
              <SidebarTrigger />  
            )}
        </div>
        <div className={cn("pt-0 px-4 overflow-y-auto", {
             "pointer-events-none opacity-50": !hasAcceptedTerms,
            "group-data-[state=collapsed]:overflow-y-hidden": true,
        })}>
            <SidebarContent>
            <DrawdownPlanForm
              onSubmit={handleSubmit}
              onFormEdit={() => setIsFormEdited(true)} // Pass the callback
            />
          </SidebarContent>
        </div>
        <SidebarFooter>
          <SidebarSeparator />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {!hasAcceptedTerms ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center gap-4">
            <p>This website is not a substitute for professional advice.
              All financial decisions should be made in consultation with a qualified advisor who understands your specific
              circumstances.
            </p>
            <Button onClick={handleAcceptTerms}>I Understand</Button>
            {/* Removed Toggle Button from here */}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            Calculating Drawdown Plan...
          </div>
        ) : (
          !submitted ? (
            <div className="flex flex-col items-start justify-start h-full p-4 gap-4 overflow-y-auto">
            <h2>Form Field Descriptions:</h2>
            <p><b>Age:</b> Your current age.</p>
            <p><b>Birth Month:</b> Your birth month.</p>
            <p><b>End of Plan Age:</b> The age to which the drawdown plan should project.</p>
            <p><b>Tax Filing Status:</b> Your tax filing status (Single or Married Filing Jointly).</p>
            <p><b>State of Residence:</b> The state where you currently reside.</p>
            <p><b>Inflation Rate:</b> The assumed annual inflation rate, expressed as a percentage.</p>
            <p><b>Rate of Return:</b> The assumed annual investment rate of return, expressed as a percentage.</p>
            <p><b>Brokerage Balance:</b> The current balance of your taxable brokerage account.</p>
            <p><b>Brokerage Basis:</b> The cost basis of the assets in your brokerage account.</p>
            <p><b>Brokerage Distributions:</b>The percentage of the account that will be returned to the user in the form of capital gains and dividends each year.</p>
            <p><b>IRA Balance:</b> The current balance of your Traditional IRA account.</p>
            <p><b>Roth Balance:</b> The current balance of your Roth IRA account.</p>
            <p><b>Recent Additions:</b> Roth conversions made in recent years.</p>
            <p><b>Older Additions:</b> The amount of Roth Conversions made more than 5 years ago.  This should only include conversions, not normal contributions.</p>
            <p><b>Social Security Starts:</b> The age at which you expect to begin receiving Social Security benefits.</p>
            <p><b>Social Security Amount:</b> The estimated annual amount you expect to receive from Social Security.</p>
            <p><b>Full ACA Premium:</b> The full premium amount for an ACA (Affordable Care Act) health insurance plan.</p>
            <p><b>SLCSP Premium:</b> The premium amount for the Second Lowest Cost Silver Plan (SLCSP) ACA health insurance plan.</p>
            <p><b>Goal:</b>Choose between maximizing your spending or maximizing your end-of-plan assets.</p>
            <p><b>Living Expenses:</b> Estimated annual spending/living expenses.</p>
          </div>
          ) : drawdownPlan ? (
            <div ref={pageRef} className="flex flex-col gap-4 p-4">
              {drawdownPlan && isFormEdited && (
                <div className="p-4 bg-yellow-100 text-yellow-800 rounded fixed z-50">
                  <strong>Warning:</strong> The results no longer match the current form inputs. Please recalculate to update the results.
                </div>
              )}
              <Card>
                <CardHeader>
                  <CardTitle>Drawdown Plan Results</CardTitle>
                  <CardDescription>A summary of your drawdown plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24 text-center">Age</TableHead>
                        <TableHead className="w-32 text-center">From Brokerage</TableHead>
                        <TableHead className="w-32 text-center">From IRA</TableHead>
                        <TableHead className="w-32 text-center">From Roth</TableHead>
                        <TableHead className="w-32 text-center">Roth Conversion</TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                  <div className="overflow-auto max-h-40">
                    <Table>
                      <TableBody>
                        {drawdownPlan.map((year) => (
                          <TableRow key={year.age}>
                            <TableCell className="w-24 text-center">{year.age}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.Brokerage_Withdraw)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.IRA_Withdraw)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.Roth_Withdraw)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.IRA_to_Roth)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-8">
                    <Button onClick={() => downloadCsv(drawdownPlan)}>Download CSV</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8" ref={chartRef}></div>
              <div className="mt-8" ref={incomeChartRef}></div>
              <div className="mt-8" ref={spendingChartRef}></div>
              <div className="mt-8" ref={automaticIncomeChartRef}></div> {/* Add container for the new chart */}
              <div className="mt-8" ref={rothConversionChartRef}></div> {/* <-- Add container for Roth Conversion chart */}
              <div className="mt-8" ref={incomeTypeChartRef}></div> {/* <-- Add container for the new chart */}
             </div>
          ) : (
             // Show example data if submitted is false and no drawdown plan exists (initial state after accept)
             // Or potentially keep the limitations text until the form is submitted?
             // Let's keep the limitations text until submission for clarity
             // <div className="flex items-center justify-center h-full p-4 text-center">
          <div className="flex flex-col items-start justify-start h-full p-4 gap-4 overflow-y-auto">
            <h2>When is ths page shown?</h2>
          </div>
          )
        )}
      </SidebarInset>
    </>
  );
}

// --- Original Home Component ---
export default function Home() {
  return (
    // SidebarProvider wraps the AppContent component
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
}
