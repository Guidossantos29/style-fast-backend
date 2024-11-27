import  Express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Prisma, PrismaClient } from "@prisma/client";
import { setupSwagger } from "./config/swagger";
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes'; 
import cartRoutes from "./routes/cartRoutes";


dotenv.config();
const app = Express();
const PORT = process.env.PORT

app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-type','Authorization']
}));

setupSwagger(app);

app.use(Express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart',cartRoutes)


app.listen(PORT,() => {
    console.log(`Server online at http://localhost:${PORT}`);
    
})


