"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.UserSchema = new mongoose_1.Schema({
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    email: { type: String, unique: true, required: true },
    user_type: { type: Number, default: 10 },
    status: { type: Number, default: -1 },
    mobile: String,
    address_1: String,
    address_2: String,
    post_code: String,
    city: String,
    country: String,
    passwrod_digest: String,
    verification_digest: String,
    is_verified: { type: Boolean, default: false },
    verified_at: Date,
    expires: { type: Number, default: Date.now() },
    subscriptions: Array,
    profile: { type: mongoose_1.Types.ObjectId, ref: 'Profile' },
    summary: { type: mongoose_1.Types.ObjectId, ref: 'Summary' },
    network: { type: mongoose_1.Types.ObjectId, ref: 'Network' }
}, {
    timestamps: true,
    collection: 'users',
});
exports.default = mongoose_1.default.model('User', exports.UserSchema);
// user_type values
//  10: General User, 
//  30: Recruiter-team-member, 38: Recruiter-Admin,  
//  49: Business-owner, 48: Business Admin, 42: HR, 41: Manager, 40: Employees  
// User Regisration mails: 0-Register Interest, 1: Activation Mail, 2 Aspirant Activation , 3 Invitation on regisert interest, 4 Password reset, 5 Referee Activation
// status values
// -1: Interest Rgistered 1: Pending Activtion 2: Active, 3: Locked
