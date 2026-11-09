# Website experience delta

## ADDED Requirements

### Requirement: Approved visual refinements
The site SHALL preserve the approved vaporwave composition with one integrated bust, complete portraits using only an interior fade, Windows-style frames only on Rei and Usagi, Japanese accents, three equal desktop cards, and the `Crias 🄯 2026` footer with credited OpenMoji artwork.

#### Scenario: Reviewing the approved composition
- **WHEN** the page is inspected at desktop and mobile sizes
- **THEN** the bust is one object, portraits have no side cropping, only Rei and Usagi use Windows frames, the desktop cards are equal-sized, and the copyleft mark appears in the footer without a link

### Requirement: Continuous retro hero motion
The striped sun SHALL loop without a visible stripe seam or glow pop. The real-text `CRIAS GAMES` wordmark SHALL stand apart from the sun with a retro offset treatment and restrained motion; the subtitle SHALL carry the prominent neon flicker.

#### Scenario: Reading the animated hero
- **WHEN** the hero is viewed through consecutive animation cycles
- **THEN** the sun loop closes seamlessly, the wordmark remains legible against the sun, and `SERVIDORES DE JOGOS PRIVADOS` receives the prominent neon treatment

### Requirement: Aligned city and grid horizon
On desktop, the perspective grid SHALL begin at the skyline baseline and render behind the city silhouette, with both horizons aligned vertically.

#### Scenario: Inspecting the scene layers
- **WHEN** the city and grid are visible together
- **THEN** the grid begins at the same horizontal horizon as the city baseline and does not paint over the skyline

### Requirement: Pointer-reactive depth
On fine-pointer devices, movement SHALL produce a restrained smoke-like light trail and subtle game-card tilt capped at two degrees. Effects SHALL not block interaction or shift content, and SHALL stop when motion is paused or reduced motion is requested.

#### Scenario: Moving a desktop pointer
- **WHEN** the pointer moves over the page and game cards
- **THEN** a short-lived trail follows it and cards tilt subtly without obscuring their content or moving surrounding layout

#### Scenario: Using reduced motion, touch, or keyboard
- **WHEN** motion is paused or reduced, or a visitor uses touch or keyboard focus
- **THEN** the pointer trail and card tilt are absent, and controls remain visible, operable and clearly focused

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

### Requirement: Motion control and accessibility
The site SHALL provide a visible keyboard-operable control for pausing persistent decorative motion when scripts are available. Reduced-motion preference SHALL stop nonessential animation and SHALL NOT be overridden by the control. Motion SHALL NOT obscure content, interfere with input or flash beyond WCAG 2.2 AA limits.

#### Scenario: Pausing the scene
- **WHEN** the visitor pauses motion
- **THEN** the grid, neon and other persistent decorative animations stop until resumed

#### Scenario: Reduced motion
- **WHEN** reduced motion is enabled before or during a visit
- **THEN** nonessential animation stops, regardless of the manual motion setting

#### Scenario: Scripts unavailable
- **WHEN** JavaScript is unavailable
- **THEN** the site remains readable with no nonfunctional motion control

### Requirement: Accessible responsive presentation
The site SHALL meet WCAG 2.2 AA contrast and target-size requirements, expose logical landmarks and headings, and keep full connection values accessible without horizontal page scrolling at 320 CSS pixels and at 200% zoom. Decorative artwork SHALL be excluded from the accessibility tree and pointer targeting.

#### Scenario: Navigating with a keyboard
- **WHEN** a visitor uses keyboard navigation
- **THEN** all actionable controls have descriptive names, visible focus and a logical focus order
