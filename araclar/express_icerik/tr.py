"""Türkçe 6 · Express (deneme hazırlık, hap sürüm) · Mehmet Karadeniz, 2026-2027"""
from express_pdf import bolum, kutu, ul, tablo

AD = "Türkçe"
KAPAK_AD = "TÜRKÇE"
BASLIK = "Türkçe 6 · EXPRESS · Deneme Sınavına Hazırlık Hap Notu"
SURE = 25
KAPAK_P = ('<b style="color:#fff">Deneme sınavı için hap not.</b> Sadece puan kazandıran can alıcı bilgiler, '
           '⚡ ipuçları ve ⚠ tuzaklar. Sonda 15 soruluk mini deneme ve cevap anahtarı.')
HARITA = [
    ("T.S.6.1.3", "Sözcük ve sözcük gruplarının anlamı", 2),
    ("T.S.6.3.4-5", "Ana düşünce, ana duygu, yardımcı düşünce", 3),
    ("T.S.6.2.7", "Deyim, atasözü, özdeyiş", 1),
    ("T.S.6.3.8", "Geçiş ve bağlantı ifadeleri", 1),
    ("T.S.6.2.6", "Cümlede kavram ve duygu", 1),
    ("T.S.6.3.18", "Sözel mantık", 1),
    ("T.S.6.3.15-16", "Metin karşılaştırma, metin türleri, şiir bilgisi", 2),
    ("T.S.6.3.10 · 3.17", "Sınıflandırma · görsel, grafik, tablo", 2),
    ("T.S.6.6.1 · 5.2", "Nokta-virgül · de, mi, ki", 2),
]
NASIL = "Altın kural: <b>önce soru kökü, sonra metin.</b> “değinilmemiştir, çıkarılamaz” gibi <b>olumsuz</b> kökün altını çiz. Cevap her zaman <b>metinde</b>; kendi bilgine güvenme."


def anlam_dusunce():
    return (bolum("mavi", "T.S.6.1.3 · 6.3.4 · 6.3.5", "Anlam, ana düşünce, yardımcı düşünce", "Denemede 5 soru")
            + '<div class="mavi">'
            + '<div class="ezber">Bilinmeyen kelime: İPUCUNU BUL → TAHMİN ET → YERİNE KOY → anlam bozulmuyorsa DOĞRU</div>'
            + tablo(["İpucu", "İşaret", "Örnek"], [
                ["Eş anlam", "yani", "Çok <b>mahcup</b>, yani utangaçtı."],
                ["Zıt anlam", "ise, ama, oysa", "Ben <b>cesur</b>um, o ise korkak."],
                ["Sonuç", "bu yüzden, -dı", "Çok <b>müsrif</b>ti, ay bitmeden parası tükendi."]])
            + tablo(["", "Ne sorar?", "Nasıl bulunur?"], [
                ["<b>Konu</b>", "Metin <b>neyden</b> bahsediyor?", "Kısa söz grubu: “kitap okumanın faydaları”"],
                ["<b>Ana düşünce</b>", "Yazar <b>ne demek istiyor</b>?", "<b>Bütün metni</b> kapsar; çoğu zaman ilk ya da <b>son</b> cümle (bu yüzden, kısacası…)"],
                ["<b>Yardımcı düşünce</b>", "Ana düşünceyi ne <b>destekliyor</b>?", "Ayrıntılar; metinde birden çok var"],
                ["<b>Ana duygu</b>", "En baskın <b>duygu</b>", "özlem, hüzün, sevinç, vatan sevgisi"]])
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu", ul("“Değinilmemiştir” sorusu: seçenekleri metinde ara, <b>bulamadığın</b> cevaptır.",
                                          "Ana düşünce seçeneği <b>bütün metni</b> kapsamalı; tek ayrıntı ise yardımcı düşüncedir."))
            + kutu("tuzak", "Tuzak", ul("Metindeki <b>kelimeyi içeren</b> seçenek her zaman doğru değil.",
                                        "Doğru ama metinde <b>olmayan</b> bilgi yanlış cevaptır."))
            + '</div></div>')


