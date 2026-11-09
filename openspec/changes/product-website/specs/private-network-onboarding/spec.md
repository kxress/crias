# Private network onboarding

## Purpose

Help visitors understand and complete the manual private-network access process before joining a game server.

## ADDED Requirements

### Requirement: Explain prerequisites and sequence
The site SHALL explain in Brazilian Portuguese that access requires NetBird, the community's custom management configuration, a manual invitation, and a connected private network before using a game server. Instructions SHALL present these dependencies in actionable order and explain unfamiliar terms in context.

#### Scenario: First-time visitor
- **WHEN** a visitor follows the joining instructions
- **THEN** they can identify installation, management URL configuration, invitation request, network connection and server connection as successive actions

### Requirement: Manual invitation
The site SHALL explain that Crias or an authorized community contact handles invitations manually and that the website does not issue them. It SHALL provide a verified way to request one when available.

#### Scenario: Contact is unconfirmed
- **WHEN** no invitation contact method has been verified
- **THEN** the site states that the contact method is unavailable and does not invent an address, handle, or automated request process

### Requirement: Accurate configuration guidance
The site SHALL present the operator-verified management URL as selectable text, explain where it is used, and provide an appropriate official NetBird installation resource. Published instructions and links SHALL be checked against the intended deployment and supported client workflow.

#### Scenario: Configuration is not confirmed
- **WHEN** the management URL or relevant instructions have not been verified
- **THEN** the site identifies configuration as unavailable pending confirmation instead of presenting a candidate value as operational

#### Scenario: Invited visitor configures access
- **WHEN** an invited visitor reads the verified instructions
- **THEN** they can identify the complete management URL and the next action needed to connect to the private network
