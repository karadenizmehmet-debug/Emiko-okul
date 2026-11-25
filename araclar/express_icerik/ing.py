"""İngilizce 6 · Express (deneme hazırlık, hap sürüm) · Mehmet Karadeniz, 2026-2027"""
from express_pdf import bolum, kutu, ul, tablo

AD = "İngilizce"
KAPAK_AD = "ENGLISH"
BASLIK = "İngilizce 6 · EXPRESS · Deneme Sınavına Hazırlık Hap Notu"
SURE = 20
KAPAK_P = ('<b style="color:#fff">Deneme sınavı için hap not.</b> Anahtar kelimeler, kalıplar, ⚡ ipuçları ve ⚠ tuzaklar. '
           'Sonda 10 soruluk mini deneme ve cevap anahtarı.')
HARITA = [
    ("ENG.6.1.1", "Roles and responsibilities at school", 2),
    ("ENG.6.1.3", "National days and celebrations", 2),
    ("ENG.6.2.5", "Actions happening now (present continuous)", 2),
    ("ENG.6.1.6 · 5.R1", "Routines, family hobbies (present simple)", 2),
    ("ENG.5.R2.4", "Ordering in a restaurant", 1),
    ("ENG.6.2.4", "Ordinal numbers 1-50", 1),
]
NASIL = "Zaman ipucuna bak: <b>every day, usually</b> → present simple · <b>now, Look!, at the moment</b> → am/is/are + -ing."


def okul():
    return (bolum("mavi", "ENG.6.1.1 · 6.1.3", "School roles · National days", "Denemede 4 soru")
            + '<div class="mavi">'
            + tablo(["Anahtar kelime", "Kim?", "Anahtar kelime", "Kim?"], [
                ["advice, listens", "<b>counsellor</b> (rehber öğr.)", "sick, first aid", "<b>school nurse</b>"],
                ["clean, fix doors", "<b>caretaker</b>", "meals, canteen", "<b>cook</b>"],
                ["books", "<b>librarian</b>", "manages the school", "<b>principal</b>"]])
            + tablo(["Tarih", "Gün", "Tarih", "Gün"], [
                ["23rd April", "Children's Day", "29th October", "<b>Republic Day</b>"],
                ["19th May", "Youth and Sports Day", "10th November", "Atatürk Commemoration Day (anma)"],
                ["30th August", "<b>Victory Day</b>", "24th November", "<b>Teachers' Day</b>"]])
            + kutu("vurucu", "Vurucu", "<b>on</b> + tarih/gün (on 29th October) · <b>in</b> + ay/yıl (in October) · <b>at</b> + saat (at 09.05). "
                   "he/she + fiil<b>-s</b>: The nurse help<b>s</b> sick students.")
            + '</div>')


def zamanlar():
    return (bolum("yesil", "ENG.6.1.6 · 5.R1.10 · 6.2.5", "Present simple · Present continuous", "Denemede 4 soru")
            + '<div class="yesil">'
            + tablo(["", "Present simple (her zaman)", "Present continuous (şu an)"], [
                ["İpucu", "every day, always, usually, never", "now, at the moment, Look!, Listen!"],
                ["(+)", "She <b>plays</b> chess.", "She <b>is playing</b> chess."],
                ["(−)", "He <b>doesn't</b> play.", "He <b>isn't</b> playing."],
                ["(?)", "<b>Does</b> she play? Yes, she does.", "<b>Is</b> she playing? Yes, she is."]])
            + ul("-s/-es/-ies: watch → watch<b>es</b>, go → go<b>es</b>, study → stud<b>ies</b>, have → <b>has</b>.",
                 "-ing: write → writ<b>ing</b>, sit → si<b>tt</b>ing, swim → swi<b>mm</b>ing.",
                 "Hobi: like / love / enjoy + <b>-ing</b>: My father likes fish<b>ing</b>.")
            + kutu("tuzak", "Tuzak", "She don't ✗ → doesn't · Does he plays ✗ → play · She reading ✗ → is reading · They is ✗ → are")
            + '</div>')


def diger():
    return (bolum("mor", "ENG.5.R2.4 · 6.2.4", "Restaurant · Ordinal numbers", "Denemede 2 soru")
            + '<div class="mor">'
            + ul("<b>What would you like to eat/drink?</b> → <b>I'd like</b> a pizza / a glass of water, please.",
                 "<b>How much is it?</b> → It's 80 liras. · Hesap: <b>the bill</b> · Garson: Here you are. Enjoy your meal!",
                 "<b>1st</b> first · <b>2nd</b> second · <b>3rd</b> third · 5th <b>fifth</b> · 8th <b>eighth</b> · 9th <b>ninth</b> · 12th <b>twelfth</b> · 20th twentieth · <b>21st, 22nd, 23rd</b>")
            + kutu("tuzak", "Tuzak", "11th, 12th, 13th istisna (11st değil). “Here you are” garsonun sözüdür, müşterinin değil.")
            + '</div>')


def govde():
    return okul() + zamanlar() + diger()


SORULAR = [
    ("“He listens to students and gives them advice.” Who is he?", ["the cook", "the counsellor", "the caretaker", "the librarian"], 1, "advice (tavsiye) → counsellor (rehber öğretmen)."),
    ("Ali: My father loves ___. He goes to the lake every Sunday.", ["fishing", "fish", "fishes", "to fishing"], 0, "love + fiil-ing; göl ipucu → fishing."),
    ("Which sentence is about a <b>routine</b>?", ["Look! It is raining.", "She usually gets up at 7 o'clock.", "They are watching TV now.", "I am drawing a picture."], 1, "usually → rutin → present simple."),
    ("We celebrate Republic Day ___ 29th October.", ["in", "at", "on", "for"], 2, "Tarih → on."),
    ("Waiter: What would you like to drink? Customer: ___", ["I'd like a glass of water, please.", "Here you are.", "It's 80 liras.", "Enjoy your meal!"], 0, "İçecek sorusuna kibar istek: I'd like…"),
    ("On ___ students give flowers to their teachers.", ["23rd April", "24th November", "30th August", "10th November"], 1, "24 November = Teachers' Day."),
    ("“She keeps the school clean and fixes the broken doors.” Who is she?", ["the principal", "the school nurse", "the caretaker", "the class president"], 2, "clean + fix → caretaker."),
    ("Our classroom is on the ___ floor. (3)", ["three", "third", "thirth", "threeth"], 1, "3 → third."),
    ("Look! Ayşe ___ the plants.", ["water", "waters", "is watering", "are watering"], 2, "Look! → şu an → is + -ing (Ayşe = she)."),
    ("A: What are the students doing? B: ___", ["They are writing a story.", "They write stories every day.", "Yes, they are.", "They is reading."], 0, "What … doing? → are + -ing."),
]


SON5 = ["Görev ipucu: advice → counsellor, sick → nurse, clean/fix → caretaker.",
        "Tarih → on, ay → in, saat → at.",
        "Her gün / usually → present simple (he/she + s).",
        "Now / Look! → am / is / are + -ing.",
        "1st, 2nd, 3rd; 11th, 12th, 13th istisna."]
