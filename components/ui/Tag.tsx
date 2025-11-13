export default function Tag({ children }: { children: React.ReactNode }) {
return (
<span className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-neutral-100 text-neutral-700 text-xs border border-neutral-200">
{children}
</span>
);
}