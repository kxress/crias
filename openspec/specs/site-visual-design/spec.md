# Site Visual Design Specification

## Purpose

Define the visual identity, content, layout and behavior of the CRIAS GAMES landing page, using the root `mockup.png` as the desktop visual reference. The reference is a single 1448 × 1086 raster image; positions, sizes and fonts are approximate, and its artwork is not a substitute for real, responsive HTML content. The site presents private game servers in Brazilian Portuguese and SHALL remain compatible with static GitHub Pages hosting.

## Requirements

### Requirement: Visual identity and composition

The site SHALL reproduce the mockup's dense synthwave, vaporwave, anime, arcade and cyberpunk aesthetic as a single continuous scene, with a clear central reading column framed by decorative artwork. It SHALL feel independent, informal and personalized. The desktop composition SHALL place the hero, joining instructions, server directory and footer in that order. Around the reference resolution, the hero occupies approximately y=0–410, the joining panel y=410–605, the directory y=615–1010 and the footer y=1020–1086. The centered panels are approximately 1100 px wide at most, with the directory slightly wider than the joining panel. These measurements guide visual comparison rather than imposing fixed coordinates.

The mockup is the approved design, not merely inspiration: its dense character collage, game-specific artwork, central information hierarchy and neon environment SHALL be retained together. The visual brand SHALL be `CRIAS GAMES`. The page SHALL NOT add hearts, cute animal mascots or stickers, romantic copy, unnecessary title ornaments, corporate dashboard elements, Kress branding, a navigation bar, hamburger menu, login, registration form, additional social links, invented statistics, status panels or an extra notes section.

#### Scenario: Viewing the desktop composition

- **WHEN** a visitor views the page at a wide desktop viewport
- **THEN** the hero, two neon panels and footer form a centered continuous composition, surrounded by artwork that does not obstruct content

### Requirement: Color, light and typography

The palette SHALL use near-black and deep purple backgrounds, magenta and pink structural neon, cyan and electric-blue accents, and an orange-red sunset. Suggested CSS approximations are `#10071F` and `#230B35` for backgrounds, `#21102F` for panels, `#15142B` for cards, `#FF35D5` and `#FF80E8` for pink, `#B94DFF` for purple, `#12EDFF` for cyan, `#589BFF` for blue, `#47F78B` for Minecraft green, `#FFC45D` for the Alpha badge, `#FF253E` and `#FF7B32` for the sun, and `#FFF0FC` for light text. Gradients and lighting MAY vary these colors.

Main panels SHALL have rounded corners, dark sufficiently opaque interiors, saturated continuous outlines and layered inner and outer neon glows. Inner cards and rows SHALL use finer borders and more restrained glows. The logo SHALL use large, irregular, sharply angled brush-style lettering; section headings SHALL use heavy italic uppercase sans-serif; interface text SHALL use legible sans-serif; and the footer SHALL use a strong, legible sans-serif treatment. Approximate desktop sizes are 65–85 px for the logo, 24–29 px for the subtitle, 17–19 px for the introduction, 29–35 px for section headings, 16–19 px for step titles, 13–15 px for descriptions, 13–16 px for hosts, 12–14 px for badges and 22–25 px for the footer. Exact fonts and sizes MAY be adjusted for visual similarity and readability.

#### Scenario: Reading illuminated content

- **WHEN** text and controls appear over the neon scene
- **THEN** the glow supports the arcade aesthetic without reducing their contrast or legibility

### Requirement: Synthwave background

The background SHALL include a subtly textured, starry dark-purple sky; a large centered striped red-to-orange sun behind the logo; a layered futuristic skyline with dark towers, antennas and cyan-lit windows; blue and cyan triangular wireframe mountains; and a glowing magenta perspective grid extending from the hero to the footer, with larger apparent cells toward the bottom. Subtle grain and scanlines MAY suggest a VHS image without obscuring the scene.

The sun SHALL be a stylized striped synthwave disc, with a warm yellow lower region, red glow and a lower portion partly hidden by the skyline. The dark wireframe mountains SHALL flank the hero, and the perspective grid SHALL remain visible between the panels and below the footer rather than ending behind the content.

