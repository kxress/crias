# Design

## Context

The static site now exists and follows the 1448 × 1086 flattened reference. This follow-up responds to visual review of the sun loop, title contrast and motion, city/grid depth alignment, pointer feedback, and restrained card depth while preserving the accepted composition and confirmed server content. The user confirmed the URL and eight records; their confirmation is sufficient to publish them, but is not a claim of live status.

## Goals / Non-Goals

**Goals:** Refine the existing faithful, living scene with a seamless sun loop, clearer retro title/neon subtitle hierarchy, an aligned city and grid horizon, restrained pointer feedback and card tilt; preserve selectable semantic text, copyable connection data and reduced-motion support.

**Non-Goals:** Accounts, signup, automated invitations, server administration, live status, a marketing landing page, pricing, extra navigation, or inventing a contact handle. Do not ship the mockup as the page or a single flattened background, copy complete CodePen compositions, or add a runtime dependency for visual effects.

## Decisions

### 1. Static source and content

Use a small static HTML/CSS/JS site with a minimal Node build only if needed for data templating. Emit essential text and all eight records as HTML so they remain readable without JavaScript. Store one canonical data file with management URL and ordered records (`game`, `hostname`, `variant`, `port`, `protocol`); render both text and copy targets from the same values. The default deploy artifact must include generated HTML, styles, scripts and assets, and work from root or a repository subpath using relative URLs. Restore a GitHub Pages Actions workflow appropriate for the chosen output. A server runtime or client-only rendering would unnecessarily undermine static hosting and no-script behavior.

Use the Portuguese wording in `docs/mockup-reference.md`: CRIAS GAMES, `SERVIDORES DE JOGOS PRIVADOS`, the two-line intro, the four step titles and explanations, and the directory heading/subtitle. The user later changed the footer label to `Crias 🄯 2026`; use the OpenMoji copyleft artwork and provide its CC BY-SA 4.0 attribution. Preserve the manual invite wording without fabricating Discord IDs, phone numbers, links or contact availability. Port and host values are in the persistent `private-server-access` spec. Any future changes to connection data belong in the canonical source, not multiple handwritten copies.

### 2. Art inventory and composition

Create or source independently controllable, transparent images, one per character, with clean edges and visual traits matching the reference. Check the reference image and detailed descriptions at each stage; do not use a random single anime mascot as a substitute. Record origin and any unresolved reuse rights in an asset manifest; avoid treating a source image's presence as proof of rights. If a usable recognizable asset cannot be created or obtained, mark its asset and verification tasks incomplete and report the blocker instead of substituting generic art or claiming visual fidelity.

| Placement on desktop | Asset identity and identifying composition |
| --- | --- |
| Upper left | Rei Ayanami in a separate tilted pink window labelled `レイ`; Makima; Tifa Lockhart |
| Upper right | Asuka Langley; Nami winking with spiral tattoo; Hayase Nagatoro |
| Left, descending | Kurisu Makise; Faye Valentine; Hinata Hyuga; Rem as separate tall portraits without photo frames |
| Right, descending | Usagi Tsukino in a separate tilted pink window; Aqua; Mayano Top Gun; Super Creek, with their distinctive features and separate silhouettes |
| Left middle | One classical vaporwave bust illustration that already includes its pixel glasses and Ionic column |

Each character portrait, Rei and Usagi Windows-style frame, scene layer, panel border and game illustration must be separately positionable. The statue is a single supplied illustration rather than separately layered pieces. CSS/SVG is appropriate for signs, window trim, lighting and geometric scenery. Raster cutouts are appropriate for character illustrations and detailed card artwork. Use transparent WebP/PNG or SVG with explicit dimensions; increase visible artwork occupancy, preserve each whole silhouette, and use a CSS fade only near the lower interior edge without cropping the sides or cutting off the glow. CSS sizing may be used; if ImageMagick or other pixel processing is used, preserve existing art and save to the next numbered variant. Optimize without blurring distinctive features. Keep game imagery separately controllable from server rows. Do not trace or embed the full mockup into the implementation.

At 1448 × 1086 use the reference's rough layout as a calibration target: hero y=0–410, joining panel y=410–605, directory y=615–1010, footer y=1020–1086; panels about 1100 px wide, directory slightly wider. These are guides, not fixed absolute positions at every viewport. Four horizontal steps and three top/bottom-aligned game cards occupy the center; outer artwork does not overlap text. Use near-black/deep-purple base, pink panel glow, cyan accents and an orange/red striped sun with a restrained animated glow; use reference color suggestions rather than forcing exact sampled pixels. Keep the wordmark as real HTML text with a slanted gradient treatment and visible pulse, retain Japanese neon signs and add small Japanese labels to the hero and panel headings. Pulse the pink neon borders and headings gently, shift the main panels blue/cyan on hover or focus, and let each complete character illustration float softly as a single piece. Keep three equal-sized game cards on desktop and change their outlines to cyan on hover or keyboard focus. Preserve the illustrated lower regions in Minecraft and Hytale cards. Content surfaces need sufficient opacity to prevent portraits showing through rows.

### 3. Responsive scene

