#!/usr/bin/env python3
"""İngilizce 6 · 1. Tema (School Life) kara tahta ders notu PDF üreticisi · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/ing_tema_pdf.py      ->  pdf/ing-tema1.pdf (4 sayfa A4)
Her sayfa yazı ölçeğini otomatik ayarlar, sayfa dolu görünür.
Gereksinim: google-chrome ve pypdf. Yazı tipleri araclar/fontlar altında (SIL OFL).
"""
import html, subprocess, sys, tempfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from hap_pdf import CSS, FONT, YAZAR, CHROME, TEPSI, KOK, kart, sayfa_sayisi

EK_CSS = """
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
.kural b{color:#f7d95e}
.alt3{font-family:KL,PH,sans-serif;font-weight:700;font-size:15pt;color:#8ed1f2;margin-top:1mm}
.sert{display:flex;flex-direction:column;justify-content:center}
.sert>div{font-size:calc(10.4pt * var(--o,1));line-height:1.35}
b{color:#f7d95e}
"""

def TBL(baslik, satirlar):
    return ("<table>" + ("<tr>" + "".join(f"<th>{b}</th>" for b in baslik) + "</tr>" if baslik else "")
            + "".join("<tr>" + "".join(f"<td{' class=\"tr\"' if (i == len(r) - 1 and len(r) > 1) else ''}>{c}</td>" for i, c in enumerate(r)) + "</tr>" for r in satirlar) + "</table>")

def ul(maddeler):
    return "<ul>" + "".join(f"<li>{x}</li>" for x in maddeler) + "</ul>"

def tuzak(cifter):
    return '<div class="tuzak">' + "".join(f'<p><span class="y">{y}</span><br><span class="d">{d}</span></p>' for y, d in cifter) + "</div>"

def sert(etiket, metin):
    return f'<div class="sert"><span class="e">{etiket}</span><div>{metin}</div></div>'

