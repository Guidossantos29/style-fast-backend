import { error } from 'console';

import { Request, Response } from "express";
import authServiceUser from '../services/authServiceUser';


class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const serviceAuth = new authServiceUser()
        try {

            const user = await serviceAuth.registerUser(email, password)
            res.status(201).json(user)


        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: "Unknown error occurred" });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const serviceAuth = new authServiceUser();
        try {
            const { token } = await serviceAuth.loginUser(email, password);
            res.json(200).json({ token });

        } catch(error){
            if(error instanceof Error){
                res.status(400).json({error: error.message})
            }
        }
    }

    

}

export default AuthController;
