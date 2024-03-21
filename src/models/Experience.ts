import mongoose, {Schema, Types} from "mongoose";
import { IExperience } from "../../common/interfaces/iexperience";
import { IFacetExperience } from "../../common/interfaces/ifacet";

export const ExperienceSchema: Schema = new Schema(
    {
        version: Number,
        title: String,
        is_current: Boolean,
        is_dirty: Boolean,
       
        category: Number,
        commitment: Object,
        start_date: Date, 
        end_date: Date,
        hours: Object ,
        salary_range: Object,
        specification: Object,
        degree: Object,
        business_areas: Array,
        industry: Object,
        field_of_study: Object,
        hobbies: Array,
        voluntary_areas: Array,
       
        organization: String,
        university: Object,
        city: String,
        country: Object,
       
        proficiencies:Array<IFacetExperience>,
        endorsements: Number,
    },
    {
        timestamps: true,
        autoCreate: false,
    }
)

export default mongoose.model<IExperience>('Experience', ExperienceSchema)