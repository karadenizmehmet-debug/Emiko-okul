/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* ====================== TÜRKÇE · ETKİLEŞİMLİ PARÇALAR ====================== */

/* Ortak: çoktan seçmeli kart dizisi (soru, seçenekler, doğru, açıklama) */
const trKartlar=(el,K,bas)=>{
  let i=0,dogru=0;
  const ciz=()=>{
    if(i>=K.length){el.innerHTML=`<p><b>${dogru} / ${K.length}</b> doğru. ${dogru===K.length?"Harika, hepsini bildin!":"Yanlışlarını tekrar dene."}</p><div class="ctrls"><button class="btn" data-r>Baştan başla</button></div>`;
      $("[data-r]",el).onclick=()=>{i=0;dogru=0;ciz()};return}
    const k=K[i];
    el.innerHTML=`<div class="meta"><span>${bas} · ${i+1} / ${K.length}</span></div><p style="font-size:1.05rem">${k[0]}</p>
    <div class="bank">${k[1].map((o,n)=>`<button class="chip" data-n="${n}">${o}</button>`).join("")}</div><p class="trSonuc" aria-live="polite"></p>`;
    $$("[data-n]",el).forEach(b=>b.onclick=()=>{
      const n=+b.dataset.n,ok=n===k[2];if(ok)dogru++;
      $$("[data-n]",el).forEach(x=>{x.disabled=true;if(+x.dataset.n===k[2])x.style.borderWidth="3px"});
      b.style.background=ok?"var(--ok,#2e8b57)":"var(--bad,#c0392b)";b.style.color="#fff";
      $(".trSonuc",el).innerHTML=`<b>${ok?"Doğru!":"Olmadı."}</b> ${k[3]} <button class="btn" data-s style="margin-left:8px">Sonraki →</button>`;
      $("[data-s]",el).onclick=()=>{i++;ciz()}});
  };ciz();
};

/* 1) Anlam dedektifi: bağlamdan anlam */
W.trBaglam=el=>trKartlar(el,[
  ["Ali çok <b>mahcup</b>, yani utangaç bir çocuktu.",["korkusuz","utangaç","neşeli"],1,"“yani utangaç” bir eş anlam ipucudur."],
  ["Kardeşim <b>cesur</b>, ben ise korkağın tekiyim.",["korkusuz","yorgun","tembel"],0,"“ben ise korkak” zıt anlam ipucudur."],
  ["Çok <b>müsrif</b> davrandı, ay bitmeden harçlığı tükendi.",["tutumlu","savurgan","dikkatli"],1,"Harçlığın erken bitmesi sonuç ipucudur."],
  ["Maçtan sonra öyle <b>bitap</b> düştüm ki yürüyecek hâlim kalmadı.",["çok yorgun","çok mutlu","çok aç"],0,"“Yürüyecek hâlim kalmadı” ipucudur."],
  ["Dedem <b>cömert</b> biriydi; elindekini hep komşularıyla paylaşırdı.",["cimri","eli açık","sinirli"],1,"Paylaşma davranışı açıklama ipucudur."],
  ["Bu gelenek <b>kuşak</b>tan kuşağa aktarılarak bugüne geldi.",["kemer","nesil","yol"],1,"Geleneğin aktarılması nesilleri düşündürür."]
],"Anlamı tahmin et");

/* 2) Kelime çözümleyici: kök ve ekler */
W.trKokEk=el=>{
  const K=[["gözlükçülerde",["göz","lük","çü","ler","de"],["kök","yapım","yapım","çekim","çekim"]],
    ["evlerimizden",["ev","ler","imiz","den"],["kök","çekim","çekim","çekim"]],
    ["kitaplık",["kitap","lık"],["kök","yapım"]],
    ["balıkçılar",["balık","çı","lar"],["kök","yapım","çekim"]],
    ["silgimi",["sil","gi","mi"],["kök","yapım","çekim"]],
    ["tuzsuzluk",["tuz","suz","luk"],["kök","yapım","yapım"]]];
  const RENK={kök:"var(--d-tr)",yapım:"var(--amber,#d4a017)",çekim:"var(--d-mat,#2563c9)"};
  let i=0,acik=0;
  const ciz=()=>{const [kel,p,t]=K[i];
    el.innerHTML=`<p>Kelimeyi parçalarına ayırmak için <b>Ayır</b> düğmesine bas. Her basışta bir parça açılır.</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:1.5rem;font-weight:700;justify-content:center;align-items:flex-start">${p.slice(0,acik).map((x,n)=>`<span style="padding:6px 10px;border-radius:10px;border:2px solid ${RENK[t[n]]};color:${RENK[t[n]]};text-align:center">${x}<small style="display:block;font-size:.7rem;font-weight:600">${t[n]}</small></span>`).join("")}${acik<p.length?`<span style="padding:6px 10px;border:2px dashed var(--line);border-radius:10px">${p.slice(acik).join("")}</span>`:""}</div>
    <p style="text-align:center;color:var(--muted)">${acik>=p.length?"Tamam! "+kel+" = "+p.join(" + "):"Kelime: "+kel}</p>
    <div class="ctrls"><button class="btn ghost" data-o>← Önceki kelime</button><button class="btn" data-a ${acik>=p.length?"disabled":""}>Ayır</button><button class="btn ghost" data-n>Sonraki kelime →</button></div>
    <p style="font-size:.85rem"><span style="color:${RENK.kök}">■ kök</span> &nbsp; <span style="color:${RENK.yapım}">■ yapım eki (yeni kelime)</span> &nbsp; <span style="color:${RENK.çekim}">■ çekim eki (cümleye bağlar)</span></p>`;
    $("[data-a]",el).onclick=()=>{acik++;ciz()};
    $("[data-n]",el).onclick=()=>{i=(i+1)%K.length;acik=0;ciz()};
    $("[data-o]",el).onclick=()=>{i=(i+K.length-1)%K.length;acik=0;ciz()};
  };ciz();
};

/* 3) Ayrı mı bitişik mi: de/da, ki, mi */
W.trDeDa=el=>trKartlar(el,[
  ["Ben___ seninle geleceğim.",["Ben de","Bende"],0,"Bağlaç olan de ayrı yazılır; çıkarınca anlam bozulmaz."],
  ["Kitaplar dolap___ duruyor.",["dolap da","dolapta"],1,"Bulunma hâl eki bitişik yazılır."],
  ["Yarın bizimle gelir___?",["gelir misin","gelirmisin"],0,"Soru eki ayrı yazılır, sonraki ekler ona bitişir."],
  ["Sınıf___ kitapları kim topladı?",["sınıftaki","sınıf da ki"],0,"Hâl eki de bitişik, -ki eki de bitişik: sınıftaki."],
  ["Duydum___ yarışmayı kazanmışsın.",["Duydum ki","Duydumki"],0,"Bağlaç olan ki ayrı yazılır."],
  ["Bu kalem senin mi, benim___?",["benimki mi","benim ki mi"],0,"-ki eki bitişik, soru eki ayrı yazılır."],
  ["Sen___ mi Ankara'ya gidiyorsun?",["sen de","sende"],0,"Bağlaç de: “Sen de mi gidiyorsun?”"],
  ["Para cüzdan___ kalmış.",["cüzdanda","cüzdan da"],0,"“Cüzdanda” yer bildirir; ek bitişiktir."]
],"Doğru yazımı seç");
