# Private server access

## Purpose

Describe the joining instructions and server directory shown in the CRIAS GAMES mockup. The user confirmed on 2026-11-09 that the mockup's connection details are correct. Maintain the actual values as updateable content; confirmation does not imply live monitoring.

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

### Requirement: Confirmed management URL
The management URL SHALL be `https://netbird.kress.wtf`, selectable and copyable in the configuration step. The invitation instructions SHALL describe the manual request to Crias without inventing contact details or an automatic invitation process.

#### Scenario: Configuring NetBird
- **WHEN** a visitor follows the configuration step
- **THEN** they can read and copy the complete management URL

### Requirement: Confirmed server records
The directory SHALL initially contain the eight records below, in the shown game and row order. Records SHALL be maintained separately from decorative presentation and updated when the operator changes them. The static directory SHALL NOT imply real-time server status.

#### Scenario: Reading confirmed records
- **WHEN** the visitor reads the initial directory
- **THEN** the following records appear under their respective games with their corresponding variants and ports:

| Game | Hostname | Variant | Port | Protocol |
| --- | --- | --- | --- | --- |
| Terraria | `brasilia.terraria.games.crias.wtf` | Vanilla | 7777 | TCP |
| Terraria | `lsj.terraria.games.crias.wtf` | Vanilla | 7777 | TCP |
| Terraria | `brasilia.calamity.terraria.games.crias.wtf` | Calamity | 7777 | TCP |
| Terraria | `lsj.calamity.terraria.games.crias.wtf` | Calamity | 7777 | TCP |
| Minecraft | `arena-v22.minecraft.games.crias.wtf` | Vanilla | 25565 | TCP |
| Minecraft | `bmc.minecraft.games.crias.wtf` | Better MC | 25565 | TCP |
| Minecraft | `prominence.minecraft.games.crias.wtf` | Modpack | 25565 | TCP |
| Hytale | `alpha.hytale.games.crias.wtf` | Alpha | 5520 | UDP |

### Requirement: Copy connection values
Available management URLs and server hostnames SHALL have keyboard-operable copy controls with descriptive accessible names. A server control SHALL copy its hostname alone; the management control SHALL copy the complete URL. Success or failure SHALL be communicated visually and to assistive technology without moving the layout, and values SHALL remain selectable for manual copying.

#### Scenario: Copying a hostname
- **WHEN** a visitor activates a server's copy control
- **THEN** the displayed hostname alone is copied and feedback is provided

#### Scenario: Copy is unavailable
- **WHEN** copying fails or is denied
- **THEN** the visitor receives an accessible error and can select the unchanged value

### Requirement: Reference joining copy
The onboarding panel SHALL present four numbered steps titled `Instale o NetBird`, `Configure a URL`, `Peça um invite pro Crias`, and `Conecte e jogue!`. It SHALL explain desktop installation, management URL configuration, a manual Discord or WhatsApp invitation request to Kress, and connection to the network and a listed server.

#### Scenario: Following onboarding
- **WHEN** a new visitor reads the steps in order
- **THEN** they understand the manual invitation dependency and can see and copy the management URL

### Requirement: Directory presentation and copy targets
The directory SHALL display the eight confirmed records from the persistent spec in their listed order, with four Terraria, three Minecraft and one Hytale row. Each row SHALL display the complete hostname, variant and port. Hytale SHALL visibly show UDP; Terraria and Minecraft SHALL display their ports without adding TCP text.

#### Scenario: Reading server details
- **WHEN** a visitor examines any record
- **THEN** its complete hostname, variant and port are associated visually and semantically, and Hytale displays `Porta: 5520 / UDP`

### Requirement: Copy feedback without layout shift
The site SHALL provide nine independently named copy controls, one for the management URL and one per server hostname. Successful copying SHALL provide brief visible and announced feedback without resizing the control, altering the value or preventing immediate repetition. Failure SHALL be announced and leave the value selectable.

#### Scenario: Copying repeatedly
- **WHEN** a visitor activates a server copy control twice
- **THEN** each attempt copies only that row's hostname and feedback does not shift the layout

#### Scenario: Clipboard denied
- **WHEN** clipboard access fails
- **THEN** the site communicates the failure and the displayed value remains available for manual selection
