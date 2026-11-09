# Design

## Context

The checkout has a single English placeholder displaying the raster, no build dependencies or tests, and a Pages workflow uploading the repository root. There are no current canonical specifications. The former screenshot-oriented specification was converted into historical notes that explicitly remove its authority. See the proposal for intent.

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

Coordinate the motion as one scene. Let slow background drift establish the baseline, use occasional softer neon pulses and traveling border highlights as accents, and reserve brief fire or electrical activity for the illustrated motifs that call for it. Offset the timing of neighboring effects so they feel related without pulsing in lockstep. Slowly drifting particles or a small parallax shift between layers can connect the scene; keep them behind content and limit their density near instructions and server values.

The cursor light and surface tilt should share a restrained response and ease back together when the pointer leaves. Character billboards move less than surrounding scenery; their pointer-induced displacement returns smoothly to the resting position while their gentle ambient transform continues. Use consistent easing and a shared palette of light across sections, while varying intensity to preserve hierarchy: ambient motion remains present throughout, but the area around reading and controls is quieter than decorative margins. Interaction feedback takes precedence over ambient light so hover, focus and copy confirmation are easy to distinguish. Review the whole page in motion at desktop and mobile sizes, including while reading and using controls; adjust or remove any individual effect that competes with the journey.

Ambient animation works without a mouse, including on touch devices. Pointer tracking and proximity effects apply only to hover-capable fine pointers and reset on pointer exit. Provide a visible, keyboard-accessible pause/resume control for ongoing decorative and pointer motion; honor `prefers-reduced-motion` by stopping nonessential effects from the start and keeping them stopped while that preference is active. Make the control's current state clear and prevent resume from overriding that preference. Pausing must not affect navigation, copy feedback or access to information. Avoid animating critical text itself. Use transform and opacity where practical, limit simultaneous expensive effects, suspend offscreen animation and pause when the page is hidden. When JavaScript is unavailable, present static decoration and do not expose a nonfunctional motion control; readable content remains available if graphics assets fail.

### Assets, delivery and performance

The only supplied artwork is the flattened reference; there are no isolated illustrations, fonts, or established permissions. Prefer original, appropriately licensed, or CSS/vector artwork, with documented provenance for any third-party asset. Do not extract recognizable characters or logos without rights confirmation. Use responsive optimized imagery, sensible font fallbacks, reserved image space and efficient effects; ensure text appears promptly. Decorative assets can fail without losing information. Test current major desktop and mobile browsers, including clipboard restrictions. A plain HTML/CSS page with progressive JavaScript is proportionate; a framework is not required. Relative URLs must work from both root and repository subpath. If a build is selected, update Pages to publish its output instead of the source root and verify the deployed path; otherwise retain the existing workflow. No server runtime is needed.

Treat every character (waifu) and distinct decorative element, such as a skyline, grid, sun or illustration, as a separate image or independently controllable CSS or SVG element. Compose them in layers rather than baking multiple elements into a single scene. Give each its own responsive positioning, scale and visibility so it can be replaced, moved or hidden without changing its neighbors. A character can remain one cohesive illustration; its internal details need not be split. Characters remain optional, and any selected artwork must meet the provenance requirements above. This modular approach costs more asset preparation than a flattened backdrop but permits responsive composition and reuse.

### Reference classification

- Product information: private access, manual invitation, onboarding and server discovery are adopted independently as needs.
- Visual identity: neon, retro arcade, layered depth and informal gaming personality become the design system above.
- Implementation suggestions: structured data, clipboard and asset optimization are evaluated approaches, not image-derived obligations.
- Mockup-specific: fixed placement, four cards, character count, exact colors, sizes and three-column geometry are not requirements. A layout or decorative motif can be selected on its own merits.
- Unverified: endpoint, all eight records, client-specific procedure, invitation contact and artwork rights require operator or rights-holder confirmation. Their depiction is not evidence of availability or permission.

### Implementation guide

The following is a concrete path for an implementation agent; equivalent approaches are acceptable if they satisfy the specifications.

