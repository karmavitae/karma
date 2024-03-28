import { IFacet, IFacetResult } from "../../common/interfaces/ifacet";
import AcademicDegree from "../models/AcademicDegree";
import Field from "../models/Field";
import Hobby from "../models/Hobby";
import Proficiency from "../models/Proficiency";
import VoluntaryArea from "../models/VoluntaryArea";

export async function createFacet(facet:IFacet, facetFor:string) : Promise<IFacetResult> {
    let result = {status: 401, message: '', data: {} as IFacet} as IFacetResult

    if(facet && facetFor && Object.keys(facet).length > 0) {
        switch(facetFor) {
            case 'proficiency': {
                let proficiency = new Proficiency(facet)
                try {
                    let data = await proficiency.save()
                    result.data = data
                    result.status = 200
                } catch (error:any) {
                    result.message = error
                }
                break
            }
            case 'degrees': {
                let degree = new AcademicDegree(buildDegree(facet))
                try {
                    let data = await degree.save()
                    result.data = extractFields(data)
                    result.status = 200
                } catch (error:any) {
                    result.message = error
                }
                break
            }
            case 'fields': {
                let field = new Field(buildField(facet))
                try {
                    let data = await field.save()
                    result.data = extractFields(data)
                    result.status = 200
                } catch (error:any) {
                    result.message = error
                }
                break
            }
            case 'voluntary': {
                let va = new VoluntaryArea(buildField(facet))
                try {
                    let data = await va.save()
                    result.data = extractFields(data)
                    result.status = 200
                } catch (error:any) {
                    result.message = error
                }
                break
            }
            case 'hobbies': {
                let hobby = new Hobby(buildField(facet))
                try {
                    let data = await hobby.save()
                    result.data = extractFields(data)
                    result.status = 200
                } catch (error:any) {
                    result.message = error
                }
                break
            }
            default : {
                result.message = "Invalid Data"
            }
        }
    }
    else {
        result.message = "Invalid data"
    }
   
    return new Promise((resolve)=>{resolve(result)})
}

function buildDegree(f:IFacet): IFacet {
    return {
        name: f.name,
        category: "",
        score_card: [],
        class_code: 12,
        status: -1,
        abbreviation: f.abbreviation,
        search_label: f.abbreviation ? f.name + " (" + f.abbreviation + ")" : f.name 
    } as unknown as IFacet 
}

function buildField(f:IFacet): IFacet {
    return {
        name: f.name,
        category: "",
        score_card: [],
        class_code: 8,
        status: -1,
    } as unknown as IFacet 
}

function buildVoluntary(f:IFacet): IFacet {
    return {} as IFacet
}

function buildHobby(f:IFacet): IFacet {
    return {} as IFacet
}

function extractFields(f:IFacet):IFacet {
    let facet = {
        _id: f._id,
        abbreviation: f.abbreviation,
        name : f.name,
        search_label : f.search_label
    } as IFacet
    return facet
}

