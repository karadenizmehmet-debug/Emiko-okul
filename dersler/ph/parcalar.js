/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== PEYGAMBERİMİZİN HAYATI · ETKİLEŞİMLİ PARÇALAR ====================== */
const PFT='font-family="Lexend"';

/* 1) Gençlik yılları zaman şeridi */
W.zaman=el=>{
  const E=[
    [571,0,"Doğum","Mekke'de dünyaya geldi. Babası Abdullah o doğmadan vefat etmişti. Bu yıla Fil Yılı denir."],
    [577,6,"Annesinin vefatı","Annesi Âmine, Medine dönüşü Ebva'da vefat etti. Dedesi Abdülmuttalib onu himayesine aldı."],
    [579,8,"Ebu Talib'in himayesi","Dedesinin vefatından sonra amcası Ebu Talib onu yanına aldı ve ömrünün sonuna kadar korudu."],
    [583,12,"İlk ticaret yolculuğu","Amcası Ebu Talib ile Şam'a giden ticaret kervanına katıldı. Gençliğinde çobanlık da yaptı."],
    [591,20,"Hilfülfudul","Haksızlığa uğrayanları korumak için kurulan Erdemliler Birliği'ne katıldı."],
    [595,25,"Hz. Hatice ile evlilik","Hz. Hatice'nin kervanını Şam'a götürüp dürüstlüğüyle güven kazandı; ardından evlendiler."],
    [605,35,"Kâbe hakemliği","Hacerülesved anlaşmazlığını herkesi memnun eden adil bir çözümle bitirdi."],
    [610,40,"İlk vahiy","Hira Mağarası'nda Cebrail aracılığıyla ilk ayetler geldi; peygamberlik başladı."]];
  let cur=0;
  el.innerHTML=`<div class="svgbox"><svg id="zS" viewBox="0 0 380 120" role="img" aria-label="571-610 yılları arasındaki olaylar"></svg></div><div class="tlcard" id="zC"></div>
  <div class="ctrls"><button class="btn ghost" id="zP">← Önceki</button><button class="btn" id="zN">Sonraki →</button></div>`;
  const X=y=>22+(y-571)/(610-571)*336;
  function draw(){
    let s=gridBg(380,120)+`<line x1="22" y1="60" x2="358" y2="60" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>`;
    E.forEach((e,k)=>{const x=X(e[0]),on=k===cur,up=k%2===0;
      s+=`<g data-k="${k}" style="cursor:pointer"><circle cx="${x}" cy="60" r="${on?10:7}" fill="${on?"var(--acc)":"var(--surface)"}" stroke="var(--acc)" stroke-width="3"/>
      <text x="${x}" y="${up?36:94}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)" font-family="JetBrains Mono">${e[0]}</text>
      <text x="${x}" y="${up?22:108}" text-anchor="middle" font-size="9.5" fill="var(--muted)" ${PFT}>${e[1]} yaş</text></g>`});
    $("#zS",el).innerHTML=s;
    $$("#zS g",el).forEach(g=>g.onclick=()=>{cur=+g.dataset.k;draw()});
    const e=E[cur];$("#zC",el).innerHTML=`<span class="pill accp">${e[0]}${e[0]===591?" civarı":""} · ${e[1]} yaşında</span><h3>${e[2]}</h3><p>${e[3]}</p>`;
    $("#zP",el).disabled=cur===0;$("#zN",el).disabled=cur===E.length-1;
  }
  $("#zP",el).onclick=()=>{cur=Math.max(0,cur-1);draw()};$("#zN",el).onclick=()=>{cur=Math.min(E.length-1,cur+1);draw()};draw();
};