The upper-right scenery SHALL include a purple and blue Japanese urban facade with a bright pink `カフェ` sign. The left side near the statue SHALL include the vertical pink neon inscription `ゲームサーバー`. These signs are decorative, not navigation.

#### Scenario: Viewing the backdrop

- **WHEN** the full desktop page is visible
- **THEN** the sun, skyline, wireframe mountains and perspective grid create depth behind the interface, with the specified Japanese signs in their respective locations

### Requirement: Character framing

Fourteen recognizable female characters SHALL frame the desktop interface in the following order and general regions:

- Upper left: Rei Ayanami in a tilted pink retro window labeled `レイ`, Makima, and Tifa Lockhart.
- Upper right: Asuka Langley, Nami, and Hayase Nagatoro, with Nagatoro partially cropped by the right edge.
- Left side, descending: Kurisu Makise, Faye Valentine, Hinata Hyuga, and Rem.
- Right side, descending: Usagi Tsukino in a tilted pink retro window, Aqua, Mayano Top Gun, and Super Creek.

The upper portraits SHALL preserve their identifying traits: Rei's short pale-blue hair and red eyes; Makima's red-orange hair and golden eyes; Tifa's long black hair and white-and-black clothing; Asuka's orange hair and red plugsuit; Nami's orange hair, wink and visible spiral arm tattoo; and Nagatoro's dark hair, tan skin and broad smile. Side portraits SHALL preserve their recognizable hair, clothing and expressions: Kurisu's long reddish-brown hair, Faye's dark short hair and yellow details, Hinata's dark blue hair and pale eyes, Rem's short blue hair and maid outfit, Usagi's blonde buns and sailor uniform, and Aqua's blue hair and raised arm. Mayano and Super Creek SHALL retain distinct horse ears, hairstyles and silhouettes; their features SHALL NOT merge or be replaced with cat or dog ears.

Rei's window SHALL have a light-pink frame, lilac title bar and three small decorative controls including a close control. Makima and Tifa SHALL be large unframed figures, and Asuka, Nami and Nagatoro SHALL remain prominent on the right. Nami SHALL have a cheerful wink and a hand near her face; Nagatoro SHALL lean toward the center.

The four separate left-side portraits SHALL retain white photo-like borders and alternating tilts: Kurisu has a white shirt and blue eyes; Faye has a headband, sideways glance, cigarette and yellow-orange clothing; Hinata has pale lavender eyes and a gentle expression; Rem has a visible blue eye, floral hair accessories and a maid outfit. They SHALL remain below the statue and outside the server text.

Usagi SHALL appear winking and making a peace sign inside a tilted light-pink retro window with a lilac title bar and decorative controls. Aqua SHALL be an independent unframed cutout, laughing with closed eyes and pointing upward, with a high blue ponytail and yellow accessory. The lower right SHALL contain two distinct Uma Musume portraits: Mayano above, with light-brown or orange hair, horse ears, a wink and colorful accessories; and the larger Super Creek below, with long reddish-brown hair, horse ears, blue eyes and a blue-and-white hair accessory. Their irregular white sticker outlines, slight tilts, overlaps and pink or lilac tape SHALL convey a physical collage.

The lower left and lower right collages SHALL use individually cut, light-edged stickers or photos, staggered and tilted rather than precisely aligned. Minor overlap is allowed only if faces and essential features remain visible. The artwork SHALL have coherent lighting, saturation, shadows and clean natural crops; characters SHALL NOT merge, cross server cards, cover text or intercept pointer events. No extra characters SHALL be introduced.

#### Scenario: Inspecting the decorative frame

- **WHEN** the desktop composition is viewed
- **THEN** all fourteen characters appear in their specified regions, retain recognizable features and remain separate from readable and interactive content

### Requirement: Vaporwave statue

