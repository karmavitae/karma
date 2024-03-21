import mongoose, {Schema, Types } from "mongoose";
import { IPostReferee } from "../../common/interfaces/ipost";

export const RefereeSchema: Schema = new Schema (
    {
        request_id: Types.ObjectId,
        referee_id: Types.ObjectId,
        referee_first_name: String,
        referee_last_name: String, 
        email: String,
        work_relation: Number,
        message: String,
        request_for: Number,
        status: Number,
        proficiencies: Array,
        pap_feedback: Array 
    },
    {
        timestamps: true,
        autoCreate: false, //do not create new collection 
    }

)

export default mongoose.model<IPostReferee>('Referee', RefereeSchema)