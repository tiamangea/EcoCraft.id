import React, { useState, useEffect } from 'react';
import { 
  Home, Info, ShoppingCart, Recycle, Sparkles, MessageSquare, 
  Menu, X, ChevronRight, ChevronLeft, Leaf, Coins, CheckCircle, Package, MapPin, Search, Cpu, Link as LinkIcon,
  User, QrCode, Wallet, CalendarCheck, Star, Minus, Plus, Trash2, Camera, Ticket,
  Mail, Lock, Store, UploadCloud, Settings, MessageCircle, Truck, Crown, Receipt, ShieldCheck,
  History, HeadphonesIcon, CreditCard, Gift, Heart, Shield, Globe, HelpCircle, Smartphone, Fingerprint, Activity,
  Share2, MoreVertical, Newspaper, ExternalLink, Factory, Hammer, ArrowLeft, TrendingUp, Users, CheckSquare, Edit, Phone
} from 'lucide-react';

// =========================================================================
// PENTING: SAAT DI-COPY KE VS CODE, HAPUS 2 BARIS LINK ONLINE DI BAWAH INI,
// LALU GANTI MENJADI IMPORT LOKAL SEPERTI INI:
// import logoKu from './assets/logo.png';
// import bgKu from './assets/Background.jpeg';
// =========================================================================
import logoKu from './assets/logo.png';
import bgKu from './assets/Background.jpeg';
// --- DATA PRODUK LENGKAP ---
// --- DATA PRODUK LENGKAP (LINK GAMBAR 100% VALID & SESUAI JUDUL) ---
const INITIAL_PRODUCTS = [
  { 
    id: 1, name: 'Set Sendok Garpu Kayu Mahoni', price: 45000, rating: 4.8, sold: 340, category: 'Dapur', isRecycled: true, 
    img: 'https://dekayu.id/wp-content/uploads/2021/06/2020_0316_14335400.jpg', 
    desc: 'Set peralatan makan kayu daur ulang food-grade yang elegan.', shop: 'UMKM EcoCraft', stock: 15 
  },
  { 
    id: 2, name: 'Kursi Kayu Jati Minimalis', price: 450000, rating: 4.9, sold: 120, category: 'Furnitur', isRecycled: false, 
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80', 
    desc: 'Kursi santai dari kayu jati baru pilihan dengan finishing natural.', shop: 'UMKM EcoCraft', stock: 5 
  },
  { 
    id: 3, name: 'Meja Kopi Estetik (Limbah Palet)', price: 250000, rating: 4.7, sold: 85, category: 'Furnitur', isRecycled: true, 
    img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=600&q=80', 
    desc: 'Meja kopi bergaya industrial rustic yang diolah dari limbah palet berkualitas.', shop: 'UMKM EcoCraft', stock: 12 
  },
  { 
    id: 4, name: 'Jam Tangan Kayu Eboni', price: 350000, rating: 4.9, sold: 210, category: 'Aksesoris', isRecycled: false, 
    img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80', 
    desc: 'Jam tangan eksklusif dari kayu eboni asli yang ringan dan stylish.', shop: 'UMKM EcoCraft', stock: 8 
  },
  { 
    id: 5, name: 'Rak Dinding Hexagon Gantung', price: 120000, rating: 4.6, sold: 450, category: 'Dekorasi', isRecycled: true, 
    img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80', 
    desc: 'Rak dinding unik untuk tanaman atau hiasan, dibuat dari sisa potongan kayu mebel.', shop: 'UMKM EcoCraft', stock: 30 
  },
  { 
    id: 6, name: 'Mainan Edukasi Anak (Balok Kayu)', price: 85000, rating: 4.8, sold: 310, category: 'Mainan', isRecycled: false, 
    img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80', 
    desc: 'Mainan anak susun balok, dicat dengan pewarna air non-toxic yang aman.', shop: 'UMKM EcoCraft', stock: 45 
  },
  { 
    id: 7, name: 'Nampan Saji Kayu Pinus (Tray)', price: 65000, rating: 4.5, sold: 180, category: 'Dapur', isRecycled: true, 
    img: 'https://dekayu.id/wp-content/uploads/2021/08/Nampan-Kayu-Pinus.jpg', 
    desc: 'Nampan saji estetik dari limbah kayu pinus yang dikeringkan sempurna.', shop: 'UMKM EcoCraft', stock: 20 
  },
  { 
    id: 8, name: 'Lampu Meja Hias Rustic', price: 185000, rating: 4.7, sold: 95, category: 'Dekorasi', isRecycled: true, 
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80', 
    desc: 'Lampu tidur dengan dudukan kayu daur ulang bernuansa hangat.', shop: 'UMKM EcoCraft', stock: 15 
  },
  { 
    id: 9, name: 'Talenan Dapur Kayu Mahoni Solid', price: 55000, rating: 4.9, sold: 540, category: 'Dapur', isRecycled: false, 
    img: 'https://down-id.img.susercontent.com/file/id-11134207-7r98t-lysipyslixqd73_tn', 
    desc: 'Talenan tebal anti retak, terbuat dari kayu mahoni baru.', shop: 'Kriya Nusantara', stock: 80 
  },
  { 
    id: 10, name: 'Tatakan Gelas (Coaster) Potongan Kayu', price: 25000, rating: 4.8, sold: 890, category: 'Dekorasi', isRecycled: true, 
    img: 'https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/img/product-1/2020/6/18/664925355/664925355_ed3325fc-c329-4646-86af-0e4b8daa101c_1860_1860.jpg~tplv-aphluv4xwc-resize-jpeg:700:0.jpeg?lk3s=0ccea506&x-expires=1779021155&x-signature=AYuPWRemAUcMjY5dyBVtNQ%2BbH6I%3D&x-signature-webp=r0%2Bch%2B7XOROk%2FV2ykobAnf1GVFo%3D', 
    desc: 'Tatakan gelas dari sisa ranting/batang kayu asli. Estetik dan alami.', shop: 'PineCraft ID', stock: 150 
  }
];

const BERITA_UMKM = [
  { id: 1, title: "Pemerintah Siapkan Kucuran Dana Rp 300 Triliun untuk KUR UMKM 2026", source: "Kemenkeu", date: "14 Mei 2026", excerpt: "Program pembiayaan ini diharapkan dapat mengakselerasi pertumbuhan UMKM di sektor kriya dan kuliner pasca krisis global.", link: "#" },
  { id: 2, title: "Transformasi Digital: 80% UMKM Kriya Kini Gunakan Pembayaran QRIS", source: "Bank Indonesia", date: "12 Mei 2026", excerpt: "Kemudahan transaksi menjadi alasan utama para pengrajin lokal beralih ke pembayaran non-tunai di toko fisik maupun pameran.", link: "#" },
  { id: 3, title: "Ekspor Produk Kayu Olahan UMKM Jepara Tembus Pasar Eropa", source: "Kemendag", date: "10 Mei 2026", excerpt: "Desain ramah lingkungan dan sirkuler menjadi daya tarik utama mebel kayu asal Indonesia di mata konsumen internasional yang peduli lingkungan.", link: "#" }
];

const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');

