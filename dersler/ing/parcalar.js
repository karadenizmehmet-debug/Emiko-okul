/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== İNGİLİZCE · ETKİLEŞİMLİ PARÇALAR ====================== */

/* Ortak: çoktan seçmeli kart dizisi [soru, seçenekler, doğru, açıklama] */
const ingKartlar=(el,K,bas)=>{
  let i=0,dogru=0;
  const ciz=()=>{
    if(i>=K.length){el.innerHTML=`<p><b>${dogru} / ${K.length}</b> doğru. ${dogru===K.length?"Great job! Hepsini bildin.":"Yanlışlarını tekrar dene."}</p><div class="ctrls"><button class="btn" data-r>Baştan başla</button></div>`;
      $("[data-r]",el).onclick=()=>{i=0;dogru=0;ciz()};return}
    const k=K[i];
    el.innerHTML=`<div class="meta"><span>${bas} · ${i+1} / ${K.length}</span></div><p style="font-size:1.05rem">${k[0]}</p>
    <div class="bank">${k[1].map((o,n)=>`<button class="chip" data-n="${n}">${o}</button>`).join("")}</div><p class="ingSonuc" aria-live="polite"></p>`;
    $$("[data-n]",el).forEach(b=>b.onclick=()=>{
      const n=+b.dataset.n,ok=n===k[2];if(ok)dogru++;
      $$("[data-n]",el).forEach(x=>{x.disabled=true;if(+x.dataset.n===k[2])x.style.borderWidth="3px"});
      b.style.background=ok?"var(--good,#2e8b57)":"var(--bad,#c0392b)";b.style.color="#fff";
      $(".ingSonuc",el).innerHTML=`<b>${ok?"Correct!":"Olmadı."}</b> ${k[3]} <button class="btn" data-s style="margin-left:8px">Sonraki →</button>`;
      $("[data-s]",el).onclick=()=>{i++;ciz()}});
  };ciz();
};

/* 1) Okuldaki görevler */
W.ingGorev=el=>ingKartlar(el,[
  ["I feel sick. Who helps me?",["the librarian","the school nurse","the principal"],1,"Hasta öğrenciye school nurse yardım eder."],
  ["Who manages the school?",["the principal","the caretaker","the class president"],0,"Okulu yöneten kişi principal'dır."],
  ["Who takes care of the books?",["the counsellor","the librarian","the student on duty"],1,"Kitaplardan librarian sorumludur."],
  ["Who keeps the school clean and safe?",["the caretaker","the nurse","the counsellor"],0,"Okulu temiz ve güvenli tutan caretaker'dır."],
  ["I have a problem with my friend. Who gives me advice?",["the school counsellor","the librarian","the caretaker"],0,"Rehber öğretmen (counsellor) dinler ve tavsiye verir."],
  ["Who speaks for the class at meetings?",["the class president","the principal","the nurse"],0,"Sınıfı temsil eden class president'tır."]
],"Who is it?");

/* 2) at / on / in */
W.ingEdat=el=>ingKartlar(el,[
  ["Lessons start ___ 8.30.",["at","on","in"],0,"Saatlerden önce at."],
  ["We have a flag ceremony ___ Mondays.",["at","on","in"],1,"Günlerden önce on."],
  ["I do my homework ___ the evening.",["at","on","in"],2,"Günün bölümlerinden önce in."],
  ["We celebrate Republic Day ___ 29th October.",["at","on","in"],1,"Tarihlerden önce on."],
  ["We have lunch ___ noon.",["at","on","in"],0,"at noon, at night kalıptır."],
  ["Teachers' Day is ___ November.",["at","on","in"],2,"Aylardan önce in."]
],"Edatı seç");

