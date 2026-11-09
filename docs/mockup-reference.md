# CRIAS GAMES Mockup Reference

## Scope

This document preserves detailed observations and earlier implementation suggestions associated with the root `mockup.png`, a single 1448 × 1086 raster image. The persistent OpenSpec requirements define which aspects are intended for the site; these notes provide supporting visual detail. Measurements and transcriptions are interpretations of the image. On 2026-11-09 the user confirmed that the connection details are correct; the operational values are recorded in the private-server-access spec.

The original analysis described positions, sizes, and fonts as approximate, and noted that the artwork was not a substitute for real, responsive HTML content. It envisioned a Brazilian Portuguese page presenting private game servers, compatible with static GitHub Pages hosting.

## Detailed mockup notes and earlier suggestions

### Current user-directed refinements

The user has since approved several implementation adjustments while keeping this mockup as the primary reference: retain Japanese decorative labels throughout the site; use a slanted, animated gradient treatment for the live-text wordmark; use one unified bust, glasses and Ionic-column illustration; keep Rei and Usagi in separate Windows-style frames while leaving the four left-side portraits unframed; preserve complete portrait silhouettes, enlarge their visible artwork within the available area, and fade only the lower interior edge; keep desktop game cards equal in size with cyan hover/focus outlines; and label the footer `Crias 🄯 2026` using the OpenMoji copyleft artwork with attribution. At 1920 × 1080, keep the character groups close to the centered content instead of spreading them to the screen edges. The sun should use a moving striped vaporwave treatment with restrained glow, and the main panel borders/headings should pulse while the panels shift toward cyan on hover. The latest desktop refinement spreads the left portraits apart across the upper composition and alternates the lower portraits horizontally, while leaving the right group unchanged; the collage returns to document flow through tablet widths so portraits stay visible around the content.

### Mockup note: Visual identity and composition

The site could reproduce the mockup's dense synthwave, vaporwave, anime, arcade and cyberpunk aesthetic as a single continuous scene, with a clear central reading column framed by decorative artwork. It could feel independent, informal and personalized. The desktop composition could place the hero, joining instructions, server directory and footer in that order. Around the reference resolution, the hero occupies approximately y=0–410, the joining panel y=410–605, the directory y=615–1010 and the footer y=1020–1086. The centered panels are approximately 1100 px wide at most, with the directory slightly wider than the joining panel. These measurements guide visual comparison rather than imposing fixed coordinates.

The earlier analysis treated the mockup as an approved design and suggested retaining its dense character collage, game-specific artwork, central information hierarchy and neon environment together. The visual brand could be `CRIAS GAMES`. The page would not add hearts, cute animal mascots or stickers, romantic copy, unnecessary title ornaments, corporate dashboard elements, Kress branding, a navigation bar, hamburger menu, login, registration form, additional social links, invented statistics, status panels or an extra notes section.

#### Illustrative scenario: Viewing the desktop composition

- **WHEN** a visitor views the page at a wide desktop viewport
- **THEN** the hero, two neon panels and footer form a centered continuous composition, surrounded by artwork that does not obstruct content

### Mockup note: Color, light and typography

The palette could use near-black and deep purple backgrounds, magenta and pink structural neon, cyan and electric-blue accents, and an orange-red sunset. Suggested CSS approximations are `#10071F` and `#230B35` for backgrounds, `#21102F` for panels, `#15142B` for cards, `#FF35D5` and `#FF80E8` for pink, `#B94DFF` for purple, `#12EDFF` for cyan, `#589BFF` for blue, `#47F78B` for Minecraft green, `#FFC45D` for the Alpha badge, `#FF253E` and `#FF7B32` for the sun, and `#FFF0FC` for light text. Gradients and lighting could vary these colors.

Main panels could have rounded corners, dark sufficiently opaque interiors, saturated continuous outlines and layered inner and outer neon glows. Inner cards and rows could use finer borders and more restrained glows. The logo could use large, irregular, sharply angled brush-style lettering; section headings could use heavy italic uppercase sans-serif; interface text could use legible sans-serif; and the footer could use a strong, legible sans-serif treatment. Approximate desktop sizes are 65–85 px for the logo, 24–29 px for the subtitle, 17–19 px for the introduction, 29–35 px for section headings, 16–19 px for step titles, 13–15 px for descriptions, 13–16 px for hosts, 12–14 px for badges and 22–25 px for the footer. Exact fonts and sizes could be adjusted for visual similarity and readability.

