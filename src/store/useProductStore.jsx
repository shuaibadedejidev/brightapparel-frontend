import {create} from 'zustand'
import axiosInstance from '../lib/axiosInstance'
import toast from 'react-hot-toast'

const useProductStore = create((set, get) => ({
    products: [],
    isFetchingProducts: false,
    isSavingProduct: false,
    product: [],
    isFetchingProduct: false, 

    fetchProduct: async (id) => {
        try {
            set({ isFetchingProduct: true });
            const response = await axiosInstance.get(`/products/${id}`);
            set({ product: response.data });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isFetchingProduct: false });
        }
    },


    featuredProducts: [],
    isFetchingFeaturedProducts: true,

    fetchFeaturedProducts: async () => {
        try {
            set({ isFetchingFeaturedProducts: true });
            const response = await axiosInstance.get('/products/featured');
            set({ featuredProducts: response.data });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isFetchingFeaturedProducts: false });
        }
    },

    fetchProducts: async (category, gender) => {
        try {
            set({ isFetchingProducts: true })
            const res = await axiosInstance.get('/products', {
                params: {
                    category,
                    gender
                }
            })
            set({ products: res.data })
        } catch (error) {
            console.log(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isFetchingProducts: false })
        }
    },

    saveProduct: async (payload) => {
        try {
            set({ isSavingProduct: true })
            await axiosInstance.post('/products/create', payload);
            toast.success('Product created successfully!');
            return true
        } catch (err) {
            console.log(err?.response?.data?.error);
            toast.error(err?.response?.data?.error || 'Failed to create product')
        } finally {
            set({ isSavingProduct: false })
        }
    },

    deleteProduct: async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await axiosInstance.delete(`/products/${id}`);
            set({
                products: get().products.filter((p) => p.id !== id),
            });
        } catch (err) {
            toast.error('Failed to delete product');
            console.log()
        }
    },

}))

export default useProductStore