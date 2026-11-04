/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== SOSYAL BİLGİLER · ETKİLEŞİMLİ PARÇALAR ====================== */
const SFT='font-family="Lexend"';

/* 1) Elif'in grupları ve rolleri: zaman içinde değişim */
W.rolAgi=el=>{
  const D=[
    {y:5,nt:"Elif henüz anaokulunda. Gruplarının sayısı az, rollerinin çoğu ailesiyle ilgili.",g:[["Aile","çocuk"],["Anaokulu","öğrenci"],["Mahalle","oyun arkadaşı"]]},
    {y:11,nt:"Kardeşi doğdu, Elif artık abla. Ortaokula başladı, sınıf başkanı seçildi, voleybol takımına girdi. Grupları da rolleri de çoğaldı.",g:[["Aile","abla"],["Okul","6. sınıf öğrencisi"],["Sınıf","sınıf başkanı"],["Spor kulübü","voleybolcu"],["Arkadaşlar","yakın arkadaş"]]},
    {y:17,nt:"Lisede okuyor. Hafta sonları bir çevre derneğinde gönüllü. İlk kez bir yazılımcılık kursuna katıldı.",g:[["Aile","abla, torun"],["Lise","öğrenci"],["Çevre derneği","gönüllü"],["Kurs","kursiyer"],["Arkadaşlar","arkadaş"]]},
    {y:32,nt:"Öğretmen oldu, evlendi, bir çocuk annesi. Aynı aile grubunda yeni roller kazandı: eş ve anne.",g:[["Aile","anne, eş, evlat"],["Okul","öğretmen"],["Apartman","yönetici"],["Kızılay","gönüllü"],["Veli grubu","veli"]]},
    {y:66,nt:"Emekli oldu. Öğretmenlik rolü bitti; büyükanne rolü başladı. Mahallede kurs veren bir gönüllü oldu.",g:[["Aile","büyükanne, anne"],["Emekliler derneği","üye"],["Mahalle","komşu, kurs gönüllüsü"],["Halk eğitim","kursiyer"]]}];
  const C=["var(--d-sos)","var(--disp)","var(--ok)","var(--force)","var(--know)"];
  let k=1;
  el.innerHTML=`<div class="seg" id="rS">${D.map((d,i)=>`<button data-k="${i}" aria-pressed="${i===k}">${d.y} yaş</button>`).join("")}</div>
  <div class="svgbox"><svg id="rG" viewBox="0 0 380 260" role="img" aria-label="Elif'in gruplarını ve rollerini gösteren ağ"></svg></div>
  <div class="say" id="rY"></div>`;
  function draw(){
    const d=D[k],n=d.g.length;let s=gridBg(380,260);
    d.g.forEach((g,i)=>{const a=-Math.PI/2+i*2*Math.PI/n,x=190+Math.cos(a)*128,y=130+Math.sin(a)*92;
      s+=`<line x1="190" y1="130" x2="${x}" y2="${y}" stroke="${C[i%5]}" stroke-width="2.5" stroke-dasharray="5 4"/>`;
      s+=`<rect x="${x-58}" y="${y-22}" width="116" height="44" rx="10" fill="var(--surface)" stroke="${C[i%5]}" stroke-width="2.5"/>
      <text x="${x}" y="${y-5}" text-anchor="middle" font-size="11" font-weight="700" fill="${C[i%5]}" ${SFT}>${g[0]}</text>
      <text x="${x}" y="${y+12}" text-anchor="middle" font-size="10.5" fill="var(--ink)" ${SFT}>${g[1]}</text>`});
    s+=`<circle cx="190" cy="130" r="30" fill="var(--d-sos)"/><text x="190" y="127" text-anchor="middle" font-size="13" font-weight="700" fill="var(--paper)" ${SFT}>Elif</text><text x="190" y="143" text-anchor="middle" font-size="10.5" fill="var(--paper)" ${SFT}>${d.y} yaş</text>`;
    $("#rG",el).innerHTML=s;
    $("#rY",el).innerHTML=`<b>${n} grup, ${d.g.reduce((a,g)=>a+g[1].split(",").length,0)} rol.</b> ${d.nt}`;
    $$("#rS button",el).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===k));
  }
  $$("#rS button",el).forEach(b=>b.onclick=()=>{k=+b.dataset.k;draw()});draw();
};

