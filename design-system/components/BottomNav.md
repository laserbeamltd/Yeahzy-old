# BottomNav

The four-tab bar at the bottom of every main screen: Discover, Search, Saved, You.

- `nav-height`, `ink` fill, 1px `line-100` top border.
- Each tab: 24px white line icon over a `nav` label. Inactive tabs are white at 55%; the active tab is full white, 700, with a 4px `brand` dot under the label, and its icon fills where it has a filled form (Saved).
- Mark the active tab with `aria-current="page"`.

Hide the nav on onboarding, auth, sheets and the event detail.
