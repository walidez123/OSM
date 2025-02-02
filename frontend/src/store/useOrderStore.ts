import { axiosInstance } from "../../lib/axios.ts";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useOrderStore = create((set, get) => ({
  orders: [],
  isGettingOrders: false,
  isCreatingOrder: false,
  isUpdatingOrder: false,
  isDeletingOrder: false,

  // Updated getOrders to accept filters
  getOrders: async (customerName = '', status = '') => {
    set({ isGettingOrders: true });
    try {
      const res = await axiosInstance.get('/order', {
        params: { customer_name: customerName, status: status }
      });
      set({ orders: res.data });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
    set({ isGettingOrders: false });
  },

  createOrder: async (data) => {
    set({ isCreatingOrder: true });
    try {
      await axiosInstance.post('/order', data);
      toast.success("Order created successfully");
      get().getOrders(); // Fetch updated orders
    } catch (err) {
      console.error(err);
      toast.error("Failed to create order");
    }
    set({ isCreatingOrder: false });
  },

  updateOrder: async (id, data) => {
    set({ isUpdatingOrder: true });
    try {
      await axiosInstance.put(`/order/${id}`, {
        status: data.status,
        total_price: data.total_price,
      });
      toast.success("Order updated successfully");
      get().getOrders(); // Fetch updated orders
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
    }
    set({ isUpdatingOrder: false });
  },

  deleteOrder: async (id) => {
    set({ isDeletingOrder: true });
    try {
      await axiosInstance.delete(`/order/${id}`);
      toast.success("Order deleted successfully");
      get().getOrders(); // Fetch updated orders
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
    set({ isDeletingOrder: false });
  },
}));
