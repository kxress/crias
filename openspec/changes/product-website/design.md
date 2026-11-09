# Design

## Context

The checkout has a single English placeholder displaying the raster, no build dependencies or tests, and a Pages workflow uploading the repository root. There are no current canonical specifications or active changes. The staged conversion of the former screenshot-oriented spec into historical notes explicitly removes its authority. See the proposal for intent.

## Goals / Non-Goals

**Goals:** Provide an implementable, maintainable static experience for newcomers, invited visitors and returning players, with useful content available before enhancement.

**Non-Goals:** Operate NetBird or game servers, claim real-time health, reproduce licensed character art, or prescribe a framework or screenshot geometry.

## Decisions

### Journeys and composition

Use one page: a concise brand introduction explains private access, with prominent links to joining and servers; a prerequisite-led onboarding section leads to a game-grouped directory and a modest footer. Anchors let returning players bypass the explanation. A separate page or navigation system adds complexity without demonstrated need. Use real Portuguese text and an informal welcoming voice; do not confuse private network access with a public game server. The directory should be easy to scan, not subordinate to scenery.

### Content and operational source

The network operator is the authority for the management endpoint, client sequence, invitation contact, active records, variants, ports and protocols. Record confirmation and date in maintainer-facing material at implementation time, and repeat verification when values change. The reference is a candidate list only; DNS resolution alone does not establish private service configuration or authorization. If a value is unconfirmed, withhold it and present the specified unavailable state. Do not block the static interface's implementation on live infrastructure; publication of an unverified value is blocked.

Candidate management URL: `https://netbird.kress.wtf`. Candidate records, all unverified:

| Game | Variant | Hostname | Port | Protocol |
| --- | --- | --- | --- | --- |
| Terraria | Vanilla | `brasilia.terraria.games.crias.wtf` | 7777 | TCP |
| Terraria | Vanilla | `lsj.terraria.games.crias.wtf` | 7777 | TCP |
| Terraria | Calamity | `brasilia.calamity.terraria.games.crias.wtf` | 7777 | TCP |
| Terraria | Calamity | `lsj.calamity.terraria.games.crias.wtf` | 7777 | TCP |
| Minecraft | Vanilla | `arena-v22.minecraft.games.crias.wtf` | 25565 | TCP |
| Minecraft | Better MC | `bmc.minecraft.games.crias.wtf` | 25565 | TCP |
| Minecraft | Modpack | `prominence.minecraft.games.crias.wtf` | 25565 | TCP |
| Hytale | Alpha | `alpha.hytale.games.crias.wtf` | 5520 | UDP |

Keep records as structured content with game, variant, hostname, port and protocol; use a stable record identity where needed. Rendering and copying draw from the same value. Keep presentation styling separate. A local static data file or build-time generation is sufficient; avoid a network API. Render critical data into HTML so a disabled script does not erase it. Empty game groups may be omitted; if none are verified, explain the absence. Avoid invented versions, modpack instructions and status.

### Copy and progressive enhancement

Hostnames and ports are separate because game clients can ask for them separately and syntax differs. Copy the hostname alone and label it accordingly; copy the full management URL. Use the browser clipboard where available; report actual outcomes through visible, polite live feedback, with the value selectable for manual copying on failure. Hide or disable copy controls if scripting is unavailable; do not leave dead controls. Keep feedback near the target without unexpected layout shifts. No server round trip is needed.

### Visual system and accessibility

Build a dark purple/near-black canvas with layered depth, restrained neon magenta and cyan/blue accents, and opaque readable surfaces. Use expressive arcade-inspired display typography for brand and headings, and a highly legible sans-serif for instructions and connection values. Establish consistent spacing, borders, icons and focus/hover/pressed states. Distinguish game groups with textual names and restrained individual accents or original game-inspired motifs; never use color as the sole label. Pixel patterns, abstract grids, light and original illustrations can add texture, while anime and vaporwave inform tone rather than mandate specific characters. Keep scenery behind content and reduce it where space is scarce. Content hierarchy, contrast and controls take priority over glow.

Use semantic HTML, Portuguese document language, landmarks, headings, real links and buttons. Target WCAG 2.2 AA, including contrast, focus, reflow and touch target criteria; test screen-reader announcements and keyboard order. Feedback remains clear without animation. Choose content-driven reflow rather than fixed screenshot breakpoints, test small and large phones, tablets, laptop, wide desktop, 200% zoom and long hostnames. Avoid artificial visual ordering that differs from reading order.

### Motion and pointer interaction

With motion enabled, create a living scene throughout the site: move background layers at different slow rates, pulse and flicker neon light, and give visible decorative elements their own motion. Animate any flames with rising, wavering shapes and any electricity with brief irregular jolts. Keep neon flicker and electrical effects within WCAG 2.2 AA flash thresholds; do not rely on high-contrast strobing. Each displayed waifu remains a static illustration: gently rotate and scale the entire image as a single billboard-like element, without frame-by-frame, facial, limb or other internal character animation. On fine hover pointers, the whole image eases a short distance away as the cursor approaches and returns when it leaves. Keep this character movement especially restrained. Apply a subtle perspective tilt to interface surfaces on pointer movement, like a restrained game card effect, and a soft light that follows the cursor. Use bounded movement and smooth easing; keep interactive hit areas stable and text readable, and do not let decorative layers intercept input.

