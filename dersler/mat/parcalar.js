/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== MATEMATİK ETKİLEŞİMLİ PARÇALARI ====================== */
const divisors=n=>{const d=[];for(let i=1;i<=n;i++)if(n%i===0)d.push(i);return d};
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const gcd=(a,b)=>b?gcd(b,a%b):a, lcm=(a,b)=>a/gcd(a,b)*b;
const primeF=n=>{const f=[];let p=2;while(n>1){while(n%p===0){f.push(p);n/=p}p++}return f};
const FT="font-family=\"Lexend\"";

/* 1) Dikdörtgen dizici: çarpan çiftleri */
W.carpan=el=>{
  let n=12,pick=0;
  el.innerHTML=`<div class="ctrls"><label for="cN">Kare sayısı <input type="range" id="cN" min="2" max="36" value="12"><span class="pill accp" id="cNv">12</span></label></div>
  <div class="seg" id="cP"></div><div class="svgbox"><svg id="cS" viewBox="0 0 380 210" role="img" aria-label="Kareleri dikdörtgen biçiminde dizme"></svg></div>
  <div class="readout" id="cR"></div><div class="say" id="cY"></div>`;
  function draw(){
    const d=divisors(n),pairs=d.filter(x=>x<=n/x).map(x=>[x,n/x]);
    if(pick>=pairs.length)pick=pairs.length-1;
    $("#cNv",el).textContent=n;
    $("#cP",el).innerHTML=pairs.map((p,k)=>`<button data-k="${k}" aria-pressed="${k===pick}">${p[0]} × ${p[1]}</button>`).join("");
    $$("#cP button",el).forEach(b=>b.onclick=()=>{pick=+b.dataset.k;draw()});
    const [r,c]=pairs[pick],cols=Math.max(r,c),rows=Math.min(r,c),sz=Math.min(340/cols,170/rows,34),ox=(380-cols*sz)/2,oy=(196-rows*sz)/2;
    let s=gridBg(380,210);
    for(let i=0;i<rows;i++)for(let j=0;j<cols;j++)s+=`<rect x="${ox+j*sz+1.5}" y="${oy+i*sz+1.5}" width="${sz-3}" height="${sz-3}" rx="3" fill="var(--acc)" fill-opacity="${.55+.45*((i+j)%2)}"/>`;
    s+=`<text x="190" y="${oy-6}" text-anchor="middle" font-size="12" fill="var(--ink)" ${FT}>${cols} sütun</text><text x="${ox-8}" y="${oy+rows*sz/2+4}" text-anchor="end" font-size="12" fill="var(--ink)" ${FT}>${rows}</text>`;
    $("#cS",el).innerHTML=s;
    $("#cR",el).innerHTML=`<span class="pill">Çarpanlar: ${d.join(", ")}</span><span class="pill accp">${d.length} çarpan</span>${isPrime(n)?`<span class="pill okp">Asal sayı!</span>`:""}`;
    $("#cY",el).innerHTML=isPrime(n)?`${n} kare yalnızca <b>tek sıra</b> hâlinde dizilebiliyor. Sadece 1 ve kendisi çarpanı olan böyle sayılara <b>asal sayı</b> diyeceğiz.`:`${n} kare <b>${pairs.length} farklı</b> dikdörtgen oluşturuyor. Her dikdörtgenin iki kenarı, ${n} sayısının bir çarpan çifti: ${pairs.map(p=>p[0]+" · "+p[1]).join(", ")}.`+(Math.sqrt(n)%1===0?` ${Math.sqrt(n)} · ${Math.sqrt(n)} bir <b>kare</b> oluşturuyor; bu yüzden ${n} sayısının çarpan sayısı tek.`:"");
  }
  $("#cN",el).oninput=e=>{n=+e.target.value;pick=0;draw()};draw();
};

