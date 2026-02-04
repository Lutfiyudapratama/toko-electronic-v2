import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Zap } from 'lucide-react';
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
    axios.get("http://127.0.0.1:8000/api/admin/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                  <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                  ELECTRIC
                </span>
                <span className="text-xs font-semibold text-slate-500 tracking-wider -mt-1">
                  STORE
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Cari produk elektronik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-blue-400 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-inner group-hover:bg-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button className="relative p-3 hover:bg-slate-100 rounded-xl transition-all group">
                <ShoppingCart className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  0
                </span>
              </button>

              {/* Login Button */}
              <button className="hidden sm:block px-6 py-2.5 text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition-all border-2 border-blue-200 hover:border-blue-300">
                Login
              </button>

              {/* Register Button */}
              <button className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                Register
              </button>

              {/* Mobile Menu */}
              <button className="md:hidden p-3 hover:bg-slate-100 rounded-xl transition-all">
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <center>

        <nav className="bg-white/60 backdrop-blur-sm border-b border-slate-200 sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all transform hover:scale-105 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </center>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-4"
            >
              <div className="bg-gray-200 aspect-square rounded mb-3 flex items-center justify-center">
                <Zap className="w-12 h-12 text-gray-400" />
              </div>

              <h3 className="font-bold">{product.name}</h3>
              <p className="text-blue-600 font-semibold">
                Rp {product.price}
              </p>

              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded">
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>

      </main>
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

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default ElectricStoreHome;