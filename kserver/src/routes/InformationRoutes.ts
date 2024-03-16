import express, { Request, Response, NextFunction } from "express";
import { getInfo } from "../services/InformationService";
import { IArticle } from "../../../common/interfaces/iarticle";

const router = express.Router()


router.get('/', async(req:Request, res:Response)=>{
    const { informationFor } = req.query
    let result:IArticle
    if(informationFor) {
        result = getInfo(String(informationFor))
        res.status(200).json(result)
    }else {
        res.status(404)
    }
})



export default router