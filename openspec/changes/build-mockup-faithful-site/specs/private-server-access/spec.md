# Private server access delta

## ADDED Requirements

### Requirement: Current server suffixes and version badges
The directory SHALL use the current confirmed host suffixes, release/modpack labels and exact details-page destinations. Badge colors SHALL remain consistent with the containing card interaction state.

#### Scenario: Current connection values and release destinations
- **WHEN** the implementation is reviewed against the approved detailed criteria
- **THEN** All eight game hostnames SHALL use the `.games.kress.wtf` suffix and the versions listed in the persistent server-access spec.
- **AND** Terraria Vanilla SHALL show `1.4.5.8`, Minecraft Vanilla SHALL show `1.21.11`, Better MC SHALL show `Better MC 6`, Prominence SHALL show `Prominence II`, and Hytale SHALL show `0.7.3`.
- **AND** Calamity SHALL link to `https://calamitymod.wiki.gg/wiki/2.2.4`; Terraria `1.4.5.8` SHALL link to `https://terraria.wiki.gg/wiki/1.4.5.8`; Better MC 6 SHALL link to `https://www.curseforge.com/minecraft/modpacks/better-mc-bmc6`; Prominence II SHALL link to `https://www.curseforge.com/minecraft/modpacks/prominence-2-hasturian-era`; and Hytale 0.7.3 SHALL link to `https://hytale.com/news/2026/10/hotfixes-update-7`.
- **AND** All version/modpack badges SHALL be pink when idle and cyan when their game card is hovered or focused.

#### Scenario: Inspecting updated badges
- **WHEN** a visitor views the server directory
- **THEN** each row shows its updated hostname and version, and the Calamity, Terraria 1.4.5.8, Better MC 6, Prominence II, and Hytale 0.7.3 badges open their specified details pages

### Requirement: Minecraft map link
The Minecraft card SHALL provide an accessible link to `https://map.minecraft.games.kress.wtf` separately from its server rows, without a copy control. It SHALL work without JavaScript and follow the card's pink idle and cyan hover/focus colors.

#### Scenario: Opening the Minecraft map
- **WHEN** a visitor activates the BlueMap link in the Minecraft card
- **THEN** the supplied map URL opens, with no additional server row or copy button

## MODIFIED Requirements

### Requirement: Reference joining copy
The onboarding panel SHALL present four numbered steps titled `Instale o NetBird`, `Configure a URL`, `Peça um invite pro Kress`, and `Conecte e jogue!`. It SHALL explain desktop installation, management URL configuration, a manual Discord or Telegram invitation request to Kress, and connection to the network and a listed server.

#### Scenario: Following onboarding
- **WHEN** a new visitor reads the steps in order
- **THEN** they understand the manual invitation dependency and can see and copy the management URL

### Requirement: Directory presentation and copy targets
The directory SHALL display the eight confirmed records from the persistent spec in their listed order, with four Terraria, three Minecraft and one Hytale row. Each row SHALL display the complete hostname, variant, port and protocol. The arena-v22 Minecraft row SHALL identify its mixed Java/Bedrock support while retaining version 1.21.11.

#### Scenario: Reading server details
- **WHEN** a visitor examines any record
- **THEN** its complete hostname, variant, port and protocol are associated visually and semantically; TCP rows display `/ TCP`, Hytale displays `Porta: 5520 / UDP`, and arena-v22 displays its Java/Bedrock edition support

### Requirement: Copy feedback without layout shift
The site SHALL provide nine independently named copy controls, one for the management URL and one per server hostname. Successful copying SHALL provide brief visible and announced feedback as a floating toast at the bottom of the viewport, without resizing the control, altering the value or preventing immediate repetition. Failure SHALL be announced in the toast and leave the value selectable.

#### Scenario: Copying repeatedly
- **WHEN** a visitor activates a server copy control twice
- **THEN** each attempt copies only that row's hostname and the bottom toast updates without shifting the page or panel layout

#### Scenario: Clipboard denied
- **WHEN** clipboard access fails
- **THEN** the site announces the failure in the bottom toast and the displayed value remains available for manual selection
