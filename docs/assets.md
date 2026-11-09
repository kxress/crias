# Artwork and asset provenance

All character portraits and detailed illustrations below were generated for this site with the built-in `image_gen` tool on 2026-11-09, using the mockup and individual reference crops for guidance. Current portrait variants are independently addressable transparent WebP files; each generated PNG master is also retained in `src/assets/art/` beside its optimized WebP copy. Previous and alternate variants remain intact under their original or numbered filenames. No element from `mockup.png` is embedded or used as a page background.

The mockup and `docs/mockup-reference.md` guided character traits, palette and crop. AI-generated portraits depict copyrighted fictional characters; this records their origin, not a grant of franchise rights. Public and commercial reuse rights remain unresolved and need review by the site owner.

## Character illustrations

| Character | Asset | Source and defining prompt traits | Format / use |
| --- | --- | --- | --- |
| Rei Ayanami | `rei-1.webp` (`rei.webp` retained) | ImageGen `exec-67ca324e`; pale blue bob, red eyes, white full-coverage plugsuit; generated from Rei's reference crop. | Transparent PNG master and WebP, 1024 × 1536; CSS-built tilted window and separate controls. |
| Makima | `makima-2.webp` (`makima-1.webp`, `makima.webp` retained) | ImageGen `exec-f5504235`; copper-red braid, gold eyes, shirt and tie, expressive hand-on-hip pose; generated from Makima's reference crop. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Tifa Lockhart | `tifa-2.webp` (`tifa-1.webp`, `tifa.webp` retained) | ImageGen `exec-44de1661`; long dark hair, red eyes, white top, gloves and dynamic guard pose; generated from Tifa's reference crop. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Asuka Langley | `asuka-3.webp` (`asuka-2.webp`, `asuka-1.webp`, `asuka.webp` retained) | Current image `exec-bb38c2b9`; orange hair, blue eyes, red pilot suit and raised fist. Approved by the user; the preceding numbered variant is also retained. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Nami | `nami-1.webp` (`nami.webp` retained) | ImageGen `exec-9eb8bd38`; orange hair, wink, spiral tattoo, blue-white top and lively wave; generated from Nami's reference crop. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Hayase Nagatoro | `nagatoro-2.webp` (`nagatoro-1.webp`, `nagatoro.webp` retained) | ImageGen `exec-df1ed9b5`; dark hair and clips, warm tan skin, teasing grin, school sports top and expressive hand gesture. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Kurisu Makise | `kurisu-1.webp` (`kurisu.webp` retained) | ImageGen `exec-d9a61360`; long auburn hair, blue eyes, white lab coat and red hair clip; generated from Kurisu's reference crop. | Transparent PNG master and WebP, 1024 × 1536; unframed independent portrait. |
| Faye Valentine | `faye-1.webp` (`faye.webp` retained) | ImageGen `exec-3e3e5304`; short dark-purple hair, yellow headband and jacket, playing card and sideways glance. | Transparent PNG master and WebP, 1024 × 1536; unframed independent portrait. |
| Hinata Hyuga | `hinata-1.webp` (`hinata.webp` retained) | ImageGen `exec-49933625`; long indigo hair, pale lavender eyes and high-collar jacket; generated from Hinata's reference crop. | Transparent PNG master and WebP, 1024 × 1536; unframed independent portrait. |
| Rem | `rem-1.webp` (`rem.webp` retained) | ImageGen `exec-17d53740`; blue bob, blue eye, maid headband and flowers, peace-sign pose. | Transparent PNG master and WebP, 1024 × 1536; unframed independent portrait. |
| Usagi Tsukino | `usagi-1.webp` (`usagi.webp` retained) | ImageGen `exec-800aa5d0`; blonde buns and long tails, blue eyes, sailor uniform and peace sign. | Transparent PNG master and WebP, 1024 × 1536; CSS-built tilted window and separate controls. |
| Aqua | `aqua-1.webp` (`aqua.webp` retained) | ImageGen `exec-8ccb4cf1`; bright blue hair and eyes, goddess outfit, raised arm and cheerful expression. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Mayano Top Gun | `mayano-1.webp` (`mayano.webp` retained) | ImageGen `exec-2d006059`; orange hair, both horse ears, racing outfit and energetic salute. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |
| Super Creek | `super-creek-1.webp` (`super-creek.webp` retained) | ImageGen `exec-3287b82f`; chestnut hair, distinct horse ears, floral hair ornament and white-blue outfit. | Transparent PNG master and WebP, 1024 × 1536; independent portrait. |

## Scene and card art

| Element | Asset / implementation | Provenance and treatment |
| --- | --- | --- |
| Bust, pixel glasses and Ionic column | `statue-1.webp` (`bust-1.webp`, `bust.webp`, `ionic-column.svg` retained) | ImageGen `exec-038cbc09` from the statue reference crop; one upward-looking violet marble bust wearing pixel glasses, attached to one fluted Ionic column with cyan/magenta rim light. | Transparent PNG master and WebP, 1024 × 1536; used as one `<img>` inside one figure. Older separate assets remain available but are not used by the page. |
| Skyline | `skyline.webp` | Generated `exec-94b18f83`; transparent panorama of individually lit cyberpunk towers. WebP, 2172 × 724. |
| Sky and stars | `.scene`, `.scene__stars` in `site.css` | CSS gradients and star patterns; independent scene element. |
| Striped sun | `.scene__sun` in `site.css` | CSS gradients, stripes, independent sheen and pulsing glow; separately clipped and animated. |
| Wireframe mountains | `.scene__mountains` in `site.css` | CSS geometric layer with independent glow animation. |
| Grid | `.scene__grid` in `site.css` | CSS perspective transform and line gradients; independent slow travel. |
| Japanese facade and signs | `.scene__facade`, `.scene__sign` in `site.css` and HTML text | CSS building/light treatment and selectable source text, separate from the sky and skyline. |
| Terraria | `terraria-scene.webp` | Generated `exec-92a55bef`; pixel-art tree, layered mountains, forest and twilight. RGB WebP, 1774 × 887. Game name is live HTML text. |
| Minecraft | `minecraft-scene.webp` | Generated `exec-8b62677a`; block landscape, grass block and Creeper. RGB WebP, 1672 × 941. Game name is live HTML text. |
| Hytale | `hytale-scene.webp` | Generated `exec-e9296a22`; fantasy valley, blue sky, pink clouds, ruins, towers and vegetation. RGB WebP, 1672 × 941. Used as an independently sized card landscape. |
| Frames, borders and stickers | HTML and `site.css` | CSS-built Rei and Usagi Windows-style frames with control buttons, panel borders, neon and sticker shadows. The four left-side portraits are unframed. |
| Copyleft symbol | `openmoji-copyleft-1.svg` | OpenMoji emoji U+1F12F, downloaded from the OpenMoji 17.0 package ([source](https://openmoji.org/library/emoji-1F12F/)). CC BY-SA 4.0 ([license](https://creativecommons.org/licenses/by-sa/4.0/)). The symbol is a static, non-linked footer mark with an accessible OpenMoji and license description. |

## Fonts

The page requests Barlow Condensed, Permanent Marker, Rajdhani and Racing Sans One from Google Fonts through the stylesheet import in `src/assets/site.css`, with local system fallbacks. Font files are not copied into this repository. The font source is [Google Fonts](https://fonts.google.com/); the page depends on that external font host for the named faces, but remains readable if it is unavailable. Verify the current font-specific license terms before bundling or redistributing the font files.
