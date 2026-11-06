/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== ARAPÇA · ETKİLEŞİMLİ PARÇALAR ====================== */

/* Türkçe sınıf içi okunuş: ince harflerde e/i/ü, kalın harflerde a/ı/u. */
const arOku = s => {
  const words = {
    "هَذِهِ":"hezihi","هَذَا":"heza","مَنْ":"men","مَا":"mâ",
    "أَبٌ":"ebun","أَبِي":"ebî","أُمٌّ":"ümmün","أُمِّي":"ümmî",
    "أَخٌ":"ehun","أَخِي":"ehî","أُخْتٌ":"uhtün","أُخْتِي":"uhtî",
    "جَدٌّ":"ceddün","جَدِّي":"ceddî","جَدَّةٌ":"ceddetün","جَدَّتِي":"ceddetî",
    "عَمٌّ":"ammun","عَمِّي":"ammî","عَمَّةٌ":"ammetün","عَمَّتِي":"ammetî",
    "خَالٌ":"hâlün","خَالِي":"hâlî","خَالَةٌ":"hâletün","خَالَتِي":"hâletî",
    "أَقَارِبُ":"ekâribü","أَقَارِبِي":"ekâribî","أُسْرَةٌ":"üsretün",
    "عَائِلَةٌ":"âiletün","قَرِيبٌ":"karîbün","اِبْنٌ":"ibnün","بِنْتٌ":"bintün",
    "حَفِيدٌ":"hafîdün","مِهْنَةٌ":"mihnetün","مِهَنٌ":"mihenün",
    "مُعَلِّمٌ":"muallimün","مُعَلِّمَةٌ":"muallimetün",
    "طَبِيبٌ":"tabîbün","طَبِيبَةٌ":"tabîbetün",
    "مُمَرِّضٌ":"mümerridun","مُمَرِّضَةٌ":"mümerridetün",
    "مُهَنْدِسٌ":"mühendisün","مُهَنْدِسَةٌ":"mühendisetün",
    "شُرْطِيٌّ":"şurtiyyün","شُرْطِيَّةٌ":"şurtiyyetün",
    "طَبَّاخٌ":"tabbahun","نَجَّارٌ":"neccârun","خَبَّازٌ":"hebbâzun",
    "خَيَّاطٌ":"hayyâtun","فَلَّاحٌ":"fellâhun","سَائِقٌ":"sâikun","بَائِعٌ":"bâiun"
  };
  const clean = String(s).replace(/[.؟،؛:]/g," ").replace(/\s+/g," ").trim();
  return clean.split(" ").map(w => {
    if(words[w]) return words[w];
    const thin = /[ب ت ث ج د ذ ز س ش ف ك ل م ن ه ي]/;
    const thick = /[ص ض ط ظ ق خ غ]/;
    let out="", last="";
    const base={"ء":"","أ":"","إ":"","آ":"â","ا":"a","ؤ":"'","ئ":"'","ب":"b","ت":"t","ث":"s","ج":"c","ح":"h","خ":"h","د":"d","ذ":"z","ر":"r","ز":"z","س":"s","ش":"ş","ص":"s","ض":"d","ط":"t","ظ":"z","ع":"'","غ":"ğ","ف":"f","ق":"k","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"v","ي":"y","ى":"a","ة":"t"};
    const a=[...w];
    for(let i=0;i<a.length;i++){
      const c=a[i];
      if(c==="ّ"){if(last)out+=last;continue}
      if(c==="َ"||c==="ِ"||c==="ُ"||c==="ْ"||c==="ً"||c==="ٍ"||c==="ٌ"){
        const emph=thick.test(last);
        out+=c==="َ"?(emph?"a":"e"):c==="ِ"?"i":c==="ُ"?(emph?"u":"ü"):c==="ً"?(emph?"an":"en"):c==="ٍ"?"in":c==="ٌ"?(emph?"un":"ün"):"";
        continue;
      }
      if(base[c]!==undefined){last=base[c];out+=last;continue}
    }
    return out;
  }).join(" ");
};
const arPron = s => `<span class="ar-pron" style="direction:ltr;unicode-bidi:isolate;font-size:.82em;color:var(--muted);white-space:nowrap">(${arOku(s)})</span>`;

const arA=s=>`<span class="ab" lang="ar" dir="rtl">${s}</span> ${arPron(s)}`;
const arBig=s=>`<span class="abbig" lang="ar" dir="rtl">${s}</span><br>${arPron(s)}`;

/* 1) Akraba kartları: dokun, Türkçesini ve cümleyi gör */
W.akraba=el=>{
  /* [Arapça, "benim" biçimi, Türkçe, "benim" Türkçesi, dişil mi, taraf] */
  const G={
    "Çekirdek aile":[
      ["أَبٌ","أَبِي","baba","babam",0,""],
      ["أُمٌّ","أُمِّي","anne","annem",1,""],
      ["أَخٌ","أَخِي","erkek kardeş, ağabey","erkek kardeşim",0,""],
      ["أُخْتٌ","أُخْتِي","kız kardeş, abla","kız kardeşim",1,""],
      ["جَدٌّ","جَدِّي","dede","dedem",0,""],
      ["جَدَّةٌ","جَدَّتِي","nine, büyükanne","ninem",1,""]],
    "Baba tarafı":[
      ["عَمٌّ","عَمِّي","amca","amcam",0,"baba"],
      ["عَمَّةٌ","عَمَّتِي","hala","halam",1,"baba"]],
    "Anne tarafı":[
      ["خَالٌ","خَالِي","dayı","dayım",0,"anne"],
      ["خَالَةٌ","خَالَتِي","teyze","teyzem",1,"anne"]],
    "Kuzenler":[
      ["اِبْنُ العَمِّ","اِبْنُ عَمِّي","amca oğlu","amcamın oğlu",0,"baba"],
      ["اِبْنَةُ العَمَّةِ","اِبْنَةُ عَمَّتِي","hala kızı","halamın kızı",1,"baba"],
      ["اِبْنُ الخَالِ","اِبْنُ خَالِي","dayı oğlu","dayımın oğlu",0,"anne"],
      ["اِبْنَةُ الخَالَةِ","اِبْنَةُ خَالَتِي","teyze kızı","teyzemin kızı",1,"anne"]]
  };
  const keys=Object.keys(G);let cur=keys[0],open=new Set();
  el.innerHTML=`<div class="seg" id="aT">${keys.map(k=>`<button data-k="${k}" aria-pressed="${k===cur}">${k}</button>`).join("")}</div>
  <div class="arcards" id="aG"></div>
  <div class="say" id="aS">Bir karta dokun: Türkçesi, “benim” biçimi ve örnek cümle açılır.</div>`;
  function draw(){
    $$("#aT button",el).forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===cur));
    $("#aG",el).innerHTML=G[cur].map((r,i)=>{
      const on=open.has(cur+i),side=r[5];
      const ex=`${arA((r[4]?"هَذِهِ ":"هَذَا ")+r[1]+".")}<br>Bu ${r[3]}.`;
      return `<button class="arc ${side} ${on?"on":""}" data-i="${i}" aria-expanded="${on}">
        ${arBig(r[0])}
        ${side?`<span class="tag">${side==="baba"?"baba tarafı":"anne tarafı"}</span>`:""}
        ${on?`<span class="tr">${r[2]}</span><span class="alt">benim: ${arA(r[1])} (${r[3]})</span><span class="ex">${ex}</span>`:`<span class="hint">dokun</span>`}
      </button>`}).join("");
    $$("#aG .arc",el).forEach(b=>b.onclick=()=>{const k=cur+b.dataset.i;open.has(k)?open.delete(k):open.add(k);draw()});
    $("#aS",el).innerHTML=cur==="Baba tarafı"?`Baba tarafı: ${arA("عَمٌّ")} amca, ${arA("عَمَّةٌ")} hala.`
      :cur==="Anne tarafı"?`Anne tarafı: ${arA("خَالٌ")} dayı, ${arA("خَالَةٌ")} teyze.`
      :cur==="Kuzenler"?`Arapçada “kuzen” için tek kelime yok; Türkçedeki gibi “amca oğlu, teyze kızı” diye söyleriz.`
      :`Dişil (kadın) kelimelerin çoğu ${arA("ـَةٌ")} ile biter: ${arA("جَدٌّ")} → ${arA("جَدَّةٌ")}. İstisna: ${arA("أَخٌ")} → ${arA("أُخْتٌ")}.`;
  }
  $$("#aT button",el).forEach(b=>b.onclick=()=>{cur=b.dataset.k;draw()});draw();
};