/* 2) Bölünebilme dedektörü */
W.bolun=el=>{
  el.innerHTML=`<div class="ctrls"><label for="bN">Bir sayı yaz <input id="bN" type="text" inputmode="numeric" maxlength="9" value="4536" class="numin"></label>
  <span class="seg"><button data-v="246">246</button><button data-v="1035">1035</button><button data-v="7128">7128</button><button data-v="98765">98765</button></span></div>
  <div class="divgrid" id="bG"></div><div class="say" id="bY"></div>`;
  const inp=$("#bN",el);
  function draw(){
    const v=inp.value.replace(/\D/g,"").replace(/^0+(?=\d)/,"");
    if(!v){$("#bG",el).innerHTML="";$("#bY",el).textContent="Rakamlardan oluşan bir sayı yaz.";return}
    const dg=[...v].map(Number),sum=dg.reduce((a,b)=>a+b,0),last=dg[dg.length-1],l2=+v.slice(-2),n=BigInt(v);
    const R=[
      [2,`Birler basamağı ${last}`,last%2===0],
      [3,`Rakamlar toplamı ${sum}`,sum%3===0],
      [4,`Son iki basamak ${String(l2).padStart(v.length>1?2:1,"0")}`,l2%4===0],
      [5,`Birler basamağı ${last}`,last%5===0],
      [6,`Çift mi? ${last%2===0?"evet":"hayır"} · 3'e? ${sum%3===0?"evet":"hayır"}`,last%2===0&&sum%3===0],
      [9,`Rakamlar toplamı ${sum}`,sum%9===0],
      [10,`Birler basamağı ${last}`,last===0]];
    $("#bG",el).innerHTML=R.map(r=>`<div class="dv ${r[2]?"ok":"no"}"><b>${r[0]}</b><span>${r[1]}</span><i>${r[2]?"✓ bölünür":"✗ bölünmez"}</i></div>`).join("");
    const okl=R.filter(r=>r[2]).map(r=>r[0]);
    $("#bY",el).innerHTML=`<b>${v}</b> sayısı ${okl.length?okl.join(", ")+" ile kalansız bölünür.":"bu sayıların hiçbirine kalansız bölünmez."} Rakamlar toplamı: ${dg.join(" + ")} = <b>${sum}</b>. 9'a bölümünden kalan: <b>${Number(n%9n)}</b>.`;
  }
  inp.oninput=draw;$$(".seg button",el).forEach(b=>b.onclick=()=>{inp.value=b.dataset.v;draw()});draw();
};

/* 3) Eratosthenes kalburu */
W.kalbur=el=>{
  const P=[2,3,5,7];let step=0,sel=null;
  el.innerHTML=`<div class="sieve" id="kG"></div><div class="ctrls"><button class="btn" id="kN">2'nin katlarını ele</button><button class="btn ghost" id="kR">Baştan başla</button></div><div class="say" id="kY"></div>`;
  function draw(){
    const crossed=n=>n===1||P.slice(0,step).some(p=>n!==p&&n%p===0);
    const by=n=>P.slice(0,step).find(p=>n!==p&&n%p===0);
    $("#kG",el).innerHTML=Array.from({length:100},(_,i)=>i+1).map(n=>{const c=crossed(n),pr=step===4&&!c;const col=c&&n>1?["c2","c3","c5","c7"][P.indexOf(by(n))]:"";
      return `<button class="sv ${c?"x "+col:""} ${pr?"pr":""} ${P.slice(0,step).includes(n)?"pr":""}" data-n="${n}">${n}</button>`}).join("");
    $$(".sv",el).forEach(b=>b.onclick=()=>{const n=+b.dataset.n;$("#kY",el).innerHTML=n===1?"<b>1</b> asal da bileşik de değildir; baştan elenir.":isPrime(n)?`<b>${n}</b> asaldır: yalnızca 1'e ve ${n}'e bölünür.`:`<b>${n}</b> bileşiktir: ${n} = ${primeF(n).join(" · ")}. Bölenleri: ${divisors(n).join(", ")}.`});
    const kN=$("#kN",el);
    if(step<4){kN.disabled=false;kN.textContent=`${P[step]}'${["nin","ün","in","nin"][step]} katlarını ele`}else{kN.disabled=true;kN.textContent="Kalbur tamam"}
    $("#kY",el).innerHTML=step===0?"1 baştan elendi. 2 asaldır ve onu daire içine alırız. Düğmeye bas: 2 dışındaki bütün çift sayılar elenecek.":step<4?`${P[step-1]}'${["nin","ün","in","nin"][step-1]} katları elendi. Sıradaki elenmemiş sayı ${P[step]}, o da asal. Devam et!`:"7'den sonra yeni bir sayı elenmez (100'e kadar). Elenmeden kalan <b>25 sayı</b> 100'e kadar olan asal sayılardır. Bir sayıya dokun, bilgisini gör.";
  }
  $("#kN",el).onclick=()=>{if(step<4){step++;draw()}};$("#kR",el).onclick=()=>{step=0;draw()};draw();
};

