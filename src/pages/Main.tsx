import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { ShareSheet } from '../components/ShareSheet';
import { MediaFill } from '../components/Scene';
import { Bookmark, Calendar, ChevronLeft, Pin, Share } from '../components/icons';
import { BottomNav, Chip, OutlineButton, Screen, SecondaryButton, Tag, Toast } from '../components/ui';
import { BUDGETS, EVENTS, getEvent, INTERESTS, priceLabel } from '../data/events';
import type { YeahzyEvent } from '../data/events';
import { useAppState } from '../state/AppState';

function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);
  return [toast, setToast] as const;
}

/** Events matching the user's interests and budget; falls back to everything. */
function useFeedEvents() {
  const { interests, budget, showFree } = useAppState();
  return useMemo(() => {
    const max = BUDGETS.find((b) => b.id === budget)?.max ?? Infinity;
    const filtered = EVENTS.filter((e) => {
      const fitsInterest = interests.length === 0 || interests.includes(e.interest);
      const fitsBudget = e.price <= max || (showFree && e.price === 0);
      return fitsInterest && fitsBudget;
    });
    if (filtered.length >= 3) return filtered;
    // Top up with everything else so the feed never runs dry.
    return [...filtered, ...EVENTS.filter((e) => !filtered.includes(e))];
  }, [interests, budget, showFree]);
}

/* ---------- Feed ---------- */

export function Feed() {
  const events = useFeedEvents();
  const [active, setActive] = useState(0);
  const [sharing, setSharing] = useState<YeahzyEvent | null>(null);
  const [toast, setToast] = useToast();
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollTop / el.clientHeight));
  };

  return (
    <Screen>
      <div ref={ref} onScroll={onScroll} className="no-scrollbar absolute inset-x-0 top-0 bottom-nav snap-y snap-mandatory overflow-y-auto">
        {events.map((e, i) => (
          <div key={e.id} className="h-full">
            <EventCard event={e} active={i === active} onShare={() => setSharing(e)} />
          </div>
        ))}
      </div>
      <BottomNav active="discover" />
      {sharing && <ShareSheet event={sharing} onClose={() => setSharing(null)} onToast={setToast} />}
      <Toast message={toast} />
    </Screen>
  );
}

