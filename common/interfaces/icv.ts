import { IResult } from "./igen"

export interface ICVExperience {
    version:number,
    title: string,
    is_current: boolean,
    is_dirty: boolean,

    category: number,
    commitment: number,
    start_date: Date, 
    end_date: Date,

    organization: string,
    country: string,
   
    proficiencies: string[]
}

export interface ICvToKv {
    cv_experiences: ICVExperience[]
    cv_catalogue: string []
}

export interface ICvToKvResult extends IResult {
    data:ICvToKv
}