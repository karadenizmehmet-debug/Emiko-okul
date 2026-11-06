#!/usr/bin/env python3
"""Arapça 6 · 1. Tema (Günlük Hayat 1) kara tahta PDF üreticisi · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/ar_tema_pdf.py      ->  pdf/ar-tema1.pdf (4 sayfa A4)
Her sayfa yazı ölçeğini otomatik ayarlar, sayfa dolu görünür.
Gereksinim: google-chrome ve pypdf. Yazı tipleri araclar/fontlar altında (SIL OFL).
"""
import html, subprocess, sys, tempfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from hap_pdf import CSS, FONT, YAZAR, CHROME, TEPSI, KOK, kart, sayfa_sayisi, ar_okunus

def ar(s):
    return f'<span class="ab">{s}</span> <span class="ar-pron">({ar_okunus(s)})</span>'

EK_CSS = """
@font-face{font-family:"NA";font-weight:400;src:url("%(f)s/noto-naskh-arabic-arabic-400-normal.woff2")}
@font-face{font-family:"NA";font-weight:700;src:url("%(f)s/noto-naskh-arabic-arabic-700-normal.woff2")}
.ab{font-family:NA,"DejaVu Sans",serif;direction:rtl;unicode-bidi:isolate;font-size:1.42em;line-height:1.35;color:#f7d95e;font-weight:700}
td .ab,li .ab,p .ab{white-space:nowrap}
.arbas{font-family:NA,serif;direction:rtl;font-size:19pt;font-weight:700;color:#f7d95e;line-height:1.3;margin-top:1.2mm}
.icerik{flex:1;display:flex;flex-direction:column;gap:3.6mm;justify-content:space-between;min-height:0}
.satir{display:grid;gap:3.2mm;flex:1 1 auto;align-items:stretch}
.satir.k2{grid-template-columns:1fr 1fr}.satir.k12{grid-template-columns:1.25fr 1fr}.satir.k1{grid-template-columns:1fr}.satir.k21{grid-template-columns:1fr 1.25fr}
.kart{display:flex;flex-direction:column;justify-content:space-evenly}
.kart ul{height:auto;flex:1;justify-content:space-evenly}
.kart li{font-size:calc(10.2pt * var(--o,1));line-height:1.25}
.kart p{font-size:calc(10.2pt * var(--o,1));line-height:1.3;margin:.6mm 0}
table{font-size:calc(10pt * var(--o,1))}
td:first-child{color:#f5f2e7;white-space:normal}
td.tr{color:#9be39b;white-space:normal}
.kural{font-family:KL,PH,sans-serif;font-weight:700;font-size:calc(11pt * var(--o,1));text-align:center;color:#f5f2e7;line-height:1.35}
.kural .ab{font-size:1.25em}
.tuzak .y .ab,.tuzak .d .ab{font-size:1.2em}
.sayfa{font-size:calc(10.2pt * var(--o,1))}
.sert{display:flex;flex-direction:column;justify-content:center}
.sert>div{font-size:calc(10.4pt * var(--o,1));line-height:1.35}
"""

TBL = lambda baslik, satirlar, sinif="": (
    "<table>" + ("<tr>" + "".join(f"<th>{b}</th>" for b in baslik) + "</tr>" if baslik else "")
    + "".join("<tr>" + "".join(f"<td{' class=\"tr\"' if (i == len(r) - 1 and len(r) > 1 and not sinif) else ''}>{c}</td>" for i, c in enumerate(r)) + "</tr>" for r in satirlar) + "</table>")

def ul(maddeler):
    return "<ul>" + "".join(f"<li>{x}</li>" for x in maddeler) + "</ul>"

def tuzak(cifter):
    return '<div class="tuzak">' + "".join(f'<p><span class="y">{y}</span><br><span class="d">{d}</span></p>' for y, d in cifter) + "</div>"

def sert(etiket, metin, stil=""):
    return f'<div class="sert" style="{stil}"><span class="e">{etiket}</span><div>{metin}</div></div>'