Use document flow for content and a separate decorative layer with per-element placement. At wide desktop use the reference collage arrangement, but stagger the left portraits across the upper area and alternate the lower four on a steady vertical rhythm (Kurisu near y=300, followed by Faye, Hinata and Rem). At widths above 1700 px, let only the left group move outward within the bounded collage; keep the right group and central content in place. At intermediate widths shrink margins and artwork before letting text compress. Around tablet size (up to 1099 px), reflow the character collage into a four-column in-flow gallery so it cannot disappear behind the panels; reflow the four steps and cards when their content needs room. On phones stack steps and cards in their original order; redistribute all fourteen separate character images across the hero and between/around sections. Allow extra page height and reserved decorative bands to keep all characters visible at 320 px without covering content; do not hide them or squeeze them into an illegible strip. Breakpoints are starting points, not fixed commitments; use actual available width and test long hostnames.

### 4. Motion and interaction

Treat the page as a layered scene: gentle, slow perspective-grid travel; non-lockstep neon pulses and subtle ambient lighting; independently tunable title, sky, sun, skyline, mountain and other decorative layers. The character illustrations are static single images that can gently move as whole billboards, not frame-by-frame or articulated animation. CSS transforms/opacity are preferred for efficiency; keep effects near content quieter than the scene. Pointer light and surface tilt are approved refinements; Decision 6 defines their limits. They must not displace interactive hit areas.

Use CSS `prefers-reduced-motion` to stop nonessential movement even without JS. When JS is enabled, expose a pause/resume control and apply a shared paused state to every decorative layer; changes to reduced-motion preference must take effect immediately and reduced motion takes precedence over resume. A manual pause survives preference changes for the current visit. Render the control only when functional; no-script text and controls remain usable.

Render the URL and hostnames as selectable text. Progressively add nine accessible copy buttons; copy the URL in full and only the hostname for each server. Use Clipboard API where available, with a fallback or a clear error and selectable text. Announce brief success/failure in a live region, preserve focus, reserve feedback space and allow immediate repeats. Do not put ports into copied hostnames.

### 5. Verification and rollout

Visual review is mandatory, not a checkbox satisfied by automated DOM tests: render the page at 1448 × 1086 and compare side by side with `mockup.png`; check every character, statue, scene layer, logo, four-step panel, three game cards and footer against the reference. Capture mobile at 320, 375 and 430 px, tablet and wide desktop; scroll the full mobile page and count fourteen recognizable characters. Review reduced motion, no script, 200% zoom and keyboard focus; test nine copies including denied clipboard. Use testable browser checks for overflow, full values, copy payloads, and subpath paths, but do not treat them as a visual fidelity substitute. Record screenshots, browser used and actual limitations. Mark tasks incomplete if assets, review or environments are missing.

Build and verify locally before enabling the Pages workflow. Publish only when the user authorizes deployment; a committed workflow may deploy on a future push to the configured branch. To roll back, revert the implementation commit(s) and workflow in Git. No migration of old site content is needed.

### 6. Follow-up motion and pointer depth

Use the references as effect inspiration only: [vaporwave sun](https://codepen.io/stefanbomhof/pen/NWKBJzK), [retro text](https://codepen.io/K1LL3RFR4M3/pen/GRQXXjx), [smokey cursor](https://codepen.io/uiswarup/pen/QwjMRKN), and [Steam card hover](https://codepen.io/nelsonr/pen/WNQaZPb). Keep the existing site composition, content and independent scene layers.

Make the striped sun repeat seamlessly: the stripe animation must travel by exactly one repeat period per iteration, and the pulsing glow must meet at matching start/end values. Keep the glow restrained. Keep `CRIAS GAMES` as actual HTML text; give it a dark separating edge, retro offset color layers and rare restrained glitch/pulse so it reads over the sun without a broad neon bloom. Give the subtitle the prominent neon treatment and its own gentle flicker/pulse.

Define one shared scene horizon for the skyline baseline and the perspective grid origin. The grid begins at that line and is painted behind the city so the city silhouette remains in front while both horizons meet vertically. Preserve the mobile-specific scene positions while keeping this relationship coherent where the layers are shown.

Implement the smokey pointer response as a small, bounded, decorative trail that follows fine-pointer movement, fades promptly and cannot block clicks or create page overflow. Coalesce movement work, cap live trail elements, and avoid external scripts or canvas. Add pointer-tracked light and a subtle 3D card tilt capped at two degrees on desktop game cards; keyboard focus must retain clear focus styling without tilt, and touch layouts must not emulate hover. Pause and reduced-motion states disable the trail, tilt animation and other nonessential motion. Static content and hover/focus color feedback remain usable without JavaScript.

## Risks / Trade-offs

- [Recognizable separate artwork is difficult to obtain or recreate from a flattened mockup] → Work through the asset inventory explicitly, inspect each cutout and provenance, and report missing art rather than downgrade the target.
- [Fourteen illustrations make mobile tall or heavy] → Reserve responsive bands, use compressed appropriately sized assets and explicit dimensions, and review the full scroll rather than hiding characters.
- [Effects compromise legibility or performance] → Keep opaque content surfaces, limit simultaneous expensive blur, honor reduced motion and test on a phone-sized viewport.
- [Build or font assumptions break Pages] → Use relative paths, provide local/fallback fonts, test a repository subpath and no-script output.
