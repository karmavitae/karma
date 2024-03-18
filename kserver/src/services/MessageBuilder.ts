import * as msg from './MessageData'
import { IS2S } from '../../../common/interfaces/igen'

const title:IS2S = {
    "activation" : "Thank you for joining Karma Vitae community.",
    "register" : "We appreciate your interest in Karma Vitae.",
    "reset" : "We have received your request for password reset.",
    "invite" : "You are invited to join the Karma Vitae community.",
    "talent_pool" : " invites you to join an exclusive Karma Vitae community"
} 

export function buildActivationMessgage(memberName: string, activationLink: string ):string {
    const htmlMessage = msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['activation']) +
                        msg.getActivationMessage1() + msg.getActivationMessage2() +
                        msg.getActivationLinkButton('Activate Account', activationLink) +  
                        msg.getFooter() + msg.getBottomStructure() 
    return htmlMessage
}

export function buildRegistrationMessage(memberName:string) {
    const htmlMessage =  msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['register']) + msg.getRegistrationMessage() +
                         msg.getFooter() + msg.getBottomStructure() 

    return htmlMessage
}

export function buildTalentPoolMessage(memberName:string, recruiter:string, recruiterMessage:string, activationLink:string) {
    const htmlMessage =  msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(recruiter + title['talent_pool']) + 
                         msg.getTalentPoolMessage(recruiter, recruiterMessage) + msg.getActivationLinkButton('Activate Account', activationLink)+
                         msg.getFooter() + msg.getBottomStructure() 

    return htmlMessage
}

export function buildInvitationMessage(memberName:string, activationLink:string) {
    const htmlMessage =  msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['invite']) + 
                         msg.getActivationMessage1() + msg.getActivationMessage2() +  
                         msg.getActivationLinkButton('Activate Account', activationLink)+
                         msg.getFooter() + msg.getBottomStructure() 

    return htmlMessage
}

export function buildResetMessge(memberName:string, resetLink:string): string {
    const htmlMessage =  msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['reset']) + msg.getResetMessage() +
    msg.getActivationLinkButton('Reset Password', resetLink) +
    msg.getFooter() + msg.getBottomStructure() 

return htmlMessage
}