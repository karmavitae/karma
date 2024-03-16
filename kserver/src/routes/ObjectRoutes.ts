import express, { Request , Response} from "express";
import User from "../models/User";

const router = express.Router()

router.get('/', async (req: Request, res: Response)=>{
    if(req.isAuthenticated()) {
        let result = await User.find({})
        res.status(200).json(result)
    }
})




export default router