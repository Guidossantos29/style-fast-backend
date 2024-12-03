import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

class AuthServiceUser {


    async registerUser(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        return prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
        })
    }

    async loginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials")
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1h"
        })

        return { token };
    }





}

export default AuthServiceUser

