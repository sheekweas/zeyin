import type { ReactNode } from 'react';
import { UserRound } from 'lucide-react';


export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
return (
<main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
<div className="w-full max-w-md rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 bg-white">
<div className="flex items-center gap-3 mb-6">
<div className="h-10 w-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow">
<UserRound size={18}/>
</div>
<div>
<h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
<p className="text-sm text-neutral-600">{subtitle}</p>
</div>
</div>
{children}
</div>
</main>
);
}
