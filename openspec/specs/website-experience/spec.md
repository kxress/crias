# CRIAS GAMES website

## Purpose

Define the intended experience of the CRIAS GAMES private game-server website. `mockup.png` is the primary visual reference; `docs/mockup-reference.md` records detailed observations. The site SHALL closely reproduce and refine that reference as an animated, responsive experience. The user has confirmed its connection details; the site itself is not yet implemented to this specification.

## Requirements

### Requirement: A private server directory
The site SHALL be a Brazilian Portuguese, single-page entry point for a private gaming community. It SHALL introduce CRIAS GAMES, explain how to join the private network, and present game servers and their connection details in that order. The directory SHALL be accessible without completing onboarding.

#### Scenario: Visitor opens the page
- **WHEN** a visitor views the site
- **THEN** they can understand its private-server purpose, find the joining process, and browse the game directory

### Requirement: Composition based on the mockup
The desktop experience SHALL closely reproduce and refine the mockup's continuous synthwave arcade composition, with a central wordmark and content panels framed by the reference's fourteen characters and classical bust. A sunset, skyline, wireframe mountains, and perspective grid SHALL establish the scene in deep purple, magenta, cyan, and blue. The footer SHALL read `Crias 🄯 2026` and include a retro computer motif. The copyleft glyph SHALL render as Unicode U+1F12F through an emoji font with the same neon text glow. Character identities and placement are documented in `docs/mockup-reference.md`.

#### Scenario: Comparing the desktop composition
- **WHEN** the page is compared with `mockup.png` at a similar desktop viewport
- **THEN** the hero, four-step joining panel, three illustrated game cards, surrounding collage, and footer retain the reference's hierarchy and recognizable visual character

### Requirement: Hero and environment
The hero SHALL center the CRIAS GAMES wordmark, cyan underline and `SERVERS PRIVADOS` cursive subtitle over the striped sunset and skyline without the removed two-line introductory callout. The scene SHALL include open starry sky, clearly visible wireframe mountains confined to the side corners clear of the sun, text-only Japanese neon signs layered in front of the city, and magenta perspective grid depicted in the reference; stars SHALL remain above the ground grid. The center sky SHALL retain its original dark purple color while the side edges are brighter enough to distinguish the mountains. Soft cloud layers SHALL drift horizontally at different parallax speeds above the sun, while ending above the skyline so they never cover buildings. The shared skyline/grid horizon SHALL sit higher on the page. The striped sun SHALL be about 1.8 times its previous CSS diameter (roughly 320–326px across 1448–1920px desktop widths), use `clip-path: inset(0px 0px 25%)`, and use colored bands separated by transparent cutouts that reveal the sky only in the lower half. Its desktop lift SHALL be about 148px under the existing horizon calculation. The sun SHALL NOT have a neon glow or neon-pulse animation; a brief non-glowing glitch is allowed. The sun SHALL sit behind and enter the upper skyline slightly. No lagoon or separate water-reflection layer SHALL be rendered. The city SHALL use `opacity: 1` and `mix-blend-mode: normal`; atmospheric filters SHALL be applied as CSS filters and the skyline SHALL remain opaque over the mountain and grid layers except for a short fade at its lower edge. The wireframe mountains SHALL remain below the skyline layer and SHALL NOT show through opaque building pixels. A wide, low fog band SHALL blend the skyline's lower edge into the grid without a hard horizontal cutoff. The page SHALL NOT include the striped right-side facade panel. The grid SHALL continue around the panels and footer.

#### Scenario: Reading the hero
- **WHEN** a visitor opens the page at desktop width
- **THEN** the wordmark dominates the central scene while the introduction remains legible against the scenery

### Requirement: Character and statue composition
The desktop collage SHALL preserve the fourteen named reference characters in their corresponding upper-left, upper-right, left-side and right-side groups, with their recognizable silhouettes and individual illustrations. Character and bust illustrations SHALL have sufficient transparent effect clearance for their full neon glows to remain visible. Portrait bottom fades SHALL align to visible artwork within padded canvases so they blend the lower legs without hiding bodies or glow. The classical vaporwave bust, pixel sunglasses and ornamental column SHALL remain one integrated illustration, placed in two instances at the lower left and right sides of the footer; the right instance SHALL be horizontally mirrored with CSS. Rei and Usagi SHALL use separate Windows-style frames; the four left-side portraits SHALL remain unframed for visual consistency.

