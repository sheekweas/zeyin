export default function Input({ label, ...props }: { label: string; [key: string]: any }) {
return (
<label className="block text-sm">
<div className="mb-1 text-neutral-700">{label}</div>
<input {...props} className="w-full rounded-2xl bg-neutral-100 px-3 py-2 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-900/80" />
</label>
);
}