#!/usr/bin/env python3
"""Ders Rotası 6 · Yazılıya Hazırlık soruları A4 PDF üreticisi.
Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/yazili_pdf.py ing t1   ->  pdf/ing-t1-yazili.pdf
Sorular dersler/<ders>/<tema>.js içindeki q.yazili dizisinden okunur (node gerekir).
Görseller aşağıdaki GORSEL sözlüğünde, soru numarasına göre tutulur (isteğe bağlı).
Gereksinim: node, google-chrome, pypdf.
"""
import html, json, re, subprocess, sys, tempfile
from pathlib import Path
from hap_pdf import CHROME, FONT, KOK, YAZAR, sayfa_sayisi

# ------------------------------------------------------------------ GÖRSELLER
R, M, Y, G, K = "#c0392b", "#2f6fd6", "#f2b632", "#1f8a5a", "#2b2f3a"   # kırmızı, mavi, sarı, yeşil, koyu
def svg(icerik, w=200, h=140):
    return f'<svg viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,DejaVu Sans,sans-serif">{icerik}</svg>'

def bayrak(x, y, s=1):
    """Türk bayrağı (sol üst köşe x,y; genişlik 60*s)."""
    return (f'<g transform="translate({x},{y}) scale({s})"><rect width="60" height="40" rx="2" fill="{R}"/>'
            '<circle cx="21" cy="20" r="10" fill="#fff"/><circle cx="23.5" cy="20" r="8" fill="' + R + '"/>'
            '<polygon fill="#fff" points="33,20 39.5,17.9 39.5,13.6 43.4,17.1 49.6,15.2 45.7,20 49.6,24.8 43.4,22.9 39.5,26.4 39.5,22.1"/></g>')

def kisi(x, y, govde=M, s=1):
    return (f'<g transform="translate({x},{y}) scale({s})"><circle cx="0" cy="-26" r="9" fill="#f1c27d"/>'
            f'<path d="M-12 12v-22q0-8 12-8t12 8v22z" fill="{govde}"/><path d="M-7 12v14M7 12v14" stroke="{K}" stroke-width="4" stroke-linecap="round"/></g>')

def saat(x, y, r, s, d, renk=M):
    import math
    a1 = math.radians((s % 12) * 30 + d * .5 - 90); a2 = math.radians(d * 6 - 90)
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" stroke="{renk}" stroke-width="3"/>'
            + "".join(f'<circle cx="{x + (r-5)*math.cos(math.radians(k*30))}" cy="{y + (r-5)*math.sin(math.radians(k*30))}" r="1.3" fill="{K}"/>' for k in range(12))
            + f'<line x1="{x}" y1="{y}" x2="{x + r*.5*math.cos(a1)}" y2="{y + r*.5*math.sin(a1)}" stroke="{K}" stroke-width="3" stroke-linecap="round"/>'
            + f'<line x1="{x}" y1="{y}" x2="{x + r*.78*math.cos(a2)}" y2="{y + r*.78*math.sin(a2)}" stroke="{K}" stroke-width="2" stroke-linecap="round"/>')

def zarf(baslik):
    return svg(f'<rect x="20" y="25" width="160" height="100" rx="8" fill="#fff" stroke="{M}" stroke-width="3"/>'
               f'<path d="M20 33l80 50 80-50" fill="none" stroke="{M}" stroke-width="3"/>'
               f'<rect x="132" y="35" width="34" height="26" rx="3" fill="{Y}"/><text x="149" y="53" font-size="12" text-anchor="middle" fill="{K}">✉</text>'
               f'<text x="100" y="18" font-size="13" font-weight="700" text-anchor="middle" fill="{K}">{baslik}</text>')

