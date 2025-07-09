import mongoose from 'mongoose'


const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://pramod73kumar7415:qXZ2lC2hYOrNCzdi@cluster0.ysbbdul.mongodb.net/MernAuth`);
    
    }catch(error){
        res.json({success:false, message: `${error} some error occured`})
    }
}


export default connectDB;