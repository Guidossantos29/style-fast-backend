import { Product } from './../../node_modules/.prisma/client/index.d';
import { Request, Response } from 'express';
import ProductService from '../services/productService';
import { error } from 'console';

interface ProductData {
    name: string;
    description: string;
    price: number;
    images?: { url: string }[];
}

class ProductController {
    product = new ProductService();

    async create(req: Request, res: Response) {
        try {
            const productData: ProductData = req.body;


            if (!productData || typeof productData.name !== 'string' || typeof productData.price !== 'number') {
                return res.status(400).json({ message: "Invalid product data" });
            }

            const product = await this.product.createProduct(productData);
            return res.status(201).json(product);
        } catch (error) {
            console.error("Error creating product:", error);
            return res.status(400).json({ message: "Failed to create product" });
        }
    }

    async getAll(req: Request, res: Response) {
        const product = await this.product.getAllProduct();
        product ? res.json(product) : res.status(404).json({ error: "product not found" });
    }

    async getById(req: Request, res: Response) {
        try {
            const product = await this.product.getProductById(Number(req.params.id));
            res.json(product)

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            }
        }

    }

    async update(req: Request, res: Response) {
        const productId = Number(req.params.id);
        const productData = req.body
        try {
            const product = await this.product.updateProduct(productId, productData);
            res.json(product)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            }

        }

    }

    async delete(req: Request, res: Response) {
        try {
            const product = await this.product.deleteProduct(Number(req.params.id));
            res.json(product)
            console.log("product deleted successfully")
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            }
        }
    }


}

export default ProductController;
