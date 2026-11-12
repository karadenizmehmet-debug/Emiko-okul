/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== DİN KÜLTÜRÜ VE AHLAK BİLGİSİ · ETKİLEŞİMLİ PARÇALAR ====================== */
const DFT='font-family="Lexend"';

/* 1) Vahyin geliş yolları: üç yolu tıkla, örneğini gör */
W.dinVahiyYol=el=>{
  const Y=[
    ["Sadık rüya","var(--amber)","Peygambere uykuda gösterilen, aynen gerçekleşen doğru rüyadır. Peygamberlerin rüyası da vahiydir.",
     "Hz. İbrahim, oğlu İsmail'i kurban ettiğini rüyasında gördü ve bunu Allah'ın emri olarak anladı (Saffat suresi, 102). Peygamberimize de ilk vahiyden önce altı ay kadar sadık rüyalar geldi."],
    ["Melek aracılığıyla","var(--ok)","En çok görülen yoldur. Vahiy meleği Cebrail, Allah'ın mesajını peygambere getirir.",
     "Cebrail bazen insan kılığında (sahabeden Dıhye'ye benzeyerek), bazen kendi asıl görünüşüyle geldi. Vahiy bazen çan sesine benzer bir sesle geldi. Kur'an'ın tamamı Cebrail aracılığıyla indi."],
    ["Perde arkasından","var(--know)","Allah'ın, peygamberiyle melek aracı olmadan, onun göremeyeceği biçimde konuşmasıdır.",
     "Hz. Musa, Tur Dağı'nda Allah'ın hitabını işitti. Bu yüzden ona “Kelîmullah” (Allah'ın konuştuğu kişi) denir. Peygamberimiz de Miraç'ta bu şekilde vahiy aldı."]];
  let cur=0;
  el.innerHTML=`<div class="svgbox"><svg id="vyS" viewBox="0 0 380 150" role="img" aria-label="Vahyin üç geliş yolu"></svg></div><div class="tlcard" id="vyC"></div>
  <p style="font-size:.85rem;color:var(--muted);margin:.4rem 0 0">Bir yola dokun. Üç yolda da kaynak Allah, alıcı peygamberdir.</p>`;
  function draw(){
    let s=gridBg(380,150);
    s+=`<rect x="140" y="8" width="100" height="28" rx="14" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="190" y="27" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)" ${DFT}>Allah</text>`;
    s+=`<rect x="130" y="114" width="120" height="28" rx="14" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="190" y="133" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)" ${DFT}>Peygamber</text>`;
    Y.forEach((y,k)=>{const x=[60,190,320][k],on=k===cur;
      s+=`<g data-k="${k}" style="cursor:pointer"><path d="M190 36 Q${x} 50 ${x} 62 M${x} 92 Q${x} 104 190 114" fill="none" stroke="${y[1]}" stroke-width="${on?4:2}" stroke-dasharray="${on?"0":"5 4"}"/>
      <rect x="${x-56}" y="62" width="112" height="30" rx="8" fill="${on?y[1]:"var(--surface)"}" stroke="${y[1]}" stroke-width="2.5"/>
      <text x="${x}" y="81" text-anchor="middle" font-size="11" font-weight="700" fill="${on?"#fff":"var(--ink)"}" ${DFT}>${y[0]}</text></g>`});
    $("#vyS",el).innerHTML=s;
    $$("#vyS g",el).forEach(g=>g.onclick=()=>{cur=+g.dataset.k;draw()});
    const y=Y[cur];$("#vyC",el).innerHTML=`<span class="pill accp">${cur+1}. yol</span><h3>${y[0]}</h3><p>${y[2]}</p><p><b>Örnek:</b> ${y[3]}</p>`;
  }
  draw();
};

