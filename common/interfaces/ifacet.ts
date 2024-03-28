import { IResult, IS2N } from "./igen"

export interface IFacet {
    _id: any 
    name: string 
    search_label: string
    class_code: number
    code: number 
    category: string
    status:number
    description?: string
    abbreviation?: string
}

export interface IFacetProficiency extends IFacet {
    n_gram: string 
    demand_count: number
    supply_count: number
    automation_index: number
    children: any[]
    parent: any[]
    is_transferable: boolean
}


export interface IFacetPost extends IFacet {
    endorsements: number
}



export interface IFacetExperience {
    _id: any 
    name: string 
    search_label?: string
    class_code: number 
    hours: IS2N //total and verified 
    endorsements: number 
    comfort_level: number
    count?:number
    posts?: any[]
    score_card?: number[]
    parent?: any[]
}



export interface IFacetSalary {
    code: number
    name: string 
    search_lable?: string
    min?:number
    max?:number
}

export interface IFacetUniversity extends IFacet {
    city: string,
    state: string,
    country: string,
    abbreviation: string
}

export interface IFacetAcadDegree extends IFacet {
    abbreviations: string
}

export interface IFacetEducation {
    level: number 
    field_of_study: string
}


export interface IFacetUniversityResult extends IResult {
    data: IFacetUniversity
}

export interface IFacetResult extends IResult {
    data: IFacet
}