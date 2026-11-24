#!/usr/bin/env python3
"""Fen Bilimleri 6 · EXPRESS ders notu (deneme sınavına hızlı hazırlık) · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/express_pdf.py   ->  pdf/fen-express.pdf
Deneme sınavındaki kazanımlara göre düzenlenmiş; her kazanımda özün özü, bol örnek,
vurucu ipuçları, tuzaklar ve mini sorular var. Sonda mini deneme ve cevap anahtarı.
Gereksinim: google-chrome ve pypdf. El yazısı yazı tipi araclar/fontlar altında (SIL OFL).
"""
import subprocess, sys, tempfile
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
FONT = KOK / "araclar" / "fontlar"
YAZAR = "Mehmet Karadeniz, 2026-2027"
CHROME = next((c for c in ("google-chrome", "chromium", "chromium-browser")
               if subprocess.run(["which", c], capture_output=True).returncode == 0), None)

CSS = """
@font-face{font-family:"KL";font-weight:700;src:url("%(f)s/kalam-latin-700-normal.woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+2000-206F}
@font-face{font-family:"KL";font-weight:700;src:url("%(f)s/kalam-latin-ext-700-normal.woff2");unicode-range:U+0100-02AF,U+1E00-1E9F}
@page{size:A4;margin:11mm 11mm 13mm;@bottom-left{content:"Mehmet Karadeniz, 2026-2027 · Ders Rotası 6";font-family:'Fira Sans';font-size:7.4pt;color:#7b8798}@bottom-right{content:"⚡ FEN EXPRESS · Sayfa " counter(page) " / " counter(pages);font-family:'Fira Sans';font-size:7.4pt;color:#e4572e}}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:"Fira Sans","DejaVu Sans",sans-serif;font-size:calc(9.9pt * var(--o,1));line-height:1.36;color:#1f2a3a}
b{font-weight:600;color:#0f1b2d}
.ayak{position:fixed;bottom:-8mm;left:0;right:0;display:flex;justify-content:space-between;font-size:7.4pt;color:#7b8798;border-top:1px solid #dfe4ec;padding-top:1.2mm}
.ayak i{font-style:normal;color:#e4572e;font-weight:600}
h1,h2,h3{font-family:"Archivo Black","Fira Sans",sans-serif;font-weight:400;line-height:1.1}
/* kapak */
.kapak{border-radius:14px;padding:6mm 7mm 5mm;color:#fff;position:relative;overflow:hidden;
 background:linear-gradient(120deg,#e4572e 0%%,#f08a24 55%%,#f6c445 100%%);margin-bottom:4mm}
.kapak h1{font-size:30pt;letter-spacing:.02em}
.kapak h1 span{color:#1f2a3a}
.kapak p{font-size:10.4pt;max-width:128mm;margin-top:1.5mm;color:#fff}
.kapak .sim{position:absolute;right:6mm;top:4mm;width:34mm;height:34mm}
.kapak .yaz{font-size:7.6pt;margin-top:2mm;opacity:.95}
/* bölüm başlığı */
.bolum{display:flex;align-items:center;gap:3mm;margin:4.5mm 0 2.4mm;padding:2.2mm 3mm;border-radius:10px;background:var(--bz);break-after:avoid}
.bolum .kod{font-family:"Fira Sans";font-weight:700;font-size:8pt;background:var(--bc);color:#fff;border-radius:6px;padding:.8mm 2.2mm;white-space:nowrap}
.bolum h2{font-size:14.5pt;color:#0f1b2d;flex:1}
.bolum .sn{font-size:7.8pt;font-weight:600;color:var(--bc);white-space:nowrap}
.mavi{--bc:#2f6fd6;--bz:#e6efff}.mor{--bc:#7a4bd1;--bz:#efe8ff}.yesil{--bc:#1f8a5a;--bz:#e3f5ec}.turuncu{--bc:#e4572e;--bz:#ffece4}.pembe{--bc:#c2417a;--bz:#fde8f1}
h3{font-size:10.6pt;margin:2.6mm 0 1.2mm;color:#0f1b2d;break-after:avoid}
p{margin:.8mm 0}
ul.m{list-style:none;margin:.8mm 0}
ul.m li{position:relative;padding-left:4.2mm;margin:.9mm 0}
ul.m li::before{content:"";position:absolute;left:.6mm;top:.5em;width:1.8mm;height:1.8mm;border-radius:50%%;background:var(--bc,#2f6fd6)}
.iki{display:grid;grid-template-columns:1fr 1fr;gap:3mm;margin:1.6mm 0}
.uc{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.6mm;margin:1.6mm 0}
.dort{display:grid;grid-template-columns:repeat(4,1fr);gap:2.4mm;margin:1.6mm 0}
.k{border:1.3px solid #d5dce7;border-radius:10px;padding:2.4mm 3mm;break-inside:avoid;background:#fff}
ul.m li{break-inside:avoid}
.k h4{font-size:9.6pt;margin-bottom:.8mm;color:var(--bc,#2f6fd6);font-weight:700}
/* kutular */
.vurucu,.tuzak,.ornek,.dene,.formul{border-radius:10px;padding:2.4mm 3.2mm 2.4mm 11mm;margin:1.8mm 0;position:relative;break-inside:avoid}
.vurucu::before,.tuzak::before,.ornek::before,.dene::before{position:absolute;left:3mm;top:2.1mm;font-size:12pt;line-height:1}
.vurucu{background:#fff6d1;border:1.4px solid #f2c230}
.vurucu::before{content:"⚡"}
.tuzak{background:#ffe9e6;border:1.4px solid #f08a7d}
.tuzak::before{content:"⚠"; color:#d33b2c}
.ornek{background:#eaf7ef;border:1.4px solid #8fd1ac}
.ornek::before{content:"✎";color:#1f8a5a}
.dene{background:#eef3fb;border:1.4px dashed #8aa6d6}
.dene::before{content:"?";font-family:"Archivo Black";color:#2f6fd6}
.et{font-family:KL,"Fira Sans",sans-serif;font-weight:700;font-size:9.6pt;display:block;margin-bottom:.3mm}
.vurucu .et{color:#a46a00}.tuzak .et{color:#c0392b}.ornek .et{color:#1f6e48}.dene .et{color:#2f5fb0}
.hand{font-family:KL,"Fira Sans",sans-serif;font-weight:700}
.ezber{font-family:KL,"Fira Sans",sans-serif;font-weight:700;font-size:11pt;text-align:center;color:#c2417a;background:#fff;border:1.6px dashed #c2417a;border-radius:10px;padding:1.8mm 3mm;margin:2mm 0;break-inside:avoid}
/* tablo */
table{width:100%%;border-collapse:separate;border-spacing:0;font-size:calc(9.2pt * var(--o,1));margin:1.6mm 0;border:1.3px solid #d5dce7;border-radius:10px;overflow:hidden;break-inside:auto}
tr{break-inside:avoid}thead{display:table-header-group}
th{background:var(--bz,#e6efff);color:#0f1b2d;font-weight:700;text-align:left;padding:1.3mm 2mm;font-size:8.8pt}
td{padding:1.2mm 2mm;border-top:1px solid #e6eaf1;vertical-align:top}
tr:nth-child(even) td{background:#fafbfd}
td.c,th.c{text-align:center}
.e{color:#1f8a5a;font-weight:700}.h{color:#c0392b;font-weight:700}
.sv{display:block;margin:1.2mm auto;break-inside:avoid}
.harita td{padding:1mm 2mm}
.bar{display:inline-block;height:3mm;border-radius:2mm;background:linear-gradient(90deg,#e4572e,#f6c445);vertical-align:middle;margin-right:1.5mm}
.yeni{break-before:page}
.etiketler{display:flex;flex-wrap:wrap;gap:1.4mm;margin:1.2mm 0}
.etiketler span{border:1.2px solid var(--bc);color:var(--bc);border-radius:20px;padding:.2mm 2.4mm;font-size:8.6pt;font-weight:600;background:#fff}
.sorular{counter-reset:s}
.soru{break-inside:avoid;margin:2mm 0;padding-left:7mm;position:relative}
.soru::before{counter-increment:s;content:counter(s);position:absolute;left:0;top:0;width:5mm;height:5mm;border-radius:50%%;background:#e4572e;color:#fff;font-weight:700;font-size:8pt;text-align:center;line-height:5mm}
.sec{display:grid;grid-template-columns:1fr 1fr;gap:.3mm 4mm;margin-top:.6mm}
.sec.tek{grid-template-columns:1fr}
.cevap{columns:2;column-gap:6mm;font-size:8.9pt}
.cevap p{break-inside:avoid;margin:.9mm 0}
"""

def bolum(renk, kod, baslik, sn=""):
    return f'<div class="bolum {renk}"><span class="kod">{kod}</span><h2>{baslik}</h2><span class="sn">{sn}</span></div>'

def kutu(tur, etiket, metin):
    return f'<div class="{tur}"><span class="et">{etiket}</span>{metin}</div>'

def ul(*m):
    return '<ul class="m">' + "".join(f"<li>{x}</li>" for x in m) + "</ul>"

def tablo(bas, satirlar, cls=""):
    return (f'<table class="{cls}"><thead><tr>' + "".join(f"<th>{b}</th>" for b in bas) + "</tr></thead>"
            + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in s) + "</tr>" for s in satirlar) + "</table>")

