"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface FunnelChartProps {
  data: Array<{ stage: string; total: number }>;
}

export function FunnelChart({ data }: FunnelChartProps) {
  return (
    <div className="h-72 rounded-lg border border-border bg-card p-4">
      <p className="mb-4 text-sm text-muted-foreground">Leads por estagio</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="stage" stroke="#8b91a8" fontSize={12} />
          <YAxis stroke="#8b91a8" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111318", border: "1px solid rgba(255,255,255,0.1)" }}
            labelStyle={{ color: "#f0f2f8" }}
          />
          <Bar dataKey="total" fill="#4f8ef7" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
