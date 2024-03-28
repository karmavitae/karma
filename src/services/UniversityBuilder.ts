import { IFacetUniversity, IFacetUniversityResult } from "../../common/interfaces/ifacet";
import University from "../models/University";

export async function createUniversity(facet:string) : Promise<IFacetUniversityResult> {
    let result = {status: 401, message: '', data: {} as IFacetUniversity} as IFacetUniversityResult
    let uni = new University(buildUniversity(facet))
    try {
        let data = await uni.save()
        result.status = 200
        result.data = extractFields(data)
    } catch(error:any) {
        result.message = error
    }
    return new Promise((resolve)=>{resolve(result)})
}


function extractFields(u: IFacetUniversity): IFacetUniversity {
    let uni = {
        _id: u._id,
        name: u.name,
        search_label: u.search_label,
        abbreviation : u.abbreviation,
        city: u.city,
        country: u.country
    } as IFacetUniversity
    return uni
}

function buildUniversity(facet:string): IFacetUniversity {
    let u:IFacetUniversity = JSON.parse(facet)
    let uni = {
        name : u.name,
        city: u.city,
        country : u.country,
        class_code: 11,
        state: u.state,
        abbreviation: u.abbreviation,
        search_label: u.abbreviation ? u.name + " (" + u.abbreviation + ")" : u.name,
        status: -1

    } as IFacetUniversity
    return uni
}