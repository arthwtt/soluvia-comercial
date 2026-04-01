import { MeetingForm } from "@/components/meetings/MeetingForm";
import { MeetingCalendar } from "@/components/meetings/MeetingCalendar";
import { MeetingList } from "@/components/meetings/MeetingList";

export default function MeetingsPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Reunioes</h2>
        <MeetingForm />
      </div>
      <MeetingCalendar />
      <MeetingList />
    </section>
  );
}
