export function getHeader(memberName:string): string{
    return `
    <div >
        <div style="margin-top: 50px; font-size: x-large; padding-left: 20px;">Wecome to</div>
        <div> <img src="https://www.karmavitae.com/assets/images/kv-full-logo-light.png" alt="Karma Vitae" style="width: 250px; font-size: xx-large;"> </div>
        <div style="font-size: x-large; padding-left: 20px;">${memberName}!</div>
    </div>
    `
}

export function getTitle(message:string):string {
    return `
    <div style="margin-top: 50px; font-size: x-large; padding-left: 20px;">
            <div >
               ${message}
            </div>
        </div>
    `
}

export function getFooter():string {
    return `
    <div  style="margin-top: 50px; padding-left: 20px; font-size: medium;">
        <div style="font-size: x-large;padding-bottom: 25px;">
            Team Karma Vitae
        </div>
        <div>
            &copy; 2023 Karma Vitae, All rights reserved.  <br>
            Vera Sandbergs, All&eacute; 5B, 411 33, Gothenburg, Sweden
        </div>
    </div>
    `
}

export function getActivationMessage1():string {
    return `
    <div  style="margin-top: 50px; padding-left: 20px; font-size: large;">
    Ready to build your Karma Vitae? Activate your account and follow these quick steps:
        <ul>
            <li>Update Personal Details</li>
            <li>Upload CV</li>
            <li>Get Insights into your karma and talent</li>
        </ul>
    </div>
    `
}

export function getActivationMessage2():string {
    return `
    <div  style="margin-top: 50px; padding-left: 20px; font-size: large;">
        <div>
            <div style="font-size: x-large; padding-bottom: 20px;">
                Not sure where or how to begin? 
            </div>
            Follow the Link below for introduction videos. These videos will take you through 
            the basics of Karma Vitae, from uploading CV to using Karma Vitae to improve your career prospects. <br>
            Explore the world of karma and talent
        </div>
        <div style="padding-top: 25px; font-size: x-large;"> <a href="">Introduction Videos</a> </div>
    </div>
    `
}

export function getResetMessage():string{
    return `
    <div  style="margin-top: 50px; padding-left: 20px; font-size: large;">
        Plesse use the link below to reset your password. <br>
        If this request is not from you, please ignore this email.
    </div>
    `
}

export function getRegistrationMessage():string {
    return `
    <div  style="margin-top: 50px; font-size: large; padding-left: 20px;">
        <div>
            We will shortly invite you to build your own Karma Vitae. <br>
            Karma Vitae will enable you to leverage your talent and to be a part of our growing community. <br>
            We look forward to welcoming you! 
        </div>
    </div>
    `
}

export function getTalentPoolMessage(recruiter:string, recruiterMessage:string):string {
    const message = !recruiterMessage ? 'You will find Karma Vitae (KV) to be useful platform to plan and manage your career.' : recruiterMessage
    return `
    <div style="margin-top: 50px; font-size: large; padding-left: 20px;">
            <div>
              ${recruiter} has uploaded your CV on Karma Vitae, a platform that evaluates, assesses and objectively measures your
              work and experience.   Please use the link below to review your assessment and approve your KV.
              <br><br>
              ${message}
            </div>
        </div>
    `
}

export function getActivationLinkButton(label:string, url:string): string {
    return `
    <div style="margin-top: 50px; padding-left: 20px; font-size: x-large;">
        <a href="${url}" style="text-decoration:none">
            <div style="text-align: center; background-color: #21BAF1; color: white; border-radius: 10px; padding: 10px; max-width: 250px">
            ${label}
            </div>
        </a>
        
    </div>
    `
}

export function getTopStructure():string {
    return `
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 100px ;font-family:Arial, Helvetica, sans-serif">
        <div style="min-width: 10px;"></div>
        <div style="padding: 25px; max-width: 900px; min-width: 450px;">
    `
}

export function getBottomStructure():string{
    return `
        </div>
        <div style="min-width: 10px;"></div>
    </div>
    `
}