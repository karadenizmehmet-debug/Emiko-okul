/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
(()=>{

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

const A=s=>`<span class="ab" lang="ar" dir="rtl">${s}</span> ${arPron(s)}`;
tema("ar",{
id:"t1",no:"1. Tema · Günlük Hayat 1",ad:"Günlük Hayat 1",ozet:"Akrabalarım (geniş aile bireyleri) ve meslekler",pdf:"pdf/ar-tema1.pdf",pdfAd:"Arapca6_Tema1_Gunluk_Hayat1.pdf",pdfSayfa:4,
   ic:'<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><circle cx="14" cy="13" r="6" fill="var(--amber)"/><circle cx="34" cy="13" r="6" fill="var(--teal)"/><circle cx="24" cy="25" r="5" fill="var(--ink)"/><path d="M4 42 q10-18 20 0 z" fill="var(--amber)" opacity=".85"/><path d="M24 42 q10-18 20 0 z" fill="var(--teal)" opacity=".85"/><path d="M15 42 q9-14 18 0 z" fill="var(--ink)"/></svg>',
/* ---------- KONU ANLATIMI ---------- */
konu:[
{id:"a1s1",nav:"Ailem ve akrabalarım",html:`
<div class="eyebrow">Bölüm 1 · Giriş</div>
<h2>Aileni Arapça tanıt</h2>
<p>Arapçada aileye ${A("أُسْرَةٌ")} (ya da ${A("عَائِلَةٌ")}) denir. Ailenin dışında kalan, kan bağıyla yakın olduğumuz kişilere ise ${A("أَقَارِبُ")} (akrabalar) deriz. Tek bir akrabaya ${A("قَرِيبٌ")} denir. “Ailem” demek için ${A("أُسْرَتِي")}, “akrabalarım” demek için ${A("أَقَارِبِي")} deriz.</p>
<div class="cards4">
 <div class="mini"><h4>Anne ve baba</h4><p>${A("أَبٌ")} baba · ${A("أُمٌّ")} anne</p></div>
 <div class="mini"><h4>Kardeşler</h4><p>${A("أَخٌ")} erkek kardeş, ağabey · ${A("أُخْتٌ")} kız kardeş, abla</p></div>
 <div class="mini"><h4>Büyükler</h4><p>${A("جَدٌّ")} dede · ${A("جَدَّةٌ")} nine, büyükanne</p></div>
 <div class="mini"><h4>Çocuklar</h4><p>${A("اِبْنٌ")} oğul · ${A("بِنْتٌ")} kız · ${A("حَفِيدٌ")} torun</p></div>
</div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Bayram sabahı dedenin evinde herkes toplanır: amca, hala, dayı, teyze, kuzenler… Bu kalabalığın hepsi senin ${A("أَقَارِبِي")} yani akrabalarındır. Arapça öğrenince bayram sofrasında herkesi Arapça tanıtabilirsin.</p></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Amca ile dayıya Arapçada aynı kelime denir.”</b> Hayır! Babanın erkek kardeşi ${A("عَمٌّ")}, annenin erkek kardeşi ${A("خَالٌ")} kelimesiyle söylenir. Türkçedeki gibi Arapçada da baba tarafı ile anne tarafı ayrı ayrı adlandırılır.</p></div>`},
{id:"a1s2",nav:"Baba tarafı, anne tarafı",html:`
<div class="eyebrow">Bölüm 2 · Geniş aile</div>
<h2>Baba tarafı mı, anne tarafı mı?</h2>
<p>Babanın kardeşleri ve annenin kardeşleri Arapçada ayrı kelimelerle söylenir. Bu dört kelime geniş ailenin temelidir.</p>
<div class="tbl sm"><table>
<tr><th>Taraf</th><th>Erkek</th><th>Kadın</th></tr>
<tr><td>Baba tarafı</td><td>${A("عَمٌّ")} amca</td><td>${A("عَمَّةٌ")} hala</td></tr>
<tr><td>Anne tarafı</td><td>${A("خَالٌ")} dayı</td><td>${A("خَالَةٌ")} teyze</td></tr>
</table></div>
<div class="rule">Baba tarafı = ${A("عَمٌّ")} · ${A("عَمَّةٌ")} &nbsp;|&nbsp; Anne tarafı = ${A("خَالٌ")} · ${A("خَالَةٌ")}</div>
<div class="widget"><div class="wh">Etkileşimli · Akraba kartları</div><div class="wb" data-w="akraba"></div></div>
<!--PAGE--><h2>Kuzenler nasıl söylenir?</h2>
<p>Arapçada “kuzen” için Türkçedeki gibi akrabalığı açıklayan söyleyişler kullanılır: “amcanın oğlu”, “teyzenin kızı”. Önce ${A("اِبْنُ")} (oğlu) ya da ${A("اِبْنَةُ")} (kızı) gelir, sonra akraba adı eklenir.</p>
<div class="tbl sm"><table>
<tr><th>Arapça</th><th>Türkçe</th></tr>
<tr><td>${A("اِبْنُ العَمِّ")}</td><td>amca oğlu</td></tr>
<tr><td>${A("اِبْنَةُ العَمَّةِ")}</td><td>hala kızı</td></tr>
<tr><td>${A("اِبْنُ الخَالِ")}</td><td>dayı oğlu</td></tr>
<tr><td>${A("اِبْنَةُ الخَالَةِ")}</td><td>teyze kızı</td></tr>
</table></div>
<div class="box know"><span class="bt">Din Kültürü ile bağlantı</span><p>Akrabalarla görüşmek, onları ziyaret edip hâl hatır sormak İslam'da çok önemlidir. Buna ${A("صِلَةُ الرَّحِمِ")} (sıla-i rahim, akrabalık bağını sürdürme) denir. Bayramlarda akraba ziyaretine gitmek bu güzel âdetin bir parçasıdır.</p></div>
<div class="box teach"><span class="bt">Ailenin tamamı</span><p>Kendi ailene bak: Hangi akrabaların baba tarafından, hangileri anne tarafından? Her birinin Arapçasını söyleyebilir misin?</p></div>`},
{id:"a1s3",nav:"“Benim” ve “bu”",html:`
<div class="eyebrow">Bölüm 3 · Tanıtma</div>
<h2>“Benim” demek için sona ${A("ـِي")} ekle</h2>
<p>Bir akrabanın “benim” olduğunu söylemek için kelimenin sonuna ${A("ـِي")} gelir. Böylece ${A("عَمٌّ")} (amca) kelimesi ${A("عَمِّي")} (amcam) olur. Kelimenin sonundaki tenvin (çift harekesi) düşer.</p>
<div class="tbl sm"><table>
<tr><th>Kelime</th><th>Benim</th><th>Türkçe</th></tr>
<tr><td>${A("أَبٌ")}</td><td>${A("أَبِي")}</td><td>babam</td></tr>
<tr><td>${A("أُمٌّ")}</td><td>${A("أُمِّي")}</td><td>annem</td></tr>
<tr><td>${A("جَدٌّ")}</td><td>${A("جَدِّي")}</td><td>dedem</td></tr>
<tr><td>${A("جَدَّةٌ")}</td><td>${A("جَدَّتِي")}</td><td>ninem</td></tr>
<tr><td>${A("عَمٌّ")}</td><td>${A("عَمِّي")}</td><td>amcam</td></tr>
<tr><td>${A("عَمَّةٌ")}</td><td>${A("عَمَّتِي")}</td><td>halam</td></tr>
<tr><td>${A("خَالٌ")}</td><td>${A("خَالِي")}</td><td>dayım</td></tr>
<tr><td>${A("خَالَةٌ")}</td><td>${A("خَالَتِي")}</td><td>teyzem</td></tr>
<tr><td>${A("أَخٌ")}</td><td>${A("أَخِي")}</td><td>erkek kardeşim, ağabeyim</td></tr>
<tr><td>${A("أُخْتٌ")}</td><td>${A("أُخْتِي")}</td><td>kız kardeşim, ablam</td></tr>
</table></div>
<div class="box know"><span class="bt">Dikkat</span><p>Sonu ${A("ـَةٌ")} ile biten kelimelerde ${A("ة")} harfi ${A("ت")} olur: ${A("جَدَّةٌ")} → ${A("جَدَّتِي")}, ${A("عَمَّةٌ")} → ${A("عَمَّتِي")}.</p></div>
<!--PAGE--><h2>Bu kim? ${A("هَذَا")} ve ${A("هَذِهِ")}</h2>
<p>Bir kişiyi tanıtırken “bu” demek için erkeklerde ${A("هَذَا")}, kadınlarda ${A("هَذِهِ")} kullanırız. “Bu kim?” sorusu ise ${A("مَنْ هَذَا؟")} (erkek için) ve ${A("مَنْ هَذِهِ؟")} (kadın için) şeklindedir.</p>
<div class="cards4">
 <div class="mini"><h4>${A("هَذَا جَدِّي.")}</h4><p>Bu dedem.</p></div>
 <div class="mini"><h4>${A("هَذِهِ جَدَّتِي.")}</h4><p>Bu ninem.</p></div>
 <div class="mini"><h4>${A("هَذَا عَمِّي.")}</h4><p>Bu amcam.</p></div>
 <div class="mini"><h4>${A("هَذِهِ خَالَتِي.")}</h4><p>Bu teyzem.</p></div>
</div>
<div class="rule">Erkek akraba = ${A("هَذَا")} · Kadın akraba = ${A("هَذِهِ")}</div>
<h3>Fotoğraf albümü diyaloğu</h3>
<div class="tbl sm"><table>
<tr><th>Arapça</th><th>Türkçe</th></tr>
<tr><td>${A("زَيْنَبُ: مَنْ هَذَا؟")}</td><td>Zeynep: Bu kim?</td></tr>
<tr><td>${A("أَحْمَدُ: هَذَا جَدِّي.")}</td><td>Ahmet: Bu dedem.</td></tr>
<tr><td>${A("زَيْنَبُ: وَمَنْ هَذِهِ؟")}</td><td>Zeynep: Peki bu kim?</td></tr>
<tr><td>${A("أَحْمَدُ: هَذِهِ خَالَتِي.")}</td><td>Ahmet: Bu teyzem.</td></tr>
</table></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Telefonundaki aile fotoğraflarını bir arkadaşına gösterirken “Bu kim?” sorusunu sık duyarsın. Arapçada da aynı şekilde ${A("مَنْ هَذَا؟")} diye sorar, ${A("هَذَا عَمِّي.")} diye cevap verirsin.</p></div>
<h3>Bende var: ${A("عِنْدِي")}</h3>
<div class="tbl sm"><table>
<tr><th>Arapça</th><th>Türkçe</th></tr>
<tr><td>${A("عِنْدِي عَمٌّ وَعَمَّةٌ.")}</td><td>Bir amcam ve bir halam var.</td></tr>
<tr><td>${A("هَلْ عِنْدَكَ عَمٌّ؟")}</td><td>Senin amcan var mı?</td></tr>
<tr><td>${A("نَعَمْ، عِنْدِي عَمٌّ.")}</td><td>Evet, amcam var.</td></tr>
<tr><td>${A("لَا، لَيْسَ عِنْدِي عَمٌّ.")}</td><td>Hayır, amcam yok.</td></tr>
</table></div>`},
{id:"a1s4",nav:"Meslekler",html:`
<div class="eyebrow">Bölüm 4 · Meslekler</div>
<h2>Meslekler: ${A("المِهَنُ")}</h2>
<p>Meslek, Arapçada ${A("مِهْنَةٌ")} kelimesiyle söylenir. Çoğulu ${A("مِهَنٌ")} olur. Aşağıdaki kartlarda 14 mesleği erkek ve kadın biçimiyle görebilirsin.</p>
<div class="widget"><div class="wh">Etkileşimli · Meslek kartları</div><div class="wb" data-w="meslek"></div></div>
<!--PAGE--><h2>Meslek adlarının kalıpları</h2>
<p>Meslek adlarına dikkatle bakarsan birbirine benzeyen kalıplar görürsün. Bunları fark etmek yeni meslek kelimelerini daha kolay ezberlemeni sağlar.</p>
<div class="cards4">
 <div class="mini"><h4>${A("مُـ")} ile başlayanlar</h4><p>${A("مُعَلِّمٌ")} öğretmen · ${A("مُمَرِّضٌ")} hemşire · ${A("مُهَنْدِسٌ")} mühendis · ${A("مُحَامٍ")} avukat</p></div>
 <div class="mini"><h4>Ortası şeddeli ${A("فَعَّال")}</h4><p>${A("طَبَّاخٌ")} aşçı · ${A("نَجَّارٌ")} marangoz · ${A("خَبَّازٌ")} fırıncı · ${A("خَيَّاطٌ")} terzi · ${A("فَلَّاحٌ")} çiftçi</p></div>
 <div class="mini"><h4>${A("فَاعِل")} kalıbı</h4><p>${A("سَائِقٌ")} şoför · ${A("بَائِعٌ")} satıcı</p></div>
 <div class="mini"><h4>${A("ـِيّ")} ile bitenler</h4><p>${A("شُرْطِيٌّ")} polis · ${A("جُنْدِيٌّ")} asker</p></div>
</div>
<h3>Kadın meslek sahibi</h3>
<p>Kadın biçimi için erkek biçiminin sonuna ${A("ـَةٌ")} eklenir. ${A("ـِيّ")} ile biten mesleklerde şedde de eklenir.</p>
<div class="tbl sm"><table>
<tr><th>Erkek</th><th>Kadın</th><th>Türkçe</th></tr>
<tr><td>${A("مُعَلِّمٌ")}</td><td>${A("مُعَلِّمَةٌ")}</td><td>öğretmen</td></tr>
<tr><td>${A("طَبِيبٌ")}</td><td>${A("طَبِيبَةٌ")}</td><td>doktor</td></tr>
<tr><td>${A("مُمَرِّضٌ")}</td><td>${A("مُمَرِّضَةٌ")}</td><td>hemşire</td></tr>
<tr><td>${A("شُرْطِيٌّ")}</td><td>${A("شُرْطِيَّةٌ")}</td><td>polis</td></tr>
</table></div>
<div class="box myth"><span class="bt">Yanlış bilinen</span><p><b>“Bazı meslekler sadece erkeklere aittir; kadınlar için kelime yoktur.”</b> Hayır! Arapçada her mesleğin kadın biçimi vardır. Kadın doktora ${A("طَبِيبَةٌ")}, kadın mühendise ${A("مُهَنْدِسَةٌ")} denir.</p></div>
<div class="box know"><span class="bt">İpucu</span><p>${A("طَبَّاخٌ")}, ${A("نَجَّارٌ")}, ${A("خَبَّازٌ")}, ${A("خَيَّاطٌ")}, ${A("فَلَّاحٌ")} kelimelerinin hepsinde ortadaki harf şeddelidir. Şeddeyi görünce bir zanaat mesleği olabileceğini düşünebilirsin.</p></div>`},
{id:"a1s5",nav:"Meslek konuşması",html:`
<div class="eyebrow">Bölüm 5 · Konuşalım</div>
<h2>Ailemin meslekleri</h2>
<p>Bir akrabanın mesleğini sorarken ${A("مَا مِهْنَةُ…؟")} (…nin mesleği ne?) kalıbını kullanırız. Cevap için akraba adının ardına meslek eklemek yeter.</p>
<div class="tbl sm"><table>
<tr><th>Arapça</th><th>Türkçe</th></tr>
<tr><td>${A("مَا مِهْنَةُ أَبِيكَ؟")}</td><td>Babanın mesleği ne?</td></tr>
<tr><td>${A("أَبِي طَبِيبٌ.")}</td><td>Babam doktor.</td></tr>
<tr><td>${A("وَمَا مِهْنَةُ أُمِّكَ؟")}</td><td>Peki annenin mesleği ne?</td></tr>
<tr><td>${A("أُمِّي مُعَلِّمَةٌ.")}</td><td>Annem öğretmen.</td></tr>
</table></div>
<div class="box know"><span class="bt">Kime soruyorsun?</span><p>Karşındaki erkekse ${A("ـكَ")} (${A("أَبِيكَ")}), kızsa ${A("ـكِ")} (${A("أَبِيكِ")}) kullanılır. “O” için erkekte ${A("هُوَ")}, kadında ${A("هِيَ")} dersin. Mesleği: ${A("مِهْنَتُهُ")} (onun, erkek) ve ${A("مِهْنَتُهَا")} (onun, kadın).</p></div>
<div class="tbl sm"><table>
<tr><th>Arapça</th><th>Türkçe</th></tr>
<tr><td>${A("مَنْ هَذَا؟ هَذَا عَمِّي.")}</td><td>Bu kim? Bu amcam.</td></tr>
<tr><td>${A("مَا مِهْنَتُهُ؟ هُوَ مُهَنْدِسٌ.")}</td><td>Mesleği ne? O mühendis.</td></tr>
<tr><td>${A("مَنْ هَذِهِ؟ هَذِهِ عَمَّتِي.")}</td><td>Bu kim? Bu halam.</td></tr>
<tr><td>${A("مَا مِهْنَتُهَا؟ هِيَ مُمَرِّضَةٌ.")}</td><td>Mesleği ne? O hemşire.</td></tr>
</table></div>
<!--PAGE--><h2>Nerede çalışıyor?</h2>
<p>Bir kişinin nerede çalıştığını anlatmak için ${A("يَعْمَلُ … فِي …")} (… … içinde çalışır) kalıbını kullanırız. Soru ise ${A("أَيْنَ يَعْمَلُ…؟")} (… nerede çalışıyor?) şeklindedir.</p>
<div class="tbl sm"><table>
<tr><th>Arapça</th><th>Türkçe</th></tr>
<tr><td>${A("يَعْمَلُ الطَّبِيبُ فِي المُسْتَشْفَى.")}</td><td>Doktor hastanede çalışır.</td></tr>
<tr><td>${A("يَعْمَلُ المُعَلِّمُ فِي المَدْرَسَةِ.")}</td><td>Öğretmen okulda çalışır.</td></tr>
<tr><td>${A("يَعْمَلُ الخَبَّازُ فِي المَخْبَزِ.")}</td><td>Fırıncı fırında çalışır.</td></tr>
<tr><td>${A("يَعْمَلُ الفَلَّاحُ فِي المَزْرَعَةِ.")}</td><td>Çiftçi çiftlikte çalışır.</td></tr>
<tr><td>${A("يَعْمَلُ الطَّبَّاخُ فِي المَطْعَمِ.")}</td><td>Aşçı restoranda çalışır.</td></tr>
<tr><td>${A("يَعْمَلُ النَّجَّارُ فِي الوَرْشَةِ.")}</td><td>Marangoz atölyede çalışır.</td></tr>
</table></div>
<div class="box life"><span class="bt">Günlük hayattan</span><p>Okulda “meslek tanıtım günü” düzenlendiğini düşün. Arkadaşına babasının ne iş yaptığını sorarsın: ${A("مَا مِهْنَةُ أَبِيكَ؟")} O da ${A("أَبِي نَجَّارٌ.")} diyerek cevap verir. Bu iki cümleyle sohbet başlamış olur.</p></div>
<div class="widget"><div class="wh">Etkileşimli · Cümle kurucu</div><div class="wb" data-w="cumle"></div></div>`},
{id:"a1s6",nav:"Hızlı tekrar",html:`
<div class="eyebrow">Bölüm 6 · Özet</div>
<h2>Bu temada öğrendiklerimiz</h2>
<div class="chain">
 <div class="st"><b>Aile</b><span>${A("أَبٌ")} ${A("أُمٌّ")} ${A("أَخٌ")} ${A("أُخْتٌ")} ${A("جَدٌّ")} ${A("جَدَّةٌ")}</span></div><span class="ar">→</span>
 <div class="st"><b>Geniş aile</b><span>Baba tarafı ${A("عَمٌّ")} ${A("عَمَّةٌ")}, anne tarafı ${A("خَالٌ")} ${A("خَالَةٌ")}</span></div><span class="ar">→</span>
 <div class="st"><b>Tanıtma</b><span>${A("هَذَا")} (erkek) · ${A("هَذِهِ")} (kadın) · ${A("ـِي")} (benim)</span></div><span class="ar">→</span>
 <div class="st"><b>Meslek</b><span>${A("مَا مِهْنَةُ…؟")} · kadın biçimi için ${A("ـَةٌ")}</span></div>
</div>
<div class="tbl sm"><table>
<tr><th>Kural</th><th>Örnek</th></tr>
<tr><td>“Benim” eki ${A("ـِي")}</td><td>${A("عَمٌّ")} → ${A("عَمِّي")}</td></tr>
<tr><td>Dişil ${A("ـَةٌ")}</td><td>${A("مُعَلِّمٌ")} → ${A("مُعَلِّمَةٌ")}</td></tr>
<tr><td>Dişilde ${A("ة")} → ${A("ت")}</td><td>${A("خَالَةٌ")} → ${A("خَالَتِي")}</td></tr>
<tr><td>Erkek ${A("هَذَا")}, kadın ${A("هَذِهِ")}</td><td>${A("هَذَا خَالِي.")} · ${A("هَذِهِ خَالَتِي.")}</td></tr>
</table></div>
<div class="box teach"><span class="bt">Kendini dene</span><p>Ailenden üç kişiyi seç. Her birini Arapça tanıt ve mesleğini söyle. Örnek: ${A("هَذَا خَالِي. هُوَ سَائِقٌ.")} (Bu dayım. O şoför.)</p></div>`}
],
/* ---------- PEKİŞTİRME İSTASYONU ---------- */
q:{
dy:[
{q:`${A("عَمٌّ")} kelimesi baba tarafından erkek akrabayı, yani amcayı anlatır.`,a:0,ex:`Baba tarafı: ${A("عَمٌّ")} amca, ${A("عَمَّةٌ")} hala.`},
{q:`${A("خَالٌ")} kelimesi “amca” demektir.`,a:1,ex:`${A("خَالٌ")} anne tarafından erkek akrabadır, yani dayı. Amca ${A("عَمٌّ")} kelimesiyle söylenir.`},
{q:`${A("جَدَّةٌ")} kelimesi “nine, büyükanne” anlamına gelir.`,a:0,ex:`${A("جَدٌّ")} dede, ${A("جَدَّةٌ")} ise nine ya da büyükanne demektir.`},
{q:`“Teyzem” Arapçada ${A("خَالَتِي")} şeklinde söylenir.`,a:0,ex:`${A("خَالَةٌ")} teyze demektir; sonuna ${A("ـِي")} gelince ${A("ة")} harfi ${A("ت")} olur: ${A("خَالَتِي")}.`},
{q:`“Halam” Arapçada ${A("خَالَتِي")} şeklinde söylenir.`,a:1,ex:`Hala ${A("عَمَّةٌ")}, “halam” ${A("عَمَّتِي")} olur. ${A("خَالَتِي")} teyzem demektir.`},
{q:`${A("هَذَا")} sözcüğü kadın akrabaları tanıtırken kullanılır.`,a:1,ex:`${A("هَذَا")} erkekler için, ${A("هَذِهِ")} kadınlar için kullanılır.`},
{q:`${A("هَذِهِ جَدَّتِي.")} cümlesi “Bu ninem.” anlamına gelir.`,a:0,ex:`${A("جَدَّتِي")} kadın olduğu için başına ${A("هَذِهِ")} gelmiştir.`},
{q:`“Benim” anlamı için kelimenin sonuna ${A("ـِي")} eklenir: ${A("أَخٌ")} → ${A("أَخِي")}.`,a:0,ex:`Doğru. Tenvin düşer ve ${A("ـِي")} gelir.`},
{q:`${A("مُعَلِّمَةٌ")} kelimesi kadın öğretmeni anlatır.`,a:0,ex:`Erkek öğretmen ${A("مُعَلِّمٌ")}, kadın öğretmen ${A("مُعَلِّمَةٌ")} olur.`},
{q:`${A("طَبِيبٌ")} kelimesi mesleği “aşçı” olan kişiyi anlatır.`,a:1,ex:`${A("طَبِيبٌ")} doktor demektir. Aşçı ${A("طَبَّاخٌ")} kelimesiyle söylenir.`},
{q:`${A("مَا مِهْنَةُ أَبِيكَ؟")} sorusu “Babanın mesleği ne?” anlamına gelir.`,a:0,ex:`${A("مِهْنَةٌ")} meslek, ${A("أَبِيكَ")} senin baban demektir.`},
{q:`Arapçada kadınlar için meslek adının kadın biçimi yoktur.`,a:1,ex:`Her mesleğin kadın biçimi vardır. Genellikle sona ${A("ـَةٌ")} eklenir.`}
],
test:[
{q:"Elif, annesinin erkek kardeşini tanıtmak istiyor. Hangi kelimeyi kullanmalıdır?",o:[A("عَمٌّ"),A("خَالٌ"),A("جَدٌّ"),A("أَخٌ")],a:1,ex:`Annenin erkek kardeşi dayıdır: ${A("خَالٌ")}. Amca ${A("عَمٌّ")} olur.`},
{q:"Aşağıdakilerden hangisi baba tarafındaki akrabaları gösterir?",o:[`${A("عَمٌّ")} · ${A("عَمَّةٌ")}`,`${A("خَالٌ")} · ${A("خَالَةٌ")}`,`${A("أَبٌ")} · ${A("أُمٌّ")}`,`${A("جَدٌّ")} · ${A("جَدَّةٌ")}`],a:0,ex:`Baba tarafı: amca ve hala (${A("عَمٌّ")} · ${A("عَمَّةٌ")}). Anne tarafı: dayı ve teyze.`},
{q:"Ahmet, fotoğraftaki ablasını tanıtmak istiyor. Hangi cümleyi söylemelidir?",o:[A("هَذَا أُخْتِي."),A("هَذِهِ أُخْتِي."),A("هَذِهِ أَخِي."),A("هَذَا أَخِي.")],a:1,ex:`Abla kadın olduğu için ${A("هَذِهِ")} kullanılır; kız kardeş ${A("أُخْتِي")} olur.`},
{q:"“Bu dayım.” cümlesinin Arapçası hangisidir?",o:[A("هَذَا خَالِي."),A("هَذِهِ خَالِي."),A("هَذَا خَالَتِي."),A("هَذِهِ عَمِّي.")],a:0,ex:`Dayı erkek olduğu için ${A("هَذَا")} gelir ve dayım ${A("خَالِي")} olur.`},
{q:`Seda arkadaşına ${A("مَا مِهْنَةُ أَبِيكَ؟")} diye sordu. Arkadaşının uygun cevabı hangisi olur?`,o:[A("أَبِي طَبِيبٌ."),A("هَذِهِ أُمِّي."),A("نَعَمْ، عِنْدِي عَمٌّ."),A("هَذَا جَدِّي.")],a:0,ex:`Soru babanın mesleğini soruyor, doğru cevap bir mesleği söyleyen ${A("أَبِي طَبِيبٌ.")} cümlesidir.`},
{q:"Fırında çalışıp ekmek pişiren kişi hangi meslek adıyla söylenir?",o:[A("خَبَّازٌ"),A("نَجَّارٌ"),A("خَيَّاطٌ"),A("سَائِقٌ")],a:0,ex:`${A("خَبَّازٌ")} fırıncı demektir. Marangoz ${A("نَجَّارٌ")}, terzi ${A("خَيَّاطٌ")}, şoför ${A("سَائِقٌ")} olur.`},
{q:"Hemşire olan teyzesini anlatmak isteyen Kerem hangi kelimeyi kullanmalıdır?",o:[A("مُمَرِّضٌ"),A("مُمَرِّضَةٌ"),A("مُعَلِّمَةٌ"),A("طَبِيبَةٌ")],a:1,ex:`Hemşire kadın olduğu için ${A("مُمَرِّضَةٌ")} kullanılır. ${A("مُمَرِّضٌ")} erkek hemşiredir.`},
{q:`${A("عِنْدِي عَمٌّ وَعَمَّةٌ.")} cümlesinin Türkçesi hangisidir?`,o:["Bir amcam ve bir halam var.","Dayım ve teyzem var.","Amcamın oğlu ve kızı var.","Dedem ve ninem var."],a:0,ex:`${A("عِنْدِي")} “bende var” demektir; ${A("عَمٌّ")} amca, ${A("عَمَّةٌ")} hala anlamına gelir.`},
{q:"Aşağıdaki meslek adlarının hangisinde şedde (ّ) yoktur?",o:[A("طَبَّاخٌ"),A("نَجَّارٌ"),A("سَائِقٌ"),A("خَيَّاطٌ")],a:2,ex:`${A("سَائِقٌ")} şoför ${A("فَاعِل")} kalıbındadır, şedde taşımaz. Diğer üç meslekte ortadaki harf şeddelidir.`},
{q:"Zeynep'in annesi öğretmendir. Zeynep annesinin mesleğini hangi cümleyle söyler?",o:[A("أُمِّي مُعَلِّمٌ."),A("أُمِّي مُعَلِّمَةٌ."),A("أَبِي مُعَلِّمَةٌ."),A("هَذَا أُمِّي مُعَلِّمَةٌ.")],a:1,ex:`Anne kadın olduğu için meslek adı da kadın biçimindedir: ${A("مُعَلِّمَةٌ")}.`}
],
match:[
{title:"Akrabalar",p:[[A("جَدٌّ"),"dede"],[A("جَدَّةٌ"),"nine, büyükanne"],[A("عَمٌّ"),"amca"],[A("عَمَّةٌ"),"hala"],[A("خَالٌ"),"dayı"],[A("خَالَةٌ"),"teyze"]]},
{title:"Meslek ve çalıştığı yer",p:[[A("طَبِيبٌ"),"hastane"],[A("مُعَلِّمٌ"),"okul"],[A("خَبَّازٌ"),"fırın"],[A("فَلَّاحٌ"),"çiftlik"],[A("طَبَّاخٌ"),"restoran"],[A("نَجَّارٌ"),"atölye"]]}
],
fill:{items:[
{t:"“Teyzem” anlamına gelen Arapça kelime ___ dir.",a:A("خَالَتِي")},
{t:"“Halam” anlamına gelen Arapça kelime ___ dir.",a:A("عَمَّتِي")},
{t:"“Dayım” anlamına gelen Arapça kelime ___ dir.",a:A("خَالِي")},
{t:"“Bu dedem.” cümlesinde “bu” için ___ kullanılır.",a:A("هَذَا")},
{t:"“Bu ninem.” cümlesinde “bu” için ___ kullanılır.",a:A("هَذِهِ")},
{t:"Kadın öğretmen Arapçada ___ diye söylenir.",a:A("مُعَلِّمَةٌ")},
{t:"Marangoz Arapçada ___ diye söylenir.",a:A("نَجَّارٌ")},
{t:"“Meslek” anlamına gelen Arapça kelime ___ dir.",a:A("مِهْنَةٌ")}
],extra:[A("عَمِّي"),A("خَبَّازٌ"),A("أُخْتِي"),A("أَقَارِبُ")]},
sira:[
{title:"Aile bireylerini büyükten küçüğe doğru (dede → baba → oğul → torun) sırala.",i:[`${A("جَدٌّ")} · dede`,`${A("أَبٌ")} · baba`,`${A("اِبْنٌ")} · oğul`,`${A("حَفِيدٌ")} · torun`]},
{title:"Fotoğraf albümü diyaloğunu doğru sıraya koy.",i:[`${A("مَنْ هَذَا؟")} · Bu kim?`,`${A("هَذَا عَمِّي.")} · Bu amcam.`,`${A("مَا مِهْنَتُهُ؟")} · Mesleği ne?`,`${A("هُوَ مُهَنْدِسٌ.")} · O mühendis.`]},
{title:"“Doktor hastanede çalışır.” cümlesini kur. (Arapça kelimeleri sağdan sola doğru sırala.)",i:[A("يَعْمَلُ"),A("الطَّبِيبُ"),A("فِي"),A("المُسْتَشْفَى")]}
],
det:[
{title:"Aile Albümü",story:"Elif, aile albümünde anneannesinin evindeki bir fotoğrafı gösteriyor. Fotoğraftaki kişiyi Arapça tanıtmak istiyor.",clues:["Bu kişi annesinin akrabasıdır.","Bu kişi bir erkektir.","Annesinin erkek kardeşidir."],q:"Elif bu kişiyi Arapçada hangi kelimeyle tanıtır?",o:[A("عَمِّي"),A("خَالِي"),A("خَالَتِي"),A("عَمَّتِي")],a:1,ex:`Annenin erkek kardeşi dayıdır, “dayım” ${A("خَالِي")} olur.`},
{title:"Babamın Kız Kardeşi",story:"Kerem, babasının doğum günü fotoğrafında bir kadını göstererek arkadaşına tanıtmak istiyor.",clues:["Bu kişi baba tarafından bir akrabadır.","Bu kişi bir kadındır.","Babasının kız kardeşidir."],q:"Kerem bu kişiyi Arapçada nasıl tanıtır?",o:[A("هَذِهِ خَالَتِي."),A("هَذِهِ عَمَّتِي."),A("هَذَا عَمِّي."),A("هَذِهِ جَدَّتِي.")],a:1,ex:`Babanın kız kardeşi halasıdır: ${A("عَمَّةٌ")}. Kadın olduğu için ${A("هَذِهِ")} ve ${A("عَمَّتِي")} kullanılır.`},
{title:"Sabah Ekmeği",story:"Zeynep'in komşusu sabah dörtte kalkıyor. Kapısının önünden sıcak ekmek kokuları geliyor.",clues:["Çalıştığı yerin adı ‘fırın’dır.","Un ile ekmek hamuru hazırlar.","Mahallenin sabah ekmeğini o pişirir."],q:"Zeynep'in komşusunun mesleği Arapçada hangisidir?",o:[A("نَجَّارٌ"),A("خَيَّاطٌ"),A("خَبَّازٌ"),A("فَلَّاحٌ")],a:2,ex:`Fırında ekmek pişiren kişi ${A("خَبَّازٌ")} yani fırıncıdır.`},
{title:"Defterdeki Hata",story:"Yusuf'un Arapça defterinde dört cümle var. Öğretmeni bir cümleyi kırmızı kalemle işaretlemiş.",clues:[`1. ${A("هَذِهِ جَدِّي.")}`,`2. ${A("هَذَا عَمِّي.")}`,`3. ${A("خَالَتِي مُعَلِّمَةٌ.")}`,`4. ${A("أَخِي طَبِيبٌ.")}`],q:"Hangi cümle hatalıdır?",o:["1. cümle","2. cümle","3. cümle","4. cümle"],a:0,ex:`${A("جَدِّي")} dedem (erkek) demektir; erkek için ${A("هَذَا")} kullanılır: ${A("هَذَا جَدِّي.")}`},
{title:"Kuzenimi Tanıtıyorum",story:"Tuna, doğum günü pastasının yanında duran kuzenini arkadaşlarına tanıtıyor.",clues:["Bu kişi bir erkektir.","Tuna'nın babasının erkek kardeşi onun babasıdır.","Tuna ile bu kişi kuzendir."],q:"Tuna bu kişiyi Arapçada nasıl tanıtır?",o:[A("هَذَا اِبْنُ عَمِّي."),A("هَذَا اِبْنُ خَالِي."),A("هَذِهِ اِبْنَةُ عَمِّي."),A("هَذَا أَخِي.")],a:0,ex:`Babanın erkek kardeşi amcadır. Amcanın oğlu ${A("اِبْنُ عَمِّي")} olur.`}
],
klasik:[
{q:"Baba tarafı ve anne tarafı akrabalarını Arapçada nasıl ayırırız? Her taraftan iki akrabayı Arapça ve Türkçe olarak yaz.",s:`Baba tarafı: ${A("عَمٌّ")} (amca) ve ${A("عَمَّةٌ")} (hala). Anne tarafı: ${A("خَالٌ")} (dayı) ve ${A("خَالَةٌ")} (teyze).`,p:[{t:"Baba tarafı: amca ve hala",k:["amca","hala"]},{t:"Anne tarafı: dayı ve teyze",k:["dayı","teyze"]},{t:"İki tarafı ayırdım",k:["baba tarafı","anne tarafı","baba","anne"]}]},
{q:"Ailenden iki kişiyi seç. İkisini de Arapça cümleyle tanıt ve mesleklerini söyle. Cümlelerinin Türkçesini de yaz. (Örnek: Bu babam. Babam doktor.)",s:`${A("هَذَا أَبِي. أَبِي طَبِيبٌ. هَذِهِ أُمِّي. أُمِّي مُعَلِّمَةٌ.")} (Bu babam. Babam doktor. Bu annem. Annem öğretmen.)`,p:[{t:"İki kişiyi tanıttım",k:["bu ","babam","annem","dedem","amcam","halam","dayım","teyzem"]},{t:"Meslek söyledim",k:["doktor","öğretmen","mühendis","hemşire","şoför","çiftçi","aşçı","polis","meslek"]}]},
{q:"Kadın ve erkek meslek adları arasında Arapçada nasıl bir fark vardır? İki örnek yaz.",s:`Kadın biçimi için sona ${A("ـَةٌ")} eklenir: ${A("مُعَلِّمٌ")} (erkek öğretmen) → ${A("مُعَلِّمَةٌ")} (kadın öğretmen), ${A("طَبِيبٌ")} → ${A("طَبِيبَةٌ")}. ${A("ـِيّ")} ile bitenlerde ${A("شُرْطِيٌّ")} → ${A("شُرْطِيَّةٌ")} olur.`,p:[{t:"Kuralı açıkladım",k:["ekle","son","kadın","dişil"]},{t:"İki örnek verdim",k:["öğretmen","doktor","polis","hemşire","mühendis"]}]},
{q:"Bir akrabanın mesleğini soran ve cevaplayan iki satırlık kısa bir diyalog yaz. Türkçesini de ekle.",s:`${A("مَا مِهْنَةُ عَمِّكَ؟")} (Amcanın mesleği ne?) — ${A("عَمِّي مُهَنْدِسٌ.")} (Amcam mühendis.)`,p:[{t:"Soru cümlesi",k:["meslek","mesleği","ne?"]},{t:"Cevap cümlesi",k:["amcam","dayım","babam","halam","teyzem","annem","dedem"]}]}
]
}
});
})();
