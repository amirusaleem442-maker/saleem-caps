#!/usr/bin/env python3
"""Generate elegant SALEEM CAPS photo placeholders (images/caps/cap-01.svg ... cap-19.svg).

These are TEMPORARY, clearly marked slots for the 19 original product photographs.
Replace them by keeping the same filenames, or upload photos from the Admin Dashboard.
"""
import os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "images", "caps")
os.makedirs(OUT, exist_ok=True)

CAPS = [
    ("01", "21.5", "SARKIN SARAUTA", "deepgreen"),
    ("02", "22", "MAKERA HERITAGE", "black"),
    ("03", "22", "KAFUR ROYAL", "green"),
    ("04", "22", "ZARIA CLASSIC", "ivory"),
    ("05", "22", "DAURA EMBLEM", "black"),
    ("06", "22", "KATSINA CREST", "deepgreen"),
    ("07", "22.5", "SOKOTO REGAL", "green"),
    ("08", "22.5", "KANO SIGNATURE", "black"),
    ("09", "22.5", "HAUSA NOBLE", "ivory"),
    ("10", "22.5", "SARKI ELEGANCE", "deepgreen"),
    ("11", "22.5", "MASARI PRESTIGE", "black"),
    ("12", "22.5", "AREWA GRAND", "green"),
    ("13", "22.5", "DANFODIO LEGACY", "deepgreen"),
    ("14", "23", "GALADIMA GOLD", "black"),
    ("15", "23", "ALKALI IVORY", "ivory"),
    ("16", "23", "TAFAWA NOBLE", "green"),
    ("17", "23", "AMIR SUPREME", "deepgreen"),
    ("18", "23.5", "ZAKI ROYAL", "black"),
    ("19", "24", "BAKANDAMIYA", "green"),
]

# bg dark, bg light, fabric dark, fabric light, gold
PALETTES = {
    "black":     ("#040404", "#161616", "#313131", "#4E4E4E", "#D4AF37"),
    "deepgreen": ("#04100B", "#0B241C", "#17483A", "#2A7060", "#DFBB55"),
    "green":     ("#05130D", "#0C2B1E", "#1C5943", "#338A6A", "#E3C778"),
    "ivory":     ("#080807", "#1B1913", "#EDE3CA", "#FFFBF2", "#B8912F"),
}

# Kufi / Topi: dome with a structured crown, embroidered band, radiating motif
CAP = """
  <g transform="translate(600 520)">
    <ellipse cx="4" cy="252" rx="270" ry="36" fill="url(#shadow)"/>
    <!-- dome -->
    <path d="M -230 168 C -238 14 -148 -158 0 -158 C 148 -158 238 14 230 168 Z"
          fill="url(#fabric)" stroke="{gold}" stroke-width="3"/>
    <!-- crown seam lines -->
    <g stroke="{gold}" stroke-opacity="0.30" stroke-width="2" fill="none">
      <path d="M 0 -158 L 0 168"/>
      <path d="M -126 -128 C -84 -104 -60 40 -58 168"/>
      <path d="M 126 -128 C 84 -104 60 40 58 168"/>
      <path d="M -196 -60 C -150 -20 -140 80 -140 168"/>
      <path d="M 196 -60 C 150 -20 140 80 140 168"/>
    </g>
    <!-- embroidered top medallion -->
    <g stroke="{gold}" stroke-width="2.4" fill="none">
      <circle cx="0" cy="-80" r="34" fill="{gold}" fill-opacity="0.13"/>
      <circle cx="0" cy="-80" r="20" fill="{gold}" fill-opacity="0.18"/>
    </g>
    <g fill="{gold}">
      <circle cx="0" cy="-80" r="6"/>
      <circle cx="0" cy="-124" r="5"/>
      <circle cx="0" cy="-36" r="5"/>
      <circle cx="-46" cy="-80" r="5"/>
      <circle cx="46" cy="-80" r="5"/>
      <circle cx="-33" cy="-111" r="3.6"/>
      <circle cx="33" cy="-111" r="3.6"/>
      <circle cx="-33" cy="-49" r="3.6"/>
      <circle cx="33" cy="-49" r="3.6"/>
    </g>
    <!-- radiating embroidery -->
    <g stroke="{gold}" stroke-width="2" fill="none" stroke-opacity="0.85">
      <path d="M -46 -80 C -86 -60 -104 -40 -112 -14"/>
      <path d="M 46 -80 C 86 -60 104 -40 112 -14"/>
      <path d="M -112 26 C -96 62 -84 96 -78 128"/>
      <path d="M 112 26 C 96 62 84 96 78 128"/>
      <path d="M -6 20 C -40 40 -62 66 -72 96"/>
      <path d="M 6 20 C 40 40 62 66 72 96"/>
    </g>
    <g fill="{gold}" fill-opacity="0.9">
      <circle cx="-112" cy="-6" r="4"/><circle cx="112" cy="-6" r="4"/>
      <circle cx="-76" cy="100" r="4"/><circle cx="76" cy="100" r="4"/>
      <circle cx="-60" cy="66" r="3"/><circle cx="60" cy="66" r="3"/>
    </g>
    <!-- band -->
    <path d="M -228 168 C -228 108 -128 100 0 100 C 128 100 228 108 228 168 Z"
          fill="url(#band)" stroke="{gold}" stroke-width="3"/>
    <g stroke="{gold}" stroke-width="2" fill="none" stroke-opacity="0.9">
      <path d="M -186 146 C -120 126 -46 120 0 120 C 46 120 120 126 186 146"/>
      <path d="M -160 160 C -100 142 -38 136 0 136 C 38 136 100 142 160 160"/>
    </g>
    <g fill="{gold}" fill-opacity="0.95">
      <circle cx="-140" cy="144" r="3.4"/><circle cx="-70" cy="130" r="3.4"/>
      <circle cx="0" cy="126" r="3.4"/><circle cx="70" cy="130" r="3.4"/>
      <circle cx="140" cy="144" r="3.4"/>
    </g>
  </g>
"""