/* 2) Meslek kartları: erkek / kadın biçimi ve kalıp süzgeci */
const AR_MESLEK=[
  ["مُعَلِّمٌ","مُعَلِّمَةٌ","öğretmen","mu"],
  ["طَبِيبٌ","طَبِيبَةٌ","doktor","di"],
  ["مُمَرِّضٌ","مُمَرِّضَةٌ","hemşire","mu"],
  ["مُهَنْدِسٌ","مُهَنْدِسَةٌ","mühendis","mu"],
  ["مُحَامٍ","مُحَامِيَةٌ","avukat","mu"],
  ["شُرْطِيٌّ","شُرْطِيَّةٌ","polis","ni"],
  ["جُنْدِيٌّ","جُنْدِيَّةٌ","asker","ni"],
  ["طَبَّاخٌ","طَبَّاخَةٌ","aşçı","fa"],
  ["نَجَّارٌ","نَجَّارَةٌ","marangoz","fa"],
  ["خَبَّازٌ","خَبَّازَةٌ","fırıncı","fa"],
  ["خَيَّاطٌ","خَيَّاطَةٌ","terzi","fa"],
  ["فَلَّاحٌ","فَلَّاحَةٌ","çiftçi","fa"],
  ["سَائِقٌ","سَائِقَةٌ","şoför","fe"],
  ["بَائِعٌ","بَائِعَةٌ","satıcı","fe"]];
