import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`); // conn.connection.host: Returns the host address (hostname or IP) of the MongoDB server that Mongoose is currently connected to.
        
    } catch(err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}