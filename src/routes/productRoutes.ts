import express from 'express';
import ProductController from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const productController = new ProductController();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', authenticate, async (req, res) => {
    try {
        await productController.create(req, res);
    } catch (error) {
        res.status(500).json({ error: "Error creating product" });
    }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Return all produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       404:
 *         description: Nenhum produto encontrado
 */
router.get('/', authenticate, (req, res) => productController.getAll(req, res));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna a product for ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Detalhes do produto
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', authenticate, (req, res) => productController.getById(req, res));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: update a product 
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', authenticate, (req, res) => productController.update(req, res));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', authenticate, async (req, res) => {
    try {
        await productController.delete(req, res);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});

export default router;
