import type { SceneName } from '../components/Scene';

export type Interest =
  | 'Live music'
  | 'Comedy'
  | 'Food & drink'
  | 'Nightlife'
  | 'Art & culture'
  | 'Markets'
  | 'Outdoors'
  | 'Theatre'
  | 'Film'
  | 'Sport'
  | 'Wellness'
  | 'Workshops'
  | 'Pop-ups'
  | 'Family';

export const INTERESTS: Interest[] = [
  'Live music',
  'Comedy',
  'Food & drink',
  'Nightlife',
  'Art & culture',
  'Markets',
  'Outdoors',
  'Theatre',
  'Film',
  'Sport',
  'Wellness',
  'Workshops',
  'Pop-ups',
  'Family',
];

export const CITIES = ['London', 'Manchester', 'Bristol', 'Glasgow', 'Leeds'];

export type Budget = 'free' | 'under10' | 'under25' | 'any';

export const BUDGETS: { id: Budget; title: string; sub: string; max: number }[] = [
  { id: 'free', title: 'Free only', sub: 'Zero spend, all fun', max: 0 },
  { id: 'under10', title: 'Under £10', sub: 'Cheap and cheerful', max: 10 },
  { id: 'under25', title: 'Under £25', sub: 'A proper night out', max: 25 },
  { id: 'any', title: 'Treat yourself', sub: 'No limit', max: Infinity },
];

/** Media shown full-bleed on a card. `image`/`video` URLs replace the placeholder scene when set. */
export type Media =
  | { kind: 'image'; scene: SceneName; image?: string }
  | { kind: 'carousel'; slides: { scene: SceneName; image?: string }[] }
  | { kind: 'video'; scene: SceneName; video?: string; poster?: string };

export type YeahzyEvent = {
  id: string;
  title: string;
  category: string;
  interest: Interest;
  status?: string;
  dateShort: string; // "Tonight", "Fri 3 Oct" — used on tags/tiles
  when: string; // "Tonight · 8pm–11pm"
  dateLong: string; // "Tonight, Wed 30 Sep"
  times: string; // "8pm–11pm · Doors 7:30pm"
  venue: string;
  area: string;
  postcodeArea: string;
  distance: string;
  price: number; // 0 = free
  saves: string;
  description: string;
  about: string[];
  media: Media;
  slug: string;
};

