# Artwork and asset provenance

All character portraits and detailed illustrations below were generated for this site with the built-in `image_gen` tool on 2026-11-09. The WebP files in `src/assets/art/` are independently addressable and have transparent backgrounds where noted. The original generated PNGs remain in the Codex generated-images store; the repository copies were converted with ImageMagick WebP encoding at quality 86 and alpha quality 100. No element from `mockup.png` is embedded or used as a page background.

The mockup and `docs/mockup-reference.md` guided character traits, palette and crop. AI-generated portraits depict copyrighted fictional characters; this records their origin, not a grant of franchise rights. Public and commercial reuse rights remain unresolved and need review by the site owner.

## Character illustrations

| Character | Asset | Source and defining prompt traits | Format / use |
| --- | --- | --- | --- |
| Rei Ayanami | `rei.webp` | Image generation `exec-332109c5`; pale blue bob, red eyes, white plugsuit collar. | Transparent WebP, 1216 × 1294; independent cutout inside CSS-built window. |
| Makima | `makima.webp` | Image generation `exec-c536eb94`; red-orange hair, gold ringed eyes, shirt and tie. | Transparent WebP, 1199 × 1312; independent cutout. |
| Tifa Lockhart | `tifa.webp` | Image generation `exec-7f11cd22`; long black hair, red eyes, white top, suspenders and gloves. | Transparent WebP, 1199 × 1312; independent cutout. |
| Asuka Langley | `asuka.webp` | Image generation `exec-e1346b9f`; orange-red hair, red clips, blue eyes, red pilot suit. | Transparent WebP, 1312 × 1199; independent cutout. |
| Nami | `nami.webp` | Generated `exec-b7dec9fb`, then edited `exec-3c9fc261` to add the requested wink; orange hair, spiral tattoo and raised hand. | Transparent WebP, 1312 × 1199; independent cutout. |
| Hayase Nagatoro | `nagatoro.webp` | Image generation `exec-2ba67249`; dark bangs, warm tan skin, broad lively smile. | Transparent WebP, 1312 × 1199; independent cutout. |
| Kurisu Makise | `kurisu.webp` | Image generation `exec-9cc2a2b6`; reddish-brown hair, blue eyes, white blouse and red tie. | Transparent WebP, 1312 × 1199; white photo frame is separate CSS. |
| Faye Valentine | `faye.webp` | Image generation `exec-d5adb5f8`; short dark hair, yellow headband, yellow-orange clothing, cigarette and sideways glance. | Transparent WebP, 1312 × 1199; white photo frame is separate CSS. |
| Hinata Hyuga | `hinata.webp` | Image generation `exec-acb93f4d`; indigo hair, pale lavender eyes and dark high collar. | Transparent WebP, 1312 × 1199; white photo frame is separate CSS. |
| Rem | `rem.webp` | Image generation `exec-3d4beb7f`; blue bob, one visible blue eye, maid headband and flowers. | Transparent WebP, 1312 × 1199; white photo frame is separate CSS. |
| Usagi Tsukino | `usagi.webp` | Image generation `exec-8dcbbcc7`; blonde odango buns, sailor uniform, peace sign. | Transparent WebP, 1283 × 1226; independent cutout inside CSS-built window. |
| Aqua | `aqua.webp` | Image generation `exec-9e16413e`; high blue ponytail, yellow hair ornament, upward point. | Transparent WebP, 1312 × 1199; independent cutout. |
| Mayano Top Gun | `mayano.webp` | Image generation `exec-71eef4f6`; orange-brown hair, horse ears, aviation accessories and wink. | Transparent WebP, 1312 × 1199; independent cutout. |
| Super Creek | `super-creek.webp` | Image generation `exec-7332e4b6`; reddish-brown hair, horse ears, blue eyes and blue-white floral accessory. | Transparent WebP, 1199 × 1312; independent cutout. |

## Scene and card art

| Element | Asset / implementation | Provenance and treatment |
| --- | --- | --- |
| Bust | `bust.webp` | Generated `exec-c0effd3a`; classical curly-haired bearded marble bust, upward-right gaze and colored stone lighting. Transparent WebP, 1312 × 1199. |
| Pixel glasses | Inline SVG in `src/template.html` | Separate black-and-white pixel frames, independently positioned over the bust. |
| Ionic column | `ionic-column.svg` | Authored SVG with separate volutes, fluting and neon stone gradients. |
| Skyline | `skyline.webp` | Generated `exec-94b18f83`; transparent panorama of individually lit cyberpunk towers. WebP, 2172 × 724. |
| Sky and stars | `.scene`, `.scene__stars` in `site.css` | CSS gradients and star patterns; independent scene element. |
| Striped sun | `.scene__sun` in `site.css` | CSS gradients, stripes and glow; separately clipped and animated. |
| Wireframe mountains | `.scene__mountains` in `site.css` | CSS geometric layer with independent glow animation. |
| Grid | `.scene__grid` in `site.css` | CSS perspective transform and line gradients; independent slow travel. |
| Japanese facade and signs | `.scene__facade`, `.scene__sign` in `site.css` and HTML text | CSS building/light treatment and selectable source text, separate from the sky and skyline. |
| Terraria | `terraria-scene.webp` | Generated `exec-92a55bef`; pixel-art tree, layered mountains, forest and twilight. RGB WebP, 1774 × 887. Game name is live HTML text. |
| Minecraft | `minecraft-scene.webp` | Generated `exec-8b62677a`; block landscape, grass block and Creeper. RGB WebP, 1672 × 941. Game name is live HTML text. |
| Hytale | `hytale-scene.webp` | Generated `exec-e9296a22`; fantasy valley, blue sky, pink clouds, ruins, towers and vegetation. RGB WebP, 1672 × 941. Used as an independently sized card landscape. |
| Frames, borders and stickers | HTML and `site.css` | CSS-built Rei and Usagi windows, tilted portrait frames, panel borders, neon and sticker shadows; no artwork is flattened into them. |

## Fonts

The page requests Barlow Condensed, Permanent Marker and Rajdhani from Google Fonts through the stylesheet import in `src/assets/site.css`, with local system fallbacks. Font files are not copied into this repository. The font source is [Google Fonts](https://fonts.google.com/); the page depends on that external font host for the named faces, but remains readable if it is unavailable. Verify the current font-specific license terms before bundling or redistributing the font files.
