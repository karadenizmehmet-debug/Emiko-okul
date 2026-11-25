/* Ders Rotası 6 · Deneme Sınavı · Matematik · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
tema("deneme",{
id:"mat",no:"Deneme · 15 soru",ad:"Matematik",ozet:"Bölünebilme, asal sayılar, EKOK-OBEB, ondalık gösterim, kesirler ve olasılık",
express:{pdf:"pdf/mat-express.pdf",ad:"Mat6_Express_Deneme_Hazirlik.pdf",baslik:"Matematik Express · deneme hap notu",acik:"4 sayfa A4 hap not: kurallar, çözüm kalıpları, tuzaklar; sonda 15 soruluk mini deneme ve cevap anahtarı.",kaz:["MAT.6.1.1","MAT.6.1.2","MAT.6.1.3","MAT.6.1.4","MAT.6.1.5","MAT.6.1.6","MAT.6.1.8","MAT.6.6.1"]},
ic:'<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="7" width="34" height="34" rx="6" fill="#fff1e6" stroke="#e4572e" stroke-width="2.5"/><path d="M15 24h18M24 15v18" stroke="#e4572e" stroke-width="3" stroke-linecap="round"/></svg>',
konu:[
{id:"dm1",nav:"Sayılar",html:`
<div class="eyebrow">MAT.6.1.1 → 6.1.4 · Denemede 5 soru</div>
<h2>Bölünebilme, asal, EKOK-OBEB</h2>
<div class="tbl"><table><thead><tr><th>÷</th><th>Kural</th><th>÷</th><th>Kural</th></tr></thead><tbody>
<tr><td>2</td><td>son rakam çift</td><td>6</td><td>hem 2 hem 3</td></tr>
<tr><td>3</td><td>rakamlar toplamı 3'ün katı</td><td>9</td><td>rakamlar toplamı 9'un katı</td></tr>
<tr><td>4</td><td><b>son iki basamak</b> 4'ün katı</td><td>10</td><td>son rakam 0</td></tr>
<tr><td>5</td><td>son rakam 0 ya da 5</td><td></td><td></td></tr>
</tbody></table></div>
<div class="rule">1 asal DEĞİL · 2 tek ÇİFT asal · 2, 3, 5, 7, 11, 13, 17, 19, 23, 29</div>
<div class="tbl"><table><thead><tr><th></th><th>EKOK</th><th>OBEB</th></tr></thead><tbody>
<tr><td>İşaret</td><td>tekrar <b>birlikte</b>, aynı anda</td><td><b>en büyük</b> eşit parça</td></tr>
<tr><td>12 ve 18</td><td>36</td><td>6</td></tr>
</tbody></table></div>
<div class="box myth"><span class="bt">Tuzak</span><p>60 = 2² × 3 × 5 → asal çarpanları <b>2, 3, 5</b>: tekrar eden bir kez sayılır. Her tek sayı asal değildir: 9, 15, 21.</p></div>`},
{id:"dm2",nav:"Ondalık gösterim",html:`
<div class="eyebrow">MAT.6.1.5 · Denemede 3 soru · Yeni konu</div>
<h2>Ondalık gösterim</h2>
<div class="tbl"><table><thead><tr><th>Birler</th><th>,</th><th>Onda birler</th><th>Yüzde birler</th><th>Binde birler</th></tr></thead><tbody>
<tr><td>4</td><td>,</td><td>3 → 0,3</td><td>7 → 0,07</td><td>5 → 0,005</td></tr>
</tbody></table></div>
<div class="cards4">
 <div class="mini"><h4>Kesirden</h4><p>3/5 = 6/10 = <b>0,6</b> · 1/4 = 25/100 = <b>0,25</b></p></div>
 <div class="mini"><h4>Çözümleme</h4><p>36,52 = 30 + 6 + 0,5 + 0,02</p></div>
 <div class="mini"><h4>Boş basamak</h4><p>4,07 = 4 + 0,07 (onda birler 0)</p></div>
 <div class="mini"><h4>Sıralama</h4><p>Sona 0 ekle: 0,5 = 0,50 &gt; 0,45</p></div>
</div>
<div class="box myth"><span class="bt">Tuzak</span><p>“Basamağı çok olan büyüktür.” Hayır: 0,125 &lt; 0,3. Sondaki 0 değeri değiştirmez (3,40 = 3,4), araya giren değiştirir (3,04 ≠ 3,4).</p></div>`},
{id:"dm3",nav:"Kesirler",html:`
<div class="eyebrow">MAT.6.1.6 · 6.1.8 · Denemede 4 soru</div>
<h2>Kesir-bölme ilişkisi, kesirlerle işlemler</h2>
<div class="rule">KESİR = PAY ÷ PAYDA. Paylaşılan PAY, kişi sayısı PAYDA olur. 3 pizza 4 kişiye → 3/4.</div>
<div class="tbl"><table><thead><tr><th>Durum</th><th>Sonuç</th></tr></thead><tbody>
<tr><td>17 ÷ 5</td><td>3 kalan 2 → 3 tam 2/5 (kalan pay olur)</td></tr>
<tr><td>Toplama-çıkarma</td><td><b>paydayı eşitle</b>: 1/4 + 1/6 = 3/12 + 2/12 = 5/12</td></tr>
<tr><td>Çarpma</td><td>pay×pay, payda×payda: 2/3 × 3/5 = 2/5</td></tr>
<tr><td>Bir çokluğun kesri</td><td>30'un 2/5'i = 30 × 2/5 = 12</td></tr>
<tr><td>Kalan ne kadar?</td><td>bütün = 1 → 1 − 7/12 = 5/12</td></tr>
</tbody></table></div>
<div class="box myth"><span class="bt">Tuzak</span><p>1/2 + 1/3 ≠ 2/5! Paydalar toplanmaz: 5/6. Tam sayılıdan çıkarırken tamı unutma: 3 − 1/4 = 2 tam 3/4.</p></div>`},
{id:"dm4",nav:"Olasılık",html:`
<div class="eyebrow">MAT.6.6.1 · Denemede 3 soru</div>
<h2>Olasılık</h2>
<div class="rule">OLASILIK = İSTENEN ÷ TÜMÜ · 0 imkânsız, 1 kesin · olma + olmama = 1</div>
<div class="cards4">
 <div class="mini"><h4>Zar</h4><p>4'ten büyük: 5, 6 → 2/6 = 1/3. 7 gelmesi: 0.</p></div>
 <div class="mini"><h4>Torba</h4><p>3 kırmızı, 5 mavi: kırmızı 3/8, kırmızı olmama 5/8.</p></div>
 <div class="mini"><h4>Deneysel</h4><p>40 atış, 22 tura → 22/40 = 0,55.</p></div>
 <div class="mini"><h4>Çok deneme</h4><p>Deney sayısı artınca teorik olasılığa (½) yaklaşır.</p></div>
</div>
<div class="box myth"><span class="bt">Tuzak</span><p>Olasılık 1'den büyük olamaz. Gerçekleşme sayısı deney sayısını geçemez. Torbaya top eklenince <b>tümü</b> de artar.</p></div>`}
],
q:{
det:[
{title:"Birlikte çalan ziller",story:"Bir lamba 6 saniyede, diğeri 8 saniyede bir yanıyor. İkisi aynı anda yandı.",clues:["“Tekrar birlikte” soruluyor.","Ortak kat aranıyor.","En küçük ortak kat."],q:"Kaç saniye sonra tekrar birlikte yanarlar?",o:["14","24","36","48"],a:1,ex:"EKOK(6, 8) = 24."},
{title:"Pasta paylaşımı",story:"Ali pastanın 2/5'ini, Can 1/3'ünü yedi.",clues:["Paydaları eşitle: 15.","2/5 = 6/15, 1/3 = 5/15."],q:"Pastanın ne kadarı kaldı?",o:["3/8","11/15","4/15","1/5"],a:2,ex:"6/15 + 5/15 = 11/15; kalan 4/15."}
],
dy:[
{q:"1 asal sayıdır.",a:1,ex:"Yanlış. Asal sayılar 2'den başlar."},
{q:"Rakamları toplamı 9'un katı olan sayı 3'e de bölünür.",a:0,ex:"Doğru."},
{q:"0,7 ile 0,07 eşittir.",a:1,ex:"Yanlış. 0,7 onda 7, 0,07 yüzde 7."},
{q:"3,40 ile 3,4 eşittir.",a:0,ex:"Doğru. Sondaki 0 değeri değiştirmez."},
{q:"1/2 + 1/3 = 2/5'tir.",a:1,ex:"Yanlış. 5/6."},
{q:"5 pizza 8 kişiye paylaştırılırsa herkese 5/8 düşer.",a:0,ex:"Doğru."},
{q:"Olasılık değeri 1'den büyük olabilir.",a:1,ex:"Yanlış. 0 ile 1 arasındadır."},
{q:"Deney sayısı arttıkça deneysel olasılık teorik olasılığa yaklaşır.",a:0,ex:"Doğru."}
],
test:[{"q": "5 kg peynir 8 eşit paketlendi. Bir paket kaç kg'dır?", "o": ["8/5 kg", "5/8 kg", "3 kg", "13 kg"], "a": 1, "ex": "Paylaşılan pay, paket sayısı payda: 5 ÷ 8 = 5/8."}, {"q": "Bir para 40 kez atıldı ve 22 kez tura geldi. Buna göre hangisi <b>yanlıştır</b>?", "o": ["Yazı 18 kez gelmiştir.", "Turanın deneysel olasılığı 0,55'tir.", "Atış sayısı artarsa deneysel olasılık 1/2'ye yaklaşır.", "Tura gelme sayısı 40'tan fazla olabilir."], "a": 3, "ex": "Gerçekleşme sayısı deney sayısını geçemez."}, {"q": "6,048 sayısının çözümlenmiş hâli hangisidir?", "o": ["6 + 0,4 + 0,08", "6 + 0,04 + 0,008", "6 + 0,04 + 0,8", "60 + 0,4 + 0,08"], "a": 1, "ex": "Onda birler 0, yüzde birler 4 → 0,04, binde birler 8 → 0,008."}, {"q": "Bir bahçenin 1/4'üne domates, 2/5'ine biber ekildi. Bahçenin ne kadarı boş kaldı?", "o": ["3/9", "13/20", "7/20", "1/3"], "a": 2, "ex": "1/4 + 2/5 = 5/20 + 8/20 = 13/20. Kalan 7/20."}, {"q": "36'nın çarpanlarından kaç tanesi aynı zamanda 4'ün katıdır?", "o": ["2", "3", "4", "5"], "a": 1, "ex": "36'nın çarpanları: 1,2,3,4,6,9,12,18,36. 4'ün katı olanlar: 4, 12, 36 → 3."}, {"q": "“7A4” üç basamaklı sayısı hem 2'ye hem 9'a tam bölünüyor. A kaçtır?", "o": ["3", "5", "7", "9"], "a": 2, "ex": "Son rakam 4 → çift ✓. 7+A+4 = 11+A, 9'un katı → 18 → A = 7."}, {"q": "90 sayısının asal çarpanlarının toplamı kaçtır?", "o": ["10", "11", "13", "15"], "a": 0, "ex": "90 = 2 × 3² × 5 → asal çarpanlar 2, 3, 5 → 10."}, {"q": "Bir lambası 6 saniyede, diğeri 8 saniyede bir yanıyor. İkisi birlikte yandıktan kaç saniye sonra yine birlikte yanar?", "o": ["14", "24", "36", "48"], "a": 1, "ex": "Tekrar birlikte → EKOK(6, 8) = 24."}, {"q": "Bir torbada 5 kırmızı, 3 mavi, 4 yeşil bilye var. Rastgele çekilen bilyenin <b>mavi olmama</b> olasılığı nedir?", "o": ["3/12", "1/4", "3/4", "9/3"], "a": 2, "ex": "Mavi 3/12 = 1/4. Olmama: 1 − 1/4 = 3/4."}, {"q": "Bir zar atıldığında üst yüze 4'ten büyük bir sayı gelme olasılığı nedir?", "o": ["1/6", "1/3", "1/2", "2/3"], "a": 1, "ex": "4'ten büyük: 5, 6 → 2/6 = 1/3."}, {"q": "Aşağıdakilerden hangisi asal sayıdır?", "o": ["21", "27", "29", "33"], "a": 2, "ex": "21 = 3×7, 27 = 3×9, 33 = 3×11. 29 yalnız 1'e ve kendine bölünür."}, {"q": "45,372 sayısında 7 rakamının basamak değeri kaçtır?", "o": ["7", "0,7", "0,07", "0,007"], "a": 2, "ex": "7 yüzde birler basamağında → 0,07."}, {"q": "Hangi sıralama doğrudur?", "o": ["0,4 < 0,35 < 0,305", "0,305 < 0,35 < 0,4", "0,35 < 0,305 < 0,4", "0,4 < 0,305 < 0,35"], "a": 1, "ex": "Sıfır ekle: 0,305 < 0,350 < 0,400."}, {"q": "17 ÷ 4 işleminin sonucu hangi tam sayılı kesre eşittir?", "o": ["4 1/4", "4 1/17", "1 13/4", "3 5/4"], "a": 0, "ex": "17 = 4×4 + 1 → 4 tam 1/4."}, {"q": "Bir öğrenci harçlığının 3/5'ini kitaba harcadı. Harçlığı 250 TL ise kitaba kaç TL verdi?", "o": ["50", "100", "150", "200"], "a": 2, "ex": "250 × 3/5 = 150."}],
match:[
{title:"Bölünebilme",p:[["Son iki basamağa bak","4"],["Son rakam 0 ya da 5","5"],["Hem 2 hem 3","6"],["Rakamlar toplamı 9'un katı","9"],["Son rakam 0","10"]]},
{title:"Ondalık ve kesir",p:[["0,3","3/10"],["0,25","1/4"],["0,6","3/5"],["0,07","7/100"],["0,5","1/2"]]}
],
fill:{items:[
{t:"Yalnızca 1'e ve kendisine bölünen, 1'den büyük sayıya ___ sayı denir.",a:"asal"},
{t:"“Tekrar birlikte” sorularında ___ bulunur.",a:"EKOK"},
{t:"“En büyük eşit parça” sorularında ___ bulunur.",a:"OBEB"},
{t:"Kesir çizgisi ___ işlemi anlamına gelir.",a:"bölme"},
{t:"Kesirleri toplarken önce ___ eşitlenir.",a:"paydalar"},
{t:"Kesin olayın olasılığı ___ olur.",a:"1"}],extra:["0","paylar","çarpma","EKOK-OBEB"]},
sira:[
{title:"Küçükten büyüğe sırala.",i:["0,065","0,305","0,35","0,4","0,56"]},
{title:"Farklı paydalı kesirleri toplama adımları",i:["Paydaların EKOK'unu bul","Kesirleri genişlet","Payları topla","Sonucu sadeleştir"]}
],
klasik:[
{q:"24 m ve 36 m'lik iki ip artmadan eşit ve en uzun parçalara kesilecek. Bir parça kaç m, kaç parça olur?",s:"OBEB(24, 36) = 12 m. 24 ÷ 12 + 36 ÷ 12 = 2 + 3 = 5 parça.",p:[{t:"OBEB",k:["12","obeb"]},{t:"Parça sayısı",k:["5"]}]},
{q:"0,5 ile 0,45'i karşılaştır, nasıl düşündüğünü yaz.",s:"Basamak sayısını eşitlerim: 0,50 ile 0,45. 50 > 45 olduğu için 0,5 büyüktür.",p:[{t:"Eşitleme",k:["0,50","sıfır","0 ekle","eşitle"]},{t:"Sonuç",k:["0,5 büyük","büyüktür"]}]},
{q:"Bir torbada 4 sarı, 6 yeşil top var. Yeşil çekme olasılığını bul; 2 sarı eklenirse sarı çekme olasılığı ne olur?",s:"Yeşil: 6/10 = 3/5. 2 sarı eklenince 6 sarı, 12 top: 6/12 = 1/2.",p:[{t:"Yeşil",k:["6/10","3/5"]},{t:"Yeni sarı",k:["6/12","1/2"]}]}
]
}
});
