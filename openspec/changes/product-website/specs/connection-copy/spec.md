# Connection copy

## Purpose

Make network and server connection values easy to transfer while preserving access when clipboard operations fail.

## ADDED Requirements

### Requirement: Copy identifiable values
The site SHALL offer a clearly labelled copy control for the complete published management URL and for each published server hostname. A server control SHALL copy the hostname alone; the associated port and protocol SHALL remain separately visible.

#### Scenario: Copy a server hostname
- **WHEN** a visitor activates a server's copy control
- **THEN** the clipboard receives that record's exact hostname without a port or extra characters

#### Scenario: Copy the management URL
- **WHEN** a visitor activates the management URL copy control
- **THEN** the clipboard receives the complete displayed URL

### Requirement: Accessible copy feedback and recovery
Copy controls SHALL be keyboard operable and identify their target to assistive technology. Each attempt SHALL provide visible and programmatically announced success or failure feedback; failure SHALL leave the value selectable for manual copying.

#### Scenario: Copy succeeds
- **WHEN** a clipboard write succeeds
- **THEN** the visitor receives an understandable confirmation and can repeat the action

#### Scenario: Copy fails or is denied
- **WHEN** the browser rejects or cannot perform the clipboard write
- **THEN** the visitor receives an understandable failure message and can select the unchanged value manually
