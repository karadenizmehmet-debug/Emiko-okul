/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
tema("fen",{
id:"t2",no:"2. Tema · 14 ders saati",ad:"Kuvvetin Etkisinde Hareket",ozet:"Yön, doğrultu, bileşke kuvvet, sürat ve hız",pdf:"pdf/fen-tema2.pdf",pdfAd:"Fen6_Tema2_Kuvvetin_Etkisinde_Hareket.pdf",pdfSayfa:5,ic:'<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><rect x="17" y="16" width="14" height="16" rx="2" fill="var(--teal)"/><path d="M2 24h13M9 19l6 5-6 5" stroke="var(--force)" stroke-width="3" fill="none"/><path d="M46 24H33M39 19l-6 5 6 5" stroke="var(--force)" stroke-width="3" fill="none"/></svg>',
/* ---------- KONU ANLATIMI (her öğe bir bölüm; uzun bölümler <!--PAGE--> ile sayfalara ayrılır) ---------- */
konu:[
{id:"t2s1",nav:"Kuvvetin Kimlik Kartı",html:`
<div class="eyebrow">Bölüm 1 · Hatırlayalım</div>
<h2>Kuvvetin kimlik kartı</h2>
<p>Kuvvet, bir cisme uygulanan <b>itme</b> veya <b>çekme</b>dir. Kuvvet <b>dinamometre</b> ile ölçülür, birimi <b>Newton (N)</b>'dur. Her insanın kimlik kartında adı, soyadı, doğum yeri yazar. Her kuvvetin de dört özelliği vardır:</p>
<div class="cards4">
 <div class="mini"><h4>1. Uygulama noktası</h4><p>Kuvvetin cisme etki ettiği nokta. Okun başladığı yer.</p></div>
 <div class="mini"><h4>2. Doğrultu</h4><p>Kuvvetin üzerinde bulunduğu çizgi: yatay, düşey, doğu-batı gibi.</p></div>
 <div class="mini"><h4>3. Yön</h4><p>O çizgi üzerinde kuvvetin hangi tarafa olduğu: sağa, sola, yukarı, aşağı gibi. Okun ucu gösterir.</p></div>
 <div class="mini"><h4>4. Büyüklük</h4><p>Kuvvetin şiddeti, kaç Newton olduğu. Okun uzunluğu gösterir.</p></div>
</div>
<div class="svgbox" data-w="anatomy"></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Bir kapıyı <b>menteşeye yakın</b> bir yerinden itersen zor açılır, <b>kolundan</b> itersen kolayca açılır. Kuvvetin büyüklüğü ve yönü aynı olsa bile <b>uygulama noktası</b> değişince sonuç değişir.</p></div>
<!--PAGE--><h2>Ok laboratuvarı</h2><p>Doğrultuyu, yönü ve büyüklüğü değiştir; okun ve cümlenin nasıl değiştiğini izle.</p>
<div class="widget"><div class="wh">Etkileşimli · Ok laboratuvarı</div><div class="wb" data-w="arrowlab"></div></div>`},
{id:"t2s2",nav:"Yön mü, Doğrultu mu?",html:`
<div class="eyebrow">Bölüm 2 · En çok karıştırılan ikili</div>
<h2>Yön ile doğrultu aynı şey değil!</h2>
<p><b>Doğrultu</b> “Hangi çizgi üzerinde?” sorusunun cevabıdır. <b>Yön</b> ise “O çizginin hangi ucuna doğru?” sorusunun cevabıdır.</p>
<div class="rule">Altın kural: Her doğrultunun birbirine zıt iki yönü vardır.</div>
<div class="svgbox" data-w="dirdog"></div>
<div class="box life"><span class="bt">Tren rayı örneği</span><p>Ankara ile İstanbul arasındaki <b>tren rayını</b> düşün. Ray, <b>doğrultudur</b>. Ankara'dan İstanbul'a giden tren ile İstanbul'dan Ankara'ya giden tren <b>aynı raydadır</b>, yani doğrultuları aynıdır. Ama biri batıya, diğeri doğuya gider; yani <b>yönleri zıttır</b>.</p></div>
<div class="box life"><span class="bt">Asansör örneği</span><p>Asansör hep aynı boşlukta, <b>düşey doğrultuda</b> hareket eder. Bazen <b>yukarı</b>, bazen <b>aşağı</b> yönde gider. Doğrultu değişmez, yön değişir.</p></div>
<!--PAGE--><h2>Günlük hayatta yön ve doğrultu</h2>
<div class="tbl"><table>
<tr><th>Günlük durum</th><th>Doğrultu</th><th>Yön</th></tr>
<tr><td>Okul çantanı yerden kaldırmak</td><td>Düşey</td><td>Yukarı</td></tr>
<tr><td>Olgun elmanın daldan düşmesi</td><td>Düşey</td><td>Aşağı</td></tr>
<tr><td>Çekmeceyi açmak</td><td>Yatay</td><td>Kendine doğru</td></tr>
<tr><td>Çekmeceyi kapatmak</td><td>Yatay</td><td>Dolaba doğru</td></tr>
<tr><td>Halat çekmede sağdaki takımın kuvveti</td><td>Yatay</td><td>Sağa</td></tr>
<tr><td>Akşehir'den Konya'ya giden otobüs</td><td>Kabaca doğu-batı</td><td>Doğuya</td></tr>
</table></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Sağa ve sola itilen iki kuvvet farklı doğrultudadır.”</b> Yanlış! İkisi de <b>aynı (yatay) doğrultudadır</b>; sadece çizginin farklı uçlarını gösterirler, yani <b>yönleri zıttır</b>.</p></div>
<div class="box know"><span class="bt">Hızlı ipucu</span><p>Cevabın “yatay, düşey, kuzey-güney, doğu-batı” gibi bir <b>çizgi adıysa</b> doğrultudur. Cevabın “sağa, sola, yukarı, aşağı, doğuya, kuzeye” gibi bir <b>gidiş tarafıysa</b> yöndür. Bu ayrımı hız konusunda yeniden kullanacağız: hız yön ister!</p></div>`},
{id:"t2s3",nav:"Bileşke Kuvvet",html:`
<div class="eyebrow">Bölüm 3 · Kuvvetleri birleştirmek</div>
<h2>Bileşke kuvvet</h2>
<p>Bir cisme aynı anda birden fazla kuvvet etki edebilir. Bu kuvvetlerin hepsinin birlikte yaptığı etkiyi <b>tek başına</b> yapabilen kuvvete <span class="hl">bileşke kuvvet</span> denir. Bu temada aynı doğrultudaki kuvvetlerle çalışıyoruz.</p>
<h3>Kural 1: Aynı yönlü kuvvetler toplanır</h3>
<p>Sen 20 N, arkadaşın 30 N kuvvetle bir sırayı aynı yönde itiyorsunuz. Bileşke kuvvet 20 + 30 = <b>50 N</b>'dur ve yönü itme yönüdür.</p>
<div class="svgbox" data-w="fd" data-f="20,30"></div>
<h3>Kural 2: Zıt yönlü kuvvetlerde büyükten küçük çıkarılır</h3>
<p>Halat çekmede soldaki takım 40 N, sağdaki takım 25 N kuvvet uyguluyor. Bileşke 40 − 25 = <b>15 N</b>'dur ve yönü <b>büyük kuvvetin yönü</b>, yani soladır.</p>
<div class="svgbox" data-w="fd" data-f="-40,25"></div>
<h3>Kural 3: Eşit ve zıt yönlü kuvvetlerin bileşkesi sıfırdır</h3>
<p>İki taraf da 30 N ile çekerse bileşke 30 − 30 = <b>0</b> olur. Halat kıpırdamaz.</p>
<div class="svgbox" data-w="fd" data-f="-30,30"></div>
<!--PAGE--><h2>Halat çekme arenası</h2><p>Takımların kuvvetini değiştir, bileşkeyi ve bayrağın nereye gideceğini tahmin et, sonra “Çekmeye başla” düğmesine bas.</p>
<div class="widget"><div class="wh">Etkileşimli · Halat çekme arenası</div><div class="wb" data-w="tug"></div></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Rüzgârlı bir günde bisiklet sürüyorsun. Rüzgâr <b>karşıdan</b> eserse pedal kuvvetin ile rüzgârın kuvveti zıt yönlüdür; bileşke küçülür, zorlanırsın. Rüzgâr <b>arkandan</b> eserse kuvvetler aynı yönlü olur, bileşke büyür, çok daha kolay gidersin.</p></div>`},
{id:"t2s4",nav:"Dengelenmiş Kuvvetler",html:`
<div class="eyebrow">Bölüm 4 · Hareketin sırrı</div>
<h2>Dengelenmiş ve dengelenmemiş kuvvetler</h2>
<p>Bileşke kuvvet <b>sıfırsa</b> kuvvetler <span class="hl">dengelenmiş</span>, <b>sıfırdan farklıysa</b> <span class="hl">dengelenmemiş</span> kuvvetlerdir. Cismin hareketine ne olacağını bu karar verir:</p>
<div class="tbl"><table>
<tr><th>Cismin durumu</th><th>Dengelenmiş kuvvet (bileşke = 0)</th><th>Dengelenmemiş kuvvet (bileşke ≠ 0)</th></tr>
<tr><td><b>Duruyorsa</b></td><td>Durmaya devam eder.</td><td>Harekete başlar.</td></tr>
<tr><td><b>Hareket ediyorsa</b></td><td>Aynı süratle, aynı yönde hareketine devam eder.</td><td>Hızlanır, yavaşlar, durur ya da yönünü değiştirir.</td></tr>
</table></div>
<div class="cards4">
 <div class="mini"><h4>Dengelenmiş örnekler</h4><p>Masada duran kitap (ağırlığı aşağı, masanın tepkisi yukarı) · Tavandan asılı avize · Kıpırdamayan halat · Sabit süratle inen paraşütçü · Düz yolda sabit süratle giden araba</p></div>
 <div class="mini"><h4>Dengelenmemiş örnekler</h4><p>Kaleye vurulan şut · Fren yapan araba · Yokuş aşağı hızlanan kaykay · Kalecinin topu tutup durdurması · Durakta kalkışa geçen otobüs</p></div>
</div>
<h3>Dengeleyici kuvvet</h3>
<p>Bileşkeyi sıfır yapmak için eklenen kuvvete <b>dengeleyici kuvvet</b> denir. Bileşke ile <b>aynı büyüklükte</b> ve <b>aynı doğrultuda</b>, ama <b>zıt yönlüdür</b>. Bileşke 15 N sola ise dengeleyici kuvvet 15 N sağa olmalıdır.</p>
<!--PAGE--><h2>Yanlış bilinenler ve deney</h2>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Duran bir cisme hiçbir kuvvet etki etmez.”</b> Yanlış! Masadaki kitaba hem yer çekimi hem masa kuvvet uygular. Kitap durur, çünkü bu kuvvetler <b>dengelenmiştir</b>.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Hareket eden bir cisim, kuvvetler dengelenince hemen durur.”</b> Hayır, sabit süratle yoluna devam eder. Paraşütçü ağırlığı ile hava direnci eşitlenince durmaz; <b>sabit süratle</b> iner.</p></div>
<div class="box know"><span class="bt">Bilim tarihimizden</span><p><b>İbni Sina</b>, Aristoteles'in görüşüne bağlı kalarak “Fazla kuvvet daha fazla hızlanma demektir.” demiş ve hareket için bir “hareket ettirici” gerektiğini kabul etmiştir. Bugün biliyoruz ki kuvvetler dengelendiğinde hareketli bir cisim yoluna devam edebilir; yuvarlanan topu durduran şey sürtünmedir. Bilim, yeni kanıtlarla kendini yeniler.</p></div>
<div class="box teach"><span class="bt">Deney tasarla</span><p><b>Hipotez:</b> “Duran bir oyuncak arabaya zıt yönlerden eşit kuvvet uygulanırsa araba hareket etmez.”<br><b>Malzemeler:</b> Oyuncak araba, iki dinamometre, ip.<br><b>Değiştirilen:</b> Kuvvetlerin büyüklüğü · <b>Gözlenen:</b> Arabanın hareketi · <b>Sabit tutulan:</b> Araba ve zemin.<br>Ölçümleri tabloya yaz, sonucu V diyagramıyla raporla.</p></div>`},
{id:"t2s5",nav:"Yol ve Yer Değiştirme",html:`
<div class="eyebrow">Bölüm 5 · Nereden nereye?</div>
<h2>Alınan yol ve yer değiştirme</h2>
<div class="cards4">
 <div class="mini"><h4>Alınan yol</h4><p>Hareket boyunca <b>izlenen yolun toplam uzunluğu</b>. Yönü yoktur. Ayakkabının tabanı ne kadar yol gittiğini bilir.</p></div>
 <div class="mini"><h4>Yer değiştirme</h4><p>Başlangıç noktası ile bitiş noktası arasındaki <b>düz çizginin uzunluğu ve yönü</b>. Okla gösterilir.</p></div>
</div>
<div class="widget"><div class="wh">Etkileşimli · Evden okula rota seç (her kare 100 m)</div><div class="wb" data-w="route"></div></div>
<!--PAGE--><h2>Günlük hayattan örnekler</h2>
<div class="tbl"><table>
<tr><th>Durum</th><th>Alınan yol</th><th>Yer değiştirme</th></tr>
<tr><td>400 m'lik koşu pistinde 1 tur atmak</td><td>400 m</td><td>0 (başladığın yere döndün)</td></tr>
<tr><td>Düz bir caddede 200 m kuzeye yürümek</td><td>200 m</td><td>200 m kuzeye</td></tr>
<tr><td>Asansörle zemin kattan 3. kata çıkıp geri inmek</td><td>6 katlık yol</td><td>0</td></tr>
<tr><td>Okul servisinin sabah seni alıp akşam eve bırakması</td><td>Gidiş + dönüş</td><td>0</td></tr>
</table></div>
<div class="rule">Yer değiştirme, alınan yoldan büyük olamaz. İkisi ancak düz bir çizgide, hiç geri dönmeden gidildiğinde eşit olur.</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Haritalar “Yolculuk 12 km” der, çünkü virajlı yolları sayar: bu <b>alınan yoldur</b>. İki şehir arasındaki “kuş uçuşu” uzaklık ise daha kısadır. Kuş uçuşu uzaklığa yönü de eklersen (“7 km kuzeydoğuya”) <b>yer değiştirmeyi</b> anlatmış olursun.</p></div>`},
{id:"t2s6",nav:"Sürat ve Hız",html:`
<div class="eyebrow">Bölüm 6 · En zor kavram</div>
<h2>Sürat ve hız: Kardeş ama ikiz değil</h2>
<div class="cards4">
 <div class="mini"><h4>Sürat</h4><p><b>Birim zamanda alınan yol.</b> Yönü yoktur. “Otobüs 1 saatte 90 km yol alıyor; sürati 90 km/h.”</p></div>
 <div class="mini"><h4>Hız</h4><p><b>Birim zamanda yapılan yer değiştirme.</b> Yönü vardır. “Uçak 800 km/h ile <u>doğuya</u> uçuyor.”</p></div>
</div>
<p>İkisinin de birimleri aynıdır: <b>km/h</b> (kilometre/saat) ve <b>m/s</b> (metre/saniye). 5 m/s, “her saniyede 5 metre” demektir.</p>
<div class="rule">Hızı söylerken yönü de söylemelisin. Yönü yoksa sürattir.</div>
<div class="widget"><div class="wh">Etkileşimli · Sürat göstergesi ve hız oku</div><div class="wb" data-w="speed"></div></div>
<!--PAGE--><h2>Sabit süratli mi, sabit hızlı mı?</h2>
<ul>
<li><b>Sabit süratli hareket:</b> Cisim eşit zamanlarda eşit yollar alır. Bu sırada yön değiştirebilir. Dönme dolaptaki kabin, döner kavşaktaki otobüs.</li>
<li><b>Sabit hızlı hareket:</b> Hem sürat hem yön sabittir. Cisim <b>düz bir çizgide</b>, hiç dönmeden gider. Dümdüz bir yolda aynı süratle giden tren.</li>
</ul>
<p>Her sabit hızlı hareket aynı zamanda sabit süratlidir. Ama her sabit süratli hareket sabit hızlı değildir!</p>
<div class="tbl"><table>
<tr><th></th><th>Sürat</th><th>Hız</th></tr>
<tr><td><b>Neyi kullanır?</b></td><td>Alınan yol</td><td>Yer değiştirme</td></tr>
<tr><td><b>Yönü var mı?</b></td><td>Yok</td><td>Var</td></tr>
<tr><td><b>Birimi</b></td><td>km/h, m/s</td><td>km/h, m/s</td></tr>
<tr><td><b>Pistte 1 tur atan koşucu</b></td><td>Sıfırdan farklı</td><td>Tur sonunda yer değiştirme 0 olduğu için sıfır</td></tr>
<tr><td><b>Ortak yönleri</b></td><td colspan="2">İkisi de hareketin ne kadar çabuk olduğunu anlatır, zamanla ilgilidir ve aynı birimlerle ölçülür.</td></tr>
</table></div>
<!--PAGE--><h2>Günlük hayatta sürat ve hız</h2>
<div class="tbl"><table>
<tr><th>Hareketli</th><th>Yaklaşık sürat</th></tr>
<tr><td>Yürüyen bir insan</td><td>5 km/h</td></tr>
<tr><td>Bisiklet</td><td>15-20 km/h</td></tr>
<tr><td>Şehir içinde otomobil (sınır)</td><td>50 km/h</td></tr>
<tr><td>Kısa mesafede koşan çita</td><td>100 km/h civarı</td></tr>
<tr><td>Yolcu uçağı</td><td>900 km/h civarı</td></tr>
</table></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Arabadaki hız göstergesi aracın hızını gösterir.”</b> Gösterge sadece bir sayı gösterir, yön göstermez. Bu yüzden aslında <b>sürati</b> gösterir. Yol kenarındaki “50” tabelası da bir <b>sürat sınırıdır</b>.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Göstergedeki sayı değişmiyorsa hız da değişmiyordur.”</b> Virajda ya da döner kavşakta gösterge sabit kalsa bile aracın <b>yönü değişir</b>. Yön değiştiği için <b>hız değişir</b>, sürat ise aynı kalır. Yukarıdaki simülasyonda kavşak modunu izle.</p></div>
<div class="box teach"><span class="bt">Öğretmen notu</span><p>Program bu bölümde grafik okuma ve matematiksel hesaplamaya girilmemesini, birimler arası dönüşüm yapılmadan km/h ve m/s birimlerinin kullanılmasını öngörür. Uygulamadaki sürat-hız içerikleri bu sınıra göre hazırlanmıştır.</p></div>`}
],
/* ---------- PEKİŞTİRME İSTASYONU ---------- */
q:{
dy:[
{q:"Bir kuvvetin doğrultusu ile yönü aynı şeydir.",a:1,ex:"Doğrultu kuvvetin bulunduğu çizgidir; yön ise o çizgi üzerinde hangi tarafa olduğudur. Bir doğrultuda iki zıt yön vardır."},
{q:"Yukarı ve aşağı yönleri aynı doğrultudadır.",a:0,ex:"İkisi de düşey doğrultudadır, birbirine zıt yönlerdir."},
{q:"Aynı yönlü iki kuvvetin bileşkesi, kuvvetlerin büyüklüklerinin toplamına eşittir.",a:0,ex:"Aynı yönlü kuvvetler toplanır; bileşkenin yönü de aynıdır."},
{q:"Zıt yönlü iki kuvvetin bileşkesi, küçük kuvvetin yönündedir.",a:1,ex:"Bileşke, büyük olan kuvvetin yönündedir."},
{q:"Bileşke kuvvet sıfır ise cisme etki eden kuvvetler dengelenmiştir.",a:0,ex:"Dengelenmiş kuvvetin tanımı budur."},
{q:"Dengelenmiş kuvvetlerin etkisindeki hareketli bir cisim hemen durur.",a:1,ex:"Hareketli cisim aynı süratle, aynı yönde hareketine devam eder."},
{q:"Masanın üzerinde duran bir kitaba hiçbir kuvvet etki etmez.",a:1,ex:"Kitaba yer çekimi aşağı, masa yukarı yönde kuvvet uygular. Bu kuvvetler dengelenmiştir."},
{q:"Arabalardaki “hız göstergesi” aslında aracın süratini gösterir.",a:0,ex:"Gösterge yön göstermez, sadece sayı gösterir; bu yüzden sürati gösterir."},
{q:"Pistte bir tur atıp başladığı yere dönen koşucunun yer değiştirmesi sıfırdır.",a:0,ex:"Başlangıç ve bitiş noktası aynı olduğu için yer değiştirme sıfırdır; alınan yol ise sıfır değildir."},
{q:"Sürat yönü olan bir kavramdır.",a:1,ex:"Süratin yönü yoktur. Yönü olan kavram hızdır."},
{q:"Döner kavşakta sabit süratle dönen bir otobüsün hızı da sabittir.",a:1,ex:"Otobüsün yönü sürekli değiştiği için hızı değişir; sürati sabit kalır."},
{q:"Alınan yol, yer değiştirmeden küçük olamaz.",a:0,ex:"Yer değiştirme en kısa düz çizgidir. Alınan yol ona eşit ya da ondan büyüktür."},
{q:"Duran bir cisme dengelenmemiş kuvvet etki ederse cisim harekete başlar.",a:0,ex:"Bileşke sıfır değilse duran cisim bileşke kuvvetin yönünde harekete geçer."}
],
test:[
{q:"Halat çekme yarışmasında soldaki takım 60 N, sağdaki takım 45 N kuvvet uyguluyor. Halata etki eden bileşke kuvvet hangisidir?",o:["105 N, sola","15 N, sola","15 N, sağa","0 N"],a:1,ex:"Zıt yönlü kuvvetlerde büyükten küçük çıkarılır: 60 − 45 = 15 N. Yön, büyük kuvvetin yönü yani soldur."},
{q:"Ayşe 40 N, Can 30 N kuvvetle bir dolabı aynı yönde itiyor. Dolaba etki eden bileşke kuvvet kaç N'dur?",o:["10 N","30 N","40 N","70 N"],a:3,ex:"Aynı yönlü kuvvetler toplanır: 40 + 30 = 70 N."},
{q:"Kuvveti gösteren bir okta, kuvvetin büyüklüğünü okun hangi özelliği gösterir?",o:["Okun ucu","Okun uzunluğu","Okun başladığı nokta","Okun rengi"],a:1,ex:"Okun uzunluğu büyüklüğü, ucu yönü, başladığı nokta uygulama noktasını gösterir."},
{q:"Bir asansör önce yukarı çıkıyor, sonra aşağı iniyor. Bu hareket için hangisi doğrudur?",o:["Doğrultu da yön de değişti.","Doğrultu aynı kaldı (düşey), yön değişti.","Yön aynı kaldı, doğrultu değişti.","Doğrultu da yön de aynı kaldı."],a:1,ex:"Asansör hep düşey doğrultuda hareket eder; yukarı ve aşağı bu doğrultunun iki zıt yönüdür."},
{q:"Paraşütü açılmış bir paraşütçü sabit süratle yere iniyor. Bu durum için hangisi doğrudur?",o:["Ağırlığı hava direncinden büyüktür.","Paraşütçüye etki eden kuvvetler dengelenmiştir.","Bileşke kuvvet aşağı yönlüdür.","Paraşütçüye hiçbir kuvvet etki etmez."],a:1,ex:"Sabit süratle hareket eden cismin üzerindeki kuvvetler dengelenmiştir: ağırlık = hava direnci."},
{q:"Masada duran oyuncak arabaya sağa doğru 8 N, sola doğru 8 N kuvvet uygulanıyor. Arabanın hareketi ile ilgili hangisi doğrudur?",o:["Sağa doğru hareket eder.","Sola doğru hareket eder.","Durmaya devam eder.","Önce sağa sonra sola gider."],a:2,ex:"Bileşke 8 − 8 = 0. Kuvvetler dengelenmiştir; duran cisim durmaya devam eder."},
{q:"Emre evinden çıkıp sokakları dolaşarak 900 m yürüyor ve evinin 300 m doğusundaki markete varıyor. Emre'nin aldığı yol ve yer değiştirmesi hangisidir?",o:["Alınan yol 900 m; yer değiştirme 300 m doğuya","Alınan yol 300 m; yer değiştirme 900 m doğuya","Alınan yol 900 m; yer değiştirme 900 m doğuya","Alınan yol 1200 m; yer değiştirme 300 m"],a:0,ex:"Yürüdüğü toplam uzunluk alınan yoldur (900 m). Evden markete düz çizgi ve yönü yer değiştirmedir (300 m doğuya)."},
{q:"Aşağıdakilerden hangisi bir hız bilgisidir?",o:["Otobüs 80 km/h ile gidiyor.","Uçak 800 km/h ile kuzeye uçuyor.","Çita 100 km/h koşabilir.","Tabelada 50 yazıyor."],a:1,ex:"Hız bilgisinde yön belirtilir. Sadece B şıkkında yön (kuzey) vardır."},
{q:"Aynı süratle giden iki bisikletliden biri doğuya, diğeri batıya gidiyor. Bu bisikletliler için hangisi doğrudur?",o:["Süratleri de hızları da eşittir.","Süratleri eşit, hızları farklıdır.","Süratleri farklı, hızları eşittir.","Süratleri de hızları da farklıdır."],a:1,ex:"Sürat yön içermez, bu yüzden eşittir. Hız yön içerir; yönleri zıt olduğu için hızları farklıdır."},
{q:"Aşağıdaki durumların hangisinde cisme etki eden kuvvetler dengelenmiştir?",o:["Kalecinin gelen topu tutup durdurması","Tavandan asılı duran avize","Yokuş aşağı hızlanan kaykay","Fren yapıp yavaşlayan araba"],a:1,ex:"Avize durmaya devam ediyor: ağırlığı ile ipin kuvveti dengelenmiştir. Diğerlerinde hareket durumu değişiyor."},
{q:"Bir kutuya 50 N sağa, 30 N sola kuvvet etki ediyor. Kutunun hareketsiz kalması için eklenmesi gereken dengeleyici kuvvet hangisidir?",o:["20 N, sağa","20 N, sola","80 N, sola","30 N, sağa"],a:1,ex:"Bileşke 50 − 30 = 20 N sağa. Dengeleyici kuvvet aynı büyüklükte ve zıt yönlüdür: 20 N sola."}
],
match:[
{title:"Kuvvetin özellikleri",p:[["Uygulama noktası","Kuvvetin cisme etki ettiği nokta"],["Doğrultu","Kuvvetin üzerinde bulunduğu çizgi (yatay, düşey)"],["Yön","Doğrultu üzerinde kuvvetin hangi tarafa olduğu"],["Büyüklük","Kuvvetin şiddeti; okun uzunluğu"],["Bileşke kuvvet","Birden fazla kuvvetin etkisini tek başına yapan kuvvet"],["Dengeleyici kuvvet","Bileşkeyi sıfır yapmak için eklenen zıt yönlü kuvvet"]]},
{title:"Hareket kavramları",p:[["Alınan yol","İzlenen yolun toplam uzunluğu"],["Yer değiştirme","Başlangıç ile bitiş arasındaki yönlü en kısa uzaklık"],["Sürat","Birim zamanda alınan yol"],["Hız","Birim zamanda yapılan yer değiştirme (yönlü)"],["Dengelenmiş kuvvet","Duran cismi durdurur, hareketliyi aynı süratle sürdürür"],["Dengelenmemiş kuvvet","Cismin süratini veya yönünü değiştirir"]]}
],
fill:{items:[
{t:"Kuvvetin birimi ___'dur.",a:"Newton"},
{t:"Kuvvet ___ ile ölçülür.",a:"dinamometre"},
{t:"Bir doğrultu üzerinde ___ zıt yön vardır.",a:"iki"},
{t:"Bileşkesi sıfır olan kuvvetlere ___ kuvvetler denir.",a:"dengelenmiş"},
{t:"Sürat, birim zamanda alınan ___ dur.",a:"yol"},
{t:"Hız, birim zamanda yapılan ___ dir.",a:"yer değiştirme"}
],extra:["termometre","dengelenmemiş","üç","gram"]},
sira:[
{title:"Bileşke kuvveti bulma adımlarını sırala.",i:["Kuvvetlerin aynı doğrultuda olduğunu kontrol et.","Kuvvetlerin yönlerine bak.","Aynı yönlüyse topla, zıt yönlüyse büyükten küçüğü çıkar.","Bileşkenin yönünü belirle.","Bileşke sıfırsa “dengelenmiş”, değilse “dengelenmemiş” de."]},
{title:"Hareketlileri en yavaştan en süratliye doğru sırala.",i:["Salyangoz","Yürüyen bir insan","Bisiklet süren çocuk","Şehir içinde giden otomobil","Yolcu uçağı"]}
],
det:[
{title:"Gösterge Davası",story:"Uzun bir yolculukta babası “Göstergede 90 yazıyor, hızımız 90 km/h.” dedi. Arka koltuktaki Elif “Baba, bu tam olarak hız değil!” diye itiraz etti. Kim haklı?",clues:["Gösterge sadece bir sayı gösteriyor.","Göstergede ok ya da pusula yok.","Yol virajlı; araba önce kuzeye, sonra batıya döndü.","Gösterge viraj boyunca 90'da sabit kaldı."],q:"Hangi açıklama doğrudur?",o:["Babası haklı; gösterge hızı gösterir.","Elif haklı; gösterge yön göstermediği için sürati gösterir.","İkisi de haksız; gösterge yer değiştirmeyi gösterir.","Babası haklı; viraj hızı etkilemez."],a:1,ex:"Hız yön ister. Gösterge yön vermediği için süratı gösterir. Virajda sürat sabit kalsa bile yön değiştiği için hız değişir."},
{title:"Kıpırdamayan Koli",story:"Ali ve Veli, taşınma günü büyük bir koliyi ters taraflardan itiyorlar. Koli yerinden kıpırdamıyor. Ali “Demek ki hiç kuvvet uygulamıyoruz!” diyor.",clues:["İkisi de terlemiş, çok güç harcıyor.","Ali'nin dinamometresi 50 N gösteriyor.","Veli'nin dinamometresi de 50 N gösteriyor.","İkisi aynı çizgide, zıt taraflardan itiyor."],q:"Koli neden hareket etmiyor?",o:["Koliye hiç kuvvet etki etmiyor.","Kuvvetler aynı yönlü olduğu için","Kuvvetler eşit ve zıt yönlü; bileşke sıfır, kuvvetler dengelenmiş.","Koli çok ağır olduğu için kuvvetin etkisi yok."],a:2,ex:"50 N − 50 N = 0. Kuvvetler var ama dengelenmiş. Duran cisim durmaya devam eder."},
{title:"Pistteki Sıfır",story:"Beden eğitimi dersinde Zeynep 400 m'lik pistte bir tur koştu. Öğretmeni “Yer değiştirmen sıfır!” deyince Zeynep şaşırdı: “Ama çok yoruldum!”",clues:["Zeynep başlangıç çizgisinden koşmaya başladı.","Bir tur sonra aynı çizgide durdu.","Pist yuvarlak, düz bir yol değil."],q:"Hangisi doğru açıklamadır?",o:["Alınan yol 400 m; yer değiştirme 0, çünkü başladığı yere döndü.","Alınan yol 0; yer değiştirme 400 m.","İkisi de 400 m.","İkisi de 0, çünkü pist yuvarlak."],a:0,ex:"Zeynep 400 m yol aldı, bu yüzden yoruldu. Başlangıç ile bitiş aynı nokta olduğu için yer değiştirmesi sıfırdır."},
{title:"Kavşaktaki Gizem",story:"Mert otobüsle okula giderken otobüs büyük bir döner kavşağa girdi. Mert şoförün arkasından göstergeye baktı: hep 30 km/h. “Sürat sabit, demek ki hız da sabit.” dedi.",clues:["Otobüsün önü önce kuzeyi gösteriyordu.","Sonra doğuyu, ardından güneyi gösterdi.","Gösterge kavşak boyunca hiç değişmedi."],q:"Hangi yorum doğrudur?",o:["Sürat de hız da sabittir.","Sürat sabit, hız değişiyor; çünkü yön değişiyor.","Sürat değişiyor, hız sabit.","İkisi de değişiyor."],a:1,ex:"Gösterge sabit olduğu için sürat sabittir. Yön sürekli değiştiği için hız değişir. Yönü değiştiren dengelenmemiş bir kuvvet vardır."},
{title:"Kalecinin Eldivenleri",story:"Maçın son dakikasında kaleye doğru gelen topu kaleci havada yakaladı ve top elinde durdu. Hakem “Topun hareketini değiştiren neydi?” diye sordu.",clues:["Top kaleye doğru hızla geliyordu.","Kaleci topa, gidiş yönünün tersine kuvvet uyguladı.","Top yavaşladı ve durdu."],q:"Topa kaleci tarafından uygulanan kuvvet için hangisi doğrudur?",o:["Dengelenmiş bir kuvvettir; top durmaya devam etmiştir.","Dengelenmemiş bir kuvvettir; topun süratini değiştirip durdurmuştur.","Kuvvet uygulanmamıştır, top kendi kendine durmuştur.","Topun yönüyle aynı yönlü bir kuvvettir."],a:1,ex:"Hareket eden top yavaşlayıp durdu: hareket durumu değiştiği için kuvvet dengelenmemiştir ve topun hareketine zıt yönlüdür."}
],
klasik:[
{q:"Yön ile doğrultu arasındaki farkı günlük hayattan iki örnekle açıkla.",s:"Doğrultu, kuvvetin ya da hareketin üzerinde bulunduğu çizgidir; yön ise o çizgi üzerinde hangi tarafa olduğudur. Örneğin asansör hep düşey doğrultuda hareket eder ama bazen yukarı, bazen aşağı yöne gider. Tren rayında Ankara'ya ve İstanbul'a giden trenler aynı doğrultuda, zıt yöndedir.",p:[{t:"Doğrultunun çizgi olduğunu yazdı",k:["çizgi","yatay","düşey","doğrultu"]},{t:"Yönün çizgi üzerindeki taraf olduğunu yazdı",k:["taraf","sağa","sola","yukarı","aşağı"]},{t:"Bir doğrultuda iki zıt yön olduğunu belirtti",k:["iki yön","zıt"]},{t:"En az bir günlük hayat örneği verdi",k:["asansör","tren","çekmece","halat","otobüs","araba"]}]},
{q:"Bir kutuya 40 N sağa ve 25 N sola kuvvet etki ediyor. Bileşke kuvveti bul. Kutuyu dengelemek için ne yapılmalıdır?",s:"Kuvvetler zıt yönlü olduğu için büyükten küçük çıkarılır: 40 − 25 = 15 N. Bileşke 15 N'dur ve büyük kuvvetin yönünde, yani sağa doğrudur. Kutuyu dengelemek için 15 N büyüklüğünde, sola doğru bir dengeleyici kuvvet uygulanmalıdır.",p:[{t:"Bileşkeyi 15 N buldu",k:["15"]},{t:"Bileşkenin yönünü sağa olarak yazdı",k:["sağa","sağ"]},{t:"Dengeleyici kuvveti 15 N sola olarak yazdı",k:["sola","dengeleyici"]}]},
{q:"Sürat ile hız arasındaki iki benzerliği ve iki farklılığı yaz.",s:"Benzerlikler: İkisi de hareketin ne kadar çabuk olduğunu anlatır ve aynı birimlerle (km/h, m/s) ifade edilir. Farklılıklar: Sürat alınan yolla, hız yer değiştirmeyle ilgilidir. Süratin yönü yoktur, hızın yönü vardır.",p:[{t:"Aynı birimleri kullandıklarını yazdı",k:["birim","km/h","m/s"]},{t:"Çabukluk/zaman benzerliğini yazdı",k:["çabuk","zaman","ne kadar hızlı"]},{t:"Yol–yer değiştirme farkını yazdı",k:["yer değiştirme","alınan yol"]},{t:"Yön farkını yazdı",k:["yön"]}]},
{q:"Bir tren istasyondan çıkıp aynı raydan 10 km gidiyor, sonra geri dönüp aynı istasyona geliyor. Trenin aldığı yol ve yer değiştirmesi nedir? Açıkla.",s:"Tren 10 km gidip 10 km geri döndüğü için aldığı yol 20 km'dir. Başladığı yere geri döndüğü için başlangıç ile bitiş noktası aynıdır; yer değiştirmesi sıfırdır.",p:[{t:"Alınan yolu 20 km buldu",k:["20"]},{t:"Yer değiştirmeyi sıfır buldu",k:["sıfır","0"]},{t:"Başladığı yere döndüğünü gerekçe olarak yazdı",k:["aynı","geri","başladığı"]}]},
{q:"Evinden birer dengelenmiş ve dengelenmemiş kuvvet örneği ver ve nedenini açıkla.",s:"Dengelenmiş: Duvarda asılı duran saat. Ağırlığı aşağı, çivinin kuvveti yukarı yöndedir ve eşittir; saat durmaya devam eder. Dengelenmemiş: Masadan düşen kalem. Ona sadece yer çekimi etki eder, bileşke sıfır değildir; kalem harekete geçer ve hızlanır.",p:[{t:"Dengelenmiş bir örnek verdi",k:["asılı","duran","masada","avize","saat"]},{t:"Dengelenmiş örnekte bileşkenin sıfır/kuvvetlerin eşit olduğunu açıkladı",k:["eşit","sıfır","dengelen"]},{t:"Dengelenmemiş bir örnek verdi",k:["düş","it","at","fren","hızlan","harekete"]},{t:"Hareket durumunun değiştiğini açıkladı",k:["harekete","hızlan","yavaşla","yön değiştir","değiş"]}]}
]
}
});
