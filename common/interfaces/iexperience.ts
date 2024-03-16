import { IFacet, IFacetExperience, IFacetSalary, IFacetUniversity } from "./ifacet"
import { IResult, IS2N } from "./igen"

export interface IExperience {
    _id: any
    version: number
    is_current: boolean
    is_dirty: boolean
    category: number
    specification: IFacet

    title: string


    start_date: Date
    end_date: Date 
    hours: IS2N
    commitment: IFacet

    proficiencies: IFacetExperience
    endorsments: number

    organization?: string
    
    salary_range?: IFacetSalary
    business_areas?: IFacet
    industry?: IFacet


    university?: IFacetUniversity
    degree?: IFacet
    field_of_studies?: IFacet

    hobbies?: IFacet
    voluntary_areas?: IFacet

    city: string 
    country: IFacet
}



export interface IExperienceResult extends IResult {
    data:IExperience
}

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










