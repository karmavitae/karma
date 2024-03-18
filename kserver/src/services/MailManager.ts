import * as mb from "./MessageBuilder";
import { deliverMail} from "./MailDispatcher";
import { IS2S } from '../../../common/interfaces/igen'

const title:IS2S = {
    "activation" : "Thank you for joining Karma Vitae community.",
    "register" : "We appreciate your interest in Karma Vitae.",
    "reset" : "We have received your request for password reset.",
    "invite" : "You are invited to join the Karma Vitae community.",
    "talent_pool" : " invites you to join an exclusive Karma Vitae community"
} 

export async function send(
    to: string, 
    name: string,
    emailFor:number, 
    recruiterName: string = 'Recruiter', 
    recruiterMessage: string = '',
    activationToken: string = "0000" ) {
        let message = ''
        let subject = ''
        switch(Number(emailFor)) {
            case 0: { //Register interest
                message = mb.buildRegistrationMessage(name)
                subject = title['register']
                break
            }
            case 1: { //Activation Email
                message = mb.buildActivationMessgage(name, activationLink('activate/', activationToken, to))
                subject = title['activation']
                break
            }
            case 2: { //Talent Pool Activation
                message = mb.buildTalentPoolMessage(name, recruiterName, recruiterMessage, activationLink('activate/', activationToken, to) )
                subject = "Karma Viate & " + recruiterName + title['talent_pool'] 
                break
            }
            case 3: { //Invitation Message
                message = mb.buildInvitationMessage(name, activationLink('activate/', activationToken, to))
                subject = title['invite']
                break
            }
            case 4: { //Password Reset
                message = mb.buildResetMessge(name, activationLink('reset/', activationToken, to))
                subject = title['reset']
                break
            }
            case 5: {  //Referee Activation (1. Set Password, 2: Endorse/Verify 3: Entise to build Kv)
                break
            }
            default: {
                break
            }
        }
        let result = await deliverMail(to, subject, message)
        return result
}

function activationLink(action:string, token:string, email:string):string{
    return 'https://www.karmavitae.com/' + action  + token + '/' + email.replace('@', '%40')
}