# ------------------------------------------------------------------ ÇİZİMLER
SIMSEK = ('<svg class="sim" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="rgba(255,255,255,.18)"/>'
          '<path d="M34 6 14 34h13l-4 20 22-30H32z" fill="#fff" stroke="#1f2a3a" stroke-width="2.4" stroke-linejoin="round"/></svg>')

def gezegen_svg():
    g = [("Merkür", 5, "#9a8f86"), ("Venüs", 8, "#e3b26b"), ("Dünya", 8.5, "#3f86d8"), ("Mars", 6.5, "#d0603c"),
         ("Jüpiter", 22, "#d9a873"), ("Satürn", 18, "#e8cf8f"), ("Uranüs", 13, "#8fd3df"), ("Neptün", 12.5, "#4f6fe0")]
    x, s, kx = 70, "", []
    for i, (ad, r, c) in enumerate(g):
        if i == 4:
            kx.append(x - 6)
            s += "".join(f'<circle cx="{x + 3 + (k * 7) % 26}" cy="{46 + ((k * 13) % 30) - 15}" r="1.4" fill="#8a8178"/>' for k in range(16))
            s += f'<text x="{x + 16}" y="22" font-size="7.4" text-anchor="middle" fill="#6b7280">asteroit</text><text x="{x + 16}" y="80" font-size="7.4" text-anchor="middle" fill="#6b7280">kuşağı</text>'
            x += 40
        cx = x + max(r, 17)
        if ad == "Satürn":
            s += f'<ellipse cx="{cx}" cy="46" rx="{r + 9}" ry="4.5" fill="none" stroke="#b9975b" stroke-width="2.2"/>'
        s += f'<circle cx="{cx}" cy="46" r="{r}" fill="{c}"/>'
        s += f'<text x="{cx}" y="80" font-size="8.6" text-anchor="middle" font-weight="700" fill="#1f2a3a">{ad}</text>'
        s += f'<text x="{cx}" y="20" font-size="7.4" text-anchor="middle" fill="#6b7280">{i + 1}</text>'
        x = cx + max(r, 17) + 8
    return (f'<svg class="sv" width="100%" viewBox="0 0 {x} 104"><defs><radialGradient id="gg"><stop offset=".55" stop-color="#ffd23f"/><stop offset="1" stop-color="#f08a24"/></radialGradient></defs>'
            f'<circle cx="0" cy="46" r="56" fill="url(#gg)"/><text x="6" y="50" font-size="10" font-weight="700" fill="#7a3d00">GÜNEŞ</text>'
            f'<rect x="64" y="8" width="{kx[0] - 64}" height="80" rx="8" fill="none" stroke="#1f8a5a" stroke-dasharray="4 3"/>'
            f'<text x="{(64 + kx[0]) / 2}" y="100" font-size="7.6" text-anchor="middle" fill="#1f8a5a" font-weight="700">KARASAL (iç) · kayalık, küçük</text>'
            f'<rect x="{kx[0] + 42}" y="8" width="{x - kx[0] - 46}" height="80" rx="8" fill="none" stroke="#2f6fd6" stroke-dasharray="4 3"/>'
            f'<text x="{(kx[0] + 42 + x - 4) / 2}" y="100" font-size="7.6" text-anchor="middle" fill="#2f6fd6" font-weight="700">GAZSAL (dış) · dev, halkalı, çok uydulu</text>'
            f'{s}</svg>')

def tutulma_svg():
    def satir(y, orta, son, baslik, renk):
        return (f'<text x="6" y="{y - 22}" font-size="10" font-weight="700" fill="{renk}">{baslik}</text>'
                f'<circle cx="40" cy="{y}" r="20" fill="#ffd23f"/><text x="40" y="{y + 34}" font-size="8" text-anchor="middle">Güneş</text>'
                f'<path d="M58 {y - 9} L{(150 if orta == "Ay" else 160)} {y - (4 if orta == "Ay" else 9)} L{(150 if orta == "Ay" else 160)} {y + (4 if orta == "Ay" else 9)} L58 {y + 9}z" fill="#fff3b0" opacity=".8"/>'
                + (f'<circle cx="150" cy="{y}" r="5" fill="#9aa0a6"/><text x="150" y="{y + 20}" font-size="8" text-anchor="middle">Ay (ortada)</text>'
                   f'<path d="M155 {y - 4} L232 {y - 1.5} L232 {y + 1.5} L155 {y + 4}z" fill="#2b2f3a" opacity=".75"/>'
                   f'<circle cx="240" cy="{y}" r="11" fill="#3f86d8"/><text x="240" y="{y + 26}" font-size="8" text-anchor="middle">Dünya</text>'
                   if orta == "Ay" else
                   f'<circle cx="160" cy="{y}" r="11" fill="#3f86d8"/><text x="160" y="{y + 26}" font-size="8" text-anchor="middle">Dünya (ortada)</text>'
                   f'<path d="M171 {y - 10} L240 {y - 7} L240 {y + 7} L171 {y + 10}z" fill="#2b2f3a" opacity=".75"/>'
                   f'<circle cx="240" cy="{y}" r="5" fill="#b5523b"/><text x="240" y="{y + 20}" font-size="8" text-anchor="middle">Ay (kızarır)</text>')
                + f'<text x="262" y="{y - 4}" font-size="8.4" fill="#1f2a3a">{son[0]}</text><text x="262" y="{y + 8}" font-size="8.4" fill="#1f2a3a">{son[1]}</text>')
    return ('<svg class="sv" width="100%" viewBox="0 0 400 168">'
            + satir(46, "Ay", ("Ay'ın gölgesi Dünya'ya düşer", "Gündüz · Yeni ay"), "GÜNEŞ TUTULMASI: Güneş – Ay – Dünya", "#e4572e")
            + satir(130, "Dünya", ("Dünya'nın gölgesi Ay'a düşer", "Gece · Dolunay"), "AY TUTULMASI: Güneş – Dünya – Ay", "#2f6fd6")
            + '</svg>')

def kuvvet_svg():
    return ('<svg class="sv" width="100%" viewBox="0 0 400 78">'
            '<line x1="10" y1="40" x2="390" y2="40" stroke="#9aa6b8" stroke-dasharray="5 4"/>'
            '<text x="296" y="32" font-size="8.4" fill="#6b7280">doğrultu (yatay çizgi)</text>'
            '<rect x="40" y="22" width="44" height="36" rx="4" fill="#e6efff" stroke="#2f6fd6" stroke-width="1.6"/><text x="62" y="70" font-size="8" text-anchor="middle">cisim</text>'
            '<circle cx="84" cy="40" r="3.6" fill="#e4572e"/><text x="84" y="14" font-size="8.4" text-anchor="middle" fill="#e4572e" font-weight="700">uygulama noktası</text>'
            '<line x1="84" y1="40" x2="250" y2="40" stroke="#e4572e" stroke-width="4"/><path d="M250 31 266 40 250 49z" fill="#e4572e"/>'
            '<text x="272" y="44" font-size="8.4" font-weight="700" fill="#e4572e">yön: sağa (okun ucu)</text>'
            '<path d="M86 56v6h178v-6" fill="none" stroke="#1f8a5a" stroke-width="1.4"/><text x="175" y="74" font-size="8.4" text-anchor="middle" fill="#1f8a5a" font-weight="700">büyüklük: 30 N (okun uzunluğu)</text>'
            '</svg>')

def ok(x, y, uz, yon, renk, yazi):
    x2 = x + uz * yon
    uc = f'M{x2} {y - 5} {x2 + 9 * yon} {y} {x2} {y + 5}z'
    return (f'<line x1="{x}" y1="{y}" x2="{x2}" y2="{y}" stroke="{renk}" stroke-width="3.4"/><path d="{uc}" fill="{renk}"/>'
            f'<text x="{x + uz * yon / 2}" y="{y - 7}" font-size="8.4" text-anchor="middle" fill="{renk}" font-weight="700">{yazi}</text>')

def bileske_svg():
    s = '<svg class="sv" width="100%" viewBox="0 0 420 92">'
    # aynı yön
    s += '<text x="66" y="12" font-size="8.6" text-anchor="middle" font-weight="700">Aynı yön → topla</text>'
    s += '<rect x="8" y="36" width="18" height="18" fill="#e6efff" stroke="#2f6fd6"/>' + ok(26, 38, 40, 1, "#2f6fd6", "20 N") + ok(26, 54, 60, 1, "#7a4bd1", "30 N")
    s += '<text x="66" y="84" font-size="8.6" text-anchor="middle" fill="#1f8a5a" font-weight="700">R = 50 N, sağa</text>'
    # zıt yön
    s += '<text x="210" y="12" font-size="8.6" text-anchor="middle" font-weight="700">Zıt yön → büyükten küçüğü çıkar</text>'
    s += '<rect x="201" y="38" width="18" height="18" fill="#e6efff" stroke="#2f6fd6"/>' + ok(201, 47, 70, -1, "#c2417a", "40 N") + ok(219, 47, 44, 1, "#2f6fd6", "25 N")
    s += '<text x="210" y="84" font-size="8.6" text-anchor="middle" fill="#1f8a5a" font-weight="700">R = 15 N, sola (büyüğün yönü)</text>'
    # eşit zıt
    s += '<text x="352" y="12" font-size="8.6" text-anchor="middle" font-weight="700">Eşit ve zıt → sıfır</text>'
    s += '<rect x="343" y="38" width="18" height="18" fill="#e6efff" stroke="#2f6fd6"/>' + ok(343, 47, 44, -1, "#c2417a", "30 N") + ok(361, 47, 44, 1, "#2f6fd6", "30 N")
    s += '<text x="352" y="84" font-size="8.6" text-anchor="middle" fill="#1f8a5a" font-weight="700">R = 0 → dengelenmiş</text>'
    return s + '</svg>'

