---
name: Accesorios Vehiculares MdP
description: Premium car-wash configurator in studio black with a single brake-light red accent.
colors:
  studio-black: "#050506"
  panel: "#0d0e10"
  panel-raised: "#16181c"
  line: "rgb(255 255 255 / 0.14)"
  cold-white: "#e8e9eb"
  mute-grey: "#9a9da3"
  stop-red: "#e0242c"
  stop-red-text: "#ff5258"
  stop-red-hover: "#f03039"
  stop-red-pressed: "#bd1c23"
  on-red: "#ffffff"
  soft-white: "#c9cbcf"
  outline-grey: "#5b5e66"
  scrollbar-grey: "#2a2d33"
typography:
  display:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 10.5vw, 4.5rem)"
    fontWeight: 250
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
    fontVariation: "wdth 62"
  title:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
    fontVariation: "wdth 62"
  body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 300
    lineHeight: 1.55
  label:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  flap: "2px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2rem"
  gutter: "clamp(1.25rem, 5vw, 4rem)"
  section: "clamp(4rem, 9vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.stop-red}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.none}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.stop-red-hover}"
  button-primary-active:
    backgroundColor: "{colors.stop-red-pressed}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cold-white}"
    rounded: "{rounded.none}"
    height: "2.75rem"
  button-ghost-hover:
    backgroundColor: "{colors.cold-white}"
    textColor: "{colors.studio-black}"
  segmented-option-selected:
    backgroundColor: "{colors.cold-white}"
    textColor: "{colors.studio-black}"
    height: "2.75rem"
  summary-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  flap-cell:
    backgroundColor: "{colors.panel-raised}"
    rounded: "{rounded.flap}"
    width: "0.66em"
    height: "1.3em"
---

# Design System: Accesorios Vehiculares MdP

## Overview

**Creative North Star: "El configurador"**

A studio at night with one car lit. The page is a premium configurator: the visitor picks Auto or Camioneta, adds extras to an already included wash, and the total and the WhatsApp message assemble live. Chosen direction "El configurador" (seed:ee9b98310585b7e6); the build is code-led, with no design-tool source. The world is studio black, panel grey, cold white, a secondary grey and the red of a brake light as the only accent, divided by 1px hairlines instead of cards.

Type does the structural work. Section titles are condensed, bold, uppercase Archivo (wdth 62%, weight 800); everything else is light Archivo (300) with tabular figures, so prices read as instruments. Density is calm: wide dark fields, one list, one summary. The only decorative motion is the split-flap price.

**Key Characteristics:**
- Dark only (`color-scheme: dark`); red is the single accent and is rare.
- Hairline (1px) rules separate rows, plans, steps; no card grid for services.
- Square corners everywhere except the 2px flap cells.
- Condensed heavy headings against a light body.
- Every color is a token in one `@theme static` block; no raw hex in components (the single exception is the `theme-color` meta tag, which cannot read CSS variables).
- Fine film grain on page-level chrome surfaces only, one intensity.
- Real photography of the owner's work; the hero is the only AI-retouched image.

## Colors

Near-black ground, cool greys, one red. No second hue exists.

