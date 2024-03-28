import { Model, Schema, Types, model } from 'mongoose';
import { IExperience } from "../../common/interfaces/iexperience"
import { IFacet, IFacetExperience, IFacetProficiency } from "../../common/interfaces/ifacet";
import { ICatalogue } from "../../common/interfaces/icatalogue";
import { ExperienceSchema } from './Experience';
import { IProfile, IProfileMethods } from '../../common/interfaces/iprofile';
import { ICVExperience, ICvToKvResult } from '../../common/interfaces/icv';
import { PostSchema } from './Post';
import { RequestSchema } from './Request';
import { getLevel } from '../../common/services/Meta'

import { CvToKvExperience, experienceDomainsToFacets } from '../services/KvTransformations';
import { getRandomNumber } from '../../common/services/Maths';
import Proficiency from './Proficiency';

type ProfileModel = Model<IProfile, {}, IProfileMethods>;

const schema = new Schema<IProfile, ProfileModel, IProfileMethods>(
  {
    user: { 
      type: Types.ObjectId,
      ref: 'User'
    },
    summary: {
      type: Types.ObjectId,
      ref: 'Summary'
    },
    kcatalogue: Object,
    
    journeys:Object,
    experiences: [ExperienceSchema],
    is_dirty: Boolean,

    hours: Object,
    potential: Object,
    abilities: Object,
    personalities: Object,
    talent_matrix: Object,

    domains: Array,
    competencies: Array,
    technologies: Array,
    skills: Array,
    personal_attributes: Array,
    tasks: Array,
    tools: Array,

    posts: [PostSchema],
    requests: [RequestSchema],
  },
  {
    timestamps: true,
    collection: 'profiles',  
  }
);
schema.method('resetKv', function resetKv() {
    this.talent_matrix = { "GM" : 0, "MA" : 0, "SP" : 0, "EX" : 0, "AD" : 0, "BE" : 0, "TR" : 0, "-" : 0 }
    this.kcatalogue = {}
    this.competencies = []
    this.skills = []
    this.personal_attributes = []
    this.technologies = []
    this.tasks = []
    this.tools = []
    this.domains = []
    this.hours = { "Total" : 0,  "Work" : 0, "Learning" : 0, "Extracurricular" : 0 }
    this.potential = {}
    this.abilities = {}
    this.personalities = {}
});
schema.method('build', function build(){
    this.resetKv()
    if (this.experiences && this.experiences.length > 0){
      this.processExperiences(this.experiences)
    }
    this.updateKvItems()
});
schema.method('buildKvFromCv', async function buildKvFromCv(cvData:ICvToKvResult): Promise<boolean>{
  this.resetKv()
  this.kcatalogue = await setKcatalouge(cvData.data.cv_catalogue)
  cvData.data.cv_experiences.forEach((experience:ICVExperience)=>{
    let e:IExperience = CvToKvExperience(experience, this.kcatalogue)
      if(e.hours) {this.updateHours(e.category, e.hours.total)}
      this.experiences.push(e)
  })
  this.updateKvItems()
  return true
});
schema.method('processExperiences',function processExperiences(experiences:IExperience[]):void {
  experiences.forEach((experience)=>{
      // if(experience.is_dirty){ this.updateFeedback(experience)}
    if(experience.hours) {
    this.updateHours(experience.category, experience.hours.total)}
    this.addProficienciesToCatalogue(experience.proficiencies)
    this.addProficienciesToCatalogue(experienceDomainsToFacets(experience))
  })
});
schema.method('updateKvItems', function updateKvItems(){
  this.experiences.sort((a:IExperience, b:IExperience)=> b.end_date.getTime() - a.end_date.getTime())
  Object.keys(this.kcatalogue).forEach((key)=>{
    let value = this.kcatalogue[key]
    this.talent_matrix[getLevel(value.hours['total'])] += 1
    this.distributeProficiency(value)
    })
  this.updatePotential()
  this.updateAbilities()
  this.updatePersonalities()
});
schema.method('distributeProficiency', function distributeProficiency(item: IFacetExperience): void {
  switch(Number(item.class_code)){
      case 0:
          this.competencies.push(item)
          break
      case 1:
          this.skills.push(item)
          break
      case 2:
          this.personal_attributes.push(item)
          break
      case 3:
          this.technologies.push(item)
          break
      case 4:
          this.tasks.push(item)
          break
      case 5:
          this.tools.push(item)
          break 
      case 6:
          this.domains.push(item)
          break
      default:
          this.skills.push(item)
          break
  }
});
schema.method('updateHours', function updateHours(category:number, total_hours:number) {
  this.hours['Total'] += total_hours
  switch(category){
      case 0: {
          this.hours['Work'] += total_hours
          break
      } 
      case 1: {
          this.hours['Learning'] += total_hours
          break
      }
      case 2: {
        this.hours['Learning'] += total_hours
        break
    }
      case 3: {
          this.hours['Extracurricular'] += total_hours
          break
      }
      default: {
          break
      }
  }
});
schema.method('updatePersonalities', function updatePersonalities(): void {
  let personalityTypes = [
      "Inspector", "Advocate", "Mastermind", "Giver",
      "Craftsman", "Provider", "Idealist", "Performer",
      "Champion", "Doer", "Supervisor", "Commander",
      "Thinker", "Nurturer", "Visionary", "Composer" ]
      let count = 0
      while (count < 3) {
        this.personalities[getRandomNumber(0, 15)] = getRandomNumber(50, 100)
        count += 1
      }
});
schema.method('updateAbilities', function  updateAbilities(): void {
  let abilityTypes =["Dedication", "Confidence", "Reliabilitiy", 
  "Teamwork", "Independence", "Leadership", 
  "Interpersonal Skills", "Self Awareness", 
  "Critical Thinking", "Integrity"]
  let count = 0
      while (count < 3) {
        this.abilities[getRandomNumber(0, 9)] = getRandomNumber(50, 100)
        count += 1
      }
});
schema.method('updatePotential', function updatePotential(): void {
  let totalProficiencies = Object.keys(this.kcatalogue).length
  let min = Math.round(totalProficiencies*0.10)
  let max = Math.round(totalProficiencies*0.65)
  this.potential["Total"] =  totalProficiencies
  this.potential["Core"] =  getRandomNumber(min, max)
  this.potential["Transferable"] =  getRandomNumber(min, max)
});
schema.method('addProficienciesToCatalogue', function addProficienciesToCatalogue(proficiencies:IFacetExperience[]){
  proficiencies.forEach((proficiency:IFacetExperience)=>{
      if(proficiency._id in this.kcatalogue) {
          this.kcatalogue[proficiency._id] = updateCatalogueItem(this.kcatalogue[proficiency._id], proficiency)
      } else {
          this.kcatalogue[proficiency._id] = proficiency
      }
  })
});

export default model<IProfile, ProfileModel>('Profile', schema);



function updateCatalogueItem(catItem:IFacetExperience, proficiency: IFacetExperience): IFacetExperience {
  catItem.endorsements += proficiency.endorsements
  catItem.count = catItem.count ? catItem.count++ : 1
  catItem.hours['total'] += proficiency.hours['total']
  catItem.hours['verified'] += proficiency.hours['verified']
  catItem.posts = []
  catItem.posts.concat(proficiency.posts)
  catItem.comfort_level = Math.round((catItem.comfort_level + proficiency.comfort_level)/2)
  return catItem
}

async function setKcatalouge(proficiencies:string[]): Promise<ICatalogue> {
  let kcat = {} as ICatalogue
  let pCursor = await Proficiency.find({_id: {$in: proficiencies}})
  pCursor.forEach((element:IFacetProficiency)=>{
      kcat[element._id] = {
        _id: element._id,
        name: element.name,
        search_label: element.search_label,
        parent: element.parent,
        class_code: element.class_code,
        hours: {total: 0, verified: 0},
        endorsements: 0,
        comfort_level: 3,
        posts: [],
        count: 1,
      }
  })
  return kcat
}