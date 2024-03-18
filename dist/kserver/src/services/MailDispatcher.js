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
exports.deliverMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: 'dmo@karmavitae.com',
        pass: process.env['SMTP_PASSWORD']
    }
});
function deliverMail(to, subject, message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env['SMTP_PASSWORD']);
        const options = {
            from: '"Karma Vitae"<dmo@karmavitae.com>',
            to: to,
            subject: subject,
            html: message
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (error, info) => {
                if (error) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    });
}
exports.deliverMail = deliverMail;