AFIS_SECIM = svg(f'<rect x="30" y="6" width="140" height="128" rx="6" fill="#fffbe8" stroke="{Y}" stroke-width="4"/>'
                 f'<text x="100" y="30" font-size="15" font-weight="800" text-anchor="middle" fill="{R}">SCHOOL</text>'
                 f'<text x="100" y="47" font-size="15" font-weight="800" text-anchor="middle" fill="{R}">ELECTION</text>'
                 f'<rect x="80" y="58" width="40" height="34" rx="3" fill="{M}"/><rect x="88" y="54" width="24" height="8" fill="#fff" stroke="{K}"/>'
                 f'<text x="100" y="81" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">VOTE</text>'
                 f'<text x="100" y="108" font-size="10" text-anchor="middle" fill="{K}">Friday, 3rd October</text>'
                 f'<text x="100" y="123" font-size="10" text-anchor="middle" fill="{K}">Classroom 6-A</text>')

GUNLUK = svg(f'<rect x="38" y="8" width="128" height="124" rx="6" fill="#fff" stroke="{K}" stroke-width="2.5"/>'
             + "".join(f'<circle cx="38" cy="{22+i*20}" r="4" fill="none" stroke="{K}" stroke-width="2"/>' for i in range(6))
             + f'<text x="54" y="30" font-size="12" font-style="italic" fill="{M}">Dear diary,</text>'
             + "".join(f'<line x1="54" y1="{46+i*14}" x2="154" y2="{46+i*14}" stroke="#c8d0dc" stroke-width="1.5"/>' for i in range(5))
             + bayrak(110, 92, .7))

PROGRAM = svg(f'<rect x="8" y="10" width="184" height="122" rx="6" fill="#fff" stroke="{M}" stroke-width="2.5"/>'
              + "".join(f'<text x="{57+i*30}" y="28" font-size="9" font-weight="700" text-anchor="middle" fill="{M}">{d}</text>' for i, d in enumerate(["Mon", "Tue", "Wed", "Thu", "Fri"]))
              + "".join(f'<text x="14" y="{50+j*24}" font-size="9" font-weight="700" fill="{K}">{t}</text>' for j, t in enumerate(["08.30", "09.20", "10.10", "11.00"]))
              + "".join(f'<rect x="{44+i*30}" y="{38+j*24}" width="26" height="18" rx="3" fill="{["#dce9ff", "#ffe7c2", "#d8f1e3", "#fde0e0"][(i + j) % 4]}"/>'
                        for i in range(5) for j in range(4)))

def okul_cocuk_saat():
    return svg(saat(52, 62, 40, 8, 10, M) + f'<text x="52" y="122" font-size="13" font-weight="800" text-anchor="middle" fill="{M}">8.10</text>'
               + kisi(140, 88, R, 1.25) + f'<rect x="118" y="112" width="44" height="14" rx="3" fill="{Y}"/><text x="140" y="123" font-size="9" font-weight="700" text-anchor="middle" fill="{K}">PRESIDENT</text>')

def halk_oyunu():
    return svg(f'<rect x="0" y="110" width="200" height="30" fill="#d8f1e3"/>' + bayrak(10, 10, .8) + bayrak(140, 10, .8)
               + kisi(60, 96, R, 1.05) + kisi(100, 92, M, 1.05) + kisi(140, 96, G, 1.05)
               + f'<path d="M68 76l24 -4M108 72l24 4" stroke="#f1c27d" stroke-width="4" stroke-linecap="round"/>'
               + f'<text x="100" y="22" font-size="13" font-weight="800" text-anchor="middle" fill="{R}">23 April</text>')

def gorevliler():
    k = [("nurse", R, f'<path d="M-7 0h14M0 -7v14" stroke="#fff" stroke-width="5"/>'),
         ("library", M, f'<rect x="-9" y="-8" width="6" height="16" fill="#fff"/><rect x="-2" y="-8" width="6" height="16" fill="#fff"/><rect x="5" y="-6" width="5" height="14" fill="#fff"/>'),
         ("principal", K, f'<path d="M-10 6h20M-8 6v-8l8-6 8 6v8" fill="none" stroke="#fff" stroke-width="2.5"/>'),
         ("advice", G, f'<path d="M-9 -6h18v10h-10l-6 5v-5h-2z" fill="#fff"/>')]
    return svg("".join(f'<g transform="translate({30+i*47},55)"><circle r="20" fill="{c}"/>{ic}</g><text x="{30+i*47}" y="96" font-size="10" font-weight="700" text-anchor="middle" fill="{K}">{t}</text>'
                       for i, (t, c, ic) in enumerate(k)), 200, 110)