/* ---------- Event detail ---------- */

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEvent(id);
  const { isSaved, toggleSaved } = useAppState();
  const [sharing, setSharing] = useState(false);
  const [toast, setToast] = useToast();

  if (!event) {
    return (
      <Screen>
        <div className="flex h-full flex-col items-center justify-center gap-4 px-5 text-center">
          <h1 className="type-title m-0">Can't find that one</h1>
          <SecondaryButton to="/feed">Back to the feed</SecondaryButton>
        </div>
      </Screen>
    );
  }

  const saved = isSaved(event.id);
  const hero = event.media.kind === 'carousel' ? event.media.slides[0] : event.media;
  const circle = 'flex h-11 w-11 items-center justify-center rounded-full text-white';

  return (
    <Screen>
      <div className="no-scrollbar h-full overflow-y-auto pb-[120px]">
        <div className="relative h-[440px] overflow-hidden">
          <MediaFill scene={hero.scene} image={'image' in hero ? hero.image : undefined} />
          <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, #0a0a0a 100%)' }} />
        </div>
        <div className="relative -mt-[110px] flex flex-col gap-7 px-5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1.5">
              <Tag>{event.category}</Tag>
              {event.status && <Tag variant="status">{event.status}</Tag>}
            </div>
            <h1 className="m-0 font-display text-[40px] font-extrabold leading-[0.95] tracking-[-0.035em]">{event.title}</h1>
          </div>
          <div className="flex flex-col rounded-lg bg-surface-100">
            <div className="flex items-center gap-3.5 border-b border-[#242424] px-4 py-3.5">
              <Calendar size={22} strokeWidth={1.9} />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[16px] font-bold">{event.dateLong}</span>
                <span className="text-[14px] text-white/60">{event.times}</span>
              </div>
              <OutlineButton onClick={() => setToast('Added to calendar')}>Add</OutlineButton>
            </div>
            <div className="flex items-center gap-3.5 px-4 py-3.5">
              <Pin size={22} strokeWidth={1.9} />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[16px] font-bold">{event.venue}</span>
                <span className="text-[14px] text-white/60">
                  {event.postcodeArea} · {event.distance}
                </span>
              </div>
              <OutlineButton
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.postcodeArea}`)}`, '_blank')}
              >
                Directions
              </OutlineButton>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <h2 className="type-label m-0">About</h2>
            {event.about.map((p, i) => (
              <p key={i} className="m-0 text-[16px] leading-[1.55] text-white/[0.88]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Floating controls over the hero */}
      <div className="absolute left-3 right-3 top-4 flex items-center justify-between">
        <button type="button" aria-label="Back" onClick={() => navigate(-1)} className={circle} style={{ background: 'var(--overlay)' }}>
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={saved ? 'Unsave event' : 'Save event'}
            aria-pressed={saved}
            onClick={() => toggleSaved(event.id)}
            className={circle}
            style={{ background: 'var(--overlay)' }}
          >
            <span className={saved ? 'text-brand' : 'text-white'}>
              <Bookmark size={20} filled={saved} />
            </span>
          </button>
          <button type="button" aria-label="Share event" onClick={() => setSharing(true)} className={circle} style={{ background: 'var(--overlay)' }}>
            <Share size={20} />
          </button>
        </div>
      </div>

      {/* Ticket bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex h-24 items-center justify-between gap-4 border-t border-[#1c1c1c] bg-ink px-5 pb-6 pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-[26px] font-extrabold leading-none">{priceLabel(event.price)}</span>
          <span className="text-[13px] text-white/60">{event.price === 0 ? 'no ticket needed' : 'per ticket'}</span>
        </div>
        <button
          type="button"
          onClick={() => setToast(event.price === 0 ? "You're going!" : 'Tickets coming soon')}
          className="h-14 flex-1 rounded-full bg-brand text-[17px] font-bold text-on-brand active:scale-[0.98]"
        >
          {event.price === 0 ? "I'm going" : 'Get tickets'}
        </button>
      </div>

      {sharing && <ShareSheet event={event} onClose={() => setSharing(false)} onToast={setToast} />}
      <Toast message={toast} />
    </Screen>
  );
}

/* ---------- Saved ---------- */

type SavedFilter = 'Upcoming' | 'This week' | 'Free' | 'Past';
const THIS_WEEK = new Set(['rooftop-jazz', 'night-market', 'warehouse-sessions', 'sunset-social']);

export function Saved() {
  const { saved } = useAppState();
  const [filter, setFilter] = useState<SavedFilter>('Upcoming');
  const all = EVENTS.filter((e) => saved.includes(e.id));
  const shown = all.filter((e) => {
    if (filter === 'Free') return e.price === 0;
    if (filter === 'This week') return THIS_WEEK.has(e.id);
    if (filter === 'Past') return false;
    return true;
  });
  const thisWeek = all.filter((e) => THIS_WEEK.has(e.id)).length;

  return (
    <Screen>
      <div className="no-scrollbar h-full overflow-y-auto pb-[100px]">
        <div className="px-4 pt-5">
          <h1 className="type-title m-0">Saved</h1>
          <p className="m-0 mt-1.5 text-[15px] text-white/60">
            {all.length} upcoming · {thisWeek} this week
          </p>
          <div className="no-scrollbar mt-[18px] flex gap-2 overflow-x-auto">
            {(['Upcoming', 'This week', 'Free', 'Past'] as SavedFilter[]).map((f) => (
              <Chip key={f} small selected={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </div>
        {shown.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-8 pt-24 text-center">
            <span className="text-white/40">
              <Bookmark size={40} strokeWidth={1.6} />
            </span>
            <h2 className="type-sheet-title m-0">{all.length === 0 ? 'Nothing saved yet' : 'Nothing here'}</h2>
            <p className="m-0 text-[15px] text-white/60">Tap the bookmark on any event to keep it here.</p>
            <div className="w-full">
              <SecondaryButton to="/feed">Find something to do</SecondaryButton>
            </div>
          </div>
        ) : (
          <div className="mt-[18px] grid grid-cols-2 gap-2 px-4">
            {shown.map((e) => {
              const m = e.media.kind === 'carousel' ? e.media.slides[0] : e.media;
              return (
                <Link key={e.id} to={`/event/${e.id}`} className="relative h-[250px] overflow-hidden rounded-md text-white no-underline">
                  <MediaFill scene={m.scene} image={'image' in m ? m.image : undefined} detail={false} />
                  <span className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)' }} />
                  <Tag variant="date" className="absolute left-2.5 top-2.5">
                    {e.dateShort}
                  </Tag>
                  <span className="absolute bottom-3 left-3 right-3 flex flex-col gap-[3px]">
                    <span className="text-[16px] font-bold leading-[1.15]">{e.title}</span>
                    <span className="text-[12px] text-white/75">
                      {e.area} · {priceLabel(e.price)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav active="saved" />
    </Screen>
  );
}

/* ---------- Search (placeholder) ---------- */

export function SearchPage() {
  const [q, setQ] = useState('');
  const results = EVENTS.filter((e) => `${e.title} ${e.area} ${e.category}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen>
      <div className="no-scrollbar h-full overflow-y-auto px-4 pb-[100px] pt-5">
        <h1 className="type-title m-0 mb-5">Search</h1>
        <label htmlFor="search" className="sr-only">
          Search events
        </label>
        <input
          id="search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Events, places, vibes"
          className="h-[54px] w-full rounded-md border border-surface-100 bg-surface-100 px-4 text-[16px] font-medium text-white outline-none focus:border-brand"
        />
        <div className="mt-5 flex flex-col">
          {results.map((e) => (
            <Link key={e.id} to={`/event/${e.id}`} className="flex items-center gap-3.5 border-b border-line-100 py-3 text-white no-underline">
              <span className="relative h-[72px] w-14 shrink-0 overflow-hidden rounded-sm">
                <MediaFill scene={e.media.kind === 'carousel' ? e.media.slides[0].scene : e.media.scene} detail={false} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[16px] font-bold">{e.title}</span>
                <span className="text-[14px] text-white/60">
                  {e.dateShort} · {e.area} · {priceLabel(e.price)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav active="search" />
    </Screen>
  );
}

/* ---------- You (placeholder) ---------- */

export function You() {
  const { city, interests, budget } = useAppState();
  const b = BUDGETS.find((x) => x.id === budget);
  return (
    <Screen>
      <div className="h-full px-4 pt-5">
        <h1 className="type-title m-0 mb-6">You</h1>
        <div className="flex flex-col rounded-lg bg-surface-100">
          <Row label="City" value={city} />
          <Row label="Into" value={interests.length ? interests.join(', ') : INTERESTS.slice(0, 3).join(', ')} />
          <Row label="Budget" value={b?.title ?? ''} last />
        </div>
        <div className="mt-6">
          <SecondaryButton to="/onboarding/city">Edit preferences</SecondaryButton>
        </div>
      </div>
      <BottomNav active="you" />
    </Screen>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex flex-col gap-0.5 px-4 py-3.5 ${last ? '' : 'border-b border-[#242424]'}`}>
      <span className="type-label">{label}</span>
      <span className="text-[16px] font-bold">{value}</span>
    </div>
  );
}
