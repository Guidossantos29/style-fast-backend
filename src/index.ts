import  Express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Prisma, PrismaClient } from "@prisma/client";
import { setupSwagger } from "./config/swagger";
import authRoutes from './routes/authRoutes';


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

app.listen(PORT,() => {
    console.log(`Server online at http://localhost:${PORT}`);
    
})

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes";
// import { setupSwagger } from "./config/swagger";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());  // Middleware para JSON
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// setupSwagger(app);  // Swagger configurado antes das rotas

// app.use("/auth", authRoutes);

// app.listen(PORT, () => {
//     console.log(`Server online at http://localhost:${PORT}`);
// });


