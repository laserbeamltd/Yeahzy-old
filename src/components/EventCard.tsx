import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { YeahzyEvent } from '../data/events';
import { priceLabel } from '../data/events';
import { useAppState } from '../state/AppState';
import { Bookmark, Calendar, Pin, Share, VolumeOff, VolumeOn } from './icons';
import { MediaFill } from './Scene';
import { Tag } from './ui';

/** Full-screen swipe card: media (image, carousel or video) with details laid over it. */
export function EventCard({ event, active, onShare }: { event: YeahzyEvent; active: boolean; onShare: () => void }) {
  const { isSaved, toggleSaved } = useAppState();
  const saved = isSaved(event.id);
  const free = event.price === 0;

  return (
    <article className="relative h-full w-full shrink-0 snap-start snap-always overflow-hidden" aria-label={event.title}>
      <CardMedia event={event} active={active} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'var(--scrim)' }} />

      {/* Action rail */}
      <div className="absolute bottom-7 right-1.5 z-10 flex flex-col items-center gap-3.5">
        <button
          type="button"
          aria-label={saved ? 'Unsave event' : 'Save event'}
          aria-pressed={saved}
          onClick={() => toggleSaved(event.id)}
          className="flex w-14 flex-col items-center gap-1 py-1 text-[12px] font-bold text-white"
        >
          <span className={saved ? 'text-brand' : 'text-white'}>
            <Bookmark size={30} strokeWidth={1.8} filled={saved} />
          </span>
          {saved ? 'Saved' : event.saves}
        </button>
        <button type="button" aria-label="Share event" onClick={onShare} className="flex w-14 flex-col items-center gap-1 py-1 text-[12px] font-bold text-white">
          <Share size={30} strokeWidth={1.8} />
          Share
        </button>
      </div>

      {/* Details */}
      <div className="absolute bottom-6 left-4 right-[76px] z-10 flex flex-col gap-3">
        <div className="flex gap-1.5">
          <Tag>{event.category}</Tag>
          {event.status && <Tag variant="status">{event.status}</Tag>}
        </div>
        <h2 className="type-card-title m-0">
          <Link to={`/event/${event.id}`} className="text-white no-underline">
            {event.title}
          </Link>
        </h2>
        <p className="m-0 text-[15px] leading-[1.4] text-white/85">{event.description}</p>
        <div className="flex flex-col gap-1.5 text-[15px] text-white/90">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {event.when}
          </div>
          <div className="flex items-center gap-2">
            <Pin size={16} />
            {event.venue}, {event.area} · {event.distance}
          </div>
        </div>
        <div className="mt-1 flex">
          <Link
            to={`/event/${event.id}`}
            className="flex h-[46px] items-center rounded-full bg-brand px-[22px] text-[15px] font-bold text-on-brand no-underline active:scale-[0.98]"
          >
            {free ? "I'm going · Free" : `Get tickets · ${priceLabel(event.price)}`}
          </Link>
        </div>
      </div>
    </article>
  );
}

function CardMedia({ event, active }: { event: YeahzyEvent; active: boolean }) {
  const m = event.media;
  if (m.kind === 'carousel') return <Carousel slides={m.slides} />;
  if (m.kind === 'video') return <VideoMedia scene={m.scene} src={m.video} poster={m.poster} active={active} />;
  return <MediaFill scene={m.scene} image={m.image} />;
}

function Carousel({ slides }: { slides: { scene: Parameters<typeof MediaFill>[0]['scene']; image?: string }[] }) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      <div ref={ref} onScroll={onScroll} className="no-scrollbar absolute inset-0 flex snap-x snap-mandatory overflow-x-auto">
        {slides.map((s, i) => (
          <div key={i} className="relative h-full w-full shrink-0 snap-center">
            <MediaFill scene={s.scene} image={s.image} />
          </div>
        ))}
      </div>
      <div role="tablist" aria-label={`Photo ${index + 1} of ${slides.length}`} className="absolute left-4 right-4 top-[70px] z-10 flex gap-1">
        {slides.map((_, i) => (
          <span key={i} className={`h-[3px] flex-1 rounded-sm ${i === index ? 'bg-white' : 'bg-white/35'}`} />
        ))}
      </div>
    </>
  );
}

function VideoMedia({ scene, src, poster, active }: { scene: Parameters<typeof MediaFill>[0]['scene']; src?: string; poster?: string; active: boolean }) {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause as the card enters or leaves view.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  // Without a real video, simulate playback so the progress bar reads correctly.
  useEffect(() => {
    if (src || !active) return;
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 75);
    return () => clearInterval(t);
  }, [src, active]);

  return (
    <>
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <MediaFill scene={scene} />
      )}
      <button
        type="button"
        aria-label={muted ? 'Unmute' : 'Mute'}
        onClick={() => setMuted((m) => !m)}
        className="absolute right-3 top-[68px] z-10 flex h-11 w-11 items-center justify-center rounded-full text-white"
        style={{ background: 'var(--overlay)' }}
      >
        {muted ? <VolumeOff size={20} /> : <VolumeOn size={20} />}
      </button>
      <div
        role="progressbar"
        aria-label="Video progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-white/20"
      >
        <div className="h-[3px] bg-brand" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}
