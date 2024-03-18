import express, { Request, Response, NextFunction } from "express";
import InformationRoutes from './InformationRoutes'

const router = express.Router()

router.use('/info/**', InformationRoutes)


export default router