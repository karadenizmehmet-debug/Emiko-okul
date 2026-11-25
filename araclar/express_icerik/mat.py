"""Matematik 6 · Express (deneme hazırlık, hap sürüm) · Mehmet Karadeniz, 2026-2027"""
from express_pdf import bolum, kutu, ul, tablo


def k(p, q):
    return f'<span class="kesir"><span>{p}</span><span>{q}</span></span>'


AD = "Matematik"
KAPAK_AD = "MATEMATİK"
BASLIK = "Matematik 6 · EXPRESS · Deneme Sınavına Hazırlık Hap Notu"
SURE = 30
KAPAK_P = ('<b style="color:#fff">Deneme sınavı için hap not.</b> Kurallar, çözüm kalıpları, ⚡ ipuçları ve ⚠ tuzaklar. '
           'Sonda 15 soruluk mini deneme ve cevap anahtarı.')
HARITA = [
    ("MAT.6.1.1-2", "Çarpan-kat, bölünebilme", 2),
    ("MAT.6.1.3-4", "Asal sayı, asal çarpan, EKOK-OBEB", 3),
    ("MAT.6.1.5", "Ondalık gösterim: basamak, çözümleme, sıralama", 3),
    ("MAT.6.1.6", "Kesir-bölme ilişkisi", 2),
    ("MAT.6.1.8", "Kesirlerle toplama-çıkarma-çarpma", 2),
    ("MAT.6.6.1", "Olasılık", 3),
]
NASIL = "Soruda <b>“en az, en çok, kaç tane, kalan”</b> kelimelerinin altını çiz. Kesir ve olasılık sonucunu <b>sadeleştir</b>, seçeneklerde sade hâli vardır."


def sayilar():
    return (bolum("mavi", "MAT.6.1.1 → 6.1.4", "Bölünebilme, asal, EKOK-OBEB", "Denemede 5 soru")
            + '<div class="mavi">'
            + tablo(["÷", "Kural", "÷", "Kural"], [
                ["2", "son rakam çift", "6", "hem 2 hem 3"],
                ["3", "rakamlar toplamı 3'ün katı", "9", "rakamlar toplamı 9'un katı"],
                ["4", "<b>son iki basamak</b> 4'ün katı", "10", "son rakam 0"],
                ["5", "son rakam 0 ya da 5", "", ""]])
            + '<div class="ezber">1 asal DEĞİL · 2 tek ÇİFT asal · 2, 3, 5, 7, 11, 13, 17, 19, 23, 29</div>'
            + tablo(["", "EKOK", "OBEB"], [
                ["İşaret", "tekrar <b>birlikte</b>, aynı anda, en az kaç", "<b>en büyük</b> eşit parça, artmadan böl"],
                ["Sonuç", "sayılardan büyük/eşit", "sayılardan küçük/eşit"],
                ["12 ve 18", "36 (otobüsler 36 dk sonra birlikte)", "6 (6'şar m parçalar)"]])
            + '<div class="iki">'
            + kutu("vurucu", "Vurucu", ul("Bilinmeyen rakam: “7A4” 9'a bölünsün → 7+A+4 = 18 → A = 7.",
                                          "60 = 2² × 3 × 5 → asal çarpanları <b>2, 3, 5</b> (tekrar eden bir kez sayılır).",
                                          "Biri diğerinin katıysa: EKOK büyük, OBEB küçük sayı."))
            + kutu("tuzak", "Tuzak", ul("4 kuralında rakam toplamına bakılmaz.", "Her tek sayı asal değil: 9, 15, 21.",
                                        "Çarpan sayarken 1'i ve sayının kendisini unutma."))
            + '</div></div>')


