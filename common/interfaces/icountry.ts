import { IFacetSalary } from "./ifacet"

export interface ICountry{
    search_label: string,
    name: string,
    isdn: number,
    currency: string,
    currency_code: string,
    exchange_rate: number,
    status: number,
    wages: {
        min_legal: number,
        min_actual: number,
        average: number,
        max: number
    }
    salary_slab:IFacetSalary[]
}