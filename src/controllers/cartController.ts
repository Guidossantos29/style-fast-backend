import { Response } from 'express';
import CartService from '../services/cartService';
import CustomRequest from '../types/express/index'; 

class CartController {
  cartService = new CartService();

  async addProductToCart(req: CustomRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthenticated user' });
    }
    const userId = req.userId;
    const { productId, quantity } = req.body;

    try {
      let cart = await this.cartService.findOrCreateCart(userId);

      const existingCartItem = cart.items.find((item) => item.productId === productId);
      if (existingCartItem) {
        await this.cartService.updateCartItem(existingCartItem.id, quantity);
      } else {
        await this.cartService.addCartItem(cart.id, productId, quantity);
      }

      return res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Error adding product to cart' });
      }
    }
  }

  async getCart(req: CustomRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthenticated user' });
    }
    const userId = req.userId;

    try {
      const cart = await this.cartService.getCart(userId);
      if (!cart) {
        return res.status(200).json({ message: 'Empty cart' });
      }
      return res.status(200).json(cart);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Error retrieving cart' });
      }
    }
  }
}

export default CartController;
