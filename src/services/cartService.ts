import prisma from '../config/prisma';

class CartService {
  async findOrCreateCart(userId: number) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    return cart;
  }

  async updateCartItem(cartItemId: number, quantity: number) {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  async addCartItem(cartId: number, productId: number, quantity: number) {
    await prisma.cartItem.create({
      data: { cartId, productId, quantity },
    });
  }

  async getCart(userId: number) {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }
}

export default CartService;
