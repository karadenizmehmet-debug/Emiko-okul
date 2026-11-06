#!/usr/bin/env python3
"""Hap Notlar PDF üretici (kara tahta tasarımı) · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:
  python3 araclar/hap_pdf.py            # hap/*.json -> pdf/<ders>-hap.pdf (hepsi)
  python3 araclar/hap_pdf.py fen mat    # yalnızca seçilen dersler

Kural: bir A4 sayfaya en çok 2 tema sığar (sayfa başına 2 tema, tek sayfa tema başına yarım A4).
Yazı ölçeği her sayfada otomatik ayarlanır. Gereksinim: google-chrome ve pypdf.
Yazı tipleri araclar/fontlar altında (SIL OFL): Rubik Dirt, Patrick Hand, Kalam.
"""
import html, json, re, subprocess, sys, tempfile
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
FONT = KOK / "araclar" / "fontlar"
YAZAR = "Mehmet Karadeniz, 2026-2027"
TEMA_SAYFA = 2
CHROME = next((c for c in ("google-chrome", "chromium", "chromium-browser") if subprocess.run(["which", c], capture_output=True).returncode == 0), None)
TEBESIR = ["c1", "c2", "c3", "c4", "c5"]

ARAP = re.compile(r"([\u0600-\u06FF\u0750-\u077F]+(?:[ \u00A0\u200c]+[\u0600-\u06FF\u0750-\u077F]+)*)")


def ar_okunus(s):
    sozluk = {
        "هَذِهِ":"hezihi", "هَذَا":"heza", "مَنْ":"men", "مَا":"mâ",
        "أَبٌ":"ebun", "أَبِي":"ebî", "أُمٌّ":"ümmün", "أُمِّي":"ümmî",
        "أَخٌ":"ehun", "أَخِي":"ehî", "أُخْتٌ":"uhtün", "أُخْتِي":"uhtî",
        "جَدٌّ":"ceddün", "جَدِّي":"ceddî", "جَدَّةٌ":"ceddetün", "جَدَّتِي":"ceddetî",
        "عَمٌّ":"ammun", "عَمِّي":"ammî", "عَمَّةٌ":"ammetün", "عَمَّتِي":"ammetî",
        "خَالٌ":"hâlün", "خَالِي":"hâlî", "خَالَةٌ":"hâletün", "خَالَتِي":"hâletî",
        "أَقَارِبُ":"ekâribü", "أَقَارِبِي":"ekâribî", "أُسْرَةٌ":"üsretün",
        "عَائِلَةٌ":"âiletün", "قَرِيبٌ":"karîbün", "اِبْنٌ":"ibnün", "بِنْتٌ":"bintün",
        "حَفِيدٌ":"hafîdün", "مِهْنَةٌ":"mihnetün", "مِهَنٌ":"mihenün",
        "مُعَلِّمٌ":"muallimün", "مُعَلِّمَةٌ":"muallimetün", "طَبِيبٌ":"tabîbün",
        "طَبِيبَةٌ":"tabîbetün", "مُهَنْدِسٌ":"mühendisün", "مُهَنْدِسَةٌ":"mühendisetün",
        "شُرْطِيٌّ":"şurtiyyün", "شُرْطِيَّةٌ":"şurtiyyetün", "طَبَّاخٌ":"tabbahun",
        "نَجَّارٌ":"neccârun", "خَبَّازٌ":"hebbâzun", "خَيَّاطٌ":"hayyâtun",
        "فَلَّاحٌ":"fellâhun", "سَائِقٌ":"sâikun", "بَائِعٌ":"bâiun"
    }
    return " ".join(sozluk.get(w.strip(".,،؛؟:!؟"), w.strip(".,،؛؟:!؟")) for w in s.split())

def m(s, renkli=True):
    """HTML kaçışı + **kalın** -> renkli tebeşir vurgusu."""
    sayac = [0]
    def r(mo):
        c = TEBESIR[sayac[0] % 5]; sayac[0] += 1
        return f'<b class="{c}">{mo.group(1)}</b>'
    out = re.sub(r"\*\*(.+?)\*\*", r, html.escape(s, quote=False))
    return ARAP.sub(lambda mo: '<span class="ab">' + mo.group(1) + '</span> <span class="ar-pron">(' + ar_okunus(mo.group(1)) + ')</span>', out)

