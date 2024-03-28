import { IFacet } from "../../common/interfaces/ifacet";
import mongoose, { Schema } from "mongoose";

const DimensionSchema: Schema = new Schema(
    {
        name: String,
        search_label: String,
        category: String,
        class_code: Number,
        score_card: Array<Number>,
        status: {
            type: Number,
            default: 0
        },
    },
     {
        timestamps: true,
        collection: 'dimensions'
    }
);

export default mongoose.model<IFacet>('Dimension', DimensionSchema)