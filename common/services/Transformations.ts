import mongoose from "mongoose"
import { ICatalogueItem, ITempCat } from "../interfaces/icatalogue"
import { ICVExperience, IExperience } from "../interfaces/iexperience"
import { IFacet, IKVPFacet } from "../interfaces/ifacet"
import { getFullTimeHours } from "./TimeMachine"
import { recordS2N } from "../interfaces/types"
import { getSpecification, getDefaultCountry, getDefaultSalaryRange } from "./Meta"

export function facetToCatalogueItem(proficiency:IFacet):ICatalogueItem {
    let kvpFacet = {
        _id: proficiency._id,
        name: proficiency.name,
        search_label: proficiency.search_label,
        status: proficiency.status,
        score_card: [],
        class_code: proficiency.class_code,
        hours: 0,
        verified_hours: 0,
        endorsements: 0,
        count: 0,
        parent_id: []
    }  as ICatalogueItem
    return kvpFacet
  }

export function  catalogueItemToIKVPFacet(_id:string, item:ICatalogueItem): IKVPFacet {
    let proficiency = {} as IKVPFacet
    if( item && Object.keys(item).length >0 ){
        proficiency = {
            _id: _id,
            name: item.name,
            search_label: item.search_label,
            status: item.status,
            score_card: item.score_card,
            class_code: item.class_code,
            parent_id: item.parent_id,
            hours: 0,
            count: 0,
            verified_hours : 0,
            endorsements: 0,
            comfort_level: 2,
            posts: []
        }
    }
    return proficiency
}

export function CvToKvExperience(cvExp: ICVExperience, cat:ITempCat): IExperience {
    let kvExp = {} as IExperience
    kvExp._id = new mongoose.Types.ObjectId()
    kvExp.version = cvExp.version
    kvExp.title = cvExp.title
    kvExp.is_current = cvExp.is_current
    kvExp.is_dirty = true
    
    kvExp.category = cvExp.category
    kvExp.commitment = numToRecord(cvExp.commitment)
  
    kvExp.start_date = new Date(cvExp.start_date)
    kvExp.end_date = cvExp.is_current? new Date : new Date(cvExp.end_date)
    kvExp.hours = {"total" : getFullTimeHours(kvExp.start_date, kvExp.end_date), "allocated" : 0, "free" : 0, "daily" : 8, "weekly" : 40, "freelance" : 0, "verified" : 0}
    
   
    kvExp.specification = getSpecification(kvExp.category)
    kvExp.business_areas = []
    kvExp.industry = {} as IFacet
    kvExp.field_of_study = {} as IFacet
    kvExp.hobbies = []
    kvExp.voluntary_areas = []
  
    kvExp.organization = cvExp.organization? cvExp.organization : ''
    kvExp.city = ''
    kvExp.country = cvExp.country? stringToCountry(cvExp.country) : getDefaultCountry()
    kvExp.salary_range = getDefaultSalaryRange(kvExp.country.name)

  
    kvExp.proficiencies = (cvExp.proficiencies && cvExp.proficiencies.length > 0) ? stringToKVPFacets(cvExp.proficiencies, cat): []
    kvExp.endorsements = 0
  
  
    return kvExp
  }

export function  stringToKVPFacets(cvPro:string[], cat:ITempCat): IKVPFacet[]{
    let proficiencies: IKVPFacet[] = []
    cvPro.forEach((element:string)=>{
        proficiencies.push(catalogueItemToIKVPFacet(element, cat[element]))
    })
    return proficiencies
  }
  
export  function stringToCountry(name:string):IFacet {
    let country = { name: name } as IFacet
    return country
  }

export  function domainsToCatItems(domains:IFacet[], endorsements:number, hours:recordS2N): ICatalogueItem[] {
    let catItems:ICatalogueItem[] = []
    let domainCount = domains.length
    let endorsementCount = Math.round(endorsements/domainCount)
    let totalHours = Math.round(hours['total']/domainCount)
    let verifiedHours = Math.round(hours['verified']/domainCount)
    domains.forEach((domain)=>{
      if(domain){
        let catItem = facetToCatalogueItem(domain)
        catItem.endorsements = endorsementCount
        catItem.class_code = 6
        catItem.hours = totalHours
        catItem.verified_hours = verifiedHours
        catItems.push(catItem)
      }
    })
    return catItems
  }

export function experienceDomainsToFacets(experience:IExperience): ICatalogueItem[] {
  let catItems:ICatalogueItem[] = []
  if(experience.industry && experience.business_areas){
    let domains = [experience.industry, experience.field_of_study]
    domains = domains.concat(experience.business_areas, experience.hobbies, experience.voluntary_areas)
    catItems = (domains.length > 0) ? domainsToCatItems(domains, experience.endorsements, experience.hours ) : []
    }
  return catItems
  }

  export function numToRecord(num:number): recordS2N {
    return {code: num}
  }