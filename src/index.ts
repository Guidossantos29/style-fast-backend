import  Express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Prisma, PrismaClient } from "@prisma/client";


dotenv.config();
const app = Express();
const prisma = new PrismaClient();
const PORT = process.env.PORT

app.use(cors());

app.listen(PORT,() => {
    console.log("server online local");
    
})