export default function App() {
  const [userRole, setUserRole] = useState(null); // 'buyer' atau 'seller'
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [coins, setCoins] = useState(250);
  const [ecoPayBalance, setEcoPayBalance] = useState(1250000);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  // Info Toko Penjual (Ditampilkan di Beranda/Tentang Pembeli)
  const [shopInfo, setShopInfo] = useState({
    username: "UMKM EcoCraft.id",
    email: "admin@ecocraft.id",
    phone: "081234567890",
    description: "WOODISHKAYU adalah UMKM Kriya Kayu asal Jepara yang berdedikasi menciptakan karya furnitur dan dekorasi ramah lingkungan. Kami memadukan seni ukir tradisional dengan teknologi sirkuler untuk masa depan yang lebih hijau.",
    visi: "Menjadi pelopor UMKM Kriya Kayu sirkuler terbesar di Indonesia yang mengurangi jejak karbon melalui pemanfaatan limbah kayu secara maksimal.",
    misi: "1. Memberdayakan pengrajin lokal Jepara dengan inovasi digital.\n2. Mengolah 100% sisa produksi menjadi produk bernilai guna.\n3. Mengedukasi masyarakat tentang pentingnya gaya hidup ramah lingkungan melalui furnitur berkelanjutan."
  });

  useEffect(() => {
    if (userRole) setActiveTab('home');
  }, [userRole]);

  if (!userRole) {
    return <AuthScreen setUserRole={setUserRole} />;
  }

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const addToCart = (product) => {
    if (userRole === 'seller') return; 
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1, selected: true }];
    });
    showNotification(`${product.name} ditambahkan ke keranjang.`);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const NavItem = ({ id, icon: Icon, label, badge, hidden }) => {
    if (hidden) return null;
    return (
      <button onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }} className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${activeTab === id ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}>
        <Icon size={16} />
        <span className="font-medium text-sm hidden lg:block">{label}</span>
        {badge > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">{badge}</span>}
      </button>
    );
  };

  const MobileNavItem = ({ id, icon: Icon, label, badge, hidden }) => {
    if (hidden) return null;
    return (
      <button onClick={() => setActiveTab(id)} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === id ? 'text-green-600' : 'text-gray-400 hover:text-green-500'}`}>
        <div className="relative">
          <Icon size={22} className={activeTab === id ? 'fill-current' : ''} />
          {badge > 0 && <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">{badge}</span>}
        </div>
        <span className="text-[10px] font-bold mt-1">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* LOGO (TANPA DAUN) */}
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <span className="font-extrabold text-2xl text-gray-800 tracking-tight">EcoCraft<span className="text-green-600">.id</span></span>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex space-x-1">
              {userRole === 'buyer' ? (
                <>
                  <NavItem id="home" icon={Home} label="Beranda" />
                  <NavItem id="catalog" icon={Store} label="Katalog" />
                  <NavItem id="contact" icon={Phone} label="Kontak" />
                  <NavItem id="waste" icon={Recycle} label="Tukar Limbah" />
                </>
              ) : (
                <>
                  <NavItem id="home" icon={Home} label="Beranda" />
                  <NavItem id="news" icon={Newspaper} label="Berita" />
                  <NavItem id="ai" icon={Sparkles} label="AI Inovasi" />
                  <NavItem id="store" icon={UploadCloud} label="Toko (Upload)" />
                </>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              {userRole === 'buyer' && (
                <button onClick={() => setActiveTab('cart')} className={`relative p-2 rounded-full transition-colors ${activeTab === 'cart' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`} title="Keranjang">
                  <ShoppingCart size={22} />
                  {totalCartItems > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">{totalCartItems}</span>}
                </button>
              )}
              <button onClick={() => setActiveTab('profile')} className={`p-2 rounded-full transition-colors flex items-center ${activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`} title="Profil Saya">
                <User size={22} className="mr-1" /> <span className="text-sm font-semibold">Profil</span>
              </button>
            </div>

            {/* MOBILE BURGER */}
            <div className="md:hidden flex items-center space-x-3">
              {userRole === 'buyer' && (
                <button onClick={() => setActiveTab('cart')} className="relative text-gray-600">
                  <ShoppingCart size={24} />
                  {totalCartItems > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">{totalCartItems}</span>}
                </button>
              )}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 bg-gray-100 p-1.5 rounded-lg">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2 shadow-lg absolute w-full left-0 z-50">
            {userRole === 'buyer' ? (
              <>
                <NavItem id="home" icon={Home} label="Beranda" />
                <NavItem id="catalog" icon={Store} label="Katalog" />
                <NavItem id="contact" icon={Phone} label="Kontak" />
                <NavItem id="waste" icon={Recycle} label="Tukar Limbah" />
                <NavItem id="cart" icon={ShoppingCart} label="Keranjang" badge={totalCartItems} />
              </>
            ) : (
              <>
                <NavItem id="home" icon={Home} label="Beranda" />
                <NavItem id="news" icon={Newspaper} label="Berita UMKM" />
                <NavItem id="ai" icon={Sparkles} label="Pelatihan AI" />
                <NavItem id="store" icon={UploadCloud} label="Toko (Upload)" />
              </>
            )}
            <NavItem id="profile" icon={User} label="Profil Saya" />
          </div>
        )}
      </header>

      {/* GLOBAL NOTIFICATION */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-[70] flex items-center animate-fade-in text-sm font-medium w-max max-w-[90vw]">
          <CheckCircle size={18} className="mr-2 text-green-400 flex-shrink-0" />
          <span className="truncate">{notification}</span>
        </div>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-grow pb-20 md:pb-8">
        {userRole === 'buyer' && activeTab === 'home' && <HomeBuyerTab setActiveTab={setActiveTab} shopInfo={shopInfo} coins={coins} setCoins={setCoins} ecoPayBalance={ecoPayBalance} showNotification={showNotification} />}
        {userRole === 'buyer' && activeTab === 'catalog' && <CatalogTab products={products} role={userRole} addToCart={addToCart} setActiveTab={setActiveTab} />}
        {userRole === 'buyer' && activeTab === 'contact' && <ContactTab shopInfo={shopInfo} />}
        {userRole === 'buyer' && activeTab === 'cart' && <CartTab cart={cart} setCart={setCart} showNotification={showNotification} setActiveTab={setActiveTab} ecoPayBalance={ecoPayBalance} setEcoPayBalance={setEcoPayBalance} coins={coins} setCoins={setCoins} />}
        {userRole === 'buyer' && activeTab === 'waste' && <WasteTab coins={coins} setCoins={setCoins} showNotification={showNotification} />}
        {userRole === 'buyer' && activeTab === 'profile' && <ShopeeStyleProfileTab role={userRole} setAuth={setUserRole} showNotification={showNotification} shopInfo={shopInfo} setShopInfo={setShopInfo} setActiveTab={setActiveTab} coins={coins} ecoPayBalance={ecoPayBalance} cartCount={totalCartItems} />}

        {userRole === 'seller' && activeTab === 'home' && <SellerHomeTab products={products} setProducts={setProducts} showNotification={showNotification} setActiveTab={setActiveTab} coins={coins} setCoins={setCoins} ecoPayBalance={ecoPayBalance} />}
        {userRole === 'seller' && activeTab === 'news' && <NewsTab />}
        {userRole === 'seller' && activeTab === 'ai' && <AITab />}
        {userRole === 'seller' && activeTab === 'store' && <UploadProductTab products={products} setProducts={setProducts} showNotification={showNotification} shopInfo={shopInfo} />}
        {userRole === 'seller' && activeTab === 'profile' && <ShopeeStyleProfileTab role={userRole} setAuth={setUserRole} showNotification={showNotification} shopInfo={shopInfo} setShopInfo={setShopInfo} setActiveTab={setActiveTab} coins={coins} ecoPayBalance={ecoPayBalance} cartCount={totalCartItems} />}
      </main>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between items-center h-[65px] z-40 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {userRole === 'buyer' ? (
          <>
            <MobileNavItem id="home" icon={Home} label="Beranda" />
            <MobileNavItem id="catalog" icon={Store} label="Katalog" />
            <MobileNavItem id="waste" icon={Recycle} label="Limbah" />
            <MobileNavItem id="cart" icon={ShoppingCart} label="Keranjang" badge={totalCartItems} />
            <MobileNavItem id="profile" icon={User} label="Profil" />
          </>
        ) : (
          <>
            <MobileNavItem id="home" icon={Home} label="Beranda" />
            <MobileNavItem id="news" icon={Newspaper} label="Berita" />
            <MobileNavItem id="store" icon={UploadCloud} label="Upload" />
            <MobileNavItem id="ai" icon={Sparkles} label="AI" />
            <MobileNavItem id="profile" icon={User} label="Profil" />
          </>
        )}
      </nav>
    </div>
  );
}

// ================= KOMPONEN TAB PEMBELI =================

/* 1. HALAMAN BERANDA PEMBELI (HERO + TENTANG VISI MISI) */
function HomeBuyerTab({ setActiveTab, shopInfo, coins, setCoins, ecoPayBalance, showNotification }) {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkedInDays, setCheckedInDays] = useState([1, 2, 3]); 
  const CURRENT_DAY = 4; 
  const WEEK_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const handleCheckInToday = () => {
    if (!checkedInDays.includes(CURRENT_DAY)) {
      setCheckedInDays([...checkedInDays, CURRENT_DAY]);
      setCoins(prev => prev + 25);
      showNotification("Cek-in Berhasil! +25 Koin ditambahkan ke dompet Anda.");
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Hero Section & Widget */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white pt-16 pb-24 px-4 relative overflow-hidden">
        <img src={bgKu} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/90"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 leading-tight">Ubah Limbah Jadi Berkah,<br/>Belanja Lebih Murah</h1>
          <p className="text-base md:text-lg text-green-100 mb-10 max-w-2xl mx-auto font-medium">Platform ssirkular UMKM. Dukung UMKM lebih baik dengan mengelola limbah dan memanfaatkannya menjadi produk baru.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setActiveTab('catalog')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"><Store className="mr-2" size={20}/> Lihat Katalog</button>
            <button onClick={() => setActiveTab('waste')} className="bg-white text-green-800 font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"><Recycle className="mr-2" size={20}/> Tukar Limbah</button>
          </div>
        </div>
        
        {/* WIDGETS */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 flex items-center justify-between w-full max-w-2xl mx-auto shadow-2xl">
          <button onClick={() => setShowQRScanner(true)} className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-2xl transition">
            <div className="bg-white text-green-900 p-3 rounded-2xl mb-2 shadow-sm group-hover:scale-110 transition-transform"><QrCode size={24}/></div>
            <span className="text-xs font-bold text-white tracking-wide">Scan QRIS</span>
          </button>
          <div className="w-px h-16 bg-white/20"></div>
          <button className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-2xl transition">
            <div className="bg-blue-500 text-white p-3 rounded-2xl mb-2 shadow-sm group-hover:scale-110 transition-transform relative"><Wallet size={24}/></div>
            <span className="text-[10px] text-green-100 mb-0.5">Saldo EcoPay</span>
            <span className="text-sm font-bold text-white">Rp{(ecoPayBalance).toLocaleString('id-ID')}</span>
          </button>
          <div className="w-px h-16 bg-white/20"></div>
          <button onClick={() => setShowCheckInModal(true)} className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-2xl transition relative">
            {!checkedInDays.includes(CURRENT_DAY) && <span className="absolute top-2 right-6 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
            <div className="bg-yellow-400 text-yellow-900 p-3 rounded-2xl mb-2 shadow-sm group-hover:scale-110 transition-transform"><CalendarCheck size={24}/></div>
            <span className="text-[10px] text-green-100 mb-0.5">Total Koin</span>
            <span className="text-sm font-bold text-white">{checkedInDays.includes(CURRENT_DAY) ? 'Sudah Cek-in' : 'Cek-in Harian'}</span>
          </button>
        </div>
      </div>

      {/* TENTANG KAMI (VISI MISI) */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-800">Tentang {shopInfo.username}</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">{shopInfo.description}</p>
        </div>

        {/* Baris 1: Gambar Kiri, Visi Kanan */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
  <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
    {/* Mengambil dari folder public wajib menambahkan garis miring (/) di depannya */}
    <img src="/visi.jpg" alt="Visi" className="w-full h-72 object-cover" />
  </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="bg-green-50 text-green-700 font-extrabold px-4 py-2 rounded-lg inline-block mb-4 shadow-sm">VISI KAMI</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-snug">Menghadirkan Keindahan Melalui Keberlanjutan.</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{shopInfo.visi}</p>
          </div>
        </div>

        {/* Baris 2: Misi Kiri, Gambar Kanan */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 px-4">
            <div className="bg-blue-50 text-blue-700 font-extrabold px-4 py-2 rounded-lg inline-block mb-4 shadow-sm">MISI KAMI</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-snug">Langkah Nyata untuk Bumi & Ekonomi.</h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{shopInfo.misi}</p>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
  
  <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
    <img src="/misi.jpg" alt="Misi" className="w-full h-72 object-cover" />
  </div>
</div>
        </div>
      </div>

      {/* MODAL QRIS & CHECKIN KEMBALI */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/90 z-[70] flex flex-col items-center justify-center animate-fade-in p-4">
          <button onClick={() => setShowQRScanner(false)} className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700"><X size={24} /></button>
          <h2 className="text-white text-xl font-bold mb-6 flex items-center"><QrCode className="mr-2"/> Scan QRIS</h2>
          <div className="relative w-64 h-64 md:w-80 md:h-80 border-2 border-white/50 rounded-2xl overflow-hidden bg-gray-800">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_3px_rgba(34,197,94,0.5)] animate-scan"></div>
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400"><Camera size={48} className="mb-2 opacity-50"/><p className="text-sm">Arahkan kamera ke QR Code</p></div>
          </div>
        </div>
      )}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center animate-fade-in p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
            <button onClick={() => setShowCheckInModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-200 bg-white/20 hover:bg-white/30 rounded-full p-1.5 backdrop-blur-sm transition-all z-10"><X size={20} /></button>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 pt-8 text-center text-white relative">
              <h2 className="text-2xl font-bold mb-1">Cek-in Harian</h2>
              <div className="bg-white/20 rounded-2xl py-2 px-5 inline-flex items-center backdrop-blur-sm mt-2 border border-white/30"><Coins className="mr-2 text-yellow-300" size={20} /><span className="font-bold text-xl">{coins}</span></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center bg-green-50 rounded-xl p-3 mb-5 border border-green-200">
                {WEEK_DAYS.map((dayLabel, idx) => {
                  const dayNumber = idx + 1; const isChecked = checkedInDays.includes(dayNumber); const isToday = dayNumber === CURRENT_DAY;
                  return (
                    <div key={dayLabel} className="flex flex-col items-center relative group">
                      <span className={`text-[10px] font-bold mb-1 ${isToday ? 'text-green-700' : 'text-gray-400'}`}>{dayLabel}</span>
                      <button onClick={() => isToday && !isChecked && handleCheckInToday()} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isChecked ? 'bg-green-600 text-white shadow-sm' : (isToday && !isChecked ? 'bg-white border-2 border-green-600 text-green-600 animate-pulse cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed')}`}>
                        {isChecked ? <CheckCircle size={18} /> : (isToday && !isChecked ? <Coins size={18} /> : dayNumber)}
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={handleCheckInToday} disabled={checkedInDays.includes(CURRENT_DAY)} className={`w-full py-3.5 rounded-xl font-bold text-white transition shadow-md ${checkedInDays.includes(CURRENT_DAY) ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-600 hover:bg-green-700'}`}>{checkedInDays.includes(CURRENT_DAY) ? 'Sudah Cek-in' : 'Cek-in Sekarang (+25 Koin)'}</button>
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `@keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } } .animate-scan { animation: scan 3s linear infinite; }`}} />
    </div>
  );
}