A prominent classical male bust and Ionic-style column SHALL occupy the left side between the upper characters and lower portraits. The bust SHALL combine sculpted marble, curled hair, short sculpted beard, muscular neck, pronounced jaw and a confident upward-right gaze associated with Gigachad. Its pixel glasses SHALL align with the eyes and use square black and white pixels rather than ordinary sunglasses. It SHALL wear angled black 8-bit sunglasses with small white pixel reflections. Cyan, magenta and violet light SHALL model the stone, shoulders and fragmented lower edge; the column SHALL have ornamental spiral volutes and pink-lit purple edges. It SHALL read as a sculpture rather than a filtered photograph and SHALL NOT obscure the instructions.

#### Scenario: Viewing the statue

- **WHEN** the desktop frame is visible
- **THEN** the classical bust, pixel sunglasses and ornamental column are recognizable without covering the joining panel's content

### Requirement: Hero content

The hero SHALL center the exact wordmark `CRIAS GAMES` over the sun, rendered in white-to-pink aggressive italic brush lettering with magenta outline or shadow and glow. A curved, irregular cyan brushstroke SHALL underline it. The subtitle SHALL read `SERVIDORES DE JOGOS PRIVADOS` in bold italic uppercase. A centered, dark rounded callout with a cyan border and glow, approximately 560 px wide in the reference, SHALL contain the following Portuguese text:

> Servidores privados de Terraria, Minecraft e Hytale.
>
> Instale o NetBird, entre na rede e conecte nos hosts abaixo.

The callout SHALL remain narrower than the main panels. No extra slogan or authorship text SHALL be added.

#### Scenario: Reading the hero

- **WHEN** a visitor arrives at the page
- **THEN** the brand is dominant, followed by the subtitle and the two-line introduction

### Requirement: Joining instructions

The first panel SHALL have a pink outline globe icon, the heading `COMO ENTRAR`, a divider, and exactly four numbered steps. At desktop width the steps SHALL read left to right, with pink number squares, relevant icons, bold titles, left-aligned descriptions and glowing right-pointing chevrons between steps. The steps SHALL present the following Portuguese content in order:

1. `Instale o NetBird` — `Baixe e instale o NetBird no seu PC (Windows, Linux ou macOS).` Use an orange NetBird-inspired icon.
2. `Configure a URL` — `No NetBird, defina o Management URL como:` followed by `https://netbird.kress.wtf` in a dark cyan-outlined inset with a copy control. Use a pink chain icon.
3. `Peça um invite pro Crias` — `Envie uma mensagem para o Crias (Discord/WhatsApp) solicitando o seu convite. O convite é manual e não é gerado automaticamente.` Use a pink envelope icon.
4. `Conecte e jogue!` — `Após entrar na rede, conecte-se nos servidores listados abaixo e bora jogar.` Use a pink check icon.

The joining panel SHALL have a dark purple gradient, rounded corners, a magenta outline and glow, generous padding and a thin neon divider below its heading. Its URL field SHALL have a dark background, rounded cyan border and glow, bright cyan text and an overlapping-rectangles copy icon. The invitation SHALL clearly be manual; the page SHALL NOT suggest public access or provide automatic registration. The URL SHALL remain selectable or copyable. The mockup does not show a download button.

#### Scenario: Following the connection process

- **WHEN** a visitor reads the instructions
- **THEN** the four steps explain installation, the exact management URL, a manual invitation and connection in that order

### Requirement: Server directory content

The second panel SHALL be headed by a pink gamepad icon, `SERVIDORES`, a vertical separator and `SERVIDORES DISPONÍVEIS NA REDE PRIVADA`. It SHALL present the following eight entries in order, grouped by game, with the shown labels and ports. The Hytale protocol SHALL be explicitly displayed as `Porta: 5520 / UDP`.

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

These are reference display values, not proof of operational DNS or services. Before publication, the management endpoint and hostnames SHALL be reconciled with actual infrastructure; the visual brand, management domain, game hostnames and footer address have distinct roles and SHALL NOT be automatically substituted for one another. Server data SHALL be maintained separately from the visual markup so verified values can be updated. Each structured record SHALL retain game, hostname, category, port, protocol and badge color or variant. TCP is technical data for Terraria and Minecraft and SHALL NOT be displayed as protocol text; only Hytale explicitly displays `/ UDP`.

