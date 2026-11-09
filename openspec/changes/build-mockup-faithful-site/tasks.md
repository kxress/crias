# Tasks

Implement in dependency order. Read both persistent specs, both change specs, `design.md`, `docs/mockup-reference.md`, and inspect `mockup.png` before work. Do not mark a task complete when its verification or required artwork is missing.

## 1. Static foundation and content

- [x] 1.1 Create static site source and build/preview commands; verify a clean build produces a locally previewable HTML artifact with relative asset URLs.
- [x] 1.2 Create one canonical data source for the confirmed management URL and eight records from the persistent spec; verify count, ordering, variants, ports and protocols against that spec.
- [x] 1.3 Generate semantic Brazilian Portuguese HTML with a main landmark, one primary heading, reference intro, four ordered onboarding steps, three game groups and footer; verify reading order and content with JavaScript disabled.
- [x] 1.4 Render all eight full hostnames and associated variants and ports from canonical data; verify Hytale displays UDP and Terraria/Minecraft show ports without TCP labels.
- [x] 1.5 Document build, local preview and content updates in project documentation; run the commands exactly as documented and verify an updated test record propagates without publishing it.

## 2. Independently controlled reference artwork

- [ ] 2.1 Create an asset manifest listing each of the fourteen named characters, statue, scenery and game illustrations with source/generation provenance, transparency and usage status; verify each has a separate addressable element or asset.
- [ ] 2.2 Create or source separate reference-matching Rei, Makima and Tifa illustrations; inspect each against `mockup.png` and the detailed reference, including Rei's independently constructed window.
- [ ] 2.3 Create or source separate reference-matching Asuka, Nami and Nagatoro illustrations; inspect recognizable traits, separation and crops against the reference.
- [ ] 2.4 Create or source separate reference-matching Kurisu, Faye, Hinata and Rem illustrations and independent tilted frames; inspect identifying traits and clear edges against the reference.
- [ ] 2.5 Create or source separate reference-matching Usagi, Aqua, Mayano and Super Creek illustrations; inspect Usagi's separate window, each silhouette and the horse ears and distinct features of the last two.
- [ ] 2.6 Create or source the classical bust, pixel glasses and Ionic column as separately adjustable pieces; inspect pose, appearance and non-overlap with content.
- [ ] 2.7 Create separate sky, striped sunset, skyline, facade/signs, wireframe mountains and grid layers; inspect each at desktop size and verify it can be individually repositioned or disabled.
- [ ] 2.8 Create distinct Terraria, Minecraft and Hytale header/landscape artwork, independent of server rows; verify recognizable identities and the illustrated lower areas of Minecraft and Hytale.
- [ ] 2.9 Optimize and document assets, explicit image dimensions and font licensing/provenance; verify no merged characters, full-page screenshot, generic substitute, missing artwork, accidental rectangular background or broken asset reference remains.

## 3. Reference layout and responsive composition

- [ ] 3.1 Implement the desktop hero, actual text wordmark, cyan underline, subtitle and intro with independent scenery; compare their position, colors and scale against the mockup at 1448 × 1086.
- [ ] 3.2 Implement the magenta joining panel, globe, divider, four numbered steps, icons, chevrons and cyan URL inset; compare their order, spacing and relative scale against the mockup.
- [ ] 3.3 Implement the magenta directory panel, gamepad heading, three differently colored illustrated cards, ordered rows, badges and copy-control spaces; compare against the mockup at desktop width.
- [ ] 3.4 Place the fourteen characters and bust in their reference desktop groups with separately adjustable artwork and frames; inspect all crops and verify they do not cover text, controls or one another's essential features.
- [ ] 3.5 Implement the footer over the continuing grid with computer icon, flanking neon lines and `crias.games`; compare position and treatment against the reference.
- [ ] 3.6 Implement tablet reflow and mobile stacking with separate artwork placement and reserved space; inspect full pages at 320, 375 and 430 CSS pixels and verify all fourteen characters are visible in normal scroll flow with no horizontal page overflow.
- [ ] 3.7 Check full hostnames, text contrast, 200% zoom, keyboard focus and touch target size at narrow and wide widths; correct any clipped, obscured or overlapping content.

## 4. Motion and copy controls

- [ ] 4.1 Animate the grid slowly and add coordinated neon pulses using independent scene layers; observe the page during motion and verify readable content and stable controls.
- [ ] 4.2 Add independently adjustable gentle whole-image character motion and other subtle scene lighting; verify individual illustrations remain static images with no articulated or frame-by-frame animation.
- [ ] 4.3 Implement reduced-motion support and a functional pause/resume control exposed only with scripts; test initial and live preference changes, pause persistence during preference changes, and that all decorative motion stops.
- [ ] 4.4 Add nine independently named copy controls from canonical data; test exact URL and each hostname payload, repeat activation and keyboard operation.
- [ ] 4.5 Add visible and screen-reader-announced copy success/failure with stable layout and selectable fallback; test clipboard denial and verify focus and values remain unchanged.

## 5. Hosting and integrated review

- [ ] 5.1 Add the GitHub Pages workflow for the actual build output and relative paths; verify local root and repository-subpath previews load content and assets without a backend.
- [ ] 5.2 Compare a 1448 × 1086 desktop screenshot side by side with `mockup.png`, checking every scene layer, all fourteen named characters, the bust, composition, card art and footer; document discrepancies and fix them before completion.
- [ ] 5.3 Capture and inspect full mobile pages at 320, 375 and 430 CSS pixels and a tablet and wide desktop view; document character count, overlaps, reflow, clipping and actual browser/device coverage.
- [ ] 5.4 Run build and relevant content/browser checks, including no JavaScript, reduced motion, denied clipboard, zoom, contrast, copy payloads and subpath hosting; record commands and honest limitations.
- [ ] 5.5 Review the asset manifest and remaining incomplete tasks; report any missing recognizable artwork, unresolved rights or untested environments instead of marking the change complete.