def dil():
    return (bolum("mor", "T.S.6.2.7 · 6.3.8 · 6.2.6", "Deyim-atasözü, bağlantı ifadeleri, cümlede anlam", "Denemede 3 soru")
            + '<div class="mor">'
            + tablo(["Deyim", "Atasözü", "Özdeyiş"], [
                ["<b>Durum</b> anlatır, -mak/-mek ile biter", "<b>Öğüt</b> verir, cümledir", "Söyleyeni <b>belli</b> (Atatürk, Mevlânâ)"],
                ["etekleri zil çalmak, kulak asmamak", "Damlaya damlaya göl olur.", "“Hayatta en hakiki mürşit ilimdir.”"]])
            + tablo(["Anlam ilişkisi", "Bağlantı ifadesi", "Cümlede ipucu"], [
                ["Karşıtlık", "ama, fakat, oysa, buna rağmen", "beklenmeyen sonuç"],
                ["Ekleme", "ayrıca, üstelik, hem…hem", "yeni bilgi"],
                ["Neden-sonuç", "çünkü, bu yüzden, -dığı için", "“-dığından” konabilir"],
                ["Amaç-sonuç", "için, -mek üzere", "henüz olmamış hedef; “-dığından” konamaz"],
                ["Koşul", "-se/-sa, eğer", "şart"],
                ["Öznel / nesnel", "bence, güzel, sıkıcı / sayı, tarih", "kişiye göre değişir mi?"]])
            + kutu("tuzak", "Tuzak", "“Etekleri zil çalmak” <b>atasözü değil</b>, deyim. “Çünkü” sebebi, “bu yüzden” sonucu başlatır.")
            + '</div>')


def metin():
    return (bolum("yesil", "T.S.6.3.15 · 16 · 18 · 10 · 17", "Metin türleri, şiir, mantık, grafik", "Denemede 5 soru")
            + '<div class="yesil">'
            + '<div class="iki"><div class="k"><h4>Metin türleri</h4>'
            + ul("<b>Anı:</b> yazar <b>kendi yaşadığını</b> anlatır.", "<b>Masal:</b> olağanüstü olay. <b>Fabl:</b> kahraman <b>hayvan</b>, sonda ders.",
                 "<b>Bilgilendirici:</b> nesnel, tanım, sayı.", "<b>Hikâye:</b> olay, kişi, yer, zaman.")
            + '</div><div class="k"><h4>Şiir bilgisi</h4>'
            + ul("<b>Dize</b> = satır · <b>Kıta</b> = dize öbeği (dörtlük).", "<b>Redif:</b> dize sonunda tekrar eden <b>aynı ek/sözcük</b>.",
                 "<b>Uyak:</b> rediften önceki <b>ses benzerliği</b>. dağ-<b>lar</b> / bağ-<b>lar</b> → -lar redif, -ağ uyak.",
                 "Uyak örgüsü: aabb düz · abab çapraz · abba sarma.")
            + '</div></div>'
            + ul("<b>Sözel mantık:</b> Hemen şema çiz. Önce <b>kesin</b> bilgiyi yerleştir, sonra “hemen yanında” gibi ikilileri. “Hemen sağında” = bitişik.",
                 "<b>Sınıflandırma:</b> kavramları ortak özelliğe göre grupla (kişi / yer / olay; sebze / meyve).",
                 "<b>Grafik-tablo:</b> önce başlık ve eksen. “Her gün arttı” gibi <b>genellemeyi</b> tek tek kontrol et. Görselde yazmayan bilgi çıkarılamaz.")
            + '</div>')


