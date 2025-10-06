import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { z } from 'zod'

export const SignUp = async (req, res) => {
    const { username, email, password } = req.body;

    const requiredBody = z.object({
        username: z.string().min(3),
        email: z.string().min(4).email(),
        password: z.string().min(5).regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                  .regex(/[0-9]/, "Password must contain at least one number")
                  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    })
    const parsedWithSuccess = requiredBody.safeParse({username, email, password});
    if(!parsedWithSuccess.success) {
        const errMessage = parsedWithSuccess.error.issues.map(element => element.message);
        return res.status(400).json({
            success: parsedWithSuccess.success,
            message: errMessage
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.JWT_SECRET);
        res.status(201).json({
            success: true,
            message: "You have successfully signed up!",
            token: token
        })
    } catch (e) {
        if (e.code === 11000) {
            res.status(400).json({
                message: "Email already exists!"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }


}

export const SignIn = async (req, res) => {
    const { email, password } = req.body;
    const requiredBody = z.object({
        email: z.string().min(4).email(),
        password: z.string().min(5)
    });
    const parsedWithSuccess = requiredBody.safeParse({email, password});
    if(!parsedWithSuccess.success) {
        const errMessage = parsedWithSuccess.error.issues.map(element => element.message);
        return res.status(400).json({
            success: parsedWithSuccess.success,
            message: errMessage
        })
    }
    try {
        const user = await User.findOne({ // returns null if no user matches, returns the matching document if user is found with that email
            email: email
        });
        if (!user) {
            return res.status(403).json({  // 403 is used to send when user is unauthorized
                success: false,
                message: "Wrong Credentials!"
            })
        } 
        const passMatch = await bcrypt.compare(password, user.password); // returns true or false
        if(passMatch) {
            const token = jwt.sign({
                id: user._id.toString()   // it is imp to convert user._id to string.
            }, process.env.JWT_SECRET);
            res.status(200).json({
                success: true,
                message: "You have successfully signed in!",
                token: token
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Incorrect credentials!"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }
}