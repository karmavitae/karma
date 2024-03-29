
import { IResult, IS2S } from "../../common/interfaces/igen"
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const password_key = process.env['PASSWORD_KEY'] || ''
const activation_key = process.env['ACTIVATION_KEY'] || ''
const reset_key = process.env['RESET_KEY'] || ''
const verification_key = process.env['VERIFICATION_KEY'] || ''

const authKeys: IS2S = { 'password' : password_key, 'activation' : activation_key, 'reset' : reset_key, 'verification' : verification_key }

// export async function validate(plain:string, encrypted:string, authenticationFor:string): Promise<IResult>{
//   const key = authKeys[authenticationFor]
//   return !key.trim() ? {"status" : -1, "message" : "Internal Server Key Error"} : await verifyPassword(plain, encrypted, key)
// }

export async function encryptCode(password: string, secretFor: string): Promise<string> {
    const saltRounds = 10;
    crypto.Cipher
    const key = authKeys[secretFor]
    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedCode = await bcrypt.hash(password + key, salt);
    return encryptedCode
  }

export async function verifyPassword(password: string, hashedPassword: string, keyCode: string): Promise<boolean> {
  let key = authKeys[keyCode]
  const isMatch = await bcrypt.compare(password + key, hashedPassword);
  return isMatch 
}

export function getCode(): string {
  const verificationCode = crypto.randomBytes(16).toString('hex')
  return verificationCode
}