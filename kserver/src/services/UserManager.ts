import { IUserXs } from "../../common/interfaces/iuser";
import User from "../models/User";
import { getCode } from "./SecretHandler";
import { send } from "./MailManager";
import mongoose from 'mongoose'

// User Regisration mails: 0-Register Interest, 1: Activation Mail, 2 Aspirant Activation , 3 Invitation on regisert interest, 4 Password reset, 5 Referee Activation

export async function registerUser( userData: IUserXs, mailFor:number = 0, registerAs: number = 0): Promise<boolean> {
    let result:boolean = false

    if(registerAs === 0) {
        let user = new User(userData)
        user.status = -1
        try { 
            let us = await user.save()
            result = await send(user.email, user.first_name, mailFor, "", "", "")
        } catch (error:any) {

            result = false 
        }

    }else { 
        result = await createMember(userData, registerAs, mailFor)
    }

    return result
}


async function createMember(userData:IUserXs, registerAs:number, mailFor:number): Promise<boolean>  {
    let result:boolean = false
    const verificationCode = getCode()
    // const verification_digest = await encryptCode(verificationCode, 'verification')

    // let kprofile = new Kprofile()
    // let ksummary = new Ksummary()
    // let user = new User(
    //     {
    //         first_name: userData.first_name,
    //         last_name: userData.last_name,
    //         email: userData.email,
    //         verification_digest: verification_digest,
    //         expires: Date.now() + (24*60*60*1000),
    //         user_type: registerAs
            // kprofile: kprofile._id,
    //         // ksummary: ksummary.id
    //     }
    // )
    // kprofile.user = user._id
    // kprofile.ksummary = ksummary._id
    // ksummary.user = user._id 
    // ksummary.kprofile = kprofile._id
//     const session = await mongoose.startSession()
//     session.startTransaction()
//     try {
//         await user.save()
//         // await kprofile.save()
//         // await ksummary.save()
//         result = await send(user.email, user.first_name, mailFor, "", "", verificationCode)
//         await session.commitTransaction()
//         console.log('user created successfully!')
//     } catch (error) {
//         await session.abortTransaction()
//         console.log('aborted!')
//     } finally {
//         session.endSession()
//     }

    return true
}