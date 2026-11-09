# Tasks

Implement in dependency order. Read both persistent specs, both change specs, `design.md`, `docs/mockup-reference.md`, and inspect `mockup.png` before work. Do not mark a task complete when its verification or required artwork is missing.

## 1. Static foundation and content

- [x] 1.1 Create static site source and build/preview commands; verify a clean build produces a locally previewable HTML artifact with relative asset URLs.
- [x] 1.2 Create one canonical data source for the confirmed management URL and eight records from the persistent spec; verify count, ordering, variants, ports and protocols against that spec.
- [x] 1.3 Generate semantic Brazilian Portuguese HTML with a main landmark, one primary heading, reference intro, four ordered onboarding steps, three game groups and footer; verify reading order and content with JavaScript disabled.
- [x] 1.4 Render all eight full hostnames and associated variants and ports from canonical data; verify Hytale displays UDP and Terraria/Minecraft show ports without TCP labels.
- [x] 1.5 Document build, local preview and content updates in project documentation; run the commands exactly as documented and verify an updated test record propagates without publishing it.

## 2. Independently controlled reference artwork

- [x] 2.1 Create an asset manifest listing each of the fourteen named characters, statue, scenery and game illustrations with source/generation provenance, transparency and usage status; verify each has a separate addressable element or asset.
- [x] 2.2 Create or source separate reference-matching Rei, Makima and Tifa illustrations; inspect each against `mockup.png` and the detailed reference, including Rei's independently constructed window.
- [x] 2.3 Create or source separate reference-matching Asuka, Nami and Nagatoro illustrations; inspect recognizable traits, separation and crops against the reference.
- [x] 2.4 Create or source separate tall reference-matching Kurisu, Faye, Hinata and Rem illustrations; keep these left portraits unframed for consistency with the right group and inspect identifying traits and clear edges.
- [x] 2.5 Create or source separate reference-matching Usagi, Aqua, Mayano and Super Creek illustrations; inspect Usagi's separate window, each silhouette and the horse ears and distinct features of the last two.
- [x] 2.6 Create or source one unified classical bust illustration that includes pixel glasses and Ionic column; inspect pose, complete silhouette and non-overlap with content.
- [x] 2.7 Create separate sky, striped sunset, skyline, facade/signs, wireframe mountains and grid layers; inspect each at desktop size and verify it can be individually repositioned or disabled.
- [x] 2.8 Create distinct Terraria, Minecraft and Hytale header/landscape artwork, independent of server rows; verify recognizable identities and the illustrated lower areas of Minecraft and Hytale.
- [x] 2.9 Optimize and document assets, explicit image dimensions and font licensing/provenance; verify no merged characters, full-page screenshot, generic substitute, missing artwork, accidental rectangular background or broken asset reference remains.

## 3. Reference layout and responsive composition

- [x] 3.1 Implement the desktop hero, actual slanted gradient text wordmark, cyan underline, subtitle, Japanese decorative labels and intro with independent scenery; compare against the mockup at 1448 × 1086.
- [x] 3.2 Implement the magenta joining panel, globe, divider, four numbered steps, icons, chevrons and cyan URL inset; compare their order, spacing and relative scale against the mockup.
- [x] 3.3 Implement the magenta directory panel, gamepad heading, three equal-sized illustrated cards, ordered rows, badges and copy-control spaces; verify hover changes the card outline to cyan.
- [x] 3.4 Place the fourteen characters and unified bust in their reference desktop groups with separate tall portraits, efficiently sized visible artwork, a late interior bottom fade and no edge cropping; keep Windows frames only on Rei and Usagi and check that artwork does not cover content. If raster processing is used, create the next numbered variant and retain existing files; inspect the character silhouettes and glow at 1448 and 1920 px.
- [x] 3.5 Implement the footer over the continuing grid with computer icon, flanking neon lines and `Crias 🄯 2026`; use and credit the OpenMoji copyleft artwork, then compare position and treatment against the reference.
- [x] 3.6 Implement tablet reflow and mobile stacking with separate artwork placement and reserved space; inspect full pages at 320, 375 and 430 CSS pixels and verify all fourteen characters are visible in normal scroll flow with no horizontal page overflow.
- [x] 3.7 Check full hostnames, text contrast, 200% zoom, keyboard focus and touch target size at narrow and wide widths; correct any clipped, obscured or overlapping content.

