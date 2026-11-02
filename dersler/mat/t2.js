/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
tema("mat",{
id:"t2",no:"6. Tema · 9 ders saati",ad:"Veriden Olasılığa",ozet:"Deneysel olasılık ve gözleme dayalı tahmin",pdf:"pdf/mat-tema2.pdf",pdfAd:"Mat6_Tema6_Veriden_Olasiliga.pdf",pdfSayfa:3,ic:'<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="10" width="24" height="24" rx="5" fill="var(--teal)"/><g fill="var(--paper)"><circle cx="12" cy="16" r="2.6"/><circle cx="18" cy="22" r="2.6"/><circle cx="24" cy="28" r="2.6"/></g><circle cx="37" cy="31" r="8" fill="var(--amber)"/><text x="37" y="35" text-anchor="middle" font-size="10" font-weight="800" fill="var(--ink)" font-family="JetBrains Mono">Y</text></svg>',
/* ---------- KONU ANLATIMI (her öğe bir bölüm; uzun bölümler <!--PAGE--> ile sayfalara ayrılır) ---------- */
konu:[
{id:"m2s1",nav:"Olasılık Nedir?",html:`
<div class="eyebrow">Bölüm 1 · Giriş</div>
<h2>Olasılık: Bir şeyin olma şansı</h2>
<p>Bir olayın gerçekleşme şansını sayılarla ifade etmeye <span class="hl">olasılık</span> denir. Hava durumu, maç tahminleri, kura çekimleri hep olasılıkla ilgilidir.</p>
<div class="cards4">
 <div class="mini"><h4>Deney</h4><p>Sonucunu önceden kesin bilemediğimiz bir girişim: para atmak, zar atmak, torbadan top çekmek.</p></div>
 <div class="mini"><h4>Çıktı</h4><p>Bir deneyin her bir olası sonucu. Para atışının çıktıları: yazı ve tura.</p></div>
 <div class="mini"><h4>Olay</h4><p>Merak ettiğimiz sonuç ya da sonuçlar. Zar atışında “çift sayı gelmesi” bir olaydır: 2, 4, 6.</p></div>
 <div class="mini"><h4>Olasılık değeri</h4><p>0 ile 1 arasında bir sayıdır. Kesir, ondalık gösterim ya da yüzde ile yazılabilir.</p></div>
</div>
<div class="widget"><div class="wh">Etkileşimli · Olasılık çizgisi</div><div class="wb" data-w="cizgi"></div></div>
<!--PAGE--><h2>İmkânsızdan kesine</h2>
<div class="tbl"><table>
<tr><th>Durum</th><th>Olasılık</th><th>Örnek</th></tr>
<tr><td><b>İmkânsız olay</b></td><td class="c">0</td><td>Bir zar atıldığında 7 gelmesi</td></tr>
<tr><td><b>Olası ama düşük</b></td><td class="c">0 ile 1/2 arası</td><td>Torbadaki 10 toptan 1'i kırmızıysa kırmızı çekmek</td></tr>
<tr><td><b>Eşit şanslı</b></td><td class="c">1/2</td><td>Hileli olmayan paranın yazı gelmesi</td></tr>
<tr><td><b>Olası ve yüksek</b></td><td class="c">1/2 ile 1 arası</td><td>Ocakta Akşehir'de havanın 15 °C'den soğuk olması</td></tr>
<tr><td><b>Kesin olay</b></td><td class="c">1</td><td>Bir zar atıldığında 7'den küçük bir sayı gelmesi</td></tr>
</table></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Hava durumu uygulamasında <b>“yağış ihtimali %80”</b> yazıyorsa bu, benzer hava koşullarının yaşandığı 10 günün yaklaşık 8'inde yağmur yağdığı anlamına gelir. Şemsiyeni almak akıllıca olur, ama yağmur yine de yağmayabilir!</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Olasılığı %90 olan olay kesin olur.”</b> Hayır! %90 çok yüksek bir şanstır ama kesinlik değildir. Kesin olayın olasılığı tam olarak 1, yani %100'dür.</p></div>`},
{id:"m2s2",nav:"Deneysel Olasılık",html:`
<div class="eyebrow">Bölüm 2 · Gözleme dayalı tahmin</div>
<h2>Deneyerek olasılık bulmak</h2>
<p>Bir deneyi defalarca yapıp sonuçları kaydederek hesapladığımız olasılığa <span class="hl">deneysel olasılık</span> denir. Bu olasılık, gerçek gözlemlere dayanır.</p>
<div class="rule">Deneysel olasılık = İstenen sonucun kaç kez geldiği ÷ Toplam deneme sayısı</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Basketbolcu Elif son <b>20 serbest atışının 15'ini</b> basket yaptı. Elif'in bir sonraki serbest atışı basket yapma olasılığını gözleme dayalı olarak <b>15/20 = 3/4</b>, yani <b>%75</b> diye tahmin ederiz. Antrenörler oyuncu seçerken böyle istatistiklere bakar.</p></div>
<p>Aşağıda kendi deneyini yap. Para, zar ya da torba seç; istediğin kadar deneme yap ve sonuçları sıklık tablosunda izle.</p>
<div class="widget"><div class="wh">Etkileşimli · Deney laboratuvarı</div><div class="wb" data-w="deney"></div></div>
<!--PAGE--><h2>Sıklık tablosundan olasılığa</h2>
<p>Deney sonuçlarını önce bir <b>sıklık tablosuna</b> (çetele tablosu) yazarız. Sonra her sonucun sıklığını toplam deneme sayısına böleriz.</p>
<div class="tbl"><table>
<tr><th>Torbadan çekilen top</th><th>Çetele</th><th>Sıklık</th><th>Deneysel olasılık</th></tr>
<tr><td>Kırmızı</td><td class="tally"><s>||||</s> <s>||||</s></td><td class="c">10</td><td class="c">10/16 = 5/8</td></tr>
<tr><td>Mavi</td><td class="tally"><s>||||</s> |</td><td class="c">6</td><td class="c">6/16 = 3/8</td></tr>
<tr><th>Toplam</th><td></td><td class="c">16</td><td class="c">16/16 = 1</td></tr>
</table></div>
<div class="box know"><span class="bt">Akılda tut</span><p>Bir deneydeki <b>bütün sonuçların</b> deneysel olasılıkları toplamı her zaman <b>1</b>'dir. Kırmızı 5/8 ise mavi için hesap yapmadan 1 − 5/8 = 3/8 diyebiliriz.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Kırmızının olasılığı = kırmızı sayısı ÷ mavi sayısı.”</b> Hayır! Paydaya <b>diğer sonucun sayısı değil, toplam deneme sayısı</b> yazılır. 10 ÷ 6 değil, 10 ÷ 16.</p></div>
<div class="box teach"><span class="bt">Farklı gösterimler</span><p>Deneysel olasılık 3/5 ise ondalık gösterimle <b>0,6</b>, yüzdeyle <b>%60</b> diye yazılabilir. Paydayı 10 ya da 100 yapmak işini kolaylaştırır: 3/5 = 6/10 = 60/100.</p></div>`},
{id:"m2s3",nav:"Çok Deneme, İyi Tahmin",html:`
<div class="eyebrow">Bölüm 3 · Deneme sayısının gücü</div>
<h2>Az deneme yanıltır, çok deneme yaklaştırır</h2>
<p>Bir parayı 4 kez atınca 4'ü de yazı gelebilir. Bu, paranın hep yazı geleceği anlamına gelmez. Deneme sayısı arttıkça deneysel olasılık daha <b>kararlı</b> hâle gelir ve belli bir değerin etrafında toplanır.</p>
<div class="widget"><div class="wh">Etkileşimli · Yazı oranı grafiği</div><div class="wb" data-w="yakinsa"></div></div>
<div class="box know"><span class="bt">Bilim tarihinden</span><p>Fransız doğa bilimci <b>Buffon</b> 1700'lerde bir parayı <b>4040 kez</b> attı ve 2048 kez yazı geldi. İngiliz istatistikçi <b>Karl Pearson</b> ise 24 000 atış yaptı ve 12 012 kez yazı geldi. Atış arttıkça oran yarıya iyice yaklaştı.</p></div>
<!--PAGE--><h2>Deneyler farklı sonuç verebilir</h2>
<p>Aynı deneyi iki kişi yaparsa sonuçları büyük olasılıkla farklı çıkar. Ali ile Ayşe'nin 20'şer para atışı:</p>
<div class="tbl"><table>
<tr><th>Kişi</th><th>Yazı</th><th>Tura</th><th>Deneysel olasılık (yazı)</th></tr>
<tr><td>Ali</td><td class="c">13</td><td class="c">7</td><td class="c">13/20 = %65</td></tr>
<tr><td>Ayşe</td><td class="c">8</td><td class="c">12</td><td class="c">8/20 = %40</td></tr>
<tr><th>İkisi birlikte</th><td class="c">21</td><td class="c">19</td><td class="c">21/40 = %52,5</td></tr>
</table></div>
<p>İki kişinin sonuçlarını birleştirince deneme sayısı arttı ve oran yarıya daha çok yaklaştı.</p>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Bir film sitesinde sadece <b>3 kişinin</b> oy verdiği filme güvenmek zordur. <b>3000 kişinin</b> oy verdiği filmin puanı ise filmi çok daha iyi yansıtır. Ne kadar çok veri, o kadar iyi tahmin!</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Para 5 kez üst üste yazı geldi, şimdi kesin tura gelir.”</b> Hayır! Paranın hafızası yoktur. Her atışta yazı ve tura gelme şansı yine eşittir. Bu yanılgıya “kumarbaz yanılgısı” denir.</p></div>`},
{id:"m2s4",nav:"Veriden Tahmin",html:`
<div class="eyebrow">Bölüm 4 · Geleceği tahmin et</div>
<h2>Gözlemlerden tahmin yapmak</h2>
<p>Deneysel olasılığı kullanarak, aynı durum daha büyük ölçekte tekrarlandığında ne olacağını <b>tahmin edebiliriz</b>. Tahmin kesin sonuç değildir ama işimizi kolaylaştırır.</p>
<div class="box teach"><span class="bt">Örnek · Okul kantini</span><p>Kantinci, bir hafta boyunca kantine gelen <b>200 öğrencinin 80'inin</b> tost aldığını gözlemledi. Tost alma olasılığı 80/200 = <b>2/5</b>. Yarın 250 öğrenci gelirse yaklaşık 250 · 2/5 = <b>100 tost</b> hazırlamalı.</p></div>
<div class="box teach"><span class="bt">Örnek · Fabrika kontrolü</span><p>Bir oyuncak fabrikasında rastgele seçilen <b>50 oyuncaktan 2'si</b> kusurlu çıktı. Kusurlu olma olasılığı 2/50 = <b>1/25</b>. 1000 oyuncaklık bir üretimde yaklaşık 1000 ÷ 25 = <b>40 kusurlu</b> oyuncak beklenir.</p></div>
<p>Şimdi sıra sende! İçinde ne olduğunu bilmediğin bir torba var. Top çek, rengini not al, topu geri at. Yeterince çekiliş yapınca torbada hangi renkten yaklaşık kaç top olduğunu tahmin et.</p>
<div class="widget"><div class="wh">Etkileşimli · Gizemli torba</div><div class="wb" data-w="torba"></div></div>`},
{id:"m2s5",nav:"Toparlayalım",html:`
<div class="eyebrow">Bölüm 5 · Özet ve dikkat</div>
<h2>Olasılıkta altın kurallar</h2>
<div class="chain">
 <div class="st"><b>1. Deneyi yap</b><span>Para, zar, torba, anket…</span></div><span class="ar">→</span>
 <div class="st"><b>2. Sonuçları kaydet</b><span>Çetele ve sıklık tablosu</span></div><span class="ar">→</span>
 <div class="st"><b>3. Oranı hesapla</b><span>istenen ÷ toplam deneme</span></div><span class="ar">→</span>
 <div class="st"><b>4. Yorumla</b><span>Kesir, ondalık, yüzde; tahmin yap</span></div>
</div>
<div class="cards4">
 <div class="mini"><h4>0 ile 1 arasında</h4><p>Olasılık negatif ya da 1'den büyük olamaz. Yüzdeyle %0 ile %100 arasıdır.</p></div>
 <div class="mini"><h4>Toplam 1</h4><p>Tüm sonuçların olasılıkları toplandığında 1 elde edilir.</p></div>
 <div class="mini"><h4>Değişebilir</h4><p>Deney tekrarlanınca deneysel olasılık değişebilir. Bu bir hata değildir.</p></div>
 <div class="mini"><h4>Çok deneme</h4><p>Deneme sayısı arttıkça tahminler daha güvenilir olur.</p></div>
</div>
<div class="box know"><span class="bt">Örnek</span><p>Bir zar 60 kez atıldı: 1 → 8 kez, 2 → 11 kez, 3 → 9 kez, 4 → 12 kez, 5 → 10 kez, 6 → 10 kez. <b>Çift sayı</b> gelme deneysel olasılığı: (11 + 12 + 10) ÷ 60 = 33/60 = <b>11/20</b>, yani %55.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Deneyde hiç 6 gelmediyse, 6 gelmesi imkânsızdır.”</b> Hayır! Deneysel olasılık 0 çıkmıştır ama zarın 6 yüzü olduğu için bu olay imkânsız değildir. Deneme sayısı az olabilir.</p></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Futbolda penaltı atacak oyuncuyu seçerken teknik direktör, oyuncuların antrenmandaki gol oranlarına bakar. 30 penaltıda 27 gol atan oyuncunun gol olasılığı 27/30 = %90'dır. Bu bir tahmindir: Maçta kaçırabilir de!</p></div>`}
],
/* ---------- PEKİŞTİRME İSTASYONU ---------- */
q:{
dy:[
{q:"Bir olayın olasılığı 1'den büyük olabilir.",a:1,ex:"Olasılık 0 ile 1 arasındadır. Kesin olayın olasılığı 1'dir; daha büyüğü yoktur."},
{q:"İmkânsız bir olayın olasılığı 0'dır.",a:0,ex:"Zar atınca 7 gelmesi gibi hiç gerçekleşmeyecek olayların olasılığı 0'dır."},
{q:"Deneysel olasılık, istenen sonucun sayısının toplam deneme sayısına bölünmesiyle bulunur.",a:0,ex:"Örneğin 20 atışta 12 yazı → 12/20 = 3/5."},
{q:"Aynı deney tekrar yapıldığında deneysel olasılık her zaman aynı çıkar.",a:1,ex:"Her deney farklı sonuçlar verebilir; deneysel olasılık değişebilir."},
{q:"Bir para 4 kez üst üste yazı geldiyse 5. atışta tura gelmesi kesindir.",a:1,ex:"Paranın hafızası yoktur. Her atışta yazı ve tura gelme şansı yine eşittir."},
{q:"Deneme sayısı arttıkça deneysel olasılık daha güvenilir bir tahmin olur.",a:0,ex:"Çok sayıda deneme yapıldığında oranlar daha kararlı hâle gelir."},
{q:"Bir deneydeki tüm sonuçların deneysel olasılıklarının toplamı 1'dir.",a:0,ex:"Örneğin 16 çekilişte 10 kırmızı, 6 mavi: 10/16 + 6/16 = 16/16 = 1."},
{q:"%50 olasılık, 1/2 olasılığa eşittir.",a:0,ex:"%50 = 50/100 = 1/2."},
{q:"Torbadan 10 çekilişte hiç sarı top gelmediyse torbada sarı top yoktur.",a:1,ex:"Deneysel olasılık 0 çıkmıştır ama torbada az sayıda sarı top olabilir; deneme sayısı az olabilir."},
{q:"30 atışta 6 kez “6” gelen bir zar için “6” gelme deneysel olasılığı 1/5'tir.",a:0,ex:"6/30 = 1/5."},
{q:"Kırmızı topun deneysel olasılığı, kırmızı top sayısının mavi top sayısına bölünmesiyle bulunur.",a:1,ex:"Paydaya toplam deneme sayısı yazılır, diğer rengin sayısı değil."},
{q:"Hava durumunda “yağış ihtimali %80” ise o gün kesinlikle yağmur yağar.",a:1,ex:"%80 yüksek bir olasılıktır ama kesin değildir. Kesin olay %100'dür."}
],
test:[
{q:"Ali bir parayı 40 kez attı ve 18 kez tura geldi. Bu deneye göre tura gelme deneysel olasılığı kaçtır?",o:["9/20","9/11","11/20","18/22"],a:0,ex:"18/40 = 9/20."},
{q:"Bir zar 50 kez atıldığında “3” sayısı 12 kez geliyor. “3 gelmeme” deneysel olasılığı kaçtır?",o:["12/50","19/25","6/25","38/12"],a:1,ex:"3 gelmeyen atış: 50 − 12 = 38. 38/50 = 19/25."},
{q:"Basketbolcu Deniz son 25 atışının 20'sinde basket yaptı. Deniz'in basket yapma deneysel olasılığı yüzde kaçtır?",o:["%20","%25","%75","%80"],a:3,ex:"20/25 = 80/100 = %80."},
{q:"Bir torbadan geri atılarak 60 kez top çekiliyor: 24 kırmızı, 15 mavi, 21 yeşil. Hangi renk için deneysel olasılık 2/5'tir?",o:["Kırmızı","Mavi","Yeşil","Hiçbiri"],a:0,ex:"24/60 = 2/5. Mavi 15/60 = 1/4, yeşil 21/60 = 7/20."},
{q:"Aşağıdakilerden hangisi bir deneysel olasılık değeri olamaz?",o:["0","0,35","%100","5/4"],a:3,ex:"5/4, 1'den büyüktür. Olasılık 0 ile 1 arasında olmalıdır."},
{q:"Bir kantinde gözlenen 150 öğrenciden 60'ı ayran aldı. Ertesi gün 200 öğrenci gelirse yaklaşık kaç ayran satılması beklenir?",o:["60","80","100","120"],a:1,ex:"Ayran alma olasılığı 60/150 = 2/5. 200 · 2/5 = 80."},
{q:"Ece bir parayı 10 kez atıp 7 yazı, Can 200 kez atıp 104 yazı elde ediyor. Hangisi doğrudur?",o:["Ece'nin parası hileli olmalıdır.","Can'ın sonucu yazı gelme olasılığı için daha güvenilir bir tahmindir.","Can'ın deneyi yanlış yapılmıştır.","İkisinin sonucu da aynı derecede güvenilirdir."],a:1,ex:"Deneme sayısı arttıkça deneysel olasılık daha güvenilir olur. Az denemede 7/10 gibi sonuçlar normaldir."},
{q:"Bir çarkı 80 kez çeviren Mert, okun 20 kez maviye geldiğini görüyor. Buna göre çark 400 kez çevrilirse yaklaşık kaç kez mavi gelmesi beklenir?",o:["20","80","100","320"],a:2,ex:"20/80 = 1/4. 400 · 1/4 = 100."},
{q:"Bir deneyde kırmızı gelme deneysel olasılığı 0,45 ise kırmızı gelmeme deneysel olasılığı kaçtır?",o:["0,45","0,5","0,55","1,45"],a:2,ex:"Toplam 1 olmalı: 1 − 0,45 = 0,55."},
{q:"Bir fabrikada rastgele seçilen 80 ampulden 4'ü bozuk çıktı. 2000 ampullük üretimde yaklaşık kaç bozuk ampul beklenir?",o:["4","40","100","400"],a:2,ex:"4/80 = 1/20. 2000 ÷ 20 = 100."}
],
match:[
{title:"Kavramlar",p:[["Deney","Sonucunu önceden kesin bilemediğimiz girişim"],["Çıktı","Bir deneyin olası her sonucu"],["Olay","Merak ettiğimiz sonuç ya da sonuçlar"],["İmkânsız olay","Olasılığı 0 olan olay"],["Kesin olay","Olasılığı 1 olan olay"],["Deneysel olasılık","İstenen sonuç sayısı ÷ toplam deneme"]]},
{title:"Eşit gösterimler",p:[["1/2","%50"],["1/4","0,25"],["3/5","%60"],["1/5","0,2"],["3/4","%75"],["1/10","0,1"]]}
],
fill:{items:[
{t:"Olasılık değeri ___ ile 1 arasındadır.",a:"0"},
{t:"Bir deneyi tekrarlayıp sonuçlara göre hesaplanan olasılığa ___ olasılık denir.",a:"deneysel"},
{t:"Deneysel olasılık hesaplanırken paydaya ___ deneme sayısı yazılır.",a:"toplam"},
{t:"Zar atınca 7 gelmesi ___ bir olaydır.",a:"imkânsız"},
{t:"Bir deneydeki tüm sonuçların olasılıkları toplamı ___ eder.",a:"1"},
{t:"Deneme sayısı ___ deneysel olasılık daha güvenilir olur.",a:"arttıkça"}
],extra:["kesin","2","azaldıkça","mavi"]},
sira:[
{title:"Olayları olasılığı en düşükten en yükseğe doğru sırala.",i:["Zar atınca 7 gelmesi","Zar atınca 6 gelmesi","Para atınca yazı gelmesi","Zar atınca 6'dan küçük gelmesi","Zar atınca 7'den küçük gelmesi"]},
{title:"Deneysel olasılık bulma adımlarını sırala.",i:["Deneyi belirle (örneğin para atmak).","Deneyi birçok kez tekrarla.","Sonuçları sıklık tablosuna kaydet.","İstenen sonucun sıklığını toplam deneme sayısına böl.","Sonucu kesir, ondalık ya da yüzde olarak yorumla."]},
{title:"Değerleri küçükten büyüğe doğru sırala.",i:["0","1/5","0,3","%45","3/5","1"]}
],
det:[
{title:"Hileli Zar Şüphesi",story:"Okul oyun gününde Burak, bir oyunda kullanılan zarın hileli olduğundan şüpheleniyor. Zarı 60 kez atıp sonuçları kaydediyor.",clues:["1 → 9 kez, 2 → 10 kez, 3 → 8 kez","4 → 11 kez, 5 → 10 kez, 6 → 12 kez","Burak her sonucun yaklaşık 10 kez gelmesini bekliyordu.","Bir arkadaşı “6 en çok geldi, zar hileli” diyor."],q:"Hangi yorum en doğrudur?",o:["Zar kesinlikle hilelidir.","Sonuçlar birbirine yakın; hileli olduğunu söylemek için yeterli kanıt yok.","6 gelme olasılığı 12'dir.","Zar 60 kez daha atılırsa 6 yine 12 kez gelir."],a:1,ex:"Sonuçlar 8 ile 12 arasında, beklenen 10'a yakın. Bu kadar fark deneylerde normaldir. Emin olmak için çok daha fazla deneme gerekir."},
{title:"Kantindeki Simit Hesabı",story:"Kantin sorumlusu Ayşe Hanım, simitlerin bazı günler bitip bazı günler arttığını fark etti. Bir hafta boyunca kayıt tuttu.",clues:["Hafta boyunca kantine 500 öğrenci geldi.","Bunlardan 150'si simit aldı.","Gelecek hafta okulda gezi var; 300 öğrenci bekleniyor.","Her simit tek öğrenciye satılıyor."],q:"Gelecek hafta yaklaşık kaç simit hazırlanmalı?",o:["30","90","150","300"],a:1,ex:"Simit alma deneysel olasılığı 150/500 = 3/10. 300 · 3/10 = 90 simit."},
{title:"Gizemli Torba",story:"Öğretmen içinde 20 top olan bir torba getirdi ve renkleri söylemedi. Öğrenciler sırayla top çekip rengini yazdı ve topu geri attı.",clues:["Toplam 40 çekiliş yapıldı.","Kırmızı 30 kez geldi.","Beyaz 10 kez geldi.","Torbada sadece kırmızı ve beyaz top var."],q:"Torbada yaklaşık kaç kırmızı top vardır?",o:["10","15","20","30"],a:1,ex:"Kırmızı deneysel olasılığı 30/40 = 3/4. 20 topun 3/4'ü 15'tir."},
{title:"Penaltı Kararı",story:"Takımın antrenörü kritik maçta penaltı atacak oyuncuyu seçecek. Antrenmandaki kayıtlar şöyle:",clues:["Emre: 10 atış, 8 gol","Kerem: 40 atış, 34 gol","Yusuf: 20 atış, 15 gol","Antrenör hem yüksek orana hem güvenilir veriye bakıyor."],q:"Antrenör kimi seçmelidir?",o:["Emre (%80)","Kerem (%85)","Yusuf (%75)","Fark etmez"],a:1,ex:"Kerem'in oranı 34/40 = %85 ile en yüksek; ayrıca en çok atış onda olduğu için veri daha güvenilir."},
{title:"Defterdeki Hata",story:"Selin'in olasılık ödevinde dört cümle var. Öğretmen bir cümleyi hatalı işaretlemiş.",clues:["1. 20 atışta 5 tura → P(tura) = 1/4","2. Olasılık %0 ile %100 arasındadır.","3. 12 kırmızı, 8 mavi çekilişte P(kırmızı) = 12/8","4. Kesin olayın olasılığı 1'dir."],q:"Hangi cümle hatalıdır?",o:["1. cümle","2. cümle","3. cümle","4. cümle"],a:2,ex:"Toplam deneme 20'dir: P(kırmızı) = 12/20 = 3/5. 12/8 hem yanlış hesaplanmış hem 1'den büyüktür."}
],
klasik:[
{q:"Deneysel olasılığın nasıl hesaplandığını kendi cümlelerinle açıkla ve bir örnek ver.",s:"Bir deneyi birçok kez tekrar ederim, istenen sonucun kaç kez geldiğini sayarım ve bunu toplam deneme sayısına bölerim. Örneğin bir parayı 30 kez attım, 12 kez yazı geldi. Yazı gelme deneysel olasılığı 12/30 = 2/5 olur.",p:[{t:"Deneyin tekrar edildiğini yazdı",k:["tekrar","kez","birçok"]},{t:"İstenen sonuç ÷ toplam deneme ilişkisini yazdı",k:["toplam","böl"]},{t:"Sayısal bir örnek verdi",k:["/","örne"]}]},
{q:"Bir para 6 kez atılıyor ve 5 kez yazı geliyor. Kerem “Bu paranın yazı gelme olasılığı 5/6, demek ki para hileli” diyor. Kerem'e ne söylersin?",s:"Deneysel olasılık 5/6 çıkmıştır ama 6 atış çok azdır. Az denemede sonuçlar yarıdan uzak çıkabilir. Hileli olup olmadığını anlamak için parayı çok daha fazla, örneğin 100 ya da 200 kez atmak gerekir.",p:[{t:"Deneme sayısının az olduğunu belirtti",k:["az","6 atış","yeterli değil","küçük"]},{t:"Daha fazla deneme önerdi",k:["daha fazla","çok","100","200"]},{t:"Kesin hüküm verilemeyeceğini söyledi",k:["kesin","emin","söylenemez","hileli değil"]}]},
{q:"Bir sınıftaki 30 öğrencinin 12'si kahvaltıda peynir yiyor. Okuldaki 450 öğrenci için yaklaşık kaç kişinin peynir yediğini tahmin et. Tahminini nasıl yaptığını açıkla.",s:"Sınıftaki deneysel olasılık 12/30 = 2/5. Okulun tamamında da benzer olduğunu varsayarsam 450 · 2/5 = 180 öğrenci peynir yer. Bu kesin değil, bir tahmindir.",p:[{t:"Oranı 12/30 ya da 2/5 olarak buldu",k:["12/30","2/5","0,4","%40"]},{t:"450 ile çarptı ve 180 buldu",k:["180"]},{t:"Bunun bir tahmin olduğunu belirtti",k:["tahmin","yaklaşık","kesin değil"]}]},
{q:"İmkânsız olay, kesin olay ve olası olaya birer örnek ver. Her birinin olasılık değerini yaz.",s:"İmkânsız olay: Zar atınca 8 gelmesi, olasılığı 0. Kesin olay: Zar atınca 1 ile 6 arasında bir sayı gelmesi, olasılığı 1. Olası olay: Para atınca yazı gelmesi, olasılığı 1/2 yani 0 ile 1 arasında.",p:[{t:"İmkânsız olay örneği ve 0 değeri",k:["imkânsız","0"]},{t:"Kesin olay örneği ve 1 değeri",k:["kesin","1"]},{t:"Olası olay örneği ve 0 ile 1 arası değer",k:["olası","1/2","arası"]}]},
{q:"Bir torbadan geri atılarak 50 çekiliş yapılıyor: 20 kırmızı, 25 mavi, 5 sarı. Her rengin deneysel olasılığını kesir ve yüzde olarak yaz. Toplamlarının neden 1 olduğunu açıkla.",s:"Kırmızı 20/50 = 2/5 = %40, mavi 25/50 = 1/2 = %50, sarı 5/50 = 1/10 = %10. Toplam 50/50 = 1, yani %100'dür. Çünkü her çekilişte mutlaka bu üç renkten biri gelir; tüm sonuçlar birlikte bütün denemeleri oluşturur.",p:[{t:"Kırmızı: 2/5 ve %40",k:["2/5","%40","20/50"]},{t:"Mavi: 1/2 ve %50",k:["1/2","%50","25/50"]},{t:"Sarı: 1/10 ve %10",k:["1/10","%10","5/50"]},{t:"Toplamın 1 olmasını açıkladı",k:["toplam","100","her çekiliş","mutlaka"]}]}
]
}
});