/* 3) Millî günler */
W.ingGunler=el=>ingKartlar(el,[
  ["29th October",["Victory Day","Republic Day","Teachers' Day"],1,"29 Ekim Cumhuriyet Bayramı: Republic Day."],
  ["23rd April",["National Sovereignty and Children's Day","Youth and Sports Day","Victory Day"],0,"23 Nisan Ulusal Egemenlik ve Çocuk Bayramı."],
  ["10th November",["Republic Day","Atatürk Commemoration Day","Children's Day"],1,"10 Kasım Atatürk'ü anma günüdür."],
  ["30th August",["Victory Day","Teachers' Day","Republic Day"],0,"30 Ağustos Zafer Bayramı: Victory Day."],
  ["24th November",["Children's Day","Victory Day","Teachers' Day"],2,"24 Kasım Öğretmenler Günü."],
  ["19th May",["Commemoration of Atatürk, Youth and Sports Day","Democracy Day","Republic Day"],0,"19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı."]
],"Which day is it?");

/* 4) -s / -es / -ies */
W.ingSEki=el=>ingKartlar(el,[
  ["She ___ to school by bus. (go)",["go","goes","gos"],1,"-o ile biten fiil -es alır: goes."],
  ["My brother ___ English every day. (study)",["studys","studies","study"],1,"Sessiz harf + y → ies: studies."],
  ["They ___ football after school. (play)",["play","plays","playes"],0,"They ile fiil yalın kalır."],
  ["The caretaker ___ the doors. (fix)",["fixs","fix","fixes"],2,"-x ile biten fiil -es alır."],
  ["Ali ___ lunch at 12.10. (have)",["haves","has","have"],1,"He ile have → has."],
  ["Elif doesn't ___ the board. (clean)",["cleans","clean","cleaning"],1,"doesn't'tan sonra fiil yalın kalır."],
  ["___ your teacher give homework? (do / does)",["Do","Does","Is"],1,"He / she / it sorusu Does ile kurulur."]
],"Present simple");

/* 5) Sıklık ölçer: zarfı seç, cümle ve yüzde değişsin */
W.ingSiklik=el=>{
  const Z=[["always",100,"her zaman"],["usually",90,"genellikle"],["often",70,"sık sık"],["sometimes",50,"bazen"],["rarely",10,"nadiren"],["never",0,"asla"]];
  const C=[["I","pack my bag at night.",false],["Elif","waters the plants.",false],["We","go to the library.",false],["Kerem","is late for school.",true]];
  let z=0,c=0;
  const ciz=()=>{
    const [ad,yuzde,tr]=Z[z],[o,devam,be]=C[c];
    const cumle=be?`${o} ${devam.split(" ")[0]} <b>${ad}</b> ${devam.split(" ").slice(1).join(" ")}`:`${o} <b>${ad}</b> ${devam}`;
    el.innerHTML=`<div class="bank">${C.map((x,n)=>`<button class="chip" data-c="${n}" ${n===c?'style="border-width:3px"':""}>${x[0]} …</button>`).join("")}</div>
    <div class="bank" style="margin-top:8px">${Z.map((x,n)=>`<button class="chip" data-z="${n}" ${n===z?'style="border-width:3px"':""}>${x[0]}</button>`).join("")}</div>
    <div style="margin:14px 0 6px;height:14px;border-radius:8px;background:var(--surface2);overflow:hidden"><i style="display:block;height:100%;width:${Math.max(yuzde,2)}%;background:var(--d-ing);transition:width .3s"></i></div>
    <p style="font-size:1.15rem">${cumle}</p><p style="color:var(--muted)">${yuzde}% · ${tr}${be?" · <b>is</b> (be) fiilinden sonra geldi.":" · ana fiilden önce geldi."}</p>`;
    $$("[data-z]",el).forEach(b=>b.onclick=()=>{z=+b.dataset.z;ciz()});
    $$("[data-c]",el).forEach(b=>b.onclick=()=>{c=+b.dataset.c;ciz()});
  };ciz();
};

