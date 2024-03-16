import { IS2N } from "./igen"

export interface IFacet {
    _id: any 
    name: string 
    search_label: string
    code?: number 
    category?:string
    value?: string
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

export interface IFacetUniversity {

}