# Site content and local maintenance

## Operator verification

The network operator is the source of truth for the NetBird management URL, supported client instructions, invitation channel, and active game records. Review recorded during implementation on **2026-11-09**: no operator confirmation was provided for any operational value. This records an unresolved dependency; it is not evidence of availability. Before publishing a value, record the operator/source and confirmation date in `content/verified-network.json` (and in the table below). Never treat historical mockup notes, candidate records, DNS resolution, or a local test fixture as confirmation. If an item is not confirmed, leave its published value `null` or keep the server list empty; the site will show its unavailable state.

| Item | Current state | Evidence / follow-up |
| --- | --- | --- |
| Management URL and client workflow | Unconfirmed; withheld | No operator source supplied. Confirm the current URL and supported setup steps. |
| Manual invitation contact | Unconfirmed; withheld | No approved contact supplied. Confirm an invitation channel. |
| Game servers, active variants, ports and protocols | Unconfirmed; withheld | No records confirmed. Reconcile each candidate with current operator configuration. |

`content/operator-candidates.json` preserves historical candidate values for maintainer reference only. The public build never reads it. `tests/fixtures/verified-network.json` contains reserved `.invalid` test values; never copy those values into production content.

For each confirmed server, add a stable `id`, game, variant, hostname, numeric port, protocol (`TCP` or `UDP`), `confirmedBy`, and ISO date `confirmedAt`. Add the same confirmation fields to a non-null management URL or invitation contact. The build rejects operational values without confirmation evidence.

## Build, preview and verify

Use mise with Node 22 (see `mise.toml`):

```powershell
mise install
mise run build
mise run verify
mise run browser-check
mise run preview
```

The build refreshes the generated repository-root `index.html` for a direct local-root preview and produces `dist/` for Pages. The deployment workflow uploads only `dist/`. For a local preview of the Pages artifact, open `http://127.0.0.1:4173/`. To simulate a repository subpath, stop the preview and run:

```powershell
mise run preview -- --prefix crias-games --port 4174
```

Then open `http://127.0.0.1:4174/crias-games/`. Both previews serve the same generated static files; assets and section links are relative or fragment-only. The Pages workflow builds and uploads only `dist/`, never the source, candidate content, or fixture directory.

To serve the generated repository-root entry instead of the `dist/` artifact, set the source directory before previewing:

```powershell
$env:SITE_DIR = '.'
mise run preview -- --port 4175
```

For a phone on the same Wi-Fi/LAN, find the computer's IPv4 address with `Get-NetIPConfiguration`, then bind the preview to that address, for example:

```powershell
mise run preview -- --host 192.168.1.20 --port 4173
```

Replace the example address with the computer's LAN address and open `http://<LAN-address>:4173/` on the phone. The default preview binds only to `127.0.0.1`; the `--host` option is needed for other devices.

After an operator-confirmed content update, run the build and local checks, inspect the generated `dist/index.html`, and verify every visible/copyable value matches its evidence. The static listing does not report live health or player counts.

## Local review limits

The implementation review used Chromium 143 and Microsoft Edge 140 locally, with desktop and mobile viewport emulation. The browser check covers narrow through wide CSS viewports, including a 720 CSS-pixel reflow width as the 200% zoom equivalent on a 1440-pixel viewport. No physical phone, separate screen reader, Firefox, Safari, or live Pages deployment was available for this review.

To run the same Chromium-based browser check in Edge or another local Chromium browser, set `CHROMIUM_PATH` to that browser executable before `mise run browser-check`.
