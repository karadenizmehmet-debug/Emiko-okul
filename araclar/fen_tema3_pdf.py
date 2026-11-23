#!/usr/bin/env python3
"""Fen Bilimleri 6 · 3. Tema (Canlılarda Sistemler) kara tahta ders notu PDF üreticisi · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/fen_tema3_pdf.py   ->  pdf/fen-tema3.pdf (5 sayfa A4)
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
    k1 = kart("Üreme nedir? (FB.6.3.1)", "sar", ul([
        "<b>Üreme</b> = canlının kendine benzer yeni bireyler oluşturması → <b>neslin devamı</b>.",
        "<b>Eşeyli:</b> dişi + erkek üreme hücresi birleşir (<b>döllenme</b>). Yavru benzer ama <b>aynısı değil</b>.",
        "<b>Eşeysiz:</b> <b>tek ata</b> yeter, üreme hücresi yok. Yavru atasının <b>tıpatıp aynısı</b>.",
        "Eşeysiz üreme <b>hızlıdır</b>; kısa sürede çok birey oluşur."]), "hap")
    k2 = kart("Karşılaştır", "mav", TBL(["", "Eşeyli", "Eşeysiz"], [
        ["Ata sayısı", "iki", "bir"], ["Üreme hücresi", "var", "yok"], ["Yavru", "benzer", "aynısı"], ["Çeşitlilik", "var", "yok"]]))
    k3 = kart("Eşeysiz üremenin 4 yolu", "pem", TBL(["Çeşit", "Nasıl?", "Örnek"], [
        ["Bölünme", "tek hücreli ikiye ayrılır", "amip, bakteri, öglena"],
        ["Tomurcuklanma", "çıkıntı büyür, ayrılır", "bira mayası, hidra"],
        ["Vejetatif", "gövde, kök, yapraktan bitki", "patates, çilek, sardunya"],
        ["Rejenerasyon", "kopan parça yeni birey olur", "deniz yıldızı, planarya"]]))
    k4 = kart("Tuzağa düşme", "tur", tuzak([
        ["Kertenkele kuyruk yeniledi = üreme.", "Yeni birey yok → sadece onarım."],
        ["Tohumdan çıkan bitki eşeysizdir.", "Tohum döllenmeyle oluşur → eşeyli."],
        ["Çelikle çoğaltılan gül farklı renk açar.", "Atasının aynısı olur."]]))
    k5 = sert("SINAV İPUCU", "“<b>Aynısı / kopya</b>” görürsen eşeysiz, “<b>döllenme / iki ata</b>” görürsen eşeyli de.")
    return ("ÜREME ÇEŞİTLERİ", "1. Bölüm · Eşeyli ve eşeysiz üreme", "Neslin devamı<br>üremeyle!", "Tek ata = kopya<br>İki ata = karışım",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa2():
    k1 = kart("Çiçekli · çiçeksiz (FB.6.3.2)", "sar", ul([
        "<b>Çiçekli:</b> çiçek, meyve, <b>tohum</b> oluşturur → elma, buğday, gül, çam (kozalak).",
        "<b>Çiçeksiz:</b> <b>sporla</b> çoğalır → eğrelti otu, kara yosunu, at kuyruğu.",
        "Çiçek = bitkinin <b>üreme organı</b>."]), "hap")
    k2 = kart("Çiçeğin kısımları", "mav", TBL(None, [
        ["Taç yaprak", "renkli, kokulu → böcek çeker"], ["Çanak yaprak", "yeşil, tomurcuğu korur"],
        ["Erkek organ", "<b>başçık</b> + sapçık → çiçek tozu"], ["Dişi organ", "<b>tepecik</b>, dişicik borusu, <b>yumurtalık</b>"]]))
    k3 = kart("Tozlaşma → döllenme → tohum", "pem", '<div class="kural">başçık → <b>tozlaşma</b> → tepecik → dişicik borusu → <b>döllenme</b></div>' + TBL(None, [
        ["Yumurtalık", "→ <b>meyve</b>"], ["Döllenmiş yumurta", "→ <b>tohum</b>"]]) +
        "<p>Taşıyıcılar: <b>rüzgâr, su, böcek, kuş, insan</b>. Arılar azalırsa meyve azalır.</p>")
    k4 = kart("Çimlenme (FB.6.3.3)", "tur", ul([
        "Gerekenler: <b>su (nem)</b>, <b>uygun sıcaklık</b>, oksijen.",
        "<b>Işık gerekmez!</b> Ama fidenin <b>büyümesi</b> için ışık gerekir.",
        "Sıra: şişer → kabuk çatlar → <b>kökçük</b> → gövdecik → yaprak."]))
    k5 = kart("Deney değişkenleri", "sar", TBL(None, [
        ["Bağımsız", "bilerek <b>değiştirdiğin</b> (ıslak / kuru pamuk)"],
        ["Bağımlı", "<b>gözlediğin</b> sonuç (çimlendi mi?)"],
        ["Kontrol edilen", "<b>sabit</b> tuttukların (tohum türü, sayısı, kap, süre)"]]) + '<div class="kural">Adil deney: aynı anda <b>tek</b> şeyi değiştir!</div>')
    return ("BİTKİLERDE ÜREME", "Çiçek, tozlaşma, tohum ve çimlenme", "Arı = çiçeklerin<br>postacısı", "Tohum ışıksız da<br>uyanır!",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k12">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa3():
    k1 = kart("Hayvanlarda üreme (FB.6.3.4)", "sar", TBL(["Doğurarak", "Yumurtlayarak"], [
        ["yavru annede gelişir, sütle beslenir", "yavru yumurtada gelişir"],
        ["insan, inek, kedi, <b>yunus, balina, yarasa</b>", "tavuk, kaplumbağa, yılan, balık, kurbağa"]]), "hap")
    k2 = kart("Büyüme · gelişme", "mav", ul([
        "<b>Büyüme:</b> boy ve kütle artışı.",
        "<b>Gelişme:</b> yapı ve görevlerin olgunlaşması (yavru kedinin gözünü açması)."]))
    k3 = kart("Başkalaşım", "pem", TBL(["", "Tam", "Eksik"], [
        ["Evreler", "yumurta → larva → <b>pupa</b> → ergin", "yumurta → <b>nimf</b> → ergin"],
        ["Yavru", "ergine hiç benzemez", "benzer, küçük, kanatsız"],
        ["Örnek", "kelebek, ipek böceği, <b>kurbağa</b>, sivrisinek", "<b>çekirge</b>, hamam böceği"]]))
    k4 = kart("İnsanda üreme (FB.6.3.5)", "tur", TBL(None, [
        ["Erkek", "<b>testis</b> → <b>sperm</b> (hareketli, küçük)"],
        ["Kadın", "<b>yumurtalık</b> → <b>yumurta</b> (en büyük hücre)"],
        ["Rahim", "bebeğin geliştiği yer"]]) +
        "<p><b>Âdet döngüsü:</b> ~28 günde bir yumurta olgunlaşır; döllenme olmazsa rahim iç tabakası kanamayla atılır.</p>")
    k5 = kart("Döllenmeden doğuma", "sar", '<div class="kural">sperm + yumurta → <b>döllenme</b> → <b>zigot</b> (ilk hücre) → <b>embriyo</b> (ilk 8 hafta) → <b>fetüs</b> → doğum (~9 ay)</div>')
    return ("HAYVANLAR VE İNSAN", "Doğurma, yumurtlama, başkalaşım, insanda üreme", "Pupa varsa<br>tam başkalaşım", "Zigot → Embriyo<br>→ Fetüs (ZEF)",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa4():
    k1 = kart("Denetleyici-düzenleyici sistemler", "sar", ul([
        "Bütün sistemlerin <b>uyum içinde</b> çalışmasını sağlar.",
        "İki sistem: <b>sinir sistemi</b> + <b>iç salgı (endokrin) sistemi</b>.",
        "<b>Merkezî:</b> beyin, beyincik, omurilik soğanı, omurilik.",
        "<b>Çevresel:</b> bütün vücuda dağılan <b>sinirler</b> → haber taşır."]), "hap")
    k2 = kart("Kim ne yapar? (FB.6.3.6)", "mav", TBL(["Bölüm", "Görev"], [
        ["Beyin", "düşünme, öğrenme, hafıza, konuşma, istemli hareket"],
        ["Beyincik", "<b>denge</b>, hareket uyumu"],
        ["Omurilik soğanı", "kalp, solunum, yutkunma, öksürme, hapşırma"],
        ["Omurilik", "beyin-vücut iletişimi, <b>refleks</b> merkezi"]]))
    k3 = kart("Refleks", "pem", ul([
        "İstek dışı, <b>çok hızlı</b>, koruyucu tepki. <b>Doğuştandır</b>, öğrenilmez.",
        "Genellikle <b>omurilik</b> yönetir; beyin sonradan fark eder.",
        "Örnek: göz kırpma, sıcaktan el çekme, çiviye basınca ayak kaldırma, diz refleksi."]) +
        '<div class="kural">sıcak ütü → sinir → <b>omurilik</b> → kas → el çekilir</div>')
    k4 = kart("Tuzağa düşme", "tur", tuzak([
        ["Dengeyi omurilik soğanı sağlar.", "Denge = <b>beyincik</b>."],
        ["Bisiklet sürmek reflekstir.", "Öğrenilmiş <b>alışkanlıktır</b>."],
        ["Uykuda beyin her şeyi kapatır.", "Kalp ve solunum: <b>omurilik soğanı</b> çalışır."]]))
    k5 = sert("BENZETME", "Beyin <b>müdür odası</b>, sinirler <b>telefon hatları</b>, omurilik <b>acil servis</b>!")
    return ("SİNİR SİSTEMİ", "2. Bölüm · Denetleyici ve düzenleyici sistemler", "Beyincik =<br>denge ustası", "Refleks: önce yap,<br>sonra fark et",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k12">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa5():
    k1 = kart("İç salgı bezleri (FB.6.3.7)", "sar", TBL(["Bez", "Hormon", "Görev"], [
        ["Hipofiz", "büyüme hormonu", "büyüme; diğer bezleri <b>yönetir</b>"],
        ["Tiroit", "tiroksin", "metabolizma hızı, büyüme"],
        ["Böbrek üstü", "adrenalin", "korku, heyecan, tehlike"],
        ["Pankreas", "insülin / glukagon", "kan şekerini <b>düşür / yükselt</b>"],
        ["Eşeysel bezler", "eşeysel hormonlar", "ergenlik değişimleri"]]) +
        "<p><b>Hormon</b> = bezin doğrudan <b>kana</b> verdiği kimyasal haberci. Bezler <b>aile</b> gibi uyumlu çalışır; hipofiz ailenin büyüğüdür.</p>", "hap")
    k2 = kart("Ergenlik (FB.6.3.8)", "mav", TBL(["", "Değişim"], [
        ["Ortak", "boy uzaması, sivilce, terleme, kıllanma"],
        ["Kız", "göğüs gelişimi, âdet"],
        ["Erkek", "ses kalınlaşması, sakal-bıyık, omuz genişlemesi"],
        ["Ruhsal", "duygu dalgalanması, bağımsızlık, arkadaşa önem"]]) +
        "<p>Başlama yaşı <b>herkeste farklı</b>; bu normaldir.</p>")
    k3 = kart("Sağlıklı yaşam", "pem", ul([
        "Dengeli beslen, <b>iyotlu tuz</b>, az şeker.",
        "<b>9-10 saat uyku</b>: büyüme hormonu uykuda salgılanır.",
        "Her gün yıkan, hareket et, ekranı sınırla.",
        "<b>Kask</b> ve <b>emniyet kemeri</b> beyni korur; sigara-alkolden uzak dur."]))
    k4 = kart("Güvenilir bilgi (FB.6.3.9)", "tur", '<div class="kural">soru → <b>güvenilir kaynak</b> → başka kaynakla <b>doğrula</b> → kaynağı yazarak <b>kaydet</b></div>' + TBL(None, [
        ["Güvenilir", "Sağlık Bakanlığı, ders kitabı, doktor, öğretmen"],
        ["Güvenilmez", "yazarı belirsiz paylaşım, reklam, zincir mesaj"]]))
    k5 = sert("SINAV İPUCU", "Kan şekeri = <b>pankreas</b> · Heyecan = <b>adrenalin</b> · Büyüme = <b>hipofiz</b> · Metabolizma = <b>tiroit</b>.")
    return ("HORMONLAR VE ERGENLİK", "İç salgı bezleri, ergenlik ve sistemlerin sağlığı", "Hormon = kanla<br>giden mektup", "Çok paylaşılan ≠<br>doğru bilgi",
            [f'<div class="satir k1">{k1}</div>', f'<div class="satir k2">{k2}{k3}</div>', f'<div class="satir k1">{k4}</div>', f'<div class="satir k1">{k5}</div>'])

SAYFALAR = [sayfa1, sayfa2, sayfa3, sayfa4, sayfa5]

def sayfa_html(i, o):
    baslik, alt3, not_sol, not_sag, govde = SAYFALAR[i]()
    return (f'<section class="sayfa" style="--o:{o}"><div class="tahta"><div class="baslik">'
            f'<div class="not sol">{not_sol}</div><div class="not sag">{not_sag}</div>'
            f'<h1>{html.escape(baslik)}</h1><div class="alt3">{alt3}</div>'
            f'<span class="alt">FEN BİLİMLERİ · 6. SINIF · 3. TEMA · CANLILARDA SİSTEMLER</span></div>'
            f'<div class="icerik">{"".join(govde)}</div>'
            f'<div class="ayak"><span>{YAZAR}</span><span>Fen 6 · Canlılarda Sistemler · Sayfa {i + 1} / {len(SAYFALAR)}</span></div></div>'
            f'<div class="tepsi">{TEPSI}</div></section>')

def yaz(govde, ad, cikti):
    doc = (f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{html.escape(ad)}</title>'
           f'<style>{CSS % {"f": FONT.as_uri()}}{EK_CSS}</style></head><body>{govde}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "fen.html"; h.write_text(doc, encoding="utf-8")
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
    cikti = KOK / "pdf" / "fen-tema3.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    baslik = "Fen Bilimleri 6 · Canlılarda Sistemler · Ders Notu"
    yaz("".join(parcalar), baslik, ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": baslik, "/Author": YAZAR, "/Subject": "Ders Rotası 6 · Fen Bilimleri 3. Tema kara tahta ders notu",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