def yazim():
    return (bolum("turuncu", "T.S.6.6.1 · 6.5.2", "Nokta, virgül, de-mi-ki", "Denemede 2 soru")
            + '<div class="turuncu">'
            + '<div class="ezber">“de”yi çıkar: anlam bozulmuyorsa AYRI · “mi” DAİMA AYRI · bağlaç “ki” AYRI, -ki eki (evdeki) BİTİŞİK</div>'
            + tablo(["Yanlış", "Doğru", "Neden?"], [
                ["Bende geldim.", "Ben <b>de</b> geldim.", "bağlaç de → ayrı"],
                ["Kitap ta aldım.", "Kitap <b>da</b> aldım.", "bağlaç de asla “te/ta” olmaz"],
                ["Gelirmisin?", "Gelir <b>misin</b>?", "soru eki ayrı"],
                ["Yarın ki gezi", "<b>Yarınki</b> gezi", "sıfat yapan -ki bitişik"],
                ["Büyük, kırmızı, top", "Büyük kırmızı top", "sıfatlar arasına virgül konmaz"]])
            + ul("<b>Nokta:</b> cümle sonu, kısaltma (Dr., vb.), sıra sayısı (6. sınıf), tarih (29.10.1923), saat (08.30).",
                 "<b>Virgül:</b> eş görevli sözcükler, hitap (Sevgili dostum,), evet/hayır sonrası, sıralı cümleler.",
                 "Bitişik istisnalar: <b>belki, sanki, çünkü, halbuki, mademki</b>.")
            + '</div>')


def govde():
    return anlam_dusunce() + dil() + metin() + yazim()


M1 = ('<div class="metin">Yaşlı balıkçı her sabah gün doğmadan denize açılırdı. Yıllardır aynı rotayı izlediği için denizi avucunun içi gibi bilirdi. '
      'Bir gün fırtına çıktı; genç balıkçılar limana sığınırken o, dalgaların <b>hırçınlaştığını</b> görünce teknesini koruyacak koya yöneldi.</div>')
