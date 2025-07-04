import express from 'express'
import dotenv from'dotenv'
import connectDB from './config/db.js'
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()
connectDB();
const app=express();
app.use(express.json())









app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

const __dirname= path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })

} else {
    app.get('/',(req,res)=>{
        res.send('API is running')
        });
}


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`surver running on port ${PORT}`))