/* 4) Çarpan ağacı */
W.agac=el=>{
  const NUMS=[24,36,60,72,84,90,96,100];let n=60,tree=null;
  el.innerHTML=`<div class="seg" id="aN">${NUMS.map(x=>`<button data-v="${x}" aria-pressed="${x===n}">${x}</button>`).join("")}</div>
  <div class="svgbox"><svg id="aS" viewBox="0 0 380 250" role="img" aria-label="Çarpan ağacı"></svg></div>
  <div class="ctrls"><button class="btn" id="aB">Bir dal ayır</button><button class="btn ghost" id="aF">Hepsini ayır</button><button class="btn ghost" id="aX">Başka yoldan dene</button></div><div class="say" id="aY"></div>`;
  let alt=false;
  const mk=v=>({v,k:null});
  function split(nd){if(isPrime(nd.v)||nd.k)return false;const d=divisors(nd.v).filter(x=>x>1&&x<nd.v);let a=alt?d[Math.floor((d.length-1)/2)]:d[0];const b=nd.v/a;nd.k=[mk(Math.min(a,b)),mk(Math.max(a,b))];return true}
  function next(nd){if(!nd.k)return isPrime(nd.v)?null:nd;return next(nd.k[0])||next(nd.k[1])}
  function leaves(nd,o=[]){if(!nd.k)o.push(nd.v);else{leaves(nd.k[0],o);leaves(nd.k[1],o)}return o}
  function depth(nd){return nd.k?1+Math.max(depth(nd.k[0]),depth(nd.k[1])):0}
  function draw(){
    let s=gridBg(380,250);const D=Math.max(depth(tree),1),dy=Math.min(54,200/D);
    function place(nd,x,y,w){
      if(nd.k){const xl=x-w/2,xr=x+w/2;s+=`<line x1="${x}" y1="${y+12}" x2="${xl}" y2="${y+dy-14}" stroke="var(--muted)" stroke-width="2"/><line x1="${x}" y1="${y+12}" x2="${xr}" y2="${y+dy-14}" stroke="var(--muted)" stroke-width="2"/>`;place(nd.k[0],xl,y+dy,w/2);place(nd.k[1],xr,y+dy,w/2)}
      const p=isPrime(nd.v);s+=p?`<circle cx="${x}" cy="${y}" r="15" fill="var(--ok-soft)" stroke="var(--ok)" stroke-width="2"/>`:`<rect x="${x-18}" y="${y-13}" width="36" height="26" rx="6" fill="var(--surface)" stroke="var(--acc)" stroke-width="2"/>`;
      s+=`<text x="${x}" y="${y+5}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" font-family="JetBrains Mono">${nd.v}</text>`}
    place(tree,190,24,160);$("#aS",el).innerHTML=s;
    const lv=leaves(tree).sort((a,b)=>a-b),done=!next(tree);
    $("#aB",el).disabled=$("#aF",el).disabled=done;
    $("#aY",el).innerHTML=done?`Tüm dallar asal sayıyla bitti (yeşil daireler). <b>${n} = ${lv.join(" · ")}</b>. Asal çarpanları: <b>${[...new Set(lv)].join(", ")}</b>. “Başka yoldan dene” ile farklı başla: sonuç değişmeyecek!`:`Kutudaki sayılar bileşik, yeşil dairedekiler asal. Şu ana kadar: ${n} = ${leaves(tree).join(" · ")}`;
  }
  function reset(){tree=mk(n);draw()}
  $$("#aN button",el).forEach(b=>b.onclick=()=>{n=+b.dataset.v;$$("#aN button",el).forEach(x=>x.setAttribute("aria-pressed",x===b));reset()});
  $("#aB",el).onclick=()=>{const nd=next(tree);if(nd){split(nd);draw()}};
  $("#aF",el).onclick=()=>{let nd;while(nd=next(tree))split(nd);draw()};
  $("#aX",el).onclick=()=>{alt=!alt;reset()};reset();
};