IKON = {
 "gunes": '<circle cx="22" cy="30" r="14" fill="#f7d95e"/><circle cx="32" cy="27" r="13" fill="#1d3a2c"/><circle cx="46" cy="14" r="2.2" fill="#f5f2e7"/><circle cx="12" cy="10" r="1.6" fill="#f5f2e7"/>',
 "kuvvet": '<rect x="8" y="26" width="20" height="16" rx="2" fill="none" stroke="#8ed1f2" stroke-width="3"/><path d="M30 34h22M45 26l9 8-9 8" fill="none" stroke="#f7d95e" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',
 "carpan": '<g fill="#8ed1f2"><rect x="6" y="10" width="11" height="11" rx="2"/><rect x="20" y="10" width="11" height="11" rx="2"/><rect x="34" y="10" width="11" height="11" rx="2"/></g><g fill="#f4a6c0"><rect x="6" y="24" width="11" height="11" rx="2"/><rect x="20" y="24" width="11" height="11" rx="2"/><rect x="34" y="24" width="11" height="11" rx="2"/></g><g fill="#f7d95e"><rect x="6" y="38" width="11" height="11" rx="2"/><rect x="20" y="38" width="11" height="11" rx="2"/><rect x="34" y="38" width="11" height="11" rx="2"/></g>',
 "zar": '<rect x="8" y="14" width="34" height="34" rx="6" fill="none" stroke="#f7d95e" stroke-width="3" transform="rotate(-8 25 31)"/><g fill="#f5f2e7"><circle cx="18" cy="24" r="2.8"/><circle cx="32" cy="38" r="2.8"/><circle cx="25" cy="31" r="2.8"/></g><circle cx="50" cy="16" r="6" fill="none" stroke="#ffb066" stroke-width="2.6"/>',
 "grup": '<g fill="none" stroke-width="3" stroke-linecap="round"><circle cx="30" cy="16" r="7" stroke="#f7d95e"/><path d="M17 44c0-9 6-14 13-14s13 5 13 14" stroke="#f7d95e"/><circle cx="12" cy="24" r="5" stroke="#8ed1f2"/><path d="M3 44c0-6 4-10 9-10" stroke="#8ed1f2"/><circle cx="48" cy="24" r="5" stroke="#f4a6c0"/><path d="M57 44c0-6-4-10-9-10" stroke="#f4a6c0"/></g>',
 "dunya": '<g fill="none" stroke-width="2.6"><circle cx="30" cy="30" r="22" stroke="#8ed1f2"/><ellipse cx="30" cy="30" rx="10" ry="22" stroke="#f5f2e7"/><path d="M8 30h44M11 18h38M11 42h38" stroke="#f5f2e7"/></g><circle cx="38" cy="22" r="3" fill="#f7d95e"/>',
 "aile": '<g fill="none" stroke-width="3" stroke-linecap="round"><circle cx="18" cy="16" r="6" stroke="#f7d95e"/><circle cx="42" cy="16" r="6" stroke="#8ed1f2"/><circle cx="30" cy="30" r="5" stroke="#f4a6c0"/><path d="M8 50c0-9 5-14 10-14s10 5 10 14" stroke="#f7d95e"/><path d="M32 50c0-9 5-14 10-14s10 5 10 14" stroke="#8ed1f2"/><path d="M21 52c0-6 4-9 9-9s9 3 9 9" stroke="#f4a6c0"/></g>',
 "hira": '<path d="M4 50L24 14l12 20 8-10 14 26z" fill="none" stroke="#f5f2e7" stroke-width="3" stroke-linejoin="round"/><path d="M22 50c0-8 4-12 8-12s8 4 8 12" fill="#1d3a2c" stroke="#ffb066" stroke-width="2.6"/><path d="M50 10a8 8 0 1 0 6 12 6.5 6.5 0 1 1-6-12z" fill="#f7d95e"/>',
}