/* 2) Müzakere masası: okul bahçesi sorunu */
W.muzakere=el=>{
  const R=[
    {t:"1. Adım · Sorunu doğru tanımla",q:"Teneffüste futbol sahası hep 8. sınıflarda kalıyor; 5, 6 ve 7. sınıflar oynayamıyor. Sorunu nasıl ifade edersin?",o:[
      ["“8. sınıflar bencil, onları sahadan atalım.”",0,"Bu bir suçlama, sorun tanımı değil. Suçlayan dil karşı tarafı savunmaya iter."],
      ["“Saha bir tane, kullanmak isteyen çok. Herkesin oynayabileceği bir düzen yok.”",2,"Doğru! Kişileri değil durumu anlattın. Herkes bu cümlede kendini suçlanmış hissetmez."],
      ["“Boş ver, nasılsa bir yıl sonra biz büyük olacağız.”",0,"Sorunu görmezden gelmek onu çözmez; sonraki küçük sınıflar aynı haksızlığı yaşar."]]},
    {t:"2. Adım · Tarafları dinle",q:"Sınıf temsilcileri toplandı. 8. sınıf temsilcisi “Sınava hazırlanıyoruz, tek rahatladığımız an teneffüs.” diyor. Ne yaparsın?",o:[
      ["Sözünü keser, kendi isteğini tekrar söylersin.",0,"Dinlemeden müzakere olmaz. Karşı taraf da seni dinlemez."],
      ["Gerekçesini anladığını söyler, sonra kendi sınıfının ihtiyacını anlatırsın.",2,"Harika! Empati kurdun ve ihtiyacını saygıyla dile getirdin. Müzakerenin kalbi budur."],
      ["“Peki, siz oynayın.” deyip vazgeçersin.",1,"Kavga çıkmadı ama senin ihtiyacın yok sayıldı. Uzlaşma iki tarafın da kazanmasıdır."]]},
    {t:"3. Adım · Ortak çözüm bul",q:"Hangi öneri herkesin ihtiyacını gözetir?",o:[
      ["Saha sadece 8. sınıflara verilsin.",0,"Bir tarafın kazandığı, diğerlerinin kaybettiği bir karar uzlaşma değildir."],
      ["Haftanın günleri sınıf seviyelerine paylaştırılsın; liste panoya asılsın, okul meclisi bir ay sonra değerlendirsin.",2,"Mükemmel! Adil, uygulanabilir ve sonradan değerlendirilebilir bir çözüm. Okul meclisi de işin içinde."],
      ["Futbol tamamen yasaklansın, kimse oynamasın.",0,"Sorunu çözmek yerine herkesi kaybettiren bir karar. Kimse memnun kalmaz."]]}];
  let r=0,pt=0,done=[];
  el.innerHTML=`<div class="tlcard" id="mC"></div><div class="opts" id="mO"></div><div id="mF"></div>
  <div class="readout"><span class="pill accp" id="mP"></span></div><div class="ctrls"><button class="btn" id="mN" hidden>Sonraki adım →</button><button class="btn ghost" id="mR">Baştan</button></div>`;
  function show(){
    const x=R[r];$("#mC",el).innerHTML=`<span class="pill accp">${x.t}</span><p>${x.q}</p>`;
    $("#mO",el).innerHTML=x.o.map((o,i)=>`<button class="opt" data-k="${i}"><span class="L">${"ABC"[i]}</span><span>${o[0]}</span></button>`).join("");
    $("#mF",el).innerHTML="";$("#mN",el).hidden=true;meter();
    $$("#mO .opt",el).forEach(b=>b.onclick=()=>{if(done[r]!=null)return;const i=+b.dataset.k,o=x.o[i];done[r]=o[1];pt+=o[1];
      b.classList.add(o[1]===2?"right":"wrong");$$("#mO .opt",el).forEach(q=>q.disabled=true);
      $("#mF",el).innerHTML=`<div class="fb ${o[1]===2?"ok":"no"}"><b>${o[1]===2?"Uzlaşmaya bir adım daha!":"Bir daha düşün."}</b>${o[2]}</div>`;
      meter();if(r<R.length-1)$("#mN",el).hidden=false;else $("#mF",el).innerHTML+=`<div class="say" style="margin-top:8px">${pt===6?"Tebrikler! Bütün adımlarda uzlaşmacı davrandın. Okulunun sorunu çözüldü.":"Müzakere bitti. Puanın "+pt+"/6. Baştan deneyip herkesin kazandığı yolu bulabilirsin."}</div>`});
  }
  function meter(){$("#mP",el).textContent=`Uzlaşma ölçer: ${"●".repeat(pt)}${"○".repeat(6-pt)} ${pt}/6`}
  $("#mN",el).onclick=()=>{r++;show()};$("#mR",el).onclick=()=>{r=0;pt=0;done=[];show()};show();
};