/* 2) Kâbe hakemliği: çözüm seçme */
W.hakem=el=>{
  const O=[
    ["Kura çekilsin, çıkan kabile taşı koysun.","Kura şansa dayanır. Kazanamayan kabileler yine kırgın kalır, bu şeref bir kabileye kalırdı."],
    ["En güçlü ve en kalabalık kabile koysun.","Güç haklılık değildir. Bu, Cahiliye'nin “güçlü olan haklıdır” anlayışıdır; kavgayı büyütürdü."],
    ["Taş bir örtüye konsun, bütün kabile reisleri örtüyü birlikte taşısın.","İşte Peygamberimizin çözümü! Her kabile şerefe ortak oldu, kimse dışlanmadı, kan dökülmedi."],
    ["Taş şimdilik konmasın, anlaşmazlık zamanla unutulsun.","Sorun çözülmez, ertelenir. Kâbe'nin onarımı da yarım kalırdı."]];
  const C=["var(--bad)","var(--disp)","var(--ok)","var(--know)"];
  el.innerHTML=`<p style="font-size:.95rem">Kabile reisleri sana döndü ve “Kararın ne?” diye soruyor. Bir çözüm seç:</p><div class="opts" id="hO">${O.map((o,k)=>`<button class="opt" data-k="${k}"><span class="L">${"ABCD"[k]})</span><span>${o[0]}</span></button>`).join("")}</div>
  <div id="hF"></div><div class="svgbox" id="hB" hidden><svg id="hS" viewBox="0 0 380 210" role="img" aria-label="Taşın örtü üzerinde taşınması"></svg></div><div class="ctrls" id="hC" hidden><button class="btn" id="hG">Taşı birlikte taşıyın</button><button class="btn ghost" id="hR">Baştan</button></div>`;
  let step=0;
  function scene(t){
    let s=gridBg(380,210);
    s+=`<rect x="250" y="20" width="110" height="150" fill="var(--ink)" fill-opacity=".85" rx="2"/><rect x="250" y="70" width="110" height="10" fill="#c9a24a"/><text x="305" y="190" text-anchor="middle" font-size="11" fill="var(--muted)" ${PFT}>Kâbe duvarı</text>`;
    s+=`<rect x="248" y="118" width="18" height="18" rx="4" fill="none" stroke="#c9a24a" stroke-dasharray="3 2"/>`;
    const lift=Math.min(t,1),cx=110+lift*90,cy=150-lift*24;
    if(t<2){s+=`<path d="M${cx-60},${cy} Q${cx},${cy+16} ${cx+60},${cy}" fill="none" stroke="var(--amber)" stroke-width="6"/>`;
      [[-60,0],[60,0],[-38,10],[38,10]].forEach((p,k)=>{s+=`<circle cx="${cx+p[0]}" cy="${cy+p[1]}" r="9" fill="${C[k]}"/><text x="${cx+p[0]}" y="${cy+p[1]+26}" text-anchor="middle" font-size="9.5" fill="var(--ink)" ${PFT}>${k+1}. reis</text>`});
      s+=`<ellipse cx="${cx}" cy="${cy+4}" rx="12" ry="9" fill="#1f1f24"/>`}
    else s+=`<ellipse cx="257" cy="127" rx="9" ry="8" fill="#1f1f24"/><text x="190" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ok)" ${PFT}>Taş yerinde, herkes memnun!</text>`;
    s+=`<text x="12" y="20" font-size="11" fill="var(--muted)" ${PFT}>Siyah taş: Hacerülesved</text>`;
    $("#hS",el).innerHTML=s;
  }
  $$("#hO .opt",el).forEach(b=>b.onclick=()=>{const k=+b.dataset.k;$$("#hO .opt",el).forEach(x=>x.classList.remove("right","wrong"));b.classList.add(k===2?"right":"wrong");
    $("#hF",el).innerHTML=`<div class="fb ${k===2?"ok":"no"}"><b>${k===2?"Harika seçim!":"Bir daha düşün."}</b>${O[k][1]}</div>`;
    if(k===2){$("#hB",el).hidden=false;$("#hC",el).hidden=false;step=0;scene(0)}});
  let raf=null;
  $("#hG",el).onclick=()=>{cancelAnimationFrame(raf);const st=performance.now();const f=t=>{const p=(t-st)/1600;scene(p<1?p:p<1.4?1:2);if(p<1.4)raf=requestAnimationFrame(f)};if(RM)scene(2);else raf=requestAnimationFrame(f)};
  $("#hR",el).onclick=()=>{cancelAnimationFrame(raf);scene(0)};
  anims.push({stop:()=>cancelAnimationFrame(raf)});
};

