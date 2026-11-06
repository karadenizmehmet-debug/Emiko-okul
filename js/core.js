/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== YARDIMCILAR ====================== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const lower=s=>s.toLocaleLowerCase("tr");
const RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Arapça kelimeye dokununca cihazın konuşma motoruyla seslendir. */
let arSesMesajTimer=null;
function arSesMesaj(metin){
  let n=document.getElementById("ar-ses-mesaj");
  if(!n){n=document.createElement("div");n.id="ar-ses-mesaj";n.setAttribute("role","status");n.style.cssText="position:fixed;z-index:99999;left:50%;bottom:92px;transform:translateX(-50%);max-width:90vw;padding:11px 16px;border-radius:12px;background:#17233f;color:#fff;font:600 14px system-ui;text-align:center;box-shadow:0 4px 18px #0005";document.body.appendChild(n)}
  n.textContent=metin;n.style.display="block";clearTimeout(arSesMesajTimer);arSesMesajTimer=setTimeout(()=>n.style.display="none",3500);
}
function arapcaOku(el){
  const api=window.speechSynthesis;
  if(!api||typeof window.SpeechSynthesisUtterance!=="function"){
    arSesMesaj("Bu tarayıcı sesli okumayı desteklemiyor. Chrome ile açmayı deneyin.");return;
  }
  const metin=(el.getAttribute("data-arabic")||el.textContent||"").replace(/[.,،؛؟:]/g," ").replace(/\s+/g," ").trim();
  if(!metin)return;
  try{
    api.cancel();
    const ses=new SpeechSynthesisUtterance(metin);
    ses.lang="ar-SA";ses.rate=.78;ses.pitch=1;
    const sec=()=>{
      const sesler=api.getVoices()||[];
      const ar=sesler.filter(v=>/^ar([_-]|$)/i.test(v.lang));
      ses.voice=ar.find(v=>/ar[-_]SA/i.test(v.lang))||ar.find(v=>/ar[-_]EG/i.test(v.lang))||ar[0]||null;
      ses.onstart=()=>arSesMesaj("🔊 "+metin);
      ses.onerror=ev=>{
        if(ev.error==="not-allowed") arSesMesaj("Ses izni engellendi. Sayfayı Chrome'da açıp tekrar deneyin.");
        else if(ev.error==="voice-unavailable"||ev.error==="language-unavailable") arSesMesaj("Cihazda Arapça ses bulunamadı. Google Konuşma Hizmetleri'nden Arapça sesi yükleyin.");
        else arSesMesaj("Ses başlatılamadı. Telefonun metin okuma ayarlarını kontrol edin.");
      };
      api.speak(ses);
      setTimeout(()=>{if(api.paused)api.resume()},120);
    };
    sec();
    if(!api.getVoices().length){
      api.onvoiceschanged=()=>{api.onvoiceschanged=null};
    }
  }catch(err){arSesMesaj("Ses başlatılamadı. Cihazın konuşma motorunu kontrol edin.");}
}
document.addEventListener("click",e=>{
  const hedef=e.target&&e.target.nodeType===3?e.target.parentElement:e.target;
  if(!hedef||!hedef.closest)return;
  let kelime=hedef.closest(".ab,.abbig");
  if(!kelime&&hedef.closest(".ar-pron")){
    const p=hedef.closest(".ar-pron");
    kelime=p.previousElementSibling;
    if(!kelime||!kelime.matches(".ab,.abbig"))kelime=p.parentElement.querySelector(".ab,.abbig");
  }
  if(kelime)arapcaOku(kelime);
});

let store={};try{store=JSON.parse(localStorage.getItem("fenrota6")||"{}")}catch(e){store={}}
const save=()=>{try{localStorage.setItem("fenrota6",JSON.stringify(store))}catch(e){}};
const state={d:store.d||null,t:store.t||"t1",m:store.m||"konu",st:null};
function starsFor(p){return p>=.9?3:p>=.6?2:p>=.3?1:0}
function starStr(n){return "★".repeat(n)+"☆".repeat(3-n)}
function setBest(t,st,s,n){t=state.d+":"+t;store.sc=store.sc||{};store.sc[t]=store.sc[t]||{};const o=store.sc[t][st];if(!o||s/n>o.s/o.n)store.sc[t][st]={s,n};save()}
function getBest(t,st){t=state.d+":"+t;return store.sc&&store.sc[t]&&store.sc[t][st]}

