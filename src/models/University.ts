import { IFacetUniversity } from "../../common/interfaces/ifacet";
import mongoose, { Schema } from "mongoose";

const UniversitySchema: Schema = new Schema(
    {
        name: String,
        search_label: String,
        class_code: Number,
        code: Number,
        category: String,
        status: {
            type: Number,
            default: 0
        },
        city: String,
        state: String,
        country: String,
        abbreviation: String
    },
     {
        timestamps: true,
        collection: 'universities'
    }
);

export default mongoose.model<IFacetUniversity>('University', UniversitySchema)