/* 5) Kat zıplayıcıları: EKOK */
W.ekok=el=>{
  let a=4,b=6;
  el.innerHTML=`<div class="ctrls"><label for="eA2">1. sayı <input type="range" id="eA2" min="2" max="12" value="4"><span class="pill" id="eAv">4</span></label>
  <label for="eB2">2. sayı <input type="range" id="eB2" min="2" max="12" value="6"><span class="pill" id="eBv">6</span></label></div>
  <div class="svgbox"><svg id="eSv" viewBox="0 0 380 170" role="img" aria-label="Sayı doğrusunda katlar"></svg></div><div class="readout" id="eRd"></div><div class="say" id="eSy"></div>`;
  function draw(){
    const L=lcm(a,b),max=Math.max(L*2>72?L:L*2,24),sc=350/max,x=v=>15+v*sc;
    $("#eAv",el).textContent=a;$("#eBv",el).textContent=b;
    let s=gridBg(380,170);s+=`<line x1="15" y1="88" x2="368" y2="88" stroke="var(--ink)" stroke-width="2"/>`;
    const step=max>48?6:max>24?2:1;for(let v=0;v<=max;v++){if(v%step===0)s+=`<line x1="${x(v)}" y1="83" x2="${x(v)}" y2="93" stroke="var(--muted)"/><text x="${x(v)}" y="108" text-anchor="middle" font-size="9.5" fill="var(--muted)" font-family="JetBrains Mono">${v}</text>`}
    for(let v=0;v+a<=max;v+=a)s+=`<path d="M${x(v)},86 Q${(x(v)+x(v+a))/2},${86-Math.min(60,a*sc*.7)} ${x(v+a)},86" fill="none" stroke="var(--disp)" stroke-width="2.4"/>`;
    for(let v=0;v+b<=max;v+=b)s+=`<path d="M${x(v)},90 Q${(x(v)+x(v+b))/2},${90+Math.min(60,b*sc*.7)} ${x(v+b)},90" fill="none" stroke="var(--force)" stroke-width="2.4"/>`;
    for(let v=L;v<=max;v+=L)s+=`<circle cx="${x(v)}" cy="88" r="7" fill="var(--ok)"/><text x="${x(v)}" y="${v===L?20:20}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ok)" ${FT}>${v===L?"EKOK "+L:L*(v/L)}</text>`;
    s+=`<text x="8" y="160" font-size="10.5" fill="var(--disp)" ${FT}>Mavi: ${a} birimlik zıplama</text><text x="372" y="160" text-anchor="end" font-size="10.5" fill="var(--force)" ${FT}>Kırmızı: ${b} birimlik zıplama</text>`;
    $("#eSv",el).innerHTML=s;
    const ka=[],kb=[];for(let v=a;v<=L*2;v+=a)ka.push(v);for(let v=b;v<=L*2;v+=b)kb.push(v);
    $("#eRd",el).innerHTML=`<span class="pill">${a}: ${ka.slice(0,8).join(", ")}…</span><span class="pill">${b}: ${kb.slice(0,8).join(", ")}…</span><span class="pill okp">EKOK(${a}, ${b}) = ${L}</span>`;
    $("#eSy",el).innerHTML=`İki kurbağa 0'dan aynı anda zıplamaya başlıyor. İlk kez <b>${L}</b> noktasında birlikte konuyorlar. ${L===a*b?`Burada EKOK, sayıların çarpımına eşit; çünkü ${a} ile ${b} <b>aralarında asal</b>.`:L===Math.max(a,b)?`EKOK, büyük sayının kendisi; çünkü ${Math.max(a,b)}, ${Math.min(a,b)} sayısının katı.`:`Dikkat: ${a} · ${b} = ${a*b} de ortak kattır ama en küçüğü ${L}'dir.`}`;
  }
  $("#eA2",el).oninput=e=>{a=+e.target.value;draw()};$("#eB2",el).oninput=e=>{b=+e.target.value;draw()};draw();
};