def eseysiz_svg():
    def kare(x, baslik, ic, alt):
        return (f'<g transform="translate({x} 0)"><rect x="2" y="2" width="96" height="104" rx="10" fill="#fff" stroke="#e4b9cf" stroke-width="1.4"/>'
                f'<text x="50" y="16" font-size="9" text-anchor="middle" font-weight="700" fill="#c2417a">{baslik}</text>{ic}'
                f'<text x="50" y="99" font-size="7.4" text-anchor="middle" fill="#4b5565">{alt}</text></g>')
    bol = ('<ellipse cx="30" cy="52" rx="16" ry="13" fill="#bfe3d0" stroke="#1f8a5a"/><circle cx="30" cy="52" r="4" fill="#1f8a5a"/>'
           '<path d="M50 52h8" stroke="#555" stroke-width="1.6"/><path d="M56 48l4 4-4 4" fill="none" stroke="#555" stroke-width="1.6"/>'
           '<circle cx="74" cy="40" r="9" fill="#bfe3d0" stroke="#1f8a5a"/><circle cx="74" cy="40" r="2.6" fill="#1f8a5a"/>'
           '<circle cx="74" cy="66" r="9" fill="#bfe3d0" stroke="#1f8a5a"/><circle cx="74" cy="66" r="2.6" fill="#1f8a5a"/>'
           '<text x="50" y="87" font-size="7.4" text-anchor="middle" fill="#1f2a3a">1 → 2 → 4 → 8</text>')
    tom = ('<ellipse cx="42" cy="54" rx="20" ry="16" fill="#fde7b0" stroke="#c98a00"/><circle cx="66" cy="44" r="8" fill="#fde7b0" stroke="#c98a00"/>'
           '<circle cx="76" cy="30" r="4.5" fill="#fde7b0" stroke="#c98a00"/><text x="70" y="70" font-size="7" fill="#7a5200">tomurcuk</text>')
    vej = ('<ellipse cx="50" cy="60" rx="26" ry="17" fill="#d9b382" stroke="#8a5a2b"/>'
           '<circle cx="38" cy="56" r="2" fill="#8a5a2b"/><circle cx="58" cy="64" r="2" fill="#8a5a2b"/><circle cx="62" cy="52" r="2" fill="#8a5a2b"/>'
           '<path d="M38 54q-4-16 4-24M62 50q4-14 12-18" fill="none" stroke="#1f8a5a" stroke-width="2.4"/>'
           '<path d="M42 30q8-6 10 2q-8 4-10-2zM74 32q8-4 8 4q-8 2-8-4z" fill="#3fb36b"/><text x="50" y="87" font-size="7.4" text-anchor="middle" fill="#1f2a3a">patatesin gözleri</text>')
    reg = ('<g transform="translate(30 54)"><path d="M0-22 6-7 22-7 9 3 14 19 0 9-14 19-9 3-22-7-6-7z" fill="#f4a261" stroke="#b5532b"/></g>'
           '<g transform="translate(76 50)"><path d="M0-6 6-2 4 4-4 4-6-2z" fill="#f4a261" stroke="#b5532b"/><path d="M0-6 2-22-2-22z" fill="#f4a261" stroke="#b5532b"/></g>'
           '<path d="M56 52h8" stroke="#555" stroke-width="1.6"/><text x="50" y="87" font-size="7.4" text-anchor="middle" fill="#1f2a3a">kopan kol → yeni birey</text>')
    return ('<svg class="sv" width="100%" viewBox="0 0 412 108">'
            + kare(0, "Bölünme", bol, "amip, bakteri, öglena") + kare(104, "Tomurcuklanma", tom, "bira mayası, hidra")
            + kare(208, "Vejetatif üreme", vej, "patates, çilek, söğüt") + kare(312, "Rejenerasyon", reg, "deniz yıldızı, planarya")
            + '</svg>')

def cicek_svg():
    L = lambda x1, y1, x2, y2, t, a="start": (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#6b7280" stroke-width=".8"/>'
                                              f'<text x="{x2 + (3 if a == "start" else -3)}" y="{y2 + 3}" font-size="8.2" text-anchor="{a}" fill="#1f2a3a">{t}</text>')
    return ('<svg class="sv" style="width:172mm" viewBox="-70 0 500 190">'
            '<path d="M180 188v-58" stroke="#1f8a5a" stroke-width="5"/>'
            '<path d="M150 128q30 18 60 0" fill="#7ac68f" stroke="#1f8a5a"/>'               # çanak
            '<path d="M152 122q-48-30-34-78q30 20 46 66z" fill="#f7b6cf" stroke="#c2417a"/>'  # taç sol
            '<path d="M208 122q48-30 34-78q-30 20-46 66z" fill="#f7b6cf" stroke="#c2417a"/>'  # taç sağ
            '<ellipse cx="180" cy="114" rx="14" ry="12" fill="#ffe08a" stroke="#c98a00"/>'      # yumurtalık
            '<circle cx="176" cy="114" r="2.6" fill="#fff" stroke="#c98a00"/><circle cx="184" cy="116" r="2.6" fill="#fff" stroke="#c98a00"/>'
            '<path d="M180 102V46" stroke="#e0a800" stroke-width="4"/><ellipse cx="180" cy="42" rx="9" ry="5" fill="#f5c400" stroke="#c98a00"/>'  # dişicik borusu, tepecik
            '<path d="M166 112q-10-30-20-54M194 112q10-30 20-54" stroke="#6b4bd1" stroke-width="2" fill="none"/>'  # sapçık
            '<ellipse cx="145" cy="54" rx="6" ry="9" fill="#a98be8" stroke="#6b4bd1"/><ellipse cx="215" cy="54" rx="6" ry="9" fill="#a98be8" stroke="#6b4bd1"/>'
            '<g fill="#f5c400"><circle cx="160" cy="36" r="1.8"/><circle cx="168" cy="30" r="1.6"/><circle cx="172" cy="38" r="1.6"/></g>'
            + L(180, 40, 240, 16, "TEPECİK (çiçek tozu buraya konar)")
            + L(181, 76, 262, 76, "DİŞİCİK BORUSU")
            + L(192, 116, 262, 116, "YUMURTALIK → meyve olur")
            + L(182, 116, 262, 136, "yumurta hücresi → tohum olur")
            + L(144, 50, 104, 18, "BAŞÇIK (çiçek tozu üretir)", "end")
            + L(156, 86, 96, 74, "SAPÇIK", "end")
            + L(130, 96, 96, 104, "TAÇ YAPRAK (böcekleri çeker)", "end")
            + L(160, 130, 96, 140, "ÇANAK YAPRAK (tomurcuğu korur)", "end")
            + '<text x="96" y="168" font-size="8.4" text-anchor="end" fill="#6b4bd1" font-weight="700">ERKEK ORGAN = başçık + sapçık</text>'
            + '<text x="262" y="164" font-size="8.4" fill="#b08600" font-weight="700">DİŞİ ORGAN = tepecik +</text>'
            + '<text x="262" y="176" font-size="8.4" fill="#b08600" font-weight="700">dişicik borusu + yumurtalık</text>'
            '</svg>')

# ------------------------------------------------------------------ İÇERİK
def kapak():
    harita = tablo(["Kazanım", "Konu", "Denemede", ""], [
        ["FB.6.1.1", "Gezegenleri sınıflandırma", "4 soru", '<span class="bar" style="width:32mm"></span>'],
        ["FB.6.1.3", "Güneş ve Ay tutulması", "2 soru", '<span class="bar" style="width:16mm"></span>'],
        ["FB.6.2.1.1", "Kuvvetin yönü, doğrultusu, büyüklüğü", "1 soru", '<span class="bar" style="width:8mm"></span>'],
        ["FB.6.2.1", "Bileşke kuvvet", "1 soru", '<span class="bar" style="width:8mm"></span>'],
        ["FB.6.2.2", "Dengelenmiş / dengelenmemiş kuvvet (deney)", "2 soru", '<span class="bar" style="width:16mm"></span>'],
        ["FB.6.2.3", "Sürat ve hız", "3 soru", '<span class="bar" style="width:24mm"></span>'],
        ["FB.6.3.1", "Eşeyli ve eşeysiz üreme", "1 soru", '<span class="bar" style="width:8mm"></span>'],
        ["FB.6.3.2", "Bitkilerde üreme, büyüme ve gelişme", "1 soru", '<span class="bar" style="width:8mm"></span>'],
    ], "harita")
    return (f'<div class="kapak">{SIMSEK}<h1>FEN <span>EXPRESS</span></h1>'
            '<p><b style="color:#fff">Deneme sınavına hızlı hazırlık.</b> Denemedeki 15 sorunun kazanımlarına göre hazırlandı: '
            'her bölümde özün özü, bol örnek, ⚡ vurucu ipuçları, ⚠ tuzaklar ve kendini dene soruları. '
            'Üreme konusu ekstra örnekle anlatıldı. Sonda 15 soruluk mini deneme ve cevap anahtarı var.</p>'
            f'<div class="yaz">6. Sınıf Fen Bilimleri · Ders Rotası 6 · {YAZAR}</div></div>'
            '<div class="mavi"><h3>Soru haritası: Denemede hangi konudan kaç soru var?</h3>' + harita + '</div>'
            + kutu("vurucu", "Nasıl çalışmalısın?", "Önce <b>gezegenler</b> ve <b>sürat-hız</b> bölümlerine bak; denemenin yarısı bu ikisinden. "
                   "Her bölümün sonundaki <b>Kendini dene</b> sorularını kâğıda cevaplamadan geçme. Cevaplar en sonda."))

