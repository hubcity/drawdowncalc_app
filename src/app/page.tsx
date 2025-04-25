"use client";

import { useState, useEffect, useRef } from 'react';
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
} from "@/components/ui/sidebar";
import { DrawdownPlanForm } from "@/components/drawdown-plan-form";
import { calculateDrawdownPlan, DrawdownPlanInput, DrawdownPlanYear } from "@/services/drawdown-plan";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import * as d3 from "d3";
import { exampleData } from "@/lib/example-data";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#800080'];
const COLORS_SPENDING = ['#a8e6cf', '#dcedc1', '#ffd3b6'];

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

const formatYAxis = (value: number) => {
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


export default function Home() {
  const [drawdownPlan, setDrawdownPlan] = useState<DrawdownPlanYear[] | null>(null);
  const [loading, setLoading] = useState(false);
    const chartRef = useRef(null); // Ref for the account balance chart container
    const incomeChartRef = useRef(null);
    const spendingChartRef = useRef(null);

    useEffect(() => {
        if (drawdownPlan && chartRef.current && incomeChartRef.current && spendingChartRef.current) {
            // Clear previous charts
            d3.select(chartRef.current).select("svg").remove();
            d3.select(incomeChartRef.current).select("svg").remove();
            d3.select(spendingChartRef.current).select("svg").remove();

            const data = drawdownPlan;

            const margin = { top: 20, right: 30, bottom: 30, left: 60 };
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // Function to create the stacked bar chart
            const createStackedBarChart = (ref, yMax, yLabel, dataKeys, colors, yFormat = d3.formatPrefix(".1", 1e3)) => {
                const svg = d3.select(ref)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
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
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth());

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

                dataKeys.forEach((key, i) => {
                    const legendItem = legend.append("g")
                        .attr("transform", `translate(0, ${i * 20})`);

                    legendItem.append("rect")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("width", 15)
                        .attr("height", 15)
                        .attr("fill", colors[i]);

                    legendItem.append("text")
                        .attr("x", 20)
                        .attr("y", 12)
                        .text(key)
                        .style("font-size", "12px");
                });
            };

            // Income Sources Chart
            const incomeSourcesYMax = d3.max(data, d => d.wd_brokerage + d.wd_ira + d.wd_roth + d.social_security + d.cgd) || 0;
            createStackedBarChart(
                incomeChartRef.current,
                incomeSourcesYMax,
                "Income Sources ($)",
                ["wd_brokerage", "wd_ira", "wd_roth", "social_security", "cgd"],
                COLORS
            );

            // Spending Categories Chart
            const spendingCategoriesYMax = d3.max(data, d => d.spend_goal + d.fed_tax + d.state_tax) || 0;
            createStackedBarChart(
                spendingChartRef.current,
                spendingCategoriesYMax,
                "Spending Categories ($)",
                ["spend_goal", "fed_tax", "state_tax"],
                COLORS_SPENDING,
                d3.formatPrefix(".1", 1e3)
            );

            // Account Balances Chart
            const accountBalanceYMax = d3.max(data, d => d.bal_brokerage + d.bal_ira + d.bal_roth) || 0;
            createStackedBarChart(
                chartRef.current,
                accountBalanceYMax,
                "Account Balance ($)",
                ["bal_brokerage", "bal_ira", "bal_roth"],
                COLORS,
                formatYAxis
            );

        }
  }, [drawdownPlan]);


  const handleSubmit = async (input: DrawdownPlanInput) => {
    setLoading(true);
    try {
      // Simulate a 3-second delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const plan = await calculateDrawdownPlan(input);
      setDrawdownPlan(plan);
    } catch (error) {
      console.error("Failed to calculate drawdown plan:", error);
      // Optionally set an error state to display to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-bold">RetirePath</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <span>Settings</span>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator />
          <DrawdownPlanForm onSubmit={handleSubmit} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} My Company
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            Calculating Drawdown Plan...
          </div>
        ) : (
          drawdownPlan ? (
            <div className="flex flex-col gap-4 p-4">
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
                            <TableCell className="w-32 text-center">{formatCurrency(year.wd_brokerage)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.wd_ira)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.wd_roth)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.ira_to_roth)}</TableCell>
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
              <div className="mt-8" ref={incomeChartRef}></div>
                    
                    <div className="mt-8" ref={spendingChartRef}></div>
              <div className="mt-8" ref={chartRef}></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Example Drawdown Plan Results</CardTitle>
                  <CardDescription>An example summary of a drawdown plan.</CardDescription>
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
                        {exampleData.map((year) => (
                          <TableRow key={year.age}>
                            <TableCell className="w-24 text-center">{year.age}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.wd_brokerage)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.wd_ira)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.wd_roth)}</TableCell>
                            <TableCell className="w-32 text-center">{formatCurrency(year.ira_to_roth)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-8">
                    <Button onClick={() => downloadCsv(exampleData)}>Download CSV</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}


