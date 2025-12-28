Personal Context Servers

Personal Context Servers (PCS) are a way to organize, navigate, and operate on personal or small-group information without requiring a hosted backend, database, or always-on server.

A Personal Context Server is built from plain files.
It serves context, not compute.

What problem this solves

Modern software pushes almost every workflow into a server-shaped box. Dashboards, password managers, intranets, CRMs, camera systems, project hubs, and personal “life admin” tools all assume accounts, schemas, sync engines, and uptime.

Most of these systems are not computationally complex. They are maps.

They answer questions like:

What belongs together?

Where do I go next?

What was I doing?

Which account or link applies here?

Personal Context Servers address that missing layer directly, without forcing everything into a service.

What a Personal Context Server is

A Personal Context Server is:

File-based

User-owned

Context-driven

Portable

Inspectable

It is composed of:

Plain-text Context Files (using the Copper format)

Optional attachments (PDFs, images, exports, notes)

A lightweight browser extension that renders and interprets context

There is no required server, database, or cloud backend.

The “server” is conceptual, not infrastructural.

Context Files

A Context File is a human-readable text file that acts like a page or dashboard. It can contain:

Accounts and credentials (as notes, not a vault)

Links to services, devices, or dashboards

Notes, explanations, and reminders

References to local files or folders

Context Files are named by meaning, not by type.

Examples:

Streaming Services.txt

Home Network.txt

Office Cameras.txt

Client Acme Corp.txt

They remain readable and useful even if all tooling disappears.

Roles

Roles define scope, not permission.

A Role file describes which folders are active and which applications are available in a given session. Roles are explicitly selected by the user and scoped per browser tab.

Roles do not handle security. Access control is inherited entirely from the underlying filesystem or storage provider.

The browser extension

The Personal Context Server browser extension is a runtime lens.

It:

Allows users to explicitly select folders to mount

Loads Role files

Discovers Context Files heuristically

Parses Copper files when needed

Runs declarative applications (.flowapp.txt)

Maintains per-tab session state

It does not:

Manage authentication or encryption

Sync data

Store secrets

Impose schemas

Rewrite files automatically

Security lives at the boundary, not in the extension.

Applications

Applications are declarative and text-defined.

Examples:

ContextViewer
Renders Context Files as readable pages.

CredentialManager
Interprets [Account] sections to assist with logins.

Applications describe intent. The extension routes and executes that intent safely within browser constraints.

Security model

Personal Context Servers do not implement security mechanisms internally.

They inherit security from where the files live:

Encrypted folders

Encrypted removable media

OS permissions

Cloud storage access controls

If a folder is unreadable, the context does not exist.
If it is readable, the user has intentionally unlocked it.

This keeps the system simple, auditable, and trustworthy.

Portability

Because everything is file-based, a Personal Context Server can live:

In Google Drive

In a local folder

On a NAS

Inside an encrypted USB drive

It can also be paired with a portable browser that has the extension preinstalled, allowing a full personal context to be carried, mounted, and dismissed without leaving residue behind.

Design philosophy

Personal Context Servers are deliberately boring in their primitives and powerful in composition.

They prioritize:

Human readability

Explicit intent

Durability over cleverness

Separation of concerns

Graceful degradation

If all tooling disappears, the files still make sense.

Status

This repository is a specification and reference implementation in progress.

The primary goal is to define a clean, durable model for personal and small-scale context serving before committing to heavy implementation.

Guiding idea

A Personal Context Server is not an app you log into.

It is a context you carry.
