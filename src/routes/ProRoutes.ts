
import express, { Request, Response } from 'express';
import multer from 'multer'
import { getKv } from '../services/KvManager';
import { facets, salaryRange } from '../services/FacetManager';
import { ExperienceManager } from '../services/ExperienceManager';
import { createKvFromCv } from '../services/NlpBroker'
import { processPost } from '../services/PostManager';
import { processResponse } from '../services/ResponseManager';


const storage = multer.memoryStorage()
const upload = multer({ storage : storage})
const router = express.Router();

router.use((req, res, next)=>{

})

router.get('/', async (req:Request, res:Response)=>{
    const { id } = req.query
    // if(res.locals.isAuthenticated){
        
        let result = {}
        if(id){result = await getKv(String(id))}
        res.status(200).json(result)
    // }else {
    //     res.status(404)
    // }
    
})



router.get('/meta', (req:Request, res: Response)=>{
    let result = {
        "industries" : req.app.locals.industries,
        "business" : req.app.locals.business,
        "countries" : req.app.locals.countries,
        "degrees"  : req.app.locals.degrees,
        "voluntary" : req.app.locals.voluntary
    }
    res.status(200).json(result)
})


router.get('/salaryrange', async (req: Request, res: Response)=>{
    const { country } = req.query
    let result = await salaryRange(String(country))
    res.status(200).json(result)
})

router.post('/cv', upload.single('cv'), async (req: Request, res: Response)=>{
    const cv = req.file
    const userId = '6516c5ffdd78f79b05262340'
    let result = await createKvFromCv(cv, userId)
    res.status(200).json(result)
})

router.post('/experience', async (req:Request, res:Response)=>{
    const { kvId, requestFor, experience} = req.body
    let result = await ExperienceManager.process(requestFor, experience, kvId)
    res.status(200).json(result)
})

router.post('/post', async (req: Request, res: Response)=>{
    const { postFor, post} = req.body
    let result = await processPost( post)
    res.status(200).json(result)
})

router.post('/response', async (req: Request, res: Response)=>{
    const { requestFor, response } = req.body
    let result = await processResponse(response)
    res.status(200).json({status: 200, message: 'ok'})
    
})

export default router;