CSS = """
@font-face{font-family:"RD";src:url("%(f)s/rubik-dirt-latin-400-normal.woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:"RD";src:url("%(f)s/rubik-dirt-latin-ext-400-normal.woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"PH";src:url("%(f)s/patrick-hand-latin-400-normal.woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:"PH";src:url("%(f)s/patrick-hand-latin-ext-400-normal.woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"KL";font-weight:400;src:url("%(f)s/kalam-latin-400-normal.woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:"KL";font-weight:400;src:url("%(f)s/kalam-latin-ext-400-normal.woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"KL";font-weight:700;src:url("%(f)s/kalam-latin-700-normal.woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215}
@font-face{font-family:"KL";font-weight:700;src:url("%(f)s/kalam-latin-ext-700-normal.woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"NA";font-weight:700;src:url("%(f)s/noto-naskh-arabic-arabic-700-normal.woff2");unicode-range:U+0600-06FF,U+0750-077F}
@font-face{font-family:"NA";font-weight:400;src:url("%(f)s/noto-naskh-arabic-arabic-400-normal.woff2");unicode-range:U+0600-06FF,U+0750-077F}
.ab{font-family:NA,"DejaVu Sans",serif;direction:rtl;unicode-bidi:isolate;font-size:1.38em;line-height:1.2;font-weight:700;color:#f7d95e}\n.ar-pron{font-family:PH,KL,sans-serif;direction:ltr;unicode-bidi:isolate;font-size:.78em;color:#9be39b;white-space:nowrap}
.tuzak .y .ab{color:#ff9b8e}.tuzak .d .ab{color:#9be39b}
.zincir .ab{font-size:1.25em}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:PH,NA,"DejaVu Sans",sans-serif;color:#f5f2e7;line-height:1.22;background:#6b4423}
.c1{color:#f7d95e}.c2{color:#8ed1f2}.c3{color:#f4a6c0}.c4{color:#ffb066}.c5{color:#9be39b}
b{font-weight:400}
.sayfa{font-size:calc(10.2pt * var(--o,1));width:210mm;min-height:296mm;break-after:page;background:linear-gradient(135deg,#8b5a2f,#6b4423 40%%,#7d5129 70%%,#5e3b1d);padding:6.5mm 6.5mm 0;display:flex;flex-direction:column;overflow:hidden}
.tahta{flex:1;display:flex;flex-direction:column;justify-content:space-between;border-radius:5px;padding:5mm 6mm 3mm;position:relative;
 background:radial-gradient(ellipse at 20%% 15%%,rgba(255,255,255,.07),transparent 55%%),radial-gradient(ellipse at 80%% 85%%,rgba(255,255,255,.05),transparent 50%%),#1d3a2c;
 box-shadow:inset 0 0 22px rgba(0,0,0,.55),0 0 0 1.5px #4a2f17}
.baslik{text-align:center;position:relative;margin-bottom:3mm}
.baslik h1{font-family:RD,"PH",sans-serif;font-weight:400;font-size:27pt;letter-spacing:.05em;line-height:1;color:#f5f2e7;text-shadow:0 0 1px #fff,2px 2px 0 #3a6a50}
.baslik .alt{font-family:KL,PH,sans-serif;font-weight:700;font-size:7.4pt;letter-spacing:.14em;color:#f7d95e;margin-top:1.6mm;display:inline-block;border-top:1px solid #f7d95e;border-bottom:1px solid #f7d95e;padding:.6mm 3mm}
.not{position:absolute;top:0;font-family:KL,PH,sans-serif;font-size:7.3pt;color:#c9d6c5;line-height:1.25;max-width:42mm}
.not.sol{left:0;transform:rotate(-3deg)}.not.sag{right:0;text-align:right;transform:rotate(3deg)}
.panel{display:flex;flex-direction:column;min-height:0}
.panel.tek{flex:1}
.panel.tek .govde{flex:1}
.tbas{display:flex;align-items:center;gap:3mm;margin-bottom:2mm;border-bottom:1.6px dashed rgba(245,242,231,.5);padding-bottom:1.2mm}
.etiket{font-family:KL,PH,sans-serif;font-weight:700;font-size:8.5pt;background:var(--ac);color:#1d3a2c;border-radius:4px;padding:.4mm 2.6mm;transform:rotate(-2deg);white-space:nowrap}
.tbas h2{font-family:PH,sans-serif;font-weight:400;font-size:calc(17pt * min(var(--o,1),1.25));line-height:1;color:#f5f2e7;flex:1}
.tbas svg{width:12mm;height:12mm;flex:none}
.govde{display:grid;grid-template-columns:1.18fr 1fr;gap:3mm;min-height:0}
.sut{display:flex;flex-direction:column;gap:2.4mm;min-height:0}
.sut .kart:last-child{flex:1}
.kart{border:1.5px solid rgba(245,242,231,.78);border-radius:9px 11px 9px 12px / 11px 9px 12px 9px;padding:3.2mm 3mm 2mm;position:relative;background:rgba(0,0,0,.13)}
.kart>.kb{position:absolute;top:-2.6mm;left:3mm;font-family:KL,PH,sans-serif;font-weight:700;font-size:7.4pt;background:#1d3a2c;border:1.3px solid var(--kc);color:var(--kc);border-radius:5px;padding:0 2mm;line-height:1.5}
.hap{flex:1;display:flex;flex-direction:column;justify-content:space-around}
.kart ul{list-style:none;display:flex;flex-direction:column;justify-content:space-evenly;height:100%%}
.kart.hap li{font-size:1.1em}
.kart li{position:relative;padding-left:3.6mm;margin:.5mm 0}
.kart li::before{content:"";position:absolute;left:0;top:.52em;width:1.9mm;height:1.9mm;border-radius:50%%;background:var(--kc)}
.kart.sar{--kc:#f7d95e}.kart.mav{--kc:#8ed1f2}.kart.pem{--kc:#f4a6c0}.kart.tur{--kc:#ffb066}.kart.yes{--kc:#9be39b}
table{width:100%%;border-collapse:collapse;font-size:calc(9.6pt * var(--o,1));line-height:1.15}
th{font-family:KL,PH,sans-serif;font-weight:700;font-size:.82em;text-align:left;color:#f4a6c0;padding:.4mm 1.2mm;border-bottom:1.3px solid rgba(245,242,231,.7)}
td{padding:.9mm 1.2mm;border-bottom:1px dashed rgba(245,242,231,.28)}
tr:last-child td{border-bottom:0}
td:first-child{color:#9be39b;white-space:nowrap}
.zincir{display:flex;flex-wrap:wrap;gap:1.3mm;align-items:center}
.zincir span{border:1.3px solid var(--kc);border-radius:11px;padding:.2mm 2.2mm}
.zincir i{font-style:normal;color:#c9d6c5}
.tuzak{font-size:calc(9.9pt * var(--o,1))}
.tuzak p{margin:.7mm 0 1mm;line-height:1.16}
.tuzak .y{color:#ff9b8e;text-decoration:line-through;text-decoration-color:rgba(255,155,142,.55)}
.tuzak .d{color:#9be39b}
.tuzak .y::before{content:"✗ ";text-decoration:none;display:inline-block}
.tuzak .d::before{content:"✓ ";display:inline-block}
.alt2{display:grid;grid-template-columns:1fr 1.25fr;gap:2.4mm;margin-top:2.6mm}
.sert{border:1.6px dashed #f7d95e;border-radius:10px;padding:1.6mm 3mm;font-size:calc(10pt * var(--o,1));line-height:1.18}
.sert .e{font-family:RD,PH,sans-serif;font-size:8.3pt;letter-spacing:.06em;color:#f7d95e;display:block}
.ayrac{height:0;border-top:1.5px dashed rgba(245,242,231,.35);margin:1mm 0 3mm}
.ayak{display:flex;justify-content:space-between;font-family:KL,PH,sans-serif;font-size:6.8pt;color:#9fb5a4;margin-top:2mm}
.tepsi{height:11mm;margin:0 -6.5mm;background:linear-gradient(#a06a38,#6b4423);position:relative;margin-top:0;border-top:1.5px solid #4a2f17}
.tepsi i{position:absolute;top:3.2mm;height:3.4mm;border-radius:1.8mm}
"""

