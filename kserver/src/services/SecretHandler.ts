
import { IS2S } from "../../../common/interfaces/igen"
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const password_key = process.env['PASSWORD_KEY'] || ''
const activation_key = process.env['ACTIVATION_KEY'] || ''
const reset_key = process.env['RESET_KEY'] || ''
const verification_key = process.env['VERIFICATION_KEY'] || ''
const text_encryption_key = '8m67jIV8sRKuNw3YrjMx8fqKX1MxIWgk'
const iv = 'lGfZu2ZKfxwT0xy1'

const authKeys: IS2S = { 'password' : password_key, 'activation' : activation_key, 'reset' : reset_key, 'verification' : verification_key }

// export async function validatePassword(plain:string, encrypted:string, authenticationFor:string): Promise<IResultCrypto>{
//   const key = authKeys[authenticationFor]
//   return !key.trim() ? {"status" : -1, "message" : "Internal Server Key Error"} : await verifyPassword(plain, encrypted, key)
// }

// export async function verify(plain:string, encrypted:string, authenticationFor:string): Promise<IResultCrypto>{
//     const key = authKeys[authenticationFor]
//     return !key.trim() ? {"status" : -1, "message" : "Internal Server Key Error"} : await verifyPassword(plain, encrypted, key)
// }


export async function encryptCode(password: string, secretFor: string): Promise<string> {
    const saltRounds = 10;
    crypto.Cipher
    const key = authKeys[secretFor]
    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedCode = await bcrypt.hash(password + key, salt);
    return encryptedCode
  }



// async function verifyPassword(password: string, hashedPassword: string, key: string): Promise<IResultCrypto> {
//     const isMatch = await bcrypt.compare(password + key, hashedPassword);
//     return isMatch ? {"status" : 1, "message" : "Authentication Successful"} : { "status" : 0, "message" : "Invalid Username/Password"}
//   }

export function getCode(): string {
  const verificationCode = crypto.randomBytes(16).toString('hex')
  return verificationCode
}