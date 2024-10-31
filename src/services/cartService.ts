import { Cart } from './../../node_modules/.prisma/client/index.d';
import prisma from "../config/prisma";



class CartService {
    async addProductToCart(userId: number, productId: number, quantity: number) {
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId,
                },
                include: { items: true },
            })
        }

        const existingCartItem = cart.items.find((item: { productId: number }) => item.productId === productId);

        if (existingCartItem) {
            await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                }
            })
        }
    }



    async getCart(userId: number) {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            return { message: "Empty cart" }
        }
        return cart;

    }
}

export default CartService