/* 2) Vahyin amacı mı? Kartı doğru kutuya ayır */
W.dinAmac=el=>{
  const K=[
    ["İnsanlara Allah'ı tanıtmak ve O'nun bir olduğunu bildirmek",1],
    ["Doğruyu yanlıştan, iyiyi kötüden ayırmayı öğretmek",1],
    ["İnsanların dünyada ve ahirette mutlu olmasını sağlamak",1],
    ["Adaleti ayakta tutmak, hakları korumak",1],
    ["Aklın tek başına bilemeyeceği ahiret, melek gibi konuları bildirmek",1],
    ["Peygamberleri zengin ve güçlü yapmak",0],
    ["İnsanların düşünmesini ve akıl yürütmesini yasaklamak",0],
    ["Yalnızca bir kavmi diğerlerinden üstün tutmak",0]];
  const sira=K.map((_,i)=>i).sort(()=>Math.random()-.5);let i=0,dogru=0;
  function draw(){
    if(i>=sira.length){el.innerHTML=`<div class="fb ok"><b>${dogru} / ${K.length} doğru!</b> Vahiy insanı doğru yola iletmek, Allah'ı tanıtmak ve iki dünya mutluluğu için gönderildi.</div><div class="ctrls"><button class="btn" id="daR">Yeniden oyna</button></div>`;
      $("#daR",el).onclick=()=>{i=0;dogru=0;sira.sort(()=>Math.random()-.5);draw()};return}
    const k=K[sira[i]];
    el.innerHTML=`<div class="qno">Kart ${i+1} / ${K.length}</div><div class="case"><h3>${k[0]}</h3></div>
    <div class="ctrls"><button class="btn" data-v="1">Vahyin amacıdır</button><button class="btn ghost" data-v="0">Vahyin amacı değildir</button></div><div id="daF"></div>`;
    $$(".ctrls .btn",el).forEach(b=>b.onclick=()=>{const ok=+b.dataset.v===k[1];if(ok)dogru++;
      $("#daF",el).innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"Doğru!":"Tekrar düşün."}</b>${k[1]?"Bu, vahyin gönderiliş amaçlarından biridir.":"Vahiy böyle bir amaçla gönderilmedi. Vahiy herkesi eşit görür, aklı çalıştırmaya çağırır."}</div><div class="ctrls"><button class="btn" id="daN">Sonraki →</button></div>`;
      $$(".ctrls .btn[data-v]",el).forEach(x=>x.disabled=true);$("#daN",el).onclick=()=>{i++;draw()}});
  }
  draw();
};

/* 3) İlahi kitaplar kitaplığı: rafta bir kitaba dokun */
W.dinKitap=el=>{
  const B=[
    ["Tevrat","Hz. Musa","İbranice","var(--d-din)","“Kanun, şeriat” anlamına gelir. İnanç, ibadet ve günlük hayatla ilgili hükümler içerir. On Emir onun temel öğütleridir."],
    ["Zebur","Hz. Davud","İbranice","var(--amber)","Çoğunlukla dua, öğüt ve Allah'ı övme (ilahi) içerir. Hz. Davud onu güzel sesiyle okurdu."],
    ["İncil","Hz. İsa","Aramice (Süryanice)","var(--know)","“Müjde” anlamına gelir. Allah'ın birliğini, sevgiyi, merhameti ve güzel ahlakı öğütler."],
    ["Kur'an-ı Kerim","Hz. Muhammed","Arapça","var(--acc)","“Okunan” anlamına gelir. Son ilahi kitaptır. 23 yılda indi, tüm insanlığa gönderildi ve Allah'ın korumasıyla hiç değişmedi."]];
  let cur=3;
  el.innerHTML=`<div class="svgbox"><svg id="dkS" viewBox="0 0 380 150" role="img" aria-label="Dört büyük ilahi kitap rafı"></svg></div><div class="tlcard" id="dkC"></div>`;
  function draw(){
    let s=gridBg(380,150)+`<rect x="20" y="128" width="340" height="10" rx="3" fill="#8a6a2f"/>`;
    B.forEach((b,k)=>{const x=40+k*82,on=k===cur,h=on?104:92;
      s+=`<g data-k="${k}" style="cursor:pointer"><rect x="${x}" y="${128-h}" width="62" height="${h}" rx="5" fill="${b[3]}" fill-opacity="${on?1:.75}" stroke="var(--ink)" stroke-width="${on?3:1.5}"/>
      <rect x="${x+8}" y="${128-h+14}" width="46" height="4" fill="#fff" fill-opacity=".7"/><rect x="${x+8}" y="${128-18}" width="46" height="4" fill="#fff" fill-opacity=".7"/>
      <text x="${x+31}" y="${128-h/2+4}" text-anchor="middle" font-size="${k===3?10.5:12}" font-weight="700" fill="#fff" ${DFT}>${k===3?"Kur'an":b[0]}</text></g>`});
    $("#dkS",el).innerHTML=s;
    $$("#dkS g",el).forEach(g=>g.onclick=()=>{cur=+g.dataset.k;draw()});
    const b=B[cur];$("#dkC",el).innerHTML=`<span class="pill accp">${b[1]} · ${b[2]}</span><h3>${b[0]}</h3><p>${b[4]}</p>`;
  }
  draw();
};

/* 4) Felak suresi: ayet ayet oku, anlamını ve mesajını aç */
W.dinFelak=el=>{
  const A=[
    ["Kul e'ûzü bi rabbil felak.","De ki: Sabahın Rabbine sığınırım,","Karanlığı yarıp sabahı getiren Allah, her türlü kötülüğü de yok edebilir. Sığınılacak tek güç O'dur."],
    ["Min şerri mâ halak.","Yarattığı şeylerin kötülüğünden,","Yaratılmış her şeyin zarar verebilecek yönünden Allah'a sığınırız: hastalık, kaza, zararlı hayvanlar, kötü insanlar."],
    ["Ve min şerri ğâsikın izâ vekab.","Karanlığı çöktüğü zaman gecenin kötülüğünden,","Gece karanlığında tehlikeler artar, korku büyür. Allah'a sığınan kalp güven bulur."],
    ["Ve min şerrin neffâsâti fil'ukad.","Düğümlere üfleyenlerin kötülüğünden,","Büyü yapanların ve insanların arasını bozmaya çalışanların kötülüğünden korunmayı isteriz."],
    ["Ve min şerri hâsidin izâ hased.","Ve haset ettiği zaman hasetçinin kötülüğünden.","Haset: başkasındaki nimetin yok olmasını istemektir. Hasetçinin zararından korunur, kendimiz de haset etmeyiz."]];
  let cur=0,acik=false;
  el.innerHTML=`<div class="tlcard" id="dfC"></div><div class="ctrls"><button class="btn ghost" id="dfP">← Önceki</button><button class="btn" id="dfA">Anlamını aç</button><button class="btn" id="dfN">Sonraki →</button></div>`;
  function draw(){
    const a=A[cur];
    $("#dfC",el).innerHTML=`<span class="pill accp">${cur+1}. ayet</span><h3>${a[0]}</h3>${acik?`<p><b>Anlamı:</b> ${a[1]}</p><p><b>Bize ne öğretir?</b> ${a[2]}</p>`:`<p style="color:var(--muted)">Önce ayeti sesli oku, anlamını tahmin et, sonra “Anlamını aç” düğmesine bas.</p>`}`;
    $("#dfA",el).textContent=acik?"Anlamını gizle":"Anlamını aç";
    $("#dfP",el).disabled=cur===0;$("#dfN",el).disabled=cur===A.length-1;
  }
  $("#dfA",el).onclick=()=>{acik=!acik;draw()};
  $("#dfP",el).onclick=()=>{cur=Math.max(0,cur-1);acik=false;draw()};
  $("#dfN",el).onclick=()=>{cur=Math.min(A.length-1,cur+1);acik=false;draw()};
  draw();
};
