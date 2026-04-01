"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { mockSocialActions } from "@/lib/mock/social.mock";

const COLORS = ["#4f8ef7", "#7c5cf0", "#22c97a", "#f5a623", "#ef4444", "#8b91a8"];

const typeLabels: Record<string, string> = {
  conexao: "Conexao",
  dm: "DM",
  comentario: "Comentario",
  post: "Post",
  engajamento: "Engajamento",
  compartilhamento: "Compartilhamento",
};

export function SocialMetrics() {
  const total = mockSocialActions.length;
  const answered = mockSocialActions.filter((action) => action.status === "respondido" || action.status === "convertido").length;
  const converted = mockSocialActions.filter((action) => action.status === "convertido").length;
  const responseRate = total === 0 ? 0 : (answered / total) * 100;

  const byTypeMap = mockSocialActions.reduce<Record<string, number>>((acc, action) => {
    acc[action.type] = (acc[action.type] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(byTypeMap).map(([type, value]) => ({
    name: typeLabels[type] ?? type,
    value,
  }));

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Acoes no mes</p>
          <p className="mt-2 text-2xl font-semibold">{total}</p>
        </article>
        <article className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Taxa de resposta</p>
          <p className="mt-2 text-2xl font-semibold">{responseRate.toFixed(1)}%</p>
        </article>
        <article className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Conversoes</p>
          <p className="mt-2 text-2xl font-semibold">{converted}</p>
        </article>
      </div>

      <div className="h-80 rounded-lg border border-border bg-card p-4">
        <p className="mb-4 text-sm text-muted-foreground">Acoes por tipo</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={110} label>
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#111318", border: "1px solid rgba(255,255,255,0.1)" }}
              labelStyle={{ color: "#f0f2f8" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
