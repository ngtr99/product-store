import { create } from "zustand";
import { toaster } from "../components/ui/toaster";

// Use API base for prod; empty string lets Vite proxy work in local dev
const API = import.meta.env.VITE_API_URL || "";

export const useProductsStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  fetchProducts: async () => {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    set({ products: data.data || data });
  },

  createProduct: async (newProduct) => {
    if (!newProduct.item || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }

    const res = await fetch(`${API}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      toaster.create({ title: "Error", description: data.message || "Failed" });
      return { success: false, message: data.message || "Failed" };
    }

    set((state) => ({ products: [...state.products, data.data] }));
    toaster.create({ title: "Success", description: "Product created" });
    return { success: true, message: "Product created successfully" };
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok || !data.success) {
      toaster.create({ title: "Error", description: data.message || "Failed" });
      return { success: false, message: "Product not deleted" };
    }

    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
    toaster.create({ title: "Deleted", description: data.message });
    return { success: true, message: "Product deleted successfully" };
  },

  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`${API}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      toaster.create({ title: "Error", description: data.message || "Failed" });
      return { success: false, message: "Product not updated" };
    }

    set((state) => ({
      products: state.products.map((p) => (p._id === id ? data.data : p)),
    }));
    toaster.create({ title: "Updated", description: data.message });
    return { success: true, message: "Product updated successfully" };
  },
}));
