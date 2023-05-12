import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://tutuananh975:Tunglon1995@cluster0.fcukavx.mongodb.net/ghien-phim');
        console.log('connect mongodb successfully!!!');
    } catch(err) {
        console.log('connect failded!');
    }
}

export default dbConnect;