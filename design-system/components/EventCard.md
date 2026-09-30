# EventCard

The full-screen swipe card at the heart of the feed: a photo, carousel or video with the event details laid over it.

**Layers, back to front:** full-bleed media; the scrim (clear from 16% to 45% height, then down to `scrim` at the bottom, plus a light darkening at the top); the action rail (IconButton) on the right; the text block bottom-left with a `space-16` gutter and a 76px right inset to clear the rail.

**Text block**, `space-12` apart: Tags (category + status), the event name in `card-title` (two lines max, links to the detail), a one- or two-sentence description in `card-body` at 85% white, meta rows (calendar and pin icons, `card-body` at 90%), then the compact primary Button with the price.

**Variants:** carousel adds slide segments at the top (ProgressBar); video adds a mute IconButton top-right and a playback bar above the nav. Saved tiles are the same card at 175 × 250 with `radius-md`, a date Tag, and just title and place · price.

The consumer provides the media. Photography should be real, moody and full of people; the scrim keeps text legible on anything.