def takvim():
    sayfa = [("29", "OCT", R), ("30", "AUG", M), ("24", "NOV", G), ("23", "APR", Y)]
    return svg("".join(f'<g transform="translate({8+i*48},28)"><rect width="40" height="56" rx="5" fill="#fff" stroke="{c}" stroke-width="2.5"/>'
                       f'<rect width="40" height="16" rx="5" fill="{c}"/><text x="20" y="12" font-size="9" font-weight="800" text-anchor="middle" fill="#fff">{a}</text>'
                       f'<text x="20" y="44" font-size="20" font-weight="800" text-anchor="middle" fill="{K}">{g}</text></g>' for i, (g, a, c) in enumerate(sayfa)), 200, 110)

def tören():
    return svg(f'<line x1="40" y1="10" x2="40" y2="130" stroke="{K}" stroke-width="4"/>' + bayrak(42, 12, 1)
               + "".join(kisi(x, 118, c, .85) for x, c in ((110, M), (140, R), (170, G)))
               + f'<text x="140" y="40" font-size="20" text-anchor="middle" fill="{M}">♪ ♫</text>')

def nobetci():
    return svg(f'<rect x="10" y="12" width="110" height="70" rx="4" fill="#24493a" stroke="#8a5a2b" stroke-width="5"/>'
               f'<text x="65" y="45" font-size="13" text-anchor="middle" fill="#f5f2e7">ON DUTY</text>'
               f'<rect x="60" y="64" width="22" height="10" rx="2" fill="{Y}"/>'
               f'<path d="M160 120v-30" stroke="{G}" stroke-width="3"/><ellipse cx="150" cy="92" rx="10" ry="6" fill="{G}"/><ellipse cx="170" cy="86" rx="10" ry="6" fill="{G}"/>'
               f'<path d="M146 120h28l-4 18h-20z" fill="#b5651d"/>'
               f'<path d="M120 104l14 -8v14z" fill="{M}"/><path d="M134 100q8 2 10 10" fill="none" stroke="{M}" stroke-width="2" stroke-dasharray="3 3"/>')

def siklik_tablosu():
    s = [("go to the chess club", "✔ ✔ ✔ ✔ ✔", G), ("be late", "✘", R), ("read in the library", "✔ ✔", Y)]
    return svg(f'<rect x="4" y="8" width="192" height="104" rx="6" fill="#fff" stroke="{M}" stroke-width="2.5"/>'
               f'<text x="100" y="26" font-size="12" font-weight="800" text-anchor="middle" fill="{M}">Emre\'s week</text>'
               + "".join(f'<text x="12" y="{52+i*26}" font-size="10" fill="{K}">{a}</text><text x="190" y="{52+i*26}" font-size="12" font-weight="800" text-anchor="end" fill="{c}">{t}</text>'
                         for i, (a, t, c) in enumerate(s)), 200, 120)

def okul_gunu():
    return svg(saat(40, 50, 26, 7, 0) + saat(100, 50, 26, 8, 30, G) + saat(160, 50, 26, 3, 10, R)
               + "".join(f'<text x="{x}" y="100" font-size="10" font-weight="700" text-anchor="middle" fill="{K}">{t}</text>'
                         for x, t in ((40, "wake up"), (100, "lessons"), (160, "finish"))), 200, 110)

def rozet():
    return svg(f'<path d="M100 10l18 10 20 0 6 20 14 14-6 20 6 20-14 14-6 20h-20l-18 10-18-10h-20l-6-20-14-14 6-20-6-20 14-14 6-20h20z" fill="{Y}" transform="scale(.82) translate(22,4)"/>'
               f'<text x="100" y="68" font-size="13" font-weight="800" text-anchor="middle" fill="{K}">MY ROLE</text>'
               f'<text x="100" y="86" font-size="10" text-anchor="middle" fill="{K}">at school</text>', 200, 140)

