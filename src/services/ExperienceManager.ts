import mongoose from "mongoose";
import { IExperience } from "../../common/interfaces/iexperience";
import { IProfile, IProfileResult } from "../../common/interfaces/iprofile";
import Experience from "../models/Experience";

export class ExperienceManager {
    
    static async process(requestFor:string, experience:IExperience, kvId:string) : Promise<IProfileResult> {
        let result = {status: 401, message: '', data: {} as IProfile} as IProfileResult
        if(this.isRequestValid(requestFor, experience, kvId)){
            let id = new mongoose.Types.ObjectId(kvId)
            switch(requestFor) {
                case "create" : {
                    return this.create(id, experience);
                }
                case "update" : {
                    return this.update(id, experience);
                }
                case "destroy" : {
                    return this.destroy(id, experience)
                }
                default : {
                    result.message = "Invalid Request"
                    return result
                }
            }
        } else {
            result.message = "Missing required parameters"
            return result
        }
        
    }

    static async create(kvId: mongoose.Types.ObjectId, exp:IExperience): Promise<IProfileResult>  {
        let result = {status: 401, message: '', data: {} as IProfile} as IProfileResult
        let experience = new Experience(exp)
        experience._id = new mongoose.Types.ObjectId()
        try {
            let kv = await mongoose.model('Profile').findOne({_id: kvId})
            kv.experiences.push(experience)
            kv.build()
            result = {status: 200, message: "Experience created successfully", data: kv}
    
        } catch (error:any) {
            result.message = error.message
        }
        return result
    }
    
    static async update(kvId:mongoose.Types.ObjectId, exp:IExperience): Promise<IProfileResult>  {
        let result = {status: 401, message: '', data: {} as IProfile} as IProfileResult
        try {
            let kv = await mongoose.model('Profile').findOne({_id: kvId})
            const index = kv?.experiences.findIndex((experience:IExperience) => String(experience._id) === String(exp._id))
            if(index != -1 ) {
                kv?.experiences.splice(index, 1, exp)
                await kv?.build()
            }
            if(kv) result = {status: 200, message: "Experience updated successfully", data: kv}
    
        } catch (error:any) {
            result.message = error.message
        }
        return result
    }
    
    static async  destroy(kvId: mongoose.Types.ObjectId, exp:IExperience): Promise<IProfileResult> {
        let result = {status: 401, message: '', data: {} as IProfile} as IProfileResult
        try {
            let kv = await mongoose.model('Profile').findOne({_id: kvId})
            const index = kv?.experiences.findIndex((experience:IExperience) => String(experience._id) === String(exp._id))
            if(index != -1) {
                kv?.experiences.splice(index,1)
                await kv?.build()
            }
            if(kv) result = {status: 200, message: "Experience deleted successfully", data: kv}
    
        } catch (error:any) {
            result.message = error.message
        }
        return result
    }
    
    static isRequestValid(requestFor:string, experience:any, kvId:string): boolean {
        return  requestFor && experience && kvId
    }
}