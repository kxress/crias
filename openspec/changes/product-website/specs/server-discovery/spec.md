# Server discovery

## Purpose

Help players find a game and obtain trustworthy connection details for its private servers.

## ADDED Requirements

### Requirement: Discover servers by game and variant
The site SHALL group published server records by game and identify each record's variant in text so a player can distinguish servers of the same game. The directory SHALL explain that the servers require private-network access.

#### Scenario: Returning player
- **WHEN** a player opens the directory
- **THEN** they can find their game and distinguish its listed server variants without relying on color or artwork

### Requirement: Complete connection details
Each published server record SHALL show its complete hostname, port and protocol in text, associated with its game and variant. Values SHALL remain selectable and legible even when unusually long.

#### Scenario: Player retrieves a server address
- **WHEN** a player selects a server
- **THEN** the hostname, port and protocol for that same record are visible and unambiguous

### Requirement: Verified publication
Published management and server connection information SHALL be confirmed against the responsible network operator's current configuration before publication. Unverified or retired records SHALL NOT be presented as usable servers; no live status, player count or availability claim SHALL be inferred from a static record.

#### Scenario: Candidate record is unconfirmed
- **WHEN** a candidate hostname, port, protocol or variant cannot be confirmed
- **THEN** that record is withheld from the published directory until confirmed

#### Scenario: No verified servers
- **WHEN** no records are verified for publication
- **THEN** the directory communicates that connection information is not currently available rather than implying servers are online or fabricating records

### Requirement: Maintainable and consistent records
Server connection data SHALL be maintainable independently of decorative presentation, and each displayed or copied value SHALL correspond to the same current record.

#### Scenario: Operator updates a record
- **WHEN** a verified server value is updated and the site is rebuilt or republished
- **THEN** every displayed and copied instance of that value agrees with the updated record
