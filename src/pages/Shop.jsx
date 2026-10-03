import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Heart, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import {toast} from 'react-hot-toast'
import Header from '../components/Header';
import Footer from '../components/Footer'
import { ProductSkeleton } from '../components/ProductSkeleton';
import useProductStore from '../store/useProductStore';

const Shop = () => {
  const { products, isFetchingProducts, fetchProducts } = useProductStore()
  const [category, setCategory] = useState([])
  const [gender, setGender] = useState([])

  useEffect(() => {
    fetchProducts(category, gender)
  }, [fetchProducts, category, gender])

  const handleCategory = (e) => {
    const { name, checked } = e.target

    setCategory(prev => {
      const updated = !checked ? prev.filter(cat => cat !== name) : [...prev, name]
      return updated
    })
  }

  const handleGender = (e) => {
    const { name, checked } = e.target

    setGender(prev => {
      const updated = !checked ? prev.filter(cat => cat !== name) : [...prev, name]
      return updated
    })
  }

  const handleAddToFavourites = (id) => {toast.success('Product added to favourites', id)}

  return (
    <div className="w-full min-h-screen bg-main-bg text-[#111111]">
      <Header />
      {/* Hero Banner Section */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-6">
        <div className="w-full bg-bg-subtle rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#6c5d53] mb-2 block">- Collections</span>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#4a3b32] mb-3">
              Explore The Various Collection of Cloths
            </h1>
            <p className="text-xs text-[#6c5d53] leading-relaxed">
              Don't miss out on shopping collection from us! You'll not be let down.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-48 rounded-xl overflow-hidden bg-[#e9e4dc]">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" 
              alt="Collection banner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Grid) */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filters */}
        <div className="space-y-8 bg-bg-subtle p-6 rounded-2xl h-fit lg:sticky top-20">
          <div className="flex items-center justify-between pb-4 border-b border-[#e2ddd5]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3b32] flex items-center gap-2">
              <SlidersHorizontal size={14} /> Filters
            </h3>
            <button 
              className="text-[11px] text-[#6c5d53] hover:text-black cursor-pointer"
              onClick={() => setCategory([])}
              >Reset</button>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-semibold text-[#4a3b32] mb-3">Category</h4>
            <div className="space-y-2 text-xs text-[#6c5d53]">
              {['Tops', 'Bottoms', 'Outerwear'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input type="checkbox" name={cat} className="rounded border-[#dcd6cd]" onChange={(e) => handleCategory(e)} />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="pt-4 border-t border-[#e2ddd5]">
            <h4 className="text-xs font-semibold text-[#4a3b32] mb-3">Gender</h4>
            <div className="space-y-2 text-xs text-[#6c5d53]">
              {['Unisex', 'Men', 'Women'].map((gen) => (
                <label key={gen} className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input type="checkbox" name={gen} className="rounded border-[#dcd6cd]" onChange={(e) => handleGender(e)} />
                  {gen}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-3">
          {isFetchingProducts ? (
            <ProductSkeleton />
            
          ) : products.length === 0 ? (
            <div className='flex items-center justify-center text-2xl text-gray-600'>No products found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col">

                  {/* Image Container */}
                  <div className="w-full h-72 bg-[#f4f1eb] rounded-2xl overflow-hidden relative mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#4a3b32] hover:bg-white cursor-pointer transition-colors shadow-sm" onClick={() => handleAddToFavourites(product?.id)}>
                        <Heart size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-[#4a3b32] mb-1">{product.name}</h3>
                      <p className="text-[11px] text-[#6c5d53] line-clamp-1 mb-3">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#4a3b32]">${(product.price / 100).toFixed(2)}</span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] text-gray-400 line-through">${(product.compareAtPrice / 100).toFixed(2)}</span>
                        )}
                      </div>

                      <Link
                        to={`/details/${product.id}`}
                        className="bg-[#1a1a1a] hover:bg-black text-white text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag size={12} /> View
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Shop;