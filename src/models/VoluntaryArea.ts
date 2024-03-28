import { IFacet } from "../../common/interfaces/ifacet";
import mongoose, { Schema } from "mongoose";

const VoluntaryAreaSchema: Schema = new Schema(
    {
        name: String,
        search_label: String,
        category: String,
        class_code: Number,
        code: Number,
        status: {
            type: Number,
            default: 0
        },
    },
     {
        timestamps: true,
        collection: 'voluntary_areas'
    }
);

export default mongoose.model<IFacet>('VoluntaryArea', VoluntaryAreaSchema)