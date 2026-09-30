import { useState } from 'react';
import type { YeahzyEvent } from '../data/events';
import { CalendarPlus, Close, Mail, Message, More } from './icons';
import { MediaFill } from './Scene';

/** Bottom sheet for sharing an event. */
export function ShareSheet({ event, onClose, onToast }: { event: YeahzyEvent; onClose: () => void; onToast: (m: string) => void }) {
  const [copied, setCopied] = useState(false);
  const link = `yeahzy.app/e/${event.slug}`;
  const url = `https://${link}`;
  const text = `${event.title} · ${event.when} · ${event.area}`;
  const thumb = event.media.kind === 'carousel' ? event.media.slides[0] : event.media;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard blocked: still confirm so the flow reads */
    }
    setCopied(true);
    onToast('Link copied');
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text, url });
      } catch {
        /* cancelled */
      }
    } else {
      copy();
    }
  };

  const targets = [
    { label: 'Message', icon: <Message size={24} strokeWidth={1.9} />, href: `sms:?&body=${encodeURIComponent(`${text} ${url}`)}` },
    { label: 'Email', icon: <Mail size={24} strokeWidth={1.9} />, href: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(`${text}\n${url}`)}` },
    { label: 'Calendar', icon: <CalendarPlus size={24} strokeWidth={1.9} />, onClick: () => onToast('Added to calendar') },
    { label: 'More', icon: <More size={24} />, onClick: nativeShare },
  ];

  return (
    <div className="absolute inset-0 z-40">
      <button type="button" aria-label="Close share sheet" onClick={onClose} className="absolute inset-0" style={{ background: 'var(--backdrop)' }} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        className="absolute bottom-0 left-0 right-0 flex flex-col gap-5 rounded-t-xl bg-surface-100 px-5 pb-8 pt-2.5"
        style={{ animation: 'sheet-up 220ms cubic-bezier(.2,.8,.2,1)' }}
      >
        <div className="h-1 w-[38px] self-center rounded-sm bg-line-300" />
        <div className="flex items-center justify-between">
          <h2 id="share-title" className="type-sheet-title m-0">
            Share event
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="-mr-2.5 flex h-11 w-11 items-center justify-center text-white">
            <Close size={22} />
          </button>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="relative h-[76px] w-14 shrink-0 overflow-hidden rounded-sm">
            <MediaFill scene={thumb.scene} image={'image' in thumb ? thumb.image : undefined} detail={false} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[17px] font-bold">{event.title}</div>
            <div className="text-[14px] text-white/60">
              {event.when.split('–')[0]} · {event.area}
            </div>
          </div>
        </div>
        <div className="flex h-[54px] items-center gap-2.5 rounded-md bg-ink pl-4 pr-1.5">
          <span className="flex-1 truncate text-[15px] text-white/80">{link}</span>
          <button type="button" onClick={copy} className="h-[42px] rounded-full bg-brand px-[18px] text-[14px] font-bold text-on-brand">
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
        <div className="flex justify-between">
          {targets.map((t) => {
            const inner = (
              <>
                <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-surface-300 text-white">{t.icon}</span>
                {t.label}
              </>
            );
            const cls = 'flex w-[76px] flex-col items-center gap-2 text-[13px] font-medium text-white/80 no-underline';
            return t.href ? (
              <a key={t.label} href={t.href} className={cls}>
                {inner}
              </a>
            ) : (
              <button key={t.label} type="button" onClick={t.onClick} className={cls}>
                {inner}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
