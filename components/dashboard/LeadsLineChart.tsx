"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface LeadsLineChartProps {
  data: Array<{ day: string; total: number }>;
}

export function LeadsLineChart({ data }: LeadsLineChartProps) {
  return (
    <div className="h-72 rounded-lg border border-border bg-card p-4">
      <p className="mb-4 text-sm text-muted-foreground">Evolucao de leads (30 dias)</p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="day" stroke="#8b91a8" fontSize={12} />
          <YAxis stroke="#8b91a8" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111318", border: "1px solid rgba(255,255,255,0.1)" }}
            labelStyle={{ color: "#f0f2f8" }}
          />
          <Line type="monotone" dataKey="total" stroke="#7c5cf0" strokeWidth={3} dot={{ fill: "#7c5cf0", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
