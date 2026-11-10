# Website experience delta

## ADDED Requirements

### Requirement: Approved visual refinements
The site SHALL preserve the approved vaporwave composition with two lower-footer placements of one integrated bust-and-column artwork (the right placement is CSS-mirrored), complete portraits using an interior fade aligned to padded canvases, Windows-style frames only on Rei and Usagi, Japanese accents, three equal desktop cards, a lowered striped sun meeting the city skyline, no lagoon or water-reflection layer, and the `Crias 🄯 2026` footer with the Unicode copyleft glyph styled as neon text.

#### Scenario: Reviewing the approved composition
- **WHEN** the page is inspected at desktop and mobile sizes
- **THEN** both footer bust placements use the same integrated bust-and-column image, the right one is mirrored in CSS, portraits have no side cropping, only Rei and Usagi use Windows frames, the desktop cards are equal-sized, and the copyleft mark appears in the footer without a link

### Requirement: Continuous retro hero motion
The striped sun SHALL loop without a visible stripe seam or glow pop; stripe cutouts SHALL appear only in the lower half of the sun, leaving its upper half solid. The real-text `CRIAS GAMES` wordmark SHALL use heavy slanted Exo lettering, a dark separating edge and the layered blue/cyan/white/violet/magenta chrome gradient from the supplied retro text reference. Its blue glow and corner glint SHALL pulse gently. `SERVERS PRIVADOS` SHALL use the existing expressive cursive lettering and strong white/pink neon pulse.

#### Scenario: Reading the animated hero
- **WHEN** the hero is viewed through consecutive animation cycles
- **THEN** the sun loop closes seamlessly, the chrome title's glow and glint pulse while the text remains legible against the sun, and the cursive subtitle retains its neon pulse

### Requirement: Site-wide neon pulse and flicker
Every visible neon accent SHALL have a perceptible glow pulse and occasional restrained flicker while motion is enabled, including scene lines, Japanese labels, panel and card outlines, headings, icons, controls and footer decorations. Flicker SHALL be infrequent and low-intensity, never obscure text or controls, and stop for reduced motion.

#### Scenario: Inspecting neon at rest
- **WHEN** the page is viewed without pointer interaction while motion is enabled
- **THEN** each neon accent pulses and has an occasional brief flicker without flashing rapidly or reducing readability

### Requirement: Panel-wide neon focus color
Every neon accent inside either main content panel SHALL be pink while idle and shift to cyan together when the panel is hovered or contains keyboard focus, including Japanese labels, heading, globe or gamepad icon, divider, URL text and frame, numbered step badges, step icons, chevrons, and copy controls. Heading dividers SHALL pulse through border color without an inset shadow across the heading area. The accents SHALL keep pulsing and flickering in either state. The same behavior SHALL work for keyboard focus and remain within reduced-motion rules.

#### Scenario: Focusing a main panel
- **WHEN** a visitor hovers a main panel or tabs to a control inside it
- **THEN** its border and every neon detail, including the Japanese label and URL frame, are pink at rest and turn cyan together while their glow remains active

### Requirement: Aligned city and grid horizon
On desktop, the shared skyline/grid horizon SHALL sit higher on the page, with clearly visible wireframe mountains confined to the side corners clear of the sun. The center sky SHALL retain its original dark purple color while its brighter side edges distinguish the mountains from the background. Soft cloud layers SHALL drift horizontally at different parallax speeds above the sun and SHALL end above the skyline, without covering buildings. The sun SHALL sit behind and overlap the upper city silhouette slightly at about 1.8 times its previous CSS diameter (roughly 320–326px across 1448–1920px desktop widths); its container SHALL use `clip-path: inset(0px 0px 25%)`, its desktop lift SHALL be about 148px under the existing horizon calculation, and its orange-red bands SHALL be separated by transparent cutouts that reveal the sky. It SHALL NOT have a neon glow or neon-pulse animation; a brief non-glowing glitch is allowed. The scene SHALL NOT include a lagoon, water-reflection field, reflection image, or reflection animation. Japanese neon signage SHALL layer visibly in front of the city. The city SHALL use `opacity: 1` and `mix-blend-mode: normal`, with atmospheric color filters applied through CSS; the skyline SHALL remain opaque over mountains and grid pixels except for a short lower-edge fade. The wireframe mountains SHALL be behind the skyline and SHALL NOT show through opaque building pixels. The perspective grid SHALL begin at the skyline baseline behind the city, use a low viewpoint rather than a steep overhead angle, and fade in from transparent near the skyline. Stars SHALL remain in the sky and SHALL NOT continue across the ground grid. The skyline's lower edge SHALL dissolve through a wide, low fog band without a hard horizontal cutoff.

