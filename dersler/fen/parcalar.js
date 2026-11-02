/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* Fen Bilimleri · etkileşimli parçalar */
const PL=[
{n:"Merkür",r:7,c:"#9b8f84",tur:"Karasal",h:"Yok",u:"Yok",b:8,f:"Bir yılı yalnızca yaklaşık 88 gün sürer; Güneş'in etrafındaki turunu en çabuk tamamlayan gezegendir.",l:"Gündüzleri kavurucu sıcak, geceleri dondurucu soğuktur; çünkü ısıyı tutacak bir atmosferi yok denecek kadar azdır."},
{n:"Venüs",r:10,c:"#d9b45f",tur:"Karasal",h:"Yok",u:"Yok",b:6,f:"En sıcak gezegendir. Kalın atmosferi ısıyı hapseder.",l:"Akşamları batıda gördüğümüz çok parlak “Çoban Yıldızı” aslında Venüs'tür."},
{n:"Dünya",r:10.5,c:"#3f86c9",tur:"Karasal",h:"Yok",u:"Var",b:5,f:"Bildiğimiz kadarıyla canlı yaşamı olan tek gezegendir; yüzeyinde sıvı su bulunur.",l:"Uydumuz Ay, geceleri yolumuzu aydınlatan Güneş ışığını yansıtır."},
{n:"Mars",r:8,c:"#c4562f",tur:"Karasal",h:"Yok",u:"Var",b:7,f:"Yüzeyindeki demir oksit (pas) yüzünden kızıl görünür; “Kızıl Gezegen” denir.",l:"Yağmurda kalan bisiklet zincirinin paslanıp kızarması gibi."},
{n:"Jüpiter",r:26,c:"#c99a6d",tur:"Gazsal",h:"Var (soluk)",u:"Var",b:1,f:"Öyle büyüktür ki içine 1300'den fazla Dünya sığabilir.",l:"Üzerindeki Büyük Kırmızı Leke, yüzyıllardır süren dev bir fırtınadır."},
{n:"Satürn",r:22,c:"#dcc184",tur:"Gazsal",h:"Var (en belirgin)",u:"Var",b:2,f:"Halkaları buz ve kaya parçalarından oluşur.",l:"Yoğunluğu çok düşüktür; dev bir küvet olsa suda yüzebilirdi."},
{n:"Uranüs",r:15,c:"#7fc8cf",tur:"Gazsal",h:"Var",u:"Var",b:3,f:"Yan yatmış hâlde döner; yuvarlanan bir top gibi.",l:"Rengini atmosferindeki metan gazı verir."},
{n:"Neptün",r:14.5,c:"#4a6fd1",tur:"Gazsal",h:"Var",u:"Var",b:4,f:"Güneş'e en uzak gezegendir; Güneş sisteminin en şiddetli rüzgârları burada eser.",l:"Güneş'ten o kadar uzaktır ki bir turunu yaklaşık 165 Dünya yılında tamamlar."}
];
W.planets=el=>{
  let cur=2;
  el.innerHTML=`<div class="planets" role="group" aria-label="Gezegenler">${PL.map((p,k)=>`<button data-k="${k}" aria-pressed="${k===cur}"><svg width="${Math.max(30,p.r*2+12)}" height="62" viewBox="0 0 ${Math.max(30,p.r*2+12)} 62"><circle cx="${Math.max(30,p.r*2+12)/2}" cy="31" r="${p.r}" fill="${p.c}"/>${p.n==="Satürn"?`<ellipse cx="${(p.r*2+12)/2}" cy="31" rx="${p.r+5}" ry="5" fill="none" stroke="${p.c}" stroke-width="2.5"/>`:""}</svg><span>${p.n}</span></button>`).join("")}</div>
  <div id="pc"></div><p style="font-size:.8rem;color:var(--muted)">Gezegenler gerçek ölçekte değildir; büyüklükler fikir vermesi için yaklaşık çizilmiştir. Asteroit kuşağı Mars ile Jüpiter arasındadır.</p>`;
  function card(){const p=PL[cur];$("#pc",el).innerHTML=`<h3 style="font-size:1.4rem;margin-bottom:8px">${p.n}</h3><div class="pcard">
  <div class="f"><small>Güneş'e yakınlık</small>${cur+1}. sırada</div><div class="f"><small>Yapı</small>${p.tur}</div><div class="f"><small>Halka</small>${p.h}</div><div class="f"><small>Uydu</small>${p.u}</div><div class="f"><small>Büyüklük sırası</small>${p.b}. (büyükten küçüğe)</div></div>
  <p style="margin-top:10px"><b>Bilgi:</b> ${p.f}</p><p><b>Günlük hayattan:</b> ${p.l}</p>`;
  $$(".planets button",el).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===cur))}
  $$(".planets button",el).forEach(b=>b.onclick=()=>{cur=+b.dataset.k;card()});card();
};

