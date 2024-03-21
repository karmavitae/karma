import mongoose, { Types } from "mongoose";
import Profile from '../models/Profile'
import { IProfile, IProfileResult } from "../../common/interfaces/iprofile";



export async function getKv(Id: string): Promise<IProfileResult> {
    let userId = new Types.ObjectId(Id)
    let result = {status: 401, message: '', data: {} as IProfile} as IProfileResult
    try {
        let kv = await Profile.findOne({user: userId})
        result = kv ? {status: 200, message: "kv", data: kv} : result
    } catch (error:any) {
        result.message = error.message
    }
    return result
}

export async function createKV(userId: mongoose.Types.ObjectId): Promise <IProfile> {
    let kvData = {} as IProfile
    kvData._id = new Types.ObjectId()
    kvData.user = userId
    let kv = new Profile(kvData)
    let data = await kv.save()
    return data
}