def make(idx, size, name, palette):
    bg, bg2, fab, fab2, gold = PALETTES[palette]
    cap = CAP.replace("{gold}", gold)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200" role="img" aria-label="SALEEM CAPS product photo {idx}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="{bg2}"/><stop offset="0.6" stop-color="{bg}"/><stop offset="1" stop-color="{bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="52%">
      <stop offset="0" stop-color="{gold}" stop-opacity="0.26"/><stop offset="1" stop-color="{gold}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fabric" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="{fab2}"/><stop offset="0.5" stop-color="{fab}"/><stop offset="1" stop-color="{fab2}"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{fab2}"/><stop offset="1" stop-color="{fab}"/>
    </linearGradient>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#000" stop-opacity="0.6"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.9" fill="#fff" opacity="0.045"/>
      <circle cx="5" cy="4" r="0.7" fill="#fff" opacity="0.03"/>
    </pattern>
  </defs>
  <rect width="1200" height="1200" fill="url(#bg)"/>
  <rect width="1200" height="1200" fill="url(#glow)"/>
  <rect width="1200" height="1200" fill="url(#grain)"/>

  <rect x="40" y="40" width="1120" height="1120" fill="none" stroke="{gold}" stroke-opacity="0.5" stroke-width="2"/>
  <rect x="54" y="54" width="1092" height="1092" fill="none" stroke="{gold}" stroke-opacity="0.22" stroke-width="1"/>
  <g stroke="{gold}" stroke-opacity="0.6" stroke-width="1.6" fill="none">
    <path d="M 40 104 L 40 40 L 104 40"/>
    <path d="M 1096 40 L 1160 40 L 1160 104"/>
    <path d="M 1160 1096 L 1160 1160 L 1096 1160"/>
    <path d="M 104 1160 L 40 1160 L 40 1096"/>
  </g>

  <text x="600" y="148" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="40" letter-spacing="6" fill="{gold}">SALEEM CAPS</text>
  <text x="600" y="188" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="14" letter-spacing="3" fill="#F3EBD8" fill-opacity="0.75">QUALITY &#183; STYLE &#183; TRADITION</text>
  <line x1="440" y1="212" x2="760" y2="212" stroke="{gold}" stroke-opacity="0.45"/>

{cap}

  <text x="600" y="878" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="38" letter-spacing="3" fill="#F7F1E3">{name}</text>
  <text x="600" y="926" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="20" letter-spacing="4" fill="{gold}">SIZE {size}</text>

  <g>
    <line x1="392" y1="998" x2="528" y2="998" stroke="{gold}" stroke-opacity="0.4"/>
    <text x="600" y="1006" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
          font-size="17" letter-spacing="3" fill="{gold}">PHOTO {idx}</text>
    <line x1="672" y1="998" x2="808" y2="998" stroke="{gold}" stroke-opacity="0.4"/>
  </g>
  <text x="600" y="1064" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="13" letter-spacing="2" fill="#F3EBD8" fill-opacity="0.42">PLACEHOLDER &#8212; REPLACE WITH ORIGINAL PHOTO</text>
</svg>
"""
    with open(os.path.join(OUT, f"cap-{idx}.svg"), "w", encoding="utf-8") as f:
        f.write(svg)


for c in CAPS:
    make(*c)

print(f"wrote {len(CAPS)} placeholders to {OUT}")
