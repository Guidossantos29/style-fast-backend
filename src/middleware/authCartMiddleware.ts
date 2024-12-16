import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomRequest from '../types/express/index';

export const cartAuthMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; 
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (typeof decodedToken === 'object' && 'userId' in decodedToken) {
      req.userId = (decodedToken as { userId: number }).userId;
      next(); 
    } else {
      res.status(401).json({ message: 'Invalid token structure' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed' });
  }
};