W.eclipse=el=>{
  el.innerHTML=`<div class="svgbox"><svg viewBox="0 0 380 230" id="ecl" role="img" aria-label="Güneş, Dünya ve Ay'ın yukarıdan görünümü"></svg></div>
  <div class="ctrls"><label for="eA">Ay'ın konumu <input type="range" id="eA" min="0" max="359" value="120"></label>
  <span class="seg"><button id="eS">Güneş tutulması konumu</button><button id="eL">Ay tutulması konumu</button><button id="eT" aria-pressed="false">Ay'ın yörüngesi eğik</button></span></div>
  <div class="readout" id="eR"></div><div class="say" id="eSay"></div>`;
  const svg=$("#ecl",el),A=$("#eA",el);let tilt=false;
  function draw(){
    const th=+A.value*Math.PI/180,ex=230,ey=115,R=72;
    const mx=ex+R*Math.cos(th),my=ey+R*Math.sin(th)+(tilt?-14*Math.cos(th)*0+(-14):0);
    const deg=+A.value;const dS=Math.min(Math.abs(deg-180),360-Math.abs(deg-180)),dL=Math.min(deg,360-deg);
    const solar=dS<9&&!tilt,lunar=dL<9&&!tilt;
    let s=gridBg(380,230);
    // güneş ışınları
    s+=`<defs><radialGradient id="sg"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#f08a24"/></radialGradient></defs>`;
    for(let k=-3;k<=3;k++)s+=`<line x1="58" y1="${115+k*14}" x2="380" y2="${115+k*14}" stroke="var(--amber)" stroke-opacity=".18" stroke-width="2" stroke-dasharray="6 6"/>`;
    s+=`<circle cx="30" cy="115" r="40" fill="url(#sg)"/><text x="30" y="178" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="Lexend">Güneş</text>`;
    // dünya gölgesi
    s+=`<path d="M${ex},${ey-15} L380,${ey-6} L380,${ey+6} L${ex},${ey+15} Z" fill="var(--ink)" fill-opacity=".22"/>`;
    s+=`<circle cx="${ex}" cy="${ey}" r="${R}" fill="none" stroke="var(--muted)" stroke-dasharray="3 5"/>`;
    // ay gölgesi
    if(dS<40){const tx=ex,ty=my;s+=`<path d="M${mx},${my-6} L${ex-12},${ty-1} L${ex-12},${ty+1} L${mx},${my+6} Z" fill="var(--ink)" fill-opacity="${solar?.55:.2}"/>`}
    s+=`<circle cx="${ex}" cy="${ey}" r="15" fill="#3f86c9"/><path d="M${ex},${ey-15} A15,15 0 0,1 ${ex},${ey+15} Z" fill="#0b1830" fill-opacity=".55"/>`;
    s+=`<text x="${ex}" y="${ey+34}" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="Lexend">Dünya</text>`;
    s+=`<circle cx="${mx}" cy="${my}" r="7" fill="${lunar?"#b24a2a":"#c9ccd3"}" stroke="var(--ink)" stroke-width="1"/><text x="${mx}" y="${my-12}" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="Lexend">Ay</text>`;
    if(tilt)s+=`<text x="372" y="222" text-anchor="end" font-size="10.5" fill="var(--muted)" font-family="Lexend">Ay, Dünya'nın yörünge düzleminin biraz üstünden geçiyor</text>`;
    svg.innerHTML=s;
    let phase=dS<12?"Yeni ay":dL<12?"Dolunay":(Math.abs(deg-90)<25||Math.abs(deg-270)<25)?"Dördün":"Hilal / şişkin ay";
    $("#eR",el).innerHTML=`<span class="pill">Ay evresi: ${phase}</span>`+(solar?`<span class="pill badp">Güneş tutulması!</span>`:lunar?`<span class="pill badp">Ay tutulması!</span>`:`<span class="pill okp">Tutulma yok</span>`);
    $("#eSay",el).innerHTML=solar?"Sıra <b>Güneş – Ay – Dünya</b>. Ay'ın gölgesi Dünya'nın küçük bir bölgesine düşüyor. Orada gündüz vakti gökyüzü kararıyor.":lunar?"Sıra <b>Güneş – Dünya – Ay</b>. Ay, Dünya'nın gölgesinin içine girdi ve kızıl bir renk aldı. Gece olan her yerden görülebilir.":(dS<12||dL<12)&&tilt?"Ay yeni ay ya da dolunay konumunda ama yörüngesi eğik olduğu için gölgenin biraz üstünden geçiyor. Bu yüzden her ay tutulma olmaz!":"Kaydırıcıyı hareket ettirerek Ay'ı Dünya'nın etrafında dolaştır. Üç gök cismi aynı hizaya geldiğinde ne oluyor?";
  }
  A.oninput=draw;$("#eS",el).onclick=()=>{A.value=180;draw()};$("#eL",el).onclick=()=>{A.value=0;draw()};
  $("#eT",el).onclick=e=>{tilt=!tilt;e.currentTarget.setAttribute("aria-pressed",tilt);draw()};draw();
};

