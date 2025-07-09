import mongoose from 'mongoose'


const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://pramod73kumar7415:qXZ2lC2hYOrNCzdi@cluster0.ysbbdul.mongodb.net/MernAuth`);
        console.log(`connected`);  
    }catch(error){
        console.log("Error",error); 
    }
}


export default connectDB;