def bayram_gunu():
    return svg(bayrak(20, 20, 1.3) + bayrak(110, 30, 1.0) + f'<text x="100" y="132" font-size="13" font-weight="800" text-anchor="middle" fill="{R}">National Day</text>'
               + "".join(f'<circle cx="{x}" cy="{y}" r="3" fill="{c}"/>' for x, y, c in ((30, 100, Y), (60, 112, M), (150, 100, G), (180, 116, R), (120, 110, Y))))

GORSEL = {
    ("ing", "t1"): {1: AFIS_SECIM, 3: GUNLUK, 4: PROGRAM, 6: okul_cocuk_saat(), 9: halk_oyunu(), 11: gorevliler(),
                    12: takvim(), 15: tören(), 16: nobetci(), 20: siklik_tablosu(), 25: okul_gunu(), 26: rozet(),
                    27: bayram_gunu(), 28: zarf("Hi Tom!")},
}
BASLIK = {("ing", "t1"): ("İngilizce 6", "1. Tema · School Life", "1. Dönem 1. Yazılıya Hazırlık")}

# ------------------------------------------------------------------ CEVAP YERİ
def satir_sayisi(it):
    t = it["tur"].lower(); s = it["soru"]
    if "paragraf" in t: return 8
    if "e-posta" in t: return 6
    if "doğru / yanlış" in t or "göz gezdirme" in t and "a)" in s and "b)" in s and "\n" not in s: return 1
    n = len(re.findall(r"(?:^|\s)[a-d]\)", s))
    return max(2, n + (1 if "\n" in s else 0)) if n else 2

def soru_html(n, it, gorsel):
    soru = html.escape(it["soru"]).replace("&lt;br&gt;", "<br>").replace("\n", "<br>")
    soru = re.sub(r"(“[^”]{12,}”)", r'<span class="alinti">\1</span>', soru) if len(soru) > 140 else soru
    g = f'<div class="gorsel">{gorsel}</div>' if gorsel else ""
    satir = "".join('<div class="cizgi"></div>' for _ in range(satir_sayisi(it)))
    return (f'<section class="soru{" gorselli" if gorsel else ""}"><div class="no">{n}</div><div class="ic">'
            f'<div class="etiket">{html.escape(it["konu"])} · {html.escape(it["tur"])}</div>{g}<p>{soru}</p>'
            f'<div class="cevap">{satir}</div></div></section>')