#### Scenario: Finding server details

- **WHEN** a visitor reads the directory
- **THEN** the eight reference entries appear in their specified game groups with their hostnames, types and ports, including Hytale's UDP protocol

#### Scenario: Preparing for publication

- **WHEN** connection values are prepared for the published site
- **THEN** they are checked against actual DNS and services rather than assumed operational from the mockup

### Requirement: Game card presentation

At desktop width the Terraria, Minecraft and Hytale cards SHALL appear left to right, aligned at top and bottom. Terraria and Minecraft SHALL be comparably wider than Hytale, approximately 35:36:27 before gaps. Each card SHALL have a distinct luminous border, illustrated branded header and dark interior.

Terraria SHALL use cyan accents and a pixel-art header with a recognizable Terraria logo, tree, vegetation, mountains and purple-blue sky. Its four rows SHALL have cyan Vanilla and magenta Calamity badges. Minecraft SHALL use green accents and a header with a recognizable stone-style MINECRAFT logo, grass block, Creeper and block scenery. Its three badges SHALL distinguish Vanilla in lilac, Better MC in cyan-blue and Modpack in violet. The intentionally open lower area SHALL retain a dark teal-green gradient and pixelated vegetation and blocks, without added metrics. Hytale SHALL use electric-blue accents, a recognizable metallic HYTALE logo and a yellow-orange Alpha badge. Its large lower area SHALL retain a pixel-art fantasy landscape with blue twilight, pink clouds, stone ruins, towers, vegetation and depth; it SHALL NOT become a flat background.

#### Scenario: Comparing game cards

- **WHEN** a visitor views the directory on a wide screen
- **THEN** the three illustrated cards have distinct game identities and retain the specified decorative lower areas

### Requirement: Server rows and copy controls

Each server entry SHALL use a shared dark rounded row with a light lilac outline, bold readable hostname, colored type pill, visible port and a pink neon-framed copy icon at the right. Each row SHALL put the hostname above the category badge and port, with the copy control to the right. Copy controls SHALL use two overlapping rounded rectangles. Long hostnames SHALL remain fully accessible and SHALL NOT silently disappear or overlap controls; wrapping or accessible overflow is acceptable. The page SHALL provide eight independent server copy buttons and one management URL copy button.

Each server button SHALL copy only its displayed hostname, without the port or extra characters. The management button SHALL copy the complete URL. Copying SHALL use the Clipboard API when available and provide a usable fallback or a clear error when copying is unavailable or denied. Controls SHALL be keyboard operable and have descriptive accessible names. Successful copies SHALL give brief, accessible feedback such as `Copiado!`, without resizing the button, moving the layout, changing the hostname or preventing an immediate repeat. An error SHALL be communicated discreetly. Hover and visible keyboard focus states SHALL reinforce the neon treatment.

#### Scenario: Copying a connection value

- **WHEN** a visitor activates a server copy button or the management URL copy button
- **THEN** the corresponding hostname alone or complete URL respectively is copied, and a temporary confirmation is shown and announced without shifting the layout

#### Scenario: Copying is unavailable

- **WHEN** the browser does not permit a copy operation
- **THEN** the visitor receives a discreet accessible error and can still select the displayed value

### Requirement: Footer

The footer SHALL sit beneath the directory directly over the continuing grid, without its own card. It SHALL center a small retro computer icon and the exact lowercase text `crias.games`, flanked by short pink neon horizontal lines. The text SHALL use a strong, light-colored sans-serif style with pink glow. No secondary signature or decorative slogan SHALL be added.

#### Scenario: Reaching the footer

- **WHEN** a visitor reaches the end of the directory
- **THEN** the computer icon and `crias.games` provide a centered visual ending over the grid

### Requirement: Layering and responsive layout