/* İstasyon tipleri (tüm dersler ortak) */
const STATIONS=[
{id:"det",name:"Bilim Dedektifi",desc:"Vaka dosyasını aç, ipuçlarını topla, doğru sonuca ulaş. Gerçek olaylardan ve günlük hayattan vakalar.",ic:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 21 21"/></svg>'},
{id:"dy",name:"Doğru mu, Yanlış mı?",desc:"Hızlı karar ver, her sorudan sonra açıklamayı oku.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l4 4 6-8"/><path d="M15 15l5 5M20 15l-5 5"/></svg>'},
{id:"test",name:"Test",desc:"Senaryolu, dört seçenekli Maarif tarzı sorular.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'},
{id:"match",name:"Eşleştirme",desc:"Kavramı tanımıyla buluştur. İki set.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="5" cy="7" r="2.5"/><circle cx="19" cy="17" r="2.5"/><path d="M7.5 7c6 0 3 10 9 10"/></svg>'},
{id:"fill",name:"Boşluk Doldurma",desc:"Kelime havuzundan doğru kavramı seç, cümleyi tamamla.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17h5M16 17h5"/><rect x="9" y="12" width="6" height="6" rx="1"/></svg>'},
{id:"sira",name:"Sıralama",desc:"Adımları ve nesneleri doğru sıraya koy.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6h10M4 12h13M4 18h16"/></svg>'},
{id:"klasik",name:"Klasik Sorular",desc:"Kendi cümlelerinle yaz, örnek cevap ve kontrol listesiyle değerlendir.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 4l5 5L9 20H4v-5z"/></svg>'},
 {id:"visual",name:"Görsel Eşleştirme",desc:"Kelimeyi oku, üç görsel arasından doğru olanı seç.",ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="2"/><path d="m21 15-5-5L5 21"/></svg>'}
];

/* ====================== GÖRÜNÜM ====================== */
const view=$("#view");
const curD=()=>DERSLER.find(d=>d.id===state.d);
const stationsFor=(d,t)=>STATIONS.filter(s=>s.id!=="visual"||!!(d&&d.q&&d.q[t]&&d.q[t].visual));
const sN=s=>(s.id==="det"&&curD()&&curD().detAd)||s.name;

function render(){
  stopAnims();
  const d=curD();
  store.d=state.d;save();
  $("#homeBtn").hidden=!d;$("#dersUI").hidden=!d;
  $("#crumb").textContent=d?`6. Sınıf ${d.ad}`:"6. Sınıf · Konu Anlatımı ve Pekiştirme İstasyonu";
  if(!d){$("#app").dataset.tema="t1";renderHome();return}
  if(!d.temas.some(t=>t.id===state.t))state.t=d.temas[0].id;
  $("#app").dataset.tema=state.t;
  $("#temas").innerHTML=d.temas.map(t=>`<button class="tema-btn" data-t="${t.id}" aria-pressed="${t.id===state.t}">${t.ic}<span><span class="k">${t.no}</span><br><span class="n">${t.ad}</span></span></button>`).join("");
  $$(".tema-btn").forEach(b=>b.onclick=()=>{state.t=b.dataset.t;state.st=null;render();window.scrollTo({top:0})});
  $$(".modes button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===state.m));
  store.t=state.t;store.m=state.m;save();
  if(state.m==="konu")renderKonu();else if(state.st)renderStation(state.st);else renderStations();
}
$$(".modes button").forEach(b=>b.onclick=()=>{state.m=b.dataset.m;state.st=null;render()});
$("#homeBtn").onclick=()=>{state.d=null;state.st=null;render();window.scrollTo({top:0})};

function renderHome(){
  view.innerHTML=`<div class="home-head"><h2>Bugün hangi dersi çalışıyoruz?</h2><p>Bir ders seç, ardından temayı seçip konu anlatımına ya da pekiştirme istasyonuna geç.</p></div>
  <div class="dersler">${DERSLER.map(d=>{
    let st="Yakında";
    if(d.hazir){const n=d.temas.length;let y=0;d.temas.forEach(t=>stationsFor(d,t.id).forEach(s=>{const b=store.sc&&store.sc[d.id+":"+t.id]&&store.sc[d.id+":"+t.id][s.id];if(b)y+=starsFor(b.s/b.n)}));const max=d.temas.reduce((a,t)=>a+stationsFor(d,t.id).length,0)*3;st=`${n} tema hazır · ${y} / ${max} yıldız`}
    return `<button class="dcard ${d.hazir?"live":""}" data-d="${d.id}" style="--dc:${d.renk}" ${d.hazir?"":"disabled"}><span class="dic">${d.kisa}</span><h3>${d.ad}</h3><p>${d.acik}</p><span class="st">${st}</span></button>`}).join("")}</div>`;
  $$(".dcard.live").forEach(b=>b.onclick=()=>{state.d=b.dataset.d;state.st=null;render();window.scrollTo({top:0})});
}

/* Kara tahta PDF indirme (downloads yeteneği) */
const dlP=(window.claude&&window.claude.use)?window.claude.use("downloads").catch(()=>null):Promise.resolve(null);
function pdfBar(T){return `<div class="pdfbar"><svg width="44" height="54" viewBox="0 0 44 54" aria-hidden="true"><rect x="2" y="2" width="40" height="50" rx="3" fill="#1d3a2c" stroke="#8b5a2f" stroke-width="4"/><path d="M10 16h24M10 24h18M10 32h22M10 40h14" stroke="#f5f2e7" stroke-width="2.4" stroke-linecap="round" opacity=".85"/><circle cx="33" cy="40" r="3" fill="#f7d95e"/></svg>
  <div class="pt"><b>Kara tahta notları</b><span>Bu temanın özeti, ${T.pdfSayfa} sayfa A4 PDF. Yazdırıp sınıfa asabilir ya da deftere yapıştırabilirsin.</span><span class="pmsg" id="pdfMsg"></span></div>
  <button class="btn" id="pdfBtn">PDF'i indir</button></div>`}
function ornekBar(O){return `<div class="pdfbar ornek"><svg width="44" height="54" viewBox="0 0 44 54" aria-hidden="true"><rect x="2" y="2" width="40" height="50" rx="4" fill="#fff" stroke="var(--know)" stroke-width="3"/><circle cx="11" cy="15" r="3.5" fill="var(--know)"/><path d="M18 15h16M18 27h16M18 39h12" stroke="#5a6a86" stroke-width="2.4" stroke-linecap="round"/><circle cx="11" cy="27" r="3.5" fill="var(--know)"/><circle cx="11" cy="39" r="3.5" fill="var(--know)"/></svg>
  <div class="pt"><b>Örnek yazılı soruları</b><span>Farklı okulların 1. yazılılarından derlenen ${O.soru} soru, tekrarlar çıkarıldı. Sonunda cevap anahtarı var. ${O.sayfa} sayfa A4 PDF.</span><span class="pmsg" id="obMsg"></span></div>
  <button class="btn" id="obBtn">PDF'i indir</button></div>`}
function hapBar(H){return `<div class="pdfbar hap"><svg width="44" height="54" viewBox="0 0 44 54" aria-hidden="true"><rect x="2" y="2" width="40" height="50" rx="4" fill="#fff6d6" stroke="#b8860b" stroke-width="3"/><path d="M10 14h24M10 22h16" stroke="#8a6200" stroke-width="3" stroke-linecap="round"/><path d="M10 31l4 4 7-8M10 43l4 4 7-8" fill="none" stroke="#1f8a5a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 -4)"/><path d="M26 31h9M26 43h9" stroke="#5a6a86" stroke-width="2.4" stroke-linecap="round" transform="translate(0 -4)"/></svg>
  <div class="pt"><b>Hap notlar ve ipuçları</b><span>Bu dersin bütün temalarının hap notları, ipuçları ve dikkat edilecek tuzakları. Yeni tema eklendikçe güncellenir. A4 PDF.</span><span class="pmsg" id="hapMsg"></span></div>
  <button class="btn" id="hapBtn">PDF'i indir</button></div>`}
function wirePdf(T){wireDl(T.pdf,T.pdfAd,"pdfBtn","pdfMsg");if(T.ornek)wireDl(T.ornek.pdf,T.ornek.ad,"obBtn","obMsg");const H=curD().hap;if(H)wireDl(H.pdf+"?v="+SURUM,H.ad,"hapBtn","hapMsg")}
function wireDl(url,name,bid,mid){const b=$("#"+bid),m=$("#"+mid);if(!b)return;
  b.onclick=async()=>{const dl=await dlP;
    if(!dl){const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();m.textContent="İndirme başladı.";return}b.disabled=true;const old=b.textContent;b.textContent="Hazırlanıyor…";m.textContent="";
    try{const r=await fetch(url);if(!r.ok)throw{code:"fetch"};const blob=await r.blob();
      await dl.save({filename:name,data:blob});m.textContent="İndirme başladı.";}
    catch(e){const c=e&&e.code;m.textContent=c==="declined"?"İndirme iptal edildi.":c==="rate_limited"?"Bir indirme penceresi zaten açık, biraz sonra tekrar dene.":c==="fetch"?"PDF dosyası yüklenemedi, sayfayı yenileyip tekrar dene.":"İndirme şu an yapılamadı."}
    b.textContent=old;b.disabled=false}}
/* Konu anlatımı sayfa sayfa: her bölüm bir sayfa, uzun bölümler <!--PAGE--> ile bölünür */
function konuPages(){
  const out=[];
  curD().konu[state.t].forEach((s,si)=>{const parts=s.html.split("<!--PAGE-->");
    parts.forEach((h,k)=>out.push({sec:si,nav:s.nav,part:k,parts:parts.length,html:(k>0?`<div class="eyebrow">${s.nav} · ${k+1}. sayfa</div>`:"")+h}))});
  return out;
}
function pageKey(){return state.d+":"+state.t}
function renderKonu(){
  stopAnims();
  const P=konuPages(),secs=curD().konu[state.t];
  store.k=store.k||{};let i=Math.min(Math.max(store.k[pageKey()]||0,0),P.length-1);
  const p=P[i],last=i===P.length-1;
  const firstOf=si=>P.findIndex(x=>x.sec===si);
  const T=curD().temas.find(t=>t.id===state.t);
  view.innerHTML=`${T.pdf?pdfBar(T):""}${curD().hap?hapBar(curD().hap):""}${T.ornek?ornekBar(T.ornek):""}<div class="konu"><nav class="toc" aria-label="İçindekiler"><span class="lbl">İçindekiler</span>${secs.map((s,si)=>`<button class="tocb ${si===p.sec?"on":""} ${si<p.sec?"seen":""}" data-s="${si}"><span class="tn">${si<p.sec?"✓":si+1}</span><span>${s.nav}</span></button>`).join("")}</nav>
  <div class="pagecol">
   <section class="sec">${p.html}${p.parts>1?`<p class="partnote">${p.nav}: sayfa ${p.part+1} / ${p.parts}</p>`:""}</section>
   ${last?`<div class="sec" style="align-items:flex-start"><div class="eyebrow">Sıra sende</div><h2>Öğrendiklerini pekiştir</h2><p>${sN(STATIONS[0])}, Test, Eşleştirme ve diğer istasyonlarda kendini dene.</p><button class="btn" id="goIst">Pekiştirme istasyonuna git</button></div>`:""}
   <div class="pager"><button class="btn ghost" id="pPrev" ${i===0?"disabled":""}>← Önceki</button>
    <div class="pmid"><span>Sayfa ${i+1} / ${P.length}</span><div class="prog"><i style="width:${(i+1)/P.length*100}%"></i></div></div>
    <button class="btn" id="pNext" ${last?"disabled":""}>Sonraki →</button></div>
  </div></div>`;
  const go=n=>{store.k[pageKey()]=n;save();renderKonu();view.scrollIntoView({behavior:"auto",block:"start"})};
  $("#pPrev").onclick=()=>i>0&&go(i-1);$("#pNext").onclick=()=>!last&&go(i+1);
  $$(".tocb").forEach(b=>b.onclick=()=>go(firstOf(+b.dataset.s)));
  wirePdf(T);
  const gi=$("#goIst");if(gi)gi.onclick=()=>{state.m="ist";render();window.scrollTo({top:0})};
  $$("[data-w]",view).forEach(el=>W[el.dataset.w]&&W[el.dataset.w](el));
  const on=$(".tocb.on");if(on&&on.parentElement.scrollWidth>on.parentElement.clientWidth)on.parentElement.scrollLeft=on.offsetLeft-16;
}
document.addEventListener("keydown",e=>{
  if(state.m!=="konu"||!state.d||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
  if(e.key==="ArrowRight"){const b=$("#pNext");b&&!b.disabled&&b.click()}
  if(e.key==="ArrowLeft"){const b=$("#pPrev");b&&!b.disabled&&b.click()}
});

function stationCount(id){const d=curD().q[state.t];if(id==="visual")return d.visual.length;if(id==="match")return d.match.reduce((a,s)=>a+s.p.length,0);if(id==="fill")return d.fill.items.length;if(id==="sira")return d.sira.length;return d[id].length}
function renderStations(){
  const stations=stationsFor(curD(),state.t);const total=stations.reduce((a,s)=>{const b=getBest(state.t,s.id);return a+(b?starsFor(b.s/b.n):0)},0);
  view.innerHTML=`<div class="ist-head"><h2>Pekiştirme İstasyonu</h2><p>${curD().temas.find(t=>t.id===state.t).ozet} üzerine ${stations.length} farklı istasyon. Her istasyonda en iyi sonucun yıldız olarak kaydedilir.</p></div>
  <div class="score-strip"><span class="pill accp">Toplam yıldız: ${total} / ${stations.length*3}</span></div>
  <div class="stations">${stations.map((s,i)=>{const b=getBest(state.t,s.id);const n=stationCount(s.id);
    const meta=`<div class="meta"><span>${n} ${s.id==="match"?"eşleşme":s.id==="sira"?"görev":s.id==="det"?"vaka":s.id==="visual"?"görsel soru":"soru"}</span><span class="stars">${starStr(b?starsFor(b.s/b.n):0)}</span></div>`;
    return i===0?`<button class="scard feat" data-s="${s.id}"><span class="ic">${s.ic}</span><span class="tx"><h3>${sN(s)}</h3><p>${s.desc}</p>${meta}</span></button>`
    :`<button class="scard" data-s="${s.id}"><span class="ic">${s.ic}</span><h3>${sN(s)}</h3><p>${s.desc}</p>${meta}</button>`}).join("")}</div>`;
  $$(".scard").forEach(c=>c.onclick=()=>{state.st=c.dataset.s;render();window.scrollTo({top:0})});
}
function renderStation(id){
  const s=STATIONS.find(x=>x.id===id);
  view.innerHTML=`<div class="panel"><div class="ph"><h2>${sN(s)}</h2><button class="btn ghost" id="back">← İstasyonlar</button></div><div id="sbody"></div></div>`;
  $("#back").onclick=()=>{state.st=null;render()};
  const el=$("#sbody"),d=curD().q[state.t];
  if(id==="dy")quiz(el,d.dy.map(x=>({...x,o:["Doğru","Yanlış"]})),"dy");
  else if(id==="test")quiz(el,d.test,"test");
  else if(id==="det")quiz(el,d.det,"det");
  else if(id==="match")matchSt(el,d.match);
  else if(id==="fill")fillSt(el,d.fill);
  else if(id==="sira")siraSt(el,d.sira);
  else if(id==="klasik")klasikSt(el,d.klasik);
   else if(id==="visual")visualSt(el,d.visual);
}
function summary(el,s,n,id,again,label){
  setBest(state.t,id,s,n);
  const p=n?s/n:0,st=starsFor(p);
  const msg=st===3?"Harika! Bu konuyu çok iyi kavramışsın.":st===2?"Güzel iş! Yanlış yaptıklarının açıklamalarına bir daha göz at.":st===1?"İyi başlangıç. Konu anlatımını tekrar okuyup yeniden dene.":"Konu anlatımına dönüp örnekleri incele, sonra tekrar dene.";
  el.innerHTML=`<div class="summary"><div class="stars">${starStr(st)}</div><div class="big">${s} / ${n}</div><p>${label||"doğru"}</p><p>${msg}</p><div class="row" style="justify-content:center"><button class="btn" id="again">Tekrar çöz</button><button class="btn ghost" id="toK">Konu anlatımına dön</button></div></div>`;
  $("#again",el).onclick=again;$("#toK",el).onclick=()=>{state.m="konu";state.st=null;render();window.scrollTo({top:0})};
}

/* --- Soru akışı (D/Y, Test, Dedektif) --- */
function quiz(el,items,id){
  let i=0,score=0;
  const L="ABCD";
  function show(){
    const it=items[i];
    let head=`<div class="qno">${id==="det"?"Vaka":"Soru"} ${i+1} / ${items.length}</div><div class="prog"><i style="width:${i/items.length*100}%"></i></div>`;
    if(id==="det")head+=`<div class="case"><span class="tag">Vaka dosyası #${i+1}</span><h3>${it.title}</h3><p>${it.story}</p></div><div class="clues">${it.clues.map((c,k)=>`<div class="clue"><b>İ${k+1}</b><span>${c}</span></div>`).join("")}</div>`;
    el.innerHTML=head+`<p class="q">${it.q}</p><div class="opts ${id==="dy"?"dy":""}">${it.o.map((o,k)=>`<button class="opt" data-k="${k}">${id==="dy"?"":`<span class="L">${L[k]})</span>`}<span>${o}</span></button>`).join("")}</div><div id="fb"></div>`;
    $$(".opt",el).forEach(b=>b.onclick=()=>{
      const k=+b.dataset.k,ok=k===it.a;if(ok)score++;
      $$(".opt",el).forEach(x=>{x.disabled=true;if(+x.dataset.k===it.a)x.classList.add("right")});
      if(!ok)b.classList.add("wrong");
      $("#fb",el).innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"Doğru!":"Yanlış."}${id==="dy"&&!ok?" Cevap: "+it.o[it.a]:""}</b>${it.ex}</div><div class="row" style="margin-top:12px"><button class="btn" id="nx">${i<items.length-1?"Sonraki":"Sonucu gör"}</button></div>`;
      $("#nx",el).onclick=()=>{i++;if(i<items.length)show();else summary(el,score,items.length,id,()=>quiz(el,items,id))};
      $("#nx",el).focus();
    });
  }
  show();
}
/* --- Eşleştirme --- */
function matchSt(el,sets){
  let si=0,miss=0,total=sets.reduce((a,s)=>a+s.p.length,0);
  function show(){
    const set=sets[si];let sel=null,done=0;
    const right=shuffle(set.p.map((p,k)=>({t:p[1],k})));
    el.innerHTML=`<div class="qno">Set ${si+1} / ${sets.length} · ${set.title}</div><p class="q">Soldan bir kavrama, sonra sağdan onun tanımına dokun.</p>
    <div class="mcols"><div class="mcol">${set.p.map((p,k)=>`<button class="mi l" data-k="${k}">${p[0]}</button>`).join("")}</div>
    <div class="mcol">${right.map(r=>`<button class="mi r" data-k="${r.k}">${r.t}</button>`).join("")}</div></div><div id="mfb"></div>`;
    $$(".mi.l",el).forEach(b=>b.onclick=()=>{if(b.classList.contains("done"))return;$$(".mi.l",el).forEach(x=>x.classList.remove("sel"));b.classList.add("sel");sel=+b.dataset.k});
    $$(".mi.r",el).forEach(b=>b.onclick=()=>{
      if(b.classList.contains("done"))return;
      if(sel===null){$("#mfb",el).innerHTML=`<div class="fb no">Önce soldan bir kavram seç.</div>`;return}
      if(+b.dataset.k===sel){
        b.classList.add("done");const l=$(`.mi.l[data-k="${sel}"]`,el);l.classList.remove("sel");l.classList.add("done");b.disabled=l.disabled=true;sel=null;done++;$("#mfb",el).innerHTML="";
        if(done===set.p.length){$("#mfb",el).innerHTML=`<div class="fb ok"><b>Set tamamlandı!</b>Toplam hata sayın: ${miss}</div><div class="row" style="margin-top:12px"><button class="btn" id="nx">${si<sets.length-1?"Sonraki set":"Sonucu gör"}</button></div>`;
          $("#nx",el).onclick=()=>{si++;if(si<sets.length)show();else summary(el,Math.max(0,total-miss),total,"match",()=>matchSt(el,sets),"puan (her hata 1 puan düşürür)")}}
      }else{miss++;b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");}
    });
  }
  show();
}
/* --- Görsel eşleştirme: kelimeyi üç görselden seç --- */
function visualSt(el,items){
  let i=0,score=0,answered=false;
  function show(){
    const it=items[i];
    answered=false;
    const opts=shuffle(it.o.map((o,k)=>({...o,k})));
    el.innerHTML=`<div class="qno">Görsel soru ${i+1} / ${items.length}</div>
      <div class="prog"><i style="width:${i/items.length*100}%"></i></div>
      <div class="case" style="text-align:center"><span class="tag">Kelimeyi bul</span>
        <div style="font-size:clamp(30px,7vw,48px);font-weight:800;margin:12px 0" dir="rtl" lang="ar">${it.word}</div>
        <div style="font-size:18px;font-weight:700">${it.prompt||"Bu kelime hangi görseldir?"}</div>
      </div>
      <div class="visual-grid" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:18px">
        ${opts.map((o,j)=>`<button type="button" class="visual-opt" data-k="${o.k}" aria-label="${o.alt||("Seçenek "+(j+1))}" style="min-width:0;min-height:142px;padding:12px 6px;border:2px solid var(--line);border-radius:16px;background:var(--card);color:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer;touch-action:manipulation;position:relative;z-index:1">
          <span aria-hidden="true" style="font-size:clamp(42px,10vw,64px);line-height:1.25;pointer-events:none">${o.pic}</span>
          <span style="font-size:12px;color:var(--muted);pointer-events:none">Seçenek ${["A","B","C"][j]}</span>
        </button>`).join("")}
      </div><div id="vfb" aria-live="polite"></div>`;
  }
  // Olayları kapsayıcıdan yakala; böylece telefondaki dokunma ve içteki emojiye
  // dokunma da aynı şekilde değerlendirilir.
  el.onclick=(ev)=>{
    const b=ev.target.closest(".visual-opt");
    if(b&&el.contains(b)){
      ev.preventDefault();
      if(answered)return;
      const k=Number(b.dataset.k);
      if(!Number.isInteger(k)||k<0||k>=it.o.length)return;
      answered=true;
      const ok=k===it.a;
      if(ok)score++;
      $$(".visual-opt",el).forEach(x=>{
        x.disabled=true;
        if(Number(x.dataset.k)===it.a){
          x.style.borderColor="var(--good)";
          x.style.background="color-mix(in srgb,var(--good) 12%,var(--card))";
        }
      });
      if(!ok){
        b.style.borderColor="var(--bad)";
        b.style.background="color-mix(in srgb,var(--bad) 10%,var(--card))";
      }
      $("#vfb",el).innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"Doğru!":"Bir daha düşün."}</b> ${it.ex||""}</div><div class="row" style="margin-top:12px"><button type="button" class="btn" id="vnext">${i<items.length-1?"Sonraki":"Sonucu gör"}</button></div>`;
      return;
    }
    if(ev.target.closest("#vnext")&&answered){
      ev.preventDefault();
      i++;
      if(i<items.length)show();
      else summary(el,score,items.length,"visual",()=>visualSt(el,items));
    }
  };
  show();
}
/* --- Boşluk doldurma --- */
function fillSt(el,f){
  const items=f.items;let fills=items.map(()=>null),act=0;
  const bank=shuffle(items.map(x=>x.a).concat(f.extra));
  function draw(checked){
    el.innerHTML=`<p class="q">Önce bir boşluğa, sonra kelime havuzundan bir kelimeye dokun. Dolu bir boşluğa dokunursan kelime havuza geri döner.</p>
    <div class="bank">${bank.map((w,k)=>`<button class="chip" data-w="${k}" ${fills.includes(k)||checked?"disabled":""}>${w}</button>`).join("")}</div>
    <div class="fills">${items.map((it,k)=>{const parts=it.t.split("___");const v=fills[k];const cls=checked?(v!==null&&bank[v]===it.a?"right":"wrong"):(k===act?"act":"");
      return `<p class="fs">${k+1}. ${parts[0]}<button class="blank ${cls}" data-b="${k}" ${checked?"disabled":""}>${v!==null?bank[v]:"……"}</button>${parts[1]}${checked&&!(v!==null&&bank[v]===it.a)?` <span class="pill okp">${it.a}</span>`:""}</p>`}).join("")}</div>
    <div class="row">${checked?`<button class="btn" id="nx">Sonucu gör</button>`:`<button class="btn" id="chk" ${fills.includes(null)?"disabled":""}>Kontrol et</button>`}</div>`;
    if(checked){$("#nx",el).onclick=()=>{const s=items.filter((it,k)=>fills[k]!==null&&bank[fills[k]]===it.a).length;summary(el,s,items.length,"fill",()=>fillSt(el,f))};return}
    $$(".blank",el).forEach(b=>b.onclick=()=>{const k=+b.dataset.b;if(fills[k]!==null){fills[k]=null}act=k;draw()});
    $$(".chip",el).forEach(c=>c.onclick=()=>{let k=act;if(k===null||fills[k]!==null)k=fills.indexOf(null);if(k<0)return;fills[k]=+c.dataset.w;const nxt=fills.indexOf(null);act=nxt<0?null:nxt;draw()});
    const ck=$("#chk",el);if(ck)ck.onclick=()=>draw(true);
  }
  draw();
}
/* --- Sıralama --- */
function siraSt(el,tasks){
  let ti=0,score=0,total=0;
  function show(){
    const t=tasks[ti];let pool=shuffle(t.i.map((x,k)=>k));while(pool.every((v,k)=>v===k)&&pool.length>1)pool=shuffle(pool);let ans=[];
    function draw(checked){
      el.innerHTML=`<div class="qno">Görev ${ti+1} / ${tasks.length}</div><p class="q">${t.title}</p><p style="color:var(--muted);font-size:.9rem">Sol sütundan sırayla dokun. Sağdaki bir öğeye dokunursan geri gelir.</p>
      <div class="sortz"><div class="zone"><h4>Karışık</h4>${pool.map(k=>`<button class="si" data-p="${k}">${t.i[k]}</button>`).join("")}</div>
      <div class="zone"><h4>Senin sıran</h4>${ans.map((k,p)=>`<button class="si ${checked?(k===p?"right":"wrong"):""}" data-a="${k}" ${checked?"disabled":""}><span class="n">${p+1}</span><span>${t.i[k]}</span></button>`).join("")}</div></div>
      <div id="sfb"></div><div class="row">${checked?`<button class="btn" id="nx">${ti<tasks.length-1?"Sonraki görev":"Sonucu gör"}</button>`:`<button class="btn" id="chk" ${pool.length?"disabled":""}>Kontrol et</button>`}</div>`;
      if(checked){const c=ans.filter((k,p)=>k===p).length;
        $("#sfb",el).innerHTML=`<div class="fb ${c===t.i.length?"ok":"no"}"><b>${c} / ${t.i.length} doğru yerde.</b>${c===t.i.length?"Mükemmel sıralama!":"Doğru sıra: "+t.i.map((x,k)=>(k+1)+") "+x).join(" · ")}</div>`;
        $("#nx",el).onclick=()=>{ti++;if(ti<tasks.length)show();else summary(el,score,total,"sira",()=>siraSt(el,tasks),"öğe doğru yerde")};return}
      $$("[data-p]",el).forEach(b=>b.onclick=()=>{const k=+b.dataset.p;pool=pool.filter(x=>x!==k);ans.push(k);draw()});
      $$("[data-a]",el).forEach(b=>b.onclick=()=>{const k=+b.dataset.a;ans=ans.filter(x=>x!==k);pool.push(k);draw()});
      const ck=$("#chk",el);if(ck)ck.onclick=()=>{score+=ans.filter((k,p)=>k===p).length;total+=t.i.length;draw(true)};
    }
    draw();
  }
  show();
}
/* --- Klasik --- */
function klasikSt(el,items){
  let i=0,score=0,total=0;
  function show(){
    const it=items[i];
    el.innerHTML=`<div class="qno">Soru ${i+1} / ${items.length}</div><div class="prog"><i style="width:${i/items.length*100}%"></i></div><p class="q">${it.q}</p>
    <textarea id="kt${state.t}${i}" placeholder="Cevabını kendi cümlelerinle buraya yaz..."></textarea><div id="kfb"></div>
    <div class="row" id="krow"><button class="btn" id="ev">Cevabımı değerlendir</button></div>`;
    $("#ev",el).onclick=()=>{
      const txt=lower($("textarea",el).value);
      if(txt.trim().length<10){$("#kfb",el).innerHTML=`<div class="fb no">Değerlendirme için önce birkaç cümle yaz.</div>`;return}
      $("textarea",el).readOnly=true;
      $("#kfb",el).innerHTML=`<div class="sample"><b>Örnek cevap</b><p>${it.s}</p></div>
      <p style="font-size:.92rem;color:var(--muted)">Cevabında olanları işaretle. Bazılarını senin yazdıklarına bakarak önceden işaretledik; kontrol edip düzelt.</p>
      <div class="checks">${it.p.map((p,k)=>`<label><input type="checkbox" id="kc${state.t}${i}_${k}" ${p.k.some(w=>txt.includes(lower(w)))?"checked":""}><span>${p.t}</span></label>`).join("")}</div>`;
      $("#krow",el).innerHTML=`<button class="btn" id="nx">${i<items.length-1?"Sonraki soru":"Sonucu gör"}</button>`;
      $("#nx",el).onclick=()=>{score+=$$(".checks input",el).filter(c=>c.checked).length;total+=it.p.length;i++;if(i<items.length)show();else summary(el,score,total,"klasik",()=>klasikSt(el,items),"ölçüt karşılandı")};
    };
  }
  show();
}


/* ====================== ETKİLEŞİMLİ PARÇALAR ====================== */
let anims=[];function stopAnims(){anims.forEach(a=>a.stop&&a.stop());anims=[]}
const NS="http://www.w3.org/2000/svg";
function arrowPath(x1,y1,x2,y2,col,w=4,id=""){ // ok çizimi
  const a=Math.atan2(y2-y1,x2-x1),h=11;
  if(Math.hypot(x2-x1,y2-y1)<2)return "";
  const bx=x2-h*Math.cos(a),by=y2-h*Math.sin(a);
  return `<g ${id}><line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${bx-7*Math.sin(a)},${by+7*Math.cos(a)} L${bx+7*Math.sin(a)},${by-7*Math.cos(a)} Z" fill="${col}"/></g>`;
}
function gridBg(w,h,s=20){let g="";for(let x=0;x<=w;x+=s)g+=`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="var(--grid)" stroke-width="1"/>`;for(let y=0;y<=h;y+=s)g+=`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="var(--grid)" stroke-width="1"/>`;return g}
const W={};

/* ====================== YÜKLEYİCİ ======================
   dersler/dersler.js'teki listeye göre her dersin parçalarını ve tema dosyalarını yükler. */
function tema(dersId,T){const d=DERSLER.find(x=>x.id===dersId);if(d)(d._gelen=d._gelen||{})[T.id]=T}
function yukle(src){return new Promise((ok,no)=>{const s=document.createElement("script");s.src=src+"?v="+SURUM;s.onload=ok;s.onerror=()=>no(new Error(src+" yüklenemedi"));document.head.appendChild(s)})}
async function baslat(){
  view.innerHTML='<p class="partnote" style="padding:24px 0">Dersler yükleniyor…</p>';
  // Önce etkileşimli parçalar, sonra tema dosyaları
  await Promise.allSettled(DERSLER.filter(d=>d.parcalar).map(d=>yukle(`dersler/${d.id}/parcalar.js`)));
  const sonuc=await Promise.allSettled(DERSLER.flatMap(d=>d.temalar.map(t=>yukle(`dersler/${d.id}/${t}.js`))));
  sonuc.filter(r=>r.status==="rejected").forEach(r=>console.warn(r.reason));
  DERSLER.forEach(d=>{
    const g=d._gelen||{};
    d.temas=d.temalar.filter(t=>g[t]).map(t=>g[t]);
    d.konu={};d.q={};d.temas.forEach(T=>{d.konu[T.id]=T.konu;d.q[T.id]=T.q});
    d.hazir=d.temas.length>0;
  });
  if(!DERSLER.some(d=>d.id===state.d&&d.hazir))state.d=null;
  render();
}
