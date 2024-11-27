import { Request, Response } from 'express';
import ProductService from '../services/productService';


interface ProductData {
    name: string;
    description: string;
    price: number;
    stock: number;
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
            const productId = Number(req.params.id);
            const deletedProduct = await this.product.deleteProduct(productId);
    
            if (!deletedProduct) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }
    
            res.status(200).json({ message: "Produto excluído com sucesso" });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            res.status(400).json({ error: "Falha ao excluir o produto" });
        }
    }
    


}

export default ProductController;
