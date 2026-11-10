# Game card artwork provenance

The active cards each use one continuous screenshot as their complete backdrop, behind the title and individually boxed server rows. There are no separate header/lower strips or generated lower landscapes in the rendered cards. All earlier images remain available under their existing filenames.

## Active full-card backgrounds — 2026-11-10

| Game | Active asset | Source | Processing |
| --- | --- | --- | --- |
| Terraria | `src/assets/art/terraria-background-1.webp` | Same [early forest spawn capture](https://cdn.mobygames.com/screenshots/16849041-terraria-windows-in-the-beginning-youll-spawn-in-forest-with-npc.png), hosted by MobyGames; third-party reuse rights remain unverified. | Crop 950 × 350 at +0+55 from the 1200 × 675 original to remove HUD/map and most unlit underground; WebP quality 94. CSS cover at 75% horizontal position retains the player/Guide forest area without inventing or blurring scenery. |
| Minecraft | `src/assets/art/minecraft-background-1.webp` | [Official Mojang multi-biome screenshot](https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/EXPLORE_PDPScreenshotRefresh2024_multipleBiomes_01.png), from the [Minecraft game page](https://www.minecraft.net/en-us/about-minecraft). | Complete 3840 × 2160 source resized to 1600 × 900, WebP quality 90; CSS cover. No blurred edge extension or texture overlays. |
| Hytale | `src/assets/art/hytale-background-1.webp` | [Official Zone 1 Shadows screenshot](https://cdn.hytale.com/5e7b9e9b50cbcd001176c5ad_1___zone_1_shadows.jpg) from [Hytale media](https://hytale.com/media), labelled work in progress by its publisher. | Complete 1920 × 1080 source resized to 1600 × 900, WebP quality 90; CSS cover at 42% horizontal position. Replaces both the short header derivative and generated lower scene. |

The game artwork remains copyrighted by its owners; source availability does not grant reuse rights. Files are numbered so these selections can be revised without losing the earlier versions.

## Retained header derivatives (inactive)

| Game | Active asset | Source and selection | Processing |
| --- | --- | --- | --- |
| Terraria | `src/assets/art/terraria-scene.webp` | Early forest spawn screenshot with a new character and the Guide. Source page: [MobyGames screenshot](https://www.mobygames.com/game/51623/terraria/screenshots/windows/1031961/); direct image: [1200 × 675 capture](https://cdn.mobygames.com/screenshots/16849041-terraria-windows-in-the-beginning-youll-spawn-in-forest-with-npc.png). This is a third-party hosted in-game capture, not a first-party press image. Redistribution rights are unverified. | A 900 × 180 gameplay band was cropped to remove the HUD and map, scaled to the existing card-art canvas, and extended with a blurred edge fill. |
| Minecraft | `src/assets/art/minecraft-scene.webp` | Official Mojang/Minecraft screenshot of snowy mountains, spruce forest, and cherry trees. Source page: [Discover the world of Minecraft](https://www.minecraft.net/en-us/about-minecraft); direct image: [4K screenshot](https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/EXPLORE_PDPScreenshotRefresh2024_multipleBiomes_01.png). | A 1920 × 384 landscape band was cropped from the 3840 × 2160 screenshot, scaled to the existing card-art canvas, and extended with a blurred edge fill. The official Java 1.21.11 title-screen panorama was also inspected, but its current night scene is too dark for the short card header. |
| Hytale | `src/assets/art/hytale-scene.webp` | First-party Hytale media-gallery screenshot titled “Zone 1 Shadows,” showing the forest biome and stone structure. Source page: [Hytale Media](https://hytale.com/media); direct full-size image: [1920 × 1080 screenshot](https://cdn.hytale.com/5e7b9e9b50cbcd001176c5ad_1___zone_1_shadows.jpg). Hytale labels its gallery media as work in progress. | A 1920 × 384 landscape band was cropped, scaled to the existing card-art canvas, and extended with a blurred edge fill. |

The three new derivatives were encoded as WebP at quality 88 with ImageMagick. Their final canvases retain the existing 1774 × 887 Terraria and 1672 × 941 Minecraft/Hytale dimensions, so the site markup and card geometry do not need to change. The source game art remains copyrighted by its respective owners; this provenance record does not grant reuse rights. Terraria's source is not first-party and its reuse terms were not found during this change.


## Retained lower card images (inactive)

- **Minecraft lower card image**: src/assets/art/minecraft-landscape.webp is a 3840×1320 crop at +0+700 from Mojang's official 3840×2160 multi-biome screenshot, resized to 1672×576 WebP at quality 90 using ImageMagick. Source page: [Discover the world of Minecraft](https://www.minecraft.net/en-us/about-minecraft); direct image: [official screenshot](https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/EXPLORE_PDPScreenshotRefresh2024_multipleBiomes_01.png).
- **Hytale** retains the previously generated `hytale-scene-1.webp` for history only. It is not rendered by the site.
