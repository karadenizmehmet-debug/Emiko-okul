"""Sosyal Bilgiler 6 · Express (deneme hazırlık, hap sürüm) · Mehmet Karadeniz, 2026-2027"""
from express_pdf import bolum, kutu, ul, tablo

AD = "Sosyal Bilgiler"
KAPAK_AD = "SOSYAL"
BASLIK = "Sosyal Bilgiler 6 · EXPRESS · Deneme Sınavına Hazırlık Hap Notu"
SURE = 20
KAPAK_P = ('<b style="color:#fff">Deneme sınavı için hap not.</b> Sadece can alıcı bilgiler, ⚡ ipuçları ve ⚠ tuzaklar. '
           'Sonda 10 soruluk mini deneme ve cevap anahtarı.')
HARITA = [
    ("SB.6.2.1", "Ülkemizin, kıtaların ve okyanusların konumu", 4),
    ("SB.6.2.2", "Doğal ve beşerî çevre ilişkisi", 2),
    ("SB.6.1.2", "Kültürel bağlar ve millî değerler", 2),
    ("SB.6.1.1", "Gruplar ve roller", 1),
    ("SB.6.1.3", "Toplumsal sorunlar, müzakere", 1),
]
NASIL = "Denemenin yarısı <b>konum</b>. Soru metin, harita ya da tabloyla gelirse cevabı <b>verilen kaynaktan</b> doğrula."


def konum():
    return (bolum("mavi", "SB.6.2.1", "Konum: Türkiye, kıtalar, okyanuslar", "Denemede 4 soru")
            + '<div class="mavi">'
            + '<div class="ezber">PARALEL → ENLEM → SICAKLIK, MEVSİM · MERİDYEN → BOYLAM → SAAT</div>'
            + tablo(["", "Paralel", "Meridyen"], [
                ["Uzanış", "doğu-batı", "kuzey-güney"], ["Başlangıç", "Ekvator 0° (Kuzey-Güney yarım küre)", "Greenwich 0° (Doğu-Batı yarım küre)"],
                ["Boy", "kutuplara doğru <b>küçülür</b>", "hepsi <b>eşit</b>"]])
            + tablo(["", "Mutlak konum", "Göreceli konum"], [
                ["Nedir?", "<b>Derece</b> ile (koordinat); <b>değişmez</b>", "<b>Çevresine</b> göre; önemi değişebilir"],
                ["Türkiye", "36°-42° K paralelleri, 26°-45° D meridyenleri", "Asya-Avrupa köprüsü, üç yanı deniz, boğazlar, enerji yolları"],
                ["Sonuç", "4 mevsim · ışık güneyden · <b>76 dk</b> saat farkı, güneş önce Kars'ta doğar", "ticaret, turizm, stratejik önem"]])
            + tablo(["En büyük", "En küçük", "Hap"], [
                ["Kıta: <b>Asya</b>", "Kıta: <b>Okyanusya</b>", "7 kıta · Antarktika buzla kaplı"],
                ["Okyanus: <b>Büyük (Pasifik)</b>", "Okyanus: <b>Kuzey Buz Denizi</b>", "5 okyanus · Atlas: Avrupa-Afrika ile Amerika arası · Güney Ok.: Antarktika çevresi"]])
            + kutu("tuzak", "Tuzak", "Küçülen <b>paraleller</b>, meridyen değil. Saat farkını <b>meridyen</b> belirler. Akdeniz okyanus değil, denizdir. Mutlak konum değişmez.")
            + '</div>')


def cevre():
    return (bolum("yesil", "SB.6.2.2", "Doğal ve beşerî çevre ilişkisi", "Denemede 2 soru")
            + '<div class="yesil">'
            + tablo(["Doğa → İnsan", "İnsan → Doğa"], [
                ["Düz, verimli ova → tarım, <b>yoğun</b> nüfus", "Baraj → akarsu ve çevre değişir"],
                ["Dağlık, soğuk Doğu Anadolu → <b>seyrek</b> nüfus, hayvancılık", "Orman kesme → <b>erozyon</b>, sel"],
                ["Bol yağış (Karadeniz) → <b>dik çatı</b>, çay, fındık", "Ağaçlandırma, teraslama → erozyon azalır"],
                ["Güneşli kıyı → turizm, seracılık", "Bataklık kurutma, tünel, yol → doğa değişir"]])
            + kutu("tuzak", "Tuzak", "Baraj gölü, fabrika, yol <b>beşerî</b>dir. Nüfus sadece doğaya bağlı değil: sanayi ve iş imkânı da etkiler (İstanbul).")
            + '</div>')


