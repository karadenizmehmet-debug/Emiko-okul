# Ders Rotası 6 — çalışma rehberi

6. sınıf öğrencileri için etkileşimli konu anlatımı + pekiştirme istasyonu. Türkiye Yüzyılı Maarif Modeli. Saf HTML/CSS/JS, derleme yok, GitHub Pages'ten yayınlanır. Yazar alanı her yerde: **Mehmet Karadeniz, 2026-2027**. Tüm içerik Türkçe.

## Yapı
- `index.html` — kabuk. Dokunmaya gerek yok.
- `css/style.css` — tüm tasarım (kareli defter zemini, açık/koyu tema).
- `js/core.js` — motor: ders seçimi, konu sayfalama, 7 istasyon, PDF indirme, yükleyici. Yeni tema eklerken DOKUNMA.
- `dersler/dersler.js` — ders listesi + `SURUM`. Yeni tema eklemenin tek kayıt noktası.
- `dersler/<ders>/parcalar.js` — o derse ait etkileşimli parçalar (`W.ad = el => {...}`).
- `dersler/<ders>/<tema>.js` — tek temanın tüm içeriği: `tema("<ders>", {...})`.
- `pdf/` — kara tahta PDF'leri, örnek yazılılar ve `<ders>-hap.pdf` (hap notlar).
- `hap/<ders>.json` — dersin hap not / ipucu / tuzak içeriği (tüm temalar). `araclar/hap_pdf.py` bu JSON'lardan `pdf/<ders>-hap.pdf` üretir.

## Yeni tema eklemek (token tasarrufu için sadece şunları oku)
1. Benzer bir tema dosyasının ilk ~40 satırına bak (ör. `dersler/fen/t1.js`), tüm motoru okuma.
2. `dersler/<ders>/<tN>.js` dosyasını yaz.
3. `dersler/dersler.js` içinde o dersin `temalar` listesine `"tN"` ekle, `SURUM`'u değiştir.
4. Yeni etkileşimli parça gerekiyorsa `dersler/<ders>/parcalar.js` sonuna `W.yeniParca=el=>{...}` ekle ve konuda `<div class="widget"><div class="wh">Etkileşimli · Başlık</div><div class="wb" data-w="yeniParca"></div></div>` ile çağır. `W` adları tüm derslerde benzersiz olmalı.
5. Kara tahta PDF'ini (ders notu) `pdf/<ders>-temaN.pdf` olarak koy. Örnek üretici: `araclar/tr_tema_pdf.py`, `araclar/ar_tema_pdf.py`.
6. **Hap notları güncelle:** `hap/<ders>.json` içindeki `temalar` listesine yeni temayı ekle (şablon aşağıda), sonra `python3 araclar/hap_pdf.py <ders>` çalıştır. PDF yeniden üretilir; ders ilk kez hap alıyorsa `dersler/dersler.js` içinde o derse `hap:{pdf:"pdf/<ders>-hap.pdf",ad:"...pdf"}` ekle. `SURUM`'u değiştir.

## Tema dosyası şablonu
```js
tema("fen",{
id:"t3", no:"3. Tema · 12 ders saati", ad:"Tema Adı", ozet:"Kısa özet",
pdf:"pdf/fen-tema3.pdf", pdfAd:"Fen6_Tema3_Ad.pdf", pdfSayfa:3,   // PDF yoksa bu üçünü sil
// ornek:{pdf:"pdf/...", ad:"....pdf", sayfa:7, soru:23},          // isteğe bağlı örnek yazılı
ic:'<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">...</svg>',
konu:[
 {id:"t3s1", nav:"İçindekiler adı", html:`
  <div class="eyebrow">Bölüm 1 · Giriş</div><h2>Başlık</h2><p>...</p>
  <div class="box life"><span class="bt">Günlük hayattan</span><p>...</p></div>
  <!--PAGE--><h2>Aynı bölümün 2. sayfası</h2>...`},
],
q:{
 det:[{title:"Vaka adı", story:"...", clues:["...","..."], q:"Soru?", o:["A","B","C","D"], a:0, ex:"Açıklama"}],
 dy:[{q:"İfade.", a:0, ex:"Açıklama"}],            // a: 0 = Doğru, 1 = Yanlış
 test:[{q:"Soru?", o:["A","B","C","D"], a:2, ex:"Açıklama"}],
 match:[{title:"Set adı", p:[["Kavram","Tanım"], ["Kavram","Tanım"]]}],
 fill:{items:[{t:"Cümle ___ devamı.", a:"kelime"}], extra:["çeldirici"]},
 sira:[{title:"Doğru sıraya koy.", i:["1. adım","2. adım","3. adım"]}],   // doğru sırayla yaz
 klasik:[{q:"Açık uçlu soru?", s:"Örnek cevap", p:[{t:"Ölçüt", k:["anahtar","kelime"]}]}]
}
});
```
Kutu sınıfları: `box life` (günlük hayat), `box myth` (yanlış bilinen), `box know` (biliyor musun / bilim tarihi), `box teach` (öğretmen notu / deney). Ayrıca `rule`, `cards4 > mini`, `tbl > table`, `chain`, `hl`.

## Hap notlar şablonu (`hap/<ders>.json` içindeki tema)
Hap not = **en can alıcı, olmazsa olmaz** bilgi. Kısa tut. Bir A4 sayfaya **2 tema** sığar (tek temalı ders tam sayfa olur); betik yazı ölçeğini otomatik ayarlar. Kara tahta tasarımı betikte sabittir.
```json
{"id":"t3","no":"3. Tema","ad":"Tema Adı","ikon":"gunes",
 "hap":["En çok 6-7 kısa madde. **Anahtar kelime** renkli tebeşir olur."],
 "tablo":{"b":"Başlık","h":["","Sütun 1","Sütun 2"],"s":[["a","b","c"]]},
 "zincir":{"b":"Sıra / çizgi","m":["1. adım","2. adım"]},
 "tuzak":[["Yanlış bilinen","Doğrusu"]],
 "ipucu":"Sınav ipucu (tek cümle)", "ezber":"**Böyle hatırla** (tek cümle)"}
```
`tablo` ve `zincir` isteğe bağlıdır (biri ya da ikisi). `ikon`: gunes, kuvvet, carpan, zar, grup, dunya, aile, hira, kalem (yenisi için `araclar/hap_pdf.py` içindeki `IKON` sözlüğüne SVG ekle). İçerik tema dosyasındaki konu anlatımıyla birebir uyumlu olmalı. Çalıştır: `python3 araclar/hap_pdf.py <ders>`. Gereksinim: google-chrome ve pypdf. Yazı tipleri `araclar/fontlar` altında (SIL OFL).

## Test
`python3 -m http.server` ile kökten aç; ders → tema → tüm konu sayfaları → 7 istasyon konsol hatası vermemeli.
