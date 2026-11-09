# Local development

The site is static. It uses Node.js only to build HTML from the canonical server data; the published output has no server runtime dependency.

## Build and preview

From the repository root, run:

```powershell
npm run build
npm run preview
```

The build writes the complete site to `dist/`. The preview serves that folder at `http://localhost:4173`; stop it with Ctrl+C.

## Updating the directory

Edit `src/data/servers.json`. Keep the management URL and each game's ordered `servers` array there. A record has `hostname`, `variant`, `port`, and `protocol`; the build renders every card and copy target from this file. Terraria and Minecraft show their ports without a TCP label, while UDP is appended for Hytale. Rebuild after editing to inspect the generated `dist/index.html`.

Do not put live-status claims in the directory: this static page does not monitor server availability. Invitations are requested manually from Crias.