def kart(baslik, kc, icerik, ek=""):
    return f'<div class="kart {kc} {ek}"><span class="kb">{html.escape(baslik)}</span>{icerik}</div>'

def tema_html(t, renk, tek=False):
    hap = kart("Olmazsa olmaz", "sar", '<ul>' + "".join(f"<li>{m(x)}</li>" for x in t["hap"]) + '</ul>', "hap")
    sag = ""
    if t.get("tablo"):
        tb = t["tablo"]
        bas = "".join(f"<th>{html.escape(h)}</th>" for h in tb["h"])
        sat = "".join("<tr>" + "".join(f"<td>{m(c)}</td>" for c in r) + "</tr>" for r in tb["s"])
        sag += kart(tb["b"], "mav", f"<table><tr>{bas}</tr>{sat}</table>")
    if t.get("zincir"):
        z = t["zincir"]
        ch = '<i>→</i>'.join(f"<span>{m(x)}</span>" for x in z["m"])
        sag = kart(z["b"], "tur", f'<div class="zincir">{ch}</div>') + sag
    if t.get("tuzak"):
        tz = "".join(f'<p><span class="y">{m(y)}</span><br><span class="d">{m(d)}</span></p>' for y, d in t["tuzak"])
        sag += kart("Tuzağa düşme", "pem", f'<div class="tuzak">{tz}</div>')
    alt = '<div class="alt2">' + (f'<div class="sert"><span class="e">SINAV İPUCU</span>{m(t["ipucu"])}</div>' if t.get("ipucu") else "<div></div>") + \
          (f'<div class="sert"><span class="e">BÖYLE HATIRLA</span>{m(t["ezber"])}</div>' if t.get("ezber") else "<div></div>") + '</div>'
    return (f'<div class="panel{" tek" if tek else ""}" style="--ac:{renk}"><div class="tbas"><span class="etiket">{html.escape(t["no"])}</span><h2>{html.escape(t["ad"])}</h2>'
            f'<svg viewBox="0 0 60 60" aria-hidden="true">{IKON.get(t.get("ikon"), "")}</svg></div>'
            f'<div class="govde">{hap}<div class="sut">{sag}</div></div>{alt}</div>')