#### Illustrative scenario: Reading illuminated content

- **WHEN** text and controls appear over the neon scene
- **THEN** the glow supports the arcade aesthetic without reducing their contrast or legibility

### Mockup note: Synthwave background

The background could include a subtly textured, starry dark-purple sky; a large centered striped red-to-orange sun behind the logo; a layered futuristic skyline with dark towers, antennas and cyan-lit windows; blue and cyan triangular wireframe mountains; and a glowing magenta perspective grid extending from the hero to the footer, with larger apparent cells toward the bottom. Subtle grain and scanlines could suggest a VHS image without obscuring the scene.

The sun could be a stylized striped synthwave disc, with a warm yellow lower region, red glow and a lower portion partly hidden by the skyline. The dark wireframe mountains could flank the hero, and the perspective grid could remain visible between the panels and below the footer rather than ending behind the content.

The upper-right scenery could include a purple and blue Japanese urban facade with a bright pink `カフェ` sign. The left side near the statue could include the vertical pink neon inscription `ゲームサーバー`. These signs are decorative, not navigation.

#### Illustrative scenario: Viewing the backdrop

- **WHEN** the full desktop page is visible
- **THEN** the sun, skyline, wireframe mountains and perspective grid create depth behind the interface, with the specified Japanese signs in their respective locations

### Mockup note: Character framing

Fourteen recognizable female characters could frame the desktop interface in the following order and general regions:

- Upper left: Rei Ayanami in a tilted pink retro window labeled `レイ`, Makima, and Tifa Lockhart.
- Upper right: Asuka Langley, Nami, and Hayase Nagatoro, with Nagatoro partially cropped by the right edge.
- Left side, descending: Kurisu Makise, Faye Valentine, Hinata Hyuga, and Rem.
- Right side, descending: Usagi Tsukino in a tilted pink retro window, Aqua, Mayano Top Gun, and Super Creek.

The upper portraits could preserve their identifying traits: Rei's short pale-blue hair and red eyes; Makima's red-orange hair and golden eyes; Tifa's long black hair and white-and-black clothing; Asuka's orange hair and red plugsuit; Nami's orange hair, wink and visible spiral arm tattoo; and Nagatoro's dark hair, tan skin and broad smile. Side portraits could preserve their recognizable hair, clothing and expressions: Kurisu's long reddish-brown hair, Faye's dark short hair and yellow details, Hinata's dark blue hair and pale eyes, Rem's short blue hair and maid outfit, Usagi's blonde buns and sailor uniform, and Aqua's blue hair and raised arm. Mayano and Super Creek could retain distinct horse ears, hairstyles and silhouettes; their features would not merge or be replaced with cat or dog ears.

Rei's window could have a light-pink frame, lilac title bar and three small decorative controls including a close control. Makima and Tifa could be large unframed figures, and Asuka, Nami and Nagatoro could remain prominent on the right. Nami could have a cheerful wink and a hand near her face; Nagatoro could lean toward the center.

The four separate left-side portraits could retain white photo-like borders and alternating tilts: Kurisu has a white shirt and blue eyes; Faye has a headband, sideways glance, cigarette and yellow-orange clothing; Hinata has pale lavender eyes and a gentle expression; Rem has a visible blue eye, floral hair accessories and a maid outfit. They could remain below the statue and outside the server text.

Usagi could appear winking and making a peace sign inside a tilted light-pink retro window with a lilac title bar and decorative controls. Aqua could be an independent unframed cutout, laughing with closed eyes and pointing upward, with a high blue ponytail and yellow accessory. The lower right could contain two distinct Uma Musume portraits: Mayano above, with light-brown or orange hair, horse ears, a wink and colorful accessories; and the larger Super Creek below, with long reddish-brown hair, horse ears, blue eyes and a blue-and-white hair accessory. Their irregular white sticker outlines, slight tilts, overlaps and pink or lilac tape could convey a physical collage.

The lower left and lower right collages could use individually cut, light-edged stickers or photos, staggered and tilted rather than precisely aligned. Minor overlap is allowed only if faces and essential features remain visible. The artwork could have coherent lighting, saturation, shadows and clean natural crops; characters would not merge, cross server cards, cover text or intercept pointer events. No extra characters could be introduced.

