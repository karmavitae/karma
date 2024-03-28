import mongoose from "mongoose"
import { encryptCode, getCode } from "./SecretHandler"
import Profile from "../models/Profile"
import Summary from "../models/Summary"
import Network from "../models/Network"
import User from "../models/User"
import { send } from "./MailManager"

export async function sendActivationInvite(members:string[]): Promise<string[]> {
    let failedActivateion:string[] = []
    for(let i = 0; i < members.length; i++) {
        let memberId = new mongoose.Types.ObjectId(members[i])
        let result = await activateMember(memberId)
        if(result.length>0) { failedActivateion.push(result)}
    }
    return failedActivateion
}


async function activateMember(memberId: mongoose.Types.ObjectId ): Promise<string>  {
    let result:boolean = false
    const verificationCode = getCode()
    const verification_digest = await encryptCode(verificationCode, 'activation')

    let profile = new Profile()
    let summary = new Summary()
    let network = new Network()
    let user = await User.findOne({_id: memberId})
    if(user && user.status === -1) {
        user.is_verified = false
        user.verification_digest = verification_digest,
        user.expires = Date.now() + (24*60*60*1000),
        user.user_type = 10,
        user.status = 1
        user.profile = profile._id,
        user.summary =  summary._id,
        user.network = network._id
            
        profile.user = user._id
        profile.summary = summary._id
        summary.user = user._id 
        summary.profile = profile._id
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            await user.save()
            await profile.save()
            await summary.save()
            await network.save()
            await session.commitTransaction()
            result=true
        } catch (error) {
            await session.abortTransaction()
            result = false
        } finally {
            session.endSession()
            result = await send(user.email, user.first_name, 3, "", "", verificationCode)
            console.log(result)
        }
        return ''
    }  
    else {
        return String(memberId)
    }

}