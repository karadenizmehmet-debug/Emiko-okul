#!/usr/bin/env python3
"""Din Kültürü 6 · 1. Ünite (Peygamber ve İlahi Kitap İnancı) kara tahta ders notu PDF üreticisi · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/din_tema_pdf.py     ->  pdf/din-tema1.pdf (3 sayfa A4)
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
    k1 = kart("Vahiy nedir?", "sar", ul([
        "<b>Sözlük:</b> gizlice ve hızlıca bildirmek, işaret etmek.",
        "<b>Terim:</b> Allah'ın dilediği bilgileri <b>peygamberlerine</b> özel bir yolla bildirmesi.",
        "Kaynak <b>Allah</b> · getiren <b>Cebrail</b> · alan <b>peygamber</b>.",
        "Peygamber vahyi değiştirmeden ulaştırır: <b>tebliğ</b>.",
        "Son vahiy <b>Kur'an</b>, son peygamber <b>Hz. Muhammed</b>."]), "hap")
    k2 = kart("Vahiy mi, ilham mı?", "mav", TBL(["", "Vahiy", "İlham"], [
        ["Kime?", "yalnızca peygamber", "herkes"], ["Kesin mi?", "kesin", "yanılabilir"], ["Bağlayıcı?", "herkese yol gösterir", "sadece o kişi"]]) +
        "<p>Arıya ve Hz. Musa'nın annesine “vahiy” = <b>sözlük anlamı</b> (içgüdü, ilham).</p>")
    k3 = kart("Vahyin 3 geliş yolu", "pem", TBL(["Yol", "Örnek"], [
        ["Sadık rüya", "Hz. İbrahim'in kurban rüyası"],
        ["Melek (Cebrail) ile", "Hira, Alak 1-5 · Kur'an'ın tamamı"],
        ["Perde arkasından", "Hz. Musa, Tur Dağı (Kelîmullah)"]]) +
        '<div class="kural">İlk vahiy: <b>610 · Kadir Gecesi · Hira · Alak 1-5</b></div>')
    k4 = kart("Vahiy neden geldi? (DKAB.6.1.2)", "tur", ul([
        "Allah'ı tanıtmak, birliğini bildirmek (<b>tevhid</b>).",
        "<b>Doğru yolu</b> göstermek: iyi-kötü, helal-haram.",
        "<b>Güzel ahlakı</b> yerleştirmek.", "<b>Adaleti</b> ayakta tutmak.",
        "<b>Dünya ve ahiret</b> mutluluğu.", "Aklın bilemeyeceğini (<b>gayb</b>) bildirmek."]))
    k5 = kart("Ayetlerde vahyin amacı", "yes", TBL(None, [
        ["Nahl 36", "“Allah'a kulluk edin, putlardan kaçının.” → <b>tevhid</b>"],
        ["Nisa 165", "Müjdeleyici ve uyarıcı; bahane kalmasın → <b>sorumluluk</b>"],
        ["Hadid 25", "Adaleti ayakta tutsunlar → <b>adalet</b>"]]))
    return ("VAHİY", "Peygamberlerin ilettiği mesaj · 3 soru", "Akıl yürür,<br>vahiy yön gösterir!", "Kaynak Allah,<br>alıcı peygamber",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa2():
    k1 = kart("İlahi kitaplar (DKAB.6.1.3)", "sar", TBL(["Kitap", "Peygamber", "Dil", "Öne çıkan"], [
        ["Tevrat", "Hz. Musa", "İbranice", "kanun, hükümler, On Emir"],
        ["Zebur", "Hz. Davud", "İbranice", "dua, öğüt, ilahiler"],
        ["İncil", "Hz. İsa", "Aramice", "müjde, sevgi, merhamet"],
        ["Kur'an-ı Kerim", "Hz. Muhammed", "Arapça", "son, evrensel, korunmuş"]]) +
        '<div class="kural">Sıra: <b>Tevrat → Zebur → İncil → Kur\'an</b></div>', "hap")
    k2 = kart("Suhuf = sayfalar", "mav", TBL(None, [["Hz. Âdem", "10"], ["Hz. Şit", "50"], ["Hz. İdris", "30"], ["Hz. İbrahim", "10"]]) +
        "<p>Her peygambere <b>kitap verilmedi</b>; diğerleri önceki kitabı tebliğ etti.</p>")
    k3 = kart("Ortak mesaj", "pem", ul([
        "Allah'ın <b>birliği</b>", "<b>Ahiret</b> inancı", "<b>İbadet</b> ve dua", "<b>Güzel ahlak</b>, adalet",
        "Müslüman <b>bütün kitaplara</b> iman eder (Bakara 285)."]))
    k4 = kart("Kur'an-ı Kerim kimliği", "tur", TBL(None, [
        ["İniş", "610-632 · <b>23 yıl</b>, parça parça"], ["Bölüm", "<b>114 sure</b> · 30 cüz"],
        ["İlk / son sure", "Fatiha / Nas"], ["Toplandı", "<b>Hz. Ebu Bekir</b> · Mushaf"],
        ["Çoğaltıldı", "<b>Hz. Osman</b>"], ["Koruma", "Hicr 9: “Koruyucusu biziz.”"]]))
    k5 = kart("Tuzağa düşme", "yes", tuzak([
        ["Kur'an bir gecede indi.", "Kadir Gecesi başladı, 23 yılda tamamlandı."],
        ["Önceki kitaplar bugün de aynen duruyor.", "Zamanla aslından uzaklaştı; Kur'an korundu."]]))
    return ("İLAHİ KİTAPLAR", "Kitaplar ve suhuf · 2 soru", "Kaynak bir,<br>mesaj bir!", "Musa-Tevrat<br>Davud-Zebur",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k12">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa3():
    ar = ('<div class="ab" style="display:block;text-align:center;font-size:calc(17pt * var(--o,1));line-height:1.9">'
          'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ</div>')
    k1 = kart("Felak suresi (DKAB.6.1.4)", "sar", ar + TBL(["", "Okunuşu", "Anlamı"], [
        ["1", "Kul e'ûzü bi rabbil felak.", "De ki: Sabahın Rabbine sığınırım,"],
        ["2", "Min şerri mâ halak.", "Yarattığı şeylerin kötülüğünden,"],
        ["3", "Ve min şerri ğâsikın izâ vekab.", "Karanlığı çöktüğü zaman gecenin kötülüğünden,"],
        ["4", "Ve min şerrin neffâsâti fil'ukad.", "Düğümlere üfleyenlerin kötülüğünden,"],
        ["5", "Ve min şerri hâsidin izâ hased.", "Ve haset ettiği zaman hasetçinin kötülüğünden."]]), "hap")
    k2 = kart("Kimlik kartı", "mav", ul([
        "<b>Felak</b> = sabah aydınlığı, tan yeri.", "<b>113.</b> sure · <b>5</b> ayet · Mekke dönemi.",
        "Felak + Nas = <b>Muavvizeteyn</b> (sığınma sureleri).",
        "Peygamberimiz yatmadan İhlas, Felak, Nas okurdu."]))
    k3 = kart("Ne öğretir?", "pem", ul([
        "Her kötülüğe karşı <b>Allah'a sığınmak</b> (istiaze).", "<b>Tedbir + dua</b> = tevekkül.",
        "“Deveni bağla, sonra tevekkül et.”", "<b>Haset</b> etmemek, hasetten korunmak."]))
    k4 = kart("Haset mi, gıpta mı?", "tur", TBL(["Haset", "Gıpta"], [
        ["nimetin <b>yok olmasını</b> ister", "<b>bende de olsun</b> ister"],
        ["“Keşke bisikleti bozulsa.”", "“Ben de çalışıp alayım.”"], ["kötü huy", "çalışmaya teşvik"]]))
    k5 = sert("SINAV İPUCU", "Felak sorusunda <b>dört kötülüğü</b> say: yaratılanlar · karanlık gece · düğümlere üfleyenler · hasetçi.")
    return ("FELAK SURESİ", "Bir sure öğreniyorum · 1 soru", "Sabahın Rabbine<br>sığınırım!", "Tedbir al,<br>dua et",
            [f'<div class="satir k1">{k1}</div>', f'<div class="satir k2">{k2}{k3}</div>', f'<div class="satir k12">{k4}{k5}</div>'])

SAYFALAR = [sayfa1, sayfa2, sayfa3]

def sayfa_html(i, o):
    baslik, alt3, not_sol, not_sag, govde = SAYFALAR[i]()
    return (f'<section class="sayfa" style="--o:{o}"><div class="tahta"><div class="baslik">'
            f'<div class="not sol">{not_sol}</div><div class="not sag">{not_sag}</div>'
            f'<h1>{html.escape(baslik)}</h1><div class="alt3">{alt3}</div>'
            f'<span class="alt">DİN KÜLTÜRÜ VE AHLAK BİLGİSİ · 6. SINIF · 1. ÜNİTE · SENARYO 2</span></div>'
            f'<div class="icerik">{"".join(govde)}</div>'
            f'<div class="ayak"><span>{YAZAR}</span><span>Din Kültürü 6 · Peygamber ve İlahi Kitap İnancı · Sayfa {i + 1} / {len(SAYFALAR)}</span></div></div>'
            f'<div class="tepsi">{TEPSI}</div></section>')

def yaz(govde, ad, cikti):
    doc = (f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{html.escape(ad)}</title>'
           f'<style>{CSS % {"f": FONT.as_uri()}}{EK_CSS}</style></head><body>{govde}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "din.html"; h.write_text(doc, encoding="utf-8")
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
    cikti = KOK / "pdf" / "din-tema1.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    baslik = "Din Kültürü 6 · Peygamber ve İlahi Kitap İnancı · Ders Notu"
    yaz("".join(parcalar), baslik, ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": baslik, "/Author": YAZAR, "/Subject": "Ders Rotası 6 · Din Kültürü 1. Ünite kara tahta ders notu",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
