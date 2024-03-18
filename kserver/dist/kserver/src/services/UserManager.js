"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const SecretHandler_1 = require("./SecretHandler");
const MailManager_1 = require("./MailManager");
// User Regisration mails: 0-Register Interest, 1: Activation Mail, 2 Aspirant Activation , 3 Invitation on regisert interest, 4 Password reset, 5 Referee Activation
function registerUser(userData_1) {
    return __awaiter(this, arguments, void 0, function* (userData, mailFor = 0, registerAs = 0) {
        let result = false;
        if (registerAs === 0) {
            let user = new User_1.default(userData);
            user.status = -1;
            try {
                let us = yield user.save();
                result = yield (0, MailManager_1.send)(user.email, user.first_name, mailFor, "", "", "");
            }
            catch (error) {
                result = false;
            }
        }
        else {
            result = yield createMember(userData, registerAs, mailFor);
        }
        return result;
    });
}
exports.registerUser = registerUser;
function createMember(userData, registerAs, mailFor) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = false;
        const verificationCode = (0, SecretHandler_1.getCode)();
        // const verification_digest = await encryptCode(verificationCode, 'verification')
        // let kprofile = new Kprofile()
        // let ksummary = new Ksummary()
        // let user = new User(
        //     {
        //         first_name: userData.first_name,
        //         last_name: userData.last_name,
        //         email: userData.email,
        //         verification_digest: verification_digest,
        //         expires: Date.now() + (24*60*60*1000),
        //         user_type: registerAs
        // kprofile: kprofile._id,
        //         // ksummary: ksummary.id
        //     }
        // )
        // kprofile.user = user._id
        // kprofile.ksummary = ksummary._id
        // ksummary.user = user._id 
        // ksummary.kprofile = kprofile._id
        //     const session = await mongoose.startSession()
        //     session.startTransaction()
        //     try {
        //         await user.save()
        //         // await kprofile.save()
        //         // await ksummary.save()
        //         result = await send(user.email, user.first_name, mailFor, "", "", verificationCode)
        //         await session.commitTransaction()
        //         console.log('user created successfully!')
        //     } catch (error) {
        //         await session.abortTransaction()
        //         console.log('aborted!')
        //     } finally {
        //         session.endSession()
        //     }
        return true;
    });
}