/* 3) Mekke ve çevresi haritası (şematik) */
W.harita=el=>{
  const P=[
    ["Mekke",205,212,"Peygamberimizin doğduğu ve gençliğini geçirdiği şehir. Kâbe buradadır. Hilfülfudul ve Kâbe hakemliği burada yaşandı.","var(--acc)"],
    ["Hira (Nur Dağı)",226,196,"Mekke'ye yaklaşık 5 km uzaklıktaki Nur Dağı'nda küçük bir mağara. Peygamberimiz burada tefekkür etti, ilk vahiy burada geldi.","var(--ok)"],
    ["Sevr Mağarası",196,232,"Hicret sırasında Peygamberimiz ile Hz. Ebu Bekir'in üç gün saklandığı mağara.","var(--muted)"],
    ["Taif",262,226,"Peygamberimizin İslam'ı anlatmak için gittiği, taşlandığı ama beddua etmediği şehir.","var(--muted)"],
    ["Medine",210,96,"Eski adı Yesrib. 622'deki hicretten sonra Peygamberimizin şehri oldu; vefatına kadar burada yaşadı.","var(--disp)"],
    ["Bedir",160,128,"624'te ilk büyük savaşın yapıldığı yer.","var(--muted)"],
    ["Uhud",218,78,"Medine'nin kuzeyindeki dağ. 625'te Uhud Savaşı burada yapıldı.","var(--muted)"]];
  let cur=0;
  el.innerHTML=`<div class="svgbox"><svg id="mS" viewBox="0 0 380 290" role="img" aria-label="Mekke, Medine ve çevresinin şematik haritası"></svg></div><div class="say" id="mY"></div>
  <p style="font-size:.8rem;color:var(--muted)">Şematik haritadır; uzaklıklar ölçekli değildir. Mekke ile Medine arası yaklaşık 400 km'dir.</p>`;
  function draw(){
    let s=`<rect width="380" height="290" fill="var(--paper)"/><path d="M0,0 L118,0 Q100,90 80,150 Q60,220 30,290 L0,290 Z" fill="var(--disp)" fill-opacity=".18"/>`;
    s+=`<text x="40" y="150" font-size="12" fill="var(--disp)" transform="rotate(-70 40 150)" ${PFT}>Kızıldeniz</text>`;
    s+=`<text x="300" y="150" font-size="12" fill="var(--muted)" ${PFT}>Arap Yarımadası</text>`;
    s+=`<path d="M210,96 Q200,150 205,212" fill="none" stroke="var(--acc)" stroke-width="2" stroke-dasharray="5 4"/><text x="214" y="155" font-size="9.5" fill="var(--acc)" ${PFT}>hicret yolu (622)</text>`;
    s+=`<text x="200" y="16" font-size="10.5" fill="var(--muted)" ${PFT}>↑ Şam (ticaret yolu)</text><text x="250" y="284" font-size="10.5" fill="var(--muted)" ${PFT}>↓ Yemen</text><text x="6" y="276" font-size="10.5" fill="var(--muted)" ${PFT}>← Habeşistan</text>`;
    P.forEach((p,k)=>{const on=k===cur;s+=`<g data-k="${k}" style="cursor:pointer"><circle cx="${p[1]}" cy="${p[2]}" r="${on?9:6}" fill="${p[4]}" stroke="var(--surface)" stroke-width="2"/><text x="${p[1]+12}" y="${p[2]+4}" font-size="${on?12:10.5}" font-weight="${on?700:400}" fill="var(--ink)" ${PFT}>${p[0]}</text></g>`});
    $("#mS",el).innerHTML=s;$$("#mS g",el).forEach(g=>g.onclick=()=>{cur=+g.dataset.k;draw()});
    $("#mY",el).innerHTML=`<b>${P[cur][0]}:</b> ${P[cur][3]}`;
  }
  draw();
};

/* 4) Kavram kartları */
W.kartlar=el=>{
  const K=[["Emin","Güvenilir. Mekkelilerin Peygamberimize gençliğinde verdiği lakap."],["Hilfülfudul","Erdemliler Birliği. Haksızlığa uğrayanların hakkını korumak için kurulan birlik."],["Tefekkür","Derin düşünme, fikir yürütme, kavramaya çalışma."],["Risalet","Peygamberlik, elçilik görevi."],["Vahiy","Allah'ın peygamberlerine bildirdiği mesajlar."],["Hacerülesved","Kâbe'nin doğu köşesindeki siyah taş; tavaf burada başlar."],["Cahiliye","İslam'dan önceki, haksızlık ve kötülüklerin yaygın olduğu dönem."],["Hira","Nur Dağı'ndaki mağara; ilk vahyin geldiği yer."]];
  el.innerHTML=`<p style="font-size:.92rem;color:var(--muted)">Karta dokun, arkasını çevir. Önce anlamını kendin söylemeye çalış!</p><div class="flips">${K.map((k,i)=>`<button class="flip" data-i="${i}" aria-pressed="false"><span class="fr">${k[0]}</span><span class="bk">${k[1]}</span></button>`).join("")}</div><div class="readout"><span class="pill accp" id="kS">Çevrilen: 0 / ${K.length}</span></div>`;
  const seen=new Set();
  $$(".flip",el).forEach(b=>b.onclick=()=>{const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);if(on)seen.add(b.dataset.i);$("#kS",el).textContent=`Çevrilen: ${seen.size} / ${K.length}`});
};

