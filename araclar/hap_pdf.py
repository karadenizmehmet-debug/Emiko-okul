#!/usr/bin/env python3
"""Hap Notlar PDF üretici · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:
  python3 araclar/hap_pdf.py            # hap/*.json -> pdf/<ders>-hap.pdf (hepsi)
  python3 araclar/hap_pdf.py fen mat    # yalnızca seçilen dersler

Gereksinim: google-chrome (headless) ve pypdf. İçerik hap/<ders>.json dosyalarındadır.
Yeni tema eklenince o dersin JSON dosyasına tema ekle, betiği çalıştır.
Temada "sayfa":N (varsayılan 1) hedef sayfa sayısıdır; yazı ölçeği sayfaları dolduracak şekilde otomatik bulunur.
"""
import html, json, re, subprocess, sys, tempfile
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
YAZAR = "Mehmet Karadeniz, 2026-2027"
CHROME = next((c for c in ("google-chrome", "chromium", "chromium-browser") if subprocess.run(["which", c], capture_output=True).returncode == 0), None)

def m(s):
    """Metin: HTML kaçışı + **kalın**."""
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", html.escape(s, quote=False))

CSS = """
@page { size: A4; margin: 9mm 10mm 12mm 10mm;
  @bottom-left  { content: "Ders Rotası 6 · Hazırlayan: %(yazar)s"; font: 500 7.5pt Inter, sans-serif; color: #5a6a86; }
  @bottom-right { content: "Sayfa " counter(page) " / " counter(pages); font: 500 7.5pt Inter, sans-serif; color: #5a6a86; } }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: Inter, "DejaVu Sans", sans-serif; color: #1b2a4a; font-size: calc(8.6pt * var(--o, 1)); line-height: 1.36; }
.sayfa { break-before: page; }
.sayfa:first-child { break-before: auto; }
.bant { background: var(--r); color: #fff; border-radius: 9px; padding: 7px 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 7px; }
.bant .rozet { background: rgba(255,255,255,.2); border-radius: 6px; padding: 3px 8px; font-weight: 800; font-size: 8.5pt; white-space: nowrap; }
.bant h1 { font-family: "Inter Display", Inter, sans-serif; font-size: 15pt; font-weight: 800; line-height: 1.1; }
.bant p { font-size: 7.8pt; opacity: .92; margin-top: 1px; }
.bant .etiket { margin-left: auto; text-align: right; font-size: 7.5pt; font-weight: 700; line-height: 1.25; opacity: .95; }
.kartlar { column-count: 2; column-gap: 7px; }
.kart { break-inside: avoid; background: #fff; border: 1.2px solid var(--r); border-radius: 8px; margin-bottom: 7px; overflow: hidden; }
.kart h2 { background: var(--a); color: var(--r); font-size: calc(8.8pt * var(--o, 1)); font-weight: 800; padding: 3px 8px; border-bottom: 1.2px solid var(--r); }
.kart ul { list-style: none; padding: 4px 8px 5px; }
.kart li { padding-left: 10px; position: relative; margin: 2px 0; }
.kart li::before { content: ""; position: absolute; left: 0; top: .52em; width: 4px; height: 4px; border-radius: 50%%; background: var(--r); }
.tablo { break-inside: avoid; margin: 0 0 7px; border: 1.2px solid var(--r); border-radius: 8px; overflow: hidden; }
.tablo h3 { background: var(--r); color: #fff; font-size: calc(8.6pt * var(--o, 1)); font-weight: 800; padding: 3px 8px; }
table { width: 100%%; border-collapse: collapse; font-size: calc(8.1pt * var(--o, 1)); }
th { background: var(--a); color: var(--r); text-align: left; font-weight: 800; padding: 2.5px 6px; border-bottom: 1px solid var(--r); }
td { padding: 2.5px 6px; border-bottom: .6px solid #d3dcea; vertical-align: top; }
tr:last-child td { border-bottom: 0; }
td:first-child { font-weight: 700; }
.sorular ol { list-style: none; column-count: 2; column-gap: 12px; padding: 4px 8px 3px; counter-reset: q; }
.sorular li { break-inside: avoid; counter-increment: q; padding: 2px 0 2px 18px; position: relative; border-bottom: .6px dashed #c5cfdf; }
.sorular li::before { content: counter(q); position: absolute; left: 0; top: 2px; background: var(--r); color: #fff; font-weight: 800; font-size: .8em; width: 13px; height: 13px; border-radius: 50%%; text-align: center; line-height: 13px; }
.sorular li b { color: var(--r); }
.alt { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 7px; }
.kutu { break-inside: avoid; border-radius: 8px; padding: 4px 9px 5px; }
.kutu h2 { font-size: calc(8.8pt * var(--o, 1)); font-weight: 800; margin-bottom: 2px; }
.kutu ul { list-style: none; }
.kutu li { margin: 2px 0; padding-left: 12px; position: relative; }
.ip { background: #e4f5ec; border: 1.2px solid #1f8a5a; } .ip h2 { color: #14633f; } .ip li::before { content: "✔"; color: #1f8a5a; position: absolute; left: 0; font-size: .85em; }
.tz { background: #fdeaea; border: 1.2px solid #c0392b; } .tz h2 { color: #962b20; } .tz li::before { content: "✖"; color: #c0392b; position: absolute; left: 0; font-size: .85em; }
.ezber { background: #fff3c4; border: 1.2px dashed #b8860b; border-radius: 8px; padding: 5px 10px; font-size: calc(8.9pt * var(--o, 1)); break-inside: avoid; }
.ezber::before { content: "AKLINDA TUT  "; font-weight: 800; color: #8a6200; letter-spacing: .04em; font-size: .85em; }
""" % {"yazar": YAZAR}

