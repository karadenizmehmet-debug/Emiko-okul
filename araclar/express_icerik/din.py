"""Din Kültürü ve Ahlak Bilgisi 6 · Express (deneme hazırlık, hap sürüm) · Mehmet Karadeniz, 2026-2027"""
from express_pdf import bolum, kutu, ul, tablo

AD = "Din Kültürü ve Ahlak Bilgisi"
KAPAK_AD = "DİN KÜLTÜRÜ"
BASLIK = "Din Kültürü ve Ahlak Bilgisi 6 · EXPRESS · Deneme Sınavına Hazırlık Hap Notu"
SURE = 20
KAPAK_P = ('<b style="color:#fff">Deneme sınavı için hap not.</b> Sıfatlar, görevler, kitaplar: sadece can alıcı bilgiler, '
           '⚡ ipuçları ve ⚠ tuzaklar. Sonda 10 soruluk mini deneme ve cevap anahtarı.')
HARITA = [
    ("DKAB.6.1.1", "İnsanlara rehber: Peygamber", 6),
    ("DKAB.6.1.3", "İlahi kitaplar", 3),
    ("DKAB.6.1.2", "Vahiy", 1),
]
NASIL = "6 soru peygamberlerden: <b>sıfat</b> ve <b>görev</b> tablolarını olaylarla eşleştir. Ayetli sorularda cevap ayetin <b>ana mesajındadır</b>."


def peygamber():
    return (bolum("yesil", "DKAB.6.1.1", "İnsanlara rehber: Peygamber", "Denemede 6 soru")
            + '<div class="yesil">'
            + '<div class="ezber">SEFİT: Sıdk · Emanet · Fetanet · İsmet · Tebliğ</div>'
            + tablo(["Sıfat", "Anlamı", "Soruda görürsen…"], [
                ["<b>Sıdk</b>", "doğruluk", "hiç yalan söylemedi, “Muhammedü'l-Emîn”"],
                ["<b>Emanet</b>", "güvenilirlik", "düşmanları bile eşyalarını <b>emanet bıraktı</b>"],
                ["<b>Fetanet</b>", "akıllılık", "<b>akıllıca çözüm</b>: Kâbe hakemliği"],
                ["<b>İsmet</b>", "günahtan korunmuşluk", "kötülüklerden, putlardan uzak durdu"],
                ["<b>Tebliğ</b>", "eksiksiz bildirme", "vahyi <b>değiştirmeden</b> iletti"]])
            + tablo(["Görev", "Soruda görürsen…"], [
                ["Tebliğ (bildirmek)", "vahyi insanlara <b>duyurdu</b>, davet etti"],
                ["Açıklamak (tebyin)", "<b>nasıl yapılacağını gösterdi</b>: “Beni nasıl namaz kılıyor görüyorsanız öyle kılın.”"],
                ["Örnek olmak (temsil)", "<b>önce kendisi yaptı</b>: Hendek'i sahabeyle birlikte kazdı · Ahzâb 21: “güzel bir örnek”"],
                ["Müjdelemek-uyarmak", "iyiliğin ödülünü, kötülüğün sonucunu haber verdi"]])
            + ul("İlk peygamber <b>Hz. Âdem</b>, son <b>Hz. Muhammed</b>. Kur'an'da adı geçen <b>25</b> peygamber var.",
                 "Hepsinin ortak mesajı: <b>tevhit</b> (Allah birdir) ve güzel ahlak.",
                 "Peygamberler <b>insandır</b> → hayatları örnek alınabilir. Peygamberlik çalışarak kazanılmaz, Allah seçer.")
            + kutu("tuzak", "Tuzak", "Peygamberler yer, içer, hastalanır. Kur'an'da bütün peygamberlerin adı geçmez. Tebliğ = bildirmek, tebyin = açıklamak.")
            + '</div>')


def vahiy_kitap():
    return (bolum("mor", "DKAB.6.1.2 · 6.1.3", "Vahiy ve ilahi kitaplar", "Denemede 4 soru")
            + '<div class="mor">'
            + ul("<b>Vahiy</b>: kaynağı Allah, getireni Cebrail, alanı peygamber. İlham ise herkese gelebilir.",
                 "Geliş yolları: <b>sadık rüya</b> (Hz. İbrahim) · <b>melek aracılığıyla</b> (Kur'an'ın tamamı) · <b>perde arkasından</b>, melek yok (Hz. Musa, Tur Dağı).")
            + tablo(["Kitap", "Peygamber", "Dil", "Anahtar"], [
                ["Tevrat", "Hz. Musa", "İbranice", "<b>On Emir</b>, kanun"],
                ["Zebur", "Hz. Davud", "İbranice", "<b>dua, ilahi</b>"],
                ["İncil", "Hz. İsa", "Aramice", "<b>müjde</b>, sevgi"],
                ["Kur'an", "Hz. Muhammed", "Arapça", "son, evrensel, <b>korunmuş</b>, öncekileri doğrular"]])
            + '<div class="ezber">Sıra: TEVRAT → ZEBUR → İNCİL → KUR\'AN · Suhuf (sayfa): Âdem 10 · Şit 50 · İdris 30 · İbrahim 10</div>'
            + kutu("tuzak", "Tuzak", "Zebur Hz. Musa'ya değil Hz. Davud'a. Suhuf ilahi kitap sayılmaz. Önceki kitaplar zamanla değişti, Kur'an korundu.")
            + '</div>')