## 4. Motion and copy controls

- [x] 4.1 Animate the striped sun with restrained glow, pulse the wordmark, grid and neon panel borders/headings using independent scene layers, and turn the major panels cyan on hover; observe the page during motion and verify readable content and stable controls.
- [x] 4.2 Add independently adjustable gentle whole-image character motion and other subtle scene lighting; verify individual illustrations remain static images with no articulated or frame-by-frame animation.
- [x] 4.3 Implement reduced-motion support and a functional pause/resume control exposed only with scripts; test initial and live preference changes, pause persistence during preference changes, and that all decorative motion stops.
- [x] 4.4 Add nine independently named copy controls from canonical data; test exact URL and each hostname payload, repeat activation and keyboard operation.
- [x] 4.5 Add visible and screen-reader-announced copy success/failure with stable layout and selectable fallback; test clipboard denial and verify focus and values remain unchanged.

## 5. Hosting and integrated review

- [x] 5.1 Add the GitHub Pages workflow for the actual build output and relative paths; verify local root and repository-subpath previews load content and assets without a backend.
- [x] 5.2 Compare a 1448 × 1086 desktop screenshot side by side with `mockup.png`, checking every scene layer, all fourteen named characters, the bust, composition, card art and footer; document discrepancies and fix them before completion.
- [x] 5.3 Capture and inspect full mobile pages at 320, 375 and 430 CSS pixels and a tablet and wide desktop view; document character count, overlaps, reflow, clipping and actual browser/device coverage.
- [x] 5.4 Run build and relevant content/browser checks, including no JavaScript, reduced motion, denied clipboard, zoom, contrast, copy payloads and subpath hosting; record commands and honest limitations.
- [x] 5.5 Review the asset manifest and remaining incomplete tasks; report any missing recognizable artwork, unresolved rights or untested environments instead of marking the change complete.

## 6. Follow-up motion and depth refinement

- [x] 6.1 Align the desktop perspective-grid origin to the skyline baseline and layer the grid behind the city; verify both horizons meet at 1448 × 1086 and 1920 × 1080.
- [x] 6.2 Make the striped sun loop over an exact stripe-repeat period with matching glow endpoints; inspect several consecutive loops for jumps, pops or excessive glow.
- [ ] 6.3 Restyle the actual-text `CRIAS GAMES` wordmark with higher separation from the sun and a restrained retro offset/glitch treatment; move the prominent neon flicker to `SERVIDORES DE JOGOS PRIVADOS` and verify legibility at desktop and mobile sizes.
- [x] 6.4 Add a fine-pointer-only smoke-like light trail with bounded, short-lived elements; verify it follows desktop pointer movement without blocking clicks, shifting layout or overflowing the page.
- [x] 6.5 Add pointer-tracked lighting and a game-card tilt capped at two degrees on desktop; verify cards remain readable, keyboard focus stays clear, and touch does not emulate hover.
- [ ] 6.6 Recheck all new effects with motion active, paused, reduced, and JavaScript unavailable; capture and visually inspect desktop and wide-desktop screenshots, then run the build and relevant browser checks before marking these tasks complete.

## 7. Streamlined hero and floating controls

- [ ] 7.1 Remove the two-line hero intro from rendered HTML; verify the heading/subtitle remain centered and the same guidance remains available in the joining steps and directory.
- [ ] 7.2 Place the sun behind the city skyline while preserving the shared skyline/grid horizon; verify the layer order and composition at desktop and wide-desktop sizes.
- [ ] 7.3 Move the pause control to a floating viewport-side position; verify it remains keyboard-operable while scrolling and does not cover text, artwork or copy controls at desktop and narrow widths.
- [ ] 7.4 Move copy success/error feedback to a brief bottom-of-viewport toast; verify repeated copies, clipboard failure, screen-reader announcements, focus, and zero panel/page layout shift.
- [ ] 7.5 Run the build and recheck no-JavaScript, reduced-motion, pause, responsive, and subpath behavior; capture and inspect final desktop screenshots before marking visual tasks complete.
