import express, { Request, Response, NextFunction } from "express";
import { getInfo } from "../services/InformationService";
import { IArticle } from "../../common/interfaces/iarticle";
import { facets } from "../services/FacetManager";

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

router.get('/countries', async( req: Request, res: Response )=>{
    let result = await facets("", "countries")
    res.status(200).json(result)
})



export default router