W.meslek=el=>{
  const F={all:"Hepsi",mu:"مُـ ile başlayan",ni:"ـِيّ ile biten",fa:"فَعَّال kalıbı",fe:"فَاعِل kalıbı"};
  const N={mu:"başında مُ (mu) var",ni:"sonunda ـِيّ (iyy) var",fa:"فَعَّال (faâl) kalıbı",fe:"فَاعِل (fâil) kalıbı",di:"فَعِيل (faîl) kalıbı"};
  let g=0,f="all",open=new Set();
  el.innerHTML=`<div class="ctrls"><div class="seg" id="mG"><button data-g="0" aria-pressed="true">Erkek</button><button data-g="1" aria-pressed="false">Kadın (+ ة / te)</button></div></div>
  <div class="seg" id="mF">${Object.keys(F).map(k=>`<button data-f="${k}" aria-pressed="${k===f}">${k==="all"?F[k]:F[k].replace(/[؀-ۿ]+(?:\s[؀-ۿ]+)*/,m=>`<span class="ab">${m}</span>`)}</button>`).join("")}</div>
  <div class="arcards" id="mC"></div><div class="say" id="mS"></div>`;
  function draw(){
    $$("#mG button",el).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.g===g));
    $$("#mF button",el).forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===f));
    const L=AR_MESLEK.map((r,i)=>[r,i]).filter(([r])=>f==="all"||r[3]===f);
    $("#mC",el).innerHTML=L.map(([r,i])=>{const on=open.has(i);
      return `<button class="arc ${on?"on":""}" data-i="${i}" aria-expanded="${on}">${arBig(r[g])}${on?`<span class="tr">${r[2]}</span><span class="alt">${N[r[3]]}</span>`:`<span class="hint">dokun</span>`}</button>`}).join("");
    $$("#mC .arc",el).forEach(b=>b.onclick=()=>{const k=+b.dataset.i;open.has(k)?open.delete(k):open.add(k);draw()});
    $("#mS",el).innerHTML=g?`Kadın biçimi için sona ${arA("ـَة")} gelir: ${arA("مُعَلِّمٌ")} → ${arA("مُعَلِّمَةٌ")}. ${arA("ـِيّ")} ile bitenlerde ${arA("شُرْطِيٌّ")} → ${arA("شُرْطِيَّةٌ")} olur.`
      :`${L.length} meslek gösteriliyor. Kalıp süzgeciyle benzer yapıdaki meslekleri bir arada gör.`;
  }
  $$("#mG button",el).forEach(b=>b.onclick=()=>{g=+b.dataset.g;draw()});
  $$("#mF button",el).forEach(b=>b.onclick=()=>{f=b.dataset.f;draw()});draw();
};

/* 3) Cümle kurucu: akraba + meslek */
W.cumle=el=>{
  const R=[["جَدِّي","dedem",0],["جَدَّتِي","ninem",1],["أَبِي","babam",0],["أُمِّي","annem",1],["عَمِّي","amcam",0],["عَمَّتِي","halam",1],["خَالِي","dayım",0],["خَالَتِي","teyzem",1],["أَخِي","erkek kardeşim",0],["أُخْتِي","kız kardeşim",1]];
  const o=(a,i)=>{const p=a.split(" · "),label=/[؀-ۿ]/.test(p[0])?p[0]+" ("+arOku(p[0])+")"+(p.length>1?" · "+p.slice(1).join(" · "):""):a;return `<option value="${i}">${label}</option>`};
  el.innerHTML=`<div class="arsel"><label>Akraba<select id="cR">${R.map((r,i)=>o(r[0]+" · "+r[1],i)).join("")}</select></label>
  <label>Meslek<select id="cM">${AR_MESLEK.map((r,i)=>o(r[0]+" · "+r[2],i)).join("")}</select></label></div>
  <div class="ctrls"><button class="btn ghost" id="cX">Rastgele seç</button></div>
  <div class="arout" id="cO"></div><div class="say" id="cS"></div>`;
  const rs=$("#cR",el),ms=$("#cM",el);rs.value=4;ms.value=3;
  function draw(){
    const r=R[+rs.value],m=AR_MESLEK[+ms.value];
    const ar=r[0]+" "+m[r[2]]+".";
    const trs=r[1].charAt(0).toLocaleUpperCase("tr")+r[1].slice(1)+" "+m[2]+".";
    $("#cO",el).innerHTML=`${arBig(ar)}<div class="tr">${trs}</div>`;
    $("#cS",el).innerHTML=r[2]?`${r[1].charAt(0).toLocaleUpperCase("tr")+r[1].slice(1)} kadın olduğu için mesleğin sonuna ${arA("ـَة")} geldi: ${arA(m[1])}.`
      :`${r[1].charAt(0).toLocaleUpperCase("tr")+r[1].slice(1)} erkek olduğu için meslek erkek biçiminde kaldı: ${arA(m[0])}.`;
  }
  rs.onchange=ms.onchange=draw;
  $("#cX",el).onclick=()=>{rs.value=Math.floor(Math.random()*R.length);ms.value=Math.floor(Math.random()*AR_MESLEK.length);draw()};
  draw();
};
