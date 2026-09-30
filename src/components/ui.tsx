import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { Bookmark, ChevronLeft, Compass, Eye, EyeOff, Search, User } from './icons';

/* ---------- Layout ---------- */

/** A 390px-wide phone column, full height, centred on desktop. */
export function Screen({ children, className = '', yellow }: { children: ReactNode; className?: string; yellow?: boolean }) {
  return (
    <div className="flex h-[100dvh] w-full justify-center bg-black">
      <div
        className={`relative h-full w-full max-w-[430px] overflow-hidden ${yellow ? 'bg-brand text-on-brand' : 'bg-ink text-white'} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Buttons ---------- */

const primaryCls =
  'flex h-[58px] w-full items-center justify-center rounded-full bg-brand text-[17px] font-bold text-on-brand no-underline transition active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100';
const secondaryCls =
  'flex h-[58px] w-full items-center justify-center rounded-full bg-surface-200 text-[16px] font-bold text-white no-underline transition active:scale-[0.98]';

export function PrimaryButton({ to, children, ...rest }: { to?: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (to) {
    return (
      <Link to={to} className={primaryCls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={primaryCls} {...rest}>
      {children}
    </button>
  );
}

export function SecondaryButton({ to, children, ...rest }: { to?: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (to) {
    return (
      <Link to={to} className={secondaryCls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={secondaryCls} {...rest}>
      {children}
    </button>
  );
}

export function OutlineButton({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="h-9 shrink-0 rounded-full border border-line-300 bg-transparent px-3 text-[13px] font-bold text-white active:bg-surface-200"
      {...rest}
    >
      {children}
    </button>
  );
}

/** Pinned bottom action area used on onboarding and auth screens. */
export function BottomActions({ children }: { children: ReactNode }) {
  return <div className="absolute bottom-7 left-4 right-4 flex flex-col gap-4">{children}</div>;
}

export function BackButton({ to }: { to: string }) {
  return (
    <Link to={to} aria-label="Back" className="-ml-2.5 flex h-11 w-11 items-center justify-center text-white">
      <ChevronLeft size={24} />
    </Link>
  );
}

/* ---------- Tags & chips ---------- */

export function Tag({ children, variant = 'category', className = '' }: { children: ReactNode; variant?: 'category' | 'status' | 'date'; className?: string }) {
  const base = 'inline-block rounded-tag text-[11px] font-bold uppercase leading-none tracking-[0.08em]';
  if (variant === 'status') {
    return <span className={`${base} border border-white/70 px-[7px] py-1 text-white ${className}`}>{children}</span>;
  }
  if (variant === 'date') {
    return <span className={`${base} bg-brand px-[7px] py-1 text-[10px] text-on-brand ${className}`}>{children}</span>;
  }
  return <span className={`${base} bg-brand px-2 py-[5px] text-on-brand ${className}`}>{children}</span>;
}

export function Chip({ selected, onClick, children, small }: { selected: boolean; onClick: () => void; children: ReactNode; small?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full transition active:scale-[0.97] ${small ? 'h-10 px-4 text-[14px]' : 'h-12 px-[18px] text-[16px]'} ${
        selected ? 'bg-brand font-bold text-on-brand' : 'bg-surface-200 font-medium text-white'
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- Form fields ---------- */

export function TextField({ label, id, ...rest }: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-white/75">
        {label}
      </label>
      <input
        id={id}
        className="h-[54px] rounded-md border border-surface-100 bg-surface-100 px-4 text-[16px] font-medium text-white outline-none focus:border-brand"
        {...rest}
      />
    </div>
  );
}

export function PasswordField({ label, id, ...rest }: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-white/75">
        {label}
      </label>
      <div className="flex h-[54px] items-center rounded-md border border-surface-100 bg-surface-100 pl-4 pr-1.5 focus-within:border-brand">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-white outline-none"
          {...rest}
        />
        <button
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-white"
        >
          {show ? <EyeOff size={22} strokeWidth={1.9} /> : <Eye size={22} strokeWidth={1.9} />}
        </button>
      </div>
    </div>
  );
}

/* ---------- Onboarding header ---------- */

export function StepHeader({ back, step, total = 3 }: { back: string; step: number; total?: number }) {
  return (
    <div className="flex items-center gap-3">
      <BackButton to={back} />
      <div className="flex flex-1 gap-1.5" aria-label={`Step ${step} of ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-sm ${i < step ? 'bg-brand' : 'bg-line-200'}`} />
        ))}
      </div>
      <div className="w-[34px]" />
    </div>
  );
}

export function PageTitle({ title, sub, className = '' }: { title: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h1 className="type-title m-0 mb-2">{title}</h1>
      {sub && <p className="m-0 text-[16px] text-white/65">{sub}</p>}
    </div>
  );
}

/* ---------- Bottom nav ---------- */

type Tab = 'discover' | 'search' | 'saved' | 'you';

export function BottomNav({ active }: { active: Tab }) {
  const items: { id: Tab; to: string; label: string; icon: (on: boolean) => ReactNode }[] = [
    { id: 'discover', to: '/feed', label: 'Discover', icon: () => <Compass size={24} strokeWidth={1.9} /> },
    { id: 'search', to: '/search', label: 'Search', icon: () => <Search size={24} strokeWidth={1.9} /> },
    { id: 'saved', to: '/saved', label: 'Saved', icon: (on) => <Bookmark size={24} strokeWidth={1.9} filled={on} /> },
    { id: 'you', to: '/you', label: 'You', icon: () => <User size={24} strokeWidth={1.9} /> },
  ];
  return (
    <nav
      aria-label="Main"
      className="absolute bottom-0 left-0 right-0 z-20 flex h-nav items-start justify-around border-t border-[#1c1c1c] bg-ink pt-2"
    >
      {items.map((it) => {
        const on = it.id === active;
        return (
          <Link
            key={it.id}
            to={it.to}
            aria-current={on ? 'page' : undefined}
            className={`flex h-14 w-[72px] flex-col items-center gap-[3px] text-[11px] no-underline ${on ? 'font-bold text-white' : 'font-medium text-white/55'}`}
          >
            {it.icon(on)}
            {it.label}
            {on && <span className="h-1 w-1 rounded-full bg-brand" />}
          </Link>
        );
      })}
    </nav>
  );
}

/* ---------- Toast ---------- */

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="absolute bottom-28 left-1/2 z-50 rounded-full bg-white px-4 py-2.5 text-[14px] font-bold text-on-brand shadow-lg"
      style={{ animation: 'toast-in 160ms ease-out', transform: 'translateX(-50%)' }}
    >
      {message}
    </div>
  );
}