#### Illustrative scenario: Inspecting the decorative frame

- **WHEN** the desktop composition is viewed
- **THEN** all fourteen characters appear in their specified regions, retain recognizable features and remain separate from readable and interactive content

### Mockup note: Vaporwave statue

A prominent classical male bust and Ionic-style column could occupy the left side between the upper characters and lower portraits. The bust could combine sculpted marble, curled hair, short sculpted beard, muscular neck, pronounced jaw and a confident upward-right gaze associated with Gigachad. Its pixel glasses could align with the eyes and use square black and white pixels rather than ordinary sunglasses. It could wear angled black 8-bit sunglasses with small white pixel reflections. Cyan, magenta and violet light could model the stone, shoulders and fragmented lower edge; the column could have ornamental spiral volutes and pink-lit purple edges. It could read as a sculpture rather than a filtered photograph and would not obscure the instructions.

#### Illustrative scenario: Viewing the statue

- **WHEN** the desktop frame is visible
- **THEN** the classical bust, pixel sunglasses and ornamental column are recognizable without covering the joining panel's content

### Mockup note: Hero content

The hero could center the exact wordmark `CRIAS GAMES` over the sun, rendered in white-to-pink aggressive italic brush lettering with magenta outline or shadow and glow. A curved, irregular cyan brushstroke could underline it. The subtitle could read `SERVIDORES DE JOGOS PRIVADOS` in bold italic uppercase. A centered, dark rounded callout with a cyan border and glow, approximately 560 px wide in the reference, could contain the following Portuguese text:

> Servidores privados de Terraria, Minecraft e Hytale.
>
> Instale o NetBird, entre na rede e conecte nos hosts abaixo.

The callout could remain narrower than the main panels. No extra slogan or authorship text could be added.

#### Illustrative scenario: Reading the hero

- **WHEN** a visitor arrives at the page
- **THEN** the brand is dominant, followed by the subtitle and the two-line introduction

### Mockup note: Joining instructions

The first panel could have a pink outline globe icon, the heading `COMO ENTRAR`, a divider, and exactly four numbered steps. At desktop width the steps could read left to right, with pink number squares, relevant icons, bold titles, left-aligned descriptions and glowing right-pointing chevrons between steps. The steps could present the following Portuguese content in order:

1. `Instale o NetBird` — `Baixe e instale o NetBird no seu PC (Windows, Linux ou macOS).` Use an orange NetBird-inspired icon.
2. `Configure a URL` — `No NetBird, defina o Management URL como:` followed by `https://netbird.kress.wtf` in a dark cyan-outlined inset with a copy control. Use a pink chain icon.
3. `Peça um invite pro Crias` — `Envie uma mensagem para o Crias (Discord/WhatsApp) solicitando o seu convite. O convite é manual e não é gerado automaticamente.` Use a pink envelope icon.
4. `Conecte e jogue!` — `Após entrar na rede, conecte-se nos servidores listados abaixo e bora jogar.` Use a pink check icon.

The joining panel could have a dark purple gradient, rounded corners, a magenta outline and glow, generous padding and a thin neon divider below its heading. Its URL field could have a dark background, rounded cyan border and glow, bright cyan text and an overlapping-rectangles copy icon. The invitation could clearly be manual; the page would not suggest public access or provide automatic registration. The URL could remain selectable or copyable. The mockup does not show a download button.

#### Illustrative scenario: Following the connection process

- **WHEN** a visitor reads the instructions
- **THEN** the four steps explain installation, the exact management URL, a manual invitation and connection in that order

### Mockup note: Server directory content

The second panel could be headed by a pink gamepad icon, `SERVIDORES`, a vertical separator and `SERVIDORES DISPONÍVEIS NA REDE PRIVADA`. It could present the following eight entries in order, grouped by game, with the shown labels and ports. The Hytale protocol could be explicitly displayed as `Porta: 5520 / UDP`.