/* 3) Paralel-meridyen gezgini (şematik dünya haritası) */
W.koordinat=el=>{
  const K={"Kuzey Amerika":[[-165,65],[-140,70],[-95,75],[-65,62],[-55,50],[-80,30],[-81,25],[-97,18],[-80,8],[-105,20],[-118,33],[-125,45],[-135,57]],
    "Güney Amerika":[[-80,10],[-60,10],[-35,-6],[-40,-22],[-58,-38],[-68,-55],[-75,-45],[-71,-18],[-81,-5]],
    "Avrupa":[[-10,37],[-9,44],[-4,48],[5,52],[9,57],[5,62],[15,70],[30,71],[45,68],[60,68],[60,50],[50,46],[40,42],[29,41],[26,40],[23,36],[15,38],[10,44],[3,43],[-5,36]],
    "Afrika":[[-17,15],[-13,27],[-6,35],[10,37],[32,31],[34,28],[43,12],[51,12],[40,-15],[32,-28],[20,-35],[14,-23],[12,-5],[9,4],[-8,4]],
    "Asya":[[60,68],[100,77],[140,72],[180,68],[170,60],[140,52],[130,42],[122,30],[109,20],[105,9],[100,2],[96,16],[88,22],[78,8],[72,20],[57,24],[52,17],[43,12],[34,28],[36,36],[29,41],[40,42],[50,46],[60,50]],
    "Okyanusya":[[114,-22],[130,-12],[142,-11],[153,-27],[147,-39],[135,-35],[115,-34]],
    "Grönland":[[-55,60],[-22,70],[-30,83],[-70,80]]};
  const OK=[["Büyük Okyanus",-150,0],["Atlas Okyanusu",-35,25],["Hint Okyanusu",78,-25],["Güney Okyanusu",-20,-58],["Kuzey Buz Denizi",-10,80]];
  const KA=[["Kuzey Amerika",-100,48],["Güney Amerika",-60,-15],["Avrupa",15,52],["Afrika",20,8],["Asya",95,50],["Okyanusya",134,-25],["Antarktika",40,-76]];
  const X=b=>10+(b+180)/360*360,Y=e=>10+(90-e)/180*180;
  let e=39,b=35,lab=true;
  el.innerHTML=`<div class="svgbox"><svg id="kS" viewBox="0 0 380 200" role="img" aria-label="Paralel ve meridyenlerle şematik dünya haritası"></svg></div>
  <div class="ctrls"><label for="kE">Enlem <input type="range" id="kE" min="-80" max="80" value="39"></label><label for="kB">Boylam <input type="range" id="kB" min="-175" max="175" value="35"></label></div>
  <div class="ctrls"><button class="btn" id="kT">Türkiye'ye git</button><button class="btn ghost" id="kL">Adları gizle</button></div>
  <div class="readout" id="kR"></div><div class="say" id="kY"></div>`;
  const poly=p=>p.map(q=>X(q[0]).toFixed(1)+","+Y(q[1]).toFixed(1)).join(" ");
  function draw(){
    let s=`<rect x="10" y="10" width="360" height="180" fill="color-mix(in srgb,var(--disp) 14%,var(--paper))"/>`;
    for(let p=-60;p<=60;p+=30)s+=`<line x1="10" x2="370" y1="${Y(p)}" y2="${Y(p)}" stroke="${p===0?"var(--force)":"var(--muted)"}" stroke-width="${p===0?1.6:.6}" stroke-dasharray="${p===0?"":"3 3"}"/>`;
    for(let m=-150;m<=150;m+=30)s+=`<line y1="10" y2="190" x1="${X(m)}" x2="${X(m)}" stroke="${m===0?"var(--force)":"var(--muted)"}" stroke-width="${m===0?1.6:.6}" stroke-dasharray="${m===0?"":"3 3"}"/>`;
    Object.values(K).forEach(p=>s+=`<polygon points="${poly(p)}" fill="color-mix(in srgb,var(--ok) 45%,var(--paper))" stroke="var(--ok)" stroke-width=".8"/>`);
    s+=`<rect x="10" y="${Y(-65)}" width="360" height="${Y(-90)-Y(-65)}" fill="color-mix(in srgb,var(--ink) 8%,var(--paper))" stroke="var(--muted)" stroke-width=".6"/>`;
    s+=`<rect x="${X(26)}" y="${Y(42)}" width="${X(45)-X(26)}" height="${Y(36)-Y(42)}" fill="var(--force)" fill-opacity=".35" stroke="var(--force)" stroke-width="1.2"/>`;
    if(lab){KA.forEach(a=>s+=`<text x="${X(a[1])}" y="${Y(a[2])}" text-anchor="middle" font-size="8" font-weight="700" fill="var(--ink)" ${SFT}>${a[0]}</text>`);
      OK.forEach(a=>s+=`<text x="${X(a[1])}" y="${Y(a[2])}" text-anchor="middle" font-size="7.5" font-style="italic" fill="var(--disp)" ${SFT}>${a[0]}</text>`)}
    s+=`<text x="${X(0)+3}" y="18" font-size="7" fill="var(--force)" ${SFT}>Başlangıç meridyeni 0°</text><text x="14" y="${Y(0)-3}" font-size="7" fill="var(--force)" ${SFT}>Ekvator 0°</text>`;
    s+=`<line x1="${X(b)}" x2="${X(b)}" y1="10" y2="190" stroke="var(--acc)" stroke-width="1.4"/><line y1="${Y(e)}" y2="${Y(e)}" x1="10" x2="370" stroke="var(--acc)" stroke-width="1.4"/><circle cx="${X(b)}" cy="${Y(e)}" r="5" fill="var(--acc)" stroke="var(--paper)" stroke-width="1.5"/>`;
    $("#kS",el).innerHTML=s;
    const ey=e>0?"Kuzey":e<0?"Güney":"Ekvator üzeri",by=b>0?"Doğu":b<0?"Batı":"Başlangıç meridyeni",tr=e>=36&&e<=42&&b>=26&&b<=45;
    $("#kR",el).innerHTML=`<span class="pill accp">${Math.abs(e)}° ${e>0?"K":e<0?"G":""} enlemi</span><span class="pill accp">${Math.abs(b)}° ${b>0?"D":b<0?"B":""} boylamı</span><span class="pill ${tr?"okp":""}">${tr?"Türkiye'nin aralığında":"Türkiye dışında"}</span>`;
    $("#kY",el).innerHTML=`Nokta <b>${ey}${e?" Yarım Küre":""}</b> ve <b>${by}${b?" Yarım Küre":""}</b>'de. ${tr?"Türkiye 36°-42° kuzey paralelleri ile 26°-45° doğu meridyenleri arasındadır. Kırmızı alan bu aralığı gösterir.":"Kaydırıcıları oynatarak noktayı kırmızı alana (Türkiye) taşı."} <span style="color:var(--muted)">Harita şematiktir, gerçek ölçekte değildir.</span>`;
  }
  $("#kE",el).oninput=ev=>{e=+ev.target.value;draw()};$("#kB",el).oninput=ev=>{b=+ev.target.value;draw()};
  $("#kT",el).onclick=()=>{e=39;b=35;$("#kE",el).value=39;$("#kB",el).value=35;draw()};
  $("#kL",el).onclick=ev=>{lab=!lab;ev.target.textContent=lab?"Adları gizle":"Adları göster";draw()};draw();
};