W.anatomy=el=>{
  el.innerHTML=`<svg viewBox="0 0 380 150" role="img" aria-label="Kuvvet okunun bölümleri">${gridBg(380,150)}
  <rect x="40" y="55" width="70" height="40" rx="4" fill="var(--surface2)" stroke="var(--ink)"/><text x="75" y="80" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="Lexend">Kutu</text>
  <line x1="0" y1="75" x2="380" y2="75" stroke="var(--muted)" stroke-dasharray="4 5"/>
  ${arrowPath(110,75,290,75,"var(--force)",5)}<circle cx="110" cy="75" r="6" fill="var(--ink)"/>
  <text x="110" y="118" text-anchor="middle" font-size="11.5" fill="var(--ink)" font-family="Lexend">Uygulama noktası</text>
  <text x="200" y="62" text-anchor="middle" font-size="11.5" fill="var(--ink)" font-family="Lexend">Büyüklük = okun uzunluğu (60 N)</text>
  <text x="292" y="118" text-anchor="middle" font-size="11.5" fill="var(--ink)" font-family="Lexend">Yön = ok ucu (sağa)</text>
  <text x="372" y="140" text-anchor="end" font-size="11" fill="var(--muted)" font-family="Lexend">Doğrultu = okun üzerindeki çizgi (yatay)</text></svg>`;
};

W.arrowlab=el=>{
  let dog="yatay",yon=1,mag=3;
  el.innerHTML=`<div class="svgbox"><svg viewBox="0 0 360 240" id="al"></svg></div>
  <div class="ctrls"><span class="seg" id="aD"><button data-v="yatay" aria-pressed="true">Yatay doğrultu</button><button data-v="düşey" aria-pressed="false">Düşey doğrultu</button></span>
  <span class="seg" id="aY"></span>
  <label for="aM">Büyüklük <input type="range" id="aM" min="1" max="6" value="3"></label></div><div class="say" id="aS"></div>`;
  function draw(){
    const cx=180,cy=120,L=mag*20;
    const yl=dog==="yatay"?["Sağa","Sola"]:["Yukarı","Aşağı"];
    $("#aY",el).innerHTML=yl.map((t,k)=>`<button data-v="${k===0?1:-1}" aria-pressed="${(k===0?1:-1)===yon}">${t}</button>`).join("");
    $$("#aY button",el).forEach(b=>b.onclick=()=>{yon=+b.dataset.v;draw()});
    const x2=dog==="yatay"?cx+yon*L:cx,y2=dog==="yatay"?cy:cy-yon*L;
    let s=gridBg(360,240);
    s+=dog==="yatay"?`<line x1="0" y1="${cy}" x2="360" y2="${cy}" stroke="var(--disp)" stroke-width="2" stroke-dasharray="6 5"/>`:`<line x1="${cx}" y1="0" x2="${cx}" y2="240" stroke="var(--disp)" stroke-width="2" stroke-dasharray="6 5"/>`;
    s+=arrowPath(cx,cy,x2,y2,"var(--force)",5)+`<circle cx="${cx}" cy="${cy}" r="6" fill="var(--ink)"/>`;
    s+=`<text x="8" y="16" font-size="11" fill="var(--disp)" font-family="Lexend">Mavi kesikli çizgi = doğrultu</text><text x="8" y="232" font-size="11" fill="var(--muted)" font-family="Lexend">1 kare = 10 N</text>`;
    $("#al",el).innerHTML=s;
    $("#aS",el).innerHTML=`Bu kuvvet: <b>${dog}</b> doğrultuda, <b>${yl[yon===1?0:1].toLowerCase()}</b> yönlü, <b>${mag*10} N</b> büyüklüğünde. Yönü değiştir: doğrultu aynı kalıyor mu?`;
  }
  $$("#aD button",el).forEach(b=>b.onclick=()=>{dog=b.dataset.v;$$("#aD button",el).forEach(x=>x.setAttribute("aria-pressed",x===b));draw()});
  $("#aM",el).oninput=e=>{mag=+e.target.value;draw()};draw();
};

