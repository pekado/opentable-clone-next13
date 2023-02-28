
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const body = req.body
        const errorMessages: string[] = []
        const validationSquema = [
            {
                valid: validator.isEmail(body.email), errorMessage: "Email is not valid ?"
            },
            {
                valid: validator.isLength(body.lastName, {
                    min: 2,
                    max: 30
                }), errorMessage: "Last name is not valid"
            },
            {
                valid: validator.isLength(body.firstName, {
                    min: 2,
                    max: 30
                }), errorMessage: "First name is not valid"
            },
            {
                valid: validator.isMobilePhone(body.phone), errorMessage: "phone is not valid"
            },
            {
                valid: validator.isLength(body.city, {
                    min: 2
                }), errorMessage: "city is not valid"
            },
            {
                valid: validator.isStrongPassword(body.password), errorMessage: "Password is not valid"
            },
        ]

        validationSquema.forEach((item) => {
            if (!item.valid) {
                errorMessages.push(item.errorMessage)
            }
        })
        if (errorMessages.length > 0) {
            res.status(400).json({ message: errorMessages[0] })
        }

        const userWithEmail = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (userWithEmail) {
            res.status(400).json({ errorMessage: "User with this email already exists" })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)

        const user = await prisma.user.create({
            data: {
                first_name: body.firstName,
                last_name: body.lastName,
                email: body.email,
                phone: body.phone,
                city: body.city,
                password: hashedPassword
            }
        })

        const alg = "HS256"
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const token = await new jose.SignJWT({ email: user.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret)
        setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 })

        return res.status(200).json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            city: user.city,
        })
    }
}