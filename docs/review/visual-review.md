# Visual and functional review

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

The 2026-11-09 lagoon pass was captured with Playwright 1.65 and Chromium 158 headless at 1448 × 1086 and 1920 × 1080. The raised horizon, sun-aligned curved reflection, skyline occlusion and clear ground grid were inspected in both captures. The reflection layer ends about 158px above the shared skyline/grid baseline. Mobile was intentionally not reviewed again in this pass, following the user’s session-wide direction.
Screenshots reviewed:

- `screenshots/comparison-final-kress-2026-11-09.png` — reference and final desktop side by side at 1448 × 1086.
- `screenshots/desktop-final-kress-1448x1086.png` and `screenshots/wide-final-kress-1920x1080.png`.
- `screenshots/lagoon-review-1448x1086.png` and `screenshots/lagoon-review-1920x1080.png` — final sun/reflection composition at both desktop widths.
- `screenshots/tablet-final-kress-900-full.png` and `screenshots/tablet-final-kress-1024-full.png` — full tablet documents.
- `screenshots/mobile-final-kress-320-full.png`, `screenshots/mobile-final-kress-375-full.png`, and `screenshots/mobile-final-kress-430-full.png`.
- `screenshots/asset-review-contact-sheet.png` — the fourteen portraits and unified bust inspected as independent transparent assets.

The active unframed character WebPs and unified bust use lossless 1280 × 1920 canvases with fully transparent 128 px side and 192 px top/bottom margins. ImageMagick center-crop comparisons found zero changed pixels against each 1024 × 1536 source. Desktop captures confirm the padding preserves the visible silhouettes while leaving the glow inside the image bounds. The contact sheet confirms separate, recognizable silhouettes, including horse ears on Mayano and Super Creek. The single bust artwork combines the glasses and Ionic column. Rei and Usagi alone use the independently built Windows-style frames and retain their 1024 × 1536 assets.

## Functional checks

- `npm run build` completed and reported eight server records. `npm run preview` was used at `http://localhost:4173`.
- The root path and `/crias-games/` repository subpath both returned HTTP 200 for HTML, CSS, JavaScript and `assets/art/lagoon-reflection.svg`. Asset links remain relative; no server runtime is needed after build.
- The nine copy values were compared with canonical data: the management URL plus all eight full hostnames. Clipboard success announces `Copiado!`; a rejected clipboard announces an error while retaining the visible selectable URL and focus. A missing clipboard API with a failed `execCommand('copy')` also reports failure and removes its temporary field. The Space key activated a focused copy button; repeated activation was checked.
- Keyboard tab order was inspected from the skip link through the nine copy buttons. Focus outlines were visible; no pause control is present. The copyleft mark is not interactive. Chromium’s synthetic Enter event sequence did not reliably produce one activation, so Enter-key activation was not counted as independently verified; the copy controls are native `<button>` elements.
- With JavaScript disabled, the management URL, eight server rows, fourteen illustrations and essential instructions remained present. Script-dependent motion and copy buttons stayed hidden.
- Reduced motion stops CSS animation, card tilt and the pointer-fluid solver; the preference is checked on startup and observed for live changes. There is no manual pause control.
- The copy failure path and success path were exercised in the browser. The static site does not claim live server status and states that invitations are manual.
- The follow-up toast tests confirmed both success and clipboard error messages appear 12 px above the visible footer, preserve page dimensions, and use a noninteractive `pointer-events:none` layer. A 1448 × 1086 screenshot was inspected with the toast visible.
- The WebGL2 smoke canvas rendered after pointer movement at 0.56× CSS resolution (under the 500,000-pixel cap), remained inside `<main>` above the artwork and below panels/footer, and injected dye without page overflow. The pressure solve uses six iterations.
- A hovered game card reached 4.89° on one axis at the pointer position; its CSS/JS clamp is ±6° per axis. The focus handler clears inline tilt values.
- 200% zoom was approximated with a 724 × 543 CSS viewport. All hostnames and fourteen illustrations remained available without horizontal overflow. This is viewport emulation, not a physical browser zoom/device test.
- Text and control contrast were visually checked on dark panels at the reviewed viewports. No automated WCAG contrast audit was run; translucent scenery and image-backed game headers need separate contrast review if formal conformance is required.

## Remaining limitations

- Only Edge on Windows was tested, using CSS viewport emulation; Firefox, Safari, assistive technology software and physical touch devices were not exercised.
- Generated depictions of copyrighted characters are recorded in [`assets.md`](../assets.md). This provenance is not a grant of franchise rights; public and commercial reuse rights remain unresolved.
- Font faces are requested from Google Fonts and are not bundled. System fallbacks keep the page readable offline, but the named typography depends on the external font host.
- The static site has no automated server monitoring and does not automatically issue invitations.

No deployment was performed.
