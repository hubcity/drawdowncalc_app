"use client";

import { useState } from 'react';
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
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

export default function Home() {
  const [drawdownPlan, setDrawdownPlan] = useState<DrawdownPlanYear[] | null>(null);
  const [loading, setLoading] = useState(false);

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
              <SidebarMenuButton>
                <span>Settings</span>
              </SidebarMenuButton>
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
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={drawdownPlan}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bal_brokerage" name="Brokerage Balance" fill={COLORS[0]} />
                      <Bar dataKey="bal_ira" name="IRA Balance" fill={COLORS[1]} />
                      <Bar dataKey="bal_roth" name="Roth Balance" fill={COLORS[2]} />
                    </BarChart>
                  </ResponsiveContainer>
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
                          <TableCell>{year.bal_brokerage}</TableCell>
                          <TableCell>{year.bal_ira}</TableCell>
                          <TableCell>{year.bal_roth}</TableCell>
                          <TableCell>{year.social_security}</TableCell>
                          <TableCell>{year.total_tax}</TableCell>
                          <TableCell>{year.spend_goal}</TableCell>
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

