import { IResult } from "./igen"
import { INetwork } from "./inetwork"
import { IProfile } from "./iprofile"
import { ISummary } from "./isummary"

export interface IUser {
    _id: any
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    email: string,
    user_type:number,
    status: number,
   
    mobile: string,
    address_1: string,
    address_2: string,
    post_code: string,
    city: string,
    country: string,
   
    password_digest: string, 
    verification_digest: string,
    is_verified: boolean,
    verified_at: Date,
    expires: number

    subscriptions:Array<any>,
    profile: IProfile,
    summary: ISummary,
    network: INetwork
}

export interface IUserXs {
    first_name: string 
    last_name: string 
    email: string
}


export interface IUserXsResult extends IResult{
    data: IUserXs
}

export interface IUserRegistrationResponse {
    status: number 
    message: string
}






export interface IUserResult extends IResult {
    data: IUser
}