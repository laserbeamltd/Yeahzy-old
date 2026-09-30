# ProgressBar

Thin segmented bars that show where you are: onboarding steps, carousel slides and video playback.

- **Steps** (onboarding): 4px segments with `space-8`–6px gaps; done steps `brand`, remaining `line-200`.
- **Slides** (carousel card): 3px segments with `space-4` gaps at the top of the card; current slide white, others white at 35%.
- **Playback** (video card): one 3px bar pinned above the nav; `brand` fill over white at 22%.

Always expose the position to assistive tech (`aria-label="Photo 2 of 4"`, or `role="progressbar"` with values).