W.dirdog=el=>{
  el.innerHTML=`<svg viewBox="0 0 380 200" role="img" aria-label="Yatay ve düşey doğrultular ve yönleri">${gridBg(380,200)}
  <line x1="20" y1="60" x2="210" y2="60" stroke="var(--disp)" stroke-width="2" stroke-dasharray="6 5"/>
  ${arrowPath(115,60,195,60,"var(--force)",4)}${arrowPath(115,60,35,60,"var(--teal)",4)}
  <text x="115" y="30" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink)" font-family="Lexend">Yatay doğrultu</text>
  <text x="190" y="84" text-anchor="end" font-size="11.5" fill="var(--force)" font-family="Lexend">sağa yön</text><text x="38" y="84" font-size="11.5" fill="var(--teal)" font-family="Lexend">sola yön</text>
  <line x1="300" y1="15" x2="300" y2="185" stroke="var(--disp)" stroke-width="2" stroke-dasharray="6 5"/>
  ${arrowPath(300,100,300,25,"var(--force)",4)}${arrowPath(300,100,300,175,"var(--teal)",4)}
  <text x="300" y="195" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink)" font-family="Lexend">Düşey doğrultu</text>
  <text x="310" y="45" font-size="11.5" fill="var(--force)" font-family="Lexend">yukarı</text><text x="310" y="165" font-size="11.5" fill="var(--teal)" font-family="Lexend">aşağı</text>
  <text x="20" y="140" font-size="11.5" fill="var(--muted)" font-family="Lexend">Bir doğrultu = bir çizgi</text><text x="20" y="158" font-size="11.5" fill="var(--muted)" font-family="Lexend">Her çizgide iki zıt yön</text></svg>`;
};

W.fd=el=>{
  const f=el.dataset.f.split(",").map(Number),net=f.reduce((a,b)=>a+b,0),sc=2.6,cx=190;
  const rows=f.length+1,h=rows*44+20;let s=gridBg(380,h);
  s+=`<line x1="${cx}" y1="0" x2="${cx}" y2="${h}" stroke="var(--muted)" stroke-dasharray="3 4"/>`;
  f.forEach((v,k)=>{const y=30+k*44;s+=arrowPath(cx,y,cx+v*sc,y,"var(--force)",4)+`<text x="${v>0?cx-8:cx+8}" y="${y+4}" text-anchor="${v>0?"end":"start"}" font-size="12" fill="var(--ink)" font-family="JetBrains Mono">F${k+1} = ${Math.abs(v)} N ${v>0?"→":"←"}</text>`});
  const y=30+f.length*44;
  s+=net?arrowPath(cx,y,cx+net*sc,y,"var(--disp)",6):`<circle cx="${cx}" cy="${y}" r="6" fill="var(--ok)"/>`;
  s+=`<text x="${net>=0?cx-8:cx+8}" y="${y+4}" text-anchor="${net>=0?"end":"start"}" font-size="12" font-weight="700" fill="var(--disp)" font-family="JetBrains Mono">Bileşke = ${Math.abs(net)} N${net>0?" →":net<0?" ←":" (dengelenmiş)"}</text>`;
  el.innerHTML=`<svg viewBox="0 0 380 ${h}" role="img" aria-label="Kuvvet diyagramı">${s}</svg>`;
};

