import type { CSSProperties } from 'react';

/**
 * Placeholder "photos" from the Yeahzy designs, drawn in CSS.
 * Swap for real media by setting `image` / `video` on an event (see data/events.ts).
 */
export type SceneName = 'jazz' | 'market' | 'club' | 'sunset' | 'comedy' | 'gallery';

const abs: CSSProperties = { position: 'absolute' };

const lights = (top: number, dx: number, size: number) =>
  [10, 55, 100, 145, 195, 245, 290, 335, 380].map((x, i) => {
    const y = top + [0, 26, 44, 54, 58, 54, 44, 26, 0][i];
    return (
      <div
        key={`${top}-${x}`}
        style={{
          ...abs,
          left: `${((x + dx) / 390) * 100}%`,
          top: `${(y / 768) * 100}%`,
          width: size,
          height: size,
          borderRadius: size,
          background: '#ffe9b0',
          boxShadow: `0 0 ${size + 6}px ${size / 2 + 1}px rgba(255,200,90,0.7)`,
        }}
      />
    );
  });

export function Scene({ name, detail = true }: { name: SceneName; detail?: boolean }) {
  switch (name) {
    case 'jazz':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(55% 35% at 26% 24%, rgba(255,178,62,0.8) 0%, rgba(255,178,62,0) 70%), radial-gradient(45% 30% at 80% 30%, rgba(222,78,40,0.65) 0%, rgba(222,78,40,0) 70%), radial-gradient(120% 70% at 50% 100%, #3b1b0c 0%, #140804 55%, #060302 100%)',
          }}
        >
          {detail && (
            <>
              <div style={{ ...abs, left: '15%', top: '22%', width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,210,140,0.35)', filter: 'blur(2px)' }} />
              <div style={{ ...abs, left: '77%', top: '16%', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,170,90,0.3)', filter: 'blur(3px)' }} />
              <div style={{ ...abs, left: '64%', top: '34%', width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,220,160,0.45)', filter: 'blur(1px)' }} />
              <div style={{ ...abs, left: '44%', top: '39%', width: 64, height: 64, borderRadius: '50%', background: '#050201' }} />
              <div style={{ ...abs, left: '32%', top: '47%', width: 160, height: '60%', borderRadius: '80px 80px 0 0', background: '#050201' }} />
              <div style={{ ...abs, left: '25%', top: '43%', width: 3, height: '60%', background: '#050201' }} />
            </>
          )}
        </div>
      );
    case 'market':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(80% 45% at 50% 92%, rgba(255,150,60,0.55) 0%, rgba(255,150,60,0) 70%), linear-gradient(180deg, #0b1614 0%, #13241f 55%, #2a1a0e 100%)',
          }}
        >
          {detail && (
            <>
              {lights(170, 0, 8)}
              {lights(300, 22, 6)}
              <div style={{ ...abs, left: '-3%', top: '57%', width: '54%', height: 70, background: 'repeating-linear-gradient(90deg, #5a2418 0 18px, #2a120c 18px 36px)', clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)' }} />
              <div style={{ ...abs, left: '54%', top: '61%', width: '51%', height: 60, background: 'repeating-linear-gradient(90deg, #1f3a30 0 18px, #0f1f1a 18px 36px)', clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)' }} />
            </>
          )}
        </div>
      );
    case 'club':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{
            background:
              'conic-gradient(from 150deg at 22% -4%, rgba(0,0,0,0) 0deg, rgba(122,92,255,0.6) 9deg, rgba(0,0,0,0) 20deg, rgba(0,0,0,0) 360deg), conic-gradient(from 178deg at 78% -4%, rgba(0,0,0,0) 0deg, rgba(255,64,170,0.55) 9deg, rgba(0,0,0,0) 20deg, rgba(0,0,0,0) 360deg), conic-gradient(from 172deg at 50% -4%, rgba(0,0,0,0) 0deg, rgba(255,229,0,0.35) 5deg, rgba(0,0,0,0) 11deg, rgba(0,0,0,0) 360deg), radial-gradient(90% 40% at 50% 100%, #2a1640 0%, #07040f 70%)',
          }}
        >
          {detail && (
            <div
              style={{
                ...abs,
                left: 0,
                right: 0,
                bottom: 0,
                height: 260,
                background:
                  'radial-gradient(circle 26px at 6% 30%, #030208 0 25px, rgba(0,0,0,0) 26px), radial-gradient(circle 24px at 22% 22%, #030208 0 23px, rgba(0,0,0,0) 24px), radial-gradient(circle 27px at 40% 32%, #030208 0 26px, rgba(0,0,0,0) 27px), radial-gradient(circle 23px at 57% 20%, #030208 0 22px, rgba(0,0,0,0) 23px), radial-gradient(circle 26px at 74% 30%, #030208 0 25px, rgba(0,0,0,0) 26px), radial-gradient(circle 24px at 92% 24%, #030208 0 23px, rgba(0,0,0,0) 24px), linear-gradient(180deg, rgba(0,0,0,0) 0 40%, #030208 48%)',
              }}
            />
          )}
        </div>
      );
    case 'sunset':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{ background: 'linear-gradient(180deg,#2b1d4a 0%,#7a2f63 30%,#d65a5a 50%,#f59a5a 64%,#ffd17a 74%)' }}
        >
          <div
            style={{
              ...abs,
              left: 0,
              right: 0,
              bottom: 0,
              height: '42%',
              background: '#0d0a12',
              clipPath:
                'polygon(0 30%, 10% 30%, 10% 10%, 20% 10%, 20% 38%, 30% 38%, 30% 0, 38% 0, 38% 24%, 50% 24%, 50% 16%, 60% 16%, 60% 34%, 72% 34%, 72% 6%, 80% 6%, 80% 28%, 90% 28%, 90% 14%, 100% 14%, 100% 100%, 0 100%)',
            }}
          />
        </div>
      );
    case 'comedy':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(40% 30% at 50% 40%, rgba(255,236,190,0.6) 0%, rgba(255,236,190,0) 70%), repeating-linear-gradient(90deg, #4a0c12 0 16px, #2c060a 16px 32px)',
          }}
        />
      );
    case 'gallery':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #e7e3dc 0%, #d8d3ca 68%, #8d857a 68%, #6f685f 100%)' }}
        >
          <div style={{ ...abs, left: '22%', top: '18%', width: '56%', height: '36%', background: '#1d2a3a', boxShadow: '0 0 0 6px #f4f1ea' }} />
        </div>
      );
  }
}

/** Renders a real image when provided, else the placeholder scene. */
export function MediaFill({ scene, image, detail }: { scene: SceneName; image?: string; detail?: boolean }) {
  if (image) {
    return <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />;
  }
  return <Scene name={scene} detail={detail} />;
}
