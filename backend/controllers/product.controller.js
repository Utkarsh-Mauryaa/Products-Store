import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch(err) {
        console.log("Error in fetching products: ", err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createProduct = async function(req, res) {
    const product = req.body;
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields."
        })
        
    }
        try {
        const newProduct = await Product.create(product); // equivalent to const newProduct = new Product(product) this line create the instance; and await newProduct.save(), this line saves the doc to db
        res.status(201).json({success: true, data: newProduct});
        } catch(err) {
            console.error("Error in creation of product: ", err.message);
            res.status(500).json({success: false, message: "Server Error"})
            
        }
    
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({success: false, message: "Invalid ProductId."});
    }
    try {
        const updatedProduct = await Product.updateOne({_id: id}, product)   // one more way to update const updatedProduct = await Product.findByIdAndUpdate(id, { price: 999 }, { new: true } // return updated document instead of old one);
        res.status(200).json({success: true, data: updatedProduct})
    } catch(err) {
        console.log("Cannot update", err.message);
        res.status(500).json({success: false, message: "Server Error."})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({success: false, message: "Invalid ProductId."});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted."}) // or we can return 204 which means req succeeded but no data to send back
    } catch(err) {
        console.log("Error in deleting products.");
        res.status(500).json({success: false, message: "Server Error."})
    }
}