/* 6) Fayans ustası: OBEB */
W.obeb=el=>{
  let w=12,h=18,t=1;
  el.innerHTML=`<div class="ctrls"><label for="oW">Genişlik <input type="range" id="oW" min="4" max="24" step="2" value="12"><span class="pill" id="oWv">12</span></label>
  <label for="oH">Uzunluk <input type="range" id="oH" min="4" max="30" step="2" value="18"><span class="pill" id="oHv">18</span></label></div>
  <div class="seg" id="oT"></div>
  <div class="svgbox"><svg id="oS" viewBox="0 0 380 220" role="img" aria-label="Zemini kare fayanslarla döşeme"></svg></div><div class="readout" id="oR"></div><div class="say" id="oY"></div>`;
  function draw(){
    const G=gcd(w,h),cand=divisors(Math.min(w,h)).filter(x=>x<=12);if(!cand.includes(t))t=1;
    $("#oWv",el).textContent=w+" dm";$("#oHv",el).textContent=h+" dm";
    $("#oT",el).innerHTML=`<span style="font-size:.88rem;align-self:center;margin-right:4px">Fayans kenarı:</span>`+cand.map(c=>`<button data-v="${c}" aria-pressed="${c===t}">${c} dm</button>`).join("");
    $$("#oT button",el).forEach(b=>b.onclick=()=>{t=+b.dataset.v;draw()});
    const sc=Math.min(340/h,190/w),ox=(380-h*sc)/2,oy=(210-w*sc)/2,fit=w%t===0&&h%t===0;
    let s=gridBg(380,220)+`<rect x="${ox}" y="${oy}" width="${h*sc}" height="${w*sc}" fill="var(--surface2)" stroke="var(--ink)" stroke-width="2"/>`;
    for(let i=0;i*t<w;i++)for(let j=0;j*t<h;j++){const cw=Math.min(t,h-j*t),ch=Math.min(t,w-i*t),cut=cw<t||ch<t;
      s+=`<rect x="${ox+j*t*sc+1}" y="${oy+i*t*sc+1}" width="${cw*sc-2}" height="${ch*sc-2}" rx="2" fill="${cut?"var(--bad)":"var(--acc)"}" fill-opacity="${cut?.35:.25+.35*((i+j)%2)}" stroke="${cut?"var(--bad)":"var(--acc)"}" ${cut?'stroke-dasharray="4 3"':""}/>`}
    $("#oS",el).innerHTML=s;
    const ok=d=>w%d===0&&h%d===0;
    $("#oR",el).innerHTML=`<span class="pill">Ortak bölenler: ${divisors(G).join(", ")}</span><span class="pill okp">OBEB(${w}, ${h}) = ${G}</span>`;
    $("#oY",el).innerHTML=fit?`${t} dm'lik fayanslar kesilmeden sığdı: ${w/t} · ${h/t} = <b>${w*h/t/t} fayans</b>. ${t===G?"Bu, kullanılabilecek <b>en büyük</b> fayans: OBEB!":`Daha büyük bir fayans dene; en büyüğü ${G} dm.`}`:`${t} dm'lik fayans ${[w%t?w:0,h%t?h:0].filter(Boolean).join(" ve ")} sayısını tam bölmüyor; kırmızı fayanslar <b>kesilmek zorunda</b>.`;
  }
  $("#oW",el).oninput=e=>{w=+e.target.value;draw()};$("#oH",el).oninput=e=>{h=+e.target.value;draw()};draw();
};

