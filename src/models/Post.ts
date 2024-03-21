import mongoose, { Schema, Types } from "mongoose"
import { IPost, IPostReferee, IPostResponse } from '../../common/interfaces/ipost'
import { RefereeSchema } from "./Referee"

export const PostSchema: Schema = new Schema (
    {
        job_title: String,
        start_date: Date,
        end_date: Date,
        hours: Number,

        post_title: String,
        experience_id: Types.ObjectId,
        organization: String,
        proficiencies: Array,
        referees: [RefereeSchema],
        status: Number
    },
    {
        timestamps: true,
        autoCreate: false, //do not create new collection 
    }
)

export default mongoose.model<IPost>('Post', PostSchema)