def gezegenler():
    return (bolum("mavi", "FB.6.1.1", "Gezegenleri niteliklerine göre sınıflandırma", "Denemede 4 soru")
            + '<div class="mavi">'
            + "<p>Güneş sisteminde <b>8 gezegen</b> var. Hepsi Güneş'in etrafında kendi yörüngesinde dolanır. Gezegenleri sınıflandırırken 5 özelliğe bakarız: "
              "<b>Güneş'e yakınlık, yapı (karasal / gazsal), büyüklük, halka, uydu.</b></p>"
            + gezegen_svg()
            + '<div class="iki"><div class="k"><h4>Karasal (iç) gezegenler: Merkür, Venüs, Dünya, Mars</h4>'
            + ul("Güneş'e <b>yakın</b>, asteroit kuşağının <b>içinde</b>.", "Kayalık, <b>katı yüzeyli</b>; üstüne basılabilir.",
                 "<b>Küçük</b>; hiçbirinin <b>halkası yok</b>.", "Uydu: Merkür 0, Venüs 0, Dünya 1, Mars 2.")
            + '</div><div class="k"><h4>Gazsal (dış) gezegenler: Jüpiter, Satürn, Uranüs, Neptün</h4>'
            + ul("Güneş'e <b>uzak</b>, asteroit kuşağının <b>dışında</b>.", "Çoğunlukla <b>gaz</b>; katı yüzeyi yok.",
                 "<b>Çok büyük</b>; <b>hepsinin halkası</b> ve <b>çok sayıda uydusu</b> var.", "En büyük Jüpiter, en belirgin halka Satürn.")
            + '</div></div>'
            + tablo(["Gezegen", "Yapı", "Halka", "Uydu", "Hap bilgi"], [
                ["Merkür", "Karasal", "Yok", "Yok", "Güneş'e <b>en yakın</b>, <b>en küçük</b>, yılı en kısa (88 gün)"],
                ["Venüs", "Karasal", "Yok", "Yok", "<b>En sıcak</b> (kalın atmosfer ısıyı hapseder), en parlak gezegen"],
                ["Dünya", "Karasal", "Yok", "1", "Üzerinde <b>yaşam</b> ve sıvı su bilinen tek gezegen"],
                ["Mars", "Karasal", "Yok", "2", "<b>Kızıl gezegen</b> (demir oksit tozu)"],
                ["Jüpiter", "Gazsal", "Var", "Çok", "<b>En büyük</b> gezegen, Büyük Kırmızı Leke fırtınası"],
                ["Satürn", "Gazsal", "Var", "Çok", "Halkaları en <b>gösterişli</b> olan"],
                ["Uranüs", "Gazsal", "Var", "Çok", "Yan yatmış gibi döner, mavi-yeşil"],
                ["Neptün", "Gazsal", "Var", "Çok", "Güneş'e <b>en uzak</b>, <b>en soğuk</b>, yılı en uzun"]])
            + '<div class="ezber">Sıra tekerlemesi: “Minik Veli Dün Mavi Jiple Su Ulaştırdı Nineye.”<br>'
              'Merkür · Venüs · Dünya · Mars ‖ asteroit kuşağı ‖ Jüpiter · Satürn · Uranüs · Neptün</div>'
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipuçları", ul(
                "<b>Asteroit kuşağı</b> = sınır çizgisi. Önü karasal, arkası gazsal.",
                "<b>Halkası olan</b> soruluyorsa cevap hep <b>gazsal 4'lü</b>.",
                "<b>Uydusu olmayan</b> sadece <b>2</b> gezegen: Merkür ve Venüs. “M-V uydusuz” diye ezberle.",
                "Güneş'ten uzaklaştıkça <b>yıl (dolanma süresi) uzar</b>: iç kulvardaki koşucu turu çabuk bitirir."))
            + kutu("tuzak", "Tuzaklar", ul(
                "“Güneş'e en yakın gezegen en sıcaktır.” <b>Yanlış!</b> En sıcak <b>Venüs</b>.",
                "“Gazsal gezegene uzay aracı inebilir.” <b>Yanlış!</b> Katı yüzeyi yok.",
                "“Büyük gezegen = Güneş'e yakın.” <b>Yanlış!</b> En büyükler dış gezegenler.",
                "Güneş bir <b>yıldızdır</b>, gezegen değildir. Ay bir <b>uydudur</b>."))
            + '</div>'
            + kutu("ornek", "Örnekle sınıflandır", "Soru: “Katı yüzeyli, halkasız ve 2 uydusu olan gezegen?” → Karasal + 2 uydu = <b>Mars</b>. "
                   "Soru: “Halkası var, Güneş'e en uzak?” → <b>Neptün</b>. Soru: “Uydusu yok ama Merkür değil?” → <b>Venüs</b>.")
            + kutu("dene", "Kendini dene", "<b>A)</b> Jüpiter, Satürn, Uranüs, Neptün hangi ortak özelliğe göre gruplanmıştır? (2 özellik yaz) "
                   "<b>B)</b> “Hem uydusu hem de katı yüzeyi olan gezegenler” grubuna hangileri girer?")
            + '</div>')

def tutulmalar():
    return (bolum("mor", "FB.6.1.3", "Güneş ve Ay tutulması ile ilgili bilimsel çıkarım", "Denemede 2 soru")
            + '<div class="mor">'
            + "<p>Işık <b>düz bir çizgi</b> boyunca yayılır; önüne ışık geçirmeyen bir cisim girerse arkasında <b>gölge</b> oluşur. "
              "<b>Tutulma</b>, bir gök cisminin gölgesinin diğerinin üzerine düşmesidir. Ay ve Dünya ışık kaynağı değildir, Güneş'in ışığını yansıtır.</p>"
            + tutulma_svg().replace('width="100%"','style="width:150mm"')
            + '<div class="ezber">ORTADAKİ GÖLGE YAPAR: Ortada Ay varsa Güneş tutulur, ortada Dünya varsa Ay tutulur.</div>'
            + tablo(["Özellik", "Güneş tutulması", "Ay tutulması"], [
                ["Sıralama", "Güneş – <b>Ay</b> – Dünya", "Güneş – <b>Dünya</b> – Ay"],
                ["Kimin gölgesi kime?", "Ay'ın gölgesi → Dünya'ya", "Dünya'nın gölgesi → Ay'a"],
                ["Ay'ın evresi", "<b>Yeni ay</b>", "<b>Dolunay</b>"],
                ["Ne zaman?", "Gündüz", "Gece"],
                ["Nereden görülür?", "Dünya'nın <b>dar</b> bir bölgesinden", "Gece yaşanan <b>her yerden</b>"],
                ["Süre", "Tam evresi birkaç dakika", "Saatlerce sürebilir"],
                ["Nasıl izlenir?", "<b>Sadece</b> özel tutulma gözlüğüyle", "Çıplak gözle güvenle"]])
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipuçları", ul(
                "Güneş tutulması <b>Yeni ay</b>da, Ay tutulması <b>Dolunay</b>da → “<b>G-Y, A-D</b>” (Güneş-Yeni, Ay-Dolunay).",
                "Güneş tutulması dar alandan görülür çünkü <b>Ay'ın gölgesi küçük</b>; Dünya'nın gölgesi Ay'ı tamamen kaplar.",
                "Tam Ay tutulmasında Ay kaybolmaz, <b>kızıl (bakır) renk</b> alır: “Kanlı Ay”.",
                "Üçü <b>aynı doğrultuya</b> gelmeden tutulma olmaz."))
            + kutu("tuzak", "Tuzaklar", ul(
                "“Her yeni ayda Güneş tutulması olur.” <b>Yanlış!</b> Ay'ın yörüngesi <b>eğik</b>; çoğu ay gölge ıskalanır.",
                "“Güneş gözlüğüyle tutulmaya bakılabilir.” <b>Asla!</b> Gözde kalıcı hasar olur.",
                "“Ay tutulmasında Ay'ın gölgesi Dünya'ya düşer.” <b>Ters!</b> Dünya'nın gölgesi Ay'a düşer.",
                "Ay'ın evreleri tutulma <b>değildir</b>; evreler her ay olur, Dünya'nın gölgesiyle ilgisi yoktur."))
            + '</div>'
            + kutu("ornek", "Bilimsel çıkarım örneği", "Bir öğrenci “Bu gece tam Ay tutulması var, bu yüzden Ay hilal şeklinde görünecek.” diyor. "
                   "Çıkarım yanlış: Ay tutulması yalnızca <b>dolunay</b>da olur. Yine Türkiye'den 29 Mart 2006'da Side'de tam <b>Güneş</b> tutulması gözlendi; o gün Ay <b>yeni ay</b> evresindeydi.")
            + kutu("dene", "Kendini dene", "<b>A)</b> Gündüz gerçekleşen ve Dünya'nın her yerinden görülemeyen tutulma hangisidir? Sıralamasını yaz. "
                   "<b>B)</b> Ay tutulması neden her dolunayda gerçekleşmez?")
            + '</div>')