/* 7) Olasılık çizgisi */
W.cizgi=el=>{
  const EV=[
    ["Zar atınca 7 gelmesi",0,"Zarın yüzlerinde 7 yok: imkânsız olay."],
    ["Yarın güneşin doğması",1,"Her sabah olur: kesin olay."],
    ["Para atınca yazı gelmesi",.5,"İki eşit şanslı sonuçtan biri: 1/2."],
    ["Zar atınca 6 gelmesi",1/6,"Altı yüzden yalnızca biri: düşük ama olası."],
    ["Zar atınca 6'dan küçük gelmesi",5/6,"1, 2, 3, 4, 5: altı yüzden beşi. Yüksek olasılık."],
    ["Temmuzda Akşehir'e kar yağması",.02,"Neredeyse imkânsız ama mümkün olmayan bir olay değil."],
    ["Sınıftan rastgele seçilen birinin doğum gününün pazar olması",1/7,"Haftanın 7 gününden biri."],
    ["İçinde sadece mavi top olan torbadan mavi çekmek",1,"Başka renk yok: kesin."]];
  let cur=2;
  el.innerHTML=`<div class="seg" id="zE">${EV.map((e,k)=>`<button data-k="${k}" aria-pressed="${k===cur}">${e[0]}</button>`).join("")}</div>
  <div class="svgbox"><svg id="zS" viewBox="0 0 380 120" role="img" aria-label="0 ile 1 arasında olasılık çizgisi"></svg></div><div class="say" id="zY"></div>`;
  function draw(){
    const e=EV[cur],x=20+e[1]*340;let s=gridBg(380,120);
    s+=`<defs><linearGradient id="zg"><stop offset="0" stop-color="var(--bad)"/><stop offset=".5" stop-color="var(--amber)"/><stop offset="1" stop-color="var(--ok)"/></linearGradient></defs><rect x="20" y="56" width="340" height="10" rx="5" fill="url(#zg)"/>`;
    [[0,"0","İmkânsız"],[.5,"1/2","Eşit şans"],[1,"1","Kesin"]].forEach(([v,l,t])=>{s+=`<text x="${20+v*340}" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)" font-family="JetBrains Mono">${l}</text><text x="${20+v*340}" y="104" text-anchor="middle" font-size="10.5" fill="var(--muted)" ${FT}>${t}</text>`});
    s+=`<path d="M${x},50 l-8,-14 h16 z" fill="var(--ink)"/><circle cx="${x}" cy="61" r="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="3"/>`;
    $("#zS",el).innerHTML=s;$$("#zE button",el).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.k===cur));
    $("#zY",el).innerHTML=`<b>${e[0]}:</b> ${e[2]}`;
  }
  $$("#zE button",el).forEach(b=>b.onclick=()=>{cur=+b.dataset.k;draw()});draw();
};

/* 8) Deney laboratuvarı */
W.deney=el=>{
  const T={para:{ad:"Para",o:["Yazı","Tura"],w:[1,1],c:["var(--amber)","var(--teal)"]},zar:{ad:"Zar",o:["1","2","3","4","5","6"],w:[1,1,1,1,1,1],c:Array(6).fill("var(--disp)")},torba:{ad:"Torba (3 kırmızı, 2 mavi, 1 sarı)",o:["Kırmızı","Mavi","Sarı"],w:[3,2,1],c:["var(--bad)","var(--disp)","#d6a514"]}};
  let k="para",cnt=[0,0],last=null;
  el.innerHTML=`<div class="seg" id="dK">${Object.keys(T).map(x=>`<button data-v="${x}" aria-pressed="${x===k}">${T[x].ad}</button>`).join("")}</div>
  <div class="ctrls"><button class="btn" data-n="1">1 deneme</button><button class="btn" data-n="10">10 deneme</button><button class="btn" data-n="100">100 deneme</button><button class="btn ghost" id="dR">Sıfırla</button><span class="pill accp" id="dL">—</span></div>
  <div class="svgbox"><svg id="dS" viewBox="0 0 380 190" role="img" aria-label="Sonuçların sütun grafiği"></svg></div><div class="tbl" id="dT"></div>`;
  const roll=()=>{const t=T[k],W2=t.w.reduce((a,b)=>a+b,0);let r=Math.random()*W2;for(let i=0;i<t.w.length;i++){if(r<t.w[i])return i;r-=t.w[i]}return 0};
  function draw(){
    const t=T[k],N=cnt.reduce((a,b)=>a+b,0),mx=Math.max(...cnt,1),bw=Math.min(60,300/t.o.length-12);
    let s=gridBg(380,190);
    t.o.forEach((o,i)=>{const x=40+i*(320/t.o.length)+(320/t.o.length-bw)/2,h=cnt[i]/mx*130;
      s+=`<rect x="${x}" y="${160-h}" width="${bw}" height="${h}" rx="4" fill="${t.c[i]}" fill-opacity=".8"/><text x="${x+bw/2}" y="176" text-anchor="middle" font-size="11" fill="var(--ink)" ${FT}>${o}</text><text x="${x+bw/2}" y="${154-h}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)" font-family="JetBrains Mono">${cnt[i]}</text>`});
    s+=`<line x1="30" y1="160" x2="370" y2="160" stroke="var(--ink)"/>`;$("#dS",el).innerHTML=s;
    $("#dL",el).textContent=N?`Toplam ${N} deneme · son sonuç: ${t.o[last]}`:"Henüz deneme yok";
    const g=(a,b)=>b?gcd(a,b):a;
    $("#dT",el).innerHTML=`<table><tr><th>Sonuç</th><th>Sıklık</th><th>Deneysel olasılık</th><th>Yüzde</th></tr>${t.o.map((o,i)=>{const G=g(cnt[i],N)||1;return `<tr><td>${o}</td><td class="c">${cnt[i]}</td><td class="c">${N?`${cnt[i]}/${N}${G>1?` = ${cnt[i]/G}/${N/G}`:""}`:"–"}</td><td class="c">${N?(cnt[i]/N*100).toLocaleString("tr",{maximumFractionDigits:1})+"%":"–"}</td></tr>`}).join("")}</table>`;
  }
  function reset(){cnt=T[k].o.map(()=>0);last=null;draw()}
  $$("[data-n]",el).forEach(b=>b.onclick=()=>{for(let i=0;i<+b.dataset.n;i++){last=roll();cnt[last]++}draw()});
  $$("#dK button",el).forEach(b=>b.onclick=()=>{k=b.dataset.v;$$("#dK button",el).forEach(x=>x.setAttribute("aria-pressed",x===b));reset()});
  $("#dR",el).onclick=reset;reset();
};

