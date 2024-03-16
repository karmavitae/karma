import express, { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/UserManager";

const router = express.Router()


router.post('/register', async(req:Request, res:Response)=>{
    const { first_name, last_name, email } = req.body
    let result = await registerUser({first_name: String(first_name), last_name: String(last_name), email: String(email)})
    let responseData =  result ? { status: 200, message: 'Confirmation Sent'} : {status: 401, message: 'Registration Failed'}
    res.status(200).json(responseData) 
})


// router.get('/activate')

// router.post('/activate')

// router.post('/reset')



export default router