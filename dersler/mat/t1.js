/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
tema("mat",{
id:"t1",no:"1. Tema (1. bölüm) · 15 ders saati",ad:"Sayılar ve Nicelikler",ozet:"Çarpan ve kat, bölünebilme, asal sayılar, EKOK ve OBEB",pdf:"pdf/mat-tema1.pdf",pdfAd:"Mat6_Tema1_Sayilar_ve_Nicelikler.pdf",pdfSayfa:4,ic:'<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><g fill="var(--amber)"><rect x="4" y="8" width="10" height="10" rx="2"/><rect x="16" y="8" width="10" height="10" rx="2"/><rect x="28" y="8" width="10" height="10" rx="2"/><rect x="4" y="20" width="10" height="10" rx="2"/><rect x="16" y="20" width="10" height="10" rx="2"/><rect x="28" y="20" width="10" height="10" rx="2"/></g><text x="24" y="45" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)" font-family="JetBrains Mono">2·3=6</text></svg>',
/* ---------- KONU ANLATIMI (her öğe bir bölüm; uzun bölümler <!--PAGE--> ile sayfalara ayrılır) ---------- */
konu:[
{id:"m1s1",nav:"Çarpan ve Kat",html:`
<div class="eyebrow">Bölüm 1 · Giriş</div>
<h2>Çarpan ve kat: Bir sayının ailesi</h2>
<p>Bir sayıyı <b>kalansız bölen</b> doğal sayılara o sayının <span class="hl">çarpanları</span> (bölenleri) denir. Bir sayının doğal sayılarla çarpılmasıyla elde edilen sayılara da o sayının <span class="hl">katları</span> denir.</p>
<div class="rule">12 = 3 · 4 ise 3 ve 4, 12'nin çarpanıdır; 12 de hem 3'ün hem 4'ün katıdır.</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Beden eğitimi öğretmeni <b>12 öğrenciyi</b> eşit sıralara dizmek istiyor. 1 sırada 12 kişi, 2 sırada 6'şar, 3 sırada 4'er, 4 sırada 3'er, 6 sırada 2'şer ya da 12 sırada 1'er kişi olabilir. Kimse dışarıda kalmadan dizilebilen her sıra sayısı <b>12'nin bir çarpanıdır</b>. 5 sıra olmaz, çünkü 12 öğrenci 5 sıraya eşit dağılmaz, 2 öğrenci artar.</p></div>
<p>Aşağıda bir sayı seç. O kadar kareyi kaç farklı dikdörtgen hâlinde dizebildiğine bak. Her dikdörtgenin kenarları, o sayının bir <b>çarpan çiftidir</b>.</p>
<div class="widget"><div class="wh">Etkileşimli · Dikdörtgen dizici</div><div class="wb" data-w="carpan"></div></div>
<!--PAGE--><h2>Çarpanları eksiksiz bulma yöntemi</h2>
<p>Çarpanları ararken <b>çiftler hâlinde</b> ilerlersek hiçbirini unutmayız. 1'den başlayıp sırayla deneriz. Çarpanlar birbirine yetiştiğinde dururuz.</p>
<div class="tbl"><table>
<tr><th>Deneme</th><th>36'yı böler mi?</th><th>Çarpan çifti</th></tr>
<tr><td>1</td><td class="c yes">✓</td><td class="c">1 · 36</td></tr>
<tr><td>2</td><td class="c yes">✓</td><td class="c">2 · 18</td></tr>
<tr><td>3</td><td class="c yes">✓</td><td class="c">3 · 12</td></tr>
<tr><td>4</td><td class="c yes">✓</td><td class="c">4 · 9</td></tr>
<tr><td>5</td><td class="c no">–</td><td class="c no">kalan 1</td></tr>
<tr><td>6</td><td class="c yes">✓</td><td class="c">6 · 6 (durduk!)</td></tr>
</table></div>
<p>Buna göre 36'nın çarpanları: <b>1, 2, 3, 4, 6, 9, 12, 18, 36</b>. Toplam 9 çarpanı vardır.</p>
<div class="box know"><span class="bt">Akılda tut</span><p><b>1</b> her doğal sayının çarpanıdır. Bir sayının <b>en küçük çarpanı 1</b>, <b>en büyük çarpanı kendisidir</b>. Sıfırdan farklı bir sayının en küçük katı da kendisidir.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Katlar gibi çarpanlar da sonsuza kadar gider.”</b> Hayır! Bir sayının çarpanları <b>sınırlıdır</b> (sayıyı geçemez). Katları ise <b>sonsuzdur</b>: 7, 14, 21, 28, 35, … diye hiç bitmeden devam eder.</p></div>
<!--PAGE--><h2>Katlar her yerde</h2>
<p>Bir sayının katlarını bulmak için sayıyı sırayla 1, 2, 3, 4, … ile çarparız. 6'nın katları: <b>6, 12, 18, 24, 30, 36, …</b></p>
<div class="cards4">
 <div class="mini"><h4>Otobüs saatleri</h4><p>Belediye otobüsü duraktan 15 dakikada bir kalkıyor: 15., 30., 45., 60. dakikalar… Hepsi 15'in katı.</p></div>
 <div class="mini"><h4>Yumurta kolisi</h4><p>Kolilerde 30 yumurta var. 1, 2, 3 koli alınca 30, 60, 90 yumurta olur. Toplam her zaman 30'un katıdır.</p></div>
 <div class="mini"><h4>Takvim</h4><p>Bugün pazartesi ise 7, 14, 21, 28 gün sonra yine pazartesidir. Haftalar 7'nin katlarıyla ilerler.</p></div>
 <div class="mini"><h4>Ayakkabı çifti</h4><p>Raftaki tek tek ayakkabılar sayılırsa sonuç hep 2'nin katı, yani çift sayıdır.</p></div>
</div>
<div class="box teach"><span class="bt">Kendini yokla</span><p>“24 bir katsa kimin katıdır?” sorusu ile “24'ün çarpanları nedir?” sorusu aynı cevaba çıkar: 1, 2, 3, 4, 6, 8, 12, 24. Çünkü <b>a sayısı b'nin çarpanıysa, b de a'nın katıdır.</b></p></div>`},
{id:"m1s2",nav:"Bölünebilme Kuralları",html:`
<div class="eyebrow">Bölüm 2 · Kısa yollar</div>
<h2>Bölmeden bölünüp bölünmediğini anlamak</h2>
<p>Büyük bir sayının 2, 3, 4, 5, 6, 9 ya da 10'a kalansız bölünüp bölünmediğini, bölme işlemi yapmadan anlayabiliriz. Bunun için sayının <b>son basamaklarına</b> ya da <b>rakamlarının toplamına</b> bakarız.</p>
<div class="tbl"><table>
<tr><th>Bölen</th><th>Neye bakarız?</th><th>Örnek</th></tr>
<tr><td class="c">2</td><td>Birler basamağı 0, 2, 4, 6 ya da 8 (çift) olmalı.</td><td>3 <b>4</b> 8 ✓</td></tr>
<tr><td class="c">5</td><td>Birler basamağı 0 ya da 5 olmalı.</td><td>73 <b>5</b> ✓</td></tr>
<tr><td class="c">10</td><td>Birler basamağı 0 olmalı.</td><td>47 <b>0</b> ✓</td></tr>
<tr><td class="c">4</td><td>Son iki basamağın oluşturduğu sayı 4'ün katı (ya da 00) olmalı.</td><td>1 3<b>16</b> → 16 ✓</td></tr>
<tr><td class="c">3</td><td>Rakamlar toplamı 3'ün katı olmalı.</td><td>156 → 1+5+6 = 12 ✓</td></tr>
<tr><td class="c">9</td><td>Rakamlar toplamı 9'un katı olmalı.</td><td>468 → 4+6+8 = 18 ✓</td></tr>
<tr><td class="c">6</td><td>Hem 2'ye hem 3'e bölünmeli.</td><td>234 → çift ve 2+3+4 = 9 ✓</td></tr>
</table></div>
<div class="widget"><div class="wh">Etkileşimli · Bölünebilme dedektörü</div><div class="wb" data-w="bolun"></div></div>
<!--PAGE--><h2>Kuralları akılda tutmanın yolu</h2>
<div class="cards4">
 <div class="mini"><h4>Son basamak ailesi: 2, 5, 10</h4><p>Bu sayılarda sadece birler basamağı belirleyicidir. Çünkü 10 hem 2'nin hem 5'in katıdır.</p></div>
 <div class="mini"><h4>Son iki basamak: 4</h4><p>100, 4'ün katıdır. Yüzler ve daha büyük basamaklar hep 4'e bölünür, geriye son iki basamak kalır.</p></div>
 <div class="mini"><h4>Rakam toplamı ailesi: 3, 9</h4><p>Rakamları topla. Toplam 9'un katıysa sayı hem 9'a hem 3'e bölünür. Toplam sadece 3'ün katıysa 9'a bölünmez.</p></div>
 <div class="mini"><h4>İkili kural: 6</h4><p>6 = 2 · 3. Önce “çift mi?” sor, sonra rakamları topla. İkisi birden tutmalı.</p></div>
</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Annen pazardan <b>126 tane ceviz</b> aldı. Üç kardeşe eşit paylaştırmak istiyor. 1 + 2 + 6 = 9, yani 9 da 3'ün katı. Cevizler kimseye haksızlık olmadan <b>3 kardeşe 42'şer</b> bölünür. Hatta 9 da 9'un katı olduğu için 9 kişiye de 14'er paylaşılabilir.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Son basamağı 4'e bölünen sayı 4'e bölünür.”</b> Hayır! 134'ün son basamağı 4 ama 34, 4'ün katı değil; 134 de 4'e bölünmez. 4 için mutlaka <b>son iki basamağa</b> bakılır.</p></div>
<!--PAGE--><h2>Bilinmeyen rakamı bulalım</h2>
<p>Sınavlarda sık karşılaşılan bir soru tipi: Sayının içindeki bir rakam yerine harf yazılır, bölünebilme şartına göre harfin değeri bulunur.</p>
<div class="chain">
 <div class="st"><b>1. Şartı yaz</b><span>4A6 sayısı 3 ile bölünüyor.</span></div><span class="ar">→</span>
 <div class="st"><b>2. Rakamları topla</b><span>4 + A + 6 = 10 + A</span></div><span class="ar">→</span>
 <div class="st"><b>3. 3'ün katlarını dene</b><span>12, 15, 18 olabilir</span></div><span class="ar">→</span>
 <div class="st"><b>4. Sonuç</b><span>A = 2, 5 ya da 8</span></div>
</div>
<div class="box know"><span class="bt">Örnek</span><p><b>52A</b> sayısı 4 ile bölünüyorsa A'nın alabileceği değerler: Son iki basamak <b>2A</b> olmalı ve 4'ün katı olmalı. 20, 24, 28 → A = <b>0, 4 ya da 8</b>. En büyük değer 8'dir.</p></div>
<div class="box know"><span class="bt">Örnek</span><p><b>3A5</b> sayısı 5 ve 9 ile bölünüyorsa: Son basamak 5 olduğu için 5 şartı zaten tutuyor. 3 + A + 5 = 8 + A toplamı 9'un katı olmalı → A = <b>1</b>.</p></div>
<div class="box teach"><span class="bt">Kalanı da bulabilirsin</span><p>247'nin 5'e bölümünden kalan, son basamak 7'nin 5'e bölümünden kalana eşittir: <b>2</b>. 247'nin 3'e bölümünden kalan, rakamlar toplamı 13'ün 3'e bölümünden kalana eşittir: <b>1</b>.</p></div>`},
{id:"m1s3",nav:"Asal Sayılar",html:`
<div class="eyebrow">Bölüm 3 · Sayıların yapı taşları</div>
<h2>Asal sayılar: Bölünmeyen, yıkılmayan sayılar</h2>
<p>1'den büyük olup <b>yalnızca 1'e ve kendisine</b> bölünen doğal sayılara <span class="hl">asal sayı</span> denir. Asal olmayan, 1'den büyük sayılara <span class="hl">bileşik sayı</span> denir.</p>
<div class="rule">İlk asal sayılar: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 …</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>13 bilyeyi kardeşinle eşit gruplara ayırmayı dene: 2'şerli, 3'erli, 4'erli… Hep bilye artar. 13'ü ancak 1 grupta 13 ya da 13 grupta 1'er diye dizebilirsin. İşte bu yüzden 13 asaldır. 12 ise 2'şerli, 3'erli, 4'erli, 6'şarlı gruplara ayrılır; 12 bileşiktir.</p></div>
<p>Eski Yunan matematikçisi Eratosthenes, asal sayıları bulmak için bir <b>kalbur</b> yöntemi geliştirmiştir. Asal bir sayının katlarını sırayla eleriz; elenmeden kalanlar asaldır. Sen de dene:</p>
<div class="widget"><div class="wh">Etkileşimli · Eratosthenes kalburu</div><div class="wb" data-w="kalbur"></div></div>
<!--PAGE--><h2>Asallar hakkında bilmen gerekenler</h2>
<div class="cards4">
 <div class="mini"><h4>1 asal değildir</h4><p>Asal sayının tam iki farklı böleni olmalı. 1'in yalnızca bir böleni (kendisi) vardır. 1 ne asaldır ne bileşik.</p></div>
 <div class="mini"><h4>2 tek çift asaldır</h4><p>Diğer bütün çift sayılar 2'ye bölündüğü için asal olamaz. En küçük asal sayı da 2'dir.</p></div>
 <div class="mini"><h4>Her tek sayı asal değildir</h4><p>9 = 3 · 3, 15 = 3 · 5, 21 = 3 · 7, 25 = 5 · 5. Bunlar tek ama bileşik sayılardır.</p></div>
 <div class="mini"><h4>Asallar sonsuzdur</h4><p>Ne kadar büyük bir asal bulursan bul, ondan da büyük bir asal vardır. Sayılar büyüdükçe asallar seyrekleşir ama bitmez.</p></div>
</div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Sonu 1, 3, 7, 9 ile biten sayılar asaldır.”</b> Hayır! 21, 27, 33, 39, 49, 51 gibi sayılar böyle biter ama bileşiktir. 51 = 3 · 17. Kontrol için bölünebilme kurallarını kullan.</p></div>
<div class="box know"><span class="bt">Bir sayı asal mı? Kısa test</span><p>Sayıyı sırayla <b>2, 3, 5, 7</b> ile bölmeyi dene. 100'den küçük bir sayı bunların hiçbirine bölünmüyorsa asaldır. Örnek: 91 → 2'ye, 3'e, 5'e bölünmez ama 7'ye bölünür (91 = 7 · 13). 91 asal değildir.</p></div>
<div class="box life"><span class="bt">Gerçek hayatta asallar</span><p>İnternette şifreler, kredi kartı bilgileri ve mesajlar korunurken çok büyük asal sayılardan yararlanılır. Banka uygulamandaki güvenlik, asal sayıların bölünmeye karşı “inatçı” olmasına dayanır.</p></div>`},
{id:"m1s4",nav:"Asal Çarpanlara Ayırma",html:`
<div class="eyebrow">Bölüm 4 · Parçalara ayır</div>
<h2>Her sayı asalların çarpımıdır</h2>
<p>1'den büyük her bileşik sayı, asal sayıların çarpımı şeklinde yazılabilir. Bir sayıyı bu şekilde yazmaya <span class="hl">asal çarpanlara ayırma</span> denir. Asal sayılar, sayıların <b>yapı taşları</b> gibidir.</p>
<div class="box life"><span class="bt">Günlük hayattan</span><p>LEGO ile yapılmış bir kaleyi parça parça sökersen en sonunda daha fazla sökülemeyen küçük tuğlalar kalır. 60 sayısını “sökersek” elimizde kalan tuğlalar 2, 2, 3 ve 5'tir.</p></div>
<h3>Yöntem 1: Çarpan ağacı</h3>
<p>Sayıyı herhangi iki çarpanına ayır. Asal olan dallar biter, bileşik olanları ayırmaya devam et.</p>
<div class="widget"><div class="wh">Etkileşimli · Çarpan ağacı</div><div class="wb" data-w="agac"></div></div>
<!--PAGE--><h3>Yöntem 2: Bölen merdiveni</h3>
<p>Sayıyı, onu bölen <b>en küçük asal sayıya</b> böleriz. Bölümü yine bölebildiğimiz en küçük asala böleriz. 1'e ulaşınca dururuz. Sağ taraftaki sayılar asal çarpanlardır.</p>
<div class="tbl"><table style="min-width:280px;max-width:360px">
<tr><th>Sayı</th><th>Asal bölen</th></tr>
<tr><td class="c">84</td><td class="c">2</td></tr>
<tr><td class="c">42</td><td class="c">2</td></tr>
<tr><td class="c">21</td><td class="c">3</td></tr>
<tr><td class="c">7</td><td class="c">7</td></tr>
<tr><td class="c">1</td><td class="c no">bitti</td></tr>
</table></div>
<div class="rule">84 = 2 · 2 · 3 · 7 &nbsp;(kısaca 2² · 3 · 7)</div>
<p>Hangi yöntemle başlarsan başla, bir sayının asal çarpanları <b>hep aynıdır</b>. Sadece yazılış sırası değişebilir.</p>
<div class="box know"><span class="bt">Asal çarpan ile asal çarpanlar çarpımı</span><p>Soru “84'ün <b>asal çarpanları</b> nelerdir?” diyorsa cevap tekrar etmeden yazılır: <b>2, 3, 7</b>. Soru “84'ü asal çarpanlarına ayırınız” diyorsa çarpım yazılır: <b>2 · 2 · 3 · 7</b>.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“60 = 4 · 15 diye yazdım, bitti.”</b> Hayır! 4 ve 15 asal değildir. Ayırmaya devam edilmeli: 4 = 2 · 2, 15 = 3 · 5. Sonuç: 60 = 2 · 2 · 3 · 5.</p></div>`},
{id:"m1s5",nav:"Ortak Kat (EKOK)",html:`
<div class="eyebrow">Bölüm 5 · Yeniden buluşma</div>
<h2>Ortak katlar ve en küçük ortak kat</h2>
<p>İki ya da daha fazla sayının her birinin katı olan sayılara bu sayıların <span class="hl">ortak katı</span> denir. Ortak katların en küçüğüne <b>en küçük ortak kat (EKOK)</b> denir.</p>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Akşehir'de iki ayrı otobüs hattı var. A hattı duraktan <b>4 dakikada</b> bir, B hattı <b>6 dakikada</b> bir kalkıyor. Saat 08.00'de ikisi birlikte kalktı. A'nın kalkışları: 4, 8, <b>12</b>, 16, 20, <b>24</b>… B'nin kalkışları: 6, <b>12</b>, 18, <b>24</b>… İkisi ilk kez <b>12 dakika sonra</b>, yani 08.12'de yeniden birlikte kalkar.</p></div>
<div class="widget"><div class="wh">Etkileşimli · Kat zıplayıcıları</div><div class="wb" data-w="ekok"></div></div>
<!--PAGE--><h2>EKOK'u asal çarpanlarla bulmak</h2>
<p>Sayıların katlarını tek tek yazmak büyük sayılarda uzun sürer. Bunun yerine sayıları <b>birlikte bölen merdivenine</b> yazabiliriz. Sayılardan en az birini bölen asal sayılarla, hepsi 1 olana kadar böleriz. Sağdaki bölenlerin çarpımı EKOK'tur.</p>
<div class="tbl"><table style="min-width:300px;max-width:400px">
<tr><th>12</th><th>18</th><th>Bölen</th></tr>
<tr><td class="c">12</td><td class="c">18</td><td class="c">2</td></tr>
<tr><td class="c">6</td><td class="c">9</td><td class="c">2</td></tr>
<tr><td class="c">3</td><td class="c">9</td><td class="c">3</td></tr>
<tr><td class="c">1</td><td class="c">3</td><td class="c">3</td></tr>
<tr><td class="c">1</td><td class="c">1</td><td class="c no">bitti</td></tr>
</table></div>
<div class="rule">EKOK(12, 18) = 2 · 2 · 3 · 3 = 36</div>
<div class="box know"><span class="bt">İpucu kelimeler</span><p>“<b>en az kaç</b>”, “<b>yeniden birlikte</b>”, “<b>aynı anda tekrar</b>”, “<b>en az kaç tane olmalı ki</b> hem … hem … ile tam bölünsün” gibi ifadeler EKOK sorusu olduğunu gösterir.</p></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Market sosisleri <b>6'lı</b>, sandviç ekmeklerini <b>8'li</b> paketlerde satıyor. Okul pikniğinde hiç artmadan her ekmeğe bir sosis koymak için en az kaçar tane alınmalı? EKOK(6, 8) = <b>24</b>. 4 paket sosis, 3 paket ekmek alınır.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“EKOK, iki sayının çarpımıdır.”</b> Her zaman değil! 4 · 6 = 24 ama EKOK(4, 6) = 12. Çarpım her zaman bir ortak kattır ama <b>en küçüğü olmayabilir</b>. Ayrıca EKOK, sayıların hiçbirinden küçük olamaz.</p></div>`},
{id:"m1s6",nav:"Ortak Bölen (OBEB)",html:`
<div class="eyebrow">Bölüm 6 · Eşit parçalara bölme</div>
<h2>Ortak bölenler ve en büyük ortak bölen</h2>
<p>İki ya da daha fazla sayının her birini kalansız bölen sayılara bu sayıların <span class="hl">ortak böleni</span> denir. Ortak bölenlerin en büyüğüne <b>en büyük ortak bölen (OBEB)</b> denir.</p>
<p><b>12'nin bölenleri:</b> <u>1</u>, <u>2</u>, <u>3</u>, 4, <u>6</u>, 12 &nbsp; · &nbsp; <b>18'in bölenleri:</b> <u>1</u>, <u>2</u>, <u>3</u>, <u>6</u>, 9, 18</p>
<div class="rule">Ortak bölenler: 1, 2, 3, 6 → OBEB(12, 18) = 6</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Banyo zemini <b>12 dm'ye 18 dm</b>. Usta, zemini hiç kesmeden, eşit büyüklükte <b>en büyük kare fayanslarla</b> döşemek istiyor. Fayansın kenarı hem 12'yi hem 18'i tam bölmeli: 1, 2, 3 ya da 6 dm olabilir. En büyüğü <b>6 dm</b>. Bu durumda 2 · 3 = 6 fayans yeter.</p></div>
<div class="widget"><div class="wh">Etkileşimli · Fayans ustası</div><div class="wb" data-w="obeb"></div></div>
<!--PAGE--><h2>OBEB'i asal çarpanlarla bulmak</h2>
<p>Sayıları birlikte bölen merdivenine yazarız, ama bu sefer yalnızca <b>sayıların hepsini birden bölen</b> asallarla böleriz. Hiçbir ortak asal bölen kalmayınca dururuz. Kullandığımız bölenlerin çarpımı OBEB'dir.</p>
<div class="tbl"><table style="min-width:300px;max-width:400px">
<tr><th>36</th><th>48</th><th>Ortak bölen</th></tr>
<tr><td class="c">36</td><td class="c">48</td><td class="c">2</td></tr>
<tr><td class="c">18</td><td class="c">24</td><td class="c">2</td></tr>
<tr><td class="c">9</td><td class="c">12</td><td class="c">3</td></tr>
<tr><td class="c">3</td><td class="c">4</td><td class="c no">ortak bölen yok</td></tr>
</table></div>
<div class="rule">OBEB(36, 48) = 2 · 2 · 3 = 12</div>
<div class="box know"><span class="bt">Aralarında asal sayılar</span><p>Ortak bölenleri <b>yalnızca 1</b> olan sayılara <b>aralarında asal</b> sayılar denir. Örnek: 8 ve 15. 8'in bölenleri 1, 2, 4, 8; 15'in bölenleri 1, 3, 5, 15. Ortak bölen sadece 1. Dikkat: 8 de 15 de asal değildir ama <b>aralarında asaldırlar</b>.</p></div>
<div class="box know"><span class="bt">İpucu kelimeler</span><p>“<b>en büyük</b> eşit parça”, “<b>en az kaç</b> parçaya / pakete ayrılır”, “<b>artmadan</b> eşit gruplara”, “kesmeden kare” ifadeleri OBEB sorusu olduğunu gösterir.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“OBEB büyük çıkacak, çünkü adında ‘en büyük’ var.”</b> OBEB, sayıların en küçüğünden <b>büyük olamaz</b>. 36 ve 48'in OBEB'i en fazla 36 olabilir; gerçekte 12'dir.</p></div>`},
{id:"m1s7",nav:"Problem Atölyesi",html:`
<div class="eyebrow">Bölüm 7 · Gerçek hayat problemleri</div>
<h2>EKOK mu, OBEB mi?</h2>
<p>Problemi çözmeye başlamadan önce kendine şu soruyu sor: <b>Bir şeyi parçalara mı bölüyorum, yoksa bir şeyin tekrar etmesini mi bekliyorum?</b></p>
<div class="tbl"><table>
<tr><th></th><th>OBEB</th><th>EKOK</th></tr>
<tr><td>Ne yapılıyor?</td><td>Eldeki çokluk <b>bölünüyor, paylaştırılıyor</b></td><td>Olaylar <b>tekrarlanıyor, birikiyor</b></td></tr>
<tr><td>Sonuç sayılara göre</td><td>Sayıların en küçüğünden büyük olamaz</td><td>Sayıların en büyüğünden küçük olamaz</td></tr>
<tr><td>Tipik soru</td><td>En büyük eşit parça, en büyük kare fayans</td><td>Yeniden birlikte, en az kaç tane</td></tr>
<tr><td>Bölen merdiveni</td><td>Sadece hepsini birden bölenler</td><td>En az birini bölen bütün asallar</td></tr>
</table></div>
<div class="box teach"><span class="bt">Problem 1 · Nasreddin Hoca Şenliği</span><p>Şenlik için <b>60 kırmızı</b> ve <b>84 beyaz</b> balon var. Balonlar, her demette aynı sayıda balon olacak ve renkler karışmayacak şekilde <b>en büyük</b> demetlere ayrılacak. Her demette kaç balon olur? Kaç demet çıkar?</p><p><b>Çözüm:</b> Bölüyoruz, en büyük parça istiyoruz → OBEB. 60 = 2·2·3·5, 84 = 2·2·3·7. Ortak çarpanlar 2·2·3 = <b>12</b>. Kırmızılar 60 ÷ 12 = 5 demet, beyazlar 84 ÷ 12 = 7 demet. Toplam <b>12 demet</b>.</p></div>
<!--PAGE--><h2>Problemler devam ediyor</h2>
<div class="box teach"><span class="bt">Problem 2 · İlaç saatleri</span><p>Dedenin bir ilacı <b>6 saatte</b> bir, diğer ilacı <b>8 saatte</b> bir içilecek. İkisini sabah 07.00'de birlikte içti. İki ilacı ilk kez saat kaçta yeniden birlikte içer?</p><p><b>Çözüm:</b> Tekrar eden olaylar → EKOK. EKOK(6, 8) = 24. 24 saat sonra, yani <b>ertesi sabah 07.00'de</b>.</p></div>
<div class="box teach"><span class="bt">Problem 3 · Kalanlı paylaşım</span><p>Bir kutudaki kalemler 4'erli ve 6'şarlı gruplanınca her seferinde <b>1 kalem artıyor</b>. Kutuda en az kaç kalem vardır?</p><p><b>Çözüm:</b> 1 kalem çıkarırsak sayı hem 4'e hem 6'ya tam bölünür. EKOK(4, 6) = 12. Kalem sayısı en az 12 + 1 = <b>13</b>.</p></div>
<div class="box teach"><span class="bt">Problem 4 · Tel parçaları</span><p>Uzunlukları <b>36 cm</b> ve <b>48 cm</b> olan iki tel, hiç artmayacak şekilde eşit uzunlukta parçalara ayrılacak. En az kaç parça elde edilir?</p><p><b>Çözüm:</b> En az parça için parçalar en uzun olmalı → OBEB(36, 48) = 12 cm. 36 ÷ 12 = 3, 48 ÷ 12 = 4. En az <b>7 parça</b>.</p></div>
<div class="box know"><span class="bt">Altın bilgi</span><p>İki sayı için <b>EKOK · OBEB = sayıların çarpımı</b>. Örnek: 12 ve 18 → 36 · 6 = 216 = 12 · 18. Cevabını kontrol etmek için harika bir yol!</p></div>`}
],
/* ---------- PEKİŞTİRME İSTASYONU ---------- */
q:{
dy:[
{q:"1, her doğal sayının çarpanıdır.",a:0,ex:"Her sayı 1'e kalansız bölünür; bu yüzden 1 her sayının çarpanıdır."},
{q:"Bir sayının katları da çarpanları gibi sınırlı sayıdadır.",a:1,ex:"Çarpanlar sınırlıdır ama katlar sonsuzdur: 5, 10, 15, 20, … diye devam eder."},
{q:"Son iki basamağı 4'ün katı olan sayılar 4 ile tam bölünür.",a:0,ex:"Örneğin 1316'nın son iki basamağı 16, 4'ün katı; 1316 da 4'e bölünür."},
{q:"Rakamları toplamı 3'ün katı olan her sayı 9 ile de bölünür.",a:1,ex:"Örneğin 12'nin rakamları toplamı 3'tür ama 12, 9'a bölünmez. Tersi doğrudur: 9'a bölünen her sayı 3'e de bölünür."},
{q:"Bir sayının 6 ile bölünebilmesi için hem 2 hem 3 ile bölünmesi gerekir.",a:0,ex:"6 = 2 · 3 olduğu için iki kural birlikte sağlanmalıdır."},
{q:"1 en küçük asal sayıdır.",a:1,ex:"1 asal değildir. En küçük asal sayı 2'dir."},
{q:"2, çift olan tek asal sayıdır.",a:0,ex:"Diğer bütün çift sayılar 2'ye bölündüğü için asal olamaz."},
{q:"Tek sayıların hepsi asaldır.",a:1,ex:"9, 15, 21, 25 gibi tek sayılar bileşiktir."},
{q:"60 sayısının asal çarpanları 2, 3 ve 5'tir.",a:0,ex:"60 = 2 · 2 · 3 · 5. Tekrar etmeden yazınca asal çarpanlar 2, 3, 5'tir."},
{q:"İki sayının EKOK'u her zaman bu sayıların çarpımına eşittir.",a:1,ex:"EKOK(4, 6) = 12 ama 4 · 6 = 24. Çarpım, sadece sayılar aralarında asal olduğunda EKOK'a eşittir."},
{q:"İki sayının OBEB'i, bu sayıların küçüğünden büyük olamaz.",a:0,ex:"OBEB sayıların ikisini de bölmek zorunda, bu yüzden küçük sayıyı geçemez."},
{q:"8 ve 15 asal sayı olmadıkları için aralarında asal da değildir.",a:1,ex:"8 ile 15'in tek ortak böleni 1'dir; bu yüzden aralarında asaldırlar. Kendilerinin asal olması gerekmez."}
],
test:[
{q:"Beden eğitimi öğretmeni 18 öğrenciyi her sırada eşit sayıda öğrenci olacak şekilde sıralara dizecek. Aşağıdakilerden hangisi sıra sayısı olamaz?",o:["2","3","4","6"],a:2,ex:"18'in çarpanları 1, 2, 3, 6, 9, 18'dir. 4 bu listede yok; 18 öğrenci 4 sıraya eşit dağılmaz."},
{q:"Zeynep telefon şifresini şöyle anlatıyor: “4 basamaklı, 5 ile bölünebilen ama 10 ile bölünemeyen, rakamları toplamı 9'un katı olan bir sayı.” Şifre aşağıdakilerden hangisi olabilir?",o:["3510","4725","2345","6185"],a:1,ex:"10'a bölünmeyip 5'e bölünüyorsa son rakam 5 olmalı; 3510 elenir. 4 + 7 + 2 + 5 = 18, 9'un katı. 2345'in toplamı 14, 6185'in toplamı 20."},
{q:"57A üç basamaklı sayısı 3 ile tam bölünebiliyor. A'nın alabileceği değerlerin toplamı kaçtır?",o:["9","12","15","18"],a:3,ex:"5 + 7 + A = 12 + A toplamı 3'ün katı olmalı → A = 0, 3, 6 ya da 9. Toplam 0 + 3 + 6 + 9 = 18."},
{q:"Aşağıdakilerden hangisi asal sayıdır?",o:["51","57","59","63"],a:2,ex:"51 = 3 · 17, 57 = 3 · 19, 63 = 7 · 9. 59 ise yalnızca 1'e ve kendisine bölünür."},
{q:"Bir öğrenci 90 sayısını asal çarpanlarına ayırırken “90 = 9 · 10” yazıp bırakıyor. Doğru sonuç hangisidir?",o:["2 · 3 · 3 · 5","9 · 2 · 5","3 · 30","2 · 45"],a:0,ex:"9 ve 10 asal değildir. 9 = 3 · 3, 10 = 2 · 5 → 90 = 2 · 3 · 3 · 5."},
{q:"Bir sınıftaki öğrenciler 4'erli ve 6'şarlı gruplara ayrıldığında hiç öğrenci artmıyor. Sınıf mevcudu 20'den fazla ve 30'dan az ise sınıfta kaç öğrenci vardır?",o:["22","24","26","28"],a:1,ex:"Mevcut hem 4'ün hem 6'nın katı olmalı: ortak katlar 12, 24, 36… 20 ile 30 arasındaki 24'tür."},
{q:"Kırtasiyeci 48 kalem ve 60 silgiyi, her pakette aynı sayıda kalem ve aynı sayıda silgi olacak şekilde, hiç artmadan en çok kaç pakete ayırabilir?",o:["6","8","12","24"],a:2,ex:"En çok paket sayısı ortak bölenlerin en büyüğüdür: OBEB(48, 60) = 12. Her pakette 4 kalem, 5 silgi olur."},
{q:"Bir deniz feneri 8 saniyede, diğeri 12 saniyede bir yanıyor. İkisi aynı anda yandıktan kaç saniye sonra ilk kez yine birlikte yanar?",o:["4","20","24","96"],a:2,ex:"Tekrar eden olaylar → EKOK(8, 12) = 24 saniye."},
{q:"Uzunlukları 24 m ve 36 m olan iki ip, hiç artmadan eşit uzunlukta parçalara bölünecek. En az kaç parça elde edilir?",o:["5","6","12","60"],a:0,ex:"En az parça için en uzun parça: OBEB(24, 36) = 12 m. 24 ÷ 12 = 2, 36 ÷ 12 = 3 → 5 parça."},
{q:"Aşağıdaki sayı ikililerinden hangisi aralarında asaldır?",o:["6 ve 9","10 ve 15","9 ve 16","12 ve 18"],a:2,ex:"9'un bölenleri 1, 3, 9; 16'nın bölenleri 1, 2, 4, 8, 16. Tek ortak bölen 1 olduğu için aralarında asaldırlar."}
],
match:[
{title:"Kavramlar",p:[["Çarpan","Bir sayıyı kalansız bölen doğal sayı"],["Kat","Sayının doğal sayılarla çarpımı"],["Asal sayı","Yalnızca 1'e ve kendisine bölünen, 1'den büyük sayı"],["Bileşik sayı","İkiden fazla böleni olan sayı"],["EKOK","Ortak katların en küçüğü"],["OBEB","Ortak bölenlerin en büyüğü"]]},
{title:"Bölünebilme kuralları",p:[["2 ile","Birler basamağı çift"],["3 ile","Rakamlar toplamı 3'ün katı"],["4 ile","Son iki basamak 4'ün katı"],["5 ile","Birler basamağı 0 ya da 5"],["9 ile","Rakamlar toplamı 9'un katı"],["10 ile","Birler basamağı 0"]]}
],
fill:{items:[
{t:"Bir sayının en büyük çarpanı her zaman ___ olur.",a:"kendisi"},
{t:"Hem 2 hem 3 ile bölünebilen sayılar ___ ile de bölünür.",a:"6"},
{t:"Çift olan tek asal sayı ___ sayısıdır.",a:"2"},
{t:"Ortak bölenleri yalnızca 1 olan sayılara ___ sayılar denir.",a:"aralarında asal"},
{t:"“Yeniden birlikte” ifadesi geçen problemler genellikle ___ ile çözülür.",a:"EKOK"},
{t:"“En büyük eşit parça” istenen problemler ___ ile çözülür.",a:"OBEB"}
],extra:["1","9","bileşik","sonsuz"]},
sira:[
{title:"84 sayısını bölen merdiveni ile asal çarpanlarına ayırma adımlarını sırala.",i:["84'ü 2'ye böl: 42","42'yi 2'ye böl: 21","21'i 3'e böl: 7","7'yi 7'ye böl: 1","Sonucu yaz: 84 = 2 · 2 · 3 · 7"]},
{title:"Sayıları küçükten büyüğe doğru sırala: Hepsi 120'nin çarpanı.",i:["8","12","15","20","24","40"]},
{title:"OBEB problemini çözme adımlarını sırala.",i:["Problemi oku ve bölme mi tekrar mı olduğunu belirle.","Bölünecek çoklukları yaz (örneğin 48 ve 60).","Ortak bölenleri ya da ortak asal çarpanları bul.","En büyük ortak böleni seç (12).","Cevabın sayıların küçüğünden büyük olmadığını kontrol et."]}
],
det:[
{title:"Kilitli Dolap Vakası",story:"Okul kütüphanesindeki dolabın şifresi kaybolmuş. Kütüphane görevlisi Ahmet Bey'in bıraktığı notta şifreyle ilgili ipuçları var.",clues:["Şifre üç basamaklı bir sayı.","Sayı 5 ile bölünüyor ama 10 ile bölünmüyor.","Rakamları toplamı 9.","Yüzler basamağı 4."],q:"Şifre hangisidir?",o:["405","450","415","495"],a:0,ex:"10'a bölünmeyip 5'e bölünüyorsa son rakam 5'tir: 4_5. 4 + _ + 5 = 9 → ortadaki rakam 0. Şifre 405."},
{title:"Akşehir Otogarı",story:"Akşehir otogarından Konya otobüsleri 20 dakikada bir, Afyon otobüsleri 30 dakikada bir kalkıyor. Sabah 07.00'de iki otobüs birlikte kalktı. Selin, iki otobüsün yeniden birlikte kalkacağı saatte otogarda olmak istiyor.",clues:["Konya: 07.20, 07.40, 08.00…","Afyon: 07.30, 08.00, 08.30…","Selin 07.30'da evden çıkıyor.","Ev ile otogar arası 15 dakika."],q:"İki otobüs ilk kez saat kaçta yeniden birlikte kalkar ve Selin yetişir mi?",o:["07.30 · yetişir","08.00 · yetişir","08.00 · yetişemez","09.00 · yetişir"],a:1,ex:"EKOK(20, 30) = 60 dakika → 08.00. Selin 07.30 + 15 dk = 07.45'te otogarda olur; yetişir."},
{title:"Fayans Ustasının Sırrı",story:"Usta Mehmet, 120 cm'ye 150 cm'lik bir mutfak tezgâhının arkasını kesmeden, eşit büyüklükte en büyük kare fayanslarla kaplayacak. Çırağı farklı ölçüler öneriyor.",clues:["Çırak 20 cm diyor.","Usta “daha büyüğü var” diyor.","Fayanslar kesilmeyecek.","Fayanslar kare olacak."],q:"Kullanılabilecek en büyük fayansın kenarı kaç cm'dir?",o:["15","20","30","60"],a:2,ex:"Kenar hem 120'yi hem 150'yi bölmeli. OBEB(120, 150) = 30 cm. 20 cm de olur ama en büyüğü değil."},
{title:"Defterdeki Hata",story:"Can'ın matematik defterinde dört cümle var. Öğretmeni bir cümlenin altını kırmızıyla çizmiş. Hatalı cümleyi bul.",clues:["1. 91 bir bileşik sayıdır.","2. 2 · 2 · 3 · 3 = 36'dır.","3. 1 hem asal hem bileşiktir.","4. 7'nin katları sonsuzdur."],q:"Hangi cümle hatalıdır?",o:["1. cümle","2. cümle","3. cümle","4. cümle"],a:2,ex:"1 ne asal ne bileşiktir. 91 = 7 · 13 olduğu için bileşiktir; diğer cümleler doğru."},
{title:"Kayıp Kalemler",story:"Elif'in kalem kutusundaki kalemleri 3'erli saydığında 2, 5'erli saydığında da 2 kalem artıyor. Kutuda 30'dan az kalem var.",clues:["Kalemler 3'erli gruplanınca 2 artıyor.","5'erli gruplanınca da 2 artıyor.","Kutu boş değil, en az 10 kalem var.","Kalem sayısı 30'dan az."],q:"Kutuda kaç kalem vardır?",o:["15","17","22","32"],a:1,ex:"2 kalem çıkarınca sayı hem 3'e hem 5'e bölünür: EKOK(3, 5) = 15 → 15 + 2 = 17. 32 ise 30'dan fazla."}
],
klasik:[
{q:"36 sayısının bütün çarpanlarını çarpan çiftleri yöntemiyle bul. Neden 6'da durduğunu açıkla.",s:"1 · 36, 2 · 18, 3 · 12, 4 · 9, 6 · 6. Çarpanlar: 1, 2, 3, 4, 6, 9, 12, 18, 36. 6 · 6'da çarpanlar birbirine yetiştiği için durdum; daha sonra gelenler zaten önceki çiftlerde yazılı.",p:[{t:"Çarpan çiftlerini yazdı",k:["1 · 36","2 · 18","3 · 12","4 · 9","1x36","2x18","1.36"]},{t:"Dokuz çarpanın hepsini yazdı",k:["9, 12, 18","12, 18, 36","1, 2, 3, 4, 6"]},{t:"Durma sebebini açıkladı",k:["yetiş","6 · 6","6x6","tekrar","önce"]}]},
{q:"4A8 üç basamaklı bir sayıdır. Bu sayı hem 4 hem 9 ile bölünüyorsa A kaçtır? Adım adım açıkla.",s:"9 ile bölünme: 4 + A + 8 = 12 + A, 9'un katı olmalı → A = 6 (toplam 18). 4 ile bölünme: son iki basamak 68, 68 = 4 · 17 olduğu için 4'e bölünür. A = 6.",p:[{t:"9 kuralını rakam toplamı ile kullandı",k:["toplam","12 + a","18","rakam"]},{t:"4 kuralını son iki basamakla kontrol etti",k:["son iki","68"]},{t:"A = 6 buldu",k:["6"]}]},
{q:"Bir sayının asal olup olmadığını nasıl anlarsın? 87 sayısı için kontrol ederek açıkla.",s:"Sayıyı sırayla 2, 3, 5, 7 gibi asal sayılara bölmeyi denerim. 87 tek olduğu için 2'ye bölünmez. 8 + 7 = 15, 3'ün katı olduğu için 87 üçe bölünür: 87 = 3 · 29. Bu yüzden 87 asal değil, bileşiktir.",p:[{t:"Asal sayılarla bölme yöntemini anlattı",k:["2, 3","asal","böl"]},{t:"87'nin 3'e bölündüğünü gösterdi",k:["15","3 · 29","3x29","29"]},{t:"Bileşik olduğu sonucuna vardı",k:["bileşik","asal değil"]}]},
{q:"“EKOK” ve “OBEB” arasındaki farkı birer günlük hayat örneğiyle açıkla.",s:"OBEB, sayıların ortak bölenlerinin en büyüğüdür; bir şeyi eşit en büyük parçalara bölerken kullanılır. Örneğin 24 elma ve 36 armudu eşit poşetlere koymak. EKOK, ortak katların en küçüğüdür; tekrar eden olayların yeniden birlikte olduğu zamanı bulurken kullanılır. Örneğin 6 ve 8 dakikada bir çalan iki zilin yeniden birlikte çalması.",p:[{t:"OBEB'in anlamını doğru yazdı",k:["bölen","en büyük","böl"]},{t:"EKOK'un anlamını doğru yazdı",k:["kat","en küçük","tekrar"]},{t:"OBEB için bir örnek verdi",k:["parça","poşet","paket","fayans","pay"]},{t:"EKOK için bir örnek verdi",k:["zil","otobüs","birlikte","aynı anda","ilaç"]}]},
{q:"Bir çiçekçide 45 gül ve 75 papatya var. Çiçekçi, hiç çiçek artmadan ve demetlerde tek tür çiçek olacak şekilde eşit sayıda çiçekli en büyük demetleri yapacak. Her demette kaç çiçek olur, toplam kaç demet çıkar?",s:"Eşit parçalara bölüyorum ve en büyük parçayı istiyorum, bu yüzden OBEB kullanırım. 45 = 3 · 3 · 5, 75 = 3 · 5 · 5. Ortak çarpanlar 3 · 5 = 15. Her demette 15 çiçek olur. Gül: 45 ÷ 15 = 3 demet, papatya: 75 ÷ 15 = 5 demet. Toplam 8 demet.",p:[{t:"OBEB kullanması gerektiğini belirtti",k:["obeb","ortak bölen"]},{t:"OBEB'i 15 buldu",k:["15"]},{t:"Toplam demet sayısını 8 buldu",k:["8"]}]}
]
}
});
