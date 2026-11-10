# Proposal

## Why

The first implementation now follows the mockup, and a motion/depth refinement pass is committed. Additional visual feedback asks for a quieter hero without its repeated intro copy, a smaller higher sun, a clearer sun/city layer order, fast GPU fluid pointer smoke above character art but below interface panels, a retrowave chrome title with the cursive `SERVERS PRIVADOS` subtitle, and copy feedback that behaves like a bottom toast instead of inline panel content.

## What Changes

- Build the single-page Brazilian Portuguese private-server site as a static GitHub Pages artifact closely matching `mockup.png` on desktop and thoughtfully recomposed for mobile.
- Recreate all fourteen named characters and the bust as individually controllable artwork; construct independently animatable scenery, text, borders and lighting with a living retrowave atmosphere.
- Refine the hero's seamless striped-sun loop, chrome animated wordmark, skyline/grid layering, downsampled fluid pointer smoke above art and below interface panels, and Steam-inspired game-card tilt without changing the approved composition or making effects intrusive; keep the cursive subtitle treatment and use the requested `SERVERS PRIVADOS` wording.
- Remove the redundant two-line hero intro and manual pause control, render the sun behind the city, and move copy success/error feedback into a brief bottom toast that does not shift content.
- Remove the rejected water reflection, lower the sun into the skyline, make its stripe gaps transparent, brighten the mountain sky, and add slow cloud wisps that move in separate horizontal parallax layers above the sun and clear of the buildings.
- Publish the user-confirmed management URL and eight server records, with manual invitation guidance and accessible copy interactions.
- Add explicit fidelity, responsive, accessibility, motion, and static-hosting acceptance criteria and a granular implementation and verification checklist.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-experience`: Specify the visual composition, mobile representation, motion controls, and reproducible visual acceptance checks in greater detail.
- `private-server-access`: Specify the reference's exact joining presentation and directory/copy behavior.

## Impact

Adds static site source, independently managed visual assets and data, verification and preview tooling, and a GitHub Pages workflow. No server runtime, authentication, automated invitations, monitoring, or network administration is required. Asset creation and visual review are significant work; the reference image does not provide isolated source layers.

## Latest approved refinements (2026-11-10)

Use a 25% bottom clip on the sun and a desktop lift near 148px, remove neon glow/pulse from the sun, keep the city fully opaque with mountains behind it, and replace the generated Minecraft block bars with an official Minecraft landscape screenshot. Preserve only screenshot imagery as game-card scenery; CSS may style borders and text, not synthesize scenery over the art.

Keep the upper half of the sun solid and confine its transparent stripe cutouts to the lower half. Leave the server-list wrapper transparent and unframed, but retain a separate dark fill and fine border on each server row. Keep each game screenshot in its header area rather than repeating the Terraria capture as a lower strip. Move the unified bust/column artwork into paired lower footer positions, with the right instance mirrored through CSS.
