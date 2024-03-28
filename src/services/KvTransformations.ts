import mongoose from "mongoose"
import { ICatalogue } from "../../common/interfaces/icatalogue"
import { IExperience } from "../../common/interfaces/iexperience"
import { IFacet, IFacetExperience } from "../../common/interfaces/ifacet"
import { ICVExperience } from "../../common/interfaces/icv"
import { getFullTimeHours } from "../../common/services/TimeMachine"
import { getSpecification, getDefaultCountry, getDefaultSalaryRange, getCommitment } from "../../common/services/Meta"
import { IS2N } from "../../common/interfaces/igen"



export function CvToKvExperience(cvExp: ICVExperience, cat:ICatalogue): IExperience {
    let kvExp = {} as IExperience
    kvExp._id = new mongoose.Types.ObjectId()
    kvExp.version = cvExp.version
    kvExp.title = cvExp.title
    kvExp.is_current = cvExp.is_current
    kvExp.is_dirty = true
    
    kvExp.category = cvExp.category
    kvExp.commitment = getCommitment(cvExp.commitment)
  
    kvExp.start_date = new Date(cvExp.start_date)
    kvExp.end_date = cvExp.is_current? new Date : new Date(cvExp.end_date)
    kvExp.hours = {"total" : getFullTimeHours(kvExp.start_date, kvExp.end_date), "allocated" : 0, "free" : 0, "daily" : 8, "weekly" : 40, "freelance" : 0, "verified" : 0}
    
   
    kvExp.specification = getSpecification(kvExp.category)
    kvExp.business_areas = []
    kvExp.industry = {} as IFacet
    kvExp.field_of_studies = {} as IFacet
    kvExp.hobbies = []
    kvExp.voluntary_areas = []
  
    kvExp.organization = cvExp.organization? cvExp.organization : ''
    kvExp.city = ''
    kvExp.country = cvExp.country? stringToCountry(cvExp.country) : getDefaultCountry()
    kvExp.salary_range = getDefaultSalaryRange(kvExp.country.name)

  
    kvExp.proficiencies = (cvExp.proficiencies && cvExp.proficiencies.length > 0) ? stringToFacetExperience(cvExp.proficiencies, cat): []
    kvExp.endorsements = 0
  
  
    return kvExp
  }

export function  stringToFacetExperience(cvPro:string[], cat:ICatalogue): IFacetExperience[]{
    let proficiencies: IFacetExperience[] = []
    cvPro.forEach((element:string)=>{
        proficiencies.push(cat[element])
    })
    return proficiencies
  }
  
export  function stringToCountry(name:string):IFacet {
    let country = { name: name } as IFacet
    return country
  }

export  function domainsToCatItems(domains:IFacet[], endorsements:number, hours:IS2N): IFacetExperience[] {
    let catItems:IFacetExperience[] = []
    let domainCount = domains.length
    let endorsementCount = Math.round(endorsements/domainCount)
    let totalHours = Math.round(hours['total']/domainCount)
    let verifiedHours = Math.round(hours['verified']/domainCount)
    domains.forEach((domain)=>{
      if(domain){
        let catItem = {} as IFacetExperience
        catItem = Object.assign(catItem, domain)
        catItem.endorsements = endorsementCount
        catItem.class_code = 6
        catItem.hours = {total: totalHours, verified: verifiedHours}
        catItems.push(catItem)
      }
    })
    return catItems
  }

export function experienceDomainsToFacets(experience:IExperience): IFacetExperience[] {
  let domainItems:IFacetExperience[] = []
  if(experience.industry && experience.business_areas){
    let domains = [experience.industry, experience.field_of_studies]
    domains = domains.concat(experience.business_areas, experience.hobbies, experience.voluntary_areas)
    let domainCount = domains.length
    let endorsementCount = Math.round(experience.endorsements/domainCount)
    let totalHours = Math.round(experience.hours['total']/domainCount)
    let verifiedHours = Math.round(experience.hours['verified']/domainCount)
    if (domains && domains.length > 0) {
      domains.forEach(item=>{
        domainItems.push(facetToFacetExperience(item, endorsementCount, totalHours, verifiedHours))
      })    
    }
    }
  return domainItems
  }


export function facetToFacetExperience(
  item:IFacet | undefined, 
  endorsementCount: number, totalHours: number, verifiedHours: number): IFacetExperience {
  let ife = {} as IFacetExperience
  ife = item ? Object.assign(ife,item) : ife
  ife.score_card = [],
  ife.class_code = 6,
  ife.hours = {total: totalHours, verified: verifiedHours}
  ife.endorsements = endorsementCount,
  ife.comfort_level = 4,
  ife.posts = [],
  ife.count = 1
  return ife
}

