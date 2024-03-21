
import { ICountry } from "../../common/interfaces/icountry"
import mongoose, { Schema } from "mongoose";

const CountrySchema: Schema = new Schema(
    {
        search_label: String,
        name: String,
        isdn: Number,
        currency: String,
        currency_code: String,
        exchange_rate: Number,
        status: Number,
        wages: {
            min_legal: Number,
            min_actual: Number,
            average: Number,
            max: Number
        },
        salary_slab: Array
    },
    {
        timestamps: true,
        collection: 'countries'
    }
)

export default mongoose.model<ICountry>('Country', CountrySchema)