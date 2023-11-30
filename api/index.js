import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to MongoDB!!');
})
.catch((err)=>{
    console.log(err);
}
);
const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log('Server is running on port 3000');

}
);
app.use('/api/auth', authRouter);
// create a function to manage all error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message||'Internal Serval error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});