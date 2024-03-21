import https from 'http'
import { IProfile, IProfileResult } from '../../common/interfaces/iprofile'
import { ICvToKvResult } from '../../common/interfaces/icv'
import Profile from '../models/Profile'
import mongoose from 'mongoose'



export async function createKvFromCv(cv:any, userId:string): Promise<IProfileResult>  {
    let result = {status: 401, message: '', data: {} as IProfile} as IProfileResult
    let nlpResult:ICvToKvResult = await transformCV(cv)
    let kv = await mongoose.model('Profile').findOne({user_id: userId}) || new Profile() //this needs to be validated
    if(nlpResult.status === 200 && kv){
        try {
            kv.buildKvFromCv(nlpResult, userId)
            result = { status: 200, message: 'KV Created', data: kv }
        } 
        catch (error:any) {
            result = { status: 401, message: error.message, data: kv }
        }
    } else {
        result = { status: nlpResult.status, message: nlpResult.message, data: {} as IProfile}
    }
        return result
}



export async function transformCV(cv:any): Promise<any> {
    const options  = setOptions(cv.originalname)     
    return await httprequest(options, cv)
}


function httprequest(options:any, cv:any) {
    return new Promise((resolve, reject) => {
       const req = https.request(options, (res) => {
           var body:any = [];
           res.on('data', function(chunk) {
               body.push(chunk);
           });
           res.on('end', function() {
               try {
                   body = JSON.parse(Buffer.concat(body).toString());
               } catch(e) {
                   reject(e);
               }
               resolve(body);
           });
       });
       req.on('error', (e) => {
         reject(e.message);
       });
       req.write(cv.buffer)
        req.end();
   });
}


function setOptions(name:string) {
    const options = {
        hostname: '127.0.0.1',
        port : 5000,
        path: '/api/v1/cvs/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Token': process.env['API_TOKEN'],
            'Filename': name
        }
    }
    return options
}
