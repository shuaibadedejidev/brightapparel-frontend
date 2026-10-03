import { create } from 'zustand'
import {toast } from 'react-hot-toast'

import axiosInstance from '../lib/axiosInstance'

const useUserStore = create((set, get) => ({
    user: null,
    isLoading: false,
    isSigningup: false,
    isLoggingin: false,
    isRequestingOtp: false,
    isVerifyingOtp: false,
    isCheckingMe: true,

    checkMe: async () => {
        try {
            set({ isCheckingMe: true })
            const response = await axiosInstance.get('/auth/me')
            set({ user: response.data })
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isCheckingMe: false })
        }
    },

    signup: async (data) => {
        try {
            set({ isSigningup: true })
            const response = await axiosInstance.post('/auth/signup', data)
            toast.success(response.data.message)
            return true
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isSigningup: false }) 
        }
    },

    login: async (data) => {
        try {
            set({ isLogining: true })
            const response = await axiosInstance.post('/auth/login', data)
            set({ user: response.data.user })
            toast.success(response.data.message)
            return true
        } catch (error) {
            set({ user: null })
            toast.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isLogining: false }) 
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post('/auth/logout')
            toast.success(response.data.message)
            set({ user: null })
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong')
        }
    },

    requestOtp: async () => {
        try {
            set({ isRequestingOtp: true })
            const response = await axiosInstance.post('/auth/send-otp', {
                email: localStorage.getItem('email')
            })
            toast.success('Opt sent to your Gmail account')
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isRequestingOtp: false })
        }
    },

    verifyOtp: async (data) => {
        try {
            set({ isVerifyingOtp: true })
            const response = await axiosInstance.post('/auth/verify-otp', data)
            set({ user: response.data?.user })
            toast.success(response.data.message)
            return true
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.error || 'Something went wrong')
        } finally {
            set({ isVerifyingOtp: false })
        }
    }   


}))

export default useUserStore