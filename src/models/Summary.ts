import mongoose, { Schema, Types } from "mongoose";
import { ISummary } from '../../common/interfaces/isummary'

export const SummarySchema = new Schema(
    {
        kprofile: {
            type: Types.ObjectId,
            ref: 'Kprofile'
        },
        user: {
            type: Types.ObjectId,
            ref: 'User'
        },
        name: {type: String},
        mask: {type: String},
        share_with: {type: Array},
        education: {type: Object},
        experience_hours: {type: Number},
        renumeration: {type: Object},
        opportunties: {typs: Object}
    },
    {
        timestamps: true,
        collection: 'summaries'
      }
)

export default mongoose.model<ISummary>('Summary', SummarySchema)