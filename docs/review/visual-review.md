# Visual and functional review
## Side-column pairing — 2026-11-10

Raised Kurisu by 24px, Faye by 16px and Hinata by 8px relative to their previous positions, leaving Rem fixed. The right column remains fixed as the alignment reference. The descending spaces now pair more closely from Kurisu/Usagi through Hinata/Mayano, with the final Rem/Super Creek pair left intact.

[1448px desktop capture](screenshots/side-column-pairing-1448-2026-11-10.webp) · [1920px desktop capture](screenshots/side-column-pairing-1920-2026-11-10.webp)

## Upper silhouette and side-column balance — 2026-11-10

Kept Tifa in place as the upper-group anchor, lowered Asuka by 16px and raised Nami by 8px to bring their visible fade baselines into closer alignment without forcing identical CSS top values. Moved all eight side-column portraits down 12px while preserving their outer offsets. Both desktop captures show complete illustrations and no horizontal overflow.

[1448px desktop capture](screenshots/portrait-baseline-balance-1448-2026-11-10.webp) · [1920px desktop capture](screenshots/portrait-baseline-balance-1920-2026-11-10.webp)

## Follow-up portraits, card borders and mountain wireframes — 2026-11-10

Moved the six upper portraits another 16px up and all eight side portraits another 32px up. The lowest two on each side now move outward from 4px at the 1448px composition to 32px at 1920px, based on available outer gutter. Complete artwork and glow remain visible, all character images loaded, and neither desktop capture overflowed horizontally.

All three game-card borders are pink at rest and switch to cyan together when the SERVIDORES panel is hovered or contains keyboard focus. Browser inspection returned the same idle and active border colors for all three cards at both desktop widths. The mountain vectors now use asymmetric peaks, irregular terrain contours and uneven triangulation behind the opaque city.

[1448px desktop capture](screenshots/portrait-border-mountain-1448-2026-11-10.webp) · [1920px desktop capture](screenshots/portrait-border-mountain-1920-2026-11-10.webp) · [1448px hover state](screenshots/portrait-border-mountain-hover-1448-2026-11-10.webp)


## Invite and Minecraft map — 2026-11-10

Desktop captures at 1448 × 1086 and 1920 × 1080 show the updated Kress/Discord/Telegram wording and a compact BlueMap link beneath the three Minecraft server rows. The link opens the supplied destination in a new tab, follows the pink/cyan card interaction state and remains keyboard-accessible and available without JavaScript. Chromium checks confirmed the eight server rows, nine original copy values, equal card dimensions and repository-subpath rendering; the existing Tifa experiment remained available at port 4173.

## Wireframe mountains, clouds and sun — 2026-11-10

The earlier repeated cone outlines are now irregular, differently shaped alpine ridges with a connected cyan/violet triangular mesh. Both ranges stay in the side corners, clear of the sun, and behind the opaque city. The clouds were subsequently replaced with separate anime-cumulus sprites; see the latest sprite review below. The desktop sun lift is 116px, about 32px lower than before. The [1448px capture](screenshots/scene-retrowave-1448-2026-11-10.webp) and [1920px capture](screenshots/scene-retrowave-1920-2026-11-10.webp) show the earlier cloud revision. Browser review confirmed the mountain/city order, and the software-renderer fallback or reduced motion keeps cloud animation disabled.

## Desktop portrait spacing — 2026-11-10

Raised the six portraits above the panels by 16px and the eight side-column portraits by 32px. Moved the four lowest side portraits outward until they retain visible room for the complete silhouette and glow at the page edges. The [1448px capture](screenshots/portrait-spacing-1448-2026-11-10.webp) and [1920px capture](screenshots/portrait-spacing-1920-2026-11-10.webp) were inspected; all portrait images loaded and neither desktop viewport overflowed horizontally.

## Character hand revisions — 2026-11-10

The replacement Tifa was inspected at full size and in static desktop captures at 1448 and 1920 CSS pixels: her existing guard pose, independent placement and lower fade remain intact, and her open glove has four fingers and a distinct thumb. The padded WebP's center matched the PNG master pixel-for-pixel. Chromium on Windows loaded the art without horizontal overflow or page errors; mouse hover and jump, nine copy controls, reduced motion and repository-subpath behavior passed the local Playwright checks. The full-size and site inspections in this pass used screenshots on desktop; no mobile redesign was performed.

