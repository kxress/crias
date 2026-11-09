# Site Visual Design Specification

## Purpose

Define the enduring visual identity and layout of the Crias Games site using `mockup.png` at the repository root as the visual reference. The mockup is a desktop composition; its exact pixel dimensions and illustrated text are not a substitute for usable, responsive page content.

## Requirements

### Requirement: Synthwave visual identity

The site SHALL evoke the mockup's dense retro-futurist gaming aesthetic: a predominantly near-black and deep-purple background, vivid magenta and pink neon, cyan and electric-blue accents, and a sunset-orange highlight. A starry city skyline, striped setting sun, perspective grid, and neon-lit architectural details SHALL establish the scene. Text and controls SHALL remain legible against the artwork.

#### Scenario: Viewing the page

- **WHEN** a visitor opens the site
- **THEN** the page presents a coherent neon synthwave scene with the main content clearly distinguishable from decorative artwork

### Requirement: Hero and character framing

The desktop hero SHALL center the prominent brush-style “CRIAS GAMES” wordmark over the skyline and sunset, followed by the subtitle “Servidores de jogos privados” and a concise introductory callout. The surrounding character collage SHALL frame rather than obscure the central content. The supplied character references are Rei Ayanami, Makima and Tifa Lockhart at the upper left; Asuka Langley, Nami and Hayase Nagatoro at the upper right; Kurisu Makise, Faye Valentine, Hinata Hyuga and Rem along the left; and Usagi Tsukino, Aqua, Mayano Top Gun and Super Creek along the right. Decorative details such as framed portraits, a classical bust, neon signage and pixel-art scenery support the composition.

#### Scenario: Viewing the desktop hero

- **WHEN** the page is displayed at a wide viewport
- **THEN** the brand and introduction occupy the center and character artwork frames both sides without covering readable content

### Requirement: Joining instructions

Below the hero, the site SHALL display a dark translucent panel with a bright neon outline and a “Como entrar” heading. Its four numbered steps SHALL explain installing NetBird, configuring its management URL, requesting a manual invitation from Crias, and connecting to a listed server. On wide screens, the steps SHALL read left to right with visual progression cues. The management URL SHALL be visually prominent and offer a copy control when implemented as an interactive element.

#### Scenario: Finding the connection process

- **WHEN** a visitor reads the instructions
- **THEN** the four steps appear in order and the management URL is easy to identify

### Requirement: Server directory layout

A second neon-outlined panel below the instructions SHALL be headed “Servidores” and present game groups for Terraria, Minecraft and Hytale. On wide screens, the groups SHALL appear side by side as illustrated cards, with recognizable game branding and pixel-art landscapes. Each server entry SHALL make its host, category or modpack, and port easy to distinguish, with a copy control for the host. Actual server addresses, ports, availability and labels SHALL be maintained as site content rather than assumed to be permanent because they appear in the mockup.

#### Scenario: Comparing servers

- **WHEN** a visitor views the directory
- **THEN** entries are grouped by game and each entry's host, classification and port are readable

### Requirement: Footer and typography

The page SHALL close with a centered crias.games identity, a small computer motif and horizontal neon accents. Major headings SHALL use bold, energetic display styling with a pink or white neon treatment; instructions and server details SHALL use a clear, high-contrast sans-serif style. Visible site copy SHALL be in Brazilian Portuguese.

#### Scenario: Reading the page

- **WHEN** a visitor moves from the hero through the directory to the footer
- **THEN** headings, body text and connection details have a clear visual hierarchy and remain readable

### Requirement: Responsive and accessible presentation

The layout SHALL adapt to narrow screens by stacking or reflowing the instructions and game cards in their original reading order. Decorative artwork MAY be cropped, reduced or repositioned to preserve usable space, but SHALL NOT cover content or force horizontal page scrolling. Interactive controls SHALL be keyboard accessible and have discernible names; decorative imagery SHALL NOT add redundant screen-reader content.

#### Scenario: Viewing on a narrow screen

- **WHEN** a visitor uses a phone-sized viewport
- **THEN** the hero, instructions and game groups remain readable and operable without horizontal page scrolling

### Requirement: Overall desktop composition

