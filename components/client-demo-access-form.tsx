'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ClientDemoAccessForm() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode || loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/client-demo/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode }),
      });

      const data = (await response.json()) as { href?: string; error?: string };
      if (!response.ok || !data.href) {
        setError('Demo code not found. Check the code and try again.');
        return;
      }

      router.push(data.href);
    } catch {
      setError('Unable to open the demo right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-9 w-full max-w-[620px]">
      <label htmlFor="client-demo-code" className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
        Your demo code
      </label>
      <div className="grid grid-cols-[1fr_auto] border-2 border-black bg-white">
        <div className="flex min-w-0 items-center gap-3 px-4 sm:px-5">
          <LockKeyhole className="h-4 w-4 shrink-0 text-black/40" strokeWidth={1.8} />
          <input
            id="client-demo-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value.toUpperCase());
              if (error) setError('');
            }}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="ENTER CODE"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm font-semibold uppercase tracking-[0.08em] text-black outline-none placeholder:text-black/25 sm:h-16"
          />
        </div>
        <button
          type="submit"
          disabled={!code.trim() || loading}
          className="group flex min-w-[118px] items-center justify-center gap-2 bg-black px-4 text-xs font-bold uppercase tracking-[0.05em] text-white transition-opacity disabled:opacity-40 sm:min-w-[150px] sm:px-6"
        >
          {loading ? 'Opening' : 'View demo'}
          {!loading && <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>
      </div>
      <div aria-live="polite" className="min-h-7 pt-2 text-sm text-red-600">
        {error}
      </div>
    </form>
  );
}