The scene SHALL layer the base, sky and texture, sun, skyline, facade, wireframe mountains, grid, characters and statue, hero text, panels and their content, side portraits in the decorative margins, and interactive focus states. Separate stacking contexts MAY be used. Panels SHALL isolate their content so that no character is partially visible through their backgrounds, between server rows or across text. Side artwork SHALL remain in intentional margins; it SHALL NOT be hidden behind opaque cards leaving fragments of faces or bodies visible. Character cutouts SHALL have clean transparency and hair edges, without residual rectangles, unwanted halos, duplicated limbs or merged figures; intentional white photo and sticker borders SHALL remain. Decorative elements SHALL NOT block pointer interactions or obscure text, icons, hosts or steps.

At wide desktop widths around 1448 px and above, the layout SHALL preserve the four horizontal steps, three side-by-side cards, centered logo and side portraits where space permits. At intermediate desktop widths around 1100-1447 px, margins and side artwork MAY scale down while the three cards remain side by side for as long as their hostnames remain legible. At tablet widths around 768-1099 px, steps MAY reflow into two columns or stack; Terraria and Minecraft MAY share a row with Hytale below, and side artwork MAY be reduced or selectively hidden. These breakpoints are guides, and the actual reflow SHALL be based on available space and readability. On narrow screens below approximately 768 px, touch-friendly copy controls SHALL remain accessible, and steps and cards SHALL stack in their original order, progression cues MAY become vertical or simplified, the logo and callout SHALL fit the viewport, and decorative portraits MAY be reduced, repositioned or hidden. The synthwave background SHALL remain recognizable. Functional content and controls SHALL remain available without accidental horizontal page scrolling.

#### Scenario: Viewing on a narrow screen

- **WHEN** a visitor uses a phone-sized viewport
- **THEN** the instructions and game cards remain readable and operable in order, complete hostnames remain accessible and no decorative artwork forces horizontal scrolling

### Requirement: Accessibility and motion

Visible site copy SHALL be Brazilian Portuguese and rendered as real HTML text, with semantic heading order and sufficient contrast. Controls SHALL have accessible names and visible focus. Copy feedback SHALL be available to screen readers. Ports and protocol SHALL be textual rather than conveyed only by color. Purely decorative characters, statue, stars and grid SHALL be hidden from the accessibility tree when appropriate and SHALL NOT intercept pointer events.

Optional neon and hover animation SHALL be subtle, SHALL NOT flash aggressively or impede reading, and SHALL respect reduced-motion preferences. The page SHALL NOT depend on animation for comprehension.

#### Scenario: Navigating without a pointer or with reduced motion

- **WHEN** a visitor navigates by keyboard, uses a screen reader or requests reduced motion
- **THEN** controls, connection details and feedback remain understandable and operable with a visible focus indication and without required animation

### Requirement: Implementation and visual verification

The site SHALL be a functional static page rather than a single scaled image. Text, controls, data, backgrounds and decorative artwork SHALL be separable. SVG is suitable for icons and vector elements; appropriately optimized raster assets with transparency and sufficient resolution are suitable for illustrations. Artwork SHALL NOT be stretched, and expensive full-surface blur SHOULD be avoided. Optimized WebP or PNG artwork with transparency, SVG icons and suitable web fonts MAY be used; explicit image dimensions SHOULD reduce layout shift, duplicate large assets SHOULD be avoided, and heavy background video SHALL NOT be required. Characters SHALL NOT be replaced with icons or emoji. The raster reference does not supply editable layers, original fonts or isolated assets; faithful artwork may require extraction, redrawing or recreation.

Visual verification SHALL compare the desktop implementation with `mockup.png` at 1448 × 1086, especially composition, positions, scale, character crops, readability and illustrated card areas. Responsive and copy behavior SHALL also be checked. Online status, player counts, ping, numeric IP addresses, passwords, hardware metrics, server versions, mod lists, modpack downloads, administration, availability history and site authentication are outside this reproduction's scope. The page SHALL NOT add purchasing, subscriptions, pricing, payments, a social feed, testimonials, reviews, news, a team section, invented navigation, generic advertising or motivational slogans.

#### Scenario: Verifying the implementation

- **WHEN** the completed page is compared with the reference and exercised at desktop and narrow widths
- **THEN** the layout retains the specified visual identity and content while the nine copy controls and responsive presentation remain usable