def tema_html(d, t, o=1):
    kartlar = "".join(f'<div class="kart"><h2>{m(k["b"])}</h2><ul>{"".join(f"<li>{m(x)}</li>" for x in k["m"])}</ul></div>' for k in t.get("kartlar", []))
    tablolar = ""
    for tb in t.get("tablolar", []):
        bas = "".join(f"<th>{m(h)}</th>" for h in tb["h"])
        sat = "".join("<tr>" + "".join(f"<td>{m(c)}</td>" for c in r) + "</tr>" for r in tb["s"])
        tablolar += f'<div class="tablo"><h3>{m(tb["b"])}</h3><table><tr>{bas}</tr>{sat}</table></div>'
    if t.get("sorular"):
        tablolar += '<div class="tablo sorular"><h3>Kendini yokla: hızlı sorular</h3><ol>' + "".join(f"<li>{m(q)} <b>{m(c)}</b></li>" for q, c in t["sorular"]) + "</ol></div>"
    def kutu(cls, bas, liste):
        return f'<div class="kutu {cls}"><h2>{bas}</h2><ul>{"".join(f"<li>{m(x)}</li>" for x in liste)}</ul></div>' if liste else "<div></div>"
    alt = f'<div class="alt">{kutu("ip", "İpuçları", t.get("ipuclari"))}{kutu("tz", "Tuzaklara dikkat", t.get("tuzaklar"))}</div>'
    ezber = f'<div class="ezber">{m(t["ezber"])}</div>' if t.get("ezber") else ""
    return (f'<section class="sayfa" style="--r:{d["renk"]};--a:{d["acik"]};--o:{o}">'
            f'<div class="bant"><span class="rozet">{m(t["no"])}</span><div><h1>{m(t["ad"])}</h1><p>{m(t.get("ozet",""))}</p></div>'
            f'<div class="etiket">{m(d["ad"])}<br>Hap Notlar ve İpuçları</div></div>'
            f'<div class="kartlar">{kartlar}</div>{tablolar}{alt}{ezber}</section>')

def sayfa_sayisi(pdf):
    from pypdf import PdfReader
    return len(PdfReader(str(pdf)).pages)

def yaz(govde, ad, cikti):
    doc = f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{ad}</title><style>{CSS}</style></head><body>{govde}</body></html>'
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "hap.html"; h.write_text(doc, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={cikti}", h.as_uri()], check=True, capture_output=True)

def sigdir(d, t):
    """Temanın hedef sayfa sayısına (varsayılan 1) sığan en büyük yazı ölçeğini bulur: sayfalar dolu görünür."""
    hedef = t.get("sayfa", 1)
    if "olcek" in t: return t["olcek"]
    alt, ust, en_iyi = 0.70, 1.30, 0.70
    with tempfile.TemporaryDirectory() as tmp:
        deneme = Path(tmp) / "d.pdf"
        for _ in range(7):
            orta = round((alt + ust) / 2, 3)
            yaz(tema_html(d, t, orta), "deneme", deneme)
            if sayfa_sayisi(deneme) <= hedef: en_iyi, alt = orta, orta
            else: ust = orta
    return en_iyi

def uret(ders_id):
    d = json.loads((KOK / "hap" / f"{ders_id}.json").read_text(encoding="utf-8"))
    parcalar = []
    for t in d["temalar"]:
        o = sigdir(d, t)
        print(f"  {ders_id}/{t['id']}: yazı ölçeği {o}")
        parcalar.append(tema_html(d, t, o))
    cikti = KOK / "pdf" / f"{ders_id}-hap.pdf"
    ham = cikti.with_suffix(".tmp.pdf")
    yaz("".join(parcalar), f"{d['ad']} · Hap Notlar", ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": f"{d['ad']} · Hap Notlar ve İpuçları (6. Sınıf)", "/Author": YAZAR,
                    "/Subject": "Ders Rotası 6 · Hap notlar, ipuçları ve tuzaklar", "/Creator": "Ders Rotası 6",
                    "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink()
    print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")

if __name__ == "__main__":
    if not CHROME: sys.exit("google-chrome bulunamadı")
    dersler = sys.argv[1:] or sorted(p.stem for p in (KOK / "hap").glob("*.json"))
    for x in dersler: uret(x)
