# Extension TODOs

This file tracks intentional future work for the PCS browser extension.
Items are ordered by architectural dependency, not urgency.

## Role Handling
- Implement Role file selection via file picker
- Parse Role files using Copper parser
- Mount folders explicitly declared in Role
- Scope Role activation per browser tab
- Never auto-discover Roles

## Copper Parsing
- Implement lightweight, tolerant Copper parser
- Parser must:
  - Operate line-by-line
  - Ignore unknown sections and keys
  - Never rewrite files automatically
- Parsing must be opt-in per application

## Context Discovery
- Scan mounted folders on demand
- Identify Context Files heuristically
- Do not build persistent indexes
- Do not crawl in background

## Application Runtime
- Load `.flowapp.txt` files declaratively
- Wire ActionContract to Interfaces
- Render Frames without embedding logic
- Allow apps to fail without breaking context viewing

## Non-Goals (Do Not Implement)
- Authentication systems
- Encryption or key management
- Sync engines
- Background daemons
- Schema enforcement