def kuvvet():
    return (bolum("yesil", "FB.6.2.1.1", "Kuvvetin yönü, doğrultusu ve büyüklüğü", "1 soru")
            + '<div class="yesil">'
            + "<p><b>Kuvvet</b> = itme ya da çekme. <b>Dinamometre</b> ile ölçülür, birimi <b>Newton (N)</b>. Kuvvet bir <b>ok</b> ile gösterilir ve okun 4 bilgisi vardır:</p>"
            + kuvvet_svg().replace('width="100%"','style="width:150mm"')
            + tablo(["Günlük durum", "Doğrultu", "Yön"], [
                ["Çantayı yerden kaldırmak", "Düşey", "Yukarı"], ["Elmanın daldan düşmesi", "Düşey", "Aşağı"],
                ["Çekmeceyi açmak / kapatmak", "Yatay", "Kendine doğru / dolaba doğru"],
                ["Akşehir'den Konya'ya giden otobüs", "Doğu-batı", "Doğuya"], ["Asansörün inip çıkması", "Düşey (hep aynı)", "Aşağı / yukarı (değişir)"]])
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipucu", "Cevap bir <b>çizgi adı</b>ysa (yatay, düşey, kuzey-güney, doğu-batı) → <b>doğrultu</b>. "
                   "Cevap bir <b>gidiş tarafı</b>ysa (sağa, sola, yukarı, aşağı, doğuya) → <b>yön</b>. Her doğrultuda <b>2 zıt yön</b> vardır.")
            + kutu("tuzak", "Tuzak", "“Sağa ve sola itilen iki kuvvet farklı doğrultudadır.” <b>Yanlış!</b> İkisi de <b>yatay doğrultuda</b>, yönleri zıt. "
                   "Okta <b>uzun ok = büyük kuvvet</b>: 1 kare 10 N ise 3 karelik ok 30 N'dur.")
            + '</div></div>'
            + bolum("yesil", "FB.6.2.1", "Aynı doğrultudaki kuvvetler ve bileşke kuvvet", "1 soru")
            + '<div class="yesil">'
            + "<p>Bir cisme etki eden kuvvetlerin <b>hepsinin yaptığı etkiyi tek başına yapan</b> kuvvete <b>bileşke kuvvet (R)</b> denir.</p>"
            + bileske_svg()
            + kutu("ornek", "Örneklerle", ul(
                "Sırayı sen 20 N, arkadaşın 30 N ile <b>aynı yönde</b> itiyor: R = 20 + 30 = <b>50 N</b>, itme yönünde.",
                "Halat çekme: sol takım 40 N, sağ takım 25 N: R = 40 − 25 = <b>15 N, sola</b>. Halat sola kayar.",
                "Üç kuvvet: sağa 10 N ve 20 N, sola 12 N → önce aynı yönlüleri topla (30 N sağa), sonra çıkar: R = <b>18 N sağa</b>.",
                "Rüzgâr arkadan eserse bisiklette bileşke <b>büyür</b>, karşıdan eserse <b>küçülür</b>."))
            + '</div>')

def denge_surat():
    return (bolum("turuncu", "FB.6.2.2", "Dengelenmiş ve dengelenmemiş kuvvetler · deney", "Denemede 2 soru")
            + '<div class="turuncu">'
            + tablo(["Cismin durumu", "Dengelenmiş (R = 0)", "Dengelenmemiş (R ≠ 0)"], [
                ["Duruyorsa", "<b>Durmaya devam eder</b>", "<b>Harekete başlar</b>"],
                ["Hareket ediyorsa", "<b>Aynı süratle, aynı yönde</b> gitmeye devam eder", "<b>Hızlanır, yavaşlar, durur ya da yön değiştirir</b>"]])
            + '<div class="iki"><div class="k"><h4>Dengelenmiş örnekler</h4>'
            + ul("Masada duran kitap (ağırlık ↓, masa ↑)", "Tavandan asılı avize", "Eşit çekilen, kıpırdamayan halat", "Sabit süratle inen paraşütçü", "Düz yolda sabit süratle giden araba")
            + '</div><div class="k"><h4>Dengelenmemiş örnekler</h4>'
            + ul("Kaleye vurulan şut", "Fren yapan araba", "Yokuş aşağı hızlanan kaykay", "Topu tutup durduran kaleci", "Duraktan kalkan otobüs, virajı dönen araba")
            + '</div></div>'
            + kutu("ornek", "Deney nasıl kurulur? (Sınavın sevdiği soru tipi)",
                   "<b>Hipotez:</b> “Duran oyuncak arabaya zıt yönden eşit kuvvet uygulanırsa araba hareket etmez.” "
                   "<b>Bağımsız değişken</b> (değiştirdiğim): kuvvetlerin büyüklüğü. <b>Bağımlı değişken</b> (gözlediğim): arabanın hareket edip etmemesi. "
                   "<b>Kontrol edilen</b> (sabit): araba, zemin, ip. <b>Malzeme:</b> oyuncak araba, 2 dinamometre, ip. "
                   "Sonuç: 5 N – 5 N → hareket yok; 8 N – 5 N → araba 8 N tarafına gider.")
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipuçları", ul("<b>Hız ya da yön değişiyorsa</b> kuvvetler kesin <b>dengelenmemiş</b>.",
                   "“Sabit süratle düz gidiyor” görürsen → <b>dengelenmiş</b>.",
                   "Dengeleyici kuvvet = bileşkeyle <b>aynı büyüklük</b>, <b>zıt yön</b>. R = 15 N sola ise dengeleyici 15 N sağa."))
            + kutu("tuzak", "Tuzaklar", ul("“Duran cisme hiç kuvvet etki etmez.” <b>Yanlış!</b> Kuvvetler var ama dengelenmiş.",
                   "“Kuvvetler dengelenince hareketli cisim hemen durur.” <b>Yanlış!</b> Sabit süratle yoluna devam eder."))
            + '</div></div>'
            + bolum("turuncu", "FB.6.2.3", "Sürat ve hız kavramlarını karşılaştırma", "Denemede 3 soru")
            + '<div class="turuncu">'
            + '<div class="iki"><div class="k"><h4>SÜRAT</h4>' + ul("Birim zamanda <b>alınan yol</b>.", "<b>Yönü yoktur</b>.", "“Otobüs saatte 90 km yol alıyor: sürati 90 km/h.”") + '</div>'
            + '<div class="k"><h4>HIZ</h4>' + ul("Birim zamanda yapılan <b>yer değiştirme</b>.", "<b>Yönü vardır</b>.", "“Uçak 800 km/h ile <b>doğuya</b> uçuyor.”") + '</div></div>'
            + tablo(["", "Sürat", "Hız"], [["Neyi kullanır?", "Alınan yol", "Yer değiştirme (başlangıç-bitiş arası en kısa uzaklık)"],
                                          ["Yön", "Yok", "Var"], ["Birim", "km/h, m/s", "km/h, m/s (aynı!)"],
                                          ["Pistte tam tur atan koşucu", "Sıfırdan farklı", "<b>Sıfır</b> (başladığı yere döndü)"],
                                          ["Ortak yönleri", "Hareketin ne kadar çabuk olduğunu anlatır", "Zamanla ilgili, aynı birimler"]])
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipuçları", ul("Cümlede <b>yön</b> (doğuya, kuzeye, yukarı) varsa <b>hız</b>, yoksa <b>sürat</b>.",
                   "<b>5 m/s</b> = “her saniyede 5 metre”. 80 km/h = “her saatte 80 km”.",
                   "Her <b>sabit hızlı</b> hareket sabit süratlidir; ama her sabit süratli hareket sabit hızlı <b>değildir</b>.",
                   "Dönme dolap, döner kavşak, virajda aynı göstergeyle giden araba: <b>sürat sabit, hız değişiyor</b> (yön değişti)."))
            + kutu("tuzak", "Tuzaklar", ul("“Arabanın hız göstergesi hızı gösterir.” Aslında <b>sürati</b> gösterir; yön göstermez.",
                   "Yol kenarındaki “50” tabelası bir <b>sürat</b> sınırıdır.",
                   "Birimleri farklı diye ayırma! Sürat ve hızın <b>birimleri aynıdır</b>; fark <b>yön</b>dedir."))
            + '</div>'
            + kutu("dene", "Kendini dene", "Hangisi hız bildirir? <b>A)</b> Çita 100 km/h koşar. <b>B)</b> Rüzgâr 30 km/h ile kuzeye esiyor. "
                   "<b>C)</b> Döner kavşakta 40 km/h ile dönen otobüsün sürati değişir mi, hızı değişir mi?")
            + '</div>')

