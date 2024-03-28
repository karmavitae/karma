import express, { Request, Response, NextFunction } from "express";
import { isRouteAllowed } from "../services/RouteAccessHandler";
import User from "../models/User";
import { sendActivationInvite } from "../services/InvitationManager";

const router = express.Router()

router.use(isRouteAllowed('adm'))

router.get('/users', async (req: Request, res: Response)=>{
    if(req.isAuthenticated()) {
        let result = await User.find({})
        res.status(200).json(result)
    }else {
        res.status(401).json({message: "Unauthorised request"})
    }
})

router.post('/invite', async(req: Request, res: Response)=>{
    let result:string[] = []
    const { invitees } = req.body
    console.log('from invite route :', req.body)
    if(invitees){    
        result = await sendActivationInvite(invitees)
    }
    res.status(200).json({status: 200, data: result })
})

export default router