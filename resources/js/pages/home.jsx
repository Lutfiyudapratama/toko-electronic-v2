import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Zap, Star, TrendingUp } from 'lucide-react';
import '../../css/app.css';
import axios from 'axios';

const ElectricStoreHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [products, setProducts] = useState([]);

  const categories = [
    'Category',
    'Category',
    'Category',
    'Riwayat Pemesanan'
  ];

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

 return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} fill="currentColor" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  ElectroShop
                </span>
                <span className="text-xs text-gray-500">Toko Elektronik Terpercaya</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari produk elektronik impianmu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Cart */}
              <button className="relative p-2.5 hover:bg-blue-50 rounded-xl transition-all group">
                <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  0
                </span>
              </button>

              {/* Login Button */}
              <button className="hidden sm:block px-5 py-2.5 text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition-all text-sm border-2 border-blue-600">
                Masuk
              </button>

              {/* Register Button */}
              <button className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm">
                Daftar
              </button>

              {/* Mobile Menu */}
              <button className="md:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

     
      {/* Categories Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk Pilihan</h2>
          <p className="text-gray-600">Temukan elektronik berkualitas dengan harga terbaik</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-square flex items-center justify-center relative overflow-hidden">
                <Zap className="w-20 h-20 text-gray-300 group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  New
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5"> 
                <h3 className="text-gray-800 font-semibold text-base mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-blue-600 font-bold text-xl">
                    Rp {parseFloat(product.price).toLocaleString('id-ID')}
                  </span>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95">
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
                  <Zap className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <span className="text-lg font-bold">ElectroShop</span>
              </div>
              <p className="text-gray-400 text-sm">
                Toko elektronik terpercaya dengan produk berkualitas dan harga terjangkau.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Tentang Kami</li>
                <li className="hover:text-white cursor-pointer transition-colors">Hubungi Kami</li>
                <li className="hover:text-white cursor-pointer transition-colors">Kebijakan Privasi</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ikuti Kami</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-white cursor-pointer transition-colors">Facebook</li>
                <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            © 2024 ElectroShop. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
};
export default ElectricStoreHome;