SORULAR = [
    (M1 + "Metinde altı çizili “hırçınlaşmak” sözcüğünün anlamı aşağıdakilerden hangisidir?",
     ["Sakinleşip durulmak", "Öfkeli, sert ve tehlikeli hâle gelmek", "Rengi koyulaşmak", "Yavaş yavaş çekilmek"], 1,
     "İpucu “fırtına çıktı” (sonuç ipucu). Yerine koy: “dalgaların sertleştiğini” ✓"),
    ("“Denizi <b>avucunun içi gibi</b> bilmek” sözüyle anlatılmak istenen aşağıdakilerden hangisidir?",
     ["Denizden korkmak", "Bir yeri çok iyi tanımak", "Denize az çıkmak", "Elini suya sokmak"], 1, "Mecazlı söz grubu: çok iyi bilmek, en ince ayrıntısına kadar tanımak."),
    ("Aşağıdakilerden hangisi bir <b>atasözüdür</b>?",
     ["Göz atmak", "Etekleri zil çalmak", "Damlaya damlaya göl olur.", "Kulak asmamak"], 2, "Öğüt veren, kalıplaşmış cümle = atasözü. Diğerleri -mak/-mek ile biten deyim."),
    ("“Proje ödevini zamanında bitirdi, ___ sınıfın en güzel sunumunu da yaptı.” Boşluğa hangisi getirilmelidir?",
     ["ama", "çünkü", "üstelik", "oysa"], 2, "İkinci cümle birinciye yeni olumlu bilgi ekliyor: ekleme → üstelik."),
    ('<div class="metin">Su, yaşamın temelidir. İnsan vücudunun yarısından fazlası sudur. Bitkiler suyla büyür, hayvanlar suya muhtaçtır. '
     'Ancak dünyadaki suyun çok azı içilebilir. Bu nedenle suyu israf etmemeli, gelecek kuşaklara da bırakmalıyız.</div>Bu metnin <b>ana düşüncesi</b> aşağıdakilerden hangisidir?',
     ["İnsan vücudunun yarısı sudur.", "Bitkiler suyla büyür.", "Su israf edilmemeli, korunmalıdır.", "Dünyadaki suyun çoğu tuzludur."], 2, "“Bu nedenle” ile başlayan son cümle bütün metni kapsıyor: ana düşünce."),
    ("Yukarıdaki su metninde aşağıdakilerden hangisine <b>değinilmemiştir</b>?",
     ["Hayvanların suya ihtiyacı", "İçilebilir suyun az olması", "Suyun yaşam için önemi", "Suyun hangi sıcaklıkta kaynadığı"], 3, "Kaynama sıcaklığı metinde geçmiyor; diğer üçü metinde var."),
    ("Aşağıdaki cümlelerin hangisinde <b>neden-sonuç</b> anlamı vardır?",
     ["Kardeşime hediye almak için çarşıya gittim.", "Yollar buz tuttuğu için okullar tatil edildi.", "Erken kalkarsan kahvaltı yaparsın.", "Galiba yarın hava açacak."], 1, "“tuttuğundan” denebilir → neden-sonuç. A amaç, C koşul, D tahmin."),
    ("Ece, Ferhat, Gizem ve Hakan bir yarışmada ilk dört sırayı aldı. Ece birinci değil. Ferhat, Gizem'den hemen sonra geldi. Hakan dördüncü. Buna göre <b>birinci</b> kimdir?",
     ["Ece", "Ferhat", "Gizem", "Hakan"], 2, "Hakan 4. Ece 1. değil. Gizem-Ferhat bitişik → G1, F2, E3, H4."),
    ("İki metinden birincisi bir yazarın çocukluğunda dedesiyle bağ bozumuna gittiği günü, ikincisi üzümün faydalarını anlatıyor. Bu metinler için hangisi <b>söylenemez</b>?",
     ["İkisinin de konusu üzümle ilgilidir.", "Birincisi anı, ikincisi bilgilendirici metindir.", "Birincisinde yazar kendi yaşadığını anlatır.", "İkisi de olağanüstü olaylar içerir."], 3,
     "Olağanüstü olay masalda olur; ikisinde de yok."),
    ("“Sabah olunca uyanır <b>dağlar</b> / Yeşile bürünür bütün <b>bağlar</b>” dizelerinde redif hangisidir?",
     ["-ağ", "-lar", "dağ", "bağ"], 1, "Ek ayrılır: dağ-lar / bağ-lar → -lar redif, -ağ uyak."),
    ("“Pazardan domates, salatalık ve elma aldık. Annem salata yaptı, ben meyve kâsesini hazırladım.” Bu metinde sebzeler hangi seçenekte doğru sınıflandırılmıştır?",
     ["domates, elma", "salatalık, elma", "domates, salatalık", "elma, salata"], 2, "Sınıflandırma: sebze = domates, salatalık; meyve = elma."),
    ("Bir afişte “Kitap Fuarı · 12-18 Mayıs · Kültür Merkezi · Giriş ücretsiz” yazıyor. Bu afişe göre hangisine <b>ulaşılamaz</b>?",
     ["Fuarın tarihi", "Fuarın yeri", "Giriş ücreti", "Fuara kaç yayınevinin katılacağı"], 3, "Görselde olmayan bilgi çıkarılamaz."),
    ("Hangi cümlede <b>virgül</b> yanlış kullanılmıştır?",
     ["Evet, yarın geliyorum.", "Sevgili dostum, mektubunu aldım.", "Büyük, kırmızı, top yuvarlandı.", "Kalem, silgi ve defter aldım."], 2, "Sıfatlar arasına virgül konmaz; ayrıca isimden önce virgül olmaz."),
    ("Hangi cümlede “de” bağlacının yazımı <b>yanlıştır</b>?",
     ["Ben de seninle geleceğim.", "Okulda çok eğlendik.", "Kitapta güzel resimler var.", "Kardeşimde bu oyunu çok sevdi."], 3, "Çıkarınca “Kardeşim bu oyunu sevdi” anlam bozulmuyor → bağlaç → “Kardeşim de”."),
    ("Hangi cümledeki yazım <b>doğrudur</b>?",
     ["Yarın ki maçı izleyecek miyiz?", "Bu kitabı okudunmu?", "Evdeki kediyi besledin mi?", "Sende bizimle gel."], 2,
     "Evdeki: sıfat yapan -ki bitişik; “mi” ayrı. A → yarınki, B → okudun mu, D → Sen de."),
]



SON5 = ["Önce soru kökü, sonra metin; olumsuz kökün altını çiz.",
        "Tahmin et, yerine koy: anlam bozulmuyorsa doğru.",
        "Ana düşünce bütün metni kapsar; ayrıntı yardımcı düşüncedir.",
        "“de”yi çıkar, anlam bozulmuyorsa ayrı; “mi” daima ayrı.",
        "Metinde/görselde yazmayan bilgi cevap olamaz."]