CSS = """
@font-face{font-family:"KL";font-weight:700;src:url("%(f)s/kalam-latin-700-normal.woff2")}
@font-face{font-family:"KL";font-weight:700;src:url("%(f)s/kalam-latin-ext-700-normal.woff2");unicode-range:U+0100-02AF}
@page{size:A4;margin:12mm 12mm 14mm}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,"DejaVu Sans",sans-serif;color:#1d2330;font-size:10.4pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.kafa{display:grid;grid-template-columns:1fr auto;gap:4mm;align-items:end;border-bottom:2.5px solid #2f6fd6;padding-bottom:3mm;margin-bottom:3mm}
.kafa h1{font-family:Inter,sans-serif;font-weight:800;font-size:16pt;margin:0;color:#2f6fd6;line-height:1}
.kafa h2{font-size:11pt;margin:1.5mm 0 0;font-weight:600;color:#444}
.kimlik{display:grid;grid-template-columns:auto 42mm;gap:1.8mm 2mm;font-size:9pt;font-weight:600}
.kimlik span{border-bottom:1px dotted #777}
.not{font-size:8.6pt;color:#555;margin:0 0 3mm;background:#f3f7ff;border-left:3px solid #2f6fd6;padding:1.6mm 3mm;border-radius:2px}
.soru{display:grid;grid-template-columns:9mm 1fr;gap:2.5mm;padding:2.6mm 0 3mm;border-bottom:1px solid #e3e7ee;break-inside:avoid}
.no{width:8mm;height:8mm;border-radius:50%;background:#2f6fd6;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:10pt}
.etiket{font-size:7.6pt;font-weight:700;letter-spacing:.02em;color:#b5651d;margin-bottom:.8mm}
.ic p{margin:0 0 1.5mm;line-height:1.42}
.alinti{display:block;margin:1mm 0;padding:1.6mm 2.4mm;background:#fbf8ef;border-radius:2px;font-style:italic}
.gorsel{float:right;width:46mm;margin:0 0 1.5mm 3mm;border:1px solid #e3e7ee;border-radius:3px;padding:1mm;background:#fff}
.gorsel svg{display:block;width:100%;height:auto}
.cevap{clear:both}
.cizgi{height:7.2mm;border-bottom:1px solid #aeb7c4}
.anahtar{break-before:page}
.anahtar h1{font-family:Inter,sans-serif;font-weight:800;color:#1f8a5a;font-size:19pt;margin:0 0 3mm}
.an{display:grid;grid-template-columns:8mm 1fr;gap:2mm;padding:1.6mm 0;border-bottom:1px solid #e9edf2;break-inside:avoid;font-size:9.2pt;line-height:1.35}
.an b{color:#1f8a5a}.an i{color:#666;font-size:8.4pt}
.imza{font-size:8pt;color:#888;text-align:right;margin-top:4mm}
"""

def main():
    ders, tema = (sys.argv[1:] + ["ing", "t1"][len(sys.argv[1:]):])[:2]
    js = KOK / "dersler" / ders / f"{tema}.js"
    veri = json.loads(subprocess.run(["node", "-e",
        'let o;global.tema=(d,t)=>{o=t.q.yazili};eval(require("fs").readFileSync(process.argv[1],"utf8"));process.stdout.write(JSON.stringify(o))',
        str(js)], capture_output=True, text=True, check=True).stdout)
    gor = GORSEL.get((ders, tema), {})
    b1, b2, b3 = BASLIK.get((ders, tema), (ders, tema, "Yazılıya Hazırlık"))
    sorular = "".join(soru_html(i, it, gor.get(i)) for i, it in enumerate(veri, 1))
    anahtar = "".join(f'<div class="an"><b>{i}.</b><div>{html.escape(it["cevap"]).replace(chr(10), "<br>")}<br><i>{html.escape(it["aciklama"])}</i></div></div>'
                      for i, it in enumerate(veri, 1))
    govde = f"""<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{b1} · {b2} · Yazılıya Hazırlık</title>
<style>{CSS.replace("%(f)s", FONT.as_uri())}</style></head><body>
<header class="kafa"><div><h1>{b1} · {b3}</h1><h2>{b2} · {len(veri)} soru · {YAZAR}</h2></div>
<div class="kimlik"><b>Ad Soyad</b><span></span><b>Sınıf / No</b><span></span></div></header>
<p class="not">Soruları önce kendin cevapla, sonra son sayfadaki cevap anahtarıyla kontrol et. Yanlış yaptığın konuyu Ders Rotası 6'da tekrar oku.</p>
{sorular}
<section class="anahtar"><h1>Cevap anahtarı</h1>{anahtar}<p class="imza">{b1} · {b2} · Yazılıya Hazırlık · {YAZAR}</p></section></body></html>"""
    cikti = KOK / "pdf" / f"{ders}-{tema}-yazili.pdf"
    with tempfile.TemporaryDirectory() as d:
        h = Path(d) / "y.html"; h.write_text(govde, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer",
                        f"--print-to-pdf={cikti}", h.as_uri()], check=True, capture_output=True)
    print(f"-> {cikti.relative_to(KOK)} · {sayfa_sayisi(cikti)} sayfa · {len(veri)} soru · {len(gor)} görsel")

if __name__ == "__main__":
    main()
