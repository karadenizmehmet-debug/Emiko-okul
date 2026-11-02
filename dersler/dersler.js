/* Ders Rotası 6 · Hazırlayan: Mehmet Karadeniz, 2026-2027 */
/* =====================================================================
   DERS LİSTESİ
   - Yeni tema eklemek: dersler/<ders>/<tema>.js dosyasını oluştur,
     sonra o dersin "temalar" listesine tema kimliğini ekle.
   - Yeni ders eklemek: aşağıdaki "Yakında" kaydının temalar listesini
     doldur; dersin etkileşimli parçaları varsa parcalar:true yap.
   - Her güncellemede SURUM'u değiştir (tarayıcı önbelleğini temizler).
   ===================================================================== */
const SURUM = "2026-11-02a";

const DERSLER = [
{id:"fen",ad:"Fen Bilimleri",kisa:"Fen",renk:"var(--amber)",acik:"Güneş sistemi, tutulmalar, kuvvet ve hareket.",
 parcalar:true, temalar:["t1","t2"]},
{id:"tr",ad:"Türkçe",kisa:"Tr",renk:"var(--d-tr)",acik:"Okuma, anlama, söz varlığı ve yazma.",
 temalar:[]},
{id:"mat",ad:"Matematik",kisa:"∑",renk:"var(--d-mat)",detAd:"Matematik Dedektifi",acik:"Çarpan ve katlar, bölünebilme, asal sayılar, EKOK-OBEB ve deneysel olasılık.",
 parcalar:true, temalar:["t1","t2"]},
{id:"sos",ad:"Sosyal Bilgiler",kisa:"SB",renk:"var(--d-sos)",acik:"Birey, toplum, kültür ve miras.",
 temalar:[]},
{id:"ing",ad:"İngilizce",kisa:"En",renk:"var(--d-ing)",acik:"Kelime, dinleme ve konuşma kalıpları.",
 temalar:[]},
{id:"din",ad:"Din Kültürü ve Ahlak Bilgisi",kisa:"DK",renk:"var(--d-din)",acik:"İnanç, ibadet, ahlak ve değerler.",
 temalar:[]},
{id:"ph",ad:"Peygamberimizin Hayatı",kisa:"PH",renk:"var(--d-ph)",detAd:"Siyer Dedektifi",acik:"Gençlik yılları, Hilfülfudul, Kâbe hakemliği, Hira ve ilk vahiy.",
 parcalar:true, temalar:["t1"]}
];