def ondalik():
    return (bolum("yesil", "MAT.6.1.5", "Ondalık gösterim", "Denemede 3 soru · YENİ")
            + '<div class="yesil">'
            + tablo(["Birler", ",", "Onda birler", "Yüzde birler", "Binde birler"], [
                ["4", ",", "3 → 0,3", "7 → 0,07", "5 → 0,005"]])
            + ul(f"Payda 10, 100, 1000 → virgül: {k(7, 100)} = 0,07. Değilse genişlet: {k(3, 5)} = {k(6, 10)} = 0,6 · {k(1, 4)} = 0,25.",
                 "<b>Çözümleme:</b> 36,52 = 30 + 6 + 0,5 + 0,02. Olmayan basamak 0: 4,07 = 4 + 0,07.",
                 "<b>Sıralama:</b> önce tam kısım, sonra onda birler. Sona <b>0 ekle</b> eşitle: 0,5 = 0,50 &gt; 0,45.")
            + kutu("tuzak", "Tuzak", "“Basamağı çok olan büyüktür.” <b>Yanlış!</b> 0,125 &lt; 0,3. Sondaki 0 değeri değiştirmez (3,40 = 3,4) ama araya giren değiştirir (3,04 ≠ 3,4).")
            + '</div>')


def kesirler():
    return (bolum("turuncu", "MAT.6.1.6 · 6.1.8", "Kesir-bölme ilişkisi ve kesirlerle işlemler", "Denemede 4 soru")
            + '<div class="turuncu">'
            + '<div class="ezber">KESİR = PAY ÷ PAYDA · Paylaşılan → PAY, kişi sayısı → PAYDA</div>'
            + tablo(["Durum", "Sonuç"], [
                ["3 pizza 4 kişiye", f"3 ÷ 4 = {k(3, 4)} (1'den az)"],
                ["17 ÷ 5", f"3 kalan 2 → 3 {k(2, 5)} (kalan pay olur)"],
                ["Toplama / çıkarma", f"<b>Paydayı eşitle</b>: {k(1, 4)} + {k(1, 6)} = {k(3, 12)} + {k(2, 12)} = {k(5, 12)}"],
                ["Çarpma", f"pay×pay, payda×payda: {k(2, 3)} × {k(3, 5)} = {k(2, 5)}"],
                ["“Bir çokluğun kesri”", f"30'un {k(2, 5)}'i = 30 × {k(2, 5)} = 12"],
                ["“Kalan ne kadar?”", f"bütün = 1 → 1 − {k(7, 12)} = {k(5, 12)}"]])
            + kutu("tuzak", "Tuzak", f"{k(1, 2)} + {k(1, 3)} ≠ {k(2, 5)}! Paydalar toplanmaz. Tam sayılı kesirden çıkarırken tamı unutma: 3 − {k(1, 4)} = 2 {k(3, 4)}.")
            + '</div>')


def olasilik():
    return (bolum("mor", "MAT.6.6.1", "Olasılık", "Denemede 3 soru")
            + '<div class="mor">'
            + '<div class="ezber">OLASILIK = İSTENEN ÷ TÜMÜ · 0 imkânsız … 1 kesin · OLMA + OLMAMA = 1</div>'
            + ul(f"Zarda 4'ten büyük: 5, 6 → {k(2, 6)} = {k(1, 3)}. Zarda 7: <b>0</b>.",
                 "<b>Deneysel olasılık</b> = gerçekleşme ÷ deney sayısı: 40 atış, 22 tura → 22/40 = 0,55.",
                 "Deney sayısı arttıkça deneysel olasılık teorik olasılığa (parada ½) <b>yaklaşır</b>.",
                 "Torbaya top eklenince <b>tüm</b> sayısı da artar; paydayı güncelle.")
            + kutu("tuzak", "Tuzak", "Olasılık 1'den büyük olamaz. Gerçekleşme sayısı deney sayısını geçemez. Denemede hiç 6 gelmemesi 6'yı imkânsız yapmaz.")
            + '</div>')


def govde():
    return sayilar() + ondalik() + kesirler() + olasilik()


