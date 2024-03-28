import { IUser, IUserActivation, IUserResult, IUserXs } from "../../common/interfaces/iuser";
import User from "../models/User";
import { getCode, verifyPassword } from "./SecretHandler";
import { send } from "./MailManager";
import { encryptCode } from './SecretHandler'
import crypto, { verify } from 'crypto'
import { IResult } from "../../common/interfaces/igen";
import Profile from "../models/Profile";
import Summary from "../models/Summary";
import Network from "../models/Network";
import mongoose from "mongoose";

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


export async function createMember(userData:IUserXs, registerAs:number, mailFor:number): Promise<boolean>  {
    let result:boolean = false
    const verificationCode = getCode()
    const verification_digest = await encryptCode(verificationCode, 'activation')

    let profile = new Profile()
    let summary = new Summary()
    let network = new Network()
    let user = mailFor === 3 ? await User.findOne({email: userData.email}) || new User() : new User()  
    
    user.first_name = user.first_name ? user.first_name : userData.first_name
    user.last_name = user.last_name ? user.last_name : userData.last_name
    user.email = user.email ? user.email : userData.email
    user.is_verified = false
    user.verification_digest = verification_digest,
    user.expires = Date.now() + (24*60*60*1000),
    user.user_type = registerAs,
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
        result = await send(user.email, user.first_name, mailFor, "", "", verificationCode)
    }

    return result
}


export async function requestPasswordReset(email: string): Promise<IResult> {
    const verificationCode = crypto.randomBytes(16).toString('hex')
    const verificationHash = await encryptCode(verificationCode, 'verification')
    let result = {} as IResult
    if(verificationHash){
        let u = await Promise.resolve(User.findOne({email: email}))
        if (u && u.status > 0){
            u.is_verified = false 
            u.password_digest = ''
            u.verification_digest = verificationHash,
            u.expires = Date.now() + 1*60*60*1000 
            try{
                await u.save()
                await send(u.email, u.first_name, 4 , "", "", verificationCode)
                result = { status: 200, message: "We have sent you password reset link to your registered email address."}
            }catch (error:any) {
                result = { status: 401, message: "Server Error"} 
            }
        }else {
            result = {status: 401, message:  u?.status === -1 ? "Your account is not yet activated" : "Invalid User Email"}
        } 
    } else {
        result = {status: 401, message: "Token generation error"}
    }

    return result
}

export async function resetPassword(email: string, reset_key:string, password:string) {
    let user = await User.findOne({email: email})
    let result = {status:401, message: ''} as IResult
    if(user){
        let isMatch = await verifyPassword(reset_key, user.verification_digest, 'reset')
        if(user.expires >= Date.now() && isMatch && user.is_verified === false){
            let password_digest = await encryptCode(password, 'password')
            try {
                await User.updateOne({email: user.email}, {$set: {
                    password_digest: password_digest,
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

export async function authenticateUser(email:string, password:string): Promise<IUserResult> {
    let result = {status: 401, message: 'Invalid login ID or password', data: {} as IUser} as IUserResult
    let user = await User.findOne({email: email}, {first_name: 1, last_name: 1, user_type: 1, password_digest: 1})
    if(user && user.password_digest) {
        let isMatch = await verifyPassword(password, user.password_digest, 'password')
        if(isMatch)  { result = {status: 200, message: 'Authentication successful', data: user}} 
    }
    return result
    
}

export async function activateUser(userData:IUserActivation): Promise<IResult> {
    let user = await User.findOne({email: userData.email})
    let result = {status:401, message: ''} as IResult
    if(user){
        let isMatch = await verifyPassword(userData.activation_code, user.verification_digest, 'activation')
        if(user.expires >= Date.now() && isMatch && user.is_verified === false){
            let password_digest = await encryptCode(userData.password, 'password')
            try {
                await User.updateOne({email: user.email}, {$set: {
                    password_digest: password_digest,
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




