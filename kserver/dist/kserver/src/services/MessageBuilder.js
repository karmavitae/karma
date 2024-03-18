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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResetMessge = exports.buildInvitationMessage = exports.buildTalentPoolMessage = exports.buildRegistrationMessage = exports.buildActivationMessgage = void 0;
const msg = __importStar(require("./MessageData"));
const title = {
    "activation": "Thank you for joining Karma Vitae community.",
    "register": "We appreciate your interest in Karma Vitae.",
    "reset": "We have received your request for password reset.",
    "invite": "You are invited to join the Karma Vitae community.",
    "talent_pool": " invites you to join an exclusive Karma Vitae community"
};
function buildActivationMessgage(memberName, activationLink) {
    const htmlMessage = msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['activation']) +
        msg.getActivationMessage1() + msg.getActivationMessage2() +
        msg.getActivationLinkButton('Activate Account', activationLink) +
        msg.getFooter() + msg.getBottomStructure();
    return htmlMessage;
}
exports.buildActivationMessgage = buildActivationMessgage;
function buildRegistrationMessage(memberName) {
    const htmlMessage = msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['register']) + msg.getRegistrationMessage() +
        msg.getFooter() + msg.getBottomStructure();
    return htmlMessage;
}
exports.buildRegistrationMessage = buildRegistrationMessage;
function buildTalentPoolMessage(memberName, recruiter, recruiterMessage, activationLink) {
    const htmlMessage = msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(recruiter + title['talent_pool']) +
        msg.getTalentPoolMessage(recruiter, recruiterMessage) + msg.getActivationLinkButton('Activate Account', activationLink) +
        msg.getFooter() + msg.getBottomStructure();
    return htmlMessage;
}
exports.buildTalentPoolMessage = buildTalentPoolMessage;
function buildInvitationMessage(memberName, activationLink) {
    const htmlMessage = msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['invite']) +
        msg.getActivationMessage1() + msg.getActivationMessage2() +
        msg.getActivationLinkButton('Activate Account', activationLink) +
        msg.getFooter() + msg.getBottomStructure();
    return htmlMessage;
}
exports.buildInvitationMessage = buildInvitationMessage;
function buildResetMessge(memberName, resetLink) {
    const htmlMessage = msg.getTopStructure() + msg.getHeader(memberName) + msg.getTitle(title['reset']) + msg.getResetMessage() +
        msg.getActivationLinkButton('Reset Password', resetLink) +
        msg.getFooter() + msg.getBottomStructure();
    return htmlMessage;
}
exports.buildResetMessge = buildResetMessge;