# ---------------------------------------------------------------- İÇERİK
def sayfa1():
    k1 = kart("Roles at school (V1)", "sar", TBL(["English", "Ne yapar?", "Türkçe"], [
        ["<b>principal</b>", "manages the school", "okul müdürü"],
        ["<b>assistant principal</b>", "helps the principal", "müdür yardımcısı"],
        ["<b>school counsellor</b>", "listens, gives advice", "rehber öğretmen"],
        ["<b>librarian</b>", "takes care of the books", "kütüphaneci"],
        ["<b>caretaker</b>", "keeps the school clean, safe", "okul görevlisi"],
        ["<b>school nurse</b>", "helps sick students", "okul hemşiresi"],
        ["<b>class president</b>", "speaks for the class", "sınıf başkanı"],
        ["<b>student on duty</b>", "helps the teacher that day", "nöbetçi öğrenci"]]), "hap")
    k2 = kart("Responsibilities", "mav", '<div class="kural">I am <b>responsible for</b> the class library.<br>She <b>takes care of</b> the plants.</div>' + ul([
        "<b>clean the board</b> · tahtayı silmek", "<b>water the plants</b> · bitkileri sulamak",
        "<b>collect the notebooks</b> · defterleri toplamak", "<b>open the windows</b> · pencereleri açmak",
        "<b>follow the rules</b> · kurallara uymak", "<b>help classmates</b> · arkadaşlara yardım"]))
    k3 = kart("School routines", "pem", ul([
        "wake up → <b>catch the school bus</b> → <b>line up</b> → start lessons",
        "<b>flag ceremony</b>: Monday morning, Friday afternoon",
        "<b>sing the national anthem</b> · İstiklal Marşı'nı okumak",
        "have a break · <b>have lunch</b> · go to the club · finish school",
        "pack my bag · greet my teacher · do homework"]))
    k4 = kart("at · on · in", "tur", TBL(None, [
        ["<b>at</b>", "at 8.30 · at noon · at night"], ["<b>on</b>", "on Monday · on 29th October"],
        ["<b>in</b>", "in the morning · in October"], ["before / after", "before lunch · after school"]]))
    k5 = sert("YANLIŞ BİLİNEN", "Okul müdürü <b>principal</b> (principle değil). Sınıf başkanı <b>class president</b> (class head değil).")
    return ("WHO DOES WHAT?", "Kelime · Görevler ve okul rutinleri", "Herkesin bir<br>görevi var!", "responsible for<br>= -den sorumlu",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k12">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa2():
    k1 = kart("National days (V1)", "sar", TBL(["Tarih", "English", "Türkçe"], [
        ["29 Oct", "<b>Republic Day</b>", "Cumhuriyet Bayramı"],
        ["10 Nov", "<b>Atatürk Commemoration Day</b>", "Atatürk'ü Anma"],
        ["24 Nov", "<b>Teachers' Day</b>", "Öğretmenler Günü"],
        ["12 Mar", "<b>National Anthem Day</b>", "İstiklal Marşı'nın Kabulü"],
        ["18 Mar", "<b>Çanakkale Victory Day</b>", "Çanakkale Zaferi"],
        ["23 Apr", "<b>National Sovereignty and Children's Day</b>", "Ulusal Egemenlik ve Çocuk B."],
        ["19 May", "<b>Commemoration of Atatürk, Youth and Sports Day</b>", "Gençlik ve Spor B."],
        ["15 Jul", "<b>Democracy and National Unity Day</b>", "Demokrasi ve Millî Birlik"],
        ["30 Aug", "<b>Victory Day</b>", "Zafer Bayramı"]]), "hap")
    k2 = kart("Celebrations", "mav", ul([
        "<b>celebrate</b> · kutlamak", "<b>commemorate</b> · anmak", "<b>decorate</b> the classroom", "<b>wave</b> flags",
        "<b>recite</b> a poem", "<b>give</b> a speech", "perform a <b>folk dance</b>", "<b>stand in silence</b> · saygı duruşu"]))
    k3 = kart("Örnek paragraf", "pem", "<p>We celebrate <b>Republic Day</b> <b>on</b> 29th October. We decorate our classroom with flags. "
        "Students recite poems and sing the national anthem at the <b>ceremony</b>. I feel proud on this day.</p>")
    k4 = kart("Tuzağa düşme", "tur", tuzak([
        ["We celebrate 10th November.", "We commemorate Atatürk on 10th November."],
        ["in 29th October", "on 29th October (tarih → on)"]]))
    k5 = sert("SINAV İPUCU", "Gün adını <b>tarihiyle birlikte</b> ezberle: eşleştirme ve boşluk doldurmada ikisi birlikte sorulur.")
    return ("NATIONAL DAYS", "Kelime · Millî gün ve bayramlar", "Celebrate<br>= kutla", "Commemorate<br>= an",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k12">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa3():
    k1 = kart("Present simple (G1)", "sar", TBL(["Özne", "Olumlu", "Olumsuz", "Soru"], [
        ["I / You / We / They", "I <b>go</b>.", "I <b>don't</b> go.", "<b>Do</b> you go?"],
        ["He / She / It", "She <b>goes</b>.", "She <b>doesn't</b> go.", "<b>Does</b> she go?"]]) +
        '<div class="kural">doesn\'t / does\'tan sonra fiil <b>yalın</b>: She doesn\'t <b>go</b>.</div>', "hap")
    k2 = kart("-s · -es · -ies", "mav", TBL(None, [
        ["+ s", "play<b>s</b>, read<b>s</b>, clean<b>s</b>"], ["+ es", "go<b>es</b>, watch<b>es</b>, wash<b>es</b>, do<b>es</b>, fix<b>es</b>"],
        ["y → ies", "stud<b>ies</b>, tid<b>ies</b> (play → plays!)"], ["düzensiz", "have → <b>has</b>"]]))
    k3 = kart("Adverbs of frequency", "pem", TBL(None, [
        ["<b>always</b>", "100%"], ["<b>usually</b>", "90%"], ["<b>often</b>", "70%"], ["<b>sometimes</b>", "50%"], ["<b>rarely</b>", "10%"], ["<b>never</b>", "0%"]]) +
        '<div class="kural">I <b>always</b> pack my bag. · He is <b>never</b> late.</div>')
    k4 = kart("Object pronouns", "tur", TBL(None, [
        ["I → <b>me</b>", "you → <b>you</b>"], ["he → <b>him</b>", "she → <b>her</b>"], ["it → <b>it</b>", "we → <b>us</b>"], ["they → <b>them</b>", "the students → <b>them</b>"]]) +
        "<p>The teacher supports <b>them</b>. I clean <b>it</b>.</p>")
    k5 = sert("BÖYLE HATIRLA", "<b>He, she, it</b> → fiile <b>-s</b> · sıklık zarfı fiilden <b>önce</b>, <b>am / is / are</b>'dan <b>sonra</b>.")
    return ("GRAMMAR TIME", "Dil bilgisi · Present simple, sıklık, zamirler", "How often?<br>always … never", "-s takısını<br>unutma!",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k2">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa4():
    k1 = kart("Skimming (R2)", "sar", ul([
        "Metne <b>hızlıca</b> göz gezdir: başlık, görsel, ilk ve son cümle.",
        "Sor: Metin <b>ne hakkında</b>? <b>Ne tür</b>? <b>Amacı</b> ne?",
        "poster → etkinlik duyurur · timetable → programı gösterir",
        "diary → kişisel deneyim · e-mail → haber verir"]), "hap")
    k2 = kart("Careful reading (R3)", "mav", ul([
        "Önce <b>soruyu</b> oku, <b>anahtar kelimenin</b> altını çiz.",
        "<b>Who</b> kim · <b>What time</b> saat · <b>Where</b> yer · <b>When</b> zaman",
        "<b>How often</b> sıklık · <b>Why</b> → because…",
        "True / False: <b>mantıklıyı değil metinde yazanı</b> seç."]))
    k3 = kart("Writing (W4)", "pem", '<div class="kural">Giriş → Gelişme (saat + zarf + görev) → Sonuç (I love… because…)</div>' +
        "<p>My name is Emir. I'm the class librarian. I am <b>responsible for</b> our class library. I <b>usually</b> open it at lunch break. "
        "I <b>always</b> keep the shelves tidy. I love my role <b>because</b> I like books.</p>")
    k4 = kart("Kontrol listesi", "tur", ul([
        "5-6 cümle", "Büyük harf ve nokta", "He / she → fiil<b>-s</b>", "2 sıklık zarfı", "and · but · because", "Temanın kelimeleri"]))
    k5 = sert("SINAV İPUCU", "Yazma sorusunda verilen <b>her ipucunu</b> kullan; bitirince <b>-s</b>, zarf yeri ve noktalamayı kontrol et.")
    return ("READ & WRITE", "Okuma ve yazma · R2 · R3 · W4", "Skim first,<br>then read!", "Her ipucu<br>= puan",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

SAYFALAR = [sayfa1, sayfa2, sayfa3, sayfa4]

def sayfa_html(i, o):
    baslik, alt3, not_sol, not_sag, govde = SAYFALAR[i]()
    return (f'<section class="sayfa" style="--o:{o}"><div class="tahta"><div class="baslik">'
            f'<div class="not sol">{not_sol}</div><div class="not sag">{not_sag}</div>'
            f'<h1>{html.escape(baslik)}</h1><div class="alt3">{alt3}</div>'
            f'<span class="alt">İNGİLİZCE · 6. SINIF · 1. TEMA · SCHOOL LIFE</span></div>'
            f'<div class="icerik">{"".join(govde)}</div>'
            f'<div class="ayak"><span>{YAZAR}</span><span>İngilizce 6 · School Life · Sayfa {i + 1} / {len(SAYFALAR)}</span></div></div>'
            f'<div class="tepsi">{TEPSI}</div></section>')

def yaz(govde, ad, cikti):
    doc = (f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{html.escape(ad)}</title>'
           f'<style>{CSS % {"f": FONT.as_uri()}}{EK_CSS}</style></head><body>{govde}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "ing.html"; h.write_text(doc, encoding="utf-8")
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
    cikti = KOK / "pdf" / "ing-tema1.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    baslik = "İngilizce 6 · School Life · Ders Notu"
    yaz("".join(parcalar), baslik, ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": baslik, "/Author": YAZAR, "/Subject": "Ders Rotası 6 · İngilizce 1. Tema kara tahta ders notu",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
