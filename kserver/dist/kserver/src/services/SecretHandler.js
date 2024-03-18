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
exports.getCode = exports.encryptCode = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const password_key = process.env['PASSWORD_KEY'] || '';
const activation_key = process.env['ACTIVATION_KEY'] || '';
const reset_key = process.env['RESET_KEY'] || '';
const verification_key = process.env['VERIFICATION_KEY'] || '';
const authKeys = { 'password': password_key, 'activation': activation_key, 'reset': reset_key, 'verification': verification_key };
// export async function validatePassword(plain:string, encrypted:string, authenticationFor:string): Promise<IResultCrypto>{
//   const key = authKeys[authenticationFor]
//   return !key.trim() ? {"status" : -1, "message" : "Internal Server Key Error"} : await verifyPassword(plain, encrypted, key)
// }
// export async function verify(plain:string, encrypted:string, authenticationFor:string): Promise<IResultCrypto>{
//     const key = authKeys[authenticationFor]
//     return !key.trim() ? {"status" : -1, "message" : "Internal Server Key Error"} : await verifyPassword(plain, encrypted, key)
// }
function encryptCode(password, secretFor) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const key = authKeys[secretFor];
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        // const encryptedCode = await bcrypt.hash(password + key, salt);
        const encryptedCode = 'dfdfafjdfhkh';
        return encryptedCode;
    });
}
exports.encryptCode = encryptCode;
// async function verifyPassword(password: string, hashedPassword: string, key: string): Promise<IResultCrypto> {
//     const isMatch = await bcrypt.compare(password + key, hashedPassword);
//     return isMatch ? {"status" : 1, "message" : "Authentication Successful"} : { "status" : 0, "message" : "Invalid Username/Password"}
//   }
function getCode() {
    const verificationCode = crypto_1.default.randomBytes(16).toString('hex');
    return verificationCode;
}
exports.getCode = getCode;
