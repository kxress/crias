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
- [x] 2.7 Create separate sky, striped sunset, skyline, text-only Japanese signs, wireframe mountains and grid layers; inspect each at desktop size and verify it can be individually repositioned or disabled.
- [x] 2.8 Create distinct Terraria, Minecraft and Hytale header/landscape artwork, independent of server rows; verify recognizable identities and the illustrated lower areas of Minecraft and Hytale.
- [x] 2.9 Optimize and document assets, explicit image dimensions and font licensing/provenance; verify no merged characters, full-page screenshot, generic substitute, missing artwork, accidental rectangular background or broken asset reference remains.
- [x] 2.10 Pad the twelve active unframed character WebPs and the unified bust on transparent 1280 × 1920 canvases using ImageMagick, save each as its next numbered variant, and update the asset manifest and page references; enlarge and offset their positioned canvases to preserve each current visible silhouette, then inspect all resulting glow edges at 1448 and 1920 px.

## 3. Reference layout and responsive composition

- [x] 3.1 Implement the desktop hero, actual slanted gradient text wordmark, cyan underline, subtitle, Japanese decorative labels and intro with independent scenery; compare against the mockup at 1448 × 1086.
- [x] 3.2 Implement the magenta joining panel, globe, divider, four numbered steps, icons, chevrons and cyan URL inset; compare their order, spacing and relative scale against the mockup.
- [x] 3.3 Implement the magenta directory panel, gamepad heading, three equal-sized illustrated cards, ordered rows, badges and copy-control spaces; verify hover changes the card outline to cyan.
- [x] 3.4 Place the fourteen characters and unified bust in their reference desktop groups with separate tall portraits, efficiently sized visible artwork, a late interior bottom fade and no edge cropping; keep Windows frames only on Rei and Usagi and check that artwork does not cover content. If raster processing is used, create the next numbered variant and retain existing files; inspect the character silhouettes and glow at 1448 and 1920 px.
- [x] 3.5 Implement the footer over the continuing grid with computer icon, flanking neon lines and `Crias 🄯 2026`; use and credit the OpenMoji copyleft artwork, then compare position and treatment against the reference.
- [x] 3.6 Implement tablet reflow and mobile stacking with separate artwork placement and reserved space; inspect full pages at 320, 375 and 430 CSS pixels and verify all fourteen characters are visible in normal scroll flow with no horizontal page overflow.
- [x] 3.7 Check full hostnames, text contrast, 200% zoom, keyboard focus and touch target size at narrow and wide widths; correct any clipped, obscured or overlapping content.

## 4. Motion and copy controls

- [x] 4.1 Give every visible neon accent a perceptible glow pulse and restrained occasional flicker, including scene lines, Japanese labels, panel/card borders, headings, icons, badges, chevrons, copy frames and footer ornaments; on hover or keyboard focus, switch every pink neon detail in either main panel to cyan while pulses continue; verify readable text, stable controls and reduced-motion behavior.
- [x] 4.2 Add independently adjustable whole-image character motion with visible gentle rotation and scale cycles; verify illustrations remain single static images with no articulated or frame-by-frame animation.
- [x] 4.3 Keep reduced-motion behavior and remove the manual pause control; verify motion and fluid smoke stop for an initial and live reduced-motion preference.
- [x] 4.4 Add nine independently named copy controls from canonical data; test exact URL and each hostname payload, repeat activation and keyboard operation.
- [x] 4.5 Add visible and screen-reader-announced copy success/failure with stable layout and selectable fallback; test clipboard denial and verify focus and values remain unchanged.

## 5. Hosting and integrated review

- [x] 5.1 Add the GitHub Pages workflow for the actual build output and relative paths; verify local root and repository-subpath previews load content and assets without a backend.
- [x] 5.2 Compare a 1448 × 1086 desktop screenshot side by side with `mockup.png`, checking every scene layer, all fourteen named characters, the bust, composition, card art and footer; document discrepancies and fix them before completion.
- [x] 5.3 Capture and inspect full mobile pages at 320, 375 and 430 CSS pixels and a tablet and wide desktop view; document character count, overlaps, reflow, clipping and actual browser/device coverage.
- [x] 5.4 Run build and relevant content/browser checks, including no JavaScript, reduced motion, denied clipboard, zoom, contrast, copy payloads and subpath hosting; record commands and honest limitations.
- [x] 5.5 Review the asset manifest and remaining incomplete tasks; report any missing recognizable artwork, unresolved rights or untested environments instead of marking the change complete.

## 6. Follow-up motion and depth refinement

- [x] 6.1 Set the grid to `perspective(280px) rotateX(80deg)`, fade it into the skyline horizon, add a low fog fade where the skyline meets the ground, and confine stars to the sky; verify horizon alignment, no ground stars, and the blend at desktop and wide-desktop sizes.
- [x] 6.2 Make the striped sun loop over an exact stripe-repeat period with matching glow endpoints; inspect several consecutive loops for jumps, pops or excessive glow.
- [x] 6.3 Style the actual-text `CRIAS GAMES` title as the supplied layered retrowave chrome with a pulsing glow/glint; preserve the cursive subtitle treatment with the updated `SERVERS PRIVADOS` wording and verify both at desktop and mobile sizes.
- [x] 6.4 Replace the slow puff/CPU trail with a WebGL2 stable-fluid solver: advect pink/cyan dye, solve pressure and vorticity at reduced render/simulation resolutions, inject on the first movement, and sleep when clear; layer it above waifus/scenery but below title, Japanese signs, and UI panels, using DOM stacking with no rectangular mask cutouts; verify responsive motion, crisp text, no blocked input/layout shift/overflow, and no reduced-motion rendering.
- [x] 6.5 Replace the two-degree card tilt with pointer-position-controlled Steam-style perspective, brightness and specular light; reach at least six degrees on each axis (3× the prior cap) and a small hover lift/scale, then verify readability, keyboard focus and no touch hover.
- [x] 6.6 Recheck all new effects with motion active, reduced, and JavaScript unavailable; capture and visually inspect desktop and wide-desktop screenshots, then run the build and relevant browser checks before marking these tasks complete.

## 7. Streamlined hero and feedback

- [x] 7.1 Remove the two-line hero intro from rendered HTML; verify the heading/subtitle remain centered and the same guidance remains available in the joining steps and directory.
- [x] 7.2 Reduce the striped sun to 75% of its current diameter, raise its visible lower edge about 260px above the shared skyline horizon, and reserve more open sky for the sun and wireframe mountains; put Japanese signs in front of the city and use normal CSS opacity/filter compositing; verify the composition at desktop and wide-desktop sizes.
- [x] 7.3 Remove the floating pause control and all of its styles/handlers; verify no visible or inert pause control remains at desktop and narrow widths.
- [x] 7.4 Keep copy success/error feedback in a brief bottom-of-viewport toast outside the main/footer stacking contexts so it renders above the copyleft label; verify footer-visible copies, repeated copies, clipboard failure, screen-reader announcements, focus, and zero panel/page layout shift.
- [x] 7.5 Run the build and recheck no-JavaScript, reduced-motion, responsive, and subpath behavior; capture and inspect final desktop screenshots before marking visual tasks complete.
