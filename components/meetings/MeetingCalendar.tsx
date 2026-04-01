"use client";

import { useMemo } from "react";
import { mockMeetings } from "@/lib/mock/meetings.mock";

function getCurrentMonthDays() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startWeekday = first.getDay();
  const totalDays = last.getDate();

  const days: Array<{ day: number; iso: string } | null> = [];
  for (let i = 0; i < startWeekday; i += 1) days.push(null);
  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month, day);
    days.push({ day, iso: date.toISOString().slice(0, 10) });
  }
  return days;
}

export function MeetingCalendar() {
  const meetingDays = useMemo(() => new Set(mockMeetings.map((meeting) => meeting.date)), []);
  const days = useMemo(() => getCurrentMonthDays(), []);

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <p className="mb-3 text-sm text-muted-foreground">Calendario mensal</p>
      <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="h-10 rounded-md bg-background/40" />;
          const hasMeeting = meetingDays.has(day.iso);
          return (
            <div
              key={day.iso}
              className={`flex h-10 items-center justify-center rounded-md text-sm ${
                hasMeeting ? "bg-primary/20 text-primary" : "bg-background text-foreground"
              }`}
              title={hasMeeting ? "Possui reuniao" : "Sem reuniao"}
            >
              {day.day}
            </div>
          );
        })}
      </div>
    </section>
  );
}