TEPSI = "".join(f'<i style="left:{l}mm;width:{w}mm;background:{c}"></i>' for l, w, c in ((20, 16, "#f5f2e7"), (60, 14, "#f7d95e"), (95, 13, "#f4a6c0"), (140, 15, "#8ed1f2"), (165, 20, "#cfc9bb")))
RENK = ["#f7d95e", "#8ed1f2", "#f4a6c0", "#ffb066"]

def sayfa_html(d, grup, no, toplam, o):
    temalar = "".join(tema_html(t, RENK[i % 4], len(grup) == 1) + ('<div class="ayrac"></div>' if i < len(grup) - 1 else "") for i, t in enumerate(grup))
    kapsam = " ve ".join(t["no"] for t in grup)
    return (f'<section class="sayfa" style="--o:{o}"><div class="tahta"><div class="baslik">'
            f'<div class="not sol">Sınavdan önce<br>son bakış!</div><div class="not sag">En can alıcı<br>noktalar ★</div>'
            f'<h1>HAP NOTLAR</h1><span class="alt">{html.escape(d["ad"].upper())} · 6. SINIF · {html.escape(kapsam.upper())}</span></div>'
            f'{temalar}<div class="ayak"><span>{YAZAR}</span><span>{html.escape(d["ad"])} · Hap Notlar · Sayfa {no} / {toplam}</span></div></div>'
            f'<div class="tepsi">{TEPSI}</div></section>')

def yaz(govde, ad, cikti):
    doc = f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{html.escape(ad)}</title><style>{CSS % {"f": FONT.as_uri()}}</style></head><body>{govde}</body></html>'
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "hap.html"; h.write_text(doc, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer", f"--print-to-pdf={cikti}", h.as_uri()], check=True, capture_output=True)

def sayfa_sayisi(pdf):
    from pypdf import PdfReader
    return len(PdfReader(str(pdf)).pages)

def sigdir(d, grup, no, toplam):
    """Sayfaya sığan en büyük yazı ölçeğini bulur; sayfa dolu görünür."""
    alt, ust, iyi = 0.6, (1.9 if len(grup) == 1 else 1.5), 0.6
    with tempfile.TemporaryDirectory() as tmp:
        deneme = Path(tmp) / "d.pdf"
        for _ in range(7):
            orta = round((alt + ust) / 2, 3)
            yaz(sayfa_html(d, grup, no, toplam, orta), "deneme", deneme)
            if sayfa_sayisi(deneme) <= 1: iyi, alt = orta, orta
            else: ust = orta
    return iyi

def uret(ders_id):
    d = json.loads((KOK / "hap" / f"{ders_id}.json").read_text(encoding="utf-8"))
    gruplar = [d["temalar"][i:i + TEMA_SAYFA] for i in range(0, len(d["temalar"]), TEMA_SAYFA)]
    parcalar = []
    for i, g in enumerate(gruplar, 1):
        o = sigdir(d, g, i, len(gruplar))
        print(f"  {ders_id} sayfa {i}: yazı ölçeği {o}")
        parcalar.append(sayfa_html(d, g, i, len(gruplar), o))
    cikti = KOK / "pdf" / f"{ders_id}-hap.pdf"
    ham = cikti.with_suffix(".tmp.pdf")
    yaz("".join(parcalar), f"{d['ad']} · Hap Notlar", ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": f"{d['ad']} · Hap Notlar (6. Sınıf)", "/Author": YAZAR,
                    "/Subject": "Ders Rotası 6 · Hap notlar, ipuçları ve tuzaklar", "/Creator": "Ders Rotası 6",
                    "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink()
    print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")

if __name__ == "__main__":
    if not CHROME: sys.exit("google-chrome bulunamadı")
    for x in (sys.argv[1:] or sorted(p.stem for p in (KOK / "hap").glob("*.json"))): uret(x)
