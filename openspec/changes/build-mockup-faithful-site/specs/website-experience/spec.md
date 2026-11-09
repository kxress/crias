# Website experience delta

## ADDED Requirements

### Requirement: Approved visual refinements
The site SHALL preserve the approved vaporwave composition with one integrated bust, complete portraits using only an interior fade, Windows-style frames only on Rei and Usagi, Japanese accents, three equal desktop cards, and the `Crias 🄯 2026` footer with credited OpenMoji artwork.

#### Scenario: Reviewing the approved composition
- **WHEN** the page is inspected at desktop and mobile sizes
- **THEN** the bust is one object, portraits have no side cropping, only Rei and Usagi use Windows frames, the desktop cards are equal-sized, and the copyleft mark appears in the footer without a link

### Requirement: Continuous retro hero motion
The striped sun SHALL loop without a visible stripe seam or glow pop. The real-text `CRIAS GAMES` wordmark SHALL use heavy slanted Exo lettering, a dark separating edge and the layered blue/cyan/white/violet/magenta chrome gradient from the supplied retro text reference. Its blue glow and corner glint SHALL pulse gently. `SERVERS PRIVADOS` SHALL use the existing expressive cursive lettering and strong white/pink neon pulse.

#### Scenario: Reading the animated hero
- **WHEN** the hero is viewed through consecutive animation cycles
- **THEN** the sun loop closes seamlessly, the chrome title's glow and glint pulse while the text remains legible against the sun, and the cursive subtitle retains its neon pulse

### Requirement: Aligned city and grid horizon
On desktop, the sun SHALL sit behind the city and its visible lower edge SHALL be raised slightly above the shared skyline/grid baseline. The building silhouette SHALL remain visually dominant while transparent sky retains the sun above it. Japanese neon signage SHALL layer visibly in front of the city. The city SHALL use normal CSS alpha compositing, with its atmospheric opacity and color harmonization applied through CSS; it SHALL NOT use screen blending. The perspective grid SHALL begin at the skyline baseline behind the city, use a low viewpoint rather than a steep overhead angle, and fade in from transparent at the horizon.

#### Scenario: Inspecting the scene layers
- **WHEN** the city and grid are visible together
- **THEN** the raised striped sun remains behind the dominant city silhouette, Japanese neon signs sit in front of the city, the grid begins at the same horizontal horizon as the city baseline, its near-horizon edge blends softly into the city, and the grid does not paint over the skyline

### Requirement: Pointer-reactive depth
On fine-pointer devices, movement SHALL inject velocity and pink/cyan dye into a GPU-accelerated WebGL2 fluid simulation whose velocity advects the dye and whose pressure projection and vorticity create curling smoke. It SHALL use compact 16-bit scalar and two-channel framebuffer formats, a 6-iteration pressure solve, a 64px short-side simulation grid, a 384px short-side dye buffer, and a canvas capped at 0.6× CSS resolution and 500,000 pixels to keep pointer response fluid without excessive GPU bandwidth. Bilinear browser scaling SHALL smooth the diffuse smoke. The transparent, pointer-inert canvas SHALL layer above the hero collage and scenery, but below the hero title, Japanese signs, joining/server panels, their controls, and the footer. Text SHALL remain above the canvas through DOM stacking, with no rectangular clearing masks or visible cutouts in the fluid. It SHALL inject smoke on the first pointer movement, preserve cursor deltas, allow bounded variable time steps when frame delivery slows, stop after dye dissipates, and not run for reduced motion. Movement over a game card SHALL control a Steam-style perspective tilt, brightness and pointer-following specular highlight. The card tilt SHALL reach six degrees on each axis, at least three times the former two-degree per-axis cap, with a small hover lift/scale. Effects SHALL not block interaction or shift content.

#### Scenario: Moving a desktop pointer
- **WHEN** the pointer moves over the page and game cards
- **THEN** pointer movement creates curling, dissipating colored fluid, while card angle and brightness change with pointer position, a highlight follows across each card surface, and cards reset smoothly without obscuring content or moving surrounding layout

#### Scenario: Using reduced motion, touch, or keyboard
- **WHEN** reduced motion is enabled, or a visitor uses touch or keyboard focus
- **THEN** the fluid canvas and card tilt are absent, and essential controls remain operable and clearly focused

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

## MODIFIED Requirements

### Requirement: Hero and environment
The hero SHALL center the CRIAS GAMES wordmark, cyan underline, and `SERVERS PRIVADOS` subtitle over the striped sunset and skyline, without the two-line introductory callout. The existing hero layout and cursive subtitle treatment SHALL remain in place. The wordmark SHALL use a dark blue base silhouette with a beveled edge and a blue/cyan/white/violet/magenta chrome gradient overlay, following the two-layer treatment in the supplied Retro Text Effect reference. Its blue glow SHALL pulse. Separate horizontal stripes SHALL NOT render behind the wordmark. It SHALL NOT read as plain white lettering with a pink neon shadow. The sun SHALL render behind the city skyline at approximately 75% of its previous diameter, with its visible lower edge about 80px above the skyline horizon on desktop. The scene SHALL include the starry purple sky, wireframe mountains, text-only Japanese neon signs and magenta perspective grid depicted in the reference; it SHALL NOT include the striped right-side facade panel. The grid SHALL begin at the skyline baseline, render behind the city silhouette, and continue around the panels and footer.

#### Scenario: Reading the hero
- **WHEN** a visitor opens the page at desktop width
- **THEN** the wordmark and subtitle dominate the central scene, the two-line intro is absent, and the city remains layered in front of the sun
