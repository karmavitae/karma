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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const mb = __importStar(require("./MessageBuilder"));
const MailDispatcher_1 = require("./MailDispatcher");
const title = {
    "activation": "Thank you for joining Karma Vitae community.",
    "register": "We appreciate your interest in Karma Vitae.",
    "reset": "We have received your request for password reset.",
    "invite": "You are invited to join the Karma Vitae community.",
    "talent_pool": " invites you to join an exclusive Karma Vitae community"
};
function send(to_1, name_1, emailFor_1) {
    return __awaiter(this, arguments, void 0, function* (to, name, emailFor, recruiterName = 'Recruiter', recruiterMessage = '', activationToken = "0000") {
        let message = '';
        let subject = '';
        switch (Number(emailFor)) {
            case 0: { //Register interest
                message = mb.buildRegistrationMessage(name);
                subject = title['register'];
                break;
            }
            case 1: { //Activation Email
                message = mb.buildActivationMessgage(name, activationLink('activate/', activationToken));
                subject = title['activation'];
                break;
            }
            case 2: { //Talent Pool Activation
                message = mb.buildTalentPoolMessage(name, recruiterName, recruiterMessage, activationLink('activate/', activationToken));
                subject = "Karma Viate & " + recruiterName + title['talent_pool'];
                break;
            }
            case 3: { //Invitation Message
                message = mb.buildInvitationMessage(name, activationLink('activate/', activationToken));
                subject = title['invite'];
                break;
            }
            case 4: { //Password Reset
                message = mb.buildResetMessge(name, activationLink('reset/', activationToken));
                subject = title['reset'];
                break;
            }
            case 5: { //Referee Activation (1. Set Password, 2: Endorse/Verify 3: Entise to build Kv)
                break;
            }
            default: {
                break;
            }
        }
        let result = yield (0, MailDispatcher_1.deliverMail)(to, subject, message);
        return result;
    });
}
exports.send = send;
function activationLink(action, token) {
    return 'https://www.karmavitae.com/' + action + token;
}
