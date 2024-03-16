export interface IS2S {
    [key:string]: string
}
export interface IS2N {
    [key:string]: number
}
export interface IN2S {
    [key:number]: string
}

export interface IN2N {
    [key:number]: number
}


export interface IResultCrypto extends IResult {
    data?: string
}

export interface IResult {
    status: number 
    message: string
}