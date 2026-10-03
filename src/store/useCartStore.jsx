import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axiosInstance from '../lib/axiosInstance';

const useCartStore = create((set, get) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  // Fetch full cart from backend
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/cart');
      set({ cartItems: response.data.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch cart',
        isLoading: false,
      });
      console.error(err.response?.data?.message || 'Failed to fetch cart')
    }
  },

  // Add item or increment existing item in cart
  addToCart: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/cart/add', payload);
      await get().fetchCart();
      return true
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to add item',
        isLoading: false,
      });
      toast.error(err.response?.data?.error || 'Failed to add product to cart')

    }
  },

  // Update item quantity (Optimistic update with rollback on error)
  updateQuantity: async (cartId, action) => {
    const previousItems = get().cartItems;

    // Optimistically update local state immediately
    set({
      cartItems: previousItems
        .map((item) => {
          if (item.id !== cartId) return item;
          let newQty = item.quantity;
          if (action === 'INCREMENT') newQty += 1;
          if (action === 'DECREMENT') newQty -= 1;
          return { ...item, quantity: newQty };
        })
        .filter((item) => item.quantity > 0),
    });

    try {
      await axiosInstance.patch('/cart/quantity', { cartId, action });
    } catch (err) {
      set({
        cartItems: previousItems,
        error: err.response?.data?.message || 'Update failed',
      });
      toast.error(err?.response?.data?.message || 'Error updating quantity' )
    }
  },

  removeFromCart: async (cartId) => {
    const previousItems = get().cartItems;

    set({
      cartItems: previousItems.filter((item) => item.id !== cartId),
    });

    try {
      await axiosInstance.delete(`/cart/${cartId}`);
      toast.success('Product deleted successfully')
    } catch (err) {
      set({
        cartItems: previousItems,
        error: err.response?.data?.message || 'Delete failed',
      });
    }
  },


  deliveryOption: 'delivery', // 'delivery' or 'pickup'
  discount: 0,

  // Actions
  setDeliveryOption: (option) => set({ deliveryOption: option }),

  // Centralized calculations
  calculateOrderSummary: () => {
    const state = get();
    const subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = state.deliveryOption === 'delivery' ? 799 : 0;
    const tax = Math.floor(subtotal * 0.05); // 5% estimated tax
    const totalPayable = subtotal + deliveryFee + tax;

    return {
      subtotal,
      deliveryFee,
      tax,
      discount: state.discount,
      totalPayable: Math.max(0, totalPayable),
    };
  }
}));

export default useCartStore;
