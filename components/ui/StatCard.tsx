export default function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
return (
<div className="rounded-3xl border border-neutral-200 shadow-sm p-6 bg-white flex items-start gap-4">
<div className="h-9 w-9 rounded-xl bg-neutral-900 flex items-center justify-center shadow">{icon}</div>
<div>
<div className="text-neutral-600 text-sm">{title}</div>
<div className="text-xl font-semibold text-neutral-900">{value}</div>
</div>
</div>
);
}