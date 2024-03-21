import { IFacetProficiency } from "../../common/interfaces/ifacet";
import mongoose, { Schema } from "mongoose";


export const ProficiencySchema: Schema = new Schema(
    {
        name : String,
        search_lable: String,
        score_card: Array<Number>,
        class_code: Number,
        status: {
            type: Number,
            default: 0
        },
        n_gram: String,
        description: String,
        demand_count: Number,
        supply_count: Number,
        automation_index: Number,
        children_id: Array<String>,
        parent_id: Array<String>
    },
    {
        timestamps : true,
        collection : 'proficiencies'
    }
)


export default mongoose.model<IFacetProficiency>('Proficiency', ProficiencySchema)