#### Scenario: Inspecting the scene layers
- **WHEN** the city and grid are visible together
- **THEN** the enlarged lowered sun's transparent stripes reveal the sky behind it, the parallax clouds drift above the sun without covering buildings, bright mountain edges flank the darker center sky, Japanese neon signs sit in front of the city, the skyline base fades through fog into the grid, no stars appear on the ground, and the grid does not paint over the skyline

### Requirement: Official game card art and unified badge colors
The three equal desktop game cards SHALL each use one continuous recognizable in-game or official screenshot across the complete card behind the title and server rows: early-game Terraria, an iconic Minecraft world scene, and Hytale spawn scenery. The image SHALL NOT be split into separate header and lower strips, repeated, covered by CSS scenery textures, or combined with the rejected generated Hytale landscape. The server-list wrapper SHALL have no separate background or border; individual server rows SHALL retain their own dark readable backgrounds and fine borders over the card artwork. All eight canonical records SHALL remain intact even when a design reference repeats placeholder rows. Version and modpack badges SHALL use the same pink color while idle and cyan when the containing card is hovered or keyboard-focused; they SHALL NOT use a different base color per game or badge. The Terraria 1.4.5.8, Calamity 2.2.4, Better MC 6, Prominence II and Hytale 0.7.3 badges SHALL link to the exact details pages defined by the persistent private-server-access spec.

#### Scenario: Inspecting a game card
- **WHEN** a visitor views a card or moves pointer/focus within it
- **THEN** the selected game art remains clearly visible without a texture overlay, all badges share the pink idle color and shift to cyan within the hovered/focused card, and supported version badges open their details pages

#### Scenario: Viewing server rows
- **WHEN** a visitor views the server list inside a game card
- **THEN** the list wrapper has no additional frame while hostnames, badges, ports, and copy controls remain readable within individually framed dark rows

### Requirement: Unclipped illustration glow
Each separate character and bust image SHALL have enough transparent effect clearance for its full CSS glow to render. Filters, masks, and positioned decoration containers SHALL NOT crop the glow at image bounds or viewport edges. Enlarging an asset canvas SHALL preserve the complete source art and save the processed image as the next numbered variant while retaining prior variants.

#### Scenario: Inspecting portrait edges
- **WHEN** character and bust glows are inspected at desktop and wide-desktop widths
- **THEN** every silhouette and surrounding neon glow remains fully visible without a hard cutoff at its image bounds

### Requirement: Copy toast stacking
The copy success/error toast SHALL render in a document-level stacking context above the footer and copyleft label, positioned clear of their text when the footer is visible, without shifting content or intercepting interaction.

#### Scenario: Copying near the footer
- **WHEN** a visitor activates a copy control while the footer is visible
- **THEN** the feedback toast is fully legible above the footer without covering its text or changing page layout

### Requirement: Paired footer statue placement
The extended footer band SHALL place two instances of the same integrated bust, pixel glasses, and Ionic-column illustration close to the centered footer signature as in the latest user montage. The right instance SHALL be horizontally mirrored through CSS without creating a second raster asset. These decorations SHALL remain behind footer text and controls and SHALL NOT overlap the main panels.

#### Scenario: Inspecting footer statues
- **WHEN** the footer is viewed at desktop and wide-desktop widths
- **THEN** the integrated statues flank the centered footer content, the right one faces the mirrored direction, and both complete silhouettes remain visible when the page is scrolled to its bottom

### Requirement: Latest desktop montage placement
At desktop widths of 1448px and 1920px, the six upper portraits SHALL sit lower, beginning around y=160–195 and finishing near the joining panel. The side columns SHALL continue below them with a regular descending rhythm, with Kurisu beginning around y=470. The collage SHALL stay bounded near the centered content rather than spreading to wide viewport edges. An extended footer band SHALL accommodate the paired statues close to its centered signature. All illustrations SHALL remain separate, transparent, uncropped, and clear of text and controls. The user's montage is a placement reference; its pasted rectangles and duplicated content SHALL NOT be rendered.

