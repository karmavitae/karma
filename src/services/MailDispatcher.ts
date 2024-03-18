import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(
    {
        host: "smtp.office365.com",
        port: 587,
        auth: {
            user: 'dmo@karmavitae.com',
            pass: process.env['SMTP_PASSWORD']
        }
    }
)

export async function deliverMail(to:string, subject:string, message:string): Promise<boolean> {
    console.log(process.env['SMTP_PASSWORD'])
    const options = {
        from : '"Karma Vitae"<dmo@karmavitae.com>', 
        to: to, 
        subject: subject, 
        html: message
    }
    return new Promise((resolve, reject)=> {
        transporter.sendMail(options, (error, info) =>{
            if(error) {
               reject(false)
            }else{
               resolve(true)
            }
        })
    })
} 



