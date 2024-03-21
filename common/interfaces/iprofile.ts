import { IExperience } from "./iexperience"
import { IResult, IS2N } from "./igen"
import { IFacetExperience } from "./ifacet"
import { ICvToKvResult } from "./icv"
import { ICatalogue } from "./icatalogue"
import { IPost, IPostRequest } from "./ipost"

export interface IProfile {
    _id: any,
    user: any,
    summary: any,
    kcatalogue: ICatalogue,
    name: string,
    journeys:{[key:string]:IExperience[]}
    experiences:IExperience[],
    is_dirty: boolean,

    isEnable: boolean //true if more than 5 references
    
    hours: IS2N,
    potential:IS2N,
    abilities:IS2N,
    personalities:IS2N,
    talent_matrix:IS2N,

    domains: IFacetExperience[]
    competencies: IFacetExperience[]
    technologies: IFacetExperience[]
    skills: IFacetExperience[]
    personal_attributes: IFacetExperience[]
    tasks: IFacetExperience[]
    tools: IFacetExperience[]

    posts: IPost[]
    requests: IPostRequest[]
}

export interface IProfileMethods {
  resetKv(): void;
  build(): void;
  buildKvFromCv(cvData:ICvToKvResult):Promise<boolean>;
  processExperiences(experiences:IExperience[]): void;
  updateKvItems(): void;
  distributeProficiency(item: IFacetExperience): void;
  updateHours(category:number, total_hours:number): void;
  updatePersonalities(): void;
  updateAbilities(): void;
  updatePotential(): void;
  addProficienciesToCatalogue(proficiencies:IFacetExperience[]): void;
}

export interface IProfileResult extends IResult {
  data: IProfile
}