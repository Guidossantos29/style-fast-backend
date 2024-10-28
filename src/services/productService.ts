import { PrismaClient } from "@prisma/client";

class ProductService {
    
    prisma =  new PrismaClient()
   
    async createProct(data: any){
        return await this.prisma.product.create({data});

    }

    async getAllProduct(){
        return await this.prisma.product.findMany();
    }

    async getProductById(id:number){
        return await this.prisma.product.findUnique({where:{id}})

    }

    async updateProduct(id:number,data: any){
        return await this.prisma.product.update({where: {id},data})
    }

    async deleteProduct(id: number){
        return await this.prisma.product.delete({where:{id} })
    }
}