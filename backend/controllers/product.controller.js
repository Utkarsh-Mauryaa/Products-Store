import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    const userId = req.userId;
    try {
        const products = await Product.find({
            userId
        });
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.log("Error in fetching products: ", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createProduct = async function (req, res) {
    const { name, price, image } = req.body;
    const userId = req.userId;
    if (!name || !price || !image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields."
        })
    }
    try {
        const newProduct = await Product.create({
            name,
            price,
            image,
            userId
        }); // equivalent to const newProduct = new Product(product) this line create the instance; and await newProduct.save(), this line saves the doc to db
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        console.error("Error in creation of product: ", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ProductId." });
    }
    try {
        const updatedProduct = await Product.findOneAndUpdate( // returns matched product if found otherwise it returns null.
            { _id: id, userId },
            { name, price, image },
            { new: true }
        );
        if(!updateProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found or you are not authorized to update."
            })
        }
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (err) {
        console.log("Cannot update", err.message);
        res.status(500).json({ success: false, message: "Server Error." })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ProductId." });
    }
    try {
        const deletedProduct = await Product.findOneAndDelete({
            _id: id,
            userId
        });
        if(!deleteProduct) {
            return res.status(404).json({
                success:false,
                message: "You are not authorised or product not found!"
            })
        }
        res.status(200).json({ success: true, message: "Product deleted." }) // or we can return 204 which means req succeeded but no data to send back
    } catch (err) {
        console.log("Error in deleting products.");
        res.status(500).json({ success: false, message: "Server Error." })
    }
}