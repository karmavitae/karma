import { IFacet } from "../interfaces/ifacet"
import { IFacetSalary } from "../interfaces/ifacet"
import { IS2N } from "../interfaces/igen"

export function getSpecification(specCode:number):IFacet {
    return {_id: '65f9a14b4b6c1c8735e7f117', code: 0 , 
    class_code: 15,  category: '', status: 1,
    name: 'Permanent', search_label: 'Permanent'}
}

export function getCommitment(commitment: number):IFacet {
    return {_id: '65f9a14b4b6c1c8735e7f12b', code: 0 ,
    class_code: 15,  category: '', status: 1,
    name: 'Full Time', search_label: 'Full Time'}
}
  
export function getDefaultCountry():IFacet {
    let country = { name: 'Sweden' } as IFacet
    return country
}

export function getLevel(hours:number): string{
    let level = "-"
    if (hours >= 250 && hours <= 500) { level = "TR" }
    else if (hours > 500 && hours <= 1000) { level = "BE" }
    else if (hours > 1000 && hours <= 5000) { level = "AD" }
    else if (hours > 5000 && hours <= 10000) { level = "EX" }
    else if (hours > 10000 && hours <= 20000) { level = "SP" }
    else if (hours > 20000 && hours <= 30000) { level = "MA" }
    else if (hours > 30000 ) { level = "GM"}
    else { level = "-"}
    return level
}

export function getDefaultSalaryRange(country:string): IFacetSalary {
   let result = {
    code: 3,
    min: 445201,
    max: 492450,
    name: "SEK 445201 - 492450"
   } as IFacetSalary

   return result
}