SORULAR = [
    (f"5 kg peynir 8 eşit paketlendi. Bir paket kaç kg'dır?", [k(8, 5) + " kg", k(5, 8) + " kg", "3 kg", "13 kg"], 1, "Paylaşılan pay, paket sayısı payda: 5 ÷ 8 = 5/8."),
    ("Bir para 40 kez atıldı ve 22 kez tura geldi. Buna göre hangisi <b>yanlıştır</b>?",
     ["Yazı 18 kez gelmiştir.", "Turanın deneysel olasılığı 0,55'tir.", "Atış sayısı artarsa deneysel olasılık 1/2'ye yaklaşır.", "Tura gelme sayısı 40'tan fazla olabilir."], 3, "Gerçekleşme sayısı deney sayısını geçemez."),
    ("6,048 sayısının çözümlenmiş hâli hangisidir?", ["6 + 0,4 + 0,08", "6 + 0,04 + 0,008", "6 + 0,04 + 0,8", "60 + 0,4 + 0,08"], 1, "Onda birler 0, yüzde birler 4 → 0,04, binde birler 8 → 0,008."),
    (f"Bir bahçenin {k(1, 4)}'üne domates, {k(2, 5)}'ine biber ekildi. Bahçenin ne kadarı boş kaldı?", [k(3, 9), k(13, 20), k(7, 20), k(1, 3)], 2, "1/4 + 2/5 = 5/20 + 8/20 = 13/20. Kalan 7/20."),
    ("36'nın çarpanlarından kaç tanesi aynı zamanda 4'ün katıdır?", ["2", "3", "4", "5"], 1, "36'nın çarpanları: 1,2,3,4,6,9,12,18,36. 4'ün katı olanlar: 4, 12, 36 → 3."),
    ("“7A4” üç basamaklı sayısı hem 2'ye hem 9'a tam bölünüyor. A kaçtır?", ["3", "5", "7", "9"], 2, "Son rakam 4 → çift ✓. 7+A+4 = 11+A, 9'un katı → 18 → A = 7."),
    ("90 sayısının asal çarpanlarının toplamı kaçtır?", ["10", "11", "13", "15"], 0, "90 = 2 × 3² × 5 → asal çarpanlar 2, 3, 5 → 10."),
    ("Bir lambası 6 saniyede, diğeri 8 saniyede bir yanıyor. İkisi birlikte yandıktan kaç saniye sonra yine birlikte yanar?", ["14", "24", "36", "48"], 1, "Tekrar birlikte → EKOK(6, 8) = 24."),
    ("Bir torbada 5 kırmızı, 3 mavi, 4 yeşil bilye var. Rastgele çekilen bilyenin <b>mavi olmama</b> olasılığı nedir?", [k(3, 12), k(1, 4), k(3, 4), k(9, 3)], 2, "Mavi 3/12 = 1/4. Olmama: 1 − 1/4 = 3/4."),
    ("Bir zar atıldığında üst yüze 4'ten büyük bir sayı gelme olasılığı nedir?", [k(1, 6), k(1, 3), k(1, 2), k(2, 3)], 1, "4'ten büyük: 5, 6 → 2/6 = 1/3."),
    ("Aşağıdakilerden hangisi asal sayıdır?", ["21", "27", "29", "33"], 2, "21 = 3×7, 27 = 3×9, 33 = 3×11. 29 yalnız 1'e ve kendine bölünür."),
    ("45,372 sayısında 7 rakamının basamak değeri kaçtır?", ["7", "0,7", "0,07", "0,007"], 2, "7 yüzde birler basamağında → 0,07."),
    ("Hangi sıralama doğrudur?", ["0,4 < 0,35 < 0,305", "0,305 < 0,35 < 0,4", "0,35 < 0,305 < 0,4", "0,4 < 0,305 < 0,35"], 1, "Sıfır ekle: 0,305 < 0,350 < 0,400."),
    ("17 ÷ 4 işleminin sonucu hangi tam sayılı kesre eşittir?", [f"4 {k(1, 4)}", f"4 {k(1, 17)}", f"1 {k(13, 4)}", f"3 {k(5, 4)}"], 0, "17 = 4×4 + 1 → 4 tam 1/4."),
    (f"Bir öğrenci harçlığının {k(3, 5)}'ini kitaba harcadı. Harçlığı 250 TL ise kitaba kaç TL verdi?", ["50", "100", "150", "200"], 2, "250 × 3/5 = 150."),
]


SON5 = ["Kalansız bölüyorsa çarpan; çarparak gidiyorsan kat.",
        "“Tekrar birlikte” EKOK, “en büyük eşit parça” OBEB.",
        "Ondalıkta önce tam kısım, sonra onda birler; sona 0 ekleyerek eşitle.",
        "Paylaşılan pay, kişi sayısı payda; toplama-çıkarmada paydayı eşitle.",
        "Olasılık 0 ile 1 arası; olma + olmama = 1."]
