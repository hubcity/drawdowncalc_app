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

const exampleData: DrawdownPlanYear[] = [
  { age: 55, bal_brokerage: 410000, wd_brokerage: 28488, cgd: 24379, bal_ira: 1246210, wd_ira: 0, bal_roth: 700000, wd_roth: 70447, ira_to_roth: 0, social_security: 24600, fed_tax: 0, state_tax: 1159, total_tax: 1159, spend_goal: 106776 },
  { age: 56, bal_brokerage: 381931, wd_brokerage: 35526, cgd: 22135, bal_ira: 1327214, wd_ira: 0, bal_roth: 670474, wd_roth: 57449, ira_to_roth: 0, social_security: 9888, fed_tax: 0, state_tax: 1194, total_tax: 1194, spend_goal: 109979 },
  { age: 57, bal_brokerage: 346787, wd_brokerage: 43666, cgd: 19369, bal_ira: 1413482, wd_ira: 0, bal_roth: 652872, wd_roth: 55072, ira_to_roth: 0, social_security: 10185, fed_tax: 0, state_tax: 1230, total_tax: 1230, spend_goal: 113279 },
  { age: 58, bal_brokerage: 303454, wd_brokerage: 53065, cgd: 16000, bal_ira: 1505359, wd_ira: 0, bal_roth: 636657, wd_roth: 52066, ira_to_roth: 0, social_security: 10490, fed_tax: 0, state_tax: 1266, total_tax: 1266, spend_goal: 116677 },
  { age: 59, bal_brokerage: 250665, wd_brokerage: 63897, cgd: 11934, bal_ira: 1603207, wd_ira: 0, bal_roth: 622589, wd_roth: 48338, ira_to_roth: 0, social_security: 10805, fed_tax: 0, state_tax: 1304, total_tax: 1304, spend_goal: 120177 },
  { age: 60, bal_brokerage: 186973, wd_brokerage: 34473, cgd: 9745, bal_ira: 1707416, wd_ira: 17389, bal_roth: 611578, wd_roth: 68286, ira_to_roth: 0, social_security: 11129, fed_tax: 0, state_tax: 1344, total_tax: 1344, spend_goal: 123783 },
  { age: 61, bal_brokerage: 152668, wd_brokerage: 41393, cgd: 7110, bal_ira: 1799878, wd_ira: 17911, bal_roth: 578607, wd_roth: 66996, ira_to_roth: 0, social_security: 11463, fed_tax: 0, state_tax: 1384, total_tax: 1384, spend_goal: 127496 },
  { age: 62, bal_brokerage: 111398, wd_brokerage: 49344, cgd: 3965, bal_ira: 1897795, wd_ira: 18448, bal_roth: 544865, wd_roth: 65223, ira_to_roth: 0, social_security: 11807, fed_tax: 0, state_tax: 1425, total_tax: 1425, spend_goal: 131321 },
  { age: 63, bal_brokerage: 62122, wd_brokerage: 58467, cgd: 234, bal_ira: 2001505, wd_ira: 19002, bal_roth: 510819, wd_roth: 62895, ira_to_roth: 0, social_security: 12161, fed_tax: 0, state_tax: 1468, total_tax: 1468, spend_goal: 135261 },
  { age: 64, bal_brokerage: 3658, wd_brokerage: 3658, cgd: 0, bal_ira: 2111366, wd_ira: 47335, bal_roth: 477039, wd_roth: 100453, ira_to_roth: 0, social_security: 12526, fed_tax: 3020, state_tax: 1512, total_tax: 4533, spend_goal: 139318 },
  { age: 65, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2198194, wd_ira: 138505, bal_roth: 401064, wd_roth: 40166, ira_to_roth: 0, social_security: 0, fed_tax: 19201, state_tax: 7909, total_tax: 27110, spend_goal: 143498 },
  { age: 66, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2193568, wd_ira: 163824, bal_roth: 384356, wd_roth: 26663, ira_to_roth: 0, social_security: 0, fed_tax: 24433, state_tax: 9945, total_tax: 34378, spend_goal: 147803 },
  { age: 67, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2161677, wd_ira: 168739, bal_roth: 380943, wd_roth: 27463, ira_to_roth: 0, social_security: 0, fed_tax: 25166, state_tax: 10244, total_tax: 35410, spend_goal: 152237 },
  { age: 68, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2122479, wd_ira: 173801, bal_roth: 376457, wd_roth: 28287, ira_to_roth: 0, social_security: 0, fed_tax: 25921, state_tax: 10551, total_tax: 36472, spend_goal: 156804 },
  { age: 69, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2075342, wd_ira: 124900, bal_roth: 370801, wd_roth: 13656, ira_to_roth: 0, social_security: 68430, fed_tax: 30134, state_tax: 6268, total_tax: 36402, spend_goal: 161508 },
  { age: 70, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2077221, wd_ira: 124957, bal_roth: 380359, wd_roth: 16557, ira_to_roth: 0, social_security: 70482, fed_tax: 30153, state_tax: 6142, total_tax: 36295, spend_goal: 166354 },
  { age: 71, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2079162, wd_ira: 124905, bal_roth: 387450, wd_roth: 19619, ira_to_roth: 0, social_security: 72597, fed_tax: 30145, state_tax: 6003, total_tax: 36148, spend_goal: 171344 },
  { age: 72, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2081283, wd_ira: 124737, bal_roth: 391740, wd_roth: 22850, ira_to_roth: 0, social_security: 74775, fed_tax: 30110, state_tax: 5851, total_tax: 35961, spend_goal: 176484 },
  { age: 73, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2083721, wd_ira: 127682, bal_roth: 392868, wd_roth: 24073, ira_to_roth: 0, social_security: 77018, fed_tax: 30822, state_tax: 5959, total_tax: 36780, spend_goal: 181779 },
  { age: 74, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2083181, wd_ira: 131513, bal_roth: 392766, wd_roth: 24796, ira_to_roth: 0, social_security: 79329, fed_tax: 31747, state_tax: 6137, total_tax: 37884, spend_goal: 187232 },
  { age: 75, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2078527, wd_ira: 135458, bal_roth: 391888, wd_roth: 25539, ira_to_roth: 0, social_security: 81708, fed_tax: 32699, state_tax: 6321, total_tax: 39020, spend_goal: 192849 },
  { age: 76, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2069368, wd_ira: 139522, bal_roth: 390161, wd_roth: 26306, ira_to_roth: 0, social_security: 84160, fed_tax: 33680, state_tax: 6511, total_tax: 40191, spend_goal: 198635 },
  { age: 77, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2055286, wd_ira: 143708, bal_roth: 387506, wd_roth: 27095, ira_to_roth: 0, social_security: 86685, fed_tax: 34690, state_tax: 6706, total_tax: 41397, spend_goal: 204594 },
  { age: 78, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2035830, wd_ira: 148019, bal_roth: 383838, wd_roth: 27908, ira_to_roth: 0, social_security: 89285, fed_tax: 35731, state_tax: 6908, total_tax: 42639, spend_goal: 210732 },
  { age: 79, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 2010519, wd_ira: 152460, bal_roth: 379066, wd_roth: 28745, ira_to_roth: 0, social_security: 91964, fed_tax: 36803, state_tax: 7115, total_tax: 43918, spend_goal: 217054 },
  { age: 80, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1978834, wd_ira: 157033, bal_roth: 373092, wd_roth: 29607, ira_to_roth: 0, social_security: 94723, fed_tax: 37907, state_tax: 7328, total_tax: 45235, spend_goal: 223565 },
  { age: 81, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1940217, wd_ira: 161744, bal_roth: 365811, wd_roth: 30495, ira_to_roth: 0, social_security: 97564, fed_tax: 39044, state_tax: 7548, total_tax: 46592, spend_goal: 230272 },
  { age: 82, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1894074, wd_ira: 166597, bal_roth: 357111, wd_roth: 31410, ira_to_roth: 0, social_security: 100491, fed_tax: 40216, state_tax: 7775, total_tax: 47990, spend_goal: 237180 },
  { age: 83, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1839763, wd_ira: 171595, bal_roth: 346871, wd_roth: 32353, ira_to_roth: 0, social_security: 103506, fed_tax: 41422, state_tax: 8008, total_tax: 49430, spend_goal: 244296 },
  { age: 84, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1776599, wd_ira: 176742, bal_roth: 334962, wd_roth: 33323, ira_to_roth: 0, social_security: 106611, fed_tax: 42665, state_tax: 8248, total_tax: 50913, spend_goal: 251625 },
  { age: 85, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1703848, wd_ira: 182045, bal_roth: 321246, wd_roth: 34323, ira_to_roth: 0, social_security: 109809, fed_tax: 43945, state_tax: 8495, total_tax: 52440, spend_goal: 259173 },
  { age: 86, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1620720, wd_ira: 187506, bal_roth: 305573, wd_roth: 35353, ira_to_roth: 0, social_security: 113104, fed_tax: 45263, state_tax: 8750, total_tax: 54013, spend_goal: 266949 },
  { age: 87, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1526373, wd_ira: 193131, bal_roth: 287784, wd_roth: 36413, ira_to_roth: 0, social_security: 116497, fed_tax: 46621, state_tax: 9013, total_tax: 55634, spend_goal: 274957 },
  { age: 88, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1419902, wd_ira: 198925, bal_roth: 267710, wd_roth: 37506, ira_to_roth: 0, social_security: 119992, fed_tax: 48019, state_tax: 9283, total_tax: 57303, spend_goal: 283206 },
  { age: 89, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1300341, wd_ira: 204893, bal_roth: 245168, wd_roth: 38631, ira_to_roth: 0, social_security: 123591, fed_tax: 49460, state_tax: 9562, total_tax: 59022, spend_goal: 291702 },
  { age: 90, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1166652, wd_ira: 211040, bal_roth: 219962, wd_roth: 39790, ira_to_roth: 0, social_security: 127299, fed_tax: 50944, state_tax: 9849, total_tax: 60792, spend_goal: 300453 },
  { age: 91, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 1017727, wd_ira: 217371, bal_roth: 191884, wd_roth: 40983, ira_to_roth: 0, social_security: 131118, fed_tax: 52472, state_tax: 10144, total_tax: 62616, spend_goal: 309467 },
  { age: 92, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 852380, wd_ira: 223892, bal_roth: 160709, wd_roth: 42213, ira_to_roth: 0, social_security: 135052, fed_tax: 54046, state_tax: 10448, total_tax: 64495, spend_goal: 318751 },
  { age: 93, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 669339, wd_ira: 230609, bal_roth: 126198, wd_roth: 43479, ira_to_roth: 0, social_security: 139103, fed_tax: 55668, state_tax: 10762, total_tax: 66429, spend_goal: 328313 },
  { age: 94, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 467248, wd_ira: 237527, bal_roth: 88096, wd_roth: 44784, ira_to_roth: 0, social_security: 143276, fed_tax: 57338, state_tax: 11085, total_tax: 68422, spend_goal: 338162 },
  { age: 95, bal_brokerage: 0, wd_brokerage: 0, cgd: 0, bal_ira: 244653, wd_ira: 244653, bal_roth: 46127, wd_roth: 46127, ira_to_roth: 0, social_security: 147575, fed_tax: 59058, state_tax: 11417, total_tax: 70475, spend_goal: 348307 }
];

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
                .domain([0, d3.max(data, d => d.bal_brokerage + d.bal_ira + d.bal_roth) || 0])
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
                .attr("y", d => y(d.bal_brokerage + d.bal_ira))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.bal_ira));

            // Create bars for Roth Balance
            svg.selectAll(".bar-roth")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar-roth")
                .style("fill", COLORS[2])
                .attr("x", d => x(d.age.toString()) || "0")
                .attr("y", d => y(d.bal_brokerage + d.bal_ira + d.bal_roth))
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
          drawdownPlan ? (
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
          ) : (
                        <div className="flex flex-col gap-4 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Example Drawdown Plan Results</CardTitle>
                  <CardDescription>An example summary of a drawdown plan.</CardDescription>
                </CardHeader>
                <CardContent>
                                        <div ref={chartRef}></div>

                  <Table>
                    <TableCaption>Example Drawdown Plan Details</TableCaption>
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
                      {exampleData.map((year) => (
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
                  <Button onClick={() => downloadCsv(exampleData)}>Download CSV</Button>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}




