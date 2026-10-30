#!/usr/bin/env python3
"""Generate the SALEEM CAPS brand logo assets (SVG)."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")
os.makedirs(IMG, exist_ok=True)

GOLD_DEFS = """
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F6E6AE"/>
      <stop offset="0.32" stop-color="#E4C56B"/>
      <stop offset="0.55" stop-color="#D4AF37"/>
      <stop offset="0.78" stop-color="#B8860B"/>
      <stop offset="1" stop-color="#EBD48A"/>
    </linearGradient>
    <linearGradient id="goldSoft" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFF4CC"/><stop offset="1" stop-color="#C39A2B"/>
    </linearGradient>
"""

# The cap glyph: dome + band + embroidered medallion, centred on 0,0 within r≈46
GLYPH = """
    <g>
      <path d="M -46 12 C -48 -12 -30 -34 0 -34 C 30 -34 48 -12 46 12 Z"
            fill="none" stroke="url(#goldSoft)" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M -46 12 C -46 4 -26 2 0 2 C 26 2 46 4 46 12 Z"
            fill="url(#goldSoft)" fill-opacity="0.35" stroke="url(#goldSoft)" stroke-width="2.4"/>
      <circle cx="0" cy="-17" r="6.5" fill="none" stroke="url(#goldSoft)" stroke-width="1.8"/>
      <circle cx="0" cy="-17" r="2" fill="#F6E6AE"/>
      <g stroke="url(#goldSoft)" stroke-width="1.3" fill="none" stroke-opacity="0.95">
        <path d="M 0 -34 L 0 -25"/>
        <path d="M -6.5 -17 L -22 -9"/>
        <path d="M 6.5 -17 L 22 -9"/>
        <path d="M -30 -12 C -34 -6 -36 0 -36 6"/>
        <path d="M 30 -12 C 34 -6 36 0 36 6"/>
      </g>
      <g fill="#F6E6AE">
        <circle cx="-22" cy="-9" r="1.8"/><circle cx="22" cy="-9" r="1.8"/>
        <circle cx="-36" cy="7" r="1.6"/><circle cx="36" cy="7" r="1.6"/>
      </g>
    </g>
"""


def lockup():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 200" width="820" height="200" role="img" aria-label="SALEEM CAPS logo">
  <defs>{GOLD_DEFS}
    <style>
      .wm {{ font-family: Georgia, 'Times New Roman', serif; fill: url(#gold); }}
    </style>
  </defs>
  <g>
    <circle cx="100" cy="100" r="86" fill="none" stroke="url(#gold)" stroke-width="2.6"/>
    <circle cx="100" cy="100" r="76" fill="none" stroke="url(#gold)" stroke-width="0.9" stroke-opacity="0.65"/>
    <g opacity="0.9" stroke="url(#gold)" stroke-width="0.9" fill="none" stroke-opacity="0.7">
      <path d="M 100 6 L 106 16 L 100 26 L 94 16 Z"/>
      <path d="M 100 194 L 106 184 L 100 174 L 94 184 Z"/>
      <path d="M 6 100 L 16 94 L 26 100 L 16 106 Z"/>
      <path d="M 194 100 L 184 94 L 174 100 L 184 106 Z"/>
    </g>
    <g transform="translate(100 100) scale(1.28)">{GLYPH}</g>
  </g>
  <text class="wm" x="228" y="98" font-size="57" letter-spacing="9">SALEEM CAPS</text>
  <line x1="232" y1="122" x2="800" y2="122" stroke="url(#gold)" stroke-width="1.1" stroke-opacity="0.55"/>
  <text class="wm" x="234" y="150" font-size="15.5" letter-spacing="5.5" opacity="0.92">QUALITY &#183; STYLE &#183; TRADITION</text>
</svg>
"""


def mark():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220" role="img" aria-label="SALEEM CAPS emblem">
  <defs>{GOLD_DEFS}</defs>
  <circle cx="110" cy="110" r="104" fill="#050505"/>
  <circle cx="110" cy="110" r="100" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <circle cx="110" cy="110" r="89" fill="none" stroke="url(#gold)" stroke-width="1" stroke-opacity="0.6"/>
  <g opacity="0.85" stroke="url(#gold)" stroke-width="1" fill="none" stroke-opacity="0.65">
    <path d="M 110 8 L 116 19 L 110 30 L 104 19 Z"/>
    <path d="M 110 212 L 116 201 L 110 190 L 104 201 Z"/>
    <path d="M 8 110 L 19 104 L 30 110 L 19 116 Z"/>
    <path d="M 212 110 L 201 104 L 190 110 L 201 116 Z"/>
  </g>
  <g transform="translate(110 106) scale(1.62)">{GLYPH}</g>
  <text x="110" y="176" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="23" letter-spacing="4.5" fill="url(#gold)">SALEEM</text>
  <text x="110" y="196" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="11" letter-spacing="5" fill="url(#gold)" opacity="0.85">CAPS</text>
</svg>
"""


def favicon():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>{GOLD_DEFS}</defs>
  <rect width="100" height="100" rx="18" fill="#050505"/>
  <circle cx="50" cy="50" r="41" fill="none" stroke="url(#gold)" stroke-width="2.4"/>
  <g transform="translate(50 48) scale(0.78)">{GLYPH}</g>
</svg>
"""


open(os.path.join(IMG, "logo.svg"), "w", encoding="utf-8").write(lockup())
open(os.path.join(IMG, "logo-mark.svg"), "w", encoding="utf-8").write(mark())
open(os.path.join(IMG, "favicon.svg"), "w", encoding="utf-8").write(favicon())
print("logo assets written")