/* 6) Nesne zamirleri */
W.ingZamir=el=>ingKartlar(el,[
  ["The teacher helps <u>the students</u>.",["them","they","it"],0,"Çoğul → them."],
  ["I like <u>Ayşe</u>.",["she","her","him"],1,"Kız → her."],
  ["We greet <u>Mr Kaya</u>.",["him","he","his"],0,"Erkek → him."],
  ["Please clean <u>the board</u>.",["them","it","her"],1,"Tek nesne → it."],
  ["The counsellor listens to <u>my friends and me</u>.",["we","us","them"],1,"Ben + başkası → us."],
  ["Can you help <u>me</u>? → Yes, I can help ___.",["you","me","your"],0,"Karşıdaki kişi → you."]
],"Object pronoun");

/* 7) Göz gezdir: metin türü ve amacı */
W.ingGozGezdir=el=>ingKartlar(el,[
  ["<b>BOOK FAIR!</b> School Library · Friday 10.00 · Bring a book, take a book!",["a poster: announces an event","a diary: tells a day","a timetable: shows lessons"],0,"Başlık, yer ve saat afiş (poster) olduğunu gösterir."],
  ["<i>Dear diary, today we celebrated Republic Day. I recited a poem and I was so happy!</i>",["an e-mail","a diary","a poster"],1,"“Dear diary” ve kişisel duygular günlüğü gösterir."],
  ["Monday 08.30 Maths · 09.20 English · 10.10 Science …",["a timetable","a story","a letter"],0,"Gün ve saatler ders programıdır."],
  ["<i>Hi Tom, our school has a new library. Come and see it! Best wishes, Emir</i>",["a diary","an e-mail","a poster"],1,"Hi … Best wishes kalıbı e-posta / mektuptur."],
  ["<b>CLASS ELECTION</b> · Vote for your class president · 3rd October",["Purpose: to invite students to vote","Purpose: to tell a story","Purpose: to give a recipe"],0,"Afiş öğrencileri oy vermeye çağırıyor."]
],"Skimming");

/* 8) Cümle kurucu: özne + zarf + fiil (otomatik -s) */
W.ingCumle=el=>{
  const O=["I","You","We","They","He","She","My friend","The librarian"],Z=["always","usually","often","sometimes","rarely","never"];
  const F=[["go","goes","to the art club"],["clean","cleans","the board"],["water","waters","the plants"],["study","studies","English"],["help","helps","my classmates"],["have","has","lunch at noon"],["watch","watches","the school show"]];
  let o=0,z=0,f=0;
  const tekil=n=>n>=4;
  const ciz=()=>{
    const fiil=tekil(o)?F[f][1]:F[f][0],nes=F[f][2].replace("my classmates",tekil(o)?(o===4?"his classmates":o===5?"her classmates":"the classmates"):(o===0?"my classmates":o===1?"your classmates":"our classmates"));
    const sel=(arr,cur,key)=>`<div class="bank" style="margin-top:6px">${arr.map((x,n)=>`<button class="chip" data-${key}="${n}" ${n===cur?'style="border-width:3px"':""}>${x}</button>`).join("")}</div>`;
    el.innerHTML=`<p style="color:var(--muted);margin:0">Özne</p>${sel(O,o,"o")}<p style="color:var(--muted);margin:8px 0 0">Sıklık</p>${sel(Z,z,"z")}<p style="color:var(--muted);margin:8px 0 0">Fiil</p>${sel(F.map(x=>x[0]),f,"f")}
    <p style="font-size:1.2rem;margin-top:14px">${O[o]} <b>${Z[z]}</b> <b style="color:var(--d-ing)">${fiil}</b> ${nes}.</p>
    <p style="color:var(--muted)">${tekil(o)?`He / she / it gibi tekil özne: fiil <b>${F[f][0]} → ${fiil}</b> oldu.`:"Bu özneyle fiil yalın kalır."}</p>`;
    $$("[data-o]",el).forEach(b=>b.onclick=()=>{o=+b.dataset.o;ciz()});
    $$("[data-z]",el).forEach(b=>b.onclick=()=>{z=+b.dataset.z;ciz()});
    $$("[data-f]",el).forEach(b=>b.onclick=()=>{f=+b.dataset.f;ciz()});
  };ciz();
};
