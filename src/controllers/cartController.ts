import { error } from 'console';
import { Product, Cart } from './../../node_modules/.prisma/client/index.d';
import { Request,Response } from "express";
import prisma from "../config/prisma";

class CartController {
    async addProductToCart(req: Request, res: Response) {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated user" });
      }
  
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      try {

        let cart = await prisma.cart.findUnique({
            where: {userId},
            include: {items:true}
        })

        if(!cart){
            cart = await prisma.cart.create({
                data: {
                    userId,
                },
                include: {items:true},
            })
        }

        const existingCartItem = cart.items.find((item) => item.productId === productId )

        if(existingCartItem) {
            await prisma.cartItem.update({
                where: {id: existingCartItem.id},
                data: {
                    quantity: existingCartItem.quantity + quantity,
                },
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                }
            })
        }

        return res.status(200).json({ message: "Product added to cart successfully" });
        
      } catch(error){
        if(error instanceof Error){
            res.status(500).json({error:"Error adding product to cart" })
        }
      }

      

  
      
    }
  
    async getCart(req: Request, res: Response) {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated user" });
      }
  
      const userId = req.user.id;
  
      
    }
  }

  export default CartController
  