import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const adminStore = create((set, get) => ({
    dashboardData: null,
    isFetching: true, 

    fecthAdminDashbaord: async () => {
        try {
            set({ isFetching: true })
            const response = await axiosInstance.get('/admin/dashboard')
            set({ dashboardData: response.data })
        } catch (error) {
            toast.error('Failed to load Dahsboard')
            console.log(error?.response?.data?.error)
        } finally {
            set({ isFetching: false })
        }
    }
}))

export default adminStore