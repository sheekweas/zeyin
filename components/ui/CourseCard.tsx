export default function CourseCard({ title, progress, lessons }: { title: string; progress: number; lessons: string }) {
return (
<div className="rounded-3xl border border-neutral-200 shadow-sm p-6 bg-white">
<div className="flex items-center gap-3">
<div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs">IMG</div>
<div className="font-medium text-neutral-900">{title}</div>
</div>
<div className="mt-4 h-2 rounded-full bg-neutral-100">
<div className="h-2 rounded-full bg-neutral-900" style={{ width: `${Math.round(progress * 100)}%` }} />
</div>
<div className="mt-2 text-xs text-neutral-500">{lessons} Lessons</div>
</div>
);
}