#### Scenario: Comparing the supplied montage
- **WHEN** full desktop pages are reviewed at 1448px and 1920px
- **THEN** the lowered top groups, descending side portraits, centered panels and closely flanking footer statues follow the supplied arrangement without its temporary editing artifacts

### Requirement: Pointer-reactive depth
On fine-pointer devices, movement SHALL inject velocity and pink/cyan dye into a GPU-accelerated WebGL2 fluid simulation whose velocity advects the dye and whose pressure projection and vorticity create curling smoke. It SHALL use compact 16-bit scalar and two-channel framebuffer formats, a 6-iteration pressure solve, a 64px short-side simulation grid, a 384px short-side dye buffer, and a canvas capped at 0.6× CSS resolution and 500,000 pixels to keep pointer response fluid without excessive GPU bandwidth. Bilinear browser scaling SHALL smooth the diffuse smoke. The transparent, pointer-inert canvas SHALL layer above the hero collage and scenery, but below the hero title, Japanese signs, joining/server panels, their controls, and the footer. Text SHALL remain above the canvas through DOM stacking, with no rectangular clearing masks or visible cutouts in the fluid. It SHALL inject smoke on the first pointer movement, preserve cursor deltas, allow bounded variable time steps when frame delivery slows, stop after dye dissipates, and not run for reduced motion. Movement over a game card SHALL control a Steam-style perspective tilt, brightness and pointer-following specular highlight. The card tilt SHALL reach six degrees on each axis, at least three times the former two-degree per-axis cap, with a small hover lift/scale. Effects SHALL not block interaction or shift content.

#### Scenario: Moving a desktop pointer
- **WHEN** the pointer moves over the page and game cards
- **THEN** pointer movement creates curling, dissipating colored fluid, while card angle and brightness change with pointer position, a highlight follows across each card surface, and cards reset smoothly without obscuring content or moving surrounding layout

#### Scenario: Using reduced motion, touch, or keyboard
- **WHEN** reduced motion is enabled, or a visitor uses touch or keyboard focus
- **THEN** the fluid canvas and card tilt are absent, and essential controls remain operable and clearly focused

## MODIFIED Requirements

### Requirement: Footer character collage
The footer SHALL also include four independent transparent character illustrations: Shantae, anime Marie Rose, chibi Oguri Cap eating rice, and chibi Tamamo Cross reacting to her. Shantae and Marie Rose SHALL occupy the left footer spaces; Oguri and Tamamo SHALL form the food joke on the right. These assets SHALL retain numbered masters and derivatives, complete silhouettes, glow clearance and CSS bottom fades without photo backgrounds, and SHALL NOT obscure the footer signature or actionable content.

#### Scenario: Footer character collage
- **WHEN** the full desktop page is scrolled to its footer
- **THEN** all four new characters are recognizable as separate illustrations, Oguri visibly eats rice with a comic expression, Tamamo reacts nearby, and all fourteen existing reference characters remain present

### Requirement: Exposed city above content
The first desktop content panel SHALL begin about 48px below the shared skyline/grid baseline so the full city is exposed above it. The directory and footer SHALL follow lower in document flow. The sun, skyline, title and portrait coordinates SHALL remain unchanged by this spacing correction.

#### Scenario: Skyline above the panels
- **WHEN** the page is viewed at 1448px or 1920px desktop width
- **THEN** the joining panel starts below the city base, without the panel covering lower buildings or the skyline being moved upward

### Requirement: Stable local preview and experiments
The local preview SHALL remain available at port 4173 during builds. A rebuild SHALL preserve the currently served output until replacement files are ready, publish files atomically, and remove obsolete generated files only after successful publication. The existing `/experiments/tifa-physics/` demo and its assets SHALL remain available; `/experiments/` SHALL provide an accessible index with relative links that also work under the repository subpath.

#### Scenario: Rebuilding while previewing
- **WHEN** the build runs while the home page and Tifa demo are requested
- **THEN** their HTML and existing assets continue to respond successfully, the demo renders, and the final output includes its index and updated site

