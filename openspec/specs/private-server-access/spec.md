# Private server access

## Purpose

Describe the joining instructions and server directory shown in the CRIAS GAMES mockup. The connection values in `docs/mockup-reference.md` are visual reference data and have not been verified as operational.

## Requirements

### Requirement: Manual network onboarding
The site SHALL present four ordered steps: install NetBird, configure the management URL, request a manual invitation from Crias, and connect to the network and a game server. It SHALL make clear that invitations are manual and SHALL NOT imply the website issues them.

#### Scenario: First-time visitor
- **WHEN** a visitor reads the joining panel
- **THEN** they can identify the four steps and understand that an invitation is required before connecting

### Requirement: Game server directory
The directory SHALL organize servers into illustrated Terraria, Minecraft, and Hytale cards in that order on wide screens. Each entry SHALL identify its hostname, variant, and port in text. Hytale's UDP protocol SHALL be shown where applicable. Content SHALL reflow in the same order on smaller screens.

#### Scenario: Finding a server
- **WHEN** a visitor browses the directory
- **THEN** they can distinguish game and variant and read the corresponding full hostname and port

### Requirement: Trustworthy connection information
Management URLs, invitation contacts, and server details SHALL be confirmed with the responsible operator before they are presented as usable connection information. Unconfirmed mockup values SHALL remain identified as reference examples and SHALL NOT be represented as verified or live. The static directory SHALL NOT imply real-time server status.

#### Scenario: Connection information is unconfirmed
- **WHEN** a reference value has not been confirmed
- **THEN** it is not represented as an operational connection detail

### Requirement: Copy connection values
Available management URLs and server hostnames SHALL have keyboard-operable copy controls with descriptive accessible names. A server control SHALL copy its hostname alone; the management control SHALL copy the complete URL. Success or failure SHALL be communicated visually and to assistive technology without moving the layout, and values SHALL remain selectable for manual copying.

#### Scenario: Copying a hostname
- **WHEN** a visitor activates a server's copy control
- **THEN** the displayed hostname alone is copied and feedback is provided

#### Scenario: Copy is unavailable
- **WHEN** copying fails or is denied
- **THEN** the visitor receives an accessible error and can select the unchanged value