# ---------------------------------------------------------------- İÇERİK
MU = ar("مُـ")
NI = ar("ـِيّ")
FA = ar("فَعَّال")
FE = ar("فَاعِل")
DI = ar("فَعِيل")
MESLEKLER = [
    ("مُعَلِّمٌ", "مُعَلِّمَةٌ", "öğretmen", MU),
    ("طَبِيبٌ", "طَبِيبَةٌ", "doktor", DI),
    ("مُمَرِّضٌ", "مُمَرِّضَةٌ", "hemşire", MU),
    ("مُهَنْدِسٌ", "مُهَنْدِسَةٌ", "mühendis", MU),
    ("مُحَامٍ", "مُحَامِيَةٌ", "avukat", MU),
    ("شُرْطِيٌّ", "شُرْطِيَّةٌ", "polis", NI),
    ("جُنْدِيٌّ", "جُنْدِيَّةٌ", "asker", NI),
    ("طَبَّاخٌ", "طَبَّاخَةٌ", "aşçı", FA),
    ("نَجَّارٌ", "نَجَّارَةٌ", "marangoz", FA),
    ("خَبَّازٌ", "خَبَّازَةٌ", "fırıncı", FA),
    ("خَيَّاطٌ", "خَيَّاطَةٌ", "terzi", FA),
    ("فَلَّاحٌ", "فَلَّاحَةٌ", "çiftçi", FA),
    ("سَائِقٌ", "سَائِقَةٌ", "şoför", FE),
    ("بَائِعٌ", "بَائِعَةٌ", "satıcı", FE),
]