#### Scenario: Inspecting the collage
- **WHEN** a visitor views the desktop composition
- **THEN** the individual characters and bust frame the content without covering text, controls or each other's essential features

### Requirement: Joining panel presentation
The joining panel SHALL use a glowing magenta frame, globe icon, heading and divider. Heading dividers SHALL pulse through border color without an inset shadow across the heading area. Its four numbered steps SHALL appear in sequence, horizontally on wide screens, with icons and progression cues. The management URL SHALL appear as readable text in a neon inset with a copy control. All neon details inside either main panel, including Japanese labels, URL text and frame, icons, step badges, chevrons and copy controls, SHALL be pink while idle and shift to cyan together when the panel is hovered or contains keyboard focus; their glow animation SHALL continue in either state. Copy feedback SHALL appear in a document-level floating toast above the footer and copyleft text, positioned clear of footer text when visible, without affecting layout.

#### Scenario: Following the desktop steps
- **WHEN** a visitor reads the joining panel at desktop width
- **THEN** the four steps progress left to right and the URL remains readable and operable

### Requirement: Illustrated server panels
The directory SHALL use a glowing magenta outer panel and three equally sized, illustrated game cards on desktop. Their header backgrounds SHALL use recognizable in-game or official promotional screenshots: an early-game Terraria scene, an iconic Minecraft title-screen or world image, and a Hytale environment. Minecraft's lower card area SHALL use a real official/in-game landscape screenshot. CSS SHALL NOT synthesize terrain, block silhouettes, or other game scenery, nor obscure selected screenshot artwork with textures. CSS may style card borders, labels, and layout. Terraria SHALL use cyan accents, Minecraft SHALL use green accents, and Hytale SHALL use blue accents. The server-list wrapper SHALL have no separate background or border, while individual server rows SHALL retain dark fills and fine borders for readability. Cards SHALL retain the mockup's game identity, row hierarchy, badges and decorative space, and their outlines SHALL shift to cyan while hovered or focused. Version/modpack badges SHALL share pink idle and cyan card-hover/focus colors rather than using per-badge colors. Neon details inside the outer directory panel SHALL be pink while idle and shift together to cyan when the panel is hovered or contains keyboard focus, including its Japanese label, gamepad icon, divider and copy-control borders.

#### Scenario: Comparing game cards
- **WHEN** a visitor views the directory on a wide screen
- **THEN** the three cards appear side by side in reference order, with recognizable game-specific artwork and legible server rows

### Requirement: Distinct illustrated elements
Each character SHALL be a separate illustration, independently positionable and scalable, rather than part of a combined character image. Portrait frames, the statue, and other distinct decals SHALL also be independently controllable. Artwork SHALL frame content without obscuring it or intercepting interaction.

#### Scenario: Adapting the scene
- **WHEN** available space becomes limited
- **THEN** individual decorations can be repositioned and resized while essential content and controls remain visible

### Requirement: Independently animated scene
The title SHALL be text animatable with CSS. Borders and neon SHALL use CSS or SVG rather than flattened artwork. Scenery, including the sun, skyline, mountains, grid and lighting, SHALL have independently controllable layers. Neon SHALL pulse and the perspective grid SHALL move slowly to evoke retrowave. Each static character illustration SHALL move as a whole, like a billboard, without frame-by-frame or internal character animation.

#### Scenario: Animating the scene
- **WHEN** motion is enabled
- **THEN** scenery and lighting can move independently, the title can animate as text, and each character can move as a single illustration

### Requirement: Coordinated motion
The scene SHALL feel alive through coordinated independent motion, with a slow moving grid and pulsating neon guided by the mockup's aesthetic. Effects near text and controls SHALL preserve legibility and interaction feedback. Character movement SHALL remain gentle; independent layers SHALL permit refinement without merging the scene into a single animation.

#### Scenario: Reading while the scene moves
- **WHEN** ambient motion is active
- **THEN** the visitor can read and operate the page without the effects obscuring content or shifting controls

### Requirement: Complete mobile character collage
All fourteen reference characters SHALL remain represented on mobile. Their independently placed illustrations SHALL be freely rearranged and resized to suit the narrower composition; the mobile layout SHALL NOT be constrained to the desktop placement. The artwork SHALL leave the text and controls legible and operable.