def ureme():
    return (bolum("pembe", "FB.6.3.1", "Eşeyli ve eşeysiz üremeyi karşılaştırma", "ÖZEL BÖLÜM · bol örnek")
            + '<div class="pembe">'
            + "<p>Her canlı bir gün ölür. Türünün yok olmaması için kendine benzer yeni bireyler oluşturur: buna <b>üreme</b> denir. "
              "Üremenin amacı <b>neslin devamı</b>dır. Canlılar iki yolla ürer:</p>"
            + '<div class="iki"><div class="k"><h4>EŞEYLİ ÜREME = “Karışım”</h4>'
            + ul("<b>İki ata</b> gerekir: dişi ve erkek.", "Dişi üreme hücresi (<b>yumurta</b>) + erkek üreme hücresi (<b>sperm</b> / çiçek tozu) birleşir: <b>döllenme</b>.",
                 "Yavru anneye ve babaya <b>benzer</b> ama ikisinin de <b>aynısı değildir</b>.", "<b>Çeşitlilik</b> vardır: kardeşler bile birbirinden farklıdır.",
                 "<b>Daha yavaş</b>, daha az yavru.")
            + '<p class="hand" style="color:#c2417a">İki boyayı karıştır: ikisine de benzeyen yeni bir renk çıkar.</p></div>'
            + '<div class="k"><h4>EŞEYSİZ ÜREME = “Fotokopi”</h4>'
            + ul("<b>Tek ata</b> yeter.", "Üreme hücresi <b>yok</b>, döllenme <b>yok</b>.", "Yavru atasının <b>tıpatıp aynısı</b>dır (kalıtsal olarak aynı).",
                 "Çeşitlilik <b>yok</b>.", "<b>Hızlı</b>: kısa sürede çok sayıda birey.")
            + '<p class="hand" style="color:#c2417a">Fotokopi makinesi: hep aynı sayfa çıkar.</p></div></div>'
            + tablo(["Karşılaştır", "Eşeyli üreme", "Eşeysiz üreme"], [
                ["Ata sayısı", "İki (dişi + erkek)", "Bir"], ["Üreme hücresi", "Var (yumurta, sperm)", "Yok"],
                ["Döllenme", "<span class='e'>Var</span>", "<span class='h'>Yok</span>"], ["Yavru", "Atalarına benzer, aynısı değil", "Atasının aynısı"],
                ["Kalıtsal çeşitlilik", "<span class='e'>Var</span>", "<span class='h'>Yok</span>"], ["Hız / yavru sayısı", "Yavaş, az", "Hızlı, çok"],
                ["Değişen ortama uyum", "Daha kolay (çeşitlilik sayesinde)", "Zor (hepsi aynı; bir hastalık hepsini etkileyebilir)"],
                ["Örnek", "İnsan, kedi, tavuk, balık, kurbağa, elma ağacı (tohumla)", "Amip, bakteri, bira mayası, hidra, patates, deniz yıldızı"]])
            + '<h3>Eşeysiz üremenin 4 yolu</h3>' + eseysiz_svg()
            + tablo(["Çeşit", "Nasıl olur?", "Örnekler", "Akılda kalsın"], [
                ["<b>Bölünme</b>", "<b>Tek hücreli</b> canlı ikiye bölünür; iki yeni canlı oluşur, ata ortadan kalkar.", "Amip, bakteri, öglena, terliksi hayvan", "Pizzayı ikiye kes: iki yarım değil, iki tam canlı!"],
                ["<b>Tomurcuklanma</b>", "Vücutta bir çıkıntı (tomurcuk) oluşur, büyür; ayrılır ya da bağlı kalır.", "Bira mayası, hidra, sünger", "Hamurun yanından minik hamur topu fışkırır."],
                ["<b>Vejetatif üreme</b>", "Bitkinin <b>gövde, kök veya yaprak</b> parçasından yeni bitki oluşur. <b>Sadece bitkilerde.</b>", "Patates (yumru gövde), çilek (sürünücü gövde), sardunya, söğüt (çelik), menekşe (yaprak), soğan, sarımsak", "Yaprağı suya koy, kök salsın: yeni bitki!"],
                ["<b>Rejenerasyon</b>", "Canlıdan kopan parça eksiklerini tamamlar ve <b>yeni bir birey</b> olur.", "Deniz yıldızı, planarya (yassı solucan)", "1 deniz yıldızı → 2 deniz yıldızı"]])
            + '<h3>Üreme dedektifi: 16 örnek, tek bakışta</h3>'
            + tablo(["Olay", "Tür", "Neden?"], [
                ["Kedinin 4 yavru doğurması", "Eşeyli", "Dişi + erkek, döllenme var"],
                ["Tavuğun döllenmiş yumurtasından civciv çıkması", "Eşeyli", "Yumurtlayarak ama döllenme var"],
                ["Balıkların suya yumurta ve sperm bırakması", "Eşeyli", "Döllenme suda (vücut dışında) olur"],
                ["Elma çekirdeğini toprağa ekip ağaç yetiştirmek", "Eşeyli", "Tohum = döllenmenin ürünü"],
                ["Arının çiçek tozunu taşıması sonrası kiraz oluşması", "Eşeyli", "Tozlaşma + döllenme"],
                ["Amibin ikiye ayrılması", "Eşeysiz", "Bölünme"],
                ["Bakterinin 20 dakikada bir çoğalması", "Eşeysiz", "Bölünme, çok hızlı"],
                ["Hamurdaki bira mayasının çoğalıp hamuru kabartması", "Eşeysiz", "Tomurcuklanma"],
                ["Hidranın yanında küçük hidra oluşması", "Eşeysiz", "Tomurcuklanma"],
                ["Filizlenmiş patatesi ekip yeni patates bitkisi elde etmek", "Eşeysiz", "Vejetatif (gövde)"],
                ["Çileğin yere değen uzantısından yeni çilek fidesi çıkması", "Eşeysiz", "Vejetatif (sürünücü gövde)"],
                ["Söğüt dalını toprağa dikince ağaç olması", "Eşeysiz", "Vejetatif (çelikle)"],
                ["Menekşe yaprağını suya koyunca kök vermesi", "Eşeysiz", "Vejetatif (yaprak)"],
                ["Kopan koldan yeni deniz yıldızı oluşması", "Eşeysiz", "Rejenerasyon"],
                ["Kertenkelenin kopan kuyruğunu yeniden çıkarması", "<span class='h'>Üreme değil!</span>", "Yeni birey yok, sadece onarım"],
                ["Kesilen parmaktaki yaranın iyileşmesi", "<span class='h'>Üreme değil!</span>", "Onarım, birey sayısı artmadı"]])
            + '<div class="ezber">ALTIN SORU: “Birey sayısı arttı mı?” Hayır → üreme değil. Evet → “Döllenme var mı?” Var → eşeyli · Yok → eşeysiz.</div>'
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipuçları", ul(
                "<b>Tohum</b> görürsen → <b>eşeyli</b> (tohum döllenmeyle oluşur). <b>Gövde/kök/yaprak parçası</b> görürsen → <b>vejetatif, eşeysiz</b>.",
                "<b>Tek hücreli</b> + ikiye ayrılma → <b>bölünme</b>.",
                "<b>Çıkıntı</b> kelimesi → <b>tomurcuklanma</b>. <b>Kopan parça yeni birey</b> → <b>rejenerasyon</b>.",
                "“Yavrular <b>birbirinin ve atasının aynısı</b>” diyorsa → eşeysiz. “<b>Farklı özellikte</b> yavrular” diyorsa → eşeyli.",
                "Çiftçi lezzetli ağacın <b>aynısını</b> isterse tohum değil <b>çelik / aşı</b> kullanır (eşeysiz = kopya)."))
            + kutu("tuzak", "Tuzaklar", ul(
                "<b>Kertenkele kuyruğu</b> = rejenerasyon ile <b>onarım</b>, üreme değil. <b>Deniz yıldızı</b> = rejenerasyonla <b>üreme</b>.",
                "“Yumurtlayan canlı eşeysiz ürer.” <b>Yanlış!</b> Tavuk, balık, kurbağa <b>eşeyli</b> ürer; yumurtlamak eşeysiz demek değildir.",
                "“Bitkiler sadece eşeysiz ürer.” <b>Yanlış!</b> Çiçekli bitkiler tohumla <b>eşeyli</b> ürer; bazıları ayrıca vejetatif ürer.",
                "“Bölünmede ata yaşamaya devam eder.” <b>Hayır</b>, ata ikiye ayrılarak iki yeni bireye dönüşür.",
                "Hem eşeyli hem eşeysiz üreyebilen canlılar var: <b>çilek, patates</b> (tohum + vejetatif), <b>hidra</b>."))
            + '</div>'
            + kutu("ornek", "Bonus: Hayvanlarda eşeyli üreme nasıl görünür?",
                   "<b>Doğuranlar:</b> yavru anne karnında gelişir, doğar, sütle beslenir (insan, kedi, inek, yarasa, yunus, balina). "
                   "<b>Yumurtlayanlar:</b> yavru yumurtanın içinde gelişir, besinini yumurtadan alır (tavuk, kaplumbağa, yılan, balık, kurbağa, arı). "
                   "İkisi de <b>eşeyli</b>dir. Yunus ve balina denizde yaşar ama <b>balık değil</b>, doğurur.")
            + kutu("dene", "Kendini dene", "<b>A)</b> Bir çiftçi en lezzetli elma ağacının <b>aynısını</b> elde etmek istiyor. Tohum mu ekmeli, çelik/aşı mı kullanmalı? Neden? "
                   "<b>B)</b> “Eşeysiz üreyen canlı türleri ortam değişikliklerinden daha çok etkilenebilir.” Bu yargıyı bir cümleyle açıkla. "
                   "<b>C)</b> Kertenkele ile deniz yıldızının yenilenmesi arasındaki fark nedir?")
            + '</div>')

