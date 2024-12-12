import express, { Request, Response } from 'express';
import CartController from '../controllers/cartController';

const router = express.Router();
const cartController = new CartController();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to the cart
 *     description: Adds a product to the user's cart. Requires authentication.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID of the product to add.
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to add.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *       401:
 *         description: Unauthenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthenticated user
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error adding product to cart
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    await cartController.addProductToCart(req, res);
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     description: Retrieves the cart for the authenticated user. Requires authentication.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Cart ID.
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   description: ID of the user who owns the cart.
 *                   example: 1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         description: ID of the product in the cart.
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         description: Quantity of the product in the cart.
 *                         example: 2
 *       401:
 *         description: Unauthenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthenticated user
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error retrieving cart
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    await cartController.getCart(req, res);
  } catch (error) {
    console.error('Erro ao obter o carrinho:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
