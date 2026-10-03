import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Loader, Loader2, Loader2Icon, LucideLoaderPinwheel } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';
import useOrderStore from '../store/useOrderStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, deliveryOption, setDeliveryOption, calculateOrderSummary } = useCartStore();
  
  const { subtotal, deliveryFee, tax, discount, totalPayable } = calculateOrderSummary();

  const { placeOrder, isPlacingOrder } = useOrderStore()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await placeOrder({
      ...formData,
      deliveryOption
    })
    
    if (data) 
      toast.success('Order placed successfully!');
      window.location = data.paymentUrl
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className='flex items-center justify-start gap-2 mb-5'>
        <Link to="/cart" className="text-sm font-bold transition-colors hover:bg-gray-100 rounded-full p-3">
            <ArrowLeft className="size-5" /> 
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#4a3b32]">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Shipping & Delivery Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#f4f1eb] border border-[#e2ddd5] rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#4a3b32] mb-6 pb-4 border-b border-[#e2ddd5]">
              Delivery Method
            </h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#4a3b32]">
                <input 
                  type="radio" 
                  name="checkoutDelivery" 
                  checked={deliveryOption === 'delivery'} 
                  onChange={() => setDeliveryOption('delivery')} 
                />
                Delivery ($7.99)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#4a3b32]">
                <input 
                  type="radio" 
                  name="checkoutDelivery" 
                  checked={deliveryOption === 'pickup'} 
                  onChange={() => setDeliveryOption('pickup')} 
                />
                Pick Up (Free)
              </label>
            </div>
          </div>

          <div className="bg-[#f4f1eb] border border-[#e2ddd5] rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#4a3b32] mb-6 pb-4 border-b border-[#e2ddd5]">
              Shipping Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="First & Last Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white px-3.5 py-2.5 text-xs rounded-lg border border-[#e2ddd5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">Phone No</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone No."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white px-3.5 py-2.5 text-xs rounded-lg border border-[#e2ddd5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">Address</label>
                <input 
                  type="text" 
                  name="address"
                  placeholder="421, Street Name"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-white px-3.5 py-2.5 text-xs rounded-lg border border-[#e2ddd5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">Additional Notes</label>
                <textarea 
                  name="additionalNotes"
                  placeholder="Additional info. e.g, Call me when you reach gate"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full bg-white px-3.5 py-2.5 text-xs rounded-lg border border-[#e2ddd5] focus:outline-none h-24"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-[#f4f1eb] border border-[#e2ddd5] rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#4a3b32] mb-4 pb-3 border-b border-[#e2ddd5]">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs text-[#6c5d53] mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#4a3b32]">${(subtotal / 100).toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${(discount / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping / Delivery</span>
              <span className="font-semibold text-[#4a3b32]">${(deliveryFee / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span className="font-semibold text-[#4a3b32]">${(tax / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#e2ddd5] mb-6">
            <span className="text-sm font-bold text-[#4a3b32]">Total</span>
            <span className="text-base font-bold text-[#4a3b32]">${(totalPayable / 100).toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={isPlacingOrder}
            className="w-full bg-[#ff6b00] hover:bg-[#e05f00] cursor-pointer text-white text-xs font-semibold uppercase tracking-wider py-3 disabled:bg-accent/20 rounded-xl transition-colors shadow-sm"
          >
            {isPlacingOrder ? (
              <div className='flex items-center gap-1 justify-center'>
                <Loader className='animate-spin' size={20} />
                Placing Order...
              </div>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;