export const EVENTS: YeahzyEvent[] = [
  {
    id: 'rooftop-jazz',
    slug: 'rooftop-jazz',
    title: 'Rooftop Jazz Sessions',
    category: 'Live music',
    interest: 'Live music',
    status: 'Tonight',
    dateShort: 'Tonight',
    when: 'Tonight · 8pm–11pm',
    dateLong: 'Tonight, Wed 30 Sep',
    times: '8pm–11pm · Doors 7:30pm',
    venue: 'Halcyon Rooftop',
    area: 'Peckham',
    postcodeArea: 'Peckham, SE15',
    distance: '1.2 mi',
    price: 12,
    saves: '2.4k',
    description: 'Live quartet, golden-hour views and cocktails over Peckham. Come early for a spot by the rail.',
    about: [
      "South London's favourite midweek jazz night heads up to the rooftop. A rotating quartet plays two sets of standards, soul-jazz and a few surprises while the sun drops behind the skyline.",
      "Grab a spritz from the bar, find a spot by the rail and settle in. It's relaxed, it's friendly and it tends to sell out, so don't leave it too late.",
    ],
    media: { kind: 'image', scene: 'jazz' },
  },
  {
    id: 'night-market',
    slug: 'friday-night-market',
    title: 'Friday Night Market',
    category: 'Food & drink',
    interest: 'Food & drink',
    status: 'Free',
    dateShort: 'Fri 3 Oct',
    when: 'Fri 3 Oct · 5pm–11pm',
    dateLong: 'Friday, 3 Oct',
    times: '5pm–11pm',
    venue: 'The Yard',
    area: 'Dalston',
    postcodeArea: 'Dalston, E8',
    distance: '2.8 mi',
    price: 0,
    saves: '3.2k',
    description: '30+ street food stalls, a DJ till late and fairy lights everywhere. Bring cash and an appetite.',
    about: [
      'Thirty-odd traders take over the yard every Friday: dumplings, tacos, wood-fired pizza, natural wine and whatever the dessert stall has dreamt up this week.',
      'A DJ spins from 7pm and the lights go on as the sun goes down. Free entry, so just turn up hungry.',
    ],
    media: {
      kind: 'carousel',
      slides: [{ scene: 'market' }, { scene: 'market' }, { scene: 'market' }, { scene: 'market' }],
    },
  },
  {
    id: 'warehouse-sessions',
    slug: 'warehouse-sessions',
    title: 'Warehouse Sessions: All Night',
    category: 'Nightlife',
    interest: 'Nightlife',
    status: 'Selling fast',
    dateShort: 'Sat 4 Oct',
    when: 'Sat 4 Oct · 10pm–4am',
    dateLong: 'Saturday, 4 Oct',
    times: '10pm–4am · Last entry 1am',
    venue: 'Unit 9',
    area: 'Hackney Wick',
    postcodeArea: 'Hackney Wick, E9',
    distance: '3.1 mi',
    price: 18,
    saves: '5.1k',
    description: 'Six hours of house and techno across two rooms. Big sound system, no dress code.',
    about: [
      'Two rooms, one very big sound system and six hours of house and techno from residents and a surprise headliner.',
      "No dress code, no guest list. Tickets go in waves, and the last wave always goes fast.",
    ],
    media: { kind: 'video', scene: 'club' },
  },
  {
    id: 'sunset-social',
    slug: 'sunset-social-club',
    title: 'Sunset Social Club',
    category: 'Nightlife',
    interest: 'Nightlife',
    dateShort: 'Sun 5 Oct',
    when: 'Sun 5 Oct · 5pm–10pm',
    dateLong: 'Sunday, 5 Oct',
    times: '5pm–10pm',
    venue: 'Skyline Terrace',
    area: 'Shoreditch',
    postcodeArea: 'Shoreditch, E1',
    distance: '2.2 mi',
    price: 8,
    saves: '1.8k',
    description: 'Sunday sundowners with a disco-leaning DJ and the best view in east London.',
    about: ['Sunday sundowners with a disco-leaning DJ, a spritz menu and the best view in east London.'],
    media: { kind: 'image', scene: 'sunset' },
  },
  {
    id: 'comedy-night',
    slug: 'new-material-comedy',
    title: 'New Material Comedy Night',
    category: 'Comedy',
    interest: 'Comedy',
    dateShort: 'Tue 7 Oct',
    when: 'Tue 7 Oct · 7:30pm–10pm',
    dateLong: 'Tuesday, 7 Oct',
    times: '7:30pm–10pm',
    venue: 'The Back Room',
    area: 'Camden',
    postcodeArea: 'Camden, NW1',
    distance: '3.6 mi',
    price: 6,
    saves: '940',
    description: "Six comics trying out brand-new material. Some of it will kill. Some of it really won't.",
    about: ["Six comics trying out brand-new material in a tiny back room. Some of it will kill. Some of it really won't. That's the fun."],
    media: { kind: 'image', scene: 'comedy' },
  },
  {
    id: 'late-opening',
    slug: 'late-opening-new-painters',
    title: 'Late Opening: New Painters',
    category: 'Art & culture',
    interest: 'Art & culture',
    status: 'Free',
    dateShort: 'Thu 9 Oct',
    when: 'Thu 9 Oct · 6pm–10pm',
    dateLong: 'Thursday, 9 Oct',
    times: '6pm–10pm',
    venue: 'Tannery Gallery',
    area: 'Bermondsey',
    postcodeArea: 'Bermondsey, SE1',
    distance: '1.9 mi',
    price: 0,
    saves: '1.1k',
    description: 'A late-night look at the new painters show, with a bar, a DJ and the artists in the room.',
    about: ['A late-night look at the new painters show, with a bar, a DJ and the artists in the room to chat to.'],
    media: { kind: 'image', scene: 'gallery' },
  },
];

export const priceLabel = (price: number) => (price === 0 ? 'Free' : `£${price}`);

export const getEvent = (id: string | undefined) => EVENTS.find((e) => e.id === id);