Possible supporting details include slowly drifting particles, a traveling highlight along a border, or a soft parallax shift between scenery layers. Use them selectively to make the scene feel active without competing with instructions or creating a uniform synchronized pulse.

Ambient animation works without a mouse, including on touch devices. Pointer tracking and proximity effects apply only to hover-capable fine pointers and reset on pointer exit. Provide a visible, keyboard-accessible pause/resume control for ongoing decorative and pointer motion; honor `prefers-reduced-motion` by stopping nonessential effects from the start and keeping them stopped while that preference is active. Pausing must not affect navigation, copy feedback or access to information. Avoid animating critical text itself. Use transform and opacity where practical, limit simultaneous expensive effects, suspend offscreen animation and pause when the page is hidden. Degrade gracefully when JavaScript or graphics assets fail; readable static content remains available.

### Assets, delivery and performance

The only supplied artwork is the flattened reference; there are no isolated illustrations, fonts, or established permissions. Prefer original, appropriately licensed, or CSS/vector artwork, with documented provenance for any third-party asset. Do not extract recognizable characters or logos without rights confirmation. Use responsive optimized imagery, sensible font fallbacks, reserved image space and efficient effects; ensure text appears promptly. Decorative assets can fail without losing information. Test current major desktop and mobile browsers, including clipboard restrictions. A plain HTML/CSS page with progressive JavaScript is proportionate; a framework is not required. Relative URLs must work from both root and repository subpath. If a build is selected, update Pages to publish its output instead of the source root and verify the deployed path; otherwise retain the existing workflow. No server runtime is needed.

Treat every character (waifu) and distinct decorative element, such as a skyline, grid, sun or illustration, as a separate image or independently controllable CSS or SVG element. Compose them in layers rather than baking multiple elements into a single scene. Give each its own responsive positioning, scale and visibility so it can be replaced, moved or hidden without changing its neighbors. A character can remain one cohesive illustration; its internal details need not be split. Characters remain optional, and any selected artwork must meet the provenance requirements above. This modular approach costs more asset preparation than a flattened backdrop but permits responsive composition and reuse.

### Reference classification

- Product information: private access, manual invitation, onboarding and server discovery are adopted independently as needs.
- Visual identity: neon, retro arcade, layered depth and informal gaming personality become the design system above.
- Implementation suggestions: structured data, clipboard and asset optimization are evaluated approaches, not image-derived obligations.
- Mockup-specific: fixed placement, four cards, character count, exact colors, sizes and three-column geometry are not requirements. A layout or decorative motif can be selected on its own merits.
- Unverified: endpoint, all eight records, client-specific procedure, invitation contact and artwork rights require operator or rights-holder confirmation. Their depiction is not evidence of availability or permission.

## Risks / Trade-offs

- [Unconfirmed operations] → Withhold values and explain unavailable information until the operator confirms them; no guessed invitation link.
- [Continuous effects versus readability/performance] → Bound movement and flashing, pause offscreen work and provide motion controls; test on constrained devices and with effects absent.
- [Static data becomes stale] → Keep a single maintainable source and an explicit operator verification and update process; never imply live monitoring.
- [Clipboard access denied] → Report failure and preserve selectable values.

## Migration Plan

Implement and validate on a branch, obtain operator confirmation, publish only confirmed data, then deploy using the Pages workflow. Roll back by redeploying the previous static artifact or reverting the implementation commit; no data migration or network changes are required.

## Open Questions

Which management URL and server records are currently valid, what is the approved invitation contact and exact supported client sequence, and what art is licensed for this use? These are publication dependencies, not assumptions of this design. If contact is unavailable, the site must say so; verify official NetBird installation links and instructions when implementing.

## Traceability

| Goal | Requirements and scenarios | Design and implementation tasks |
| --- | --- | --- |
| Understand offering and navigate | website-experience: Purpose and wayfinding | Journeys; 1.1–1.2, 5.1 |
| Join private network | private-network-onboarding: all requirements | Content and operational source; 2.1–2.2, 5.2 |
| Find trustworthy server details | server-discovery: all requirements | Content model; 2.1, 3.1–3.2, 5.2 |
| Copy and recover | connection-copy: both requirements | Copy; 3.3, 5.3 |
| Use across devices and abilities | website-experience: responsive, accessible, motion and resilience requirements | Visual system and delivery; 4.1–4.3, 5.4–5.5 |
| Recognizable identity | website-experience: identity, artwork and independently adaptable visual elements | Visual system and assets; 4.1–4.3, 5.5 |
| Animated atmosphere and responsive motion | website-experience: animated atmosphere, pointer effects and motion preferences | Motion and pointer interaction; 4.4–4.6, 5.5 |
