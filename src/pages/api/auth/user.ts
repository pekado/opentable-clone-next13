import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"


const prisma = new PrismaClient()

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const bearerToken = req.headers["authorization"] as string
        const token = bearerToken.split(" ")[1]
        const payload = jwt.decode(token) as { email: string }

        if (!payload) {
            res.status(401).json({ message: "No token provided" })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                email: true,
                first_name: true,
                last_name: true,
                phone: true,
                city: true,
                id: true
            }
        })
        if (!user) {
           return res.status(401).json({ message: "User not found" })
        }
       return res.status(200).json({ 
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        city: user.city,
        })
    }
}