/* 9) Yazı oranı grafiği */
W.yakinsa=el=>{
  let seq=[],raf=null;
  el.innerHTML=`<div class="svgbox"><svg id="yS" viewBox="0 0 380 200" role="img" aria-label="Atış sayısına göre yazı oranı"></svg></div>
  <div class="ctrls"><button class="btn" data-n="10">10 atış</button><button class="btn" data-n="100">100 atış</button><button class="btn" data-n="1000">1000 atış</button><button class="btn ghost" id="yR">Sıfırla</button></div>
  <div class="readout" id="yO"></div><div class="say" id="yY"></div>`;
  function draw(){
    const N=seq.length,X=n=>36+(n/Math.max(N,10))*334,Y=p=>170-p*150;let s=gridBg(380,200);
    s+=`<line x1="36" y1="20" x2="36" y2="170" stroke="var(--ink)"/><line x1="36" y1="170" x2="372" y2="170" stroke="var(--ink)"/><line x1="36" y1="${Y(.5)}" x2="372" y2="${Y(.5)}" stroke="var(--ok)" stroke-dasharray="6 5" stroke-width="2"/>`;
    [0,.5,1].forEach(p=>s+=`<text x="30" y="${Y(p)+4}" text-anchor="end" font-size="10" fill="var(--muted)" font-family="JetBrains Mono">${p===.5?"1/2":p}</text>`);
    s+=`<text x="372" y="188" text-anchor="end" font-size="10" fill="var(--muted)" ${FT}>atış sayısı → ${N}</text><text x="372" y="${Y(.5)-6}" text-anchor="end" font-size="10" fill="var(--ok)" ${FT}>yarı yarıya</text>`;
    if(N){let h=0,d="";const st=Math.max(1,Math.floor(N/400));seq.forEach((v,i)=>{h+=v;if(i%st===0||i===N-1)d+=(d?"L":"M")+X(i+1).toFixed(1)+","+Y(h/(i+1)).toFixed(1)});s+=`<path d="${d}" fill="none" stroke="var(--acc)" stroke-width="2.4" stroke-linejoin="round"/>`}
    $("#yS",el).innerHTML=s;
    const y=seq.reduce((a,b)=>a+b,0);
    $("#yO",el).innerHTML=N?`<span class="pill">Atış: ${N}</span><span class="pill">Yazı: ${y}</span><span class="pill accp">Oran: ${(y/N).toLocaleString("tr",{maximumFractionDigits:3})} (%${(y/N*100).toLocaleString("tr",{maximumFractionDigits:1})})</span>`:"";
    $("#yY",el).innerHTML=!N?"Atış düğmelerine bas. Turuncu çizgi, o ana kadarki yazı oranını gösterir.":N<50?"Az atışta çizgi zikzak çiziyor; oran yarıdan çok uzak olabilir.":"Atış sayısı arttıkça çizgi sakinleşiyor ve yeşil kesikli çizginin (1/2) etrafında dolanıyor.";
  }
  $$("[data-n]",el).forEach(b=>b.onclick=()=>{for(let i=0;i<+b.dataset.n;i++)seq.push(Math.random()<.5?1:0);if(seq.length>20000)seq=seq.slice(0,20000);draw()});
  $("#yR",el).onclick=()=>{seq=[];draw()};draw();
};

