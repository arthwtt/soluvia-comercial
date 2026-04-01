import { ActionFeed } from "@/components/social-selling/ActionFeed";
import { ActionForm } from "@/components/social-selling/ActionForm";
import { SocialMetrics } from "@/components/social-selling/SocialMetrics";

export default function SocialSellingPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Social Selling</h2>
        <ActionForm />
      </div>
      <SocialMetrics />
      <ActionFeed />
    </section>
  );
}
