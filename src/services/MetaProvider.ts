import { NextFunction, Request, Response } from 'express';
import Industry from '../models/Industry';
import Country from '../models/Country';
import BusinessArea from '../models/BusinessArea';
import AcademicDegree from '../models/AcademicDegree';
import VoluntaryArea from '../models/VoluntaryArea';
import mongoose from 'mongoose';
import { IMetaOptions } from '../../common/interfaces/imeta';
import Dimension from '../models/Dimension';


export async function mex(req: Request, res: Response, next: NextFunction) {
    let result = {} as IMetaOptions
    if( !req.app.locals.mex ){
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            result['industries'] = await Industry.find({}, {'name' :1, 'search_label': 1})
            result['countries'] = await Country.find({}, {'name' :1, 'search_label': 1})
            result['business'] = await BusinessArea.find({}, {'name' :1, 'search_label': 1})
            result['degrees'] = await AcademicDegree.find({}, {'name' :1, 'search_label': 1})
            result['voluntary'] = await VoluntaryArea.find({}, {'name' :1, 'search_label': 1})
            result['dimensions'] = await Dimension.find({}, {'name': 1, 'code': 1, 'search_label': 1, 'category': 1})
            await session.commitTransaction()
            console.log('Data fetched successfully')
        } catch (error) {
            await session.abortTransaction()
            console.log('aborted!')
        } finally {
            req.app.locals.mex = result
            session.endSession()
        }
    } 

    next()
}