/* 4) Doğal çevre → beşerî çevre: bölge kartları */
W.cevreBag=el=>{
  const B=[
    ["Karadeniz","Her mevsim yağışlı, dağlar kıyıya paralel, yamaçlar ormanlık.","Yamaçlarda çay ve fındık tarımı; dağınık köy yerleşmeleri, yayla evleri.","Yağış bol ama düz arazi az. Bu yüzden tarım eğimli yamaçlarda, evler de birbirinden uzak."],
    ["Akdeniz","Yazları sıcak-kuru, kışları ılık-yağışlı. Kıyıda maki bitki örtüsü.","Turunçgil, muz, seracılık ve deniz turizmi. Yaz aylarında nüfus artar.","Kışın don olmaması örtü altı tarıma, uzun ve güneşli yaz turizme imkân verir."],
    ["Ege","Dağlar kıyıya dik uzanır, ovalar denize açılır. İklim ılıman.","Zeytin, incir, üzüm, pamuk; limanlar ve ticaret. Kıyı kentleri kalabalık.","Denize dik dağlar deniz etkisini içerilere taşır; verimli ovalar tarımı ve ticareti geliştirir."],
    ["Marmara","İki kıtayı ve iki denizi bağlayan boğazlar. Ilıman iklim.","Sanayi, ticaret, ulaşım. Türkiye'nin en kalabalık bölgesi.","Kara ve deniz yollarının kesiştiği yer olması fabrikaları, limanları ve iş arayan insanları çeker."],
    ["İç Anadolu","Az yağış, kışları soğuk-yazları sıcak karasal iklim. Bozkır.","Buğday, arpa gibi tahıllar ve küçükbaş hayvancılık. Toplu köy yerleşmeleri.","Yağış az olduğu için orman yetişmez; az suyla yetişen tahıl tarımı ve meraya dayalı hayvancılık öne çıkar."],
    ["Doğu Anadolu","Yüksek ve dağlık, kışlar çok soğuk ve uzun. Yazın gür çayırlar.","Büyükbaş hayvancılık, yaylacılık. Nüfus seyrek.","Engebe ve soğuk tarımı zorlaştırır; yaz çayırları ise hayvancılık için idealdir."],
    ["Güneydoğu Anadolu","Yazları çok sıcak ve kuru, geniş düzlükler.","Barajlarla sulanan pamuk, mercimek, Antep fıstığı. GAP ile tarım ve sanayi gelişti.","Düz ve sıcak topraklar barajlarla sulanınca verimli tarım alanlarına dönüştü: İnsan doğal çevreyi değiştirdi."]];
  let k=0;
  el.innerHTML=`<div class="seg" id="cS">${B.map((x,i)=>`<button data-k="${i}" aria-pressed="${i===0}">${x[0]}</button>`).join("")}</div>
  <div class="chain" id="cC" style="margin-top:10px"></div><div class="say" id="cY"></div>`;
  function draw(){const x=B[k];
    $("#cC",el).innerHTML=`<div class="st"><b>Doğal çevre</b><span>${x[1]}</span></div><div class="ar">→</div><div class="st"><b>Beşerî çevre</b><span>${x[2]}</span></div>`;
    $("#cY",el).innerHTML=`<b>Neden?</b> ${x[3]}`;$$("#cS button",el).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===k))}
  $$("#cS button",el).forEach(b=>b.onclick=()=>{k=+b.dataset.k;draw()});draw();
};

