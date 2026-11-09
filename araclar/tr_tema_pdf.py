#!/usr/bin/env python3
"""Türkçe 6 · 1. Tema (Dilimizin Zenginliği) kara tahta ders notu PDF üreticisi · Hazırlayan: Mehmet Karadeniz, 2026-2027

Kullanım:  python3 araclar/tr_tema_pdf.py      ->  pdf/tr-tema1.pdf (4 sayfa A4)
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
    k1 = kart("Bağlamdan anlam (T.O.6.5)", "sar", ul([
        "Bilmediğin kelimenin anlamını <b>cümle ve paragraftaki ipuçlarından</b> tahmin et.",
        "Adımlar: <b>oku → ipucunu bul → tahmin et → yerine koyup dene</b>.",
        "“Maçtan sonra öyle <b>bitap</b> düştüm ki yürüyecek hâlim kalmadı.” → bitap: <b>çok yorgun</b>.",
        "Tahminini kelimenin yerine koy; anlam bozulmuyorsa doğrudur."]), "hap")
    k2 = kart("Dört ipucu türü", "mav", TBL(["İpucu", "Örnek cümle", "Anlam"], [
        ["Eş anlam", "Ali çok <b>mahcup</b>, yani utangaçtı.", "utangaç"],
        ["Zıt anlam", "Kardeşim <b>cesur</b>, ben ise korkağım.", "korkusuz"],
        ["Örnek", "<b>Kuruyemiş</b>ler, yani fındık, ceviz…", "kuru meyve"],
        ["Sonuç", "Çok <b>müsrif</b>; harçlığı hemen bitti.", "savurgan"]]))
    k3 = kart("Metnin yüzey anlamı (T.O.6.6)", "pem", ul([
        "<b>Yüzey anlam</b> = metinde açıkça yazan bilgi. Yorum gerekmez.",
        "“Metne göre…” sorusunda cevap <b>metnin içindedir</b>; kendi fikrini ekleme.",
        "<b>5N1K</b> sor: Ne? Nerede? Ne zaman? Nasıl? Neden? Kim?",
        "<b>Konu</b> = metin neyden söz ediyor · <b>Ana düşünce</b> = verilmek istenen mesaj.",
        "<b>Anahtar kelime</b> = konuyu taşıyan, sık geçen kelime."]))
    k4 = kart("5N1K ile çöz", "tur", "<p>“Cumartesi sabahı okul bahçesinde kitap şenliği yapıldı. Öğrenciler kitaplarını değiştirdi; herkes yeni yazarlar tanıdı.”</p>" +
        TBL(None, [["Kim?", "öğrenciler"], ["Ne?", "kitap şenliği"], ["Nerede?", "okul bahçesi"], ["Ne zaman?", "cumartesi sabahı"], ["Sonuç?", "yeni yazarlar tanıdılar"]]))
    k5 = sert("SINAV İPUCU", "Tahminini <b>gerekçesiyle</b> yaz: “Herkesi hayran bırakıyordu ifadesinden anladım.”")
    return ("ANLAMIN İZİNDE", "Okuma · Bağlamdan anlam ve yüzey anlam", "İpucunu bul,<br>anlamı yakala!", "Metne göre =<br>metinde yazan",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa2():
    k1 = kart("Anlam ilişkileri", "sar", TBL(["İlişki", "Açıklama", "Örnek"], [
        ["Eş anlamlı", "farklı yazılış, aynı anlam", "siyah-kara, cevap-yanıt"],
        ["Zıt anlamlı", "karşıt anlam", "uzun-kısa, gelmek-gitmek"],
        ["Eş sesli", "aynı yazılış, farklı anlam", "yüz (sayı / surat)"],
        ["Yakın anlamlı", "birbirine yakın anlam", "bakmak-görmek"]]), "hap")
    k2 = kart("Gerçek · mecaz · terim", "mav", TBL(None, [
        ["Gerçek", "Kuyu çok <b>derin</b>di."], ["Mecaz", "<b>Derin</b> düşünceleri var."], ["Terim", "Üçgenin <b>açı</b>larını ölç."]]) +
        "<p>Gözünün önüne getiremiyorsan (kırık kalp) anlam <b>mecazdır</b>.</p>")
    k3 = kart("Kök ve ekler", "pem", '<div class="kural">göz → göz<b>lük</b> → göz<b>lük</b><b>çü</b> → gözlükçü<b>ler</b><b>de</b></div>' + ul([
        "<b>Kök:</b> anlamlı en küçük parça (göz, ev, sil).",
        "<b>Yapım eki:</b> yeni kelime türetir: kitap<b>lık</b>, balık<b>çı</b>, sil<b>gi</b>, su<b>suz</b>.",
        "<b>Çekim eki:</b> yeni kelime yapmaz: ev<b>ler</b>, ev<b>e</b>, ev<b>de</b>, ev<b>im</b>.",
        "Evlerimizden = ev + <b>ler</b> + <b>imiz</b> + <b>den</b>"]))
    k4 = kart("Sözlük kullanma", "yes", ul([
        "Kelimeler <b>alfabetik</b> sıradadır.", "Anlamlar <b>1, 2, 3</b> diye numaralanır.",
        "<b>mec.</b> = mecaz, <b>mat.</b> = matematik terimi.", "Önce <b>kökü</b> bul, sonra ara."]))
    k5 = kart("Kalıplaşmış sözler", "tur", TBL(None, [
        ["Kalıp söz", "Geçmiş olsun! Hayırlı olsun! Kolay gelsin!"],
        ["Deyim", "durumu anlatır, -mak/-mek: göz kulak olmak"],
        ["Atasözü", "öğüt verir, cümledir: Damlaya damlaya göl olur."],
        ["İkileme", "yavaş yavaş, eğri büğrü, er geç"]]))
    return ("KELİMELERİN DÜNYASI", "Okuma · Söz varlığını çözümleme (T.O.6.21)", "Kelimeyi<br>parçala!", "Kök + yapım<br>+ çekim",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa3():
    k1 = kart("Yazını zenginleştir (T.Y.6.18)", "sar", ul([
        "<b>Eş anlamlı</b> kelime kullan, tekrara düşme: güzel → hoş, göz alıcı.",
        "<b>Deyim ve atasözü</b> ekle: “çok sevindi” → “sevinçten havalara uçtu”.",
        "<b>Benzetme</b> yap: “Bulutlar pamuk <b>gibi</b> yumuşacıktı.”",
        "<b>Duyulara</b> seslen: renk, ses, koku, tat.",
        "<b>Geçiş ifadeleri:</b> önce, ardından, ayrıca, çünkü, sonuç olarak."]), "hap")
    k2 = kart("Önce · sonra", "mav", TBL(["Sade", "Zengin"], [
        ["Bahçe güzeldi. Çiçekler güzeldi.", "Bahçe rengârenk çiçeklerle bezenmişti."],
        ["Ali çok sevindi.", "Ali'nin etekleri zil çalıyordu."],
        ["Her gün çalıştım, kazandım.", "Damlaya damlaya göl olur; her gün çalıştım ve başardım."]]))
    k3 = kart("Paragraf yazarken", "pem", '<div class="kural">Giriş: konuyu tanıt → Gelişme: açıkla, örnek ver → Sonuç: toparla</div>' + ul([
        "Tek bir konu ve ana düşünce olsun.", "En az <b>4-5 cümle</b> yaz.",
        "Verilen deyimi <b>anlamına uygun</b> kullan.", "Yazım ve noktalama da puanlanır!"]))
    k4 = kart("Düşünceyi geliştirme yolları", "tur", TBL(None, [
        ["Tanımlama", "Bu nedir?"], ["Örneklendirme", "Örneğin…"], ["Karşılaştırma", "…göre daha…"], ["Sayısal veri", "yüzde, sayı"]]))
    k5 = sert("BÖYLE HATIRLA", "Zengin yazı = <b>eş anlam</b> + <b>deyim / atasözü</b> + <b>benzetme</b> + <b>duyular</b> + <b>bağlantı</b>")
    return ("YAZIMI ZENGİNLEŞTİR", "Yazma · Söz varlığını kullanma", "Tekrar yok,<br>renk var!", "Deyim + benzetme<br>= canlı yazı",
            [f'<div class="satir k2">{k1}{k2}</div>', f'<div class="satir k12">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

def sayfa4():
    k1 = kart("Ayrı mı, bitişik mi?", "sar", TBL(["", "Ayrı", "Bitişik"], [
        ["de / da", "Ben <b>de</b> geldim. (bağlaç)", "Ev<b>de</b>, park<b>ta</b> (ek)"],
        ["ki", "Duydum <b>ki</b> gelmiş.", "evde<b>ki</b>, yarın<b>ki</b>"],
        ["mi", "Geldin <b>mi</b>?", "gelecek <b>misin</b> (ayrı)"]]) +
        '<div class="kural"><b>de</b>\'yi çıkar: anlam bozulmuyorsa ayrı yaz!</div>', "hap")
    k2 = kart("Büyük harf · kesme · sayı", "mav", ul([
        "<b>Büyük harf:</b> cümle başı, özel adlar (Akşehir, Türkçe).",
        "<b>Kesme:</b> özel ada gelen ek: Ankara'ya, Ece'nin.",
        "<b>Kısaltma:</b> okunuşa göre: TBMM'ye, TDK'ye.",
        "<b>Sayı:</b> ayrı yazılır: on beş · 6. sınıf · 29 Ekim 1923."]))
    k3 = kart("Noktalama işaretleri (T.Y.6.21)", "pem", TBL(None, [
        [", virgül", "sıralı kelime/cümle, hitap, evet/hayır"],
        ["; noktalı virgül", "virgüllü sıralı cümleleri ayırır"],
        [": iki nokta", "açıklama, örnek, aktarılan sözden önce"],
        ["? soru · ! ünlem", "soru · duygu, seslenme, emir"],
        ["“ ” tırnak", "başkasının sözünü aynen aktarma"],
        ["— konuşma çizgisi", "diyalogda konuşma başı"],
        ["… üç nokta", "yarım cümle, devam eden örnekler"]]))
    k4 = kart("Tuzağa düşme", "tur", tuzak([
        ["Bende geldim. · Gelirmisin?", "Ben de geldim. · Gelir misin?"],
        ["Sınıf da ki · herşey · birşey", "Sınıftaki · her şey · bir şey"],
        ["Hayır bugün gelemem.", "Hayır, bugün gelemem."]]))
    k5 = sert("SINAV İPUCU", "Yazma sorularında cevabını bitirince <b>bir kez daha oku</b>: de/da, ki, mi ve noktalamayı kontrol et.")
    return ("YAZIM VE NOKTALAMA", "Yazma · Kuralları uygulama", "Her işaretin<br>bir görevi var!", "de'yi çıkar,<br>sonra karar ver",
            [f'<div class="satir k12">{k1}{k2}</div>', f'<div class="satir k21">{k3}{k4}</div>', f'<div class="satir k1">{k5}</div>'])

SAYFALAR = [sayfa1, sayfa2, sayfa3, sayfa4]

def sayfa_html(i, o):
    baslik, alt3, not_sol, not_sag, govde = SAYFALAR[i]()
    return (f'<section class="sayfa" style="--o:{o}"><div class="tahta"><div class="baslik">'
            f'<div class="not sol">{not_sol}</div><div class="not sag">{not_sag}</div>'
            f'<h1>{html.escape(baslik)}</h1><div class="alt3">{alt3}</div>'
            f'<span class="alt">TÜRKÇE · 6. SINIF · 1. TEMA · DİLİMİZİN ZENGİNLİĞİ</span></div>'
            f'<div class="icerik">{"".join(govde)}</div>'
            f'<div class="ayak"><span>{YAZAR}</span><span>Türkçe 6 · Dilimizin Zenginliği · Sayfa {i + 1} / {len(SAYFALAR)}</span></div></div>'
            f'<div class="tepsi">{TEPSI}</div></section>')

def yaz(govde, ad, cikti):
    doc = (f'<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="author" content="{YAZAR}"><title>{html.escape(ad)}</title>'
           f'<style>{CSS % {"f": FONT.as_uri()}}{EK_CSS}</style></head><body>{govde}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        h = Path(tmp) / "tr.html"; h.write_text(doc, encoding="utf-8")
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
    cikti = KOK / "pdf" / "tr-tema1.pdf"; ham = cikti.with_suffix(".tmp.pdf")
    baslik = "Türkçe 6 · Dilimizin Zenginliği · Ders Notu"
    yaz("".join(parcalar), baslik, ham)
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(str(ham)); w = PdfWriter()
    for sf in r.pages: w.add_page(sf)
    w.add_metadata({"/Title": baslik, "/Author": YAZAR, "/Subject": "Ders Rotası 6 · Türkçe 1. Tema kara tahta ders notu",
                    "/Creator": "Ders Rotası 6", "/Keywords": f"© {YAZAR}. Tüm hakları saklıdır."})
    with open(cikti, "wb") as f: w.write(f)
    ham.unlink(); print(f"{cikti.relative_to(KOK)}: {len(r.pages)} sayfa")
