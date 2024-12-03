import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes'; 
import cartRoutes from "./routes/cartRoutes";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();
const app = Express();
const PORT = process.env.PORT || 3000; 


app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
}));


setupSwagger(app);


app.use(Express.json());

// Rotas
app.use('/auth', authRoutes); 
app.use('/products', authenticate, productRoutes); 
app.use('/cart', authenticate, cartRoutes); 

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server online at http://localhost:${PORT}`);
});