#### Scenario: Viewing the mobile scene
- **WHEN** a visitor views the site on a phone
- **THEN** all fourteen characters remain present in a mobile-specific composition without blocking content or forcing horizontal page scrolling

### Requirement: Responsive, accessible content
The site SHALL use real, selectable HTML text, semantic structure, accessible control names, visible keyboard focus, sufficient contrast, and information that does not depend on color alone. Instructions, complete connection values, and controls SHALL remain usable on narrow screens and at enlarged text sizes without page-level horizontal scrolling. Decorative images SHALL not be required to understand the content.

#### Scenario: Using a narrow viewport
- **WHEN** the visitor uses a phone or enlarges text
- **THEN** joining steps and game cards reflow in reading order and connection values remain accessible

### Requirement: Motion and static hosting
Every visible neon accent, including the title, subtitle, Japanese labels, scene lines, panel and card borders, headings, icons, controls and footer decorations, SHALL pulse visibly and show occasional restrained flicker while motion is enabled. Flicker SHALL remain infrequent and low-intensity so text and controls stay readable. The site SHALL respect reduced-motion preferences and SHALL NOT require animation to understand or use it. Essential content SHALL remain readable without JavaScript or decorative assets. The site SHALL be deployable as static files on GitHub Pages, including under a repository subpath.

#### Scenario: Reduced motion or scripts unavailable
- **WHEN** the visitor requests reduced motion or scripts do not run
- **THEN** the page remains readable and usable without nonessential animation

### Requirement: Reference-specific visual fidelity
The desktop site SHALL reproduce the reference's visual hierarchy, relative placement, scale, palette, character identities, collage treatment, card illustrations and scene depth. Refinements SHALL preserve the mockup's composition and informal personality. A secondary animation reference SHALL NOT supersede the mockup.

#### Scenario: Visual review
- **WHEN** the page is compared with `mockup.png` at 1448 by 1086 CSS pixels
- **THEN** the hero, sun, skyline, bust, all character groups, four-step panel, three game cards, grid and footer are recognizably arranged like the reference

### Requirement: Character asset integrity
The site SHALL show the fourteen reference characters as separate recognizable illustrations, without merged characters or substituted generic mascots. Desktop placements SHALL match the character groups and order documented in `docs/mockup-reference.md`. Character images SHALL preserve their entire provided silhouettes without side cropping. Their visible artwork SHALL use the available image area effectively; a CSS fade may blend only the final portion of their lower interior edges without cutting off the glow or body. Any derived raster variants SHALL preserve earlier numbered files. Rei and Usagi window frames SHALL be independent from the illustrations they surround.

#### Scenario: Inspecting the collage
- **WHEN** each character is individually inspected
- **THEN** its identity and essential features are discernible, and the image can be moved independently of other characters

### Requirement: Visible mobile character composition
All fourteen character illustrations SHALL be visible in the mobile page's normal scroll flow, arranged independently around or between sections without covering text or controls. The page SHALL NOT depend on a visitor opening a separate gallery or toggling decorations to see them.

#### Scenario: Scrolling the mobile page
- **WHEN** a visitor scrolls a 320 CSS-pixel-wide viewport from top to bottom
- **THEN** all fourteen character illustrations can be seen and the page has no horizontal overflow

### Requirement: Motion accessibility
The site SHALL NOT show a manual pause/resume control. Reduced-motion preference SHALL stop nonessential CSS and pointer-driven animation, including character motion, fluid smoke, and card tilt, without relying on a control or overriding the preference. Motion SHALL NOT obscure content, interfere with input or flash beyond WCAG 2.2 AA limits.

#### Scenario: Reduced motion
- **WHEN** reduced motion is enabled before or during a visit
- **THEN** nonessential animation stops immediately, including when the preference changes while the page is open

#### Scenario: Scripts unavailable
- **WHEN** JavaScript is unavailable
- **THEN** the site remains readable, essential content stays available, and no nonfunctional motion control appears

### Requirement: Accessible responsive presentation
The site SHALL meet WCAG 2.2 AA contrast and target-size requirements, expose logical landmarks and headings, and keep full connection values accessible without horizontal page scrolling at 320 CSS pixels and at 200% zoom. Decorative artwork SHALL be excluded from the accessibility tree and pointer targeting.

#### Scenario: Navigating with a keyboard
- **WHEN** a visitor uses keyboard navigation
- **THEN** all actionable controls have descriptive names, visible focus and a logical focus order
