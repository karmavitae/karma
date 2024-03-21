import { IFacetExperience, IFacetPost } from "./ifacet"
import { IS2S } from "./igen"


export interface IKarmaEvent {
    _id : any
    job_title : string
    start_date : Date 
    end_date : Date 
    hours: number
    organization: string 
    proficiencies: Array<IFacetPost>
}

export interface IPost extends IKarmaEvent {
    experience_id: any
    post_title:string
    endorsements: number,
    is_verified: boolean // set it up once first verfication comes
    referees: Array<IPostReferee>
    status: number //0: In-progess; 1:Completed [to be marked completd when all referees sttus is over 0]
}

export interface IPostReferee { //used only at the time of creation
    request_id: any
    referee_id: any  //sudo kv_id
    referee_first_name: string
    referee_last_name: string 
    email: string 
    work_relation: number 
    message: string 
    request_for: number //0: Endorsement 1: Verficiation 2: Both
    status: number //-1: not dispatched, 0: dispatched and pending 1:Approved 2:Deferred
    proficiencies : Array<IFacetExperience>
    pap_feedback : Array<IS2S>
}

export interface IPostRequest extends IKarmaEvent {
    experience_id: any
    post_id: any 
    post_title:string
    is_read : boolean
    requestor_id: any //sudo kv_id
    requestor_first_name: string
    requestor_last_name: string
    request_for: number //0: Endorsement 1: Verficiation 2: Both
    work_relation: number 
    pap_feedback : Array<any>
    status: number //0: In-progess; 1:Completed 
}

export interface IPostResponse {
    experience_id: any
    post_id:any
    requestor_id: any
    request_id: any 
    work_relation: number 
    status: number
    proficiencies: Array<any>
    pap_feedback: Array<any>
}