The Nagatoro replacement was inspected at full size, including a close-up of the corrected raised hand, and in desktop captures at 1448 and 1920 CSS pixels. Her expression, pose, transparent margins, lower fade and position remain coherent with the scene. A browser pixel search found a clickable point on all 18 illustrations, including the new Nagatoro; the static graphics fallback and live reduced motion also passed. The active WebP scales the preserved transparent master proportionally to the existing 1280 × 1920 footprint.

The Aqua replacement was inspected at full size and in a close-up of both hands, then in desktop captures at 1448 and 1920 CSS pixels. Her hip hand now has four separate fingers visible while the raised pointing gesture and cheerful pose remain. The proportionally scaled WebP keeps the previous visible bounds, transparent clearance and CSS fade. Playwright mouse input confirmed hover and click reactions for Tifa, Nagatoro and Aqua; all 18 illustrations remained individually clickable, with no browser errors or horizontal overflow. The animated branch was exercised using simulated hardware identification; actual SwiftShader remained static.

## Portrait reactions — 2026-11-10

All fourteen original portraits and four footer characters use their visible silhouette, or their separate window frame, for pointer entry and primary clicks. The reaction adds an eased left-right wiggle or squash-and-stretch jump to the existing whole-image billboard motion. Transparent padding remains pointer-inert and the panels, links and copy controls retain priority. The 1448 × 1086 hover, airborne Tifa and airborne Shantae screenshots were visually inspected locally; the movements preserve the composition and do not shift the page.

Playwright 1.65 / Chromium 158 on Windows used a simulated hardware-identification response to exercise the animated branch. A pixel search found a clickable point on each of the 18 portraits, including both frames; real mouse input verified Tifa, a framed portrait and a footer portrait, repeated clicks, a transparent corner and all nine copy controls. Initial and live reduced motion suppress or cancel reactions. Actual SwiftShader rendering selected the static fallback and did not start the reactions. A separate Paseo Chrome 152 / Electron 44 check on an NVIDIA RTX 4070 SUPER at 1920 × 1080 confirmed a portrait jump with actual hardware acceleration. The repository subpath supported the reaction with scripts enabled and remained readable with scripts disabled. No browser errors or layout changes were observed. Firefox, Safari and physical low-end devices were not tested during this interaction pass.

## Smoke stacking and graphics fallback — 2026-11-10

The fluid canvas remains above the scenery and now sits behind the fourteen original portraits, their two window frames, the four footer characters, statues, title, signs, panels and controls. The [active-fluid capture](screenshots/smoke-behind-characters-1448.png) was visually inspected at 1448 × 1086. A separate temporary solid-color canvas diagnostic was inspected at the top and footer: the character silhouettes, frames and interface remained in front of the diagnostic color while the scene remained behind it. The canvas has `pointer-events: none`; keyboard activation copied the management URL correctly, with no horizontal overflow or page errors.

The page starts in a static state before the stylesheet loads. An offscreen WebGL2 probe requests `failIfMajorPerformanceCaveat`, checks for the float-buffer extension and rejects known software renderer names. It releases the probe without drawing and does not persist or transmit renderer information. If WebGL2 is unavailable, renderer details are hidden, or a software renderer is detected, the site leaves CSS animations, transitions, fluid initialization and pointer-driven card motion disabled. Ordinary color/focus feedback and copy controls remain available. A lost WebGL context also returns the page to the static state and clears active card effects. The [static fallback capture](screenshots/static-no-gpu-1448.png) was visually inspected.

Playwright 1.65 / Chromium 158 on Windows exercised actual SwiftShader software rendering, simulated WebGL2 unavailability, privacy-blocked renderer information and missing float-buffer support. Each made one unattached capability probe, created no fluid canvas, scheduled no animation frames from pointer events, kept 14 original and four footer portraits, preserved cyan hover feedback and copied the management URL by keyboard. The repository subpath and no-JavaScript fallback also loaded. A hardware-identification simulation exercised the animated branch, pointer smoke, card tilt, initial/live reduced motion and real WebGL context loss; the latter stopped animation, removed the canvas and cleared tilt. An interactive Paseo Chrome 152 / Electron 44 check on an NVIDIA RTX 4070 SUPER confirmed that actual hardware enables the canvas and animation and that the canvas is behind the collage. Its inactive tab did not produce a screenshot; the effect capture used the headless test browser before enabling the fallback.