def sayfa1():
    k1 = kart("Ailem · " + "أُسْرَتِي", "sar", ul([
        f'{ar("أُسْرَةٌ")} ya da {ar("عَائِلَةٌ")}: aile',
        f'{ar("أَقَارِبُ")}: akrabalar (tek: {ar("قَرِيبٌ")})',
        f'{ar("أَبٌ")} baba · {ar("أُمٌّ")} anne',
        f'{ar("أَخٌ")} erkek kardeş, ağabey · {ar("أُخْتٌ")} kız kardeş, abla',
        f'{ar("جَدٌّ")} dede · {ar("جَدَّةٌ")} nine, büyükanne',
        f'{ar("اِبْنٌ")} oğul · {ar("بِنْتٌ")} kız · {ar("حَفِيدٌ")} torun']), "hap")
    k2 = kart("Geniş aile", "mav", TBL(["Taraf", "Erkek", "Kadın"], [
        ["Baba tarafı", f'{ar("عَمٌّ")} amca', f'{ar("عَمَّةٌ")} hala'],
        ["Anne tarafı", f'{ar("خَالٌ")} dayı', f'{ar("خَالَةٌ")} teyze']]) +
        f'<div class="kural" style="margin-top:2mm">Baba tarafı = {ar("عَمٌّ")} · {ar("عَمَّةٌ")}<br>Anne tarafı = {ar("خَالٌ")} · {ar("خَالَةٌ")}</div>')
    k3 = kart("Kuzenler", "pem", TBL(None, [
        [ar("اِبْنُ العَمِّ"), "amca oğlu"], [ar("اِبْنَةُ العَمَّةِ"), "hala kızı"],
        [ar("اِبْنُ الخَالِ"), "dayı oğlu"], [ar("اِبْنَةُ الخَالَةِ"), "teyze kızı"]]) +
        "<p>Türkçedeki gibi: “önce oğlu / kızı, sonra akraba”.</p>")
    k4 = kart("Yanlış bilinen", "tur", tuzak([
        ("Amca ile dayıya Arapçada aynı kelime denir.", f'Amca {ar("عَمٌّ")} (baba tarafı), dayı {ar("خَالٌ")} (anne tarafı).'),
        (f'{ar("أَخٌ")} kelimesinin dişili {ar("أَخَةٌ")}’dir.', f'Dişili {ar("أُخْتٌ")}’tür. Düzensiz bir kelimedir.')]))
    k5 = kart("Din Kültürü bağlantısı", "yes", f'<p>{ar("صِلَةُ الرَّحِمِ")}: akrabalık bağını sürdürmek, akrabaları ziyaret edip hâl hatır sormak. Bayramlarda akraba ziyareti bu güzel âdetin bir parçasıdır.</p>')
    k6 = sert("BÖYLE HATIRLA", f'Baba tarafı {ar("عَمٌّ")} · {ar("عَمَّةٌ")}, anne tarafı {ar("خَالٌ")} · {ar("خَالَةٌ")}. Dişil sona {ar("ـَةٌ")} alır.')
    return ("AİLE VE AKRABALARIM", ar("أُسْرَتِي وَأَقَارِبِي"), "Ailemi Arapça<br>tanıtıyorum!", "Akrabalar =<br>أَقَارِبُ",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k2">{k3}{k4}</div>', f'<div class="satir k21">{k5}{k6}</div>'])

def sayfa2():
    kelimeler = [("أَبٌ", "أَبِي", "babam"), ("أُمٌّ", "أُمِّي", "annem"), ("جَدٌّ", "جَدِّي", "dedem"), ("جَدَّةٌ", "جَدَّتِي", "ninem"),
                 ("عَمٌّ", "عَمِّي", "amcam"), ("عَمَّةٌ", "عَمَّتِي", "halam"), ("خَالٌ", "خَالِي", "dayım"), ("خَالَةٌ", "خَالَتِي", "teyzem"),
                 ("أَخٌ", "أَخِي", "ağabeyim"), ("أُخْتٌ", "أُخْتِي", "ablam")]
    k1 = kart("Benim = " + "ـِي", "sar", TBL(["Kelime", "Benim", "Türkçe"], [[ar(a), ar(b), c] for a, b, c in kelimeler]))
    k2 = kart("Dikkat", "pem", ul([
        f'Tenvin düşer: {ar("عَمٌّ")} → {ar("عَمِّي")}',
        f'{ar("ة")} harfi {ar("ت")} olur: {ar("جَدَّةٌ")} → {ar("جَدَّتِي")}',
        f'Baba: {ar("أَبٌ")} → {ar("أَبِي")}']))
    k3 = kart("Bu kim? Bu …", "mav",
        f'<div class="kural">Erkek: {ar("هَذَا")} · Kadın: {ar("هَذِهِ")}<br>{ar("مَنْ هَذَا؟")} · {ar("مَنْ هَذِهِ؟")}</div>' +
        TBL(None, [[ar("هَذَا جَدِّي."), "Bu dedem."], [ar("هَذِهِ جَدَّتِي."), "Bu ninem."], [ar("هَذَا عَمِّي."), "Bu amcam."], [ar("هَذِهِ خَالَتِي."), "Bu teyzem."]]))
    k4 = kart("Fotoğraf albümü diyaloğu", "tur", TBL(None, [
        [ar("زَيْنَبُ: مَنْ هَذَا؟"), "Bu kim?"], [ar("أَحْمَدُ: هَذَا جَدِّي."), "Bu dedem."],
        [ar("زَيْنَبُ: وَمَنْ هَذِهِ؟"), "Peki bu kim?"], [ar("أَحْمَدُ: هَذِهِ خَالَتِي."), "Bu teyzem."]]))
    k5 = kart("Bende var · " + "عِنْدِي", "yes", TBL(None, [
        [ar("عِنْدِي عَمٌّ وَعَمَّةٌ."), "Bir amcam ve bir halam var."], [ar("هَلْ عِنْدَكَ عَمٌّ؟"), "Senin amcan var mı?"],
        [ar("نَعَمْ، عِنْدِي عَمٌّ."), "Evet, amcam var."], [ar("لَا، لَيْسَ عِنْدِي عَمٌّ."), "Hayır, amcam yok."]]))
    k6 = f'<div class="sert"><span class="e">SINAV İPUCU</span><div>Cümlede kadın akraba varsa {ar("هَذِهِ")}, erkek akraba varsa {ar("هَذَا")} yaz. Yanlış: {ar("هَذِهِ جَدِّي.")}</div></div>'
    return ("BENİM · BU · BENDE VAR", ar("هَذَا جَدِّي، وَهَذِهِ جَدَّتِي"), "Kim bu?<br>Tanıtıyorum!", "Benim = sona<br>ـِي",
            [f'<div class="satir k12">{k1}<div style="display:flex;flex-direction:column;gap:3.2mm">{k2}{k3}</div></div>', f'<div class="satir k2">{k4}{k5}</div>', f'<div class="satir k1">{k6}</div>'])

def sayfa3():
    sat = [[ar(e), ar(k), t, p] for e, k, t, p in MESLEKLER]
    k1 = kart("Meslekler · " + "المِهَنُ", "sar", TBL(["Erkek", "Kadın (+ ة)", "Türkçe", "Kalıp"], sat))
    k2 = kart("Kalıplar", "mav", ul([
        f'{ar("مُـ")} ile başlar: {ar("مُعَلِّمٌ، مُمَرِّضٌ، مُهَنْدِسٌ، مُحَامٍ")}',
        f'Ortası şeddeli {ar("فَعَّال")}: {ar("طَبَّاخٌ، نَجَّارٌ، خَبَّازٌ، خَيَّاطٌ، فَلَّاحٌ")}',
        f'{ar("فَاعِل")}: {ar("سَائِقٌ، بَائِعٌ")}',
        f'{ar("ـِيّ")} ile biter: {ar("شُرْطِيٌّ، جُنْدِيٌّ")}']))
    k3 = kart("Kadın meslek sahibi", "pem", f'<p>Erkek biçiminin sonuna {ar("ـَةٌ")} gelir.</p><div class="kural">{ar("مُعَلِّمٌ")} → {ar("مُعَلِّمَةٌ")}<br>{ar("شُرْطِيٌّ")} → {ar("شُرْطِيَّةٌ")}</div>')
    k4 = kart("Yanlış bilinen", "tur", tuzak([
        ("Bazı meslekler sadece erkeklere aittir.", f'Her mesleğin kadın biçimi vardır: {ar("طَبِيبَةٌ")}, {ar("مُهَنْدِسَةٌ")}.')]))
    k5 = sert("BÖYLE HATIRLA", f'Meslek = {ar("مِهْنَةٌ")} (çoğul {ar("مِهَنٌ")}). Zanaat mesleklerinde ortadaki harf şeddelidir: {ar("طَبَّاخٌ، نَجَّارٌ، خَبَّازٌ")}.')
    return ("MESLEKLER", ar("المِهَنُ"), "14 mesleği<br>öğreniyorum!", "Meslek =<br>مِهْنَةٌ",
            [f'<div class="satir k1">{k1}</div>', f'<div class="satir k2">{k2}<div style="display:flex;flex-direction:column;gap:3.2mm">{k3}{k4}</div></div>', f'<div class="satir k1">{k5}</div>'])

def sayfa4():
    k1 = kart("Mesleği sor", "sar", TBL(None, [
        [ar("مَا مِهْنَةُ أَبِيكَ؟"), "Babanın mesleği ne?"], [ar("أَبِي طَبِيبٌ."), "Babam doktor."],
        [ar("وَمَا مِهْنَةُ أُمِّكَ؟"), "Peki annenin mesleği ne?"], [ar("أُمِّي مُعَلِّمَةٌ."), "Annem öğretmen."]]) +
        f'<p>Erkeğe {ar("ـكَ")} ({ar("أَبِيكَ")}), kıza {ar("ـكِ")} ({ar("أَبِيكِ")}).</p>')
    k2 = kart("O ve onun", "mav", TBL(None, [
        [ar("مَنْ هَذَا؟ هَذَا عَمِّي."), "Bu kim? Bu amcam."], [ar("مَا مِهْنَتُهُ؟ هُوَ مُهَنْدِسٌ."), "Mesleği ne? O mühendis."],
        [ar("مَنْ هَذِهِ؟ هَذِهِ عَمَّتِي."), "Bu kim? Bu halam."], [ar("مَا مِهْنَتُهَا؟ هِيَ مُمَرِّضَةٌ."), "Mesleği ne? O hemşire."]]) +
        f'<p>{ar("هُوَ")} o (erkek) · {ar("هِيَ")} o (kadın)</p>')
    k3 = kart("Nerede çalışıyor? " + "يَعْمَلُ … فِي …", "pem", TBL(None, [
        [ar("يَعْمَلُ الطَّبِيبُ فِي المُسْتَشْفَى."), "Doktor hastanede çalışır."],
        [ar("يَعْمَلُ المُعَلِّمُ فِي المَدْرَسَةِ."), "Öğretmen okulda çalışır."],
        [ar("يَعْمَلُ الخَبَّازُ فِي المَخْبَزِ."), "Fırıncı fırında çalışır."],
        [ar("يَعْمَلُ الفَلَّاحُ فِي المَزْرَعَةِ."), "Çiftçi çiftlikte çalışır."],
        [ar("يَعْمَلُ الطَّبَّاخُ فِي المَطْعَمِ."), "Aşçı restoranda çalışır."],
        [ar("يَعْمَلُ النَّجَّارُ فِي الوَرْشَةِ."), "Marangoz atölyede çalışır."]]) +
        f'<p>Soru: {ar("أَيْنَ يَعْمَلُ عَمُّكَ؟")} Amcan nerede çalışıyor?</p>')
    k4 = kart("Cümle kur: akraba + meslek", "tur", TBL(None, [
        [ar("عَمِّي مُهَنْدِسٌ."), "Amcam mühendis."], [ar("عَمَّتِي مُهَنْدِسَةٌ."), "Halam mühendis."],
        [ar("خَالِي سَائِقٌ."), "Dayım şoför."], [ar("خَالَتِي طَبِيبَةٌ."), "Teyzem doktor."]]) +
        "<p>Akraba kadınsa meslek adı da kadın biçiminde olur.</p>")
    k5 = sert("BÖYLE HATIRLA", f'Meslek sor: {ar("مَا مِهْنَةُ أَبِيكَ؟")}<br>Meslek söyle: {ar("أَبِي طَبِيبٌ.")}<br>Yer söyle: {ar("يَعْمَلُ الطَّبِيبُ فِي المُسْتَشْفَى.")}')
    return ("MESLEK KONUŞMASI", ar("مَا مِهْنَةُ أَبِيكَ؟"), "Meslekleri<br>konuşuyorum!", "Kadın akraba =<br>kadın meslek",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k1">{k3}</div>', f'<div class="satir k21">{k4}{k5}</div>'])

SAYFALAR = [sayfa1, sayfa2, sayfa3, sayfa4]

def sayfa_html(i, o):
    baslik, arb, not_sol, not_sag, govde = SAYFALAR[i]()
    return (f'<section class="sayfa" style="--o:{o}"><div class="tahta"><div class="baslik">'
            f'<div class="not sol">{not_sol}</div><div class="not sag">{not_sag}</div>'
            f'<h1>{html.escape(baslik)}</h1><div class="arbas">{arb}</div>'
            f'<span class="alt">ARAPÇA · 6. SINIF · 1. TEMA · GÜNLÜK HAYAT 1</span></div>'
            f'<div class="icerik">{"".join(govde)}</div>'
            f'<div class="ayak"><span>{YAZAR}</span><span>Arapça 6 · Günlük Hayat 1 · Sayfa {i + 1} / {len(SAYFALAR)}</span></div></div>'
            f'<div class="tepsi">{TEPSI}</div></section>')

def yaz(govde, ad, cikti):
    doc = (f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{html.escape(ad)}</title>'
           f'<style>{CSS % {"f": FONT.as_uri()}}{EK_CSS % {"f": FONT.as_uri()}}</style></head><body>{govde}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "ar.html"; h.write_text(doc, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer",
                        f"--print-to-pdf={cikti}", h.as_uri()], check=True, capture_output=True)

def sigdir(i):
    alt, ust, iyi = 0.6, 1.9, 0.6
    with tempfile.TemporaryDirectory() as tmp:
        d = Path(tmp) / "d.pdf"
        for _ in range(7):
            orta = round((alt + ust) / 2, 3)
            yaz(sayfa_html(i, orta), "deneme", d)
            if sayfa_sayisi(d) <= 1: iyi, alt = orta, orta
            else: ust = orta
    return iyi

if __name__ == "__main__":
    if not CHROME: sys.exit("google-chrome bulunamadı")
    parcalar = []
    for i in range(len(SAYFALAR)):
        o = sigdir(i); print(f"  sayfa {i + 1}: yazı ölçeği {o}"); parcalar.append(sayfa_html(i, o))
    cikti = KOK / "pdf" / "ar-tema1.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    yaz("".join(parcalar), "Arapça 6 · Günlük Hayat 1 · Kara Tahta", ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": "Arapça 6 · Günlük Hayat 1 · Kara Tahta", "/Author": YAZAR, "/Subject": "Ders Rotası 6 · Arapça 1. Tema kara tahta notları",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
