#!/usr/bin/env python3
"""Ders Rotası 6 · EXPRESS ders notu üretici (Fen dışındaki dersler) · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/express_ders.py <ders>     ->  pdf/<ders>-express.pdf
           python3 araclar/express_ders.py hepsi
Dersler: tr, mat, sos, ing, din. İçerik araclar/express_icerik/<ders>.py içindedir.
Tasarım (CSS, kutular, kapak) Fen Express ile aynıdır: araclar/express_pdf.py içinden alınır.
Gereksinim: google-chrome, pypdf, pdftoppm, Pillow.
"""
import importlib, re, subprocess, sys, tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import express_pdf as F  # noqa: E402
from express_pdf import KOK, FONT, YAZAR, CHROME, SIMSEK, bolum, kutu, ul, tablo, bosluklar  # noqa: E402,F401

DERSLER = ["tr", "mat", "sos", "ing", "din"]

EK_CSS = """
.metin{background:#fffdf6;border:1.3px solid #e9dfc3;border-radius:10px;padding:2.2mm 3.2mm;margin:1.4mm 0;break-inside:avoid;font-size:calc(9.4pt * var(--o,1))}
.metin .bas{font-weight:700;color:#7a5200;display:block;margin-bottom:.4mm}
.soru .metin{margin:.8mm 0 1mm}
.en{font-style:italic;color:#2f5fb0}
.kesir{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;margin:0 .6mm;font-size:.92em}
.kesir span:first-child{border-bottom:1px solid currentColor;padding:0 .6mm}
.ar{font-family:"Noto Naskh Arabic","DejaVu Sans",serif;font-size:12pt;direction:rtl}
"""


def kesir(p, q):
    return f'<span class="kesir"><span>{p}</span><span>{q}</span></span>'


def css(ad):
    c = F.CSS.replace("⚡ FEN EXPRESS", f"⚡ {ad} EXPRESS")
    return (c + EK_CSS.replace("%", "%%")) % {"f": FONT.as_uri()}


def kapak(M):
    enb = max(n for _, _, n in M.HARITA)
    satir = [[k, t, f"{n} soru", f'<span class="bar" style="width:{round(36 * n / enb)}mm"></span>'] for k, t, n in M.HARITA]
    return (f'<div class="kapak">{SIMSEK}<h1>{M.KAPAK_AD} <span>EXPRESS</span></h1>'
            f'<p>{M.KAPAK_P}</p>'
            f'<div class="yaz">6. Sınıf {M.AD} · Ders Rotası 6 · {YAZAR}</div></div>'
            '<div class="mavi"><h3>Soru haritası: Denemede hangi konudan kaç soru var?</h3>' + tablo(["Kazanım", "Konu", "Denemede", ""], satir, "harita") + '</div>'
            + kutu("vurucu", "Nasıl çalışmalısın?", M.NASIL))


def deneme(M):
    n = len(M.SORULAR)
    s = (bolum("turuncu", "MİNİ DENEME", f"{n} soruda kendini ölç", f"Süre: {M.SURE} dakika")
         + '<div class="turuncu"><p>Soru sırası denemedeki kazanım sırasına benzer. Önce çöz, sonra cevap anahtarına bak. Yanlış yaptığın sorunun bölümüne geri dön.</p><div class="sorular">')
    for q, o, _, _ in M.SORULAR:
        tek = " tek" if max(len(re.sub(r"<[^>]+>", "", x)) for x in o) > 34 else ""
        s += f'<div class="soru"><b>{q}</b><div class="sec{tek}">' + "".join(f"<span>{'ABCD'[i]}) {x}</span>" for i, x in enumerate(o)) + "</div></div>"
    s += "</div>"
    DY = getattr(M, "DY", [])
    if DY:
        s += (f'<h3>{M.DY_BASLIK}</h3>'
              + tablo(["#", "İfade", "D / Y"], [[str(i + 1), q, "☐ D &nbsp; ☐ Y"] for i, (q, _) in enumerate(DY)]))
    s += "</div>"
    s += '<h3>Cevap anahtarı</h3><div class="cevap">' + "".join(
        f"<p><b>{i + 1}-{'ABCD'[c]}</b> · {a}</p>" for i, (_, _, c, a) in enumerate(M.SORULAR)) + "</div>"
    if DY:
        s += '<p><b>Hızlı tur (D/Y):</b> ' + " · ".join(f"{i + 1}-{c}" for i, (_, c) in enumerate(DY)) + "</p>"
    if getattr(M, "DENE_CEVAP", None):
        s += '<h3>Kendini dene cevapları</h3><div class="cevap">' + "".join(f"<p>{x}</p>" for x in M.DENE_CEVAP) + "</div>"
    s += kutu("vurucu", "Sınav sabahı son 5 hatırlatma", ul(*M.SON5))
    return s


def yaz(M, cikti, o=1.0):
    doc = (f'<!doctype html><html lang="{getattr(M, "DIL", "tr")}" style="--o:{o}"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{M.BASLIK}</title>'
           f'<style>{css(M.KAPAK_AD)}</style></head><body>{kapak(M)}{M.govde()}{deneme(M)}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "express.html"; h.write_text(doc, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer",
                        f"--print-to-pdf={cikti}", h.as_uri()], check=True, capture_output=True)


def en_iyi_olcek(M, ham):
    en = None
    for o in [0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08]:
        yaz(M, ham, o); b = bosluklar(ham)
        puan = max(b[:-1]) * 3 + b[-1] if len(b) > 1 else b[0]
        print(f"  ölçek {o}: {len(b)} sayfa, en büyük ara boşluk %{round(100 * max(b[:-1] or [0]))}, son sayfa %{round(100 * b[-1])}")
        if en is None or puan < en[0]: en = (puan, o)
    return en[1]


def uret(kod):
    M = importlib.import_module(f"express_icerik.{kod}")
    cikti = KOK / "pdf" / f"{kod}-express.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    print(f"[{kod}] {M.BASLIK}")
    o = en_iyi_olcek(M, ham); print(f"  seçilen ölçek: {o}")
    yaz(M, ham, o)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": M.BASLIK, "/Author": YAZAR, "/Subject": f"Ders Rotası 6 · {M.AD} Express ders notu (deneme hazırlık)",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"  {cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
    return len(r.pages)


if __name__ == "__main__":
    if not CHROME: sys.exit("google-chrome bulunamadı")
    if len(sys.argv) < 2: sys.exit(__doc__)
    for k in (DERSLER if sys.argv[1] == "hepsi" else sys.argv[1:]):
        uret(k)
