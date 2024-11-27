import { Request } from 'express';

interface CustomRequest extends Request {
  userId?: number;
}

export default CustomRequest;
