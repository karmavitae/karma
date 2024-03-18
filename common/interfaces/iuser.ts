import { IResult } from "./igen"

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
    kv: IKProfile,
    ksummary: IKSummary,
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


export interface IKProfile {
    _id: any
}

export interface IKSummary {
    _id: any
}

export interface INetwork {
    _id: any
}


export interface IUserResult extends IResult {
    data: IUser
}