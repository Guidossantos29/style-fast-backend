
import { error } from 'console'
import { Product } from './../../node_modules/.prisma/client/index.d';
import { PrismaClient, Prisma } from "@prisma/client";

interface ProductData {
    name: string;
    description: string;
    price: number;
    images?: { url: string }[];
}

class ProductService {

    prisma = new PrismaClient()

    async createProduct(data: ProductData) {
        try {
            return await this.prisma.product.create({
                data: {
                    ...data,
                    images: {
                        create: data.images
                    }
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log("Error creating product");
                throw new Error("an unexpected error occured")

            }
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }


    }

    async getAllProduct() {
        try {
            const product = await this.prisma.product.findMany();
            if (!product) throw new Error("Product not found");
            return product
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products");
        }

    }

    async getProductById(id: number) {
        try {
            const product = await this.prisma.product.findUnique({ where: { id } })
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            throw new Error("Failed to fetch product by ID");
        }


    }

    async updateProduct(id: number, data: Partial<ProductData>) {
        try {
            const updateData: Prisma.ProductUpdateInput = {
                ...data,
                images: data.images ? {

                    create: data.images.map(image => ({ url: image.url })),
                } : undefined
            };

            return await this.prisma.product.update({ where: { id }, data: updateData });
        } catch (error) {
            console.log("Error updating product:", error);
            throw new Error("Failed to update product");
        }
    }

    async deleteProduct(id: number) {
        try {
            return await this.prisma.product.delete({ where: { id } })
        } catch (error) {
            console.error("Error deleting product:", error);
            throw new Error("Failed to delete product");
        }
    }
}

export default ProductService;