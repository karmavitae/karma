
import express, { NextFunction, Request, Response } from 'express';
import { facets, salaryRange } from '../services/FacetManager';
import { isRouteAllowed } from '../services/RouteAccessHandler';
import { createUniversity } from '../services/UniversityBuilder';
import { createFacet } from '../services/FacetBuilder';


const router = express.Router();

router.use(isRouteAllowed('wiki'))

router.get('/facet', async (req:Request, res: Response)=>{
    const { searchFor, searchIn, count } = req.query
    let matchCount = Number(count) ? Number(count) : 10
    let result = await facets(String(searchFor), String(searchIn), matchCount)
    res.status(200).json(result)
})

router.post('/facet', async (req:Request, res: Response)=>{
    const {data, facetFor} = req.body
    let result = await createFacet(data, String(facetFor))
    res.status(200).json(result)
})

router.post('/uni', async (req:Request, res:Response)=>{
    const { data } = req.body
    let result = await createUniversity(data)
    res.status(200).json(result)
 })


router.get('/mex', async (req:Request, res: Response)=>{
    if(req.app.locals.mex && Object.keys(req.app.locals.mex).length> 0){
        res.status(200).json(req.app.locals.mex)
    }
    else {
        res.status(200).json({status: 200, message: "Invalid request"})
    }
})

router.get('/salary', async (req: Request, res: Response)=>{
    const { country } = req.query
    console.log(country)
    let result = await salaryRange(String(country))
    res.status(200).json(result)
})

router.get('**', async(req: Request, res: Response)=> {
    res.status(200).json({status: 200, message: "dead end"})

})

export default router