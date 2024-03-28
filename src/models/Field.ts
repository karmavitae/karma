import { IFacet } from "../../common/interfaces/ifacet";
import mongoose, { Schema } from "mongoose";

const FieldSchema: Schema = new Schema(
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
        collection: 'fields'
    }
);

export default mongoose.model<IFacet>('Field', FieldSchema)