The desktop page SHALL form a single continuous illustrated scene, with a centered content column framed by decorative artwork at both edges. The hero occupies the upper portion, the joining panel sits directly beneath it, the wider server panel follows with a small vertical gap, and the footer sits below the directory over the continuing grid. The content panels SHALL align around the page center, with the server panel extending slightly wider than the joining panel. Rounded corners, thin luminous borders, outer glows and dark purple interiors SHALL visually separate panels from the background.

#### Scenario: Scanning the full page

- **WHEN** a visitor scans the desktop layout from top to bottom
- **THEN** the hero, joining instructions, server directory and footer appear in that order as one centered composition framed by the illustration

### Requirement: Background and side illustrations

The skyline SHALL span the upper background beneath a star-filled dark sky, with a large horizontally striped orange and pink sun centered behind the wordmark. Cyan wireframe mountains and a magenta perspective grid SHALL lead from the horizon toward the bottom edge. A neon-lit street facade and vertical Japanese-style signage frame the upper right; vertical neon lettering and wireframe scenery frame the left.

The left side SHALL include a prominent vaporwave/Gigachad classical bust wearing dark pixel sunglasses, lit in cyan, violet and pink and resting on an Ionic pedestal. It sits below the upper-left portraits and above the vertical stack of side portraits. The side portraits SHALL use overlapping, tilted, light-edged photo or sticker frames, with Kurisu, Faye, Hinata and Rem descending along the left and Usagi, Aqua, Mayano Top Gun and Super Creek descending along the right. The upper character groups SHALL overlap the skyline around the central title. This decorative framing SHALL preserve the unobstructed central reading area.

#### Scenario: Identifying the decorative frame

- **WHEN** the complete desktop composition is visible
- **THEN** the Gigachad bust and pedestal are recognizable on the left and the fourteen named characters frame the centered content in their specified regions

### Requirement: Hero details

The hero SHALL place the large italic brush-lettered pink and white title in front of the sun and skyline, with a cyan brushstroke underline. A smaller uppercase italic subtitle sits immediately below. Beneath it, a centered dark rounded callout with a cyan-blue glow SHALL summarize the private Terraria, Minecraft and Hytale servers and direct visitors to install NetBird and connect. The callout SHALL span substantially less width than the main panels.

#### Scenario: Reading the introduction

- **WHEN** a visitor starts at the top of the page
- **THEN** the title is the dominant element, followed by the subtitle and a distinct introductory callout

### Requirement: Joining panel details

The joining panel SHALL have a globe icon and italic uppercase heading at its upper left, followed by a horizontal divider. Each of the four desktop columns SHALL contain a pink numbered badge, a small relevant icon, a bold step title and supporting text. Bright chevrons SHALL indicate progression between adjacent columns. The second column SHALL emphasize the management URL in a cyan-outlined inset with a copy icon. The invitation step SHALL make clear that an invitation is requested manually from Crias.

#### Scenario: Following the steps

- **WHEN** the instructions are displayed on a wide screen
- **THEN** their numbered columns and chevrons guide the visitor from installation through connection in sequence

### Requirement: Directory panel details

The directory panel SHALL begin with a gamepad icon, an italic uppercase “Servidores” title, a vertical separator and a short descriptor, followed by a horizontal divider. Its desktop cards SHALL appear left to right as Terraria, Minecraft and Hytale. Terraria and Minecraft occupy comparable larger columns, while Hytale is narrower. Each card SHALL have a distinct colored luminous border, branded illustrated header and dark interior. Terraria uses cyan accents and landscape art; Minecraft uses green accents and block-style scenery; Hytale uses blue accents and a tall pixel-art landscape.

Within each card, server entries SHALL appear as vertically stacked dark rounded rows with a light outline. The host is the primary line; a colored pill identifies the server category or modpack, and the port appears alongside it. A neon-framed copy icon sits at the right of each row. The mockup depicts four Terraria entries, three Minecraft entries and one Hytale entry; the number of rows SHALL adapt to current data without changing the grouping or hierarchy.

#### Scenario: Reading a server card

- **WHEN** a visitor examines a game group
- **THEN** its artwork and heading identify the game and its server rows expose host, category, port and copy control in a consistent arrangement

### Requirement: Footer placement

The footer SHALL sit centered below the server panel over the grid, with a neon computer icon beside the “crias.games” wordmark and short horizontal glowing lines extending to either side.

#### Scenario: Reaching the end of the page

- **WHEN** a visitor reaches the bottom of the directory
- **THEN** the centered footer provides a visual closing point to the composition
