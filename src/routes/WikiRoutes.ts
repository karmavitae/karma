
import express, { Request, Response } from 'express';
import { facets } from '../services/FacetManager';


const router = express.Router();



router.get('/facet', async (req:Request, res: Response)=>{
    const { searchFor, searchIn } = req.query
    let result = await facets(String(searchFor), String(searchIn))
    res.status(200).json(result)
})