def bitki():
    return (bolum("yesil", "FB.6.3.2", "Bitkilerde üreme, büyüme ve gelişme", "ÖZEL BÖLÜM · bol örnek")
            + '<div class="yesil">'
            + '<div class="iki"><div class="k"><h4>Çiçekli (tohumlu) bitkiler</h4>' + ul("Çiçek, meyve, <b>tohum</b> oluşturur; tohumla çoğalır.", "Elma, kiraz, ayçiçeği, buğday, gül, fasulye.", "<b>Çam</b>: gösterişli çiçeği yok ama <b>kozalağı</b> çiçek görevi yapar, tohum oluşturur → tohumlu.") + '</div>'
            + '<div class="k"><h4>Çiçeksiz (tohumsuz) bitkiler</h4>' + ul("Çiçek ve tohum <b>yok</b>; <b>sporla</b> çoğalır.", "Eğrelti otu, kara yosunu, at kuyruğu.", "Eğrelti otunun yaprak altındaki kahverengi noktalar spor keseleridir.") + '</div></div>'
            + "<h3>Çiçek = çiçekli bitkinin üreme organı</h3>" + cicek_svg()
            + '<h3>Çiçek tozundan meyveye: 5 adım</h3>'
            + tablo(["Adım", "Ne olur?"], [
                ["1. Çiçek tozu oluşur", "Erkek organın <b>başçığında</b> çiçek tozları üretilir."],
                ["2. Tozlaşma", "Çiçek tozu <b>başçıktan tepeciğe</b> taşınır. Taşıyıcılar: <b>rüzgâr, su, böcek (arı), kuş, insan</b>."],
                ["3. İlerleme", "Çiçek tozu <b>dişicik borusundan</b> aşağı, <b>yumurtalığa</b> iner."],
                ["4. Döllenme", "Çiçek tozundaki erkek üreme hücresi <b>yumurta hücresi</b> ile birleşir."],
                ["5. Tohum ve meyve", "Döllenmiş yumurta → <b>tohum</b>; yumurtalık → <b>meyve</b>; taç ve çanak yapraklar genelde <b>kuruyup dökülür</b>."]])
            + '<div class="ezber">TOZLAŞMA ≠ DÖLLENME · Tozlaşma = taşınma (yolculuk) · Döllenme = birleşme (buluşma). Önce tozlaşma, sonra döllenme!</div>'
            + '<div class="iki"><div>'
            + '<h3>Tohum ve çimlenme</h3>'
            + ul("<b>Tohum</b>: içinde bitki taslağı (<b>embriyo</b>) ve <b>besin deposu</b> var, dışında koruyucu <b>kabuk</b>. Çekirdek çöp değil, yeni bitkinin başlangıcı!",
                 "<b>Çimlenme</b>: tohumun uygun koşulda gelişip fide oluşturması.",
                 "Çimlenme için <b>su (nem), uygun sıcaklık, oksijen</b> gerekir. <b>Işık gerekmez!</b> (Tohum toprağın altında, karanlıkta çimlenir.)",
                 "Sıra: su alır, şişer → kabuk çatlar → <b>önce kökçük</b> → sonra gövdecik → ilk yapraklar.")
            + '</div><div><h3>Büyüme ve gelişme</h3>'
            + ul("<b>Büyüme</b>: boy ve kütlenin artması (fidenin boyunun 2 cm'den 10 cm'ye çıkması).",
                 "<b>Gelişme</b>: yapı ve görevlerin olgunlaşması (fidenin çiçek açması, meyve vermesi).",
                 "Bitki büyümesi için: <b>su, ışık, uygun sıcaklık, mineraller (toprak), hava</b>.",
                 "Çimlendikten sonra fidenin büyümesi için <b>ışık şarttır</b>; besinini artık kendisi üretir.")
            + '</div></div>'
            + tablo(["Faktör eksikse…", "Bitkide ne görürüz?"], [
                ["Su", "Yapraklar pörsür, bitki solar, kurur."], ["Işık", "Yapraklar <b>sararır</b>, gövde <b>uzun ve cılız</b> olur (ışığa uzanır)."],
                ["Uygun sıcaklık", "Soğukta <b>don</b>, aşırı sıcakta kavrulma."], ["Mineraller", "Bitki küçük kalır, yaprakları solgun olur."]])
            + kutu("ornek", "Deney örneği (değişkenleri bul)",
                   "Ayşe iki kaba nemli pamuk ve 5'er fasulye koyuyor. Birini <b>sıcak odaya</b>, diğerini <b>buzdolabına</b> koyuyor. "
                   "<b>Bağımsız değişken:</b> sıcaklık. <b>Bağımlı değişken:</b> çimlenme olup olmadığı. "
                   "<b>Kontrol edilen:</b> tohum türü ve sayısı, su miktarı, kap, süre. Sonuç: buzdolabındakiler çimlenmez → çimlenme için <b>uygun sıcaklık</b> gerekir. "
                   "<b>Kural:</b> Adil deneyde aynı anda yalnızca <b>bir</b> şey değiştirilir.")
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu ipuçları", ul(
                "<b>Yumurtalık → meyve</b>, <b>yumurta hücresi → tohum</b>. “Y-M, Y-T” diye ezberle.",
                "Arılar azalırsa <b>tozlaşma azalır</b> → meyve ve sebze üretimi düşer.",
                "Soruda “karanlık dolapta çimlendi” görürsen şaşırma: çimlenme için ışık gerekmez.",
                "Akşehir kirazı ünlüdür çünkü bölgede <b>uygun sıcaklık, ışık ve verimli toprak</b> var. Serada bu faktörleri insan kontrol eder."))
            + kutu("tuzak", "Tuzaklar", ul(
                "“Tozlaşma ile döllenme aynı şeydir.” <b>Yanlış!</b>",
                "“Meyve, çiçeğin taç yaprağından oluşur.” <b>Yanlış!</b> <b>Yumurtalıktan</b> oluşur.",
                "“Tohum çimlenmek için güneş ışığına ihtiyaç duyar.” <b>Yanlış!</b>",
                "“Çam çiçeksiz bitkidir.” <b>Yanlış!</b> Kozalakla tohum oluşturur."))
            + '</div>'
            + kutu("dene", "Kendini dene", "<b>A)</b> Kiraz ağacında çiçek tozunun tepeciğe taşınmasına ne denir? Ardından hangi olay gelir? "
                   "<b>B)</b> Karanlık dolaptaki tohumlar çimlendi ama fideler sarı ve cılız oldu. İki olayı açıkla. "
                   "<b>C)</b> Çiçeğin hangi kısmı meyveye, hangisi tohuma dönüşür?")
            + '</div>')

SORULAR = [
    ("Halkası olmayan ve Güneş'e en yakın gezegen hangisidir?", ["Venüs", "Merkür", "Mars", "Dünya"], 1),
    ("Hangi gezegen grubu “Hepsinin halkası ve uydusu vardır.” ifadesine uyar?", ["Karasal gezegenler", "Asteroit kuşağının içindekiler", "Gazsal gezegenler", "Uydusu olmayanlar"], 2),
    ("Güneş sistemindeki en sıcak gezegen ve sebebi hangisidir?", ["Merkür, Güneş'e en yakın olduğu için", "Venüs, kalın atmosferi ısıyı hapsettiği için", "Mars, kızıl renkli olduğu için", "Jüpiter, en büyük olduğu için"], 1),
    ("Uydusu olmayan gezegenler hangileridir?", ["Merkür ve Venüs", "Mars ve Venüs", "Merkür ve Mars", "Uranüs ve Neptün"], 0),
    ("Ay tutulması ile ilgili hangisi doğrudur?", ["Sıralama Güneş – Ay – Dünya'dır.", "Ay yeni ay evresindedir.", "Dünya'nın gölgesi Ay'ın üzerine düşer.", "Yalnızca özel gözlükle izlenmelidir."], 2),
    ("Güneş tutulması neden her yeni ayda gerçekleşmez?", ["Ay kendi ışığını ürettiği için", "Ay'ın yörüngesi Dünya'nın yörüngesine göre eğik olduğu için", "Güneş her ay küçüldüğü için", "Dünya dönmediği için"], 1),
    ("Asansör önce yukarı, sonra aşağı gidiyor. Hareket için hangisi doğrudur?", ["Doğrultu ve yön değişmiştir.", "Doğrultu değişmiş, yön aynıdır.", "Doğrultu aynı (düşey), yön değişmiştir.", "İkisi de değişmemiştir."], 2),
    ("Bir cisme sağa 35 N, sola 20 N ve sağa 5 N kuvvet etki ediyor. Bileşke kuvvet nedir?", ["60 N sağa", "20 N sağa", "10 N sola", "20 N sola"], 1),
    ("Hangisinde kuvvetler dengelenmiştir?", ["Fren yapıp yavaşlayan otobüs", "Sabit süratle inen paraşütçü", "Kaleye vurulan top", "Virajı dönen bisiklet"], 1),
    ("Duran arabaya zıt yönden eşit kuvvet uygulanan deneyde bağımlı değişken hangisidir?", ["Kuvvetlerin büyüklüğü", "Arabanın hareket edip etmemesi", "Arabanın türü", "Zeminin cinsi"], 1),
    ("Hangisi bir hız ifadesidir?", ["Kaplumbağa 0,3 km/h ile yürür.", "Tren 120 km/h ile gidiyor.", "Gemi 40 km/h ile güneye ilerliyor.", "Sürat sınırı 50 km/h'tir."], 2),
    ("Döner kavşakta göstergesi hep 40 km/h gösteren otobüs için hangisi doğrudur?", ["Sürati ve hızı sabittir.", "Sürati sabit, hızı değişmektedir.", "Sürati değişir, hızı sabittir.", "İkisi de değişir."], 1),
    ("Hangisi eşeysiz üremenin özelliği değildir?", ["Tek ata yeterlidir.", "Yavrular atanın aynısıdır.", "Döllenme gerçekleşir.", "Kısa sürede çok birey oluşur."], 2),
    ("Eşleştirmelerden hangisi yanlıştır?", ["Amip – bölünme", "Bira mayası – tomurcuklanma", "Patates – vejetatif üreme", "Kertenkele kuyruğu – rejenerasyonla üreme"], 3),
    ("Çiçekte döllenmeden sonra yumurtalık neye dönüşür?", ["Tohum", "Meyve", "Taç yaprak", "Çiçek tozu"], 1),
]

