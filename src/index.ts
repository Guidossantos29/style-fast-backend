import  Express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Prisma, PrismaClient } from "@prisma/client";


dotenv.config();
const app = Express();
const prisma = new PrismaClient();


app.use(cors());

app.listen(3000,() => {
    console.log("server online local");
    
})



