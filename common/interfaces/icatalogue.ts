import { IFacetExperience } from "./ifacet"

export interface ICatalogue {
 [key:string]:IFacetExperience
}

export interface ICatalogueItem {
    name: string,
    score_card: number [],
    class_code: number,
    parent_id: string [],
    search_label: string,
    
    hours: number,
    verified_hours: number,
    endorsements: number,
    count: number
}

export interface ITempCat {
    [key:string]:ICatalogueItem
}