W.tug=el=>{
  let L=50,R=30,pos=0,raf=null;
  el.innerHTML=`<div class="svgbox"><svg viewBox="0 0 380 190" id="tg" role="img" aria-label="Halat çekme"></svg></div>
  <div class="ctrls"><label for="tL">Sol takım <input type="range" id="tL" min="0" max="100" step="5" value="50"><span class="pill" id="tLv">50 N</span></label>
  <label for="tR">Sağ takım <input type="range" id="tR" min="0" max="100" step="5" value="30"><span class="pill" id="tRv">30 N</span></label>
  <button class="btn" id="tGo">Çekmeye başla</button><button class="btn ghost" id="tRs">Sıfırla</button></div>
  <div class="readout" id="tO"></div><div class="say" id="tS"></div>`;
  function draw(){
    const net=R-L,sc=1.3,c=190+pos;let s=gridBg(380,190);
    s+=`<line x1="10" y1="70" x2="370" y2="70" stroke="#a87b4b" stroke-width="5"/><line x1="190" y1="40" x2="190" y2="100" stroke="var(--muted)" stroke-dasharray="4 4"/>`;
    s+=`<rect x="${c-7}" y="56" width="14" height="28" fill="var(--force)"/><text x="190" y="32" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Lexend">orta çizgi</text>`;
    s+=arrowPath(c-10,120,c-10-L*sc,120,"var(--force)",5)+arrowPath(c+10,120,c+10+R*sc,120,"var(--force)",5);
    s+=`<text x="${c-14}" y="140" text-anchor="end" font-size="11" fill="var(--ink)" font-family="JetBrains Mono">${L} N</text><text x="${c+14}" y="140" font-size="11" fill="var(--ink)" font-family="JetBrains Mono">${R} N</text>`;
    s+=net?arrowPath(c,168,c+net*sc,168,"var(--disp)",6):`<circle cx="${c}" cy="168" r="6" fill="var(--ok)"/>`;
    s+=`<text x="8" y="184" font-size="11" fill="var(--disp)" font-family="Lexend">Bileşke</text>`;
    $("#tg",el).innerHTML=s;
    $("#tLv",el).textContent=L+" N";$("#tRv",el).textContent=R+" N";
    const dir=net>0?"sağa":"sola";
    $("#tO",el).innerHTML=`<span class="pill">Bileşke: ${Math.abs(net)} N${net?" "+dir:""}</span>`+(net?`<span class="pill badp">Dengelenmemiş</span>`:`<span class="pill okp">Dengelenmiş</span>`)+(net?`<span class="pill">Dengeleyici: ${Math.abs(net)} N ${net>0?"sola":"sağa"}</span>`:"");
    $("#tS",el).innerHTML=net?`Kuvvetler zıt yönlü: büyükten küçüğü çıkar → ${Math.max(L,R)} − ${Math.min(L,R)} = <b>${Math.abs(net)} N</b>. Bayrak <b>${dir}</b> gider, çünkü büyük kuvvet o taraftadır.`:`İki takım eşit kuvvet uyguluyor: bileşke <b>0</b>. Kuvvetler dengelenmiş, bayrak yerinde kalır. Kuvvet yok değil, dengelenmiş!`;
  }
  function go(){cancelAnimationFrame(raf);const net=R-L;if(!net){draw();return}let v=0;const st=performance.now();
    const step=t=>{v+=net*0.004;pos+=v;if(Math.abs(pos)>150){pos=Math.sign(pos)*150;draw();return}draw();if(t-st<4000)raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)}
  $("#tL",el).oninput=e=>{L=+e.target.value;draw()};$("#tR",el).oninput=e=>{R=+e.target.value;draw()};
  $("#tGo",el).onclick=go;$("#tRs",el).onclick=()=>{cancelAnimationFrame(raf);pos=0;draw()};
  anims.push({stop:()=>cancelAnimationFrame(raf)});draw();
};

