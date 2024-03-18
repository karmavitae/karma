import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "../../../common/interfaces/iuser";

export const UserSchema: Schema = new Schema(
    {
      first_name: String,
      last_name: String,
      date_of_birth: Date,
      email: { type: String, unique: true, required: true},
      user_type: { type: Number, default: 10}, 
      status: {type: Number, default: -1 },  
    
      mobile: String,
      address_1: String,
      address_2: String,
      post_code: String,
      city: String,
      country: String,
  
      password_digest: String,
      verification_digest: String,
      is_verified: { type: Boolean, default: false },
      verified_at: Date,
      expires: { type: Number, default: Date.now() },
      
      
      subscriptions: Array,
      profile: { type: Types.ObjectId, ref: 'Profile' },
      summary: { type: Types.ObjectId, ref: 'Summary' },
      network: { type: Types.ObjectId, ref: 'Network' }
    },
    
    {
      timestamps: true,
      collection: 'users',
    }
  );
  
  export default mongoose.model<IUser>('User', UserSchema)
  
// user_type values
//  10: General User, 
//  30: Recruiter-team-member, 38: Recruiter-Admin,  
//  49: Business-owner, 48: Business Admin, 42: HR, 41: Manager, 40: Employees  

// User Regisration mails: 0-Register Interest, 1: Activation Mail, 2 Aspirant Activation , 3 Invitation on regisert interest, 4 Password reset, 5 Referee Activation
  // status values
  // -1: Interest Rgistered 1: Pending Activtion 2: Active, 3: Locked