/* 5) Türk dünyası iş birliği kartları */
W.turkDunya=el=>{
  const T=[
    ["Türk Devletleri Teşkilatı","Kuruluş: 2009, Nahçıvan Anlaşması (önceki adı Türk Keneşi; 2021'den beri bu adla).","Türk devletlerinin siyaset, ekonomi, eğitim ve kültür alanında birlikte çalışmasını sağlar. Üyeler: Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan."],
    ["TÜRKSOY","Türk Kültürü Uluslararası Teşkilatı, 1993.","Türk dünyasının ortak kültürünü, sanatını ve dilini korur ve tanıtır. Her yıl bir şehri “Türk Dünyası Kültür Başkenti” seçer."],
    ["TİKA","Türk İşbirliği ve Koordinasyon Ajansı, 1992.","Okul, hastane, su kuyusu, kütüphane gibi projelerle kardeş ülkelere destek olur; tarihî eserleri onarır."],
    ["Yunus Emre Enstitüsü","Türkiye'nin kültür kurumu, 2007.","Dünyanın birçok ülkesinde Türkçe kursları açar; Türk kültürünü, sanatını ve mutfağını tanıtır."],
    ["Dünya Göçebe Oyunları","İlki 2014'te Kırgızistan'da düzenlendi.","Atlı okçuluk, güreş, kökbörü gibi ata sporlarını yaşatır; Türk dünyasının gençlerini bir araya getirir."],
    ["Ortak değerler","Nevruz, Dede Korkut, Manas Destanı, Nasreddin Hoca, Yunus Emre.","Aynı bayramı kutlamak, aynı hikâyeleri anlatmak gönül bağını güçlendirir. Nasreddin Hoca'nın şehri Akşehir'de her yıl uluslararası şenlik yapılır."]];
  let k=0;
  el.innerHTML=`<div class="seg" id="tS">${T.map((x,i)=>`<button data-k="${i}" aria-pressed="${i===0}">${x[0]}</button>`).join("")}</div><div class="tlcard" id="tC" style="margin-top:10px"></div>`;
  function draw(){const x=T[k];$("#tC",el).innerHTML=`<span class="pill accp">${x[1]}</span><h3>${x[0]}</h3><p>${x[2]}</p>`;$$("#tS button",el).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===k))}
  $$("#tS button",el).forEach(b=>b.onclick=()=>{k=+b.dataset.k;draw()});draw();
};
