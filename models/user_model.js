import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI=process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    image:String
})

export default mongoose.model(process.env.COLLECTION_NAME,userSchema);
