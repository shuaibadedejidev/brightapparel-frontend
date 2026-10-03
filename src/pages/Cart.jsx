import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore.js';

import { CartSkeleton } from '../components/CartSkeleton.jsx';

const CartPage = () => {
  const { 
    cartItems, 
    isLoading,
    fetchCart,
    deliveryOption, 
    setDeliveryOption, 
    coupon, 
    setCoupon, 
    updateQuantity,
    removeFromCart,  
    calculateOrderSummary 
  } = useCartStore();

  const navigate = useNavigate()
  const { user } = useUserStore()

  useEffect(() => {
    if (!cartItems) fetchCart()
  }, [])
/*
  useEffect(() => {
    //if (!user && !isLoading) navigate('/login')
  }, [])
*/
  const { subtotal, deliveryFee, tax, discount, totalPayable } = calculateOrderSummary();

  if (isLoading)  return <CartSkeleton />

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-5">
      <div className="flex items-center gap-2 text-xs text-[#6c5d53] mb-2 sticky top-0 left-0 z-50 bg-main-bg py-3">
        <Link to="/" className="hover:text-gray-400 text-black text-sm flex justify-center items-center gap-2">
          <ArrowLeft size={20} /> Back
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#4a3b32] mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-[#f4f1eb] rounded-2xl">
          <p className="text-sm text-[#6c5d53] mb-4">Your cart is currently empty.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-accent text-white text-xs font-medium px-6 py-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            Start Shopping <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 bg-[#f4f1eb] rounded-2xl p-6 md:p-8 shadow-md">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#4a3b32] mb-6 pb-4 border-b border-[#e2ddd5]">
              My Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>

            <div className="divide-y divide-[#e2ddd5]">
              {cartItems.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#e9e4dc] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#4a3b32] mb-1">{item.name}</h3>
                      <p className="text-[11px] text-[#6c5d53] mb-2">
                        Color : <span className="font-medium">{item.selectedColor}</span> | Size : <span className="font-medium">{item.selectedSize}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#4a3b32]">${(item.price / 100).toFixed(2)}</span>
                        {item.compareAtPrice && (
                          <span className="text-xs text-gray-400 line-through">${(item.compareAtPrice / 100).toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex items-center border border-[#dcd6cd] rounded-lg bg-white overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, 'DECREMENT')} className="px-2.5 py-2.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#4a3b32]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 'INCREMENT')} className="cursor-pointer px-2.5 py-2.5 text-gray-600 hover:bg-gray-100">
                        <Plus size={12} />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="bg-[#f4f1eb] rounded-2xl p-6 shadow-md">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-4 pb-3 border-b border-[#e2ddd5]">
                Your Order
              </h3>

              <div className="space-y-3 text-xs text-[#6c5d53] mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#4a3b32]">${(subtotal / 100).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${(discount / 100).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-2 border-t border-[#e2ddd5]">
                  <p className="font-semibold text-[#4a3b32] mb-2">Delivery Method</p>
                  <label className="flex items-center justify-between mb-2 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="delivery" 
                        checked={deliveryOption === 'delivery'} 
                        onChange={() => setDeliveryOption('delivery')} 
                      />
                      Delivery
                    </span>
                    <span className="font-semibold text-[#4a3b32]">$7.99</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="delivery" 
                      checked={deliveryOption === 'pickup'} 
                      onChange={() => setDeliveryOption('pickup')} 
                    />
                    Pick Up (Free)
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-[#4a3b32]">${(tax / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#e2ddd5] mb-6">
                <span className="text-sm font-bold text-[#4a3b32]">Total Payable:</span>
                <span className="text-base font-bold text-[#4a3b32]">${(totalPayable / 100).toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-[#ff6b00] hover:bg-[#e05f00] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;