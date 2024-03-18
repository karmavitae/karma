import { IUser, IUserResult, IUserXs, IUserXsResult } from "../../../common/interfaces/iuser";
import User from "../models/User";
import { getCode } from "./SecretHandler";
import { send } from "./MailManager";
import { encryptCode } from './SecretHandler'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { IResult } from "../../../common/interfaces/igen";

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


export async function requestPasswordReset(email: string): Promise<IResult> {
    const verificationCode = crypto.randomBytes(16).toString('hex')
    const verificationHash = await encryptCode(verificationCode, 'verification')
    let result = {} as IResult
    if(verificationHash){
        let u = await Promise.resolve(User.findOne({email: email}))
        if (u){
            u.is_verified = false 
            u.password_digest = ''
            u.verification_digest = verificationHash,
            u.expires = Date.now() + 1*60*60*1000 
            try{
                await u.save()
                await send(u.email, u.first_name, 4 , "", "", verificationCode)
                result = { status: 200, message: "Reset successful!"}
            }catch (error:any) {
                result = { status: 401, message: "Server Error"} 
            }
        }else {
            result = {status: 401, message: "Invalid User Email"}
        } 
    } else {
        result = {status: 401, message: "Token generation error"}
    }

    return result
}

export async function resetPassword(email: string, password:string) {
    let user = await User.findOne({email: email})
    let result = {status:401, message: ''} as IResult
    if(user){
        if(user.expires <= Date.now() && user.is_verified === false){
            try {
                await User.updateOne({email: user.email}, {$set: {
                    password_digest: encryptCode(password, 'password'),
                    is_verified: true,
                    verification_digest: '',
                    expires: 0
                }})
                result.status = 200 
                result.message = "Password reset successful!"

            } catch (error:any) {
                result.message = "Password Reset Failed!"
            }
        } else {
            result.message = "Invalid Password Reset Link or link has expired "
        }
    }
    
    return result
    
}