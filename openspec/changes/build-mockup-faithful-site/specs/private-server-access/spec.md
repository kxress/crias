# Private server access delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Copy feedback without layout shift
The site SHALL provide nine independently named copy controls, one for the management URL and one per server hostname. Successful copying SHALL provide brief visible and announced feedback as a floating toast at the bottom of the viewport, without resizing the control, altering the value or preventing immediate repetition. Failure SHALL be announced in the toast and leave the value selectable.

#### Scenario: Copying repeatedly
- **WHEN** a visitor activates a server copy control twice
- **THEN** each attempt copies only that row's hostname and the bottom toast updates without shifting the page or panel layout

#### Scenario: Clipboard denied
- **WHEN** clipboard access fails
- **THEN** the site announces the failure in the bottom toast and the displayed value remains available for manual selection
