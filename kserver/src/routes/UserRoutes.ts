import express, { Request, Response, NextFunction } from "express";
import { registerUser, requestPasswordReset, resetPassword } from "../services/UserManager";
import { IResult } from "../../../common/interfaces/igen";

const router = express.Router()


router.post('/register', async(req:Request, res:Response)=>{
    const { first_name, last_name, email } = req.body
    let result = await registerUser({first_name: String(first_name), last_name: String(last_name), email: String(email)})
    let responseData =  result ? { status: 200, message: 'Confirmation Sent'} : {status: 401, message: 'Registration Failed'}
    res.status(200).json(responseData) 
})


router.get('/activate', async(req:Request, res:Response)=>{
    const{ email, activationCode } = req.query
    console.log(email, activationCode)
    res.status(200).json({status: 200, message: "Very bac"})
})

router.post('/recover', async(req: Request, res: Response)=>{
    const {email} = req.body
    let result = {} as IResult
    if(email){
        result = await requestPasswordReset(String(email))
    }
    res.status(200).json(result)
})

router.post('/reset', async(req: Request, res: Response) => {
    const{email, password} = req.body 
    let result = {} as IResult
    if(password && email) {
        result = await resetPassword(String(email), String(password))
    }
    res.status(200).json(result)
})



export default router