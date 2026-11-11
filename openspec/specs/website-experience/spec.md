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
The hero SHALL center the CRIAS GAMES wordmark, cyan underline and `Servers Privados` cursive subtitle over the striped sunset and skyline without the removed two-line introductory callout. The scene SHALL include open starry sky, clearly visible organic, uneven mountain ridges with layered triangulated neon wireframes confined to the side corners clear of the sun. The mountains SHALL suggest a retrowave valley in perspective, with broad irregular terrain facets receding toward the horizon instead of repeated cones; use the supplied [Synthwave Mountains CodePen](https://codepen.io/rickpr/pen/xxxyVxZ) as a visual reference. Both corner ranges SHALL be clipped from opposite halves of one transparent panoramic white-wireframe PNG and tinted the same cyan by one CSS rule, with subtle fills in some triangulated faces. Text-only Japanese neon signs SHALL layer in front of the city, and the magenta perspective grid SHALL follow the reference; stars SHALL remain above the ground grid. The center sky SHALL retain its original dark purple color while the side edges are brighter enough to distinguish the mountains. Distinct cloud layers SHALL scroll continuously left in seamless loops at different parallax speeds above the sun; the slow far layer SHALL pass behind the mountains while faster middle and near layers SHALL pass in front, and all clouds SHALL end above the skyline so they never cover buildings. The shared skyline/grid horizon SHALL sit higher on the page. The striped sun SHALL be about 1.8 times its previous CSS diameter (roughly 320–326px across 1448–1920px desktop widths), use `clip-path: inset(0px 0px 25%)`, and use colored bands separated by transparent cutouts that reveal the sky only in the lower half. Its desktop lift SHALL be about 116px under the existing horizon calculation. The sun SHALL NOT have a neon glow or neon-pulse animation; a brief non-glowing glitch is allowed. The sun SHALL sit behind and enter the upper skyline slightly. No lagoon or separate water-reflection layer SHALL be rendered. The city SHALL use `opacity: 1` and `mix-blend-mode: normal`; atmospheric filters SHALL be applied as CSS filters and the skyline SHALL remain opaque over the mountain and grid layers except for a short fade at its lower edge. The wireframe mountains SHALL remain below the skyline layer and SHALL NOT show through opaque building pixels. A wide, low fog band SHALL blend the skyline's lower edge into the grid without a hard horizontal cutoff. The page SHALL NOT include the striped right-side facade panel. The grid SHALL continue around the panels and footer.

Both halves of the single mountain PNG SHALL receive the same cyan CSS tint and translucent face fill, preserving continuous visual brightness between the left and right ranges. The tint SHALL be slightly darker at the upper edge, with a very subtle blurred haze over only the upper portion; lower ridges SHALL stay crisp. The shared top offset SHALL use `clamp(128px, 13vh, 148px)`; rotate the left half by 5deg and the right by -5deg, anchor the rotations at the lower outer corners, and use only a subtle outward offset to avoid wide edge crops. The slow far cloud layer SHALL pass behind the mountain layer; the faster middle and near cloud layers SHALL pass in front of the mountains but behind the city. Cloud sprites SHALL drift continuously left while visible, fade out only after clearing the sky viewport, have soft alpha-faded sprite edges, and never pause visibly before looping or be clipped by the sky container.

Clouds SHALL use anime-inspired, voluminous cumulus sprites with pale cyan-blue lit tops and indigo/lavender shadow planes, soft edges and subtle violet bounce light. Each isolated sprite SHALL move independently left across the sky with staggered timing; the sprites SHALL form far, middle and near depth planes that move at distinct parallax speeds. The artwork SHALL remain painterly and stylized without thick outlines or photoreal texture, stay clipped to the sky and never cover the city. Reduced motion and the static graphics fallback SHALL show the sprites without animation. The striped sun SHALL animate its stripes and brief glitch about 1.5 times faster than the previous timing, using a 6-second stripe loop and an 8-second glitch cycle.

#### Scenario: Reading the hero
- **WHEN** a visitor opens the page at desktop width
- **THEN** the wordmark dominates the central scene while the introduction remains legible against the scenery

### Requirement: Character and statue composition
The desktop collage SHALL preserve the fourteen named reference characters in their corresponding upper-left, upper-right, left-side and right-side groups, with their recognizable silhouettes and individual illustrations. Character and bust illustrations SHALL have sufficient transparent effect clearance for their full neon glows to remain visible. Portrait bottom fades SHALL align to visible artwork within padded canvases so they blend the lower legs without hiding bodies or glow. The classical vaporwave bust, pixel sunglasses and ornamental column SHALL remain one integrated illustration, placed in two instances at the lower left and right sides of the footer; the right instance SHALL be horizontally mirrored with CSS. Rei and Usagi SHALL use separate Windows-style frames; the four left-side portraits SHALL remain unframed for visual consistency.

#### Scenario: Inspecting the collage
- **WHEN** a visitor views the desktop composition
- **THEN** the individual characters and bust frame the content without covering text, controls or each other's essential features

### Requirement: Footer character collage
The footer SHALL include separate transparent illustrations of Shantae and anime Marie Rose on the left, and chibi Oguri Cap eating rice with chibi Tamamo Cross reacting on the right. On wide desktop layouts, the cumulative outward offsets SHALL be about 48–64px for Shantae, 80–96px for Marie Rose, and 64–80px for Oguri and Tamamo, preserving clear space around the centered signature, side-column portraits and each other. In the footer collage, Shantae SHALL sit 8px higher, Marie Rose 32px higher, Oguri 40px higher and Tamamo 24px higher than their previous positions. Their numbered masters and derivatives SHALL be preserved with recorded provenance, clear silhouettes, alpha clearance for glow and CSS bottom fades. The four new characters SHALL supplement the original fourteen, with no backgrounds or photo frames, and SHALL leave the centered footer signature and controls unobscured. Both footer bust statues SHALL remain static and mirrored around the signature, each 16px farther from the page center than before.

#### Scenario: Footer character collage
- **WHEN** a visitor scrolls to the bottom of the desktop page
- **THEN** all four added characters are independently visible and recognizable, Shantae closely follows the supplied Swimsuit Special cover's drawing/outfit/pose without baked smoke, Marie Rose wears the supplied blue bodysuit/glove outfit, the Oguri/Tamamo food joke is readable, and the original fourteen characters remain present

### Requirement: Desktop montage alignment
The latest supplied montage SHALL guide the approved desktop placement: the six upper portraits begin around y=365–395 and finish near the joining panel, side columns descend from Kurisu around y=670 through the lower page, and both integrated statues sit near the centered signature in an extended footer band. The collage SHALL remain bounded near the central content at 1448px and 1920px widths. Illustrations SHALL preserve transparency, full silhouettes and text/control clearance; temporary rectangles and duplicated content in the montage are not site elements.

#### Scenario: Viewing the desktop montage arrangement
- **WHEN** the full desktop page is inspected at 1448px or 1920px
- **THEN** the lower top groups, regular side columns and closely flanking footer statues retain a balanced composition around the central panels

### Requirement: Desktop portrait spacing
On desktop, the six upper portraits SHALL be positioned by their visible artwork bounds and bottom fades, without forcing identical CSS top coordinates. Tifa SHALL remain at her approved position, Asuka SHALL move about 16px lower and Nami SHALL move about 8px higher from their current positions so the upper silhouettes sit more coherently. The side portraits SHALL form balanced paired columns using the right column as a visual reference. From their current positions, Kurisu SHALL move up about 24px, Faye up about 16px and Hinata up about 8px, while Rem SHALL remain fixed and the right column SHALL remain unchanged. This SHALL distribute the spacing correction gradually and keep the bottom portrait aligned with Super Creek; existing outward offsets and complete artwork SHALL be preserved.

#### Scenario: Reviewing the desktop portrait spacing
- **WHEN** the page is viewed at 1448px or 1920px wide
- **THEN** the upper group follows its visible silhouettes, Kurisu rises 24px, Faye 16px and Hinata 8px from their prior positions, Rem and the right column stay fixed, and the paired side columns keep their existing outward offsets

### Requirement: Joining panel presentation
The joining panel SHALL use a glowing magenta frame, globe icon, heading and divider. Heading dividers SHALL pulse through border color without an inset shadow across the heading area. Its four numbered steps SHALL appear in sequence, horizontally on wide screens, with icons and progression cues. The management URL SHALL appear as readable text in a neon inset with a copy control. All neon details inside either main panel, including Japanese labels, URL text and frame, icons, step badges, chevrons and copy controls, SHALL be pink while idle and shift to cyan together when the panel is hovered or contains keyboard focus; their glow animation SHALL continue in either state. Copy feedback SHALL appear in a document-level floating toast above the footer and copyleft text, positioned clear of footer text when visible, without affecting layout.

#### Scenario: Following the desktop steps
- **WHEN** a visitor reads the joining panel at desktop width
- **THEN** the four steps progress left to right and the URL remains readable and operable

### Requirement: Illustrated server panels
The directory SHALL use a glowing magenta outer panel and three equally sized, illustrated game cards on desktop. Each card SHALL use one continuous recognizable in-game or official screenshot behind its title and server rows: an early-game Terraria scene, an iconic Minecraft world image, and a Hytale environment. The artwork SHALL NOT be split into separate header and lower strips, repeated, replaced by CSS scenery, or covered with texture patterns. The generated Hytale lower landscape SHALL NOT be rendered. All three game-card outlines SHALL be uniformly pink while the SERVIDORES panel is idle and uniformly cyan when that panel is hovered or contains keyboard focus; the cards SHALL change together and SHALL NOT use per-game outline colors. The server-list wrapper SHALL have no separate background or border, while individual server rows SHALL retain dark fills and fine borders for readability. All eight real records SHALL remain intact; duplicated example rows in a design montage are not content. Cards SHALL retain the mockup's game identity, row hierarchy, badges and decorative space. Version/modpack badges SHALL share pink idle and cyan card-hover/focus colors rather than using per-badge colors. Neon details inside the outer directory panel SHALL be pink while idle and shift together to cyan when the panel is hovered or contains keyboard focus, including its Japanese label, gamepad icon, divider and copy-control borders.

#### Scenario: Comparing game cards
- **WHEN** a visitor views the directory on a wide screen
- **THEN** the three cards appear side by side in reference order, with recognizable game-specific artwork and legible server rows

### Requirement: Distinct illustrated elements
Each character SHALL be a separate illustration, independently positionable and scalable, rather than part of a combined character image. Portrait frames, the statue, and other distinct decals SHALL also be independently controllable. Artwork SHALL frame content without obscuring it or intercepting interaction.

#### Scenario: Adapting the scene
- **WHEN** available space becomes limited
- **THEN** individual decorations can be repositioned and resized while essential content and controls remain visible

### Requirement: Desktop main-panel tilt
At desktop widths of at least 1100px, hovering or keyboard-visible focus on either main panel SHALL scale it to about 1.08 and apply a 4.4-degree X tilt and 3.2-degree Y tilt without changing document flow. COMO ENTRAR and SERVIDORES SHALL tilt in opposite directions. Mouse activation SHALL preserve the hover appearance while the pointer remains inside, but mouse-only button focus SHALL NOT keep the panel expanded after the pointer leaves. Reduced motion and static graphics SHALL disable the transform.

#### Scenario: Mouse activation and keyboard focus
- **WHEN** a visitor clicks a panel button and then moves the pointer away, or tabs to a panel control
- **THEN** mouse-only focus returns the panel to its idle state after pointer exit, while keyboard-visible focus keeps the panel expanded

### Requirement: Artwork and panel stacking
At rest, all waifus SHALL render above both main panels. Hovering or keyboard-focusing a main panel SHALL raise that expanded panel above all waifu artwork, including footer art. No statue SHALL render over any waifu. A selected or dragged waifu SHALL render above the statues and unexpanded panels; an expanded panel SHALL remain above selected art. Layering SHALL preserve hit-testing for panel controls.

#### Scenario: Reviewing overlapping layers
- **WHEN** waifus, statues and panels overlap at desktop widths
- **THEN** waifus cover idle panels, the active expanded panel covers waifus, and statues remain behind every waifu, including selected or dragged art

### Requirement: Desktop starfield
The sky SHALL contain many faint, fine stars plus a smaller number of brighter stars in varied sizes and colors with soft halos. Distant shooting stars SHALL cross diagonally with tapered trails, confined to the sky above the horizon, in two staggered 21-second and 27-second loops. Reduced motion and static graphics SHALL disable their movement.

### Requirement: Accelerated neon particles
On desktop with accelerated graphics, the cursor SHALL leave a colored particle trail that follows the fluid-smoke hue, and only the cyan main-panel borders SHALL emit outward sparks. Pink borders and game cards SHALL emit none. Border sparks SHALL originate on the actual panel edge while it is scaled or tilted, including its lower edge. Cap each panel and cursor layer at 128 and 192 particles. Reduced motion, static graphics, or graphics-context loss SHALL remove particles.

### Requirement: Independently animated scene
The title SHALL be text animatable with CSS. Borders and neon SHALL use CSS or SVG rather than flattened artwork. Scenery, including the sun, skyline, mountains, grid and lighting, SHALL have independently controllable layers. Neon SHALL pulse and the perspective grid SHALL move slowly to evoke retrowave. Each static character illustration SHALL move as a whole, like a billboard, without frame-by-frame or internal character animation; the two footer bust statues SHALL remain still.

#### Scenario: Animating the scene
- **WHEN** motion is enabled
- **THEN** scenery and lighting can move independently, the title can animate as text, and each character can move as a single illustration

### Requirement: Coordinated motion
The scene SHALL feel alive through coordinated independent motion, with a slow moving grid and pulsating neon guided by the mockup's aesthetic. Effects near text and controls SHALL preserve legibility and interaction feedback. Character movement SHALL remain gentle; independent layers SHALL permit refinement without merging the scene into a single animation. Pointer-driven smoke SHALL appear above the scenery but behind all character illustrations and frames, text, panels and controls.

#### Scenario: Reading while the scene moves
- **WHEN** ambient motion is active
- **THEN** the visitor can read and operate the page without the effects obscuring content or shifting controls

#### Scenario: Playing with a character
- **WHEN** the mouse enters a visible character illustration or its window frame, or the visitor primary-clicks it
- **THEN** only that character eases through a left-right wiggle on entry or a whole-illustration squash-and-stretch jump on click, then returns to its existing billboard motion without blocking nearby controls
- **AND** these reactions stop for reduced motion or the static graphics fallback

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

#### Scenario: Inspecting Tifa's replacement
- **WHEN** the refreshed Tifa illustration is inspected on the desktop page
- **THEN** she appears in the Nibelheim cowgirl outfit in a hat-tip pose, cropped just above the knees, with transparent padding and a visible scale matched to adjacent art
- **AND** the portrait preserves its interactions and previous numbered Tifa artwork remains available

#### Scenario: Inspecting Nagatoro's replacement
- **WHEN** the refreshed Nagatoro illustration is inspected
- **THEN** her raised hand is anatomically correct, her expression is playful and age-appropriate, and prior numbered variants, transparency, placement and interactions remain intact

#### Scenario: Inspecting Aqua's replacement
- **WHEN** the refreshed Aqua illustration is inspected
- **THEN** her hand at her hip is anatomically correct, her cheerful pose is preserved, and prior numbered variants, transparency, placement and interactions remain intact

### Requirement: Visible mobile character composition
All fourteen character illustrations SHALL be visible in the mobile page's normal scroll flow, arranged independently around or between sections without covering text or controls. The page SHALL NOT depend on a visitor opening a separate gallery or toggling decorations to see them.

#### Scenario: Scrolling the mobile page
- **WHEN** a visitor scrolls a 320 CSS-pixel-wide viewport from top to bottom
- **THEN** all fourteen character illustrations can be seen and the page has no horizontal overflow

### Requirement: Motion accessibility
The site SHALL NOT show a manual pause/resume control. Reduced-motion preference SHALL stop nonessential CSS and pointer-driven animation, including character motion, fluid smoke, and card tilt, without relying on a control or overriding the preference. Motion SHALL NOT obscure content, interfere with input or flash beyond WCAG 2.2 AA limits. A conservative startup graphics check SHALL disable CSS animation and pointer effects before they start when WebGL2 is unavailable, has a serious performance caveat, identifies a software renderer, or cannot expose sufficient renderer information. Essential content and controls SHALL remain usable.

#### Scenario: Reduced motion
- **WHEN** reduced motion is enabled before or during a visit
- **THEN** nonessential animation stops immediately, including when the preference changes while the page is open

#### Scenario: Hardware acceleration unavailable or unknown
- **WHEN** the graphics check finds software rendering, unavailable WebGL2 or insufficient renderer information
- **THEN** the page remains static, does not initialize the fluid simulation or pointer-driven card effects, and retains usable text, links and copy controls

#### Scenario: Scripts unavailable
- **WHEN** JavaScript is unavailable
- **THEN** the site remains readable, essential content stays available, and no nonfunctional motion control appears

### Requirement: Accessible responsive presentation
The site SHALL meet WCAG 2.2 AA contrast and target-size requirements, expose logical landmarks and headings, and keep full connection values accessible without horizontal page scrolling at 320 CSS pixels and at 200% zoom. Decorative artwork SHALL be excluded from the accessibility tree and pointer targeting.

#### Scenario: Navigating with a keyboard
- **WHEN** a visitor uses keyboard navigation
- **THEN** all actionable controls have descriptive names, visible focus and a logical focus order

### Requirement: Exposed city above content
The first desktop content panel SHALL start about 48px below the skyline/grid baseline, exposing the full city above it. Subsequent directory and footer content SHALL move down in document flow. This correction SHALL retain the existing sun, skyline and title coordinates.

#### Scenario: Skyline above the panels
- **WHEN** the page is reviewed at desktop widths of 1448px and 1920px
- **THEN** the first panel is below the city base and the lower buildings remain exposed above it

### Requirement: Stable local preview and experiments
The local preview SHALL use port 4173 and keep currently served files available during rebuilds. Replacement files SHALL be published atomically before obsolete output files are removed. The existing Tifa demo SHALL remain reachable at `/experiments/tifa-physics/`, and `/experiments/` SHALL list available experiments with relative links compatible with the GitHub Pages repository subpath.

#### Scenario: Rebuilding while previewing
- **WHEN** the site rebuilds while a visitor opens the home page or existing demo
- **THEN** both pages and their existing assets stay available and the rebuilt output retains the experiment index and Tifa demo
