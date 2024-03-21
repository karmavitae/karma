import mongoose, { Schema, Types } from "mongoose";
import { INetwork } from "../../common/interfaces/inetwork"

export const NetworkSchema: Schema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User'
        },
        connections:Array
    },
    {
        timestamps: true,
        collection: 'networks'
    }
)

export default mongoose.model<INetwork>('Network', NetworkSchema)