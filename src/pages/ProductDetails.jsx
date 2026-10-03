import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Heart, ShoppingBag, Star, Truck, RefreshCw, ShieldCheck, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { ProductDetailSkeleton } from '../components/ProductDetailSkeleton';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore';

const ProductDetails = () => {
  const { id } = useParams();
  const { product, isFetchingProduct, fetchProduct } = useProductStore();
  const { addToCart, isLoading } = useCartStore()

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { user } = useUserStore()
  const navigate = useNavigate()
  
  // 1. Fetch Product on Mount / ID Change
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  // 2. Sync Local UI State once Product Data Arrives
  useEffect(() => {
    if (product) {
      if (product.images?.length) setSelectedImage(product.images[0]);
      if (product.variants?.colors?.length) setSelectedColor(product.variants.colors[0].name);
      if (product.variants?.sizes?.length) setSelectedSize(product.variants.sizes[1] || product.variants.sizes[0]);
    }
  }, [product]);

  // 3. Render Skeleton While Fetching or Before Product Loads
  if (isFetchingProduct || !product) {
    return <ProductDetailSkeleton />;
  }

  const handleAddToCart = async () => {
    if (!user) return navigate('/login')

    const cartData = {
      product: product.id,
      price: product.price,
      image: selectedImage,
      color: selectedColor,
      size: selectedSize.toUpperCase(),
      category: product.category || '', 
      quantity,
    };

    const success = await addToCart(cartData)
    if (success)
      toast.success(`Added ${quantity}x ${product.name} (${selectedColor}, Size ${selectedSize}) to cart!`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 text-[#111111]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6c5d53] mb-8">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <span>/</span>
        <span className="text-[#4a3b32] font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          {/* Main Display Image */}
          <div className="w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden bg-[#f4f1eb]">
            <img src={selectedImage || product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Thumbnail Selectors */}
          <div className="flex items-center gap-4">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden bg-[#f4f1eb] border-2 transition-all ${selectedImage === img ? 'border-[#4a3b32]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="flex flex-col justify-start">
          <div className="inline-block bg-[#f4f1eb] text-[#4a3b32] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-3">
            {product.category}
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#4a3b32] mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating || 0) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#4a3b32]">{product.rating}</span>
            <span className="text-xs text-[#6c5d53]">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#e2ddd5]">
            <span className="text-xl md:text-2xl font-bold text-[#4a3b32]">${(product.price /100 )?.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">${(product.compareAtPrice / 100).toFixed(2)}</span>
            )}
            {product.compareAtPrice && (
              <span className="bg-red-50 text-red-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                Save ${((product.compareAtPrice - product.price) / 100 ).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs text-[#6c5d53] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.variants?.colors && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#4a3b32] mb-2">
                Color: <span className="font-normal text-[#6c5d53]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.name ? 'border-[#4a3b32] scale-110' : 'border-transparent'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.variants?.sizes && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#4a3b32]">
                  Size: <span className="font-normal text-[#6c5d53]">{selectedSize}</span>
                </label>
                <button className="text-[11px] text-[#6c5d53] underline hover:text-black">Size Guide</button>
              </div>
              <div className="flex items-center gap-3">
                {product.variants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl border text-xs font-semibold transition-all ${selectedSize === size
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                        : 'bg-white text-[#4a3b32] border-[#e2ddd5] hover:border-[#4a3b32]'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 pb-8 border-b border-[#e2ddd5]">
            <div className="flex items-center border border-[#e2ddd5] rounded-xl bg-white w-fit">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-3 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 text-xs font-semibold text-[#4a3b32] cursor-pointer">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex-1 bg-accent hover:bg-accent/80 cursor-pointer text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center disabled:bg-accent/50 justify-center gap-2 transition-colors shadow-sm"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
          </div>

          {/* Perks / Features */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#f4f1eb] p-3 rounded-xl flex flex-col items-center justify-center gap-1 py-5">
              <Truck size={16} className="text-[#4a3b32]" />
              <span className="text-[10px] font-semibold text-[#4a3b32]">Free Shipping</span>
            </div>
            <div className="bg-[#f4f1eb] p-3 rounded-xl flex flex-col items-center justify-center gap-1">
              <RefreshCw size={16} className="text-[#4a3b32]" />
              <span className="text-[10px] font-semibold text-[#4a3b32]">30-Day Returns</span>
            </div>
            <div className="bg-[#f4f1eb] p-3 rounded-xl flex flex-col items-center justify-center gap-1">
              <ShieldCheck size={16} className="text-[#4a3b32]" />
              <span className="text-[10px] font-semibold text-[#4a3b32]">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;