function ContactTab({ shopInfo }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in pb-24">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Hubungi Kami</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-green-100 p-4 rounded-full mb-4"><Mail className="text-green-600 w-8 h-8" /></div>
          <h3 className="font-bold text-gray-800 mb-2">Email</h3>
          <p className="text-gray-600 font-medium">{shopInfo.email}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4"><Phone className="text-blue-600 w-8 h-8" /></div>
          <h3 className="font-bold text-gray-800 mb-2">Telepon / WhatsApp</h3>
          <p className="text-gray-600 font-medium">{shopInfo.phone}</p>
        </div>
      </div>
    </div>
  );
}

// ================= LAYAR TUKAR LIMBAH =================
function WasteTab({ coins, setCoins, showNotification }) {
  const [wasteType, setWasteType] = useState('serbuk');
  const [weight, setWeight] = useState('');

  const handlePickUp = (e) => {
    e.preventDefault();
    const earned = Math.floor(weight * 10);
    setCoins(prev => prev + earned);
    showNotification(`Limbah diproses! Anda mendapatkan +${earned} Koin.`);
    setWeight('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in pb-24">
      <div className="relative bg-green-900 rounded-3xl p-8 text-white overflow-hidden shadow-lg mb-8">
        <img src={bgKu} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Tukar Limbah Jadi Koin</h1>
          <p className="text-green-100 text-sm">Dapatkan koin setiap kali menukar limbah kayu untuk potongan belanja.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><Truck className="mr-2 text-green-600"/> Jadwal Penjemputan</h2>
          <form onSubmit={handlePickUp} className="space-y-4">
            <select value={wasteType} onChange={(e) => setWasteType(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-green-500">
              <option value="serbuk">Serbuk Kayu</option>
              <option value="potongan">Potongan Kayu</option>
            </select>
            <input type="number" required placeholder="Berat Limbah (Kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-green-500" />
            <textarea required rows="2" placeholder="Alamat Penjemputan..." className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-green-500"></textarea>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-md transition">Setor Limbah</button>
          </form>
        </div>
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-3xl p-8 text-yellow-900 shadow-md text-center flex flex-col justify-center relative overflow-hidden">
          <Crown size={150} className="absolute -bottom-10 -right-10 opacity-20 text-yellow-600" />
          <div className="relative z-10">
            <h3 className="font-extrabold text-2xl mb-4 text-left border-b border-yellow-500 pb-2 flex items-center"><Coins className="mr-2" size={28}/> Koin Anda</h3>
            <div className="text-5xl font-black bg-white/40 py-6 rounded-2xl border border-white/50 shadow-inner">{coins}</div>
            <p className="mt-4 font-medium text-yellow-800 bg-yellow-100/50 p-3 rounded-lg text-sm">Bisa digunakan sebagai potongan harga saat Checkout produk katalog.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= LAYAR BERANDA PENJUAL (DASHBOARD + KATALOG) =================
function SellerHomeTab({ products, setProducts, showNotification, setActiveTab, coins, setCoins, ecoPayBalance }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkedInDays, setCheckedInDays] = useState([1, 2, 3]); 
  const CURRENT_DAY = 4; 
  const WEEK_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const handleCheckInToday = () => {
    if (!checkedInDays.includes(CURRENT_DAY)) {
      setCheckedInDays([...checkedInDays, CURRENT_DAY]);
      setCoins(prev => prev + 25);
      showNotification("Cek-in Admin Berhasil! +25 Koin.");
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // MASUK KE DETAIL PRODUK UNTUK EDIT/HAPUS
  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} role="seller" onBack={() => setSelectedProduct(null)} setProducts={setProducts} showNotification={showNotification} />;
  }

  return (
    <div className="animate-fade-in pb-24">
      {/* Hero Banner Penjual & Widgets */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white pt-10 pb-16 px-4 relative overflow-hidden">
        <img src={bgKu} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6">Beranda Toko Anda</h1>
          
          <div className="flex bg-white rounded-xl overflow-hidden shadow-lg p-1.5 mb-8 border-2 border-green-500/50">
            <Search className="text-gray-400 ml-2 my-auto" size={20} />
            <input type="text" placeholder="Cari produk di etalase Anda..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-3 py-2 text-gray-800 outline-none" />
          </div>

          {/* WIDGETS UNTUK PENJUAL */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 flex items-center justify-between shadow-2xl max-w-2xl mx-auto">
            <button onClick={() => setShowQRScanner(true)} className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-2xl transition">
              <div className="bg-white text-green-900 p-3 rounded-2xl mb-2"><QrCode size={24}/></div>
              <span className="text-xs font-bold text-white">Scan QRIS</span>
            </button>
            <div className="w-px h-16 bg-white/20"></div>
            <button className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-2xl transition">
              <div className="bg-blue-500 text-white p-3 rounded-2xl mb-2"><Wallet size={24}/></div>
              <span className="text-[10px] text-green-100 mb-0.5">Saldo EcoPay</span>
              <span className="text-sm font-bold text-white">Rp{(ecoPayBalance).toLocaleString('id-ID')}</span>
            </button>
            <div className="w-px h-16 bg-white/20"></div>
            <button onClick={() => setShowCheckInModal(true)} className="flex flex-col items-center group w-1/3 p-2 hover:bg-white/5 rounded-2xl transition">
              <div className="bg-yellow-400 text-yellow-900 p-3 rounded-2xl mb-2"><CalendarCheck size={24}/></div>
              <span className="text-[10px] text-green-100 mb-0.5">Total Koin</span>
              <span className="text-sm font-bold text-white">{checkedInDays.includes(CURRENT_DAY) ? 'Selesai' : 'Cek-in'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Etalase Penjual */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Produk yang Dijual ({filtered.length})</h2>
          <button onClick={() => setActiveTab('store')} className="bg-green-100 text-green-800 text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-200 shadow-sm">+ Upload Baru</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filtered.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-green-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 z-10"></div>
              <div className="relative aspect-square">
                <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-gray-800 font-bold px-3 py-1.5 rounded-lg flex items-center shadow-md"><Edit size={16} className="mr-2"/> Edit</span>
                </div>
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
                <div className="mt-auto">
                  <div className="text-green-600 font-black mb-1">Rp{product.price.toLocaleString('id-ID')}</div>
                  <div className="flex items-center text-[10px] text-gray-500"><Star size={10} className="text-yellow-400 fill-current mr-1"/>{product.rating} • {product.sold} Terjual</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QRIS & CHECKIN MODAL UNTUK PENJUAL */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/90 z-[70] flex flex-col items-center justify-center p-4">
          <button onClick={() => setShowQRScanner(false)} className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full"><X size={24} /></button>
          <h2 className="text-white text-xl font-bold mb-6 flex items-center"><QrCode className="mr-2"/> Tampilkan QRIS Toko</h2>
          <div className="relative w-64 h-64 bg-white p-4 rounded-2xl flex items-center justify-center"><QrCode size={200} className="text-gray-800"/></div>
        </div>
      )}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden relative">
            <button onClick={() => setShowCheckInModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-200 bg-white/20 rounded-full p-1.5 z-10"><X size={20} /></button>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 pt-8 text-center text-white"><h2 className="text-2xl font-bold">Cek-in Harian Admin</h2><div className="bg-white/20 rounded-2xl py-2 px-5 inline-flex items-center mt-2 border border-white/30"><Coins className="mr-2 text-yellow-300" size={20} /><span className="font-bold text-xl">{coins}</span></div></div>
            <div className="p-6">
              <button onClick={handleCheckInToday} disabled={checkedInDays.includes(CURRENT_DAY)} className={`w-full py-3.5 rounded-xl font-bold text-white ${checkedInDays.includes(CURRENT_DAY) ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>{checkedInDays.includes(CURRENT_DAY) ? 'Sudah Cek-in' : 'Cek-in Sekarang (+25 Koin)'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// KATALOG GLOBAL (HANYA PEMBELI)
function CatalogTab({ products, role, addToCart, setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} role={role} onBack={() => setSelectedProduct(null)} onAddToCart={() => addToCart(selectedProduct)} onBuyNow={() => { addToCart(selectedProduct); setActiveTab('cart'); }} />;
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-24">
      {/* Background hijau di menu pencarian Katalog Pembeli */}
      <div className="bg-green-900 text-white px-4 py-10 relative">
        <img src={bgKu} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">Semua Produk</h1>
          <div className="flex bg-white rounded-xl overflow-hidden shadow-lg p-1.5 border-2 border-green-500/50">
            <Search className="text-gray-400 ml-2 my-auto" size={20} />
            <input type="text" placeholder="Cari produk furnitur atau kriya kayu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-3 py-2 text-gray-800 outline-none" />
          </div>
        </div>
      </div>
      
      {/* Grid Produk Berlatar Putih/Abu */}
      <div className="px-4 py-8 max-w-7xl mx-auto bg-gray-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filtered.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col overflow-hidden">
              <div className="relative aspect-square">
                <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {product.isRecycled ? <span className="absolute top-2 left-2 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow flex items-center"><Recycle size={12} className="mr-1" /> Daur Ulang</span> : <span className="absolute top-2 left-2 bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow flex items-center"><Sparkles size={12} className="mr-1" /> Kayu Baru</span>}
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
                <div className="mt-auto">
                  <div className="text-green-600 font-black mb-1">{formatRp(product.price)}</div>
                  <div className="flex items-center text-[10px] text-gray-500"><Star size={10} className="text-yellow-400 fill-current mr-1"/>{product.rating} • {product.sold} Terjual</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// DETAIL PRODUK (LOGIKANYA BERUBAH SESUAI ROLE)
function ProductDetail({ product, role, onBack, onAddToCart, onBuyNow, setProducts, showNotification }) {
  const [showBlockchain, setShowBlockchain] = useState(false);

  const mockReviews = [
    { name: "Budi P.", stars: 5, date: "12 Mei 2026", comment: "Barang sangat bagus, serat kayunya terlihat natural. Packing aman pakai kardus tebal." },
    { name: "Siti M.", stars: 5, date: "10 Mei 2026", comment: "Sesuai deskripsi, respon penjual cepat. Senang bisa dukung UMKM lokal lewat EcoCraft!" }
  ];

  const handleDelete = () => {
    if(role === 'seller') {
      setProducts(prev => prev.filter(p => p.id !== product.id));
      showNotification("Produk berhasil dihapus dari Etalase!");
      onBack();
    }
  };

  const handleEdit = () => {
    showNotification("Fitur Edit Produk segera hadir!");
  };

  // LAYAR BLOCKCHAIN HANYA UNTUK PEMBELI
  if (showBlockchain && role === 'buyer') {
    return (
      <div className="bg-gray-50 min-h-screen pb-20 animate-fade-in p-4 pt-6 text-center max-w-lg mx-auto">
        <button onClick={() => setShowBlockchain(false)} className="mb-6 flex items-center bg-white border px-4 py-2 rounded-lg text-sm shadow-sm"><ChevronLeft size={18} className="mr-1" /> Kembali</button>
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <ShieldCheck className="text-green-600 mx-auto mb-4" size={60} />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Transparansi Daur Ulang</h2>
          <p className="text-sm text-gray-500 mb-6">Jejak pengolahan produk: <strong className="text-gray-800">{product.name}</strong></p>
          <div className="text-left space-y-6 relative border-l-2 border-green-200 ml-4 pl-6">
            <div className="relative"><div className="absolute -left-[33px] top-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div><h4 className="font-bold text-sm">Pengumpulan Limbah</h4><p className="text-[10px] font-mono text-gray-400">Tx: 0x8f2...b1</p></div>
            <div className="relative"><div className="absolute -left-[33px] top-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div><h4 className="font-bold text-sm">Proses Daur Ulang</h4><p className="text-[10px] font-mono text-gray-400">Tx: 0x1c9...a4</p></div>
            <div className="relative"><div className="absolute -left-[33px] top-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div><h4 className="font-bold text-sm text-green-700">Sertifikasi & Siap Jual</h4><p className="text-[10px] font-mono text-green-600">Smart Contract Terkunci</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-24 animate-fade-in relative pt-4 md:pt-6">
      <div className="max-w-4xl mx-auto px-4 mb-4"><button onClick={onBack} className="flex items-center bg-white border border-gray-200 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm"><ChevronLeft size={18} className="mr-1" /> Kembali</button></div>
      <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-6 px-0">
        <div className="w-full bg-white md:rounded-2xl overflow-hidden shadow-sm"><img src={product.img} className="w-full aspect-square object-cover" /></div>
        <div className="space-y-4 pt-4 px-4 md:px-0">
          <div className="bg-white p-5 md:rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug mb-2">{product.name}</h1>
            <div className="text-3xl font-black text-green-600 mb-4">{formatRp(product.price)}</div>
            <div className="flex items-center text-sm text-gray-500"><div className="flex items-center text-green-600 mr-4"><Star size={16} className="fill-current mr-1" /><span className="font-bold">{product.rating}</span></div><span>{product.sold} Terjual</span></div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">Deskripsi Produk</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.desc}</p>
          </div>

          {/* VERIFIKASI (TAMPIL UNTUK PEMBELI SAJA) */}
          {role === 'buyer' && (
            product.isRecycled ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm">
                <h4 className="font-extrabold text-green-800 text-base mb-1 flex items-center"><ShieldCheck className="mr-2" size={20}/> Terverifikasi Ramah Lingkungan</h4>
                <p className="text-xs text-green-700 mb-4">Produk ini diproses dari limbah kayu daur ulang yang tercatat permanen di jaringan Blockchain.</p>
                <button onClick={() => setShowBlockchain(true)} className="text-sm font-bold bg-white text-green-700 border-2 border-green-400 px-4 py-2 rounded-xl w-full shadow-sm flex items-center justify-center"><LinkIcon size={16} className="mr-2"/> Lihat Alur Blockchain</button>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
                <h4 className="font-extrabold text-blue-800 text-base mb-1 flex items-center"><Sparkles className="mr-2" size={20}/> Produk Kayu Baru</h4>
                <p className="text-xs text-blue-700">Material produk ini menggunakan material kayu baru premium. Kualitas terjamin standar UMKM.</p>
              </div>
            )
          )}

          {/* ULASAN PEMBELI LAIN (TAMPIL DI KEDUA ROLE AGAR PENJUAL JUGA BISA LIHAT RATING) */}
          <div className="bg-white p-4 md:rounded-2xl shadow-sm border border-gray-100 mb-4">
            <h3 className="font-bold text-gray-800 mb-4">Penilaian Pembeli</h3>
            <div className="space-y-4 divide-y divide-gray-100">
              {mockReviews.map((review, idx) => (
                <div key={idx} className="pt-4 first:pt-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center"><div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div><span className="text-xs font-semibold text-gray-800">{review.name}</span></div>
                    <span className="text-[10px] text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">{[...Array(5)].map((_, i) => (<Star key={i} size={10} className={i < review.stars ? "fill-current" : "text-gray-300"} />))}</div>
                  <p className="text-xs text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BAR BERDASARKAN ROLE */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex items-center p-3 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] max-w-4xl md:left-1/2 md:-translate-x-1/2 md:rounded-t-2xl">
        {role === 'buyer' ? (
          <>
            <div className="flex w-1/3"><button onClick={onAddToCart} className="w-full flex flex-col items-center text-green-600"><ShoppingCart size={22} /><span className="text-[10px] mt-1 font-medium">Keranjang</span></button></div>
            <div className="w-2/3 pl-2"><button onClick={onBuyNow} className="w-full bg-green-600 text-white font-bold rounded-xl py-3 shadow-lg hover:bg-green-700 transition">Beli Sekarang</button></div>
          </>
        ) : (
          <div className="w-full flex gap-3 px-2">
            <button onClick={handleEdit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 shadow-sm flex justify-center items-center transition"><Edit size={18} className="mr-2"/> Edit Produk</button>
            <button onClick={handleDelete} className="flex-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-bold rounded-xl py-3.5 shadow-sm flex justify-center items-center transition border border-red-100"><Trash2 size={18} className="mr-2"/> Hapus</button>
          </div>
        )}
      </div>
    </div>
  );
}

// UPLOAD PRODUK (HANYA PENJUAL)
function UploadProductTab({ products, setProducts, showNotification, shopInfo }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [isRecycled, setIsRecycled] = useState(true);

  const handleUploadProduct = (e) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), name, price: parseInt(price), desc, img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80', rating: 0, sold: 0, stock: 10, shop: shopInfo.username, isRecycled };
    setProducts([newProduct, ...products]);
    showNotification(`Produk "${name}" berhasil diunggah!`);
    setName(''); setPrice(''); setDesc('');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-fade-in pb-24">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center"><UploadCloud className="mr-3 text-green-600" /> Upload Produk Baru</h2>
        <form onSubmit={handleUploadProduct} className="space-y-4">
          <input required type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Nama Produk" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-gray-50 font-medium outline-none focus:border-green-500" />
          <input required type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Harga (Rp)" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-gray-50 font-medium outline-none focus:border-green-500" />
          <textarea required rows="4" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Deskripsi produk..." className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-gray-50 outline-none focus:border-green-500"></textarea>
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" checked={isRecycled} onChange={(e) => setIsRecycled(e.target.checked)} className="w-5 h-5 accent-green-600" /><span className="text-sm font-bold text-green-900">Sertifikasi Daur Ulang (Blockchain)</span></label>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white font-extrabold py-4 rounded-xl shadow-lg mt-4">Simpan ke Etalase</button>
        </form>
      </div>
    </div>
  );
}

// PROFIL SHOPEE STYLE (PENGATURAN LENGKAP VIA LOGO GERIGI UNTUK PEMBELI DAN PENJUAL)
function ShopeeStyleProfileTab({ role, setAuth, showNotification, coins, ecoPayBalance, shopInfo, setShopInfo }) {
  const [currentView, setCurrentView] = useState('profile');
  const [useFingerprint, setUseFingerprint] = useState(false);
  const [language, setLanguage] = useState('Indonesia');
  
  // State untuk form edit penjual
  const [formData, setFormData] = useState(shopInfo || {});

  const [activeModal, setActiveModal] = useState(null); // 'belum_bayar', 'dikemas', 'dikirim', 'penilaian'
  const formatRp = (num) => 'Rp' + num.toLocaleString('id-ID');

  const MOCK_ORDERS = [
    { id: 'TRX-1092', name: 'Meja Kopi Estetik (Limbah Palet)', status: 'dikemas', price: 250000, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=200&q=80' },
    { id: 'TRX-1093', name: 'Jam Tangan Kayu Eboni', status: 'dikirim', price: 350000, img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=200&q=80' },
    { id: 'TRX-1094', name: 'Nampan Saji Kayu Pinus', status: 'penilaian', price: 65000, img: 'https://images.unsplash.com/photo-1610705180800-4b36070bb8fb?auto=format&fit=crop&w=200&q=80' }
  ];

  const handleSaveShopInfo = (e) => {
    e.preventDefault();
    setShopInfo(formData);
    showNotification("Profil Toko & Deskripsi berhasil diperbarui!");
    setCurrentView('settings');
  };

  const SubHeader = ({ title }) => (
    <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <button onClick={() => currentView === 'settings' ? setCurrentView('profile') : setCurrentView('settings')} className="text-gray-600 mr-3"><ChevronLeft size={24} /></button>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    </div>
  );

  // VIEW: EDIT PROFIL TOKO (HANYA PENJUAL)
  if (currentView === 'shop_profile' && role === 'seller') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in">
        <SubHeader title="Profil & Info Toko" />
        <div className="bg-white p-4 space-y-4 max-w-xl mx-auto mt-2">
          <form onSubmit={handleSaveShopInfo} className="space-y-4">
            <div><label className="text-sm font-bold text-gray-700">Username Toko</label><input type="text" value={formData.username} onChange={e=>setFormData({...formData, username: e.target.value})} className="w-full border rounded-xl px-4 py-3 mt-1 bg-gray-50 outline-none focus:border-green-500" /></div>
            <div><label className="text-sm font-bold text-gray-700">Email</label><input type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full border rounded-xl px-4 py-3 mt-1 bg-gray-50 outline-none focus:border-green-500" /></div>
            <div><label className="text-sm font-bold text-gray-700">Password Baru</label><input type="password" placeholder="Biarkan kosong jika tidak diubah" className="w-full border rounded-xl px-4 py-3 mt-1 bg-gray-50 outline-none focus:border-green-500" /></div>
            <div><label className="text-sm font-bold text-gray-700">Nomor HP / WhatsApp</label><input type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full border rounded-xl px-4 py-3 mt-1 bg-gray-50 outline-none focus:border-green-500" /></div>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <label className="text-sm font-bold text-gray-700 text-green-700">Deskripsi Toko (Tampil di Publik)</label>
              <textarea rows="4" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full border rounded-xl px-4 py-3 mt-1 bg-green-50 outline-none focus:border-green-500"></textarea>
            </div>
            <div><label className="text-sm font-bold text-gray-700 text-green-700">Visi Toko</label><textarea rows="2" value={formData.visi} onChange={e=>setFormData({...formData, visi: e.target.value})} className="w-full border rounded-xl px-4 py-3 mt-1 bg-green-50 outline-none focus:border-green-500"></textarea></div>
            <div><label className="text-sm font-bold text-gray-700 text-green-700">Misi Toko</label><textarea rows="3" value={formData.misi} onChange={e=>setFormData({...formData, misi: e.target.value})} className="w-full border rounded-xl px-4 py-3 mt-1 bg-green-50 outline-none focus:border-green-500"></textarea></div>
            
            <button type="submit" className="w-full bg-green-600 text-white font-extrabold py-4 rounded-xl shadow-lg mt-4">Simpan Profil & Deskripsi</button>
          </form>
        </div>
      </div>
    );
  }

  // VIEW: KEAMANAN AKUN (HANYA PEMBELI)
  if (currentView === 'security' && role === 'buyer') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in"><SubHeader title="Keamanan Akun" />
        <div className="bg-white p-4 space-y-4 max-w-xl mx-auto mt-2">
          <div><label className="text-sm text-gray-600 block mb-1">Username</label><input type="text" value="pembeli_eco" className="w-full border rounded-lg p-3 outline-none" readOnly/></div>
          <div><label className="text-sm text-gray-600 block mb-1">Email</label><input type="text" value="pembeli@contoh.com" className="w-full border rounded-lg p-3 outline-none" /></div>
          <div><label className="text-sm text-gray-600 block mb-1">Ganti Password</label><input type="password" placeholder="••••••••" className="w-full border rounded-lg p-3 outline-none" /></div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"><span className="flex items-center text-sm font-medium"><Fingerprint size={18} className="mr-2 text-gray-500"/> Verifikasi Sidik Jari</span><div className="relative cursor-pointer" onClick={() => setUseFingerprint(!useFingerprint)}><div className={`block w-10 h-6 rounded-full transition ${useFingerprint ? 'bg-green-600' : 'bg-gray-300'}`}></div><div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${useFingerprint ? 'translate-x-4' : ''}`}></div></div></div>
          <button onClick={()=>{showNotification("Tersimpan!"); setCurrentView('settings');}} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg">Simpan Perubahan</button>
        </div>
      </div>
    );
  }

  if (currentView === 'address' || currentView === 'bank') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in"><SubHeader title={currentView === 'address' ? 'Alamat Saya' : 'Rekening Bank'} />
        <div className="p-8 text-center max-w-xl mx-auto"><p className="text-gray-500">Halaman {currentView} sedang dalam pengembangan desain.</p></div>
      </div>
    );
  }

  if (currentView === 'language') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in"><SubHeader title="Bahasa" />
        <div className="bg-white mt-2 max-w-xl mx-auto">{['Bahasa Indonesia', 'English', 'Basa Jawa'].map((lang) => (
          <div key={lang} onClick={() => { setLanguage(lang); showNotification("Bahasa diubah"); setCurrentView('settings'); }} className="px-4 py-4 border-b flex justify-between cursor-pointer"><span className="text-sm font-medium">{lang}</span>{language === lang && <CheckCircle size={18} className="text-green-500"/>}</div>
        ))}</div>
      </div>
    );
  }

  // VIEW: PUSAT BANTUAN & FAQ
  if (currentView === 'help') {
    return (
      <div className="bg-gray-50 min-h-screen pb-10 animate-fade-in"><SubHeader title="Pusat Bantuan & FAQ" />
        <div className="bg-white mt-2 p-6 flex flex-col items-center text-center max-w-xl mx-auto">
          <HelpCircle size={64} className="text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Halo, ada yang bisa kami bantu?</h3>
          <p className="text-gray-500 text-sm mb-6">Tim dukungan pelanggan EcoCraft.id siap membantu keluhan Anda.</p>
          <div className="w-full text-left mb-8 border-t border-gray-100 pt-4">
             <h4 className="font-bold text-gray-800 pb-2 mb-3">FAQ (Pertanyaan Umum)</h4>
             <details className="mb-3 bg-gray-50 p-3 rounded-lg"><summary className="font-semibold text-sm cursor-pointer text-gray-700 outline-none">Bagaimana cara menukar koin?</summary><p className="text-xs text-gray-500 mt-2">Koin otomatis dapat digunakan di halaman keranjang saat checkout.</p></details>
             <details className="mb-3 bg-gray-50 p-3 rounded-lg"><summary className="font-semibold text-sm cursor-pointer text-gray-700 outline-none">Berapa lama proses verifikasi daur ulang?</summary><p className="text-xs text-gray-500 mt-2">Maksimal 2x24 jam sejak limbah disetorkan ke depo kami melalui mitra penjual.</p></details>
             <details className="mb-3 bg-gray-50 p-3 rounded-lg"><summary className="font-semibold text-sm cursor-pointer text-gray-700 outline-none">Cara melacak pesanan?</summary><p className="text-xs text-gray-500 mt-2">Anda dapat melacak pesanan di menu Profil &gt; Dikirim &gt; Lacak.</p></details>
          </div>
          <button className="w-full flex items-center justify-center bg-green-50 text-green-700 p-4 rounded-xl font-bold mb-3 hover:bg-green-100 transition"><MessageSquare size={20} className="mr-3" /> Live Chat CS (24/7)</button>
          <button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 p-4 rounded-xl font-bold hover:bg-gray-200 transition"><Mail size={20} className="mr-3 text-red-500" /> Email admin@ecocraft.id</button>
        </div>
      </div>
    );
  }

  // VIEW: SETTINGS MENU UTAMA (GERIGI)
  if (currentView === 'settings') {
    return (
      <div className="bg-gray-100 min-h-screen pb-10 animate-fade-in"><SubHeader title="Pengaturan Akun" />
        <div className="mt-2 bg-white max-w-xl mx-auto shadow-sm">
          {role === 'seller' ? (
            <div onClick={() => setCurrentView('shop_profile')} className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50"><div className="flex items-center"><Store size={20} className="text-green-600 mr-3" /> <span className="text-sm font-medium">Profil & Info Toko</span></div><ChevronRight size={16} className="text-gray-400" /></div>
          ) : (
            <div onClick={() => setCurrentView('security')} className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50"><div className="flex items-center"><Shield size={20} className="text-green-600 mr-3" /> <span className="text-sm font-medium">Keamanan Akun</span></div><ChevronRight size={16} className="text-gray-400" /></div>
          )}
          <div onClick={() => setCurrentView('address')} className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50"><div className="flex items-center"><MapPin size={20} className="text-blue-500 mr-3" /> <span className="text-sm font-medium">Alamat Saya</span></div><ChevronRight size={16} className="text-gray-400" /></div>
          <div onClick={() => setCurrentView('bank')} className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50"><div className="flex items-center"><CreditCard size={20} className="text-green-600 mr-3" /> <span className="text-sm font-medium">Rekening Bank</span></div><ChevronRight size={16} className="text-gray-400" /></div>
        </div>
        <div className="mt-2 bg-white max-w-xl mx-auto shadow-sm">
          <div onClick={() => setCurrentView('language')} className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50"><div className="flex items-center"><Globe size={20} className="text-teal-500 mr-3" /> <span className="text-sm font-medium">Bahasa</span></div><div className="flex items-center text-gray-400 text-xs"><span className="mr-2">{language}</span> <ChevronRight size={16} /></div></div>
          <div onClick={() => setCurrentView('help')} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"><div className="flex items-center"><HelpCircle size={20} className="text-purple-500 mr-3" /> <span className="text-sm font-medium">Pusat Bantuan & FAQ</span></div><ChevronRight size={16} className="text-gray-400" /></div>
        </div>
      </div>
    );
  }

  // VIEW: PROFIL OVERVIEW
  return (
    <div className="bg-gray-100 min-h-screen pb-20 animate-fade-in relative">
      <div className="bg-gradient-to-r from-green-800 to-green-700 pt-10 pb-6 px-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center max-w-4xl mx-auto w-full relative">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 mr-4"><User size={32} /></div>
          <div>
            <h2 className="text-xl font-bold">{role === 'buyer' ? 'Pembeli EcoCraft' : (shopInfo ? shopInfo.username : 'UMKM Admin')}</h2>
            <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full mt-1 border border-white/30">{role === 'buyer' ? 'Member Premium' : 'Mitra Penjual'}</div>
          </div>
          {/* TOMBOL PENGATURAN (GERIGI) */}
          <button onClick={() => setCurrentView('settings')} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition"><Settings size={24} /></button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-2 bg-white px-4 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">{role === 'buyer' ? 'Pesanan Saya' : 'Status Orderan Toko'}</h3>
        <div className="flex justify-around text-xs text-gray-600 font-medium">
          {role === 'buyer' ? (
            <>
              <div onClick={() => setActiveModal('belum_bayar')} className="flex flex-col items-center cursor-pointer hover:text-green-600"><div className="mb-2 bg-gray-50 p-3 rounded-full"><CreditCard size={24} /></div><span>Belum Bayar</span></div>
              <div onClick={() => setActiveModal('dikemas')} className="flex flex-col items-center cursor-pointer hover:text-green-600 relative"><div className="mb-2 bg-gray-50 p-3 rounded-full"><Package size={24} /></div><span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex justify-center items-center rounded-full">1</span><span>Dikemas</span></div>
              <div onClick={() => setActiveModal('dikirim')} className="flex flex-col items-center cursor-pointer hover:text-green-600 relative"><div className="mb-2 bg-gray-50 p-3 rounded-full"><Truck size={24} /></div><span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex justify-center items-center rounded-full">1</span><span>Dikirim</span></div>
              <div onClick={() => setActiveModal('penilaian')} className="flex flex-col items-center cursor-pointer hover:text-green-600 relative"><div className="mb-2 bg-gray-50 p-3 rounded-full"><Star size={24} /></div><span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex justify-center items-center rounded-full">1</span><span>Penilaian</span></div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center"><div className="mb-2 bg-orange-50 p-3 rounded-full text-orange-600 relative"><span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full border-2 border-white"></span><Package size={24} /></div><span>Perlu Dikemas</span></div>
              <div className="flex flex-col items-center"><div className="mb-2 bg-blue-50 p-3 rounded-full text-blue-600"><Truck size={24} /></div><span>Dalam Pengiriman</span></div>
              <div className="flex flex-col items-center"><div className="mb-2 bg-green-50 p-3 rounded-full text-green-600"><CheckCircle size={24} /></div><span>Selesai</span></div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-2 bg-white">
        <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100"><h3 className="font-bold text-gray-800">Dompet Saya</h3></div>
        <div className="flex justify-around py-4 text-xs text-gray-600">
          <div className="flex flex-col items-center w-1/3"><Wallet size={26} className="mb-2 text-blue-600" /><span className="font-semibold mb-0.5">EcoPay</span><span className="text-green-600">{formatRp(ecoPayBalance)}</span></div>
          {role === 'buyer' && (
            <div className="flex flex-col items-center w-1/3 border-l border-r border-gray-100"><Coins size={26} className="mb-2 text-yellow-500" /><span className="font-semibold mb-0.5">Koin Eco</span><span className="text-yellow-600 font-bold">{coins} Koin</span></div>
          )}
          <div className="flex flex-col items-center w-1/3"><Ticket size={26} className="mb-2 text-green-600" /><span className="font-semibold mb-0.5">Voucher</span><span className="text-gray-500">Aktif</span></div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-4 mt-4"><button onClick={() => { setAuth(null); showNotification("Berhasil Keluar Akun"); }} className="w-full bg-white text-red-600 font-bold py-3.5 rounded-xl border border-red-200 hover:bg-red-50 transition">Keluar (Logout)</button></div>

      {/* POP UP MODAL PESANAN PEMBELI */}
      {activeModal && role === 'buyer' && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex flex-col justify-end md:justify-center md:items-center animate-fade-in p-0 md:p-4">
          <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl shadow-2xl relative flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-3xl">
              <h3 className="font-bold text-gray-800 uppercase tracking-wide text-sm">
                {activeModal === 'belum_bayar' ? 'Pesanan Belum Bayar' : 
                 activeModal === 'dikemas' ? 'Pesanan Sedang Dikemas' : 
                 activeModal === 'dikirim' ? 'Pesanan Dalam Pengiriman' : 'Beri Penilaian Produk'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"><X size={18} /></button>
            </div>
            <div className="p-4 overflow-y-auto">
              {MOCK_ORDERS.filter(o => o.status === activeModal).length === 0 ? (
                <div className="text-center py-10 text-gray-400"><Package size={40} className="mx-auto mb-3 opacity-50" /><p>Tidak ada pesanan.</p></div>
              ) : (
                <div className="space-y-4">
                  {MOCK_ORDERS.filter(o => o.status === activeModal).map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-3 flex gap-3 shadow-sm relative">
                      <img src={order.img} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1 pr-10">{order.name}</h4>
                        <p className="text-xs text-gray-500 font-mono mb-1">{order.id}</p>
                        <p className="text-green-600 font-bold text-sm">{formatRp(order.price)}</p>
                      </div>
                      {activeModal === 'dikirim' && <button className="absolute bottom-3 right-3 text-[10px] bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Lacak</button>}
                      {activeModal === 'penilaian' && <button className="absolute bottom-3 right-3 text-[10px] bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Nilai</button>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CartTab({ cart, setCart, showNotification, setActiveTab, ecoPayBalance, setEcoPayBalance }) {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const handleCheckout = () => {
    if (ecoPayBalance >= total) { setEcoPayBalance(prev => prev - total); setCart([]); showNotification("Pembayaran Berhasil!"); setActiveTab('home'); } 
    else showNotification("Saldo EcoPay tidak mencukupi!");
  };
  if (cart.length === 0) return (<div className="flex flex-col items-center justify-center py-32"><ShoppingCart size={80} className="text-gray-200 mb-6" /><h2 className="text-2xl font-bold text-gray-400">Keranjang Kosong</h2></div>);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32 animate-fade-in"><h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><ShoppingCart className="mr-3 text-green-600" /> Keranjang Belanja</h1><div className="space-y-4 mb-8">{cart.map(item => (<div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"><img src={item.img} className="w-20 h-20 object-cover rounded-xl border border-gray-50" /><div className="flex-grow"><h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h3><p className="text-green-600 font-bold mt-1">{formatRp(item.price)}</p><p className="text-xs text-gray-500 mt-1 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded">Jumlah: {item.qty}</p></div><button onClick={() => setCart(cart.filter(c => c.id !== item.id))} className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center"><Trash2 size={18}/></button></div>))}</div><div className="fixed bottom-[65px] md:bottom-0 left-0 w-full bg-white p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-gray-200 z-30"><div className="max-w-4xl mx-auto flex justify-between items-center"><span className="text-gray-600 font-medium">Total:</span><span className="text-2xl font-black text-green-600">{formatRp(total)}</span></div><button onClick={handleCheckout} className="w-full max-w-4xl mx-auto mt-3 bg-gray-900 text-white font-bold py-4 rounded-xl">Bayar via EcoPay</button></div></div>
  );
}

function NewsTab() {
  return (<div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in pb-20"><h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center"><Newspaper className="mr-3 text-green-600" /> Berita UMKM Terkini</h1><div className="space-y-4">{BERITA_UMKM.map(berita => (<div key={berita.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"><h3 className="text-lg font-bold text-gray-900 mb-2">{berita.title}</h3><div className="flex items-center text-xs text-gray-500 mb-3"><span className="bg-green-100 text-green-800 px-2.5 py-1 rounded font-bold">{berita.source}</span><span className="mx-2">•</span><span className="font-medium">{berita.date}</span></div><p className="text-sm text-gray-600">{berita.excerpt}</p></div>))}</div></div>);
}

function AITab() {
  const [chat, setChat] = useState([{ sender: 'ai', text: 'Halo! Saya AI Asisten EcoCraft. Ketik limbah UMKM apa yang Anda miliki, atau 📷 foto limbah tersebut!' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !imagePreview) return;
    setChat(prev => [...prev, { sender: 'user', text: input, image: imagePreview }]);
    setInput(''); setImagePreview(null); setIsTyping(true);

    setTimeout(() => {
      let aiResponse = imagePreview ? "Berdasarkan foto, limbah ini cocok diolah menjadi panel dinding rustic." : `Limbah "${input}" sangat ideal diproses menggunakan teknik daur ulang komposit ramah lingkungan.`;
      setChat(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in flex flex-col h-[85vh]">
      <div className="text-center mb-6"><h1 className="text-2xl font-bold text-gray-800 flex justify-center items-center"><Sparkles className="text-purple-600 mr-2"/> AI Innovation Hub</h1></div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow p-4 md:p-6 overflow-y-auto bg-gray-50 space-y-4">
          {chat.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                {msg.sender === 'ai' && <div className="font-bold text-xs text-purple-600 mb-2 flex items-center"><Cpu size={14} className="mr-1"/> AI</div>}
                {msg.image && <img src={msg.image} className="w-full max-h-48 object-cover rounded-xl mb-2" />}
                {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
              </div>
            </div>
          ))}
          {isTyping && <div className="flex justify-start"><div className="bg-white border p-4 rounded-2xl rounded-bl-none shadow-sm text-gray-400 text-sm italic">Mengetik...</div></div>}
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          {imagePreview && <div className="mb-3 relative inline-block"><img src={imagePreview} className="h-20 w-20 object-cover rounded-lg border-2 border-purple-500" /><button onClick={()=>setImagePreview(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={14} /></button></div>}
          <form onSubmit={handleSend} className="flex gap-2">
            <label className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl cursor-pointer flex items-center justify-center text-gray-600"><Camera size={24} /><input type="file" className="hidden" onChange={(e) => { const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=()=>setImagePreview(r.result); r.readAsDataURL(f); } }} /></label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanya ide daur ulang..." className="flex-grow border border-gray-300 rounded-xl px-4 focus:outline-none focus:border-purple-500 text-sm" />
            <button type="submit" disabled={!input && !imagePreview} className="bg-purple-600 text-white px-5 rounded-xl font-bold">Kirim</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ================= LAYAR LOGIN (DESAIN KEMBALI KE ASLI SEPERTI SCREENSHOT AWAL) =================
function AuthScreen({ setUserRole }) {
  const [roleMode, setRoleMode] = useState('buyer');

  // GANTI INI JADI IMPORT LOKAL DI VS CODE: const LOGO_LOGIN_URL = logoKu;
  const LOGO_LOGIN_URL = logoKu; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRole(roleMode); 
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 font-sans animate-fade-in relative">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex w-full max-w-4xl relative z-10 min-h-[500px]">
        
        {/* SISI KIRI: HIJAU POLOS + LOGO (Sama persis seperti Screenshot) */}
        <div className="hidden md:flex w-1/2 bg-[#064e3b] flex-col items-center justify-center text-center p-12 text-white relative">
          <img src={bgKu} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-white bg-white p-2 shadow-lg">
              <img src={LOGO_LOGIN_URL} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 tracking-tight">EcoCraft<span className="text-green-400">.id</span></h2>
            <p className="text-sm text-green-50 font-medium max-w-xs leading-relaxed">
              Solusi Belanja Kebutuhan Anda! Bersama EcoCraft.id Membantu UMKM Lebih Maju.
            </p>
          </div>
        </div>

        {/* SISI KANAN: FORM PUTIH */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          {/* TAB PEMILIHAN ROLE (Dibuat sangat kecil dan elegan di pojok kanan atas agar tidak merusak desain form utama) */}
          <div className="absolute top-6 right-6 md:right-8 bg-gray-100 rounded-full p-1 flex shadow-inner">
            <button type="button" onClick={() => setRoleMode('buyer')} className={`px-4 py-1.5 text-xs font-bold rounded-full transition ${roleMode === 'buyer' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>Pembeli</button>
            <button type="button" onClick={() => setRoleMode('seller')} className={`px-4 py-1.5 text-xs font-bold rounded-full transition ${roleMode === 'seller' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>Admin</button>
          </div>

          <div className="text-center mb-8 mt-6">
            <div className="md:hidden w-20 h-20 mx-auto mb-4 rounded-full border-4 border-green-600 bg-white p-1 overflow-hidden shadow-md">
              <img src={LOGO_LOGIN_URL} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Selamat Datang!</h2>
            <p className="text-gray-500 mt-2 text-xs md:text-sm">
              Masuk ke akun {roleMode === 'buyer' ? 'EcoCraft.id' : 'UMKM EcoCraft.id'} Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute top-3.5 left-4 text-gray-400" size={16} />
                <input required type="email" placeholder="email@contoh.com" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white text-sm transition" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute top-3.5 left-4 text-gray-400" size={16} />
                <input required type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white text-sm transition" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-[#00A651] hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-md transition mt-6 text-sm">
              Masuk
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-gray-600">
            Belum punya akun? <span className="text-[#00A651] font-bold hover:underline transition cursor-pointer">Daftar di sini</span>
          </div>
        </div>
      </div>
    </div>
  );
}