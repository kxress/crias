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
The desktop experience SHALL follow the mockup's dense, continuous synthwave arcade composition: a central wordmark and introduction above a joining panel and game directory, surrounded by decorative character artwork and a classical bust. A sunset, skyline, wireframe mountains, and perspective grid SHALL establish the scene. Deep purple, magenta, cyan, and blue neon SHALL provide its primary visual identity. The footer SHALL conclude the scene with `crias.games` and a retro computer motif.

#### Scenario: Comparing the desktop composition
- **WHEN** the page is compared with `mockup.png` at a similar desktop viewport
- **THEN** the hero, four-step joining panel, three illustrated game cards, surrounding collage, and footer retain the reference's hierarchy and recognizable visual character

### Requirement: Distinct illustrated elements
The scene SHALL use separately controllable artwork and decorative layers so that individual elements can be positioned, scaled, replaced, or hidden for different screen sizes. Artwork SHALL frame content without obscuring it or intercepting interaction. The reference's character collage and statue are part of the intended visual direction; asset selection and treatment are design decisions still to be resolved.

#### Scenario: Adapting the scene
- **WHEN** available space becomes limited
- **THEN** individual decorations can be adjusted or hidden while essential content and controls remain visible

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