def toplum():
    return (bolum("mor", "SB.6.1.1 · 6.1.2 · 6.1.3", "Gruplar-roller, millî değerler, müzakere", "Denemede 4 soru")
            + '<div class="mor">'
            + ul("<b>Rol</b> = grupta üstlenilen görev, <b>hak + sorumluluk</b> getirir. Gruplar ve roller <b>zamanla değişir</b> (yaş, okul, taşınma): oyuncu → kaptan.",
                 "<b>Birliği güçlendiren bağlar:</b> ortak dil, tarih, bayrak, İstiklal Marşı, millî-dinî bayramlar, gelenekler.",
                 "<b>Dayanışma:</b> imece (köyde ortak iş), Ahilik (esnaf dayanışması), vakıflar, askıda ekmek, afet yardımları.",
                 "<b>Maddi kültür:</b> halı, ev, yemek · <b>manevi kültür:</b> dil, inanç, gelenek, misafirperverlik.",
                 "<b>Müzakere:</b> taraflar dinlenir, seçenek üretilir, <b>ortak karar</b> verilir. “Çoğunluk / güçlü olan karar verdi” müzakere değildir.")
            + '</div>')


def govde():
    return konum() + cevre() + toplum()


SORULAR = [
    ("Paraleller için aşağıdakilerden hangisi <b>yanlıştır</b>?",
     ["Doğu-batı yönünde uzanırlar.", "En büyüğü Ekvator'dur.", "Kutuplara doğru boyları uzar.", "Enlemi belirlemede kullanılır."], 2, "Paraleller kutuplara doğru küçülür."),
    ("“Türkiye 26°-45° doğu meridyenleri arasındadır.” Bu bilginin sonucu hangisidir?",
     ["Dört mevsim belirgin yaşanır.", "Doğu ile batı uçları arasında 76 dakika yerel saat farkı vardır.", "Üç tarafı denizlerle çevrilidir.", "Asya ile Avrupa arasında köprüdür."], 1, "Meridyen → boylam → saat farkı. 19 meridyen × 4 dk = 76 dk."),
    ("Aşağıdakilerden hangisi Türkiye'nin <b>göreceli</b> konumuna örnektir?",
     ["36°-42° kuzey paralelleri arasında olması", "Kuzey Yarım Küre'de olması", "Boğazlara sahip olması", "Doğu Yarım Küre'de olması"], 2, "Boğazlar çevresiyle ilgili özellik → göreceli. Diğerleri derece/yarım küre → mutlak."),
    ("Antarktika kıtasını çevreleyen okyanus hangisidir?", ["Hint Okyanusu", "Güney Okyanusu", "Atlas Okyanusu", "Kuzey Buz Denizi"], 1, "Güney Okyanusu Antarktika'yı çevreler."),
    ("Doğu Karadeniz'de evlerin çatılarının dik yapılması en çok hangi doğal etkenle ilgilidir?",
     ["Yer altı kaynakları", "Bol yağış", "Düz ovalar", "Güneşlenme süresinin uzunluğu"], 1, "Yağmur ve kar suyu kolay aksın diye çatı diktir."),
    ("Aşağıdakilerden hangisi insanın doğal çevreyi etkilemesine örnektir?",
     ["Doğu Anadolu'da nüfusun seyrek olması", "Akdeniz kıyılarında turizmin gelişmesi", "Bir akarsu üzerine baraj yapılması", "Karadeniz'de çay tarımı yapılması"], 2, "Baraj insan etkinliği, akarsuyu ve çevreyi değiştirir. Diğerleri doğanın insanı etkilemesi."),
    ("Mahalle sakinleri parkın temizliği için bir araya gelip sırayla nöbet tutmaya karar verdi. Bu durum hangisiyle <b>ilgisizdir</b>?",
     ["Müzakere", "Dayanışma", "Ortak sorun", "Bireysel çıkarı öne çıkarma"], 3, "Herkesin katıldığı ortak karar: bireysel çıkar değil, ortak yarar."),
    ("Kerem ilkokulda futbol takımında oyuncuydu; ortaokulda takım kaptanı oldu. Bu durum neyi gösterir?",
     ["Grupların hiç değişmediğini", "Rollerin zaman içinde değişebileceğini", "Her grubun tek bir rolü olduğunu", "Rollerin hak getirmediğini"], 1, "Aynı grupta rolü değişti."),
    ("Aşağıdakilerden hangisi toplumsal birliği güçlendiren kültürel bağlarımızdan <b>değildir</b>?",
     ["Ortak dil", "Millî bayramlar", "İmece geleneği", "Herkesin farklı bayrak kullanması"], 3, "Bayrak ortak millî semboldür."),
    ("Hangisi manevi kültür ögesidir?", ["Halı", "Kilim", "Misafirperverlik", "Ahşap ev"], 2, "Gelenek, değer, inanç manevi; eşyalar maddi kültür."),
]



SON5 = ["Paralel → enlem → sıcaklık; meridyen → boylam → saat.",
        "Derece varsa mutlak, çevre varsa göreceli konum.",
        "7 kıta, 5 okyanus; en büyükler Asya ve Büyük Okyanus.",
        "Doğa insanı etkiler (ev, tarım, nüfus), insan doğayı değiştirir (baraj, tünel, orman).",
        "Müzakere: herkes dinlenir, ortak karar verilir."]