/* 5) Risaletten vefata olaylar şeridi */
W.kronoloji=el=>{
  const E=[
    [610,"İlk vahiy","Hira'da Alak Suresi'nin ilk ayetleri indi. Önce yakınlarına, üç yıl sonra açıkça herkese İslam'ı anlattı."],
    [615,"Habeşistan'a hicret","Baskılardan kurtulmak için bir grup Müslüman, adaletli kralın ülkesi Habeşistan'a göç etti."],
    [616,"Boykot başladı","Müşrikler Müslümanlarla ve Haşimoğullarıyla alışverişi ve evlenmeyi yasakladı. Boykot yaklaşık üç yıl sürdü."],
    [619,"Hüzün Yılı","Ebu Talib ve Hz. Hatice vefat etti (bazı kaynaklarda 620). Ardından Taif yolculuğu yapıldı."],
    [621,"Akabe Biatları","Medineliler Akabe'de iman edip söz verdi. Ertesi yıl daha kalabalık bir grupla ikinci biat yapıldı."],
    [622,"Hicret","Hz. Ebu Bekir ile Medine'ye göç. Hicri takvimin başlangıcıdır."],
    [624,"Bedir Savaşı","Müslümanlar sayıca az olmalarına rağmen kazandı."],
    [625,"Uhud Savaşı","Okçuların yerlerini terk etmesi yüzünden kayıp verildi."],
    [627,"Hendek Savaşı","Medine'nin çevresine hendek kazılarak şehir savunuldu."],
    [628,"Hudeybiye Antlaşması","On yıllık barış antlaşması; İslam'ın yayılmasını hızlandırdı."],
    [630,"Mekke'nin fethi","Kan dökülmeden fetih; Kâbe putlardan temizlendi, genel af ilan edildi."],
    [632,"Veda Haccı ve vefat","Veda Hutbesi'ni okudu; aynı yıl 63 yaşında Medine'de vefat etti."]];
  let cur=0;
  el.innerHTML=`<div class="svgbox"><svg id="kR" viewBox="0 0 380 110" role="img" aria-label="610-632 arasındaki olaylar"></svg></div><div class="tlcard" id="kC"></div>
  <div class="ctrls"><button class="btn ghost" id="kP">← Önceki</button><button class="btn" id="kN">Sonraki →</button></div>`;
  const X=y=>20+(y-610)/22*340;
  function draw(){
    let s=gridBg(380,110);
    s+=`<rect x="${X(610)}" y="48" width="${X(622)-X(610)}" height="14" fill="var(--amber)" fill-opacity=".35"/><rect x="${X(622)}" y="48" width="${X(632)-X(622)}" height="14" fill="var(--teal)" fill-opacity=".35"/>`;
    s+=`<text x="${(X(610)+X(622))/2}" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="var(--amber)" ${PFT}>MEKKE DÖNEMİ</text><text x="${(X(622)+X(632))/2}" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="var(--teal)" ${PFT}>MEDİNE DÖNEMİ</text>`;
    E.forEach((e,k)=>{const x=X(e[0]),on=k===cur;s+=`<g data-k="${k}" style="cursor:pointer"><circle cx="${x}" cy="55" r="${on?9:5.5}" fill="${on?"var(--ink)":"var(--surface)"}" stroke="var(--ink)" stroke-width="2"/>${on||k%3===0?`<text x="${x}" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)" font-family="JetBrains Mono">${e[0]}</text>`:""}</g>`});
    $("#kR",el).innerHTML=s;$$("#kR g",el).forEach(g=>g.onclick=()=>{cur=+g.dataset.k;draw()});
    const e=E[cur];$("#kC",el).innerHTML=`<span class="pill ${e[0]<622?"accp":"okp"}">${e[0]} · ${e[0]<622?"Mekke dönemi":"Medine dönemi"}</span><h3>${e[1]}</h3><p>${e[2]}</p>`;
    $("#kP",el).disabled=cur===0;$("#kN",el).disabled=cur===E.length-1;
  }
  $("#kP",el).onclick=()=>{cur=Math.max(0,cur-1);draw()};$("#kN",el).onclick=()=>{cur=Math.min(E.length-1,cur+1);draw()};draw();
};