def govde():
    return peygamber() + vahiy_kitap()


SORULAR = [
    ("Aşağıdakilerden hangisi peygamberlerin gönderiliş amaçlarından biri <b>değildir</b>?",
     ["İnsanlara doğru yolu göstermek", "Allah'ın birliğini öğretmek", "İnsanlara zenginlik dağıtmak", "Güzel ahlakı yaşayarak göstermek"], 2, "Peygamberler yol göstermek için gönderildi; servet dağıtmak bir amaç değildir."),
    ("“Peygamberimiz, ona inanmayanların bile değerli eşyalarını ona bırakmasına rağmen hiçbirini kaybetmeden sahiplerine ulaştırdı.” Bu olay hangi sıfatı gösterir?",
     ["Fetanet", "Emanet", "İsmet", "Tebliğ"], 1, "Güvenilirlik = emanet."),
    ("İndiriliş sırasına göre <b>ilk</b> ve <b>son</b> ilahi kitap hangileridir?",
     ["Zebur – İncil", "Tevrat – Kur'an", "İncil – Tevrat", "Tevrat – Zebur"], 1, "Tevrat → Zebur → İncil → Kur'an."),
    ("Kâbe hakemliği olayında Peygamberimizin herkesi memnun eden çözümü hangi sıfatına örnektir?", ["Sıdk", "Emanet", "Fetanet", "Tebliğ"], 2, "Akıllıca çözüm = fetanet."),
    ("Vahyin geliş yollarından hangisinde melek aracılık <b>etmez</b>?", ["Cebrail'in getirmesi", "Perde arkasından konuşma", "Kur'an'ın inişi", "Alak suresinin ilk ayetleri"], 1, "Perde arkasından: Allah doğrudan konuşur (Hz. Musa, Tur Dağı)."),
    ("Dua, öğüt ve Allah'ı övme (ilahiler) ağırlıklı olan ilahi kitap ve gönderildiği peygamber hangisidir?",
     ["Tevrat – Hz. Musa", "Zebur – Hz. Davud", "İncil – Hz. İsa", "Suhuf – Hz. İbrahim"], 1, "İlahiler → Zebur → Hz. Davud."),
    ("Peygamberlerin insan olmasının en önemli sonucu hangisidir?",
     ["Hiç hastalanmamaları", "İnsanların onları örnek alabilmesi", "Mucize göstermemeleri", "Vahiy almamaları"], 1, "İnsan oldukları için yaşamları örnek alınabilir."),
    ("Peygamberimizin Hendek Savaşı'nda hendeği sahabeyle birlikte kazması hangi görevine örnektir?",
     ["Örnek olmak", "Müjdelemek", "Tebliğ etmek", "Uyarmak"], 0, "Söylediğini kendisi yaşadı → örnek olmak (temsil)."),
    ("Kur'an-ı Kerim ile ilgili hangisi <b>yanlıştır</b>?",
     ["Son ilahi kitaptır.", "Önceki kitapları doğrular.", "İbranice indirilmiştir.", "Allah'ın koruması altındadır."], 2, "Kur'an Arapça indirilmiştir."),
    ("“Bizden önce gönderilen her peygambere ‘Benden başka ilah yoktur, bana kulluk edin.’ diye vahyettik.” (Enbiyâ, 25. ayetin anlamı) Bu ayetten hangisi çıkarılabilir?",
     ["Peygamberlerin hepsi aynı kitabı getirmiştir.", "Bütün peygamberlerin temel mesajı tevhittir.", "Peygamberler sadece bir topluma gelmiştir.", "Vahiy sadece rüya yoluyla gelir."], 1, "Her peygambere aynı mesaj: Allah birdir."),
]



SON5 = ["İlk peygamber Hz. Âdem, son peygamber Hz. Muhammed.",
        "SEFİT: Sıdk, Emanet, Fetanet, İsmet, Tebliğ.",
        "Görevler: bildir, açıkla, örnek ol, müjdele-uyar.",
        "Tevrat–Musa, Zebur–Davud, İncil–İsa, Kur'an–Muhammed.",
        "Vahiy sadece peygambere; ilham herkese."]
