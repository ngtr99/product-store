import Product from '../models/products.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
     try {
         const products = await Product.find({});
         res.status(200).json({success: true, data: products});
     } 
     catch (error) {
         console.error(`Error: ${error.message}`);
         res.status(500).json({success: false, message: 'Server Error'});
     }
}

export const createProducts = async (req, res) => {
    const products = req.body;
 
    if(!products.item || !products.price || !products.image ){
        return res.status(400).send({message: 'Please fill all fields'});
    }
 
    const { item, price, image } = products;
    const newProduct = new Product({ item, price, image });
 
    try {
         await newProduct.save();
         res.status(201).json({success: true, data: newProduct});
    } 
    catch (error) {
         console.error(`Error: ${error.message}`);
         res.status(500).json({success: false, message: 'Server Error'});
    }
}

export const deleteProducts = async (req, res) => {
     const {id} = req.params;
     console.log("id", id);

     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }
    
     try {
         await Product.findByIdAndDelete(id);
         res.status(200).json({success: true, message: 'Product deleted'});
     } 
     catch (error) {
         console.error(`Error: ${error.message}`);
         res.status(500).json({success: false, message: 'Server Error'});
     }
}

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { item, price, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { item, price, image }, { new: true });
        if (!updatedProduct) {
            return res.status(404).send('No product with that id');
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}