| Game | Hostname | Type | Port | Protocol |
| --- | --- | --- | --- | --- |
| Terraria | `brasilia.terraria.games.crias.wtf` | Vanilla | 7777 | TCP |
| Terraria | `lsj.terraria.games.crias.wtf` | Vanilla | 7777 | TCP |
| Terraria | `brasilia.calamity.terraria.games.crias.wtf` | Calamity | 7777 | TCP |
| Terraria | `lsj.calamity.terraria.games.crias.wtf` | Calamity | 7777 | TCP |
| Minecraft | `arena-v22.minecraft.games.crias.wtf` | Vanilla | 25565 | TCP |
| Minecraft | `bmc.minecraft.games.crias.wtf` | Better MC | 25565 | TCP |
| Minecraft | `prominence.minecraft.games.crias.wtf` | Modpack | 25565 | TCP |
| Hytale | `alpha.hytale.games.crias.wtf` | Alpha | 5520 | UDP |

The user confirmed these connection details on 2026-11-09. The visual brand, management domain, game hostnames and footer address have distinct roles and would not be automatically substituted for one another. Server data could be maintained separately from the visual markup so values can be updated. Each structured record could retain game, hostname, category, port, protocol and badge color or variant. TCP is technical data for Terraria and Minecraft and would not be displayed as protocol text; only Hytale explicitly displays `/ UDP`.

#### Illustrative scenario: Finding server details

- **WHEN** a visitor reads the directory
- **THEN** the eight reference entries appear in their specified game groups with their hostnames, types and ports, including Hytale's UDP protocol

#### Illustrative scenario: Preparing for publication

- **WHEN** connection values are prepared for the published site
- **THEN** they are checked against actual DNS and services rather than assumed operational from the mockup

### Mockup note: Game card presentation

At desktop width the Terraria, Minecraft and Hytale cards could appear left to right, aligned at top and bottom. Terraria and Minecraft could be comparably wider than Hytale, approximately 35:36:27 before gaps. Each card could have a distinct luminous border, illustrated branded header and dark interior.

Terraria could use cyan accents and a pixel-art header with a recognizable Terraria logo, tree, vegetation, mountains and purple-blue sky. Its four rows could have cyan Vanilla and magenta Calamity badges. Minecraft could use green accents and a header with a recognizable stone-style MINECRAFT logo, grass block, Creeper and block scenery. Its three badges could distinguish Vanilla in lilac, Better MC in cyan-blue and Modpack in violet. The intentionally open lower area could retain a dark teal-green gradient and pixelated vegetation and blocks, without added metrics. Hytale could use electric-blue accents, a recognizable metallic HYTALE logo and a yellow-orange Alpha badge. Its large lower area could retain a pixel-art fantasy landscape with blue twilight, pink clouds, stone ruins, towers, vegetation and depth; it would not become a flat background.

#### Illustrative scenario: Comparing game cards

- **WHEN** a visitor views the directory on a wide screen
- **THEN** the three illustrated cards have distinct game identities and retain the specified decorative lower areas

### Mockup note: Server rows and copy controls

Each server entry could use a shared dark rounded row with a light lilac outline, bold readable hostname, colored type pill, visible port and a pink neon-framed copy icon at the right. Each row could put the hostname above the category badge and port, with the copy control to the right. Copy controls could use two overlapping rounded rectangles. Long hostnames could remain fully accessible and would not silently disappear or overlap controls; wrapping or accessible overflow is acceptable. The page could provide eight independent server copy buttons and one management URL copy button.

Each server button could copy only its displayed hostname, without the port or extra characters. The management button could copy the complete URL. Copying could use the Clipboard API when available and provide a usable fallback or a clear error when copying is unavailable or denied. Controls could be keyboard operable and have descriptive accessible names. Successful copies could give brief, accessible feedback such as `Copiado!`, without resizing the button, moving the layout, changing the hostname or preventing an immediate repeat. An error could be communicated discreetly. Hover and visible keyboard focus states could reinforce the neon treatment.

#### Illustrative scenario: Copying a connection value

- **WHEN** a visitor activates a server copy button or the management URL copy button
- **THEN** the corresponding hostname alone or complete URL respectively is copied, and a temporary confirmation is shown and announced without shifting the layout

#### Illustrative scenario: Copying is unavailable

- **WHEN** the browser does not permit a copy operation
- **THEN** the visitor receives a discreet accessible error and can still select the displayed value

### Mockup note: Footer

The footer could sit beneath the directory directly over the continuing grid, without its own card. It could center a small retro computer icon and the exact lowercase text `crias.games`, flanked by short pink neon horizontal lines. The text could use a strong, light-colored sans-serif style with pink glow. No secondary signature or decorative slogan could be added.