W.route=el=>{
  const routes={A:{n:"Rota A: Önce doğuya, sonra kuzeye",p:[[0,0],[4,0],[4,3]]},B:{n:"Rota B: Önce kuzeye, sonra doğuya",p:[[0,0],[0,3],[4,3]]},C:{n:"Rota C: Fırına uğrayarak",p:[[0,0],[2,0],[2,5],[4,5],[4,3]]},D:{n:"Okula git ve eve geri dön",p:[[0,0],[4,0],[4,3],[4,0],[0,0]]}};
  let cur="A";
  el.innerHTML=`<div class="seg" id="rS">${Object.keys(routes).map(k=>`<button data-k="${k}" aria-pressed="${k===cur}">${routes[k].n}</button>`).join("")}</div>
  <div class="svgbox"><svg viewBox="0 0 360 290" id="rt" role="img" aria-label="Ev ve okul arasındaki rotalar"></svg></div><div class="readout" id="rO"></div><div class="say" id="rT"></div>`;
  const X=x=>60+x*50,Y=y=>250-y*40;
  function draw(){
    const r=routes[cur].p;let len=0;for(let k=1;k<r.length;k++)len+=Math.abs(r[k][0]-r[k-1][0])+Math.abs(r[k][1]-r[k-1][1]);
    const end=r[r.length-1],back=end[0]===0&&end[1]===0;
    let s="";for(let x=0;x<=5;x++)s+=`<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(5)}" stroke="var(--line)" stroke-width="8" stroke-linecap="round" opacity=".55"/>`;
    for(let y=0;y<=5;y++)s+=`<line x1="${X(0)}" y1="${Y(y)}" x2="${X(5)}" y2="${Y(y)}" stroke="var(--line)" stroke-width="8" stroke-linecap="round" opacity=".55"/>`;
    s+=`<polyline points="${r.map(p=>X(p[0])+","+Y(p[1])).join(" ")}" fill="none" stroke="var(--acc)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
    if(!back)s+=arrowPath(X(0),Y(0),X(4),Y(3),"var(--disp)",4);
    s+=`<rect x="${X(0)-14}" y="${Y(0)-14}" width="28" height="28" rx="4" fill="var(--force)"/><text x="${X(0)}" y="${Y(0)+30}" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="Lexend">Ev</text>`;
    s+=`<rect x="${X(4)-14}" y="${Y(3)-14}" width="28" height="28" rx="4" fill="var(--teal)"/><text x="${X(4)+20}" y="${Y(3)-18}" font-size="12" fill="var(--ink)" font-family="Lexend">Okul</text>`;
    if(cur==="C")s+=`<circle cx="${X(2)}" cy="${Y(5)}" r="9" fill="var(--amber)"/><text x="${X(2)}" y="${Y(5)-14}" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="Lexend">Fırın</text>`;
    s+=`<text x="${X(5)+6}" y="${Y(5)+4}" font-size="12" font-weight="700" fill="var(--muted)" font-family="Lexend">K ↑</text>`;
    $("#rt",el).innerHTML=s;
    $("#rO",el).innerHTML=`<span class="pill accp">Alınan yol: ${len*100} m</span><span class="pill" style="border-color:var(--disp);color:var(--disp)">Yer değiştirme: ${back?"0 m":"500 m, okul yönünde (kuzeydoğuya)"}</span>`;
    $("#rT",el).innerHTML=back?"Eve geri döndün: başlangıç ve bitiş aynı nokta. Ayakların 1400 m yol aldı ama <b>yer değiştirmen sıfır</b>.":`Turuncu çizgi senin yürüdüğün yol, mavi ok ise evden okula düz çizgi. Hangi rotayı seçersen seç <b>yer değiştirme hep aynı</b>, ama alınan yol rotaya göre değişiyor.`;
    $$("#rS button",el).forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===cur));
  }
  $$("#rS button",el).forEach(b=>b.onclick=()=>{cur=b.dataset.k;draw()});draw();
};

W.speed=el=>{
  let mode="kavsak",t=0,playing=!RM,raf=null,last=null;
  el.innerHTML=`<div class="ctrls"><span class="seg" id="sM"><button data-m="duz" aria-pressed="false">Düz yol</button><button data-m="kavsak" aria-pressed="true">Döner kavşak</button><button data-m="zit" aria-pressed="false">Aynı sürat, zıt yön</button></span><button class="btn ghost" id="sP">${playing?"Durdur":"Oynat"}</button></div>
  <div class="svgbox"><svg viewBox="0 0 360 240" id="sv" role="img" aria-label="Sürat ve hız canlandırması"></svg></div><div class="readout" id="sO"></div><div class="say" id="sT"></div>`;
  const DIRS=["Doğu","Kuzeydoğu","Kuzey","Kuzeybatı","Batı","Güneybatı","Güney","Güneydoğu"];
  const dirName=a=>{let d=(-a*180/Math.PI+360)%360;return DIRS[Math.round(d/45)%8]};
  function car(x,y,a,col){return `<g transform="translate(${x},${y}) rotate(${a*180/Math.PI})"><rect x="-13" y="-8" width="26" height="16" rx="4" fill="${col}"/><rect x="3" y="-6" width="7" height="12" rx="2" fill="var(--paper)" opacity=".8"/></g>`}
  function draw(){
    let s=gridBg(360,240);s+=`<text x="345" y="18" text-anchor="end" font-size="12" font-weight="700" fill="var(--muted)" font-family="Lexend">K ↑</text>`;
    let out="",txt="";
    if(mode==="kavsak"){
      const cx=180,cy=120,R=80,a=-t*0.9,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a),h=a-Math.PI/2;
      s+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line)" stroke-width="22"/><circle cx="${cx}" cy="${cy}" r="${R-26}" fill="var(--teal-soft)"/>`;
      s+=arrowPath(x,y,x+55*Math.cos(h),y+55*Math.sin(h),"var(--disp)",4)+car(x,y,h,"var(--force)");
      out=`<span class="pill accp">Gösterge (sürat): 30 km/h · sabit</span><span class="pill" style="border-color:var(--disp);color:var(--disp)">Hız: 30 km/h, yön: ${dirName(h)}</span><span class="pill badp">Hız değişiyor</span>`;
      txt="Göstergedeki sayı hiç değişmiyor: <b>sürat sabit</b>. Ama mavi ok (hız) her an başka yöne dönüyor: <b>hız sürekli değişiyor</b>. Yönü değiştiren bir kuvvet olduğu için kuvvetler dengelenmemiştir.";
    }else if(mode==="duz"){
      const x=30+((t*40)%300);s+=`<rect x="0" y="105" width="360" height="30" fill="var(--line)" opacity=".6"/>`;
      s+=arrowPath(x,120,x+55,120,"var(--disp)",4)+car(x,120,0,"var(--force)");
      out=`<span class="pill accp">Gösterge (sürat): 30 km/h · sabit</span><span class="pill" style="border-color:var(--disp);color:var(--disp)">Hız: 30 km/h, Doğuya</span><span class="pill okp">Hız sabit</span>`;
      txt="Araba düz yolda aynı süratle gidiyor ve yönü hiç değişmiyor. Hem sürat hem yön sabit, yani <b>sabit hızlı hareket</b>.";
    }else{
      const d=((t*40)%140);s+=`<rect x="0" y="55" width="360" height="30" fill="var(--line)" opacity=".6"/><rect x="0" y="155" width="360" height="30" fill="var(--line)" opacity=".6"/>`;
      const x1=110+d,x2=250-d;
      s+=arrowPath(x1,70,x1+55,70,"var(--disp)",4)+car(x1,70,0,"var(--force)")+arrowPath(x2,170,x2-55,170,"var(--disp)",4)+car(x2,170,Math.PI,"var(--teal)");
      s+=`<text x="10" y="48" font-size="11.5" fill="var(--ink)" font-family="Lexend">Kırmızı araç</text><text x="10" y="148" font-size="11.5" fill="var(--ink)" font-family="Lexend">Yeşil araç</text>`;
      out=`<span class="pill accp">Süratleri: ikisi de 30 km/h · eşit</span><span class="pill" style="border-color:var(--disp);color:var(--disp)">Hızları: 30 km/h doğuya / 30 km/h batıya · farklı</span>`;
      txt="İki aracın göstergesi aynı sayıyı gösteriyor, yani <b>süratleri eşit</b>. Ama biri doğuya, diğeri batıya gidiyor. Yön farklı olduğu için <b>hızları farklıdır</b>.";
    }
    $("#sv",el).innerHTML=s;$("#sO",el).innerHTML=out;$("#sT",el).innerHTML=txt;
  }
  function loop(ts){if(last!==null)t+=(ts-last)/1000;last=ts;draw();raf=requestAnimationFrame(loop)}
  function play(){last=null;cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
  $$("#sM button",el).forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$("#sM button",el).forEach(x=>x.setAttribute("aria-pressed",x===b));if(!playing){t+=0.7;}draw()});
  $("#sP",el).onclick=e=>{playing=!playing;e.currentTarget.textContent=playing?"Durdur":"Oynat";if(playing)play();else cancelAnimationFrame(raf)};
  anims.push({stop:()=>cancelAnimationFrame(raf)});
  draw();if(playing)play();
};
