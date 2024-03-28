import { ICountry } from "../../common/interfaces/icountry";
import { IFacet, IFacetSalary } from "../../common/interfaces/ifacet";
import Country from "../models/Country";
import Field from "../models/Field";
import Industry from "../models/Industry";
import Proficiency from "../models/Proficiency";
import BusinessArea from "../models/BusinessArea";
import University from "../models/University";
import AcademicDegree from "../models/AcademicDegree";
import Hobby from "../models/Hobby";
import VoluntaryArea from "../models/VoluntaryArea";


export async function facets(searchFor:string, searchIn:string, count:number = 10): Promise<IFacet[]> {
    let facets:IFacet[] = []
    let pipeline:any = [
        // { '$match' : {'$text' : {'$search' : searchFor}}},
        { '$match' : { '$and' : [{'class_code' : {'$gt' : 0}}, {'$text' : {'$search' : searchFor}} ]} },
        { '$project': { 'name':1, 'search_label':1, 'class_code':1, 'score_card':1, 'status':1 }},
        { '$sort' : { 'score' : {'$meta' : 'textScore'}}},
        { '$limit' : count }
    ]
    switch(searchIn) {
        case "proficiencies" : {
            facets = await Proficiency.aggregate(pipeline)
            break;
        }
        case "fields" : {
            facets = await Field.aggregate(pipeline)
            break;
        }
        case "universities" : {
            let uPipeline:any = [
                // { '$match' : {'$text' : {'$search' : searchFor}}},
                { '$match' : { '$and' : [{'class_code' : {'$gt' : 0}}, {'$text' : {'$search' : searchFor}} ]} },
                { '$project': { 'name':1, 'search_label':1, 'country': 1, 'city' : 1}},
                { '$sort' : { 'score' : {'$meta' : 'textScore'}}},
                { '$limit' : 10 }
            ]
            facets = await University.aggregate(uPipeline)
            break;
        }
        case "industries" : {
            facets = await Industry.find({},  { 'name':1, 'search_label':1 } )
            break;
        }
        case "academic Degrees" : {
            facets = await AcademicDegree.find({},  { 'name':1, 'search_label':1 } )
            break;
        }
        case "voluntary" : {
            facets = await VoluntaryArea.aggregate(pipeline)
            break;
        }
        case "hobbies" : {
            facets = await Hobby.aggregate(pipeline)
            break;
        }
        case "business" : {
            facets = await BusinessArea.find({}, {'name' : 1, 'search_label' : 1, 'class_code' : 1})
            break;
        }
        case "countries" : {
            facets = await Country.find({},  { 'name':1, 'search_label':1 } )
            break
        }
    }
    return new Promise((resolve)=>{resolve(facets)})
}

export async function salaryRange(country:string): Promise<IFacetSalary[]> {
    let range:IFacetSalary[] = []
    let data = await Country.findOne({'name' : country}, {'_id': 0, 'salary_slab': 1}) || {} as ICountry
    if(data){ range = data.salary_slab }
    return range
}

export async function matchProficiencies(searchText:string, count:number) {
    let pipeline:Array<any> = [
        { '$match': {'$text': { '$search': searchText }}}, 
        { '$project': { 'name':1, 'search_label':1, 'class_code':1, }},
        { '$sort': {'score': {'$meta': 'textScore'}}},
        { '$limit': count}
       ]
    let facets = await Proficiency.aggregate(pipeline)
    return facets
}

export async function createFacet() {}
export async function createUniversity() {
    
}

export async function createProficiency(profData:IFacet): Promise<IFacet> {
    let proficiency = new Proficiency(profData)
    let result:IFacet = await proficiency.save()
    return result
}