#### Illustrative scenario: Reaching the footer

- **WHEN** a visitor reaches the end of the directory
- **THEN** the computer icon and `crias.games` provide a centered visual ending over the grid

### Mockup note: Layering and responsive layout

The scene could layer the base, sky and texture, sun, skyline, facade, wireframe mountains, grid, characters and statue, hero text, panels and their content, side portraits in the decorative margins, and interactive focus states. Separate stacking contexts could be used. Panels could isolate their content so that no character is partially visible through their backgrounds, between server rows or across text. Side artwork could remain in intentional margins; it would not be hidden behind opaque cards leaving fragments of faces or bodies visible. Character cutouts could have clean transparency and hair edges, without residual rectangles, unwanted halos, duplicated limbs or merged figures; intentional white photo and sticker borders could remain. Decorative elements would not block pointer interactions or obscure text, icons, hosts or steps.

At wide desktop widths around 1448 px and above, the layout could preserve the four horizontal steps, three side-by-side cards, centered logo and side portraits where space permits. At intermediate desktop widths around 1100-1447 px, margins and side artwork could scale down while the three cards remain side by side for as long as their hostnames remain legible. At tablet widths around 768-1099 px, steps could reflow into two columns or stack; Terraria and Minecraft could share a row with Hytale below, and side artwork could be reduced or selectively hidden. These breakpoints are guides, and the actual reflow could be based on available space and readability. On narrow screens below approximately 768 px, touch-friendly copy controls could remain accessible, and steps and cards could stack in their original order, progression cues could become vertical or simplified, the logo and callout could fit the viewport, and decorative portraits could be reduced, repositioned or hidden. The synthwave background could remain recognizable. Functional content and controls could remain available without accidental horizontal page scrolling.

#### Illustrative scenario: Viewing on a narrow screen

- **WHEN** a visitor uses a phone-sized viewport
- **THEN** the instructions and game cards remain readable and operable in order, complete hostnames remain accessible and no decorative artwork forces horizontal scrolling

### Mockup note: Accessibility and motion

Visible site copy could be Brazilian Portuguese and rendered as real HTML text, with semantic heading order and sufficient contrast. Controls could have accessible names and visible focus. Copy feedback could be available to screen readers. Ports and protocol could be textual rather than conveyed only by color. Purely decorative characters, statue, stars and grid could be hidden from the accessibility tree when appropriate and would not intercept pointer events.

Optional neon and hover animation could be subtle, would not flash aggressively or impede reading, and could respect reduced-motion preferences. The page would not depend on animation for comprehension.

#### Illustrative scenario: Navigating without a pointer or with reduced motion

- **WHEN** a visitor navigates by keyboard, uses a screen reader or requests reduced motion
- **THEN** controls, connection details and feedback remain understandable and operable with a visible focus indication and without required animation

### Mockup note: Implementation and visual verification

The site could be a functional static page rather than a single scaled image. Text, controls, data, backgrounds and decorative artwork could be separable. SVG is suitable for icons and vector elements; appropriately optimized raster assets with transparency and sufficient resolution are suitable for illustrations. Artwork would not be stretched, and expensive full-surface blur could be avoided. Optimized WebP or PNG artwork with transparency, SVG icons and suitable web fonts could be used; explicit image dimensions could reduce layout shift, duplicate large assets could be avoided, and heavy background video would not be required. Characters would not be replaced with icons or emoji. The raster reference does not supply editable layers, original fonts or isolated assets; faithful artwork may require extraction, redrawing or recreation.

Visual verification could compare the desktop implementation with `mockup.png` at 1448 × 1086, especially composition, positions, scale, character crops, readability and illustrated card areas. Responsive and copy behavior could also be checked. Online status, player counts, ping, numeric IP addresses, passwords, hardware metrics, server versions, mod lists, modpack downloads, administration, availability history and site authentication are outside the scope of the earlier reproduction idea. The page would not add purchasing, subscriptions, pricing, payments, a social feed, testimonials, reviews, news, a team section, invented navigation, generic advertising or motivational slogans.

#### Illustrative scenario: Verifying the implementation

- **WHEN** the completed page is compared with the reference and exercised at desktop and narrow widths
- **THEN** the layout retains the specified visual identity and content while the nine copy controls and responsive presentation remain usable
