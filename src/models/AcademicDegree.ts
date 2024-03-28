import { IFacet } from "../../common/interfaces/ifacet";
import mongoose, { Schema } from "mongoose";

const AcademicDegreeSchema: Schema = new Schema(
    {
        name: String,
        search_label: String,
        class_code: Number,
        status: {
            type: Number,
            default: 0
        },
        abbreviation: String,
        score_card:Array
    },
     {
        timestamps: true,
        collection: 'academic_degrees'
    }
);

export default mongoose.model<IFacet>('AcademicDegree', AcademicDegreeSchema)