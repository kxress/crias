# CRIAS GAMES website

## Purpose

Define the intended experience of the CRIAS GAMES private game-server website. `mockup.png` is the visual reference; `docs/mockup-reference.md` records its content and detailed visual observations. The reference values are examples, not confirmation that network services exist. The site design remains open for discussion; these requirements establish the direction visible in the mockup, not a completed implementation.

## Requirements

### Requirement: A private server directory
The site SHALL be a Brazilian Portuguese, single-page entry point for a private gaming community. It SHALL introduce CRIAS GAMES, explain how to join the private network, and present game servers and their connection details in that order. The directory SHALL be accessible without completing onboarding.

#### Scenario: Visitor opens the page
- **WHEN** a visitor views the site
- **THEN** they can understand its private-server purpose, find the joining process, and browse the game directory

### Requirement: Composition based on the mockup
The desktop experience SHALL closely reproduce and refine the mockup's continuous synthwave arcade composition, with a central wordmark and content panels framed by the reference's fourteen characters and classical bust. A sunset, skyline, wireframe mountains, and perspective grid SHALL establish the scene in deep purple, magenta, cyan, and blue. The footer SHALL use `crias.games` and a retro computer motif. Character identities and placement are documented in `docs/mockup-reference.md`.

#### Scenario: Comparing the desktop composition
- **WHEN** the page is compared with `mockup.png` at a similar desktop viewport
- **THEN** the hero, four-step joining panel, three illustrated game cards, surrounding collage, and footer retain the reference's hierarchy and recognizable visual character

### Requirement: Distinct illustrated elements
Each character SHALL be a separate illustration, independently positionable and scalable, rather than part of a combined character image. Portrait frames, the statue, and other distinct decals SHALL also be independently controllable. Artwork SHALL frame content without obscuring it or intercepting interaction.

#### Scenario: Adapting the scene
- **WHEN** available space becomes limited
- **THEN** individual decorations can be repositioned and resized while essential content and controls remain visible

### Requirement: Independently animated scene
The title SHALL be actual text that can be animated with CSS. Interface borders and neon effects SHALL be structural CSS or SVG rather than flattened into artwork. The sun, skyline, mountains, grid, lighting, and other distinct moving scenery SHALL be independently controllable layers, allowing each to be animated separately. Character motion SHALL move each static illustration as a whole, like a billboard; it SHALL NOT require frame-by-frame or internal character animation.

#### Scenario: Animating the scene
- **WHEN** motion is enabled
- **THEN** scenery and lighting can move independently, the title can animate as text, and each character can move as a single illustration

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
The site SHALL respect reduced-motion preferences and SHALL NOT require animation to understand or use it. Essential content SHALL remain readable without JavaScript or decorative assets. The site SHALL be deployable as static files on GitHub Pages, including under a repository subpath.

#### Scenario: Reduced motion or scripts unavailable
- **WHEN** the visitor requests reduced motion or scripts do not run
- **THEN** the page remains readable and usable without nonessential animation
