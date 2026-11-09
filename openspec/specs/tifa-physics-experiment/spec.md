# Tifa 2D Physics Experiment

## Purpose

Provide an isolated, static-site experiment for subtle 2D jiggle physics over the adult Tifa illustration. The experiment must remain separate from the main Crias Games experience.

## Requirements

### Requirement: Standalone experiment page

The site SHALL expose the experiment at `/experiments/tifa-physics/` and SHALL build it as static HTML, CSS, JavaScript, and existing image assets that work under both the root preview path and the GitHub Pages repository path. The local preview server SHALL resolve directory URLs to their `index.html` files and SHALL allow an alternate port through the `PORT` environment variable.

#### Scenario: Open the experiment

- **WHEN** a visitor opens `/experiments/tifa-physics/`
- **THEN** the page renders independently from the main landing page
- **AND** the original landing page remains unchanged

### Requirement: Isolated surface maps

The experiment SHALL use two independently drawn masks and height maps aligned to the source image topology, one for each side of the bust. The rendered effect SHALL stay inside each mask and SHALL retain the source image alpha around the character silhouette.

#### Scenario: Render the two sides

- **WHEN** the image is rendered
- **THEN** each side receives its own subtle displacement and spring response
- **AND** the maps do not include unrelated parts of the illustration

### Requirement: Still motion and manual controls

The page SHALL retain a gentle still-image float and provide live controls for amplitude, speed, spring stiffness, damping, and phase offset between sides. It SHALL allow the visitor to pause the simulation, inspect the two maps, nudge the motion with a pointer, and trigger a test impulse.

#### Scenario: Reduced motion or unavailable WebGL

- **WHEN** the browser requests reduced motion or cannot create WebGL
- **THEN** the animation is paused or the original still image is shown
- **AND** the page remains readable and usable

### Requirement: Clean transparent rendering

The experiment SHALL use the lossless source artwork and premultiplied alpha when uploading textures so transparent pixels do not produce color fringes or background artifacts.

#### Scenario: Render over the lab background

- **WHEN** the character is composited over the experiment background
- **THEN** transparent areas remain clean around the silhouette
- **AND** image sampling does not expose RGB data from transparent pixels

### Requirement: No production integration

The experiment SHALL not be imported by the main landing page, SHALL not modify its runtime behavior, and SHALL not introduce a server-side runtime dependency.

#### Scenario: Build for GitHub Pages

- **WHEN** the static build runs
- **THEN** it copies the experiment to the output directory
- **AND** all experiment asset references resolve relative to that directory
