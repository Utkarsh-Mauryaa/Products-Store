import mongoose from "mongoose";

const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}) // it allows mongoose to add createdAt and updatedAt field for each document

const Product = mongoose.model('Product', productSchema); // we are making a collection, mongoose pluralizes and lowercases the Product so collection name becomes products

export default Product;