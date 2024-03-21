import mongoose, { Schema, Types } from "mongoose";
import { IPostReferee, IPostRequest } from "../../common/interfaces/ipost";

export const RequestSchema : Schema = new Schema(
    {
        job_title: String,
        start_date: Date,
        end_date: Date,
        hours: Number,
        organization: String,
        proficiencies: Array,
        experience_id: Types.ObjectId,
        post_id: Types.ObjectId,
        post_title: String,
        is_read: {
            type: Boolean,
            defaul: false
        }, 
        requestor_id: Types.ObjectId,
        requestor_first_name: String,
        requestor_last_name: String,
        request_for: Number,
        work_relation: String,
        pap_feedback: Array,
        status : {
            type: Number,
            default: 0
        }       
    },
    {
        timestamps: true,
        autoCreate: false,
        methods: {
        }
    }
)

export default mongoose.model<IPostRequest>('Request', RequestSchema)

