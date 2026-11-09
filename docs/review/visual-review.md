# Visual and functional review

Reviewed on 2026-11-09 in Microsoft Edge 140.0.3485.54 on Windows, using Chromium CSS viewport emulation at device scale factor 1. No physical phone, tablet or other browser engine was tested. The project provides `npm run build` and `npm run preview`; it has no separate automated test suite.

## Captures and layout

| View | CSS viewport | Captured page | Character count | Result |
| --- | ---: | ---: | ---: | --- |
| Desktop | 1448 × 1086 | 1448 × 1086 | 14 | Main composition reviewed against the reference. The comparison image places `mockup.png` on the left and the current site on the right. |
| Wide desktop | 1920 × 1080 | 1920 × 1080 | 14 | Collage stays bounded near the central composition; panels and text remain readable. |
| Tablet | 900 × 1080 | 885 × 2113 | 14 | Full page captured. The viewport is 900 CSS px; the document's 885 px scroll width reflects the browser scrollbar. Portraits reflow in four columns, steps and cards reflow to two columns, and Hytale occupies the full card row. |
| Mobile | 320 px wide | 320 × 2666 | 14 | Full page captured; no horizontal overflow. |
| Mobile | 375 px wide | 375 × 2684 | 14 | Full page captured; no horizontal overflow. |
| Mobile | 430 px wide | 430 × 2732 | 14 | Full page captured; no horizontal overflow. |

The desktop comparison shows the same broad scene structure: title and sunset, layered skyline and perspective grid, character groups, central joining panel, three illustrated game cards, and footer. The portraits and game art are separate assets. The final art is generated from the reference crops, so poses and silhouettes are recognizable interpretations rather than pixel-matched copies. Three equally sized game cards and the tablet/mobile portrait gallery are deliberate responsive refinements from the mockup. No portrait is hidden on mobile or cropped at its side edges; the CSS fade is limited to the bottom of the desktop portraits.

Screenshots reviewed:

- `screenshots/comparison-final-2026-11-09.png` — reference and desktop side by side at 1448 × 1086.
- `screenshots/desktop-final-1448x1086.png` and `screenshots/wide-final-1920x1080.png`.
- `screenshots/tablet-final-900-full.png` — full 885 × 2113 tablet document.
- `screenshots/mobile-final-320-full.png`, `screenshots/mobile-final-375-full.png`, and `screenshots/mobile-final-430-full.png`.
- `screenshots/asset-review-contact-sheet.png` — the fourteen portraits and unified bust inspected as independent transparent assets.

The current portrait WebP files and unified bust are all 1024 × 1536 with alpha transparency. The contact sheet and desktop capture confirm separate, recognizable silhouettes, including horse ears on Mayano and Super Creek. The single bust artwork combines the glasses and Ionic column. Rei and Usagi alone use the independently built Windows-style frames.

## Functional checks

- `npm run build` completed and reported eight server records. `npm run preview` was used at `http://localhost:4173`.
- The root path and `/crias-games/` repository subpath both returned HTTP 200 for HTML, CSS, JavaScript and the local OpenMoji footer SVG. Asset links remain relative; no server runtime is needed after build.
- The nine copy values were compared with canonical data: the management URL plus all eight full hostnames. Clipboard success announces `Copiado!`; a rejected clipboard announces an error while retaining the visible selectable URL and focus. A missing clipboard API with a failed `execCommand('copy')` also reports failure and removes its temporary field. The Space key activated a focused copy button; repeated activation was checked.
- Keyboard tab order was inspected from the skip link through the motion toggle, nine copy buttons and credited footer link. Focus outlines were visible. Chromium's synthetic Enter event sequence did not reliably produce one activation, so Enter-key activation was not counted as independently verified; the controls are native `<button>` elements.
- With JavaScript disabled, the management URL, eight server rows, fourteen illustrations and essential instructions remained present. Script-dependent motion and copy buttons stayed hidden.
- Reduced motion stopped decorative animations and disabled the motion toggle; changing the preference live updated the state. Manual pause stopped the grid and sun animations, and the paused state persisted when the preference changed.
- The copy failure path and success path were exercised in the browser. The static site does not claim live server status and states that invitations are manual.
- 200% zoom was approximated with a 724 × 543 CSS viewport. All hostnames and fourteen illustrations remained available without horizontal overflow. This is viewport emulation, not a physical browser zoom/device test.
- Text and control contrast were visually checked on dark panels at the reviewed viewports. No automated WCAG contrast audit was run; translucent scenery and image-backed game headers need separate contrast review if formal conformance is required.

## Remaining limitations

- Only Edge on Windows was tested, using CSS viewport emulation; Firefox, Safari, assistive technology software and physical touch devices were not exercised.
- Generated depictions of copyrighted characters are recorded in [`assets.md`](../assets.md). This provenance is not a grant of franchise rights; public and commercial reuse rights remain unresolved.
- Font faces are requested from Google Fonts and are not bundled. System fallbacks keep the page readable offline, but the named typography depends on the external font host.
- The static site has no automated server monitoring and does not automatically issue invitations.

No deployment was performed.
