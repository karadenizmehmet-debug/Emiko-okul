/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* =====================================================================
   DERS LİSTESİ
   - Yeni tema eklemek: dersler/<ders>/<tema>.js dosyasını oluştur,
     sonra o dersin "temalar" listesine tema kimliğini ekle.
   - Yeni ders eklemek: aşağıdaki "Yakında" kaydının temalar listesini
     doldur; dersin etkileşimli parçaları varsa parcalar:true yap.
   - Her güncellemede SURUM'u değiştir (tarayıcı önbelleğini temizler).
   ===================================================================== */
const SURUM = "2026-11-12-v1.4";
const VERSIYON = "v1.4";   // görünen sürüm: düzeltme +0.0.1, yeni tema/ders +0.1

const DERSLER = [
{id:"fen",ad:"Fen Bilimleri",kisa:"Fen",renk:"var(--amber)",acik:"Güneş sistemi, tutulmalar, kuvvet ve hareket.",
 parcalar:true, temalar:["t1","t2"],
 hap:{pdf:"pdf/fen-hap.pdf",ad:"Fen6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"tr",ad:"Türkçe",kisa:"Tr",renk:"var(--d-tr)",detAd:"Dil Dedektifi",acik:"Bağlamdan anlam, yüzey anlam, söz varlığı, yazıyı zenginleştirme, yazım ve noktalama.",
 parcalar:true, temalar:["t1"],
 hap:{pdf:"pdf/tr-hap.pdf",ad:"Turkce6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"mat",ad:"Matematik",kisa:"∑",renk:"var(--d-mat)",detAd:"Matematik Dedektifi",acik:"Çarpan ve katlar, bölünebilme, asal sayılar, EKOK-OBEB ve deneysel olasılık.",
 parcalar:true, temalar:["t1","t2"],
 hap:{pdf:"pdf/mat-hap.pdf",ad:"Mat6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"sos",ad:"Sosyal Bilgiler",kisa:"SB",renk:"var(--d-sos)",detAd:"Sosyal Dedektif",acik:"Gruplar ve roller, millî değerler, konum, doğal-beşerî çevre ve Türk dünyası.",
 parcalar:true, temalar:["t1","t2"],
 hap:{pdf:"pdf/sos-hap.pdf",ad:"SosyalBilgiler6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"ing",ad:"İngilizce",kisa:"En",renk:"var(--d-ing)",detAd:"English Dedektifi",acik:"School Life: okuldaki görevler, rutinler, millî günler; present simple ve sıklık zarfları.",
 parcalar:true, temalar:["t1"],
 hap:{pdf:"pdf/ing-hap.pdf",ad:"Ingilizce6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"din",ad:"Din Kültürü ve Ahlak Bilgisi",kisa:"DK",renk:"var(--d-din)",detAd:"İnanç Dedektifi",acik:"Vahiy ve gönderiliş amacı, ilahi kitaplar, Felak suresi.",
 parcalar:true, temalar:["t1"],
 hap:{pdf:"pdf/din-hap.pdf",ad:"DinKulturu6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"ar",ad:"Arapça",kisa:"ع",renk:"var(--d-ar)",detAd:"Kelime Dedektifi",acik:"Aile ve akrabalar, meslekler, kendini ve ailesini tanıtma.",
 parcalar:true, temalar:["t1"],
 hap:{pdf:"pdf/ar-hap.pdf",ad:"Arapca6_Hap_Notlar_ve_Ipuclari.pdf"}},
{id:"ph",ad:"Peygamberimizin Hayatı",kisa:"PH",renk:"var(--d-ph)",detAd:"Siyer Dedektifi",acik:"Gençlik yılları, Hilfülfudul, Kâbe hakemliği, Hira ve ilk vahiy.",
 parcalar:true, temalar:["t1"],
 hap:{pdf:"pdf/ph-hap.pdf",ad:"PeygamberimizinHayati6_Hap_Notlar_ve_Ipuclari.pdf"}}
];
