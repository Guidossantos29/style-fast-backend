import express, { Request, Response } from 'express';
import CartController from '../controllers/cartController';

const router = express.Router();
const cartController = new CartController();

router.post('/', async (req: Request, res: Response) => {
    try {
        await cartController.addProductToCart(req, res);
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        await cartController.getCart(req, res);
    } catch (error) {
        console.error("Erro ao obter o carrinho:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

export default router;
