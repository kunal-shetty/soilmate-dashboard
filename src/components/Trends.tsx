"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import * as Recharts from "recharts";
import { Droplet, Leaf, Zap, Thermometer, TrendingUp, Beaker, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- sample data ---------- */
const moistureData = [
  { time: "2025-08-20", moisture: 32 },
  { time: "2025-08-21", moisture: 35 },
  { time: "2025-08-22", moisture: 29 },
  { time: "2025-08-23", moisture: 40 },
  { time: "2025-08-24", moisture: 37 },
  { time: "2025-08-25", moisture: 33 },
  { time: "2025-08-26", moisture: 36 },
];

const fertilityData = [
  { time: "2025-08-20", fertility: 58 },
  { time: "2025-08-21", fertility: 60 },
  { time: "2025-08-22", fertility: 55 },
  { time: "2025-08-23", fertility: 65 },
  { time: "2025-08-24", fertility: 62 },
  { time: "2025-08-25", fertility: 61 },
  { time: "2025-08-26", fertility: 64 },
];

const sensorsData = [
  { region: "North", sensors: 12 },
  { region: "South", sensors: 7 },
  { region: "East", sensors: 9 },
  { region: "West", sensors: 5 },
];

const temperatureData = [
  { day: "Mon", temp: 28 },
  { day: "Tue", temp: 30 },
  { day: "Wed", temp: 27 },
  { day: "Thu", temp: 31 },
  { day: "Fri", temp: 29 },
  { day: "Sat", temp: 33 },
  { day: "Sun", temp: 32 },
];

const yieldData = [
  { month: "Jan", yield: 120 },
  { month: "Feb", yield: 135 },
  { month: "Mar", yield: 150 },
  { month: "Apr", yield: 160 },
  { month: "May", yield: 170 },
  { month: "Jun", yield: 165 },
  { month: "Jul", yield: 180 },
];

const phData = [
  { sample: "Sample 1", pH: 6.5 },
  { sample: "Sample 2", pH: 6.8 },
  { sample: "Sample 3", pH: 7.1 },
  { sample: "Sample 4", pH: 6.2 },
  { sample: "Sample 5", pH: 7.4 },
  { sample: "Sample 6", pH: 6.9 },
];

/* ---------- chart config ---------- */
const chartConfig = {
  moisture: { label: "Soil Moisture", color: "#38bdf8" },
  fertility: { label: "Fertility Index", color: "#34d399" },
  sensors: { label: "Active Sensors", color: "#f59e0b" },
  temperature: { label: "Temperature (°C)", color: "#ef4444" },
  yield: { label: "Yield Prediction", color: "#6366f1" },
  ph: { label: "Soil pH", color: "#8b5cf6" },
} as const;

/* ---------- CardShell wrapper ---------- */
function CardShell({ title, subtitle, children, icon }: { title: string; subtitle?: string; children: React.ReactNode; icon?: React.ReactNode; }) {
  return (
    <Card className="overflow-hidden shadow-card transition-smooth hover:shadow-glow">
      <CardHeader className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
        <Badge variant="secondary" className="bg-muted/60 text-muted-foreground">Live</Badge>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}

/* ---------- Trends Page ---------- */
export function TrendsPage() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trends & Insights</h1>
          <p className="text-muted-foreground">
            A complete overview of your farm’s soil, climate, and sensor data.
          </p>
        </div>
        <a href="/files/sample.pdf" download>
  <Button className="flex items-center gap-2">
    <FileDown npclassName="h-4 w-4" /> Download Report
  </Button>
</a>
      </div>

      {/* KPI cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplet className="h-5 w-5 text-sky-400" /> Avg Moisture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34%</div>
            <p className="text-sm text-muted-foreground">Stable over 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-400" /> Avg Fertility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61</div>
            <p className="text-sm text-muted-foreground">Slightly improving</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" /> Active Sensors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <p className="text-sm text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Existing charts */}
        <CardShell title="Soil Moisture" subtitle="Last 7 days" icon={<Droplet className="h-5 w-5 text-sky-400" />}>
          <ChartContainer config={chartConfig} id="moisture-chart" className="h-56">
            <Recharts.LineChart data={moistureData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="time" />
              <Recharts.YAxis />
              <Recharts.Tooltip content={<ChartTooltipContent />} />
              <Recharts.Legend content={<ChartLegendContent />} />
              <Recharts.Line dataKey="moisture" stroke={chartConfig.moisture.color} strokeWidth={2} dot />
            </Recharts.LineChart>
          </ChartContainer>
        </CardShell>

        <CardShell title="Fertility Index" subtitle="AI-driven score" icon={<Leaf className="h-5 w-5 text-green-400" />}>
          <ChartContainer config={chartConfig} id="fertility-chart" className="h-56">
            <Recharts.AreaChart data={fertilityData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="time" />
              <Recharts.YAxis />
              <Recharts.Tooltip content={<ChartTooltipContent />} />
              <Recharts.Legend content={<ChartLegendContent />} />
              <Recharts.Area dataKey="fertility" stroke={chartConfig.fertility.color} fill={chartConfig.fertility.color} fillOpacity={0.15} />
            </Recharts.AreaChart>
          </ChartContainer>
        </CardShell>

        <CardShell title="Active Sensors" subtitle="By region" icon={<Zap className="h-5 w-5 text-amber-500" />}>
          <ChartContainer config={chartConfig} id="sensors-chart" className="h-56">
            <Recharts.BarChart data={sensorsData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="region" />
              <Recharts.YAxis />
              <Recharts.Tooltip content={<ChartTooltipContent />} />
              <Recharts.Legend content={<ChartLegendContent />} />
              <Recharts.Bar dataKey="sensors" fill={chartConfig.sensors.color} radius={[6, 6, 0, 0]} />
            </Recharts.BarChart>
          </ChartContainer>
        </CardShell>

        {/* New charts */}
        <CardShell title="Temperature Trend" subtitle="Last week" icon={<Thermometer className="h-5 w-5 text-red-400" />}>
          <ChartContainer config={chartConfig} id="temperature-chart" className="h-56">
            <Recharts.LineChart data={temperatureData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="day" />
              <Recharts.YAxis />
              <Recharts.Tooltip content={<ChartTooltipContent />} />
              <Recharts.Legend content={<ChartLegendContent />} />
              <Recharts.Line dataKey="temp" stroke={chartConfig.temperature.color} strokeWidth={2} dot />
            </Recharts.LineChart>
          </ChartContainer>
        </CardShell>

        <CardShell title="Yield Prediction" subtitle="Next 6 months" icon={<TrendingUp className="h-5 w-5 text-indigo-400" />}>
          <ChartContainer config={chartConfig} id="yield-chart" className="h-56">
            <Recharts.AreaChart data={yieldData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="month" />
              <Recharts.YAxis />
              <Recharts.Tooltip content={<ChartTooltipContent />} />
              <Recharts.Legend content={<ChartLegendContent />} />
              <Recharts.Area dataKey="yield" stroke={chartConfig.yield.color} fill={chartConfig.yield.color} fillOpacity={0.15} />
            </Recharts.AreaChart>
          </ChartContainer>
        </CardShell>

        {/* pH chart (new dataset) */}
        <CardShell title="Soil pH Levels" subtitle="Sample analysis" icon={<Beaker className="h-5 w-5 text-purple-500" />}>
          <ChartContainer config={chartConfig} id="ph-chart" className="h-56">
            <Recharts.BarChart data={phData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="sample" />
              <Recharts.YAxis domain={[6, 8]} />
              <Recharts.Tooltip content={<ChartTooltipContent />} />
              <Recharts.Legend content={<ChartLegendContent />} />
              <Recharts.Bar dataKey="pH" fill={chartConfig.ph.color} radius={[6, 6, 0, 0]} />
            </Recharts.BarChart>
          </ChartContainer>
        </CardShell>
      </div>

      {/* Insights */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>💡 Moisture dipped below 30% on Aug 22 — consider irrigation adjustments.</p>
          <p>🌱 Fertility score improved by +5 over the past 5 days.</p>
          <p>📡 Sensor activity highest in North region (12 active sensors).</p>
          <p>🌡️ Temperature peaked at 33°C on Saturday — may affect crop stress.</p>
          <p>📊 Yield projection shows a steady increase until July.</p>
        </CardContent>
      </Card>

       
    </div>
  );
}

export default TrendsPage;