### Requirement: Reference-specific visual fidelity
The desktop site SHALL reproduce the reference's visual hierarchy, relative placement, scale, palette, character identities, collage treatment, card illustrations and scene depth. Refinements SHALL preserve the mockup's composition and informal personality. A secondary animation reference SHALL NOT supersede the mockup.

#### Scenario: Visual review
- **WHEN** the page is compared with `mockup.png` at 1448 by 1086 CSS pixels
- **THEN** the hero, sun, skyline, bust, all character groups, four-step panel, three game cards, grid and footer are recognizably arranged like the reference

### Requirement: Character asset integrity
The site SHALL show the fourteen reference characters as separate recognizable illustrations, without merged characters or substituted generic mascots. Desktop placements SHALL match the character groups and order documented in `docs/mockup-reference.md`. Frames and stickers SHALL be independent from the illustrations they surround.

#### Scenario: Inspecting the collage
- **WHEN** each character is individually inspected
- **THEN** its identity and essential features are discernible, and the image can be moved independently of other characters

### Requirement: Visible mobile character composition
All fourteen character illustrations SHALL be visible in the mobile page's normal scroll flow, arranged independently around or between sections without covering text or controls. The page SHALL NOT depend on a visitor opening a separate gallery or toggling decorations to see them.

#### Scenario: Scrolling the mobile page
- **WHEN** a visitor scrolls a 320 CSS-pixel-wide viewport from top to bottom
- **THEN** all fourteen character illustrations can be seen and the page has no horizontal overflow

### Requirement: Motion accessibility
CSS and pointer-driven nonessential motion SHALL stop when reduced motion is requested. The page SHALL NOT show a manual pause/resume control. Motion SHALL NOT obscure content, interfere with input or flash beyond WCAG 2.2 AA limits.

#### Scenario: Reduced motion
- **WHEN** reduced motion is enabled before or during a visit
- **THEN** nonessential CSS animation, card movement and fluid simulation stop

#### Scenario: Scripts unavailable
- **WHEN** JavaScript is unavailable
- **THEN** the site remains readable without a pause control or essential JavaScript behavior

### Requirement: Accessible responsive presentation
The site SHALL meet WCAG 2.2 AA contrast and target-size requirements, expose logical landmarks and headings, and keep full connection values accessible without horizontal page scrolling at 320 CSS pixels and at 200% zoom. Decorative artwork SHALL be excluded from the accessibility tree and pointer targeting.

#### Scenario: Navigating with a keyboard
- **WHEN** a visitor uses keyboard navigation
- **THEN** all actionable controls have descriptive names, visible focus and a logical focus order

### Requirement: Hero and environment
The hero SHALL center the CRIAS GAMES wordmark, cyan underline, and `SERVERS PRIVADOS` subtitle over the striped sunset and skyline, without the two-line introductory callout. The existing hero layout and cursive subtitle treatment SHALL remain in place. The wordmark SHALL use a dark blue base silhouette with a beveled edge and a blue/cyan/white/violet/magenta chrome gradient overlay, following the supplied retro-text reference. Its blue glow SHALL pulse; horizontal stripes SHALL remain within the title letters, with no separate bands behind it. The sun SHALL render behind and overlap the upper skyline slightly at about 1.8 times its current CSS diameter (roughly 320–326px across desktop widths 1448–1920px); colored bands SHALL have transparent cutouts that reveal the sky, and its visible lower edge SHALL be about 270px above the shared skyline/grid horizon. Soft clouds SHALL scroll horizontally at separate parallax speeds above the sun and stop above the building layer. The center sky SHALL retain its original dark purple while brighter side edges reveal legible side-corner wireframe mountains. The scene SHALL include the starry purple sky, text-only Japanese neon signs and magenta perspective grid, with no lagoon or separate reflection layer. The page SHALL NOT include the striped right-side facade panel. The grid SHALL begin at the skyline baseline, render behind the city silhouette, and continue around the panels and footer.

#### Scenario: Reading the hero
- **WHEN** a visitor opens the page at desktop width
- **THEN** the wordmark and subtitle dominate the central scene, the two-line intro is absent, and the city remains layered in front of the sun