/* 10) Gizemli torba */
W.torba=el=>{
  const C=[["Kırmızı","var(--bad)"],["Mavi","var(--disp)"],["Yeşil","var(--ok)"]];
  let bag,cnt,guess,shown=false;
  el.innerHTML=`<div class="bagrow"><svg id="tbS" viewBox="0 0 120 120" width="110" height="110" aria-hidden="true"></svg><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px">
  <p style="font-size:.95rem">Torbada <b>10 top</b> var. Renkleri gizli. Çek, not al, geri at.</p>
  <div class="ctrls"><button class="btn" data-n="1">1 çek</button><button class="btn" data-n="10">10 çek</button><button class="btn" data-n="50">50 çek</button></div></div></div>
  <div class="readout" id="tbR"></div>
  <div class="guess" id="tbG"></div>
  <div class="ctrls"><button class="btn" id="tbK">Torbayı aç, tahminimi kontrol et</button><button class="btn ghost" id="tbY">Yeni torba</button></div><div class="say" id="tbM"></div>`;
  function newBag(){const r=1+Math.floor(Math.random()*6),m=1+Math.floor(Math.random()*(8-r));bag=[r,m,10-r-m];cnt=[0,0,0];guess=[3,3,4];shown=false;draw()}
  function draw(last){
    const N=cnt.reduce((a,b)=>a+b,0);
    $("#tbS",el).innerHTML=`<path d="M30 40 Q20 110 60 112 Q100 110 90 40 Z" fill="#b98a55"/><path d="M38 40 Q60 22 82 40" fill="none" stroke="#8a6436" stroke-width="5"/>${last!=null?`<circle cx="60" cy="22" r="14" fill="${C[last][1]}" stroke="var(--ink)" stroke-width="2"/>`:""}<text x="60" y="84" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Bricolage Grotesque">?</text>`;
    $("#tbR",el).innerHTML=`<span class="pill">Çekiliş: ${N}</span>`+C.map((c,i)=>`<span class="pill">${c[0]}: ${cnt[i]}${N?` (${(cnt[i]/N*100).toLocaleString("tr",{maximumFractionDigits:0})}%)`:""}</span>`).join("");
    $("#tbG",el).innerHTML=`<b style="font-size:.92rem">Tahminin (toplam ${guess.reduce((a,b)=>a+b,0)} / 10):</b>`+C.map((c,i)=>`<label><span style="color:${c[1]};font-weight:700">${c[0]}</span><button class="btn ghost st" data-i="${i}" data-d="-1" aria-label="${c[0]} azalt">−</button><b class="gv">${guess[i]}</b><button class="btn ghost st" data-i="${i}" data-d="1" aria-label="${c[0]} artır">+</button></label>`).join("");
    $$(".st",el).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;guess[i]=Math.max(0,Math.min(10,guess[i]+ +b.dataset.d));draw()});
    $("#tbM",el).innerHTML=shown?`Torbada <b>${bag.map((v,i)=>v+" "+C[i][0].toLowerCase()).join(", ")}</b> top vardı. ${guess.every((g,i)=>g===bag[i])?"Tahminin tam isabet!":`Senin tahminin: ${guess.join(" – ")}. ${N<30?"Daha çok çekiliş yapsaydın tahminin daha iyi olabilirdi.":"Yakın mı? Deneysel oranlar her zaman gerçeğe tam eşit çıkmaz."}`}`:N?`Deneysel olasılıkları 10 ile çarparak tahmin yapabilirsin. Örneğin kırmızı oranı yaklaşık ${(cnt[0]/N).toLocaleString("tr",{maximumFractionDigits:2})} → yaklaşık ${Math.round(cnt[0]/N*10)} kırmızı top.`:"Önce birkaç çekiliş yap.";
  }
  $$("[data-n]",el).forEach(b=>b.onclick=()=>{let l;for(let i=0;i<+b.dataset.n;i++){let r=Math.floor(Math.random()*10);l=r<bag[0]?0:r<bag[0]+bag[1]?1:2;cnt[l]++}draw(l)});
  $("#tbK",el).onclick=()=>{shown=true;draw()};$("#tbY",el).onclick=newBag;newBag();
};
