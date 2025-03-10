import {create} from "zustand"
import { toaster } from "../components/ui/toaster";

export const useProductsStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    addProduct: (product) => set((state) => ({products: [...state.products, product]})),
    createProduct: async (newProduct) => {
        if(!newProduct.item || !newProduct.price || !newProduct.image) {
            return {success: false, message: "All fields are required"}
        } 
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}))
        return {success: true, message: "Product created successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products: data.data})

    },
    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        if (!data.success) {
            toaster.create({
                title: data.success,
                description: data.message,
            })
            return {success: false, message: "Product not deleted"}
        } else {
            set((state) => ({products: state.products.filter((product) => product._id !== id)}))
            toaster.create({
                title: data.success,
                description: data.message,
            })
            return {success: true, message: "Product deleted successfully"}
        }
        
    },
    updateProduct: async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json()
        if (!data.success) {
            toaster.create({
                title: data.success,
                description: data.message,
            })
            return {success: false, message: "Product not updated"}
        } else {
            set((state) => ({products: state.products.map((product) => product._id === id ? data.data : product)}))
            toaster.create({
                title: data.success,
                description: data.message,
            })
            return {success: true, message: "Product updated successfully"}
        }
    }
}))


