import { NextFunction, Request, Response } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import CustomRequest from '../types/express'; 

class AuthMiddlers {
  private jwtSecret: string;

  constructor(secret: string) {
    this.jwtSecret = secret;
  }

  authenticate(req: CustomRequest, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized access' });
      return;
    }

    try {
      const decoded = Jwt.verify(token, this.jwtSecret) as JwtPayload & { id: number };
      req.userId = decoded.id; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
}

const authMiddlers = new AuthMiddlers(process.env.JWT_SECRET!);
export const authenticate = authMiddlers.authenticate.bind(authMiddlers);
