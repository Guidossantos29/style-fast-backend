import { error } from 'console';
import { NextFunction, Request,Response } from "express";
import  Jwt  from "jsonwebtoken";

class AuthMiddlers {
    private jwtSecret: string;

    constructor(secret: string){
        this.jwtSecret = secret;
    }

    authenticate(req: Request,res: Response,next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).json({message:'Unauthorized access'})
        }

        try {
            const decoded = Jwt.verify(token,this.jwtSecret);
            req.user = decoded
            next()
        } catch(error){
            return res.status(401).json({message: 'Invalid token'})

        }
    }
}

const authMiddlers = new AuthMiddlers(process.env.JWT_SECRET!);

export const authenticate = authMiddlers.authenticate.bind(authMiddlers);