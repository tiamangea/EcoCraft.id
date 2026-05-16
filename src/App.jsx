import React, { useState, useEffect } from 'react';
import { 
  Home, Info, ShoppingCart, Recycle, Sparkles, MessageSquare, 
  Menu, X, ChevronRight, ChevronLeft, Leaf, Coins, CheckCircle, Package, MapPin, Search, Cpu, Link as LinkIcon,
  User, QrCode, Wallet, CalendarCheck, Star, Minus, Plus, Trash2, Camera, Ticket,
  Mail, Lock, Store, UploadCloud, Settings, MessageCircle, Truck, Crown, Receipt, ShieldCheck,
  History, HeadphonesIcon, CreditCard, Gift, Heart, Shield, Globe, HelpCircle, Smartphone, Fingerprint, Activity,
  Share2, MoreVertical, Newspaper, ExternalLink
} from 'lucide-react';

import logoKu from './assets/logo.png';
import bgKu from './assets/Background.jpeg';

// --- MOCK DATA (30 PRODUK UMKM KRIYA KAYU) ---
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Kursi Kayu Jati Minimalis - Tahan Rayap & Awet', price: 450000, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80', desc: 'Kursi buatan tangan dari kayu jati sisa potongan besar. Desain minimalis cocok untuk ruang tamu atau teras. Tahan lama dan sudah dilapisi anti rayap organik.', rating: 4.8, sold: 124, shop: 'Jati Berkah Jepara', stock: 15 },
  { id: 2, name: 'Meja Kopi Estetik (Coffee Table) Finishing Natural', price: 850000, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=600&q=80', desc: 'Meja tamu elegan dengan finishing natural ramah lingkungan. Serat kayu asli sangat menonjol. Cocok untuk tema rumah scandinavian atau rustic.', rating: 4.9, sold: 89, shop: 'EcoWood Studio', stock: 5 },
  { id: 3, name: 'Lampu Hias Serbuk Kayu Daur Ulang Estetik', price: 150000, img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80', desc: 'Produk daur ulang dari serbuk gergaji yang dipress dengan resin ramah lingkungan. Memberikan pendar cahaya yang hangat dan unik.', rating: 4.7, sold: 342, shop: 'Limbah Jadi Karya', stock: 42 },
  { id: 4, name: 'Rak Dinding Gantung Minimalis Serbaguna', price: 200000, img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=600&q=80', desc: 'Rak minimalis cocok untuk hiasan dinding ruang tamu. Terbuat dari papan kayu mahoni solid. Sudah termasuk baut dan paku beton.', rating: 4.6, sold: 215, shop: 'Kriya Nusantara', stock: 28 },
  { id: 5, name: 'Tatakan Gelas (Coaster) Potongan Kayu Rustic', price: 25000, img: 'https://images.unsplash.com/photo-1611080665942-886d34bba4ce?auto=format&fit=crop&w=600&q=80', desc: 'Tatakan gelas tahan panas dari potongan batang kayu asli. Kulit kayu dibiarkan natural di bagian tepinya.', rating: 4.9, sold: 1050, shop: 'EcoWood Studio', stock: 150 },
  { id: 6, name: 'Lemari Pakaian Kayu Mahoni 2 Pintu', price: 1250000, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', desc: 'Lemari pakaian kokoh dari kayu mahoni pilihan dengan ukiran simpel.', rating: 4.8, sold: 45, shop: 'Mebel Saudara', stock: 3 },
  { id: 7, name: 'Mangkok Kayu Mahoni Food Grade', price: 45000, img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c848?auto=format&fit=crop&w=600&q=80', desc: 'Mangkok kayu aman untuk makanan (food grade), cocok untuk smoothie bowl.', rating: 4.9, sold: 870, shop: 'Kriya Nusantara', stock: 88 },
  { id: 8, name: 'Jam Dinding Kayu Unik Bentuk Bulat', price: 120000, img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80', desc: 'Jam dinding estetik bergaya scandinavian dari kayu pinus.', rating: 4.7, sold: 320, shop: 'PineCraft ID', stock: 35 },
  { id: 9, name: 'Set Sendok Garpu Kayu Estetik Ramah Lingkungan', price: 35000, img: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=600&q=80', desc: 'Set alat makan kayu jati yang ringan dan mudah dibersihkan.', rating: 4.8, sold: 1200, shop: 'Jati Berkah Jepara', stock: 250 },
  { id: 10, name: 'Nampan Kayu Jati Elegan (Serving Tray)', price: 85000, img: 'https://images.unsplash.com/photo-1585501861053-cb20668f44de?auto=format&fit=crop&w=600&q=80', desc: 'Nampan kayu untuk menyajikan teh/kopi tamu dengan handle yang nyaman.', rating: 4.9, sold: 450, shop: 'Kriya Nusantara', stock: 65 },
  { id: 11, name: 'Meja Belajar Lipat Kayu Anak', price: 175000, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80', desc: 'Meja lipat praktis untuk anak belajar atau bekerja pakai laptop di kasur.', rating: 4.6, sold: 530, shop: 'Mebel Saudara', stock: 40 },
  { id: 12, name: 'Rak Sepatu Kayu Susun 3 Tingkat', price: 250000, img: 'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?auto=format&fit=crop&w=600&q=80', desc: 'Rak sepatu minimalis yang mampu menampung hingga 9 pasang sepatu.', rating: 4.7, sold: 280, shop: 'PineCraft ID', stock: 22 },
  { id: 13, name: 'Tempat Tisu Kayu Estetik Ruang Tamu', price: 55000, img: 'https://images.unsplash.com/photo-1624823523588-46ba0e44669d?auto=format&fit=crop&w=600&q=80', desc: 'Kotak tisu kayu dengan tekstur natural yang mempercantik meja tamu.', rating: 4.8, sold: 610, shop: 'EcoWood Studio', stock: 115 },
  { id: 14, name: 'Gantungan Baju Berdiri (Standing Hanger) Kayu', price: 185000, img: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=600&q=80', desc: 'Gantungan baju dan topi multifungsi untuk ditaruh di sudut kamar.', rating: 4.9, sold: 340, shop: 'Jati Berkah Jepara', stock: 18 },
  { id: 15, name: 'Talenan Dapur Kayu Mahoni Solid', price: 65000, img: 'https://images.unsplash.com/photo-1593926879836-ec1cbcd41bc3?auto=format&fit=crop&w=600&q=80', desc: 'Talenan tebal anti retak, cocok untuk memotong daging atau sayuran.', rating: 4.8, sold: 950, shop: 'Kriya Nusantara', stock: 80 },
  { id: 16, name: 'Nakas (Meja Samping Ranjang) Laci 2 Minimalis', price: 350000, img: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=600&q=80', desc: 'Meja kecil di sebelah kasur untuk menaruh lampu tidur dan buku.', rating: 4.7, sold: 175, shop: 'PineCraft ID', stock: 12 },
  { id: 17, name: 'Kursi Bar Kayu Tinggi (Bar Stool)', price: 275000, img: 'https://images.unsplash.com/photo-1508215885820-4585e5610208?auto=format&fit=crop&w=600&q=80', desc: 'Kursi bar estetik untuk meja dapur bersih (kitchen island).', rating: 4.6, sold: 88, shop: 'Jati Berkah Jepara', stock: 8 },
  { id: 18, name: 'Vas Bunga Kayu Rustic Kering', price: 75000, img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80', desc: 'Vas bunga dari sisa potongan kayu solid, cocok untuk dekorasi bunga kering.', rating: 4.9, sold: 410, shop: 'Limbah Jadi Karya', stock: 55 },
  { id: 19, name: 'Mainan Edukasi Anak (Puzzle Balok Kayu)', price: 45000, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80', desc: 'Mainan susun balok non-toxic, aman untuk anak belajar bentuk.', rating: 4.8, sold: 760, shop: 'EcoToys', stock: 120 },
  { id: 20, name: 'Kotak Pensil Meja Kayu Multifungsi', price: 30000, img: 'https://images.unsplash.com/photo-1598155523122-3842334d6c1f?auto=format&fit=crop&w=600&q=80', desc: 'Organizer alat tulis untuk merapikan meja kerja atau meja belajar.', rating: 4.7, sold: 520, shop: 'PineCraft ID', stock: 90 },
  { id: 21, name: 'Cermin Dinding Bingkai Kayu Bulat', price: 210000, img: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=600&q=80', desc: 'Cermin rias dinding dengan bingkai kayu jati belanda yang elegan.', rating: 4.9, sold: 310, shop: 'Kriya Nusantara', stock: 25 },
  { id: 22, name: 'Partisi Ruangan Kayu (Pembatas Ruang) Lipat', price: 750000, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80', desc: 'Pembatas ruangan lipat estetik untuk memisahkan ruang tamu dan ruang keluarga.', rating: 4.8, sold: 65, shop: 'Mebel Saudara', stock: 4 },
  { id: 23, name: 'Kursi Teras / Taman Lipat Portabel', price: 320000, img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80', desc: 'Kursi santai lipat untuk bersantai di teras rumah, mudah disimpan.', rating: 4.7, sold: 210, shop: 'Jati Berkah Jepara', stock: 15 },
  { id: 24, name: 'Kotak Perhiasan Kayu Ukiran Jepara', price: 150000, img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80', desc: 'Kotak simpan aksesoris dengan ukiran asli pengrajin Jepara bagian tutupnya.', rating: 4.9, sold: 195, shop: 'Jati Berkah Jepara', stock: 32 },
  { id: 25, name: 'Dipan Tempat Tidur Jati Ukuran Queen', price: 2500000, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80', desc: 'Rangka tempat tidur sangat kokoh dari full kayu jati pilihan.', rating: 4.9, sold: 24, shop: 'Mebel Saudara', stock: 2 },
  { id: 26, name: 'Rak Buku Sudut (Corner Shelf) Kayu', price: 195000, img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80', desc: 'Memanfaatkan sudut kosong rumah Anda untuk menaruh koleksi buku / foto.', rating: 4.6, sold: 180, shop: 'PineCraft ID', stock: 14 },
  { id: 27, name: 'Meja Makan Keluarga 4 Kursi Jati Belanda', price: 1850000, img: 'https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=600&q=80', desc: 'Set meja makan lengkap untuk keluarga kecil dengan desain Scandinavian.', rating: 4.8, sold: 55, shop: 'EcoWood Studio', stock: 5 },
  { id: 28, name: 'Nampan Sarapan Pagi Kayu (Bed Tray)', price: 135000, img: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=600&q=80', desc: 'Nampan dengan kaki lipat untuk menikmati sarapan nyaman di atas kasur.', rating: 4.9, sold: 285, shop: 'Kriya Nusantara', stock: 45 },
  { id: 29, name: 'Papan Nama Kayu Custom Ukir (Hiasan Pintu)', price: 65000, img: 'https://images.unsplash.com/photo-1584447128309-b66b7a4d1b63?auto=format&fit=crop&w=600&q=80', desc: 'Bisa custom nama Anda, cocok digantung di depan kamar atau pintu rumah.', rating: 4.8, sold: 740, shop: 'Limbah Jadi Karya', stock: 999 },
  { id: 30, name: 'Hiasan Dinding Geometris Kayu Daur Ulang', price: 250000, img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80', desc: 'Hiasan dinding eksklusif terbuat dari gabungan serbuk dan potongan kayu sisa.', rating: 4.7, sold: 110, shop: 'Limbah Jadi Karya', stock: 10 }
];

const BLOCKCHAIN_LOGS = [
  { id: '0x8f2a...3b1', date: '12 Mei 2026', type: 'Setor Serbuk Kayu', status: 'Selesai (Verified)', coins: '+50' },
  { id: '0x1c9d...9a4', date: '05 Mei 2026', type: 'Setor Potongan Papan', status: 'Didaur Ulang', coins: '+120' },
  { id: '0x4b7e...2f8', date: '20 Apr 2026', type: 'Pembelian Produk', status: 'Smart Contract Executed', coins: '-50' },
];

// --- MOCK DATA (BERITA UMKM TERKINI) ---
const BERITA_UMKM = [
  { id: 1, title: "Pemerintah Siapkan Kucuran Dana Rp 300 Triliun untuk KUR UMKM 2026", source: "Kemenkeu", date: "14 Mei 2026", excerpt: "Program pembiayaan ini diharapkan dapat mengakselerasi pertumbuhan UMKM di sektor kriya dan kuliner pasca krisis global.", link: "https://www.google.com/search?q=KUR+UMKM" },
  { id: 2, title: "Transformasi Digital: 80% UMKM Kriya Kini Gunakan Pembayaran QRIS", source: "Bank Indonesia", date: "12 Mei 2026", excerpt: "Kemudahan transaksi menjadi alasan utama para pengrajin lokal beralih ke pembayaran non-tunai di toko fisik maupun pameran.", link: "https://www.google.com/search?q=QRIS+UMKM" },
  { id: 3, title: "Ekspor Produk Kayu Olahan UMKM Jepara Tembus Pasar Eropa", source: "Kemendag", date: "10 Mei 2026", excerpt: "Desain ramah lingkungan dan sirkuler menjadi daya tarik utama mebel kayu asal Indonesia di mata konsumen internasional yang peduli lingkungan.", link: "https://www.google.com/search?q=Ekspor+Mebel+UMKM" },
  { id: 4, title: "Pelatihan AI untuk Pengrajin Kayu: Inovasi Desain Makin Cepat", source: "Kominfo", date: "08 Mei 2026", excerpt: "Pemanfaatan kecerdasan buatan mulai diadopsi oleh pelaku UMKM untuk memprediksi tren desain furnitur masa depan secara lebih akurat.", link: "https://www.google.com/search?q=AI+untuk+UMKM" },
  { id: 5, title: "Sertifikasi SVLK Gratis untuk 1000 UMKM Pengrajin Kayu", source: "KemenLHK", date: "05 Mei 2026", excerpt: "Langkah strategis pemerintah untuk memastikan sumber bahan baku legal dan lestari demi meningkatkan daya saing ekspor produk lokal.", link: "https://www.google.com/search?q=SVLK+UMKM+Kayu" },
  { id: 6, title: "Pameran Inacraft 2026 Hadirkan Ribuan Produk Kriya Kayu Daur Ulang", source: "Pameran Kita", date: "02 Mei 2026", excerpt: "Ajang pameran kerajinan terbesar se-Asia Tenggara ini kembali digelar dengan fokus utama pada produk-produk yang ramah lingkungan.", link: "https://www.google.com/search?q=Inacraft+2026" },
  { id: 7, title: "Kisah Sukses: Mantan Pegawai Kantoran Buka Usaha Kerajinan Serbuk Kayu", source: "Inspirasi Bisnis", date: "28 April 2026", excerpt: "Berawal dari hobi, pria asal Semarang ini sukses meraup omzet puluhan juta rupiah dari mengolah serbuk gergaji menjadi vas estetik.", link: "https://www.google.com/search?q=Kisah+Sukses+UMKM+Kerajinan+Kayu" },
  { id: 8, title: "Pentingnya Mendaftarkan Merek Dagang (HAKI) bagi UMKM Kriya", source: "Kemenkumham", date: "25 April 2026", excerpt: "Melindungi identitas bisnis dan desain produk dari plagiarisme sangat penting di era persaingan digital yang kian ketat.", link: "https://www.google.com/search?q=Merek+Dagang+HAKI+UMKM" }
];

// --- FUNGSI FORMAT RUPIAH GLOBAL ---
const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 

  const [activeTab, setActiveTab] = useState('home');
  
  // Global States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [coins, setCoins] = useState(250);
  const [ecoPayBalance, setEcoPayBalance] = useState(1250000);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, selected: true }];
    });
    showNotification(`${product.name} berhasil ditambahkan ke keranjang.`);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (!isAuthenticated) {
    return <AuthScreen setAuth={setIsAuthenticated} mode={authMode} setMode={setAuthMode} />;
  }

  const NavItem = ({ id, icon: Icon, label, badge }) => (
    <button
      onClick={() => { setActiveTab(id); }}
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === id ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
          {badge}
        </span>
      )}
    </button>
  );

  const MobileNavItem = ({ id, icon: Icon, label, badge }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${
        activeTab === id ? 'text-green-600' : 'text-gray-400 hover:text-green-500'
      }`}
    >
      <div className="relative">
        <Icon size={22} className={activeTab === id ? 'fill-current' : ''} />
        {badge > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1rem] text-center border border-white">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header & Navbar (Desktop Only untuk Menu Lengkap) */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <span className="font-bold text-2xl text-gray-800 tracking-tight">EcoCraft<span className="text-green-600">.id</span></span>
            </div>

            <nav className="hidden md:flex space-x-1">
              <NavItem id="home" icon={Home} label="Beranda" />
              <NavItem id="news" icon={Newspaper} label="Berita" />
              <NavItem id="cart" icon={ShoppingCart} label="Keranjang" badge={totalCartItems} />
              <NavItem id="waste" icon={Recycle} label="Tukar Limbah" />
              <NavItem id="ai" icon={Sparkles} label="AI Inovasi" />
            </nav>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <button 
                onClick={() => setActiveTab('store')} 
                className={`p-2 rounded-full transition-colors ${activeTab === 'store' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
                title="Toko Saya"
              >
                <Store size={22} />
              </button>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`p-2 rounded-full transition-colors flex items-center ${activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
                title="Profil Saya"
              >
                <User size={22} className="mr-1" /> <span className="text-sm font-semibold hidden md:block">Saya</span>
              </button>
            </div>

            {/* Tombol Keranjang untuk Mobile di Header */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={() => { setActiveTab('cart'); }} className="relative text-gray-600 p-2">
                <ShoppingCart size={24} />
                {totalCartItems > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalCartItems}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-xl z-[70] flex items-center animate-fade-in text-sm font-medium w-max max-w-[90vw]">
          <CheckCircle size={18} className="mr-2 text-green-400 flex-shrink-0" />
          <span className="truncate">{notification}</span>
        </div>
      )}

      {/* Main Content dengan padding bottom ekstra untuk space Bottom Nav di mobile */}
      <main className="flex-grow pb-20 md:pb-0">
        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} showNotification={showNotification} coins={coins} setCoins={setCoins} ecoPayBalance={ecoPayBalance} addToCart={addToCart} products={products} />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'store' && <MyStoreTab products={products} setProducts={setProducts} showNotification={showNotification} />}
        {activeTab === 'cart' && <CartTab cart={cart} setCart={setCart} showNotification={showNotification} setActiveTab={setActiveTab} ecoPayBalance={ecoPayBalance} setEcoPayBalance={setEcoPayBalance} coins={coins} setCoins={setCoins} />}
        {activeTab === 'profile' && <ShopeeStyleProfileTab showNotification={showNotification} setActiveTab={setActiveTab} coins={coins} ecoPayBalance={ecoPayBalance} cartCount={totalCartItems} setAuth={setIsAuthenticated} />}
        {activeTab === 'waste' && <WasteBlockchainTab coins={coins} setCoins={setCoins} showNotification={showNotification} />}
        {activeTab === 'ai' && <AITab />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between items-center h-[65px] z-40 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <MobileNavItem id="home" icon={Home} label="Beranda" />
        <MobileNavItem id="news" icon={Newspaper} label="Berita" />
        <MobileNavItem id="waste" icon={Recycle} label="Limbah" />
        <MobileNavItem id="ai" icon={Sparkles} label="AI" />
        <MobileNavItem id="profile" icon={User} label="Profil" />
      </nav>
    </div>
  );
}

// ================= TABS COMPONENTS =================

function HomeTab({ setActiveTab, showNotification, coins, setCoins, ecoPayBalance, addToCart, products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkedInDays, setCheckedInDays] = useState([1, 2, 3]); 
  const [selectedProduct, setSelectedProduct] = useState(null); // STATE UNTUK DETAIL PRODUK
  const [blockchainProduct, setBlockchainProduct] = useState(null); // STATE UNTUK BLOCKCHAIN TRACKER
  const [verificationProduct, setVerificationProduct] = useState(null); // STATE UNTUK POP-UP VERIFIKASI AWAL

  const CURRENT_DAY = 4; 
  const WEEK_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const HERO_BACKGROUND_IMAGE = bgKu;

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckInToday = () => {
    if (!checkedInDays.includes(CURRENT_DAY)) {
      setCheckedInDays([...checkedInDays, CURRENT_DAY]);
      setCoins(prev => prev + 25);
      showNotification("Cek-in Berhasil! +25 Koin ditambahkan ke dompet Anda.");
    }
  };

  const buyNow = (product) => {
    addToCart(product);
    setActiveTab('cart');
  };

  // FUNGSI DETEKSI OTOMATIS PRODUK DAUR ULANG ATAU BARU BERDASARKAN DESKRIPSI
  const isProductRecycled = (product) => {
    const keywords = ['sisa', 'daur ulang', 'serbuk', 'limbah', 'rustic', 'potongan'];
    const textToSearch = (product.name + " " + product.desc).toLowerCase();
    return keywords.some(kw => textToSearch.includes(kw));
  };

  // JIKA ADA PRODUK YANG DIPILIH, RENDER HALAMAN DETAIL PRODUK
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
        onAddToCart={() => addToCart(selectedProduct)} 
        onBuyNow={() => buyNow(selectedProduct)} 
      />
    );
  }

  // JIKA TIDAK ADA PRODUK YANG DIPILIH, RENDER BERANDA NORMAL
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white flex flex-col items-center pt-8 pb-12 px-4 md:pt-12 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={HERO_BACKGROUND_IMAGE} alt="Wood" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mb-8">
          <div className="flex bg-white rounded-lg overflow-hidden shadow-lg p-1 border-2 border-green-600">
            <Search size={22} className="text-green-600 ml-3 my-auto" />
            <input 
              type="text" 
              placeholder="Cari produk furnitur atau kriya kayu..." 
              className="outline-none w-full px-3 py-3 text-gray-800 text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if(e.target.value !== '') {
                  document.getElementById('katalog-produk')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-bold shadow-sm">
              Cari
            </button>
          </div>
        </div> 

        <div className="relative z-10 text-center max-w-2xl mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            Ubah Limbah Jadi Berkah, <br/> Belanja Lebih Murah
          </h1>
          <p className="text-sm md:text-lg text-green-100">
            "Mulai gaya hidup sirkular dari hal kecil. Ubah limbah Anda menjadi Koin Cerdas berbasis Blockchain untuk mendukung produk UMKM lokal."
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between w-full max-w-lg shadow-2xl">
          <button onClick={() => setShowQRScanner(true)} className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-xl transition">
            <div className="bg-white text-green-900 p-2.5 rounded-xl mb-2 shadow-sm group-hover:scale-110 transition-transform">
              <QrCode size={24}/>
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Scan QRIS</span>
          </button>
          <div className="w-px h-16 bg-white/20"></div>
          <button className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-xl transition">
            <div className="bg-blue-500 text-white p-2.5 rounded-xl mb-2 shadow-sm group-hover:scale-110 transition-transform relative">
              <Wallet size={24}/>
            </div>
            <span className="text-[10px] text-green-100 mb-0.5">Saldo EcoPay</span>
            <span className="text-xs font-bold text-white">{formatRp(ecoPayBalance)}</span>
          </button>
          <div className="w-px h-16 bg-white/20"></div>
          <button onClick={() => setShowCheckInModal(true)} className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-xl transition relative">
            {!checkedInDays.includes(CURRENT_DAY) && <span className="absolute top-2 right-6 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
            <div className="bg-yellow-400 text-yellow-900 p-2.5 rounded-xl mb-2 shadow-sm group-hover:scale-110 transition-transform">
              <CalendarCheck size={24}/>
            </div>
            <span className="text-[10px] text-green-100 mb-0.5">Total Koin</span>
            <span className="text-xs font-bold text-white">{checkedInDays.includes(CURRENT_DAY) ? 'Sudah Cek-in' : 'Cek-in Harian'}</span>
          </button>
        </div>
      </div>

      <div id="katalog-produk" className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Barang yang Anda cari tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)} // KLIK KARTU MASUK KE DETAIL
                className="bg-white rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col group cursor-pointer"
              >
                <div className="relative pb-[100%] overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80"; }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-2 md:p-3 flex flex-col flex-grow">
                  <h3 className="text-xs md:text-sm text-gray-800 line-clamp-2 min-h-[2.5rem] leading-tight mb-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
                  <div className="mt-auto">
                    <span className="text-green-600 font-bold text-sm md:text-base">{formatRp(product.price)}</span>
                    <div className="flex items-center text-[10px] md:text-xs text-gray-500 mt-1">
                      <Star size={10} className="text-yellow-400 fill-current mr-1"/>
                      <span>{product.rating}</span>
                      <span className="mx-1">|</span>
                      <span>{product.sold} Terjual</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="border border-green-600 text-green-600 p-1.5 rounded-sm hover:bg-green-50 transition flex items-center justify-center" title="Tambah ke Keranjang">
                        <ShoppingCart size={16}/>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setVerificationProduct(product); }} className="border border-teal-600 text-teal-600 p-1.5 rounded-sm hover:bg-teal-50 transition flex items-center justify-center" title="Cek Sertifikasi Bahan">
                        <ShieldCheck size={16}/>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); buyNow(product); }} className="bg-green-600 text-white flex-grow rounded-sm text-xs md:text-sm font-semibold hover:bg-green-700 transition">
                        Beli Langsung
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showQRScanner && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center animate-fade-in p-4">
          <button onClick={() => setShowQRScanner(false)} className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <X size={24} />
          </button>
          <h2 className="text-white text-xl font-bold mb-6 flex items-center"><QrCode className="mr-2"/> Scan QRIS</h2>
          <div className="relative w-64 h-64 md:w-80 md:h-80 border-2 border-white/50 rounded-2xl overflow-hidden bg-gray-800">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl m-2"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl m-2"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl m-2"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl m-2"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_3px_rgba(34,197,94,0.5)] animate-scan"></div>
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <Camera size={48} className="mb-2 opacity-50"/>
              <p className="text-sm">Arahkan kamera ke QR Code</p>
            </div>
          </div>
          <p className="text-gray-400 mt-6 text-sm max-w-xs text-center">Gunakan untuk pembayaran di merchant fisik UMKM Kriya Kayu.</p>
        </div>
      )}

      {showCheckInModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
            <button onClick={() => setShowCheckInModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-200 bg-white/20 hover:bg-white/30 rounded-full p-1.5 backdrop-blur-sm transition-all z-10">
              <X size={20} />
            </button>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 pt-8 text-center text-white relative">
              <h2 className="text-2xl font-bold mb-1">Cek-in Harian</h2>
              <p className="text-green-100 text-sm mb-4">Dapatkan koin gratis setiap hari!</p>
              <div className="bg-white/20 rounded-2xl py-2 px-5 inline-flex items-center backdrop-blur-sm border border-white/30 shadow-inner">
                <Coins className="mr-2 text-yellow-300" size={20} />
                <span className="font-bold text-xl">{coins}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center bg-green-50 rounded-xl p-3 mb-5 border border-green-200">
                {WEEK_DAYS.map((dayLabel, idx) => {
                  const dayNumber = idx + 1;
                  const isChecked = checkedInDays.includes(dayNumber);
                  const isToday = dayNumber === CURRENT_DAY;
                  const isFuture = dayNumber > CURRENT_DAY;

                  return (
                    <div key={dayLabel} className="flex flex-col items-center relative group">
                      <span className={`text-[10px] font-bold mb-1 ${isToday ? 'text-green-700' : 'text-gray-400'}`}>{dayLabel}</span>
                      <button 
                        onClick={() => isToday && !isChecked && handleCheckInToday()}
                        disabled={isFuture || isChecked || !isToday}
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                          ${isChecked ? 'bg-green-600 text-white shadow-sm' : ''}
                          ${isToday && !isChecked ? 'bg-white border-2 border-green-600 text-green-600 animate-pulse cursor-pointer hover:bg-green-50' : ''}
                          ${!isChecked && !isFuture ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
                        `}
                      >
                        {isChecked ? <CheckCircle size={18} /> : 
                         (isToday && !isChecked ? <Coins size={18} /> : dayNumber)}
                      </button>
                      {(!isChecked && !isFuture) && (
                        <span className="absolute -top-6 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          +25
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={handleCheckInToday}
                disabled={checkedInDays.includes(CURRENT_DAY)}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition shadow-md 
                  ${checkedInDays.includes(CURRENT_DAY) ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'}`}
              >
                {checkedInDays.includes(CURRENT_DAY) ? 'Sudah Cek-in Hari Ini' : 'Cek-in Sekarang (+25 Koin)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP VERIFIKASI BAHAN (BARU) */}
      {verificationProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-gray-100 transform transition-all scale-100">
            <button onClick={() => setVerificationProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-all z-20">
              <X size={20} />
            </button>
            
            {isProductRecycled(verificationProduct) ? (
              <div className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-green-50 rounded-b-[50%] -z-10"></div>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-green-100 shadow-lg relative z-10">
                  <Leaf className="text-green-500" size={48} />
                </div>
                <h2 className="text-xl font-extrabold text-green-800 mb-3 leading-tight">Terverifikasi<br/>Daur Ulang Ramah Lingkungan</h2>
                <p className="text-sm text-gray-600 mb-8 px-2">Produk <strong className="text-gray-800">{verificationProduct.name}</strong> dikerjakan dengan mengolah bahan limbah kayu dan jejaknya tercatat transparan di sistem blockchain kami.</p>
                <div className="flex gap-3">
                  <button onClick={() => setVerificationProduct(null)} className="w-1/3 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition text-sm">Kembali</button>
                  <button onClick={() => { setBlockchainProduct(verificationProduct); setVerificationProduct(null); }} className="w-2/3 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 shadow-md transition flex items-center justify-center text-sm">
                    <ShieldCheck size={18} className="mr-2" /> Lihat Blockchain
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-blue-50 rounded-b-[50%] -z-10"></div>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-blue-100 shadow-lg relative z-10">
                  <Package className="text-blue-500" size={48} />
                </div>
                <h2 className="text-xl font-extrabold text-blue-800 mb-3 leading-tight">Produk Baru<br/>(Premium Kriya)</h2>
                <p className="text-sm text-gray-600 mb-8 px-2">Produk <strong className="text-gray-800">{verificationProduct.name}</strong> dirakit menggunakan material kayu baru berkualitas tinggi (Bukan daur ulang). Tidak terdapat catatan riwayat limbah.</p>
                <button onClick={() => setVerificationProduct(null)} className="w-full py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition shadow-sm text-sm">Kembali ke Katalog</button>
              </div>
            )}
          </div>
        </div>
      )}

      {blockchainProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative border border-gray-100">
            <button onClick={() => setBlockchainProduct(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-all z-20">
              <X size={20} />
            </button>
            
            <div className="bg-green-50 p-6 border-b border-green-100 flex items-center relative overflow-hidden">
              <ShieldCheck className="text-green-600 mr-3 relative z-10" size={32} />
              <div className="relative z-10">
                <h2 className="text-lg font-bold text-green-800 leading-tight">Transparansi Daur Ulang</h2>
                <p className="text-xs text-green-600 font-medium">Sertifikasi Blockchain EcoCraft</p>
              </div>
              <Leaf className="absolute -right-4 -bottom-4 text-green-200 opacity-50" size={80} />
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">Jejak pengolahan limbah untuk produk:<br/><span className="text-gray-800 font-bold text-base">{blockchainProduct.name}</span></p>
              
              <div className="space-y-0 relative">
                {/* Garis vertikal penghubung */}
                <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-green-200"></div>
                
                <div className="relative pl-8 pb-6">
                  <div className="absolute w-6 h-6 bg-white border-2 border-green-500 rounded-full left-0 top-0 flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-gray-800 text-sm">Pengumpulan Limbah Kayu</div>
                    <span className="text-[9px] bg-green-100 border border-green-200 px-2 py-0.5 rounded text-green-700 font-bold">Verified</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-1">TxHash: <span className="text-teal-600 font-mono">0x{(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}...</span></div>
                  <div className="text-xs text-gray-600">Limbah disetorkan oleh Mitra UMKM ke Pusat Kriya.</div>
                </div>

                <div className="relative pl-8 pb-6">
                  <div className="absolute w-6 h-6 bg-white border-2 border-green-500 rounded-full left-0 top-0 flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-gray-800 text-sm">Proses Daur Ulang & Desain</div>
                    <span className="text-[9px] bg-green-100 border border-green-200 px-2 py-0.5 rounded text-green-700 font-bold">Verified</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-1">TxHash: <span className="text-teal-600 font-mono">0x{(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}...</span></div>
                  <div className="text-xs text-gray-600">Limbah diproses menjadi material dasar dan didesain ulang.</div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute w-6 h-6 bg-white border-2 border-green-500 rounded-full left-0 top-0 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                    <CheckCircle className="text-green-500" size={20} />
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-gray-800 text-sm">Produk Selesai Dibuat</div>
                    <span className="text-[9px] bg-green-100 border border-green-200 px-2 py-0.5 rounded text-green-700 font-bold">Verified</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-1">TxHash: <span className="text-teal-600 font-mono">0x{(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}...</span></div>
                  <div className="text-xs text-gray-600">Aset fisik selesai dibuat dan dicatat sebagai produk ramah lingkungan.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .animate-scan { animation: scan 3s linear infinite; }
      `}} />
    </div>
  );
}

// ================= HALAMAN DETAIL PRODUK (BARU) =================
function ProductDetail({ product, onBack, onAddToCart, onBuyNow }) {
  const mockReviews = [
    { name: "Budi P.", stars: 5, date: "12 Mei 2026", comment: "Barang sangat bagus, serat kayunya terlihat natural. Packing aman pakai kardus tebal." },
    { name: "Siti M.", stars: 5, date: "10 Mei 2026", comment: "Sesuai deskripsi, respon penjual cepat. Senang bisa dukung UMKM lokal lewat EcoCraft!" },
    { name: "Andi Wijaya", stars: 4, date: "05 Mei 2026", comment: "Bagus, tapi pengiriman agak lama karena custom. Secara keseluruhan puas." }
  ];

  const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');

  return (
    <div className="bg-gray-100 min-h-screen pb-20 animate-fade-in relative pt-4 md:pt-6">
      
      {/* HEADER NAVIGASI KEMBALI */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 mb-4 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all font-semibold text-sm shadow-sm"
        >
          <ChevronLeft size={18} className="mr-1" /> Kembali ke Katalog
        </button>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
            <Share2 size={18} />
          </button>
          <button className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-6 items-start px-0 md:px-0">
        
        {/* GAMBAR PRODUK */}
        <div className="w-full bg-white md:rounded-2xl overflow-hidden md:sticky md:top-20 shadow-sm border border-gray-100">
          <img 
            src={product.img} 
            alt={product.name} 
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80"; }}
            className="w-full aspect-square object-cover" 
          />
        </div>

        {/* DETAIL PRODUK */}
        <div className="space-y-2 md:space-y-4 md:pt-0 pt-2 px-4 md:px-0">
          
          <div className="bg-white p-4 md:rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center text-xs text-white bg-green-600 w-max px-2 py-0.5 rounded-sm mb-2 font-semibold">
              Star+
            </div>
            <h1 className="text-lg md:text-xl text-gray-800 leading-snug mb-2">{product.name}</h1>
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-3">{formatRp(product.price)}</div>
            
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <div className="flex items-center text-green-600 mr-4">
                <Star size={14} className="fill-current mr-1" />
                <span className="font-bold border-b border-green-600">{product.rating}</span>
              </div>
              <span className="mr-4">12 Penilaian</span>
              <span>{product.sold} Terjual</span>
              <button className="ml-auto text-gray-400 hover:text-red-500"><Heart size={20} /></button>
            </div>
          </div>

          <div className="bg-white p-4 md:rounded-2xl shadow-sm border border-gray-100 text-sm text-gray-700 space-y-4">
            <div className="flex items-start">
              <ShieldCheck size={20} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Garansi EcoCraft</p>
                <p className="text-xs text-gray-500">Bebas Pengembalian • Proteksi Kerusakan</p>
              </div>
            </div>
            <div className="flex items-start border-t border-gray-100 pt-4">
              <Truck size={20} className="text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="w-full">
                <p className="font-semibold text-gray-800 mb-1">Pengiriman</p>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Dikirim Ke</span>
                  <span className="font-medium text-gray-800">Kota Semarang</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Ongkos Kirim</span>
                  <span className="font-medium text-gray-800">Rp15.000 - Rp35.000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-lg mr-3 border border-green-200">
                {product.shop ? product.shop.charAt(0) : 'E'}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{product.shop || 'UMKM EcoCraft'}</h3>
                <p className="text-xs text-gray-500">Aktif 5 Menit Lalu</p>
                <div className="flex items-center text-[10px] text-gray-500 mt-1">
                  <MapPin size={10} className="mr-1"/> Kab. Jepara
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="text-xs border border-green-600 text-green-600 px-3 py-1.5 rounded hover:bg-green-50 transition">Chat Penjual</button>
              <button className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded flex items-center hover:bg-gray-50 transition"><Store size={12} className="mr-1"/> Kunjungi Toko</button>
            </div>
          </div>

          <div className="bg-white p-4 md:rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">Spesifikasi Produk</h3>
            <div className="text-sm text-gray-600 space-y-2 mb-6">
              <div className="flex"><span className="w-32 text-gray-500">Kategori</span><span className="text-green-600">Kriya Kayu & Furnitur</span></div>
              <div className="flex"><span className="w-32 text-gray-500">Material</span><span>Kayu Solid / Daur Ulang</span></div>
              <div className="flex"><span className="w-32 text-gray-500">Kondisi</span><span>Baru</span></div>
              <div className="flex"><span className="w-32 text-gray-500">Stok</span><span>{product.stock || 10} buah</span></div>
              <div className="flex"><span className="w-32 text-gray-500">Dikirim Dari</span><span>KAB. JEPARA - TAHUNAN</span></div>
            </div>

            <h3 className="font-bold text-gray-800 mb-3 border-t border-gray-100 pt-4">Deskripsi Produk</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {product.desc}
              <br/><br/>
              *Note: Karena ini adalah kerajinan kayu, corak dan serat kayu pada produk fisik mungkin sedikit berbeda dengan foto, namun hal ini menjamin keunikan setiap produk.*
              <br/>
              #EcoFriendly #KriyaKayu #UMKM #ZeroWaste
            </p>
          </div>

          <div className="bg-white p-4 md:rounded-2xl shadow-sm border border-gray-100 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Penilaian Produk</h3>
              <div className="flex items-center text-sm text-green-600">
                <Star size={14} className="fill-current mr-1" />
                <span className="font-bold mr-1">{product.rating}</span> <span className="text-gray-400 text-xs">/ 5</span>
                <ChevronRight size={16} className="text-gray-400 ml-2" />
              </div>
            </div>
            
            <div className="space-y-4 divide-y divide-gray-100">
              {mockReviews.map((review, idx) => (
                <div key={idx} className="pt-4 first:pt-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                      <span className="text-xs font-semibold text-gray-800">{review.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < review.stars ? "fill-current" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-green-600 text-xs font-semibold mt-4 py-2 border border-green-200 rounded hover:bg-green-50 transition">Lihat Semua Penilaian</button>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR (Sticky di bawah, z-[60] supaya menimpa bottom nav menu) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex items-center p-2 md:p-4 z-[60]">
        <div className="flex w-1/3 md:w-1/4">
          <button className="flex-1 flex flex-col items-center justify-center text-green-700 hover:bg-green-50 transition border-r border-gray-200">
            <MessageCircle size={20} strokeWidth={1.5} />
            <span className="text-[9px] mt-1">Chat</span>
          </button>
          <button onClick={onAddToCart} className="flex-1 flex flex-col items-center justify-center text-green-600 hover:bg-green-50 transition">
            <ShoppingCart size={20} strokeWidth={1.5} />
            <span className="text-[9px] mt-1">Keranjang</span>
          </button>
        </div>
        <div className="flex w-2/3 md:w-3/4 gap-2 pl-2">
          <button onClick={onBuyNow} className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-sm rounded-lg py-2.5 shadow-md hover:from-green-700 hover:to-green-800 transition">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= REDESAIN PROFIL & SETTINGS =================
function ShopeeStyleProfileTab({ showNotification, setActiveTab, coins, ecoPayBalance, cartCount, setAuth }) {
  const [currentView, setCurrentView] = useState('profile');

  const [user, setUser] = useState({
    name: "tiamangea...",
    email: "tiamangea@example.com",
    phone: "081234567890",
    followers: 0,
    following: 30,
    membership: "Gold",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
  });
  const [useFingerprint, setUseFingerprint] = useState(false);

  const [addresses, setAddresses] = useState([
    { id: 1, label: "Rumah", name: "Tia Mangea", phone: "081234567890", address: "Jl. Tahunan Raya No. 45, Kab. Jepara, Jawa Tengah" }
  ]);
  const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '' });
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [banks, setBanks] = useState([
    { id: 1, bankName: "SeaBank", accountNo: "901205388466", ownerName: "Tia Mangea" }
  ]);
  const [newBank, setNewBank] = useState({ bankName: 'BCA', accountNo: '', ownerName: '' });
  const [isAddingBank, setIsAddingBank] = useState(false);

  const [language, setLanguage] = useState('Indonesia');

  const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    showNotification("Informasi Keamanan Akun berhasil diperbarui.");
    setCurrentView('settings');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { id: Date.now(), label: "Alamat Baru", ...newAddress }]);
    setNewAddress({ name: '', phone: '', address: '' });
    setIsAddingAddress(false);
    showNotification("Alamat baru berhasil ditambahkan.");
  };

  const handleSaveBank = (e) => {
    e.preventDefault();
    setBanks([...banks, { id: Date.now(), ...newBank }]);
    setNewBank({ bankName: 'BCA', accountNo: '', ownerName: '' });
    setIsAddingBank(false);
    showNotification("Rekening bank berhasil ditambahkan.");
  };

  const handleLogout = () => {
    setAuth(false);
    showNotification("Anda telah berhasil keluar dari akun EcoCraft.id");
  };

  const SubHeader = ({ title }) => (
    <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10">
      <button onClick={() => currentView === 'settings' ? setCurrentView('profile') : setCurrentView('settings')} className="text-gray-600 hover:text-green-600 mr-3">
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    </div>
  );

  if (currentView === 'security') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Keamanan Akun" />
        <div className="bg-white mt-2 p-4">
          <form onSubmit={handleSaveSecurity} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Username (Tampil di Profil)</label>
              <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nomor Handphone</label>
              <div className="flex">
                <span className="bg-gray-100 border border-gray-300 border-r-0 rounded-l-lg p-3 text-sm text-gray-600">+62</span>
                <input type="tel" value={user.phone.substring(1)} onChange={e => setUser({...user, phone: '0'+e.target.value})} className="w-full border border-gray-300 rounded-r-lg p-3 text-sm focus:outline-none focus:border-green-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600" />
            </div>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <button type="button" className="w-full flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="flex items-center text-sm font-medium text-gray-700"><Lock size={18} className="mr-2 text-gray-500"/> Ganti Password</span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <span className="flex items-center text-sm font-medium text-gray-700"><Fingerprint size={18} className="mr-2 text-gray-500"/> Verifikasi Sidik Jari</span>
              <div className="relative cursor-pointer" onClick={() => setUseFingerprint(!useFingerprint)}>
                <input type="checkbox" className="sr-only" />
                <div className={`block w-10 h-6 rounded-full transition ${useFingerprint ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${useFingerprint ? 'translate-x-4' : ''}`}></div>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <button type="button" onClick={() => showNotification("Log Aktivitas: Terakhir login di perangkat Android, Semarang.")} className="w-full flex justify-between items-center text-left bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="flex flex-col">
                  <span className="flex items-center text-sm font-medium text-gray-700"><Activity size={18} className="mr-2 text-gray-500"/> Aktivitas Akun & Login</span>
                  <span className="text-[10px] text-gray-500 mt-1 ml-6">Periksa perangkat yang masuk.</span>
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg mt-4">Simpan Perubahan</button>
          </form>
        </div>
      </div>
    );
  }

  if (currentView === 'address') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Alamat Saya" />
        
        {isAddingAddress ? (
          <div className="bg-white mt-2 p-4">
            <h3 className="font-bold text-gray-800 mb-4">Tambah Alamat Baru</h3>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <input required type="text" placeholder="Nama Lengkap" value={newAddress.name} onChange={e=>setNewAddress({...newAddress, name: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600" />
              <input required type="tel" placeholder="Nomor Handphone" value={newAddress.phone} onChange={e=>setNewAddress({...newAddress, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600" />
              <textarea required rows="3" placeholder="Alamat Lengkap (Nama Jalan, Gedung, No. Rumah)" value={newAddress.address} onChange={e=>setNewAddress({...newAddress, address: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600"></textarea>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsAddingAddress(false)} className="w-1/2 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg">Batal</button>
                <button type="submit" className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-lg">Simpan</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="mt-2 space-y-2">
              {addresses.map(addr => (
                <div key={addr.id} className="bg-white p-4 flex flex-col border-b border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800 text-sm border-l-4 border-green-600 pl-2">{addr.label}</span>
                    <span className="text-green-600 text-xs font-semibold cursor-pointer">Ubah</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold text-gray-800 text-sm">{addr.name}</span> <span className="text-gray-500 text-sm">| {addr.phone}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{addr.address}</p>
                </div>
              ))}
            </div>
            <div className="p-4 mt-2">
              <button onClick={() => setIsAddingAddress(true)} className="w-full border-2 border-dashed border-green-600 text-green-600 font-bold py-3 flex justify-center items-center rounded-lg bg-green-50">
                <Plus size={20} className="mr-2" /> Tambah Alamat Baru
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (currentView === 'bank') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Kartu Bank / Rekening" />
        
        {isAddingBank ? (
          <div className="bg-white mt-2 p-4">
            <h3 className="font-bold text-gray-800 mb-4">Tambah Rekening Bank</h3>
            <form onSubmit={handleSaveBank} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Pilih Bank</label>
                <select value={newBank.bankName} onChange={e=>setNewBank({...newBank, bankName: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600 bg-white">
                  <option value="BCA">BCA</option><option value="Mandiri">Mandiri</option><option value="BNI">BNI</option><option value="BRI">BRI</option><option value="SeaBank">SeaBank</option><option value="BSI">BSI</option>
                </select>
              </div>
              <input required type="number" placeholder="Nomor Rekening" value={newBank.accountNo} onChange={e=>setNewBank({...newBank, accountNo: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600" />
              <input required type="text" placeholder="Nama Pemilik Rekening" value={newBank.ownerName} onChange={e=>setNewBank({...newBank, ownerName: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-green-600" />
              
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsAddingBank(false)} className="w-1/2 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg">Batal</button>
                <button type="submit" className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-lg">Simpan</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="mt-2">
              <p className="px-4 py-3 text-sm font-semibold text-gray-600 bg-white border-b border-gray-200">Rekening Bank Tersimpan</p>
              {banks.map(bank => (
                <div key={bank.id} className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-3 font-bold text-xs">{bank.bankName.substring(0,3).toUpperCase()}</div>
                    <div><h4 className="font-bold text-gray-800 text-sm">{bank.bankName}</h4><p className="text-gray-500 text-xs">*{bank.accountNo.slice(-4)} a.n {bank.ownerName}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 mt-2">
              <button onClick={() => setIsAddingBank(true)} className="w-full border border-green-600 text-green-600 font-bold py-3 flex justify-center items-center rounded-lg bg-white"><Plus size={20} className="mr-2" /> Tambah Rekening Bank</button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (currentView === 'language') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Bahasa" />
        <div className="bg-white mt-2">
          {['Bahasa Indonesia', 'English', 'Basa Jawa'].map((lang) => (
            <div key={lang} onClick={() => { setLanguage(lang); showNotification("Bahasa diubah ke "+lang); }} className="px-4 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <span className={`text-sm ${language === lang ? 'font-bold text-green-600' : 'text-gray-700'}`}>{lang}</span>
              {language === lang && <CheckCircle size={18} className="text-green-500" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'help') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Pusat Bantuan" />
        <div className="bg-white mt-2 p-6 flex flex-col items-center text-center">
          <HelpCircle size={64} className="text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Halo, ada yang bisa kami bantu?</h3>
          <p className="text-gray-500 text-sm mb-6">Tim dukungan pelanggan EcoCraft.id siap membantu keluhan tentang transaksi atau limbah Anda.</p>
          <button className="w-full flex items-center justify-center bg-gray-100 p-4 rounded-xl font-semibold text-gray-700 mb-3 hover:bg-gray-200"><MessageSquare size={20} className="mr-3 text-blue-500" /> Chat dengan CS (24/7)</button>
          <button className="w-full flex items-center justify-center bg-gray-100 p-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-200"><Mail size={20} className="mr-3 text-red-500" /> Email hmpssi@unisnu.ac.id</button>
        </div>
      </div>
    );
  }

  if (currentView === 'settings') {
    return (
      <div className="bg-gray-100 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Pengaturan Akun" />
        <div className="mt-2 bg-white">
          <div onClick={() => setCurrentView('security')} className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center"><Shield size={20} className="text-green-600 mr-3" /> <span className="text-sm font-medium text-gray-700">Keamanan Akun</span></div><ChevronRight size={16} className="text-gray-400" />
          </div>
          <div onClick={() => setCurrentView('address')} className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center"><MapPin size={20} className="text-blue-500 mr-3" /> <span className="text-sm font-medium text-gray-700">Alamat Saya</span></div><ChevronRight size={16} className="text-gray-400" />
          </div>
          <div onClick={() => setCurrentView('bank')} className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center"><CreditCard size={20} className="text-green-600 mr-3" /> <span className="text-sm font-medium text-gray-700">Kartu Bank / Rekening</span></div><ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
        <div className="mt-2 bg-white">
          <div onClick={() => setCurrentView('language')} className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center"><Globe size={20} className="text-teal-500 mr-3" /> <span className="text-sm font-medium text-gray-700">Bahasa</span></div><div className="flex items-center text-gray-400 text-xs"><span className="mr-2">{language}</span> <ChevronRight size={16} /></div>
          </div>
          <div onClick={() => setCurrentView('help')} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center"><HelpCircle size={20} className="text-purple-500 mr-3" /> <span className="text-sm font-medium text-gray-700">Pusat Bantuan</span></div><ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-10 animate-fade-in">
      <div className="bg-gradient-to-r from-green-800 to-green-600 pt-8 pb-4 px-4 text-white relative">
        <div className="flex justify-end space-x-4 mb-4">
          <Settings size={22} className="cursor-pointer hover:text-green-200 transition-transform hover:rotate-90" onClick={() => setCurrentView('settings')}/>
          <div className="relative cursor-pointer" onClick={() => setActiveTab('cart')}>
            <ShoppingCart size={22} className="hover:text-green-200" />
            {cartCount > 0 && <span className="absolute -top-1.5 -right-2 bg-white text-green-700 text-[10px] font-bold px-1.5 rounded-full">{cartCount}</span>}
          </div>
          <div className="relative cursor-pointer">
            <MessageCircle size={22} className="hover:text-green-200" />
            <span className="absolute -top-1.5 -right-2 bg-white text-green-700 text-[10px] font-bold px-1.5 rounded-full">99+</span>
          </div>
        </div>
        <div className="flex items-center">
          <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white/50 object-cover mr-4" />
          <div className="flex-grow">
            <div className="flex items-center"><h2 className="text-xl font-bold truncate max-w-[150px]">{user.name}</h2><div className="ml-2 bg-gray-100/20 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center border border-white/30">{user.membership} <ChevronRight size={12} className="ml-0.5"/></div></div>
            <div className="flex text-xs mt-1 text-white/90 space-x-3"><span><span className="font-bold">{user.following}</span> Mengikuti</span><span><span className="font-bold">{user.followers}</span> Pengikut</span></div>
          </div>
        </div>
        <div className="mt-5 bg-[#fff8e1] rounded-xl flex items-center justify-between px-3 py-2 text-sm shadow-sm cursor-pointer border border-[#ffe082]">
          <div className="flex items-center"><div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-[10px] font-black italic px-2 py-0.5 rounded flex items-center mr-2"><Crown size={10} className="mr-0.5" /> VIP</div><span className="text-[#a16c00] font-medium text-xs md:text-sm">Dengan VIP kamu sudah hemat <span className="font-bold text-green-700">Rp490.178</span></span></div><ChevronRight size={16} className="text-[#a16c00]" />
        </div>
      </div>
      <div className="bg-white mt-2">
        <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100"><h3 className="font-bold text-gray-800">Pesanan Saya</h3><button className="text-xs text-gray-500 flex items-center hover:text-green-600">Lihat Riwayat Pesanan <ChevronRight size={14} className="ml-1" /></button></div>
        <div className="flex justify-around py-4 text-xs text-gray-600">
          <div className="flex flex-col items-center cursor-pointer hover:text-green-600 group"><div className="mb-2 text-gray-700 group-hover:text-green-600 transition"><CreditCard size={28} strokeWidth={1.5} /></div><span>Belum Bayar</span></div>
          <div className="flex flex-col items-center cursor-pointer hover:text-green-600 group"><div className="mb-2 text-gray-700 group-hover:text-green-600 transition"><Package size={28} strokeWidth={1.5} /></div><span>Dikemas</span></div>
          <div className="flex flex-col items-center cursor-pointer hover:text-green-600 group"><div className="mb-2 text-gray-700 group-hover:text-green-600 transition"><Truck size={28} strokeWidth={1.5} /></div><span>Dikirim</span></div>
          <div className="flex flex-col items-center cursor-pointer hover:text-green-600 group relative"><div className="mb-2 text-gray-700 group-hover:text-green-600 transition"><Star size={28} strokeWidth={1.5} /></div><span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">17</span><span>Beri Penilaian</span></div>
        </div>
      </div>
      <div className="bg-white mt-2">
        <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100 cursor-pointer"><div className="flex items-center text-gray-800 text-sm font-medium"><Cpu size={20} className="text-teal-500 mr-3" /> Pelatihan AI Kriya Kayu</div><div className="flex items-center text-xs text-green-600">Diskon Pengguna Ba... <ChevronRight size={14} className="ml-1 text-gray-400" /></div></div>
        <div className="px-4 py-3 flex justify-between items-center cursor-pointer"><div className="flex items-center text-gray-800 text-sm font-medium"><Recycle size={20} className="text-green-500 mr-3" /> Tukar Limbah Daur Ulang</div><div className="flex items-center text-xs text-green-600">Gratis Ongkir <ChevronRight size={14} className="ml-1 text-gray-400" /></div></div>
      </div>
      <div className="bg-white mt-2">
        <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100"><h3 className="font-bold text-gray-800">Dompet Saya</h3></div>
        <div className="flex justify-around py-4 text-xs text-gray-600">
          <div className="flex flex-col items-center cursor-pointer w-1/4"><Wallet size={26} strokeWidth={1.5} className="mb-2 text-blue-600" /><span className="font-semibold text-gray-800 mb-0.5">EcoPay</span><span className="text-green-600">{formatRp(ecoPayBalance)}</span></div>
          <div className="flex flex-col items-center cursor-pointer w-1/4 relative"><div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></div><Coins size={26} strokeWidth={1.5} className="mb-2 text-yellow-500" /><span className="font-semibold text-gray-800 mb-0.5">Koin Eco</span><span className="text-green-600">Gratis {coins}RB!</span></div>
          <div className="flex flex-col items-center cursor-pointer w-1/4 relative"><div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></div><Ticket size={26} strokeWidth={1.5} className="mb-2 text-green-600" /><span className="font-semibold text-gray-800 mb-0.5">Voucher Saya</span><span className="text-green-600">50+ Voucher</span></div>
          <div className="flex flex-col items-center cursor-pointer w-1/4 relative text-center"><span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full z-10">Baru</span><ShieldCheck size={26} strokeWidth={1.5} className="mb-2 text-green-600" /><span className="font-semibold text-gray-800 mb-0.5">EcoPayLater</span><span className="text-green-600 leading-tight">Aktifkan s.d 5JT</span></div>
        </div>
      </div>
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-gray-800">Keuangan</h3><button className="text-xs text-gray-500 flex items-center hover:text-green-600">Lihat Semua <ChevronRight size={14} className="ml-1" /></button></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"><div className="flex items-center"><History size={20} className="text-blue-500 mr-2" /><span className="text-sm font-bold text-gray-800">Riwayat Limbah</span></div><ChevronRight size={14} className="text-gray-400" /></div>
          <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"><div className="flex items-center"><Gift size={20} className="text-green-600 mr-2" /><span className="text-sm font-bold text-gray-800">Tukar Hadiah</span></div><ChevronRight size={14} className="text-gray-400" /></div>
        </div>
      </div>
      <div className="bg-white mt-2 px-4 py-4 mb-6">
        <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-gray-800">Aktivitas Saya</h3><button className="text-xs text-gray-500 flex items-center hover:text-green-600">Lihat Semua <ChevronRight size={14} className="ml-1" /></button></div>
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => setActiveTab('store')} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-green-50 hover:bg-green-100 transition cursor-pointer"><div className="flex items-center"><Store size={22} className="text-green-600 mr-2" /><span className="text-sm font-bold text-gray-800">Toko Saya</span></div><ChevronRight size={14} className="text-gray-400" /></div>
          <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"><div className="flex items-center"><Heart size={20} className="text-pink-500 mr-2" /><div className="flex flex-col"><span className="text-sm font-bold text-gray-800">Favorit Saya</span><span className="text-[9px] text-gray-500">12 Produk</span></div></div><ChevronRight size={14} className="text-gray-400" /></div>
        </div>
      </div>
      <div className="px-4 pb-8">
        <button onClick={handleLogout} className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-50 hover:text-red-600 transition">Keluar (Logout)</button>
      </div>
    </div>
  );
}

// ================= LAYAR KERANJANG (CART) =================
function CartTab({ cart, setCart, showNotification, setActiveTab, ecoPayBalance, setEcoPayBalance, coins, setCoins }) {
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [useCoin, setUseCoin] = useState(false);

  const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');
  
  const toggleSelect = (id) => setCart(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  const allSelected = cart.length > 0 && cart.every(item => item.selected);
  const toggleSelectAll = () => setCart(prev => prev.map(item => ({ ...item, selected: !allSelected })));
  
  const updateQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const removeItem = (id) => { setCart(prev => prev.filter(item => item.id !== id)); showNotification("Barang dihapus dari keranjang."); };

  const selectedItems = cart.filter(item => item.selected);
  const totalSelectedQty = selectedItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 0 ? 50000 : 0; 
  
  const coinDiscount = useCoin ? Math.min(coins * 100, subtotal) : 0;
  const total = (subtotal + shipping) - coinDiscount - voucherDiscount;

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (voucherInput.toUpperCase() === 'ECOWCC') {
      setVoucherDiscount(20000); showNotification("Voucher ECOWCC berhasil digunakan! Diskon Rp 20.000");
    } else {
      setVoucherDiscount(0); showNotification("Kode voucher tidak valid atau telah kadaluarsa.");
    }
  };

  const handleCheckout = () => {
    if (totalSelectedQty === 0) return showNotification("Silakan centang minimal 1 barang untuk di-checkout.");
    if (ecoPayBalance >= total) {
      setEcoPayBalance(prev => prev - total);
      if (useCoin) setCoins(prev => prev - Math.ceil(coinDiscount / 100));
      setCart(prev => prev.filter(item => !item.selected));
      setVoucherInput(''); setVoucherDiscount(0); setUseCoin(false);
      showNotification("Pembayaran Berhasil via EcoPay! Pesanan sedang diproses.");
      setActiveTab('home');
    } else {
      showNotification("Saldo EcoPay tidak mencukupi!");
    }
  };

  if (cart.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      <ShoppingCart size={80} className="text-gray-200 mb-6" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Keranjang Belanja Kosong</h2>
      <button onClick={() => setActiveTab('home')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-sm mt-4 shadow-md transition-colors">Belanja Sekarang</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><ShoppingCart className="mr-3" /> Keranjang Saya</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm flex items-center">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="w-5 h-5 accent-green-600 rounded mr-4 cursor-pointer" />
            <span className="font-semibold text-gray-700">Pilih Semua ({cart.length} Produk)</span>
          </div>
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm flex items-center gap-4 relative">
              <input type="checkbox" checked={item.selected || false} onChange={() => toggleSelect(item.id)} className="w-5 h-5 accent-green-600 rounded cursor-pointer" />
              <img 
                src={item.img} 
                alt={item.name} 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80"; }}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded border border-gray-100" 
              />
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 pr-8 cursor-pointer" onClick={() => toggleSelect(item.id)}>{item.name}</h3>
                  <p className="text-green-600 font-bold mt-1">{formatRp(item.price)}</p>
                </div>
                <div className="flex items-center justify-between mt-3 md:mt-4">
                  <div className="flex items-center border border-gray-300 rounded-sm">
                    <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border-r border-gray-300"><Minus size={14}/></button>
                    <span className="px-4 py-1 text-sm font-semibold w-10 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border-l border-gray-300"><Plus size={14}/></button>
                  </div>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1 space-y-4 h-fit sticky top-24">
          <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center text-sm"><Ticket size={18} className="mr-2 text-green-600"/> Makin Hemat Pakai Voucher</h3>
            <form onSubmit={handleApplyVoucher} className="flex mb-4">
              <input type="text" placeholder="Masukkan Kode (cth: ECOWCC)" value={voucherInput} onChange={(e) => setVoucherInput(e.target.value)} className="flex-grow border border-gray-300 rounded-l-sm px-3 py-2 text-sm outline-none focus:border-green-600 uppercase" />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded-r-sm transition">Terapkan</button>
            </form>
            {voucherDiscount > 0 && <p className="text-xs text-green-600 font-medium mb-4">Berhasil! Diskon Rp {voucherDiscount.toLocaleString('id-ID')} diterapkan.</p>}
            <div className="w-full h-px bg-gray-100 mb-4"></div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setUseCoin(!useCoin)}>
              <div className="flex items-center">
                <Coins size={18} className="text-yellow-500 mr-2"/>
                <div><p className="text-sm font-semibold text-gray-800">Tukarkan {coins} Koin</p><p className="text-[10px] text-gray-500">Hemat Rp {(coins * 100).toLocaleString('id-ID')}</p></div>
              </div>
              <div className="relative">
                <input type="checkbox" checked={useCoin} readOnly className="sr-only" />
                <div className={`block w-10 h-6 rounded-full transition ${useCoin ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${useCoin ? 'translate-x-4' : ''}`}></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Ringkasan Belanja</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-4">
              <div className="flex justify-between"><span>Total Harga ({totalSelectedQty} barang)</span><span>{formatRp(subtotal)}</span></div>
              <div className="flex justify-between"><span>Total Ongkos Kirim</span><span>{formatRp(shipping)}</span></div>
              {voucherDiscount > 0 && <div className="flex justify-between text-green-600"><span>Diskon Voucher</span><span>-{formatRp(voucherDiscount)}</span></div>}
              {useCoin && <div className="flex justify-between text-yellow-600"><span>Potongan Koin</span><span>-{formatRp(coinDiscount)}</span></div>}
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg text-gray-800"><span>Total Tagihan</span><span className="text-green-600">{formatRp(Math.max(0, total))}</span></div>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-md mb-5">
              <div className="flex justify-between items-center text-sm"><span className="font-semibold text-blue-800 flex items-center"><Wallet size={16} className="mr-2"/> EcoPay</span><span className="font-bold text-blue-900">{formatRp(ecoPayBalance)}</span></div>
            </div>
            <button onClick={handleCheckout} disabled={totalSelectedQty === 0} className={`w-full font-bold py-3 rounded-sm shadow-sm transition-colors text-center text-base ${totalSelectedQty > 0 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Buat Pesanan ({totalSelectedQty})</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= LAYAR TOKO SAYA (UPLOAD PRODUK) =================
function MyStoreTab({ products, setProducts, showNotification }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleUploadProduct = (e) => {
    e.preventDefault();
    if (!imagePreview) return showNotification("Peringatan: Silakan unggah foto produk terlebih dahulu!");
    const newProduct = { id: Date.now(), name, price: parseInt(price), desc, img: imagePreview, rating: 0, sold: 0, stock: 10, shop: 'Toko Saya' };
    setProducts([newProduct, ...products]);
    showNotification(`Produk "${name}" berhasil diunggah ke katalog toko!`);
    setName(''); setPrice(''); setDesc(''); setImagePreview(null);
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showNotification("Produk berhasil dihapus dari toko Anda.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center mb-8">
        <Store className="text-green-600 h-8 w-8 mr-3" />
        <div><h1 className="text-3xl font-bold text-gray-800">Toko Saya</h1><p className="text-gray-600 text-sm mt-1">Kelola dan unggah produk UMKM Anda ke platform EcoCraft.id agar dapat dibeli pengguna lain.</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-100 pb-3 flex items-center"><UploadCloud className="mr-2 text-green-600" /> Tambah Produk Baru</h2>
            <form onSubmit={handleUploadProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto Produk</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                      <button type="button" onClick={() => setImagePreview(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X size={16} /></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center h-40"><Camera className="text-gray-400 mb-2" size={32} /><span className="text-sm text-gray-500 font-medium">Klik untuk foto</span><input type="file" accept="image/*" className="hidden" onChange={handleImageCapture} /></label>
                  )}
                </div>
              </div>
              <input required type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Nama Produk" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none" />
              <input required type="number" min="1000" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Harga (Rp)" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none" />
              <textarea required rows="3" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Deskripsi..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"></textarea>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors">Upload ke Katalog</button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-100 pb-3 flex justify-between items-center"><span>Produk yang Dijual ({products.length})</span></h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition gap-4">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80"; }}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg border border-gray-300 bg-white" 
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div><h3 className="font-bold text-gray-800 line-clamp-2">{product.name}</h3><p className="text-green-600 font-bold mt-1">{formatRp(product.price)}</p></div>
                    <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-3">
                      <div className="flex text-xs text-gray-500 gap-4"><span className="flex items-center"><Star size={12} className="text-yellow-400 mr-1" /> {product.rating || 'Baru'}</span><span>{product.sold} Terjual</span></div>
                      <button onClick={() => removeProduct(product.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center bg-red-50 px-3 py-1.5 rounded-lg"><Trash2 size={14} className="mr-1" /> Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WasteBlockchainTab({ coins, setCoins, showNotification }) {
  const [wasteType, setWasteType] = useState('serbuk');
  const [weight, setWeight] = useState('');

  const handlePickUp = (e) => {
    e.preventDefault();
    const earned = Math.floor(Math.random() * 50) + 10;
    setCoins(prev => prev + earned);
    showNotification(`Permintaan penjemputan masuk ke Jaringan Blockchain! Anda mendapat +${earned} Koin di muka.`);
    setWeight('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="relative bg-gradient-to-r from-green-900 to-green-800 text-white rounded-3xl pt-10 pb-12 px-6 md:pt-14 md:pb-16 mb-10 overflow-hidden shadow-xl text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={bgKu} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 tracking-tight">Tukar Limbah & Blockchain Tracker</h1>
          <p className="max-w-2xl mx-auto text-green-100 text-sm md:text-base leading-relaxed">
            Kami mengadopsi teknologi Blockchain untuk transparansi proses daur ulang. Tukar limbah usaha Anda, dapatkan Koin Gamifikasi, dan lacak progresnya secara aman.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center mb-6"><Package className="text-green-500 mr-3 h-8 w-8" /><h2 className="text-2xl font-bold text-gray-800">Form Penjemputan Limbah</h2></div>
          <form onSubmit={handlePickUp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Limbah</label>
              <select value={wasteType} onChange={(e) => setWasteType(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none">
                <option value="serbuk">Serbuk Gergaji Kayu</option><option value="potongan">Potongan Kayu Sisa</option><option value="bambu">Sisa Potongan Bambu</option><option value="kardus">Kardus / Kertas Kemasan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Perkiraan Berat (Kg)</label>
              <input type="number" required min="1" placeholder="Contoh: 10" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Penjemputan</label>
              <div className="relative"><MapPin className="absolute top-3 left-3 text-gray-400" size={20} /><textarea required rows="2" placeholder="Detail alamat usaha/rumah Anda..." className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"></textarea></div>
            </div>
            <button type="submit" className="w-full bg-green-900 hover:bg-green-800 text-white font-bold py-4 rounded-lg shadow-lg flex justify-center items-center">Request Penjemputan (Smart Contract) <ChevronRight className="ml-2" /></button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 text-yellow-900 shadow-md">
            <h3 className="font-bold text-xl mb-2 flex items-center"><Coins className="mr-2" /> Dompet Gamifikasi Anda</h3>
            <p className="mb-4 text-yellow-800 text-sm">Kumpulkan koin dari setiap gram limbah yang Anda setorkan untuk voucher UMKM.</p>
            <div className="bg-white/40 rounded-xl p-4 flex justify-between items-center backdrop-blur-sm"><span className="font-medium text-lg">Total Saldo:</span><span className="text-3xl font-black">{coins} <span className="text-sm font-normal">Koin</span></span></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 bg-green-50">
            <h3 className="font-bold text-green-800 mb-2 flex items-center"><Recycle className="mr-2 text-green-600"/> Dampak Lingkungan Anda</h3>
            <p className="text-sm text-green-700">
              Dengan menukarkan limbah, Anda telah berpartisipasi mengurangi jejak karbon. Pengolahan limbah menjadi barang jadi kini dapat dilacak langsung melalui fitur <b>Tracker Blockchain</b> yang tersedia di setiap kartu produk pada menu Beranda / Katalog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AITab() {
  const [chat, setChat] = useState([{ sender: 'ai', text: 'Halo! Saya AI Asisten EcoCraft.id. Ketik limbah UMKM apa yang Anda miliki, atau 📷 foto limbah tersebut, dan saya akan memberikan ide pelatihan pembuatan produk inovatif baru!' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !imagePreview) return;
    const userMsg = input; const sentImage = imagePreview;
    setChat(prev => [...prev, { sender: 'user', text: userMsg, image: sentImage }]);
    setInput(''); setImagePreview(null); setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = userMsg.toLowerCase();
      if (sentImage) aiResponse = `Berdasarkan analisis visual, limbah ini terlihat memiliki tekstur solid.\n\nSaran produk:\n1. Vas Bunga Rustic.\n2. Panel Dekorasi Dinding.`;
      else if (lowerInput.includes('serbuk')) aiResponse = "Serbuk gergaji bisa diolah menjadi Briket Biomassa atau Papan Partikel.";
      else aiResponse = `Limbah "${userMsg}" dapat diproses menggunakan teknik daur ulang komposit.`;
      setChat(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in flex flex-col h-[80vh]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center"><Sparkles className="text-purple-600 mr-2"/> AI Innovation Hub</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow p-4 md:p-6 overflow-y-auto bg-gray-50 space-y-4">
          {chat.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                {msg.sender === 'ai' && <div className="font-bold text-xs text-purple-600 mb-2 flex items-center"><Cpu size={14} className="mr-1"/> AI Assistant</div>}
                {msg.image && <img src={msg.image} alt="Uploaded waste" className="w-full max-h-64 object-cover rounded-xl mb-2 border border-white/20" />}
                {msg.text && <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">{msg.text}</p>}
              </div>
            </div>
          ))}
          {isTyping && <div className="flex justify-start"><div className="bg-white border p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-1 items-center"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div></div></div>}
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          {imagePreview && (
            <div className="mb-3 relative inline-block"><img src={imagePreview} className="h-20 w-20 object-cover rounded-lg border-2 border-purple-500" /><button onClick={()=>setImagePreview(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={14} /></button></div>
          )}
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <label className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-xl cursor-pointer flex items-center justify-center h-[50px] w-[50px] flex-shrink-0">
              <Camera size={24} /><input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageCapture} />
            </label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanya soal limbah ini..." className="flex-grow border border-gray-300 rounded-xl px-4 py-3 h-[50px] focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            <button type="submit" disabled={(!input.trim() && !imagePreview) || isTyping} className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-xl transition-colors font-bold h-[50px] flex items-center">Kirim</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ================= LAYAR BERITA (NEWS) =================
function NewsTab() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in min-h-[80vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-2">
          <Newspaper className="mr-3 text-green-600 h-8 w-8" /> 
          Berita UMKM Terkini
        </h1>
        <p className="text-gray-600">Informasi terbaru, kebijakan pemerintah, dan kisah inspiratif seputar Usaha Mikro Kecil dan Menengah di Indonesia.</p>
      </div>

      <div className="space-y-4">
        {BERITA_UMKM.map(berita => (
          <a 
            key={berita.id} 
            href={berita.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-400 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug">
                {berita.title}
              </h3>
              <ExternalLink size={20} className="text-gray-400 group-hover:text-green-600 flex-shrink-0 ml-4 mt-1" />
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
              <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase text-[10px]">
                {berita.source}
              </span>
              <span>•</span>
              <span className="font-medium">{berita.date}</span>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {berita.excerpt}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

// ================= LAYAR AUTENTIKASI (LOGIN & DAFTAR) =================
function AuthScreen({ setAuth, mode, setMode }) {
  // =========================================================================
  // GANTI LINK BACKGROUND LOGIN ANDA DI SINI
  // =========================================================================
  const BACKGROUND_LOGIN_URL = bgKu;
  const LOGO_LOGIN_URL = logoKu; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth(true);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex w-full max-w-4xl relative">
        <div className="hidden md:block w-1/2 bg-green-900 relative">
          <img src={BACKGROUND_LOGIN_URL} alt="Woodworking" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center z-10 bg-gradient-to-t from-green-900/90 to-transparent">
            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={LOGO_LOGIN_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-4xl font-extrabold mb-3 tracking-tight">EcoCraft<span className="text-green-400">.id</span></h2>
            <p className="text-lg text-green-100 font-medium">Solusi Belanja Kebutuhan Anda! Bersama EcoCraft.id Membantu UMKM Lebih Maju.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="md:hidden w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500 shadow-md">
              <img src={LOGO_LOGIN_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              {mode === 'login' ? 'Selamat Datang!' : 'Mulai Perjalananmu'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {mode === 'login' ? 'Masuk ke akun UMKM EcoCraft.id Anda.' : 'Daftar untuk mengelola toko dan limbah Anda.'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="animate-fade-in space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute top-3 left-3 text-gray-400" size={18} />
                    <input required type="text" placeholder="Misal: Budi Santoso" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha / Toko</label>
                  <div className="relative">
                    <Store className="absolute top-3 left-3 text-gray-400" size={18} />
                    <input required type="text" placeholder="Misal: Mebel Berkah Jaya" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50" />
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
                <input required type="email" placeholder="email@contoh.com" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
                <input required type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50" />
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors mt-6 text-lg">
              {mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <p>Belum punya akun? <button onClick={() => setMode('register')} className="text-green-600 font-bold hover:text-green-700 transition">Daftar di sini</button></p>
            ) : (
              <p>Sudah punya akun? <button onClick={() => setMode('login')} className="text-green-600 font-bold hover:text-green-700 transition">Masuk di sini</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}