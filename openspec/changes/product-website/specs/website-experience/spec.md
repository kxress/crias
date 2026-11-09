# Website experience

## Purpose

Give visitors a recognizable, accessible and usable entry point to the CRIAS GAMES private community servers.

## ADDED Requirements

### Requirement: Purpose and wayfinding
The site SHALL introduce CRIAS GAMES in Brazilian Portuguese as a private gaming-server community and provide readily discoverable paths to joining instructions and server details.

#### Scenario: New or returning visitor
- **WHEN** a visitor opens the site
- **THEN** they can understand the offering and navigate to onboarding or directly to the server directory without first completing onboarding

### Requirement: Coherent community identity
The site SHALL express an informal Brazilian gaming-community personality through a cohesive retro arcade and synthwave visual language, with deep purple or near-dark foundations, contrasting magenta and cyan or electric-blue accents, expressive headings, readable body type, and consistent interactive surfaces.

#### Scenario: Viewing the site
- **WHEN** a visitor moves between the introduction, instructions and directory
- **THEN** hierarchy, surfaces, iconography and accents form a recognizable unified identity while games remain distinguishable by text and presentation

### Requirement: Supporting artwork
Decorative imagery and layered backgrounds SHALL support the identity without obscuring information, blocking controls, or being required to understand or operate the site.

#### Scenario: Artwork unavailable
- **WHEN** decorative assets fail to load or are omitted at a narrow width
- **THEN** the content, hierarchy and controls remain understandable and usable

### Requirement: Independently adaptable visual elements
Each character illustration (waifu) and each distinct decorative visual element SHALL be a separate image or independently controllable CSS or SVG element. Elements SHALL be independently positionable, scalable and hideable without editing a flattened composition or affecting other elements.

#### Scenario: Adapting artwork to a narrow viewport
- **WHEN** the layout is adapted to a narrow viewport
- **THEN** an individual character or decorative element can be repositioned, resized or hidden without altering the other elements or obscuring content

#### Scenario: Changing a visual element
- **WHEN** a designer replaces or removes one visual element
- **THEN** the remaining elements can be retained and adjusted independently

### Requirement: Responsive access
The site SHALL reflow content and controls for phone, tablet, desktop, narrow windows and increased zoom without clipping essential content or requiring page-level horizontal scrolling to read it.

#### Scenario: Narrow or enlarged view
- **WHEN** the viewport is narrow or text is enlarged to 200 percent
- **THEN** instructions, complete connection values and controls remain readable and operable, with long values wrapping or otherwise fully accessible

### Requirement: Accessible structure and controls
The site SHALL use semantic landmarks and a logical heading hierarchy, descriptive accessible names, keyboard-operable controls in a logical focus order, and a visible focus indicator. Information SHALL not depend on color alone.

#### Scenario: Keyboard and assistive technology
- **WHEN** a visitor navigates without a pointer or reads with assistive technology
- **THEN** they can identify sections and controls, reach and activate every meaningful control, and understand its purpose

### Requirement: Legible and comfortable presentation
Text and controls SHALL meet WCAG 2.2 AA contrast requirements; touch targets SHALL meet its target-size minimum or spacing exception. Decorative effects SHALL not obscure text or controls, and decorative imagery SHALL be excluded from the accessibility tree.

#### Scenario: Using touch and reading content
- **WHEN** a visitor reads and operates the site on a touch device
- **THEN** text and control states are discernible and targets can be activated without inadvertently activating adjacent controls

### Requirement: Motion preferences
Motion SHALL not be necessary for comprehension or interaction; reduced-motion preferences SHALL suppress nonessential motion and flashing effects SHALL not interfere with reading.

#### Scenario: Reduced motion requested
- **WHEN** the visitor enables reduced motion
- **THEN** ambient and transition motion is reduced or removed while focus and interaction feedback remain clear

### Requirement: Resilient static presentation
Essential explanatory content and connection values SHALL remain readable when decorative assets or JavaScript are unavailable. The site SHALL work on static GitHub Pages hosting, including a repository subpath.

#### Scenario: Limited client capabilities
- **WHEN** scripts or decorative assets fail, or the site is served from a repository subpath
- **THEN** the visitor can read the purpose, instructions and published server details, and local navigation and assets resolve correctly
