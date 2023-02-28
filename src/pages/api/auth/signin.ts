import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";


const prisma = new PrismaClient();
export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') { return res.status(405).json({ errorMessage: "Method not allowed" }); }
    const { email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is not valid",
        },
        {
            valid: validator.isLength(password, { min: 6 }),
            errorMessage: "Password is invalid",
        }
    ]

    validationSchema.forEach((item) => {
        if (!item.valid) {
            errors.push(item.errorMessage);
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({ errorMessage: errors[0] });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(401).json({ errorMessage: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ errorMessage: "Email or password is incorrect" });
    }


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