This is deliberately conservative, not a perfect hardware test: browsers can hide renderer details, and the site then stays static even on a capable GPU. Chromium has also allowed a software WebGL context despite the performance-caveat flag, so the renderer check is needed in addition to that flag. See the [Khronos WebGL specification](https://registry.khronos.org/webgl/specs/latest/1.0/), [Khronos renderer-information extension](https://registry.khronos.org/webgl/extensions/WEBGL_debug_renderer_info/) and [Chromium issue 437337131](https://issues.chromium.org/issues/437337131). No Firefox/Safari or physical low-end device was tested in this pass.

## Final desktop montage and outfit review — 2026-11-10

This section records the current implementation. The earlier captures below document preceding revisions. The latest user montage, rather than its pasted editing rectangles or superseded footer costumes, determines the vertical arrangement. The original `mockup.png` remains the visual reference for the retrowave composition; the user's later decisions take precedence where they differ.

| CSS viewport (DPR 1) | Full document | Original / new characters | Result |
| --- | --- | --- | --- |
| 1448 × 1086 | 1448 × 1577 | 14 / 4 | No horizontal overflow; all 24 raster images loaded. Joining panel y=623.58, 48px below the city base. |
| 1920 × 1080 | 1920 × 1573 | 14 / 4 | Same bounded 1448px portrait composition and 347 × 318px game cards. Joining panel y=620.39, 48px below the city base. |

The full pages, motion captures and comparisons were visually inspected. The fourteen original portraits now sit about 200px lower together: upper groups start around y=365–395, Kurisu near y=670, and the columns continue to Rem/Super Creek near y=1210/1200. This preserves the exposed center of the city and accompanies the lowered panels. Portraits retain their separate silhouettes, transparent glow margins and interior CSS bottom fades; no decorative image obscures text or controls. The two instances of the integrated bust/glasses/column asset flank the centered footer signature, with the right instance mirrored in CSS.

Shantae's selected cutout follows the supplied Swimsuit Special drawing, including its hands-behind-head pose, purple/black ponytail, white shirt, pink/white swimwear and blue/white shorts. The baked smoke/background glow is removed. Marie Rose follows the supplied anime drawing and blue bodysuit, separate arm gloves, white frills, red bow and reaching peace sign. Oguri Cap's rice bowl, funny eating face and Tamamo Cross's reaction remain independent chibi illustrations. All four were inspected individually and in the page. The selected lossless WebPs have genuine alpha and generous transparent margins; comparison with their fitted/padded masters found zero changed pixels. Every initial and intermediate numbered version is retained. See [asset provenance](../footer-character-art.md), [exact revision prompts and final selections](../footer-art-revisions.md), and the [archived user references](references/).

The game cards each use a single continuous screenshot behind their title and separately boxed server rows. All three are equal in size, with the real 4/3/1 record distribution, seven release/modpack links and nine copy targets. The city remains fully opaque with normal blending; mountains and the striped sun stay behind it, Japanese signs above it. The sky, sun, city, grid, structural windows, all eighteen characters, statues, joining panel, cards and footer were included in the visual review.

Current visual evidence:

- Full pages: [1448px](screenshots/desktop-final-montage-1448.png), [1920px](screenshots/desktop-final-montage-1920.png).
- Exact requested viewports: [1448 × 1086](screenshots/desktop-final-viewport-1448.png), [1920 × 1080](screenshots/desktop-final-viewport-1920.png).
- A different live animation phase: [1448px](screenshots/desktop-motion-1448.png), [1920px](screenshots/desktop-motion-1920.png).
- Side-by-side reviews: [original mockup/current viewport](screenshots/mockup-final-comparison.png), [latest dragged montage/current full page](screenshots/montage-final-comparison.png).
- [Final footer cutouts](screenshots/footer-characters-final.png), [no-JavaScript page](screenshots/desktop-nojs-1448.png), and [copy error toast with footer visible](screenshots/copy-error-footer-1448.png).

The [browser results](desktop-checks-2026-11-10.json) record eleven passing check groups. All nine copy controls were activated by native Enter/Space input, their actual browser clipboard contents matched the canonical URL/hostnames, and focus was retained. Tab navigation and visible focus were checked. Clipboard rejection, missing Clipboard API with legacy success/failure, and manual selection of the complete management URL were exercised. Error feedback was announced through the existing live region; the floating toast rendered above the footer, without signature overlap or document-height shift. Essential values and all eighteen illustrations remained available with JavaScript disabled at both `/` and `/crias-games/`.

Motion checks sampled changing portrait rotation/scale, neon shadows and sun stripe positions. Card hover produced about 5° of tilt on each axis, and its badge changed to cyan; keyboard focus cleared pointer tilt. A live reduced-motion preference change stopped CSS animations and scheduled animation-frame activity after settling; an initially reduced-motion page did not create the fluid canvas. Root and repository-subpath experiment indexes and the Tifa demo returned HTTP 200, retained loaded artwork and an active WebGL context, and produced no page errors. The earlier 240-request concurrent-rebuild check below remains applicable to the unchanged publishing code.

`npm run build` passed with all eight server records. Strict OpenSpec validation passed with zero issues. The latest review used Playwright 1.65.0 / Chromium 158.0.8127.18 on Windows at DPR 1; an interactive Paseo Chrome 152.0.7977.76 / Electron 44.2.0 check also confirmed the live page/demo. There was no current Firefox/Safari, physical-device, assistive-technology or separate 200% browser-zoom pass. Mobile design and mobile review were intentionally excluded from this session at the user's request; older coverage below is historical. The project has no separate test command beyond its build.

There is no unresolved required illustration or known overlap in this desktop revision. Artwork provenance does not confer reuse rights: franchise images remain copyrighted, and the Terraria screenshot's third-party reuse permission is unverified, as recorded in the [game-art provenance](../game-card-art-provenance.md). Google Fonts remain an external font dependency. The local site is available on port 4173 and port 4174 is stopped. No deployment was performed.

## Earlier desktop montage and first footer assets — 2026-11-10

The subsequent skyline spacing correction was captured in `screenshots/city-clearance-1448.png` and `screenshots/city-clearance-1920.png`, both visually inspected. The joining panel starts at y=623.58 and y=620.39 respectively, exactly 48px below the corresponding city bases (575.58 and 572.39). The city/sun coordinates are unchanged; lower buildings remain exposed above the joining panel. Page heights are 1577px and 1573px with no horizontal overflow. These captures precede the user's newest request to move the fourteen portraits down by roughly 200px to accompany the panels.

Full-page captures `screenshots/montage-desktop-1448-full.png` and `screenshots/montage-desktop-1920-full.png` were visually inspected at their native sizes. Both retain the fourteen original portraits and add four separate footer illustrations, with two instances of the integrated statue near the centered signature. The upper characters begin near y=165–195; side columns descend from Kurisu near y=470. The collage is bounded to 1448px so the wider viewport does not push the characters away from the panels. The document was 1393px tall and had no horizontal overflow; every raster image loaded. Footer text and controls remain unobscured.

The four generated masters were inspected individually and together in `screenshots/footer-character-contact-sheet.png`; each has genuine alpha. Padded lossless WebP derivatives matched their resized, centered PNG sources with zero changed pixels. At this stage artwork task 8.4 was held open for the newly supplied outfit references, and the lower-panel correction was pending. Both are resolved in the final review above; these captures preserve the preceding layout and initial outfits.

## Preview availability and demos — 2026-11-10

The live preview at `http://localhost:4173/` and the existing Tifa experiment returned HTTP 200. The experiment is preserved at `/experiments/tifa-physics/`; a new `/experiments/` index links to it and back to the site. Both routes and their relative assets also work under `/crias-games/`. Port 4174 was not listening.

The build now publishes complete files by temporary-file rename, publishes the main HTML last, and cleans obsolete output only after success. A rebuild probe made 240 requests across the site, stylesheet, experiment index, Tifa HTML/CSS/JS and repository-subpath routes during a concurrent build: every response was HTTP 200 and nonempty. An obsolete probe file was correctly removed after the build.

The Tifa demo was visually inspected in `screenshots/demo-tifa-1280.png` (1280px viewport, full page) using Playwright 1.65.0 on Windows. An interactive Paseo Chrome 152 / Electron 44 check confirmed the artwork loaded, WebGL context remained active, the canvas rendered, and no console errors appeared. The demo's controls and artwork remain intact. No physical device or alternate browser engine was used.

## Follow-up review — 2026-11-10

### Continuous card correction

The current three cards use `terraria-background-1.webp`, `minecraft-background-1.webp` and `hytale-background-1.webp` as single complete backdrops. The split header/lower images and generated Hytale landscape are absent from rendered HTML. `screenshots/cards-continuous-1448.png` was visually inspected: the screenshots remain continuous behind dark individual rows, with no separate server-list fill or frame. The Hytale forest/tower fills the whole card, and Minecraft shows the official mountain/cherry landscape.

Playwright Chromium 158.0.8127.18 at 1448 × 1086 confirmed all three cards are 347 × 318px, each has one loaded full-size image, the row counts are 4/3/1, all nine copy payloads match canonical data, and all seven badge links retain their specified destinations. No horizontal page overflow was present. Earlier split-image descriptions below document the preceding revision, not this corrected implementation.

The desktop scene and game cards were recaptured and inspected after the latest layer and artwork updates. Exact screenshots are saved at `screenshots/sun-horizon-1448x1086.png` and `screenshots/sun-horizon-1920x1080.png`. They were captured with Playwright 1.65.0 on Windows at DPR 1. An interactive browser check ran in Paseo's Electron 44.2.0 / Chrome 152.0.7977.76 at 1448 × 1086; its 22 raster images all loaded. No physical device or second browser engine was used, and mobile was intentionally not reviewed again per the user's instruction.

The full desktop composition and all fourteen character illustrations are visible in both captures. All three game cards are 318px tall. The Minecraft lower card area now uses `minecraft-landscape.webp`, an official Mojang world screenshot; its former CSS green block bars and CSS scenery background are gone. Hytale keeps its separate lower environment illustration. Terraria uses its screenshot only in the header so the same forest band is not repeated beneath its rows. The header titles are compact, upright white lettering over the art; individual server rows keep their own dark fill and fine border while the list wrapper stays transparent. All seven release/modpack badge links resolve to their specified pages; idle badges are pink and the hovered Minecraft badge switches to cyan.

The scene check confirmed the sun's `inset(0px 0px 25%)` clip, roughly 148px desktop lift, no box-shadow or neon pulse, normal city blending at 100% opacity, mountains behind the city, Japanese scene signs above it, no lagoon layer, and no broken images. The skyline/grid baseline remains shared. Current screenshots were visually reviewed for the sun, mountains, clouds, city, portraits/statue, joining panel, all game cards and footer.

The latest refinement keeps the `.server-list` wrapper transparent and borderless while retaining dark individual `.server-row` panels with thin borders, matching the supplied card-design example. The sun's upper half is solid and its animated transparent stripes start at the disc midpoint. The integrated bust image now appears at both lower footer sides; the right instance uses `scaleX(-1)`. Full-page captures show both complete statues flanking the centered footer without crossing card panels or footer text. At 1920 × 1080 the content extends to 1238px to accommodate the lower decorations, so the full-page capture is used to inspect them; the viewport capture shows their upper portion at the fold. The desktop document has no horizontal overflow.

Final screenshots: `screenshots/sun-horizon-1448x1086.png`, `screenshots/sun-horizon-1920x1080.png`, `screenshots/desktop-full-1448.png`, and `screenshots/desktop-full-1920.png`.

Reviewed on 2026-11-09 in Microsoft Edge 140.0.3485.54 on Windows, using Chromium CSS viewport emulation at device scale factor 1. No physical phone, tablet or other browser engine was tested. The project provides `npm run build` and `npm run preview`; it has no separate automated test suite.

## Captures and layout

Follow-up polish recalibrates portrait fades to the visible artwork inside the padded canvases, pulses panel heading rules without an inset glow, and limits wireframe mountains to the side corners so they do not cross the sun. These refinements were checked in the live desktop browser at 1448 × 1086 and wide desktop at 1920 × 1080.

| View | CSS viewport | Captured page | Character count | Result |
| --- | ---: | ---: | ---: | --- |
| Desktop | 1448 × 1086 | 1448 × 1086 | 14 | Main composition reviewed against the reference. The latest comparison places `mockup.png` on the left and the balanced left group on the right. |
| Tablet landscape | 1024 × 1080 | 1009 × 2127 | 14 | Portrait gallery reflows before the panels, so all characters remain visible in normal flow; no horizontal overflow. The 15 px difference is the emulated browser scrollbar. |
| Desktop | 1280 × 1080 | 1280 × 1080 | 14 | The left portrait cadence and central content checked at an intermediate desktop width. |
| Wide desktop | 1920 × 1080 | 1920 × 1080 | 14 | Left group moves outward within the bounded collage; the right group stays unchanged and panels remain centered. |
| Tablet | 900 × 1080 | 885 × 2113 | 14 | Full page captured. The viewport is 900 CSS px; the document's 885 px scroll width reflects the browser scrollbar. Portraits reflow in four columns, steps and cards reflow to two columns, and Hytale occupies the full card row. |
| Mobile | 320 px wide | 320 × 2666 | 14 | Full page captured; no horizontal overflow. |
| Mobile | 375 px wide | 375 × 2684 | 14 | Full page captured; no horizontal overflow. |
| Mobile | 430 px wide | 430 × 2732 | 14 | Full page captured; no horizontal overflow. |

The desktop comparison shows the same broad scene structure: title and sunset, layered skyline and perspective grid, character groups, central joining panel, three illustrated game cards, and footer. The portraits and game art are separate assets. The final art is generated from the reference crops, so poses and silhouettes are recognizable interpretations rather than pixel-matched copies. Three equally sized game cards and the tablet/mobile portrait gallery are deliberate responsive refinements from the mockup. The four left-side portraits now start at y≈300, 478, 662 and 846 px at the reference size, matching the right group’s steady vertical rhythm; their horizontal offsets alternate slightly. At 1920 px the left group shifts outward while the right group remains unchanged. No portrait is hidden on mobile or cropped at its side edges; the CSS fade is limited to the bottom of the desktop portraits.

The 2026-11-09 follow-up recaptured the current scene in Edge at 1448 × 1086 and 1920 × 1080. The expanded sky, raised smaller sun, wireframe mountain layer, skyline fade into ground fog, star boundary, full portrait glows and panel layout were visually inspected at both sizes. The captures were reviewed in the live browser session but not exported; the screenshot files listed above are the earlier saved baseline captures. The current toast was also rendered over the visible footer and inspected after success and failure; its bottom offset clears the footer by 12 px without changing document height.

The 2026-11-09 scene correction removes the rejected lagoon/reflection layer and lowers the striped sun into the upper city silhouette. Mobile was intentionally not reviewed again in that pass, following the session-wide direction.
Screenshots reviewed:

- `screenshots/comparison-final-kress-2026-11-09.png` — reference and final desktop side by side at 1448 × 1086.
- `screenshots/desktop-final-kress-1448x1086.png` and `screenshots/wide-final-kress-1920x1080.png`.
- `screenshots/tablet-final-kress-900-full.png` and `screenshots/tablet-final-kress-1024-full.png` — full tablet documents.
- `screenshots/mobile-final-kress-320-full.png`, `screenshots/mobile-final-kress-375-full.png`, and `screenshots/mobile-final-kress-430-full.png`.
- `screenshots/asset-review-contact-sheet.png` — the fourteen portraits and unified bust inspected as independent transparent assets.

The active unframed character WebPs and unified bust use lossless 1280 × 1920 canvases with fully transparent 128 px side and 192 px top/bottom margins. ImageMagick center-crop comparisons found zero changed pixels against each 1024 × 1536 source. Desktop captures confirm the padding preserves the visible silhouettes while leaving the glow inside the image bounds. The contact sheet confirms separate, recognizable silhouettes, including horse ears on Mayano and Super Creek. The single bust artwork combines the glasses and Ionic column. Rei and Usagi alone use the independently built Windows-style frames and retain their 1024 × 1536 assets.

## Functional checks

- `npm run build` completed and reported eight server records. `npm run preview` was used at `http://localhost:4173`.
- The root path and `/crias-games/` repository subpath both returned HTTP 200 for HTML, CSS, JavaScript and relative artwork assets. Asset links remain relative; no server runtime is needed after build.
- The nine copy values were compared with canonical data: the management URL plus all eight full hostnames. Clipboard success announces `Copiado!`; a rejected clipboard announces an error while retaining the visible selectable URL and focus. A missing clipboard API with a failed `execCommand('copy')` also reports failure and removes its temporary field. The Space key activated a focused copy button; repeated activation was checked.
- Keyboard tab order was inspected from the skip link through the nine copy buttons. Focus outlines were visible; no pause control is present. The copyleft mark is not interactive. Chromium’s synthetic Enter event sequence did not reliably produce one activation, so Enter-key activation was not counted as independently verified; the copy controls are native `<button>` elements.
- With JavaScript disabled, the management URL, eight server rows, fourteen illustrations and essential instructions remained present. Script-dependent motion and copy buttons stayed hidden.
- Reduced motion stops CSS animation, card tilt and the pointer-fluid solver; the preference is checked on startup and observed for live changes. There is no manual pause control.
- The copy failure path and success path were exercised in the browser. The static site does not claim live server status and states that invitations are manual.
- The follow-up toast tests confirmed both success and clipboard error messages appear 12 px above the visible footer, preserve page dimensions, and use a noninteractive `pointer-events:none` layer. A 1448 × 1086 screenshot was inspected with the toast visible.
- At that earlier revision the WebGL2 smoke canvas rendered after pointer movement at 0.56× CSS resolution (under the 500,000-pixel cap), inside `<main>` above the artwork and below panels/footer, and injected dye without page overflow. The pressure solve uses six iterations. Its placement is superseded by the latest smoke-stacking review above.
- A hovered game card reached 4.89° on one axis at the pointer position; its CSS/JS clamp is ±6° per axis. The focus handler clears inline tilt values.
- 200% zoom was approximated with a 724 × 543 CSS viewport. All hostnames and fourteen illustrations remained available without horizontal overflow. This is viewport emulation, not a physical browser zoom/device test.
- Text and control contrast were visually checked on dark panels at the reviewed viewports. No automated WCAG contrast audit was run; translucent scenery and image-backed game headers need separate contrast review if formal conformance is required.

## Remaining limitations

- Only Edge on Windows was tested, using CSS viewport emulation; Firefox, Safari, assistive technology software and physical touch devices were not exercised.
- Generated depictions of copyrighted characters are recorded in [`assets.md`](../assets.md). This provenance is not a grant of franchise rights; public and commercial reuse rights remain unresolved.
- Font faces are requested from Google Fonts and are not bundled. System fallbacks keep the page readable offline, but the named typography depends on the external font host.
- The static site has no automated server monitoring and does not automatically issue invitations.

No deployment was performed.

## Panoramic mountain source, cloud depth and footer spacing — 2026-11-10

Replaced the separate mountain artwork with one generated transparent panorama, `src/assets/art/mountains-valley.png`. Its left and right halves are used as opposing CSS alpha masks, so both corner ranges share the same generated brightness and cyan tint; the triangulated terrain includes translucent filled faces. The cyan tone darkens slightly toward the top, where a very subtle 2px blur/haze softens only the upper ridges. The valley stays open under the centered sun and title, while the city remains above the mountain layer.

The cloud layers were initially implemented as three strips; the later sprite revision below replaces those strips. The far sprites now stay behind the mountains, the faster middle and near sprites pass in front, and the skyline remains above all cloud art.

The footer characters moved outward again: Shantae by 16px, Marie Rose by 48px, Oguri by 32px and Tamamo by 32px. Shantae stays fixed vertically; Marie Rose, Oguri and Tamamo each moved up another 16px. Each bust statue moved 16px farther from page center and has no motion animation. At 1448px, character positions (x, y) are (97, 1188), (268, 1214), (980, 1201) and (1154, 1200)px; statue x-positions are 463 and 840px. At 1920px, character positions (x, y) are (317, 1184), (488, 1211), (1232, 1197) and (1406, 1196)px; statue x-positions are 699 and 1076px. The subtitle renders exactly as `Servers Privados`.

Full-page desktop captures `screenshots/mountains-footer-1448-2026-11-10.webp` and `screenshots/mountains-footer-1920-2026-11-10.webp` were visually inspected. The production build reported eight server records. Browser review at 1448 × 1086 and 1920 × 1080 found no horizontal overflow, broken images, failed requests or page errors. Preview remains on port 4173.

## Server metadata and desktop interactions — 2026-11-10

All eight server rows now show their configured protocol beside the port (`TCP` or `UDP`). The `arena-v22` row keeps version `1.21.11` and identifies its mixed Java + Bedrock support. The canonical server data remains the source for these labels.

Hovering the desktop hero title animates the chrome wordmark, cursive subtitle and Japanese eyebrow with a restrained scale and rocking motion. Each visible character can be dragged with the mouse; pointer-following eases through `requestAnimationFrame`, and release eases the image back to its CSS position. The drag offset composes with the existing whole-image float. A Tifa portrait and footer Oguri portrait were dragged and released in Chromium; both showed the offset, return phase and clean reset. The drag skips the click jump, while copy and other interface hit areas remain excluded from portrait hit-testing. Reduced motion and the static graphics fallback disable these interactions.

The interaction check used Chromium at 1448 × 1086 with a test-only WebGL renderer string so the enabled-motion path could be inspected. It reported no page errors. The final full-page reduced-motion desktop captures, inspected at 1448 × 1086 and 1920 × 1080, are `screenshots/server-details-1448-2026-11-10.webp` and `screenshots/server-details-1920-2026-11-10.webp`; both have no broken images or horizontal overflow. `npm run build`, `openspec validate build-mockup-faithful-site --strict`, and `git diff --check` passed.

## Global z-order and particle edge alignment — 2026-11-10

The desktop layer check used Chromium with 1448 × 1086 and 1920 × 1080 CSS viewports. At rest, both panels computed to z-index 2; the hero collage and footer waifus were at 3; statues were at 0. Hover and keyboard focus raised the directory to 6, while the focused map link retained focus. A forced overlap placed Marie Rose over the left statue and showed the selected portrait in front. A test-only renderer capability stub enabled panel particles; the directory's local height was 390px while its tilted viewport box was 426px. Bottom-edge sparks now originate at local y=390 rather than using the enlarged viewport height. The temporary hardware stub and forced portrait placement are not part of the site.

Captured states: [idle page at 1448](screenshots/layers-idle-1448-2026-11-10.webp), [hovered directory at 1448](screenshots/layers-hover-1448-2026-11-10.webp), [hovered directory at 1920](screenshots/layers-hover-1920-2026-11-10.webp), [selected waifu over a statue](screenshots/layers-selected-waifu-over-statue-2026-11-10.webp), and [GPU-gated particles along the tilted panel edge](screenshots/layers-particles-bottom-edge-1448-2026-11-10.webp). The ordinary build remains static on software-rendered Chromium.

## Anime cloud sprites, mountain crop and active Tifa — 2026-11-10

The generated anime-cumulus artwork was cropped with ImageMagick into a 1024 × 512, 4 × 4 transparent sprite sheet. A 14px horizontal alpha feather on each cell removes the hard crop line where the source art touched tile edges. The cloud container now reaches the horizon so sprites do not get chopped at the earlier city-height boundary; the higher-z skyline still covers clouds where they cross buildings. The broken `near-3` sprite instance was removed, leaving 15 active clouds drifting left with staggered delays through far, middle and near parallax planes. The far sprites sit behind the mountains; faster sprites pass in front. The loop no longer pauses visibly before fading offscreen. On the software-rendered fallback, the clouds remain static.

Both mountain halves use `top: clamp(128px, 13vh, 148px)`, with the left rotated `5deg` and the right `-5deg`; their lower outer corners anchor the rotation, with a controlled 20–24px outward offset filling the side corners. The active Tifa portrait is a transparent hat-to-above-knee cowgirl cutout. Its 2× enlarged image has generous transparent margins; the updated display is 10% larger and 24px higher than the previous layout while retaining its transparent clearance.

The [1448px upper-page capture](screenshots/tifa-clouds-1448-2026-11-10.webp) and [1920px full-page capture](screenshots/tifa-clouds-1920-2026-11-10.webp) show the above-knee Tifa crop, transparent breathing room, all active cloud layers and rotated mountain placement. The static browser renders include 15 cloud sprites, with the skyline over the clouds where their paths cross buildings. The site builds with all eight server records.
