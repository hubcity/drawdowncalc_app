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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    return formatCurrency(value / 1000000) + 'M';
  } else if (value >= 1000) {
    return formatCurrency(value / 1000) + 'K';
  } else {
    return formatCurrency(value);
  }
};


export default function Home() {
  const [drawdownPlan, setDrawdownPlan] = useState<DrawdownPlanYear[] | null>(null);
  const [loading, setLoading] = useState(false);
    const chartRef = useRef(null); // Ref for the chart container

    useEffect(() => {
        if (drawdownPlan && chartRef.current) {
            // Clear previous chart, if any
            d3.select(chartRef.current).select("svg").remove();

            const data = drawdownPlan;

            const margin = { top: 20, right: 30, bottom: 30, left: 60 };
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Define scales
            const x = d3.scaleBand()
                .domain(data.map(d => d.age.toString()))
                .range([0, width])
                .padding(0.1);
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => Math.max(d.bal_brokerage, d.bal_ira, d.bal_roth)) || 0])
                .nice()
                .range([height, 0]);

            // Create bars for Brokerage Balance
            svg.selectAll(".bar-brokerage")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar-brokerage")
                .style("fill", COLORS[0])
                .attr("x", d => x(d.age.toString()) || "0")
                .attr("y", d => y(d.bal_brokerage))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.bal_brokerage));

            // Create bars for IRA Balance
            svg.selectAll(".bar-ira")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar-ira")
                .style("fill", COLORS[1])
                .attr("x", d => x(d.age.toString()) || "0")
                .attr("y", d => y(d.bal_ira))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.bal_ira));

            // Create bars for Roth Balance
            svg.selectAll(".bar-roth")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar-roth")
                .style("fill", COLORS[2])
                .attr("x", d => x(d.age.toString()) || "0")
                .attr("y", d => y(d.bal_roth))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.bal_roth));

            // Add X axis
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Add Y axis
            svg.append("g")
                .call(d3.axisLeft(y).tickFormat(d3.formatPrefix(".1", 1e6)));

            // Add labels
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 5)
                .style("text-anchor", "middle")
                .text("Age");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Account Balance ($)");
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
          drawdownPlan && (
            <div className="flex flex-col gap-4 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Drawdown Plan Results</CardTitle>
                  <CardDescription>A summary of your drawdown plan.</CardDescription>
                </CardHeader>
                <CardContent>
                                        <div ref={chartRef}></div>

                  <Table>
                    <TableCaption>Drawdown Plan Details</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Age</TableHead>
                        <TableHead>Brokerage Balance</TableHead>
                        <TableHead>IRA Balance</TableHead>
                        <TableHead>Roth Balance</TableHead>
                        <TableHead>Social Security</TableHead>
                        <TableHead>Total Tax</TableHead>
                        <TableHead>Spend Goal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {drawdownPlan.map((year) => (
                        <TableRow key={year.age}>
                          <TableCell>{year.age}</TableCell>
                          <TableCell>{formatCurrency(year.bal_brokerage)}</TableCell>
                          <TableCell>{formatCurrency(year.bal_ira)}</TableCell>
                          <TableCell>{formatCurrency(year.bal_roth)}</TableCell>
                          <TableCell>{formatCurrency(year.social_security)}</TableCell>
                          <TableCell>{formatCurrency(year.total_tax)}</TableCell>
                          <TableCell>{formatCurrency(year.spend_goal)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button onClick={() => downloadCsv(drawdownPlan)}>Download CSV</Button>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