### Primary
- **Stop Red** (#e0242c): button fills, switch-on state, accent-color, caret, selection. Fills only.
- **Stop Red Text** (#ff5258): the lighter red for red on black: check marks, step numerals, focus ring. Used wherever red is text or a line, to keep contrast legible on #050506.
- **Stop Red Hover / Pressed** (#f03039 / #bd1c23): button states.
- **On Red** (#ffffff): text and switch thumb on a Stop Red fill, and selected text.

### Neutral
- **Studio Black** (#050506): page, navbar once scrolled, vehicle bar, bottom bar. Every scrim is `color-mix` of this token with transparent; scrims never introduce a new color.
- **Panel** (#0d0e10): summary card, switch track, gallery placeholders, map frame, grain switch.
- **Panel Raised** (#16181c): hover on segmented options, split-flap cell faces.
- **Line** (rgb 255 255 255 at 14%): every hairline and border.
- **Cold White** (#e8e9eb): primary text, selected segmented option fill, ghost button outline.
- **Soft White** (#c9cbcf): hero subtitle and navbar links at rest.
- **Mute Grey** (#9a9da3): descriptions, labels, secondary text.
- **Outline Grey** (#5b5e66): switch outline and dashed placeholder border.
- **Scrollbar Grey** (#2a2d33): scrollbar thumb only.

### Named Rules
**The One Voice Rule.** Red is the only accent. It marks action (buttons), state (switch on, check) and sequence (step numbers). It never decorates headings or backgrounds.
**The Text-Red Rule.** Red used as text, icon or focus outline is Stop Red Text, never Stop Red. The one exception is the 2px active-link underline in the navbar, which is Stop Red (a line, not text).
**The Token-Only Rule.** Colors are declared once in `@theme static` in `src/styles/global.css`. Components reference tokens; overlays derive from tokens with `color-mix`.
**The Grain Rule.** Grain (`public/grano-fino.png`, 128px alpha tile, used as given, set via `--grano` and `--grano-tam`) is applied with the `.con-grano` class at one intensity only, on the body, the navbar once scrolled, the vehicle bar and the mobile bar. Never on the hero, photos, panels, buttons or the map. Measured worst-case contrast on grain: muted text 6.68:1, main text 14.9:1, red text 5.7:1; do not add a surface that would lower these.

## Typography

**Display / Body Font:** Archivo Variable (with system-ui, sans-serif), width axis loaded via `@fontsource-variable/archivo/wdth.css`.

**Character:** a single family stretched between two extremes: ultra-condensed black for titles, light normal-width for reading. Contrast comes from width and weight, not from a second face.

### Hierarchy
- **Display** (250, clamp 2.5rem to 4.5rem on mobile, clamp 3.5rem to 5.5rem from 800px, 1.02, -0.02em): the hero H1 only, sentence case.
- **Headline** (800, wdth 62%, clamp 2.5rem to 4.75rem, 0.95, uppercase): every H2. The closing H2 is smaller (clamp 2.25rem to 3.5rem, max 11ch).
- **Title** (800, wdth 62%, 1.75rem, uppercase): H3, the summary heading. Step numerals reuse this voice at 2rem in Stop Red Text.
- **Body** (300, 1.0625rem, 1.55): running text. Lede paragraphs are Mute Grey, max 40rem.
- **Row name** (600, 1.0625rem) with **row description** (300, 0.9375rem, Mute Grey).
- **Label** (500-600, 0.75-0.8125rem, 0.12-0.14em, uppercase): vehicle label, segmented options, summary captions, the "incluido" tag.
- **Price** (600-700, tabular figures): 1.125rem in rows, 1.75rem in plans, 2.5rem for the total.

### Named Rules
**The Width-Is-Hierarchy Rule.** Titles are condensed (wdth 62%) heavy uppercase; nothing else is condensed except step numerals. Body never leaves wdth 100%.
**The Tabular Rule.** Every price and number uses tabular figures.

## Layout

Single column landing, mobile-first, max content width 72rem inside a fluid gutter (clamp 1.25rem to 4rem). Sections separate with a vertical rhythm of clamp 4rem to 7rem. A fixed 3.5rem navbar sits on top (the scroll offset for anchors). Hero is full-bleed at 100svh with copy in the dark upper-left; on desktop (800px+) the photo box is 118% wide, copy sits left (max 44rem) and centred vertically over a left-to-right scrim, and the subtitle width is capped (max of 20rem and 31vw) to stay clear of the car's badge. The hero carries an "Atención solo con cita previa" line. The last section is a full-width map band (14rem to 18rem tall) after the closing photo section, preceded by a notice and actions in the content column. The configurator is a 7fr / 5fr grid from 900px: option list left, sticky summary right (offset below the navbar and the 4.25rem vehicle bar). Below 900px a fixed 4.5rem bottom bar carries total and the WhatsApp button. A sticky vehicle bar (Auto / Camioneta) holds the page's one global choice. Maintenance plans become three columns (text, price, button) from 800px; gallery goes from 2 to 3 columns; booking steps from stacked to three columns. Breakpoints in use: 520, 800, 900px.

## Elevation & Depth

Flat. Depth comes from tonal steps (black, panel, raised panel) and 1px hairlines, never from shadows on surfaces. The one inset shadow is the navbar's 2px active-link underline, a line rather than depth. Photographs sit under black gradient scrims so type can rest on them without panels.

### Named Rules
**The Flat-With-Hairlines Rule.** Separation is a 1px Line rule or a tonal step. No drop shadows, no glows. Surface texture comes from grain, not from shadow.

## Shapes

Hard rectangles. Buttons, summary, segmented control, switches, tags and placeholders have 0 radius; only the split-flap cells carry a 2px radius, as physical tiles. Borders are 1px; the switch and the dashed gallery placeholders use Outline Grey. Photos are cropped to 4:5 (gallery) and 3:2 / 16:9 (hero, wide frame).

## Components

### Buttons
- **Shape:** square (0 radius), uppercase, 700 weight, 0.06em tracking.
- **Primary:** Stop Red fill, white text, 3.25rem tall, 0 1.75rem padding; hover and pressed shift fill (see tokens). Full-width (`block`) inside the summary; flexible in the bottom bar (3rem).
- **Ghost:** transparent, Cold White 1px outline, 2.75rem tall; hover inverts to Cold White fill, black text. Used for maintenance plan requests.
- **Focus:** global 2px Stop Red Text outline, 3px offset (inset -3px on rows and segments).

### Navigation
Fixed 3.5rem bar, transparent over the hero, then Studio Black with a Line bottom border and grain once scrolled past 8px. Brand mark at left (provisional logo, lightened into the black), uppercase 0.8125rem links at 500 weight and 0.1em tracking in Soft White; hover and active go Cold White. A scrollspy sets `aria-current="true"` on the section link nearest 40% of the viewport (the last link at page bottom), shown as a 2px Stop Red underline. Under 900px the link list scrolls horizontally with no scrollbar and keeps the active link centred; from 900px links centre and the Instagram handle appears at right.

### Vehicle selector (segmented control)
Two equal options in a 1px frame; selected is Cold White fill with black text, hover is Panel Raised. Radiogroup semantics. Label hidden under 520px.

### Option rows (configurator list)
Hairline-separated rows, min 4.5rem: an icon column (check for the included wash, switch for extras), name and description, and the price at right. Extras are switches: square track, red when on, white thumb sliding 0.3s. Hover tints 3.5% white.

### Summary
Panel fill, 1px Line border, 1.5rem padding: H3 title, uppercase vehicle caption, hairline itemised list, total with flap price, full-width primary button, grey note.

### Split-flap price (signature)
Each digit is a 0.66em by 1.3em tile in Panel Raised with a 1px black centre seam. When a digit changes, old and new faces rotate on X (out then in, 0.42s, Archivo ease-out expo curve), staggered 55ms per changed digit, so a full price settles in under 800ms. Only changed digits flip; the total and rows whose value changed animate, and vehicle switches flip plan and row prices. Under `prefers-reduced-motion: reduce` the animation is not applied and digits swap instantly. The real text lives in a `.sr-only` span; the flap cells are `aria-hidden`; the total is a `role="status"`.

### Location band
Closing section: a bold notice "Atendemos únicamente con cita previa", a lede, a primary button and a text link, then a full-width Google Maps iframe between Line rules on Panel, 14rem to 18rem tall, filtered `grayscale(1) invert(0.92) contrast(0.9)` so it reads as dark. The query is zone-level until the exact address is set in `src/data/business.ts` (TODO). No grain on the map.

### Grain switch (temporary)
A fixed Panel button, bottom left, toggling `html[data-grain]` to compare with and without grain. Built for review and removable; not part of the lasting system.

### Gallery placeholders
Empty dashed-outline Panel tiles with an uppercase grey caption, standing in until real photos arrive. Temporary: replace with photographs, do not restyle the dashed box into a pattern.

### Plans, steps, close
Plans are hairline rows (text, price with "por lavado", ghost button). Steps are numbered in condensed red numerals between hairlines. The closing photo section reuses the hero photo under a Studio Black scrim with an 11ch H2 and a primary button.

### Imagery and provenance
- `public/hero-bmw-x2-desktop.webp` and `hero-bmw-x2-mobile.webp`: real car washed by the owner, photographed from the Instagram account, AI-retouched for the hero only (studio background, water drops, lit taillight). Reused in the closing section.
- `public/logo-actual.jpg`: Instagram profile picture, provisional, to be replaced. It is knocked into the black with `mix-blend-mode: lighten` in the top bar.

## Do's and Don'ts

### Do:
- **Do** keep Stop Red as the only accent and use Stop Red Text (#ff5258) whenever red is text, icon or outline.
- **Do** set section titles in Archivo wdth 62%, weight 800, uppercase; body in weight 300.
- **Do** separate content with 1px Line rules and tonal panel steps.
- **Do** keep prices in tabular figures and animate changes with the staggered split-flap, under 800ms, respecting reduced motion with real text in `.sr-only`.
- **Do** declare every color as a token in `@theme static` and derive scrims with `color-mix` from the bg token.
- **Do** apply grain only through `.con-grano` on the listed chrome surfaces, at one intensity.
- **Do** keep corners square (0) except flap cells (2px).
- **Do** use real photography of the owner's work; mark any retouched raster with its provenance.

### Don't:
- **Don't** return to a grid of service cards with a generic WhatsApp button; the configurator is the structure.
- **Don't** put panels or cards over the hero photo; type sits on scrims only.
- **Don't** add drop shadows, glows or a second accent hue.
- **Don't** write raw hex or rgb colors in components or add a grain intensity; extend the tokens instead.
- **Don't** put grain on the hero, photos, panels, buttons or the map.
- **Don't** name the owner anywhere in public-facing copy or labels.
- **Don't** use a condensed face for body text or sentence-case condensed titles.
- **Don't** invent reviews, client counts, guarantees or superlatives (PRODUCT.md).
- **Don't** treat the provisional logo or the dashed gallery placeholders as final identity.
