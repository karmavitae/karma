
export interface IFacet {
    _id: any 
    name: string 
    search_label: string
    code?: number 
    category?:string
    description?: string
}

export interface IFacetProficiency extends IFacet {
    class_code: number
    n_gram: string 
    demand_count: number
    supply_count: number
    automation_index: number
    children: any[]
    parent: any[]
    status: number 
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
    hours: number //total and verified 
    verified_hours: number
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

export interface IFacetEducation {
    level: number 
    field_of_study: string
}