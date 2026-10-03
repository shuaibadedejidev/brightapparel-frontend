import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const useOrderStore = create((set, get) => ({
    orders: [],
    isLoading: false,

    fetchOrders: async () => {
        try {
            const response = await axiosInstance.get('/orders');
            set({ orders: response?.data?.orders });
        } catch (error) {
            console.error('Error loading orders:', error);
            toast.error(error?.response?.data?.error || 'Error loading orders')
        } finally {
            set({ isLoading: false });
        }
    },

    isPlacingOrder: false,
    placeOrder: async (payload) => {
        try {
            set({ isPlacingOrder: true })
            const response = await axiosInstance.post('/orders', payload)
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Error placing your Order')
        } finally {
            set({ isPlacingOrder: false })
        }
    },

    fetchOrdersAdmin: async (activeFilter, searchQuery) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.get('/orders/admin/all', {
                params: {
                    status: activeFilter,
                    search: searchQuery,
                },
            });
            set({ orders: response.data.orders });
        } catch (error) {
            console.error('Failed to load admin orders:', error);
        } finally {
            set({ isLoading: false })
        }
    },

    handleStatusChange: async (orderId, newStatus) => {
        let prevOrders = get().orders
        try {
            await axiosInstance.patch(`/orders/admin/${orderId}/status`, { status: newStatus });

            set({
                orders: prevOrders.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
            });
        } catch (error) {
            set({ orders: prevOrders })
            toast.error(error?.response?.data?.message || 'Failed to update order status');
        }
    },

    order: {},
    isVerifying: false,
    error: '',
    verifyPayment: async (id) => {
        try {
            set({ isVerifying: true })
            const response = await axiosInstance.get(`/orders/${id}/verify`);
            
            set({ order: response.data.order });

            // In case webhook is still processing, retry once after 2 seconds
            setTimeout(async () => {
                try {
                    const retryRes = await axiosInstance.get(`/orders/${id}/verify`);
                    set({ isVerifying: true });
                    set({ order: retryRes.data.order });
                } catch (error) {
                    console.log(error)
                } finally {
                    set({ isVerifying: false })
                }
            }, 2000)

        } catch (err) {
            set({ error: err.response?.data?.error || 'Failed to verify payment status.' });
            console.log(err.response.data.error)
        } finally {
            set({ isVerifying: false })
        }
    },
}))


export default useOrderStore