1. **Static structure.** Replace the placeholder with a Portuguese document (`lang="pt-BR"`), one main landmark and one page-level heading. Add a short introduction, links to `#como-entrar` and `#servidores`, an ordered onboarding section, a directory grouped under game headings, and a footer. Keep the DOM reading order consistent with the visual order. Use relative asset URLs and fragment links, so the same files work under a Pages project subpath.
2. **Content source and output.** Keep verified operational content in a small local data file separate from styling. Each server record has a stable identifier, game, variant, hostname, numeric port and protocol; management URL and invitation contact are separate settings. Maintain verification evidence and date in maintainer documentation, not in user-facing connection fields. Store candidates separately from publishable records. Render publishable records into the delivered HTML at build time; do not fetch data in the browser. A small script with a documented command and no framework is sufficient. If a build is introduced, configure Pages to upload its output and test both local and subpath URLs. Do not commit generated operational values without confirming the operator's source.
3. **Unavailable states.** With no confirmed management URL, display a short Portuguese message that configuration is awaiting confirmation, with no URL or copy control. With no confirmed invitation method, explain that an invitation is manual and contact details are unavailable. With no confirmed servers, show a directory-level unavailable message. Omit an empty game group; never leave a blank panel or imply that a historical record is live. An implementation can be completed and reviewed with these states before operator confirmation; publishing actual connection values requires confirmation.
4. **Directory rendering.** Show game name as a heading and each record as a distinct list item or article. Include variant, complete selectable hostname, port and protocol, with a clear label for each. Records with the same variant need another identifying text, such as their hostname, so controls can be distinguished. Let long hostnames wrap without inserting characters into the underlying value. Construct accessible copy names from the game and hostname; do not place data only in an image, tooltip or color badge.
5. **Copy interaction.** Start with selectable text and no active copy buttons in the unenhanced HTML. When JavaScript initializes, expose a button for each available value. On activation, pass the exact underlying URL or hostname to the clipboard; do not append a port, whitespace or label. Await the result before announcing success. On rejection or unavailable clipboard, show and announce a Portuguese failure message that tells the visitor to select and copy the value manually. Use a nearby polite status region and allow repeated attempts; feedback should not move focus or unexpectedly change layout. A copy control is absent when its value is unavailable.
6. **Layers and responsive behavior.** Use a content layer above independently controlled decorative layers. Separate the stationary hit area from any tilted visual surface; prevent decoration from receiving pointer events. Give each character a positioning wrapper and a separate motion wrapper so responsive placement, ambient transform and pointer displacement compose instead of overwriting one another. Keep body text and connection values stable. Reflow based on available space, wrap long strings, and remove or reposition decoration before it can cover content. At narrow widths retain the visual identity through background and lighting even if character artwork is hidden.
7. **Motion state.** Begin with static CSS. Enable ambient and pointer motion only after enhancement confirms that reduced motion is not requested and the user has not paused it. Distinguish three states: active, user-paused, and reduced-motion; a pause control communicates its current state in Portuguese. In reduced-motion state the control explains that the system preference governs motion and cannot resume it. Listen for preference changes while the page is open; stop immediately when enabled. When disabled again, honor any user pause rather than unexpectedly restarting it. On pointer exit or a switch to touch, reset pointer displacement and tilt. Pause offscreen or hidden-page work without changing the user's chosen pause state; resume only if motion is otherwise allowed.
8. **Visual tuning.** Start with slow scenery drift and gentle, offset neon pulses; add optional particles or border highlights only when they strengthen the same lighting direction. Keep fire and electric effects local to their respective motifs. Character images use only small whole-image rotation, scale and pointer translation; no animated facial features or frame sequences. Use restrained pointer tilt and light with smooth return. Check text contrast at the brightest and darkest point of effects, ensure focus and copy feedback are unmistakable, and verify motion does not shift the hit area or cause page overflow. Respect WCAG flash limits; slow light changes are preferable to rapid flashes.
9. **Verification and handoff.** Exercise the unavailable states and separately use test-only confirmed records with different hostname lengths and variants; remove fixtures from published output. Check clipboard success and denial, keyboard and screen-reader status, touch, 200% zoom, motion pause, a live reduced-motion change, disabled JavaScript, failed assets, and both root and subpath hosting. Review animation on an actual constrained mobile device when available and record any limitation. Document how to update content, verify it with the operator, build, preview and deploy; no live status is inferred from this process.

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
| Understand offering and navigate | website-experience: Purpose and wayfinding | Journeys; 1.1–1.3, 5.1 |
| Join private network | private-network-onboarding: all requirements | Content and operational source; 2.1–2.3, 5.2 |
| Find trustworthy server details | server-discovery: all requirements | Content model; 2.1, 3.1–3.4, 3.7, 5.2 |
| Copy and recover | connection-copy: both requirements | Copy; 3.5–3.6, 5.3 |
| Use across devices and abilities | website-experience: responsive, accessible, motion and resilience requirements | Visual system and delivery; 4.1–4.3, 4.8–4.9, 5.4–5.6 |
| Recognizable identity | website-experience: identity, artwork and independently adaptable visual elements | Visual system and assets; 4.1–4.3, 5.5 |
| Animated atmosphere and responsive motion | website-experience: animated atmosphere, motion hierarchy, pointer effects and motion preferences | Motion and pointer interaction; 4.4–4.10, 5.5 |