DY = [
    ("Eşeysiz üremede yavrular atasının kalıtsal olarak aynısıdır.", "D"),
    ("Tavuk yumurtladığı için eşeysiz ürer.", "Y"),
    ("Bira mayası tomurcuklanarak ürer.", "D"),
    ("Kertenkelenin kopan kuyruğunu yenilemesi rejenerasyonla üremedir.", "Y"),
    ("Patatesin gözlerinden yeni bitki oluşması vejetatif üremedir.", "D"),
    ("Bölünmeyle üreyen amipte ata canlı, yavrusundan ayrı yaşamaya devam eder.", "Y"),
    ("Eşeyli üremede kalıtsal çeşitlilik vardır.", "D"),
    ("Tozlaşma, çiçek tozunun başçıktan tepeciğe taşınmasıdır.", "D"),
    ("Döllenmeden sonra yumurtalık tohuma dönüşür.", "Y"),
    ("Tohumların çimlenmesi için ışık şarttır.", "Y"),
    ("Eğrelti otu sporla çoğalır.", "D"),
    ("Çilek hem tohumla hem de sürünücü gövdesiyle çoğalabilir.", "D"),
]

def dy_tur():
    return ('<h3>Üreme hızlı tur: Doğru mu, yanlış mı? (D / Y)</h3>'
            + tablo(["#", "İfade", "D / Y"], [[str(i + 1), q, "☐ D &nbsp; ☐ Y"] for i, (q, _) in enumerate(DY)]))

def deneme():
    s = (bolum("turuncu", "MİNİ DENEME", "15 soruda kendini ölç", "Süre: 20 dakika")
         + '<div class="turuncu"><p>Soru sırası denemedeki kazanım sırasına benzer. Önce çöz, sonra cevap anahtarına bak. Yanlış yaptığın sorunun bölümüne geri dön.</p><div class="sorular">')
    for q, o, _ in SORULAR:
        tek = " tek" if max(len(x) for x in o) > 34 else ""
        s += f'<div class="soru"><b>{q}</b><div class="sec{tek}">' + "".join(f"<span>{'ABCD'[i]}) {x}</span>" for i, x in enumerate(o)) + "</div></div>"
    s += "</div>" + dy_tur() + "</div>"
    ac = ["Merkür en yakın, halkasız ve uydusuz.", "Halka + uydu = gazsal dörtlü.", "Kalın atmosfer sera etkisi yapar.", "“M-V uydusuz.”",
          "Ay tutulması: G–D–A, dolunay, Dünya'nın gölgesi Ay'a.", "Eğik yörünge yüzünden üçü her ay aynı hizaya gelmez.",
          "Düşey doğrultu sabit, yön yukarı → aşağı.", "Sağa 35+5=40, sola 20 → 40−20 = 20 N sağa.", "Sabit sürat + düz iniş = dengelenmiş.",
          "Gözlenen sonuç bağımlı değişkendir.", "Yön (güneye) olan tek seçenek.", "Sürat aynı, yön değişiyor → hız değişir.",
          "Döllenme eşeyli üremede olur.", "Kertenkele yalnızca onarır, yeni birey oluşmaz.", "Yumurtalık → meyve, yumurta hücresi → tohum."]
    s += '<h3>Cevap anahtarı</h3><div class="cevap">' + "".join(
        f"<p><b>{i + 1}-{'ABCD'[c]}</b> · {ac[i]}</p>" for i, (_, _, c) in enumerate(SORULAR)) + "</div>"
    s += '<p><b>Hızlı tur (D/Y):</b> ' + " · ".join(f"{i + 1}-{c}" for i, (_, c) in enumerate(DY)) + "</p>"
    s += ('<h3>Kendini dene cevapları</h3><div class="cevap">'
          "<p><b>Gezegenler A)</b> Gazsal yapı, halka, çok uydu, büyük olma (ikisi yeter). <b>B)</b> Dünya ve Mars.</p>"
          "<p><b>Tutulma A)</b> Güneş tutulması: Güneş – Ay – Dünya. <b>B)</b> Ay'ın yörüngesi eğik; Ay çoğu dolunayda Dünya'nın gölgesinin üstünden ya da altından geçer.</p>"
          "<p><b>Sürat-hız)</b> A sürat, B hız. C: Sürat değişmez, yön değiştiği için hız değişir.</p>"
          "<p><b>Üreme A)</b> Çelik/aşı (vejetatif üreme). Eşeysiz üreme atanın aynısını verir; tohumdan çıkan bitki iki atanın karışımı olur.</p>"
          "<p><b>Üreme B)</b> Eşeysiz üreyenlerde çeşitlilik yoktur; ortam değişince ya da hastalık gelince bireylerin hepsi aynı şekilde etkilenir.</p>"
          "<p><b>Üreme C)</b> Kertenkelede yeni birey oluşmaz (onarım); deniz yıldızında kopan koldan yeni birey oluşur (üreme).</p>"
          "<p><b>Bitki A)</b> Tozlaşma; ardından döllenme. <b>B)</b> Çimlenme için ışık gerekmez, su ve sıcaklık yeterli; fakat büyüme için ışık gerekir, ışıksız fide sararır ve cılız kalır. "
          "<b>C)</b> Yumurtalık → meyve, döllenmiş yumurta hücresi → tohum.</p></div>")
    s += kutu("vurucu", "Sınav sabahı son 5 hatırlatma", ul(
        "Asteroit kuşağı sınırdır: önü karasal, arkası gazsal.", "Ortadaki gölge yapar: ortada Ay → Güneş tutulur, ortada Dünya → Ay tutulur.",
        "Aynı yön topla, zıt yön çıkar, yön büyüğünki.", "Yön varsa hız, yoksa sürat.",
        "Birey sayısı arttı mı? Döllenme var mı? Bu iki soru üremeyi çözer."))
    return s

def govde():
    return (kapak() + gezegenler() + tutulmalar() + kuvvet() + denge_surat() + ureme() + bitki() + deneme()
)

def yaz(cikti, baslik, o=1.0):
    doc = (f'<!doctype html><html lang="tr" style="--o:{o}"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{baslik}</title>'
           f'<style>{CSS % {"f": FONT.as_uri()}}</style></head><body>{govde()}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "express.html"; h.write_text(doc, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer",
                        f"--print-to-pdf={cikti}", h.as_uri()], check=True, capture_output=True)
        return h.read_text(encoding="utf-8")

def bosluklar(pdf):
    """Her sayfanın altındaki boş alanın oranı (0-1)."""
    from PIL import Image
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(["pdftoppm", "-r", "24", "-png", str(pdf), f"{t}/b"], check=True)
        out = []
        for f in sorted(Path(t).glob("b-*.png")):
            im = Image.open(f).convert("L"); w, h = im.size; px = im.load(); son = 0; alt = int(h * .94)
            for y in range(alt):
                if any(px[x, y] < 235 for x in range(0, w, 2)): son = y
            out.append((alt - son) / h)
        return out

def en_iyi_olcek(ham):
    """Yazı ölçeğini dener; ara sayfalarda en büyük boşluğu en aza indiren ölçeği seçer."""
    en = None
    for o in [0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08]:
        yaz(ham, "deneme", o); b = bosluklar(ham)
        puan = max(b[:-1]) * 3 + b[-1]
        print(f"  ölçek {o}: {len(b)} sayfa, en büyük ara boşluk %{round(100 * max(b[:-1]))}, son sayfa %{round(100 * b[-1])}")
        if en is None or puan < en[0]: en = (puan, o)
    return en[1]

if __name__ == "__main__":
    if not CHROME: sys.exit("google-chrome bulunamadı")
    cikti = KOK / "pdf" / "fen-express.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    baslik = "Fen Bilimleri 6 · EXPRESS · Deneme Sınavına Hazırlık Ders Notu"
    o = en_iyi_olcek(ham); print(f"seçilen ölçek: {o}")
    yaz(ham, baslik, o)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": baslik, "/Author": YAZAR, "/Subject": "Ders Rotası 6 · Fen Bilimleri Express ders notu (deneme hazırlık)",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
