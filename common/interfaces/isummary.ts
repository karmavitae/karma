import { IFacetEducation, IFacetSalary } from "./ifacet";

export interface ISummary {
    _id:string,
    profile:any,
    name:string,
    city: string,
    country: string,
    mask:string,
    share_with:string[],
    user:string,
    experience_hours: number
    salary_range: IFacetSalary
    education: IFacetEducation[]
    opportunities: any  
}

