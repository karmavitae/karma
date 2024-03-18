"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const articles = {
    "kvp": {
        title: "Karma Vitae professional",
        img: "assets/images/birds.png",
        quote: "You don't need to shout when your work can speak for itself.",
        content: [
            { type: 3, text: "We believe that we all have talents that are built through our Karma (actions), over time. To achieve full potential in our work-life, we not only need relevant opportunities but also a complete awareness of our capabilities.   Mere words on the CV/Resume are never enough to define our life's work." },
            { type: 3, text: "With Karma Vitae, professionals can gain deep insights into their talents and manage their career development. To provide these insights, Karma Vitae uses our large language talent models, AI algorithms, workflows and processes." },
            { type: 3, text: "Karma Vitae platform helps you to leverage your talent and potential by gaining objective, unbiased and measurable assessment. Paving the way for informed career choices and achieve better work-life balance. Some of Karma Vitae key benefits are:" },
            { type: 2, list: [
                    "Objective Talent Assessment",
                    "Environment to Reflect",
                    "Seek Feedback and Collaborate",
                    "Ensure Level Playing Field",
                    "Career Planning and Opportunities",
                ] },
            { type: 1, text: "Come on! Build your Karma Vitae and Meet the Talented You" }
        ]
    },
    "kvr": {
        title: "Karma Vitae Recruitment",
        img: "assets/images/trees.png",
        quote: "Like trees in the forest, all professionals have earned their place. The challenge is to find the right one.",
        content: [
            { type: 3, text: 'At Karma Vitae, we believe that everyone has a talent that is worth paying for.  Very often it is disguised behind the prolific words on CV/Resume or remains unmatched in the currently used screening processes.' },
            { type: 3, text: 'Through Karma Vitae Recruitment, we offer a finer talent analysis using our large language talent models, AI algorithms and workflows. Thereby, enabling real-time, talent-driven capabilities analysis and screening process. Karma Vitae Recruitment empowers recruiters with talent intelligence purely based on a professionals\' work and experience.' },
            { type: 3, text: 'Karma Vitae Recruitement - Noteworty Facets:' },
            { type: 2, list: [
                    "Accurate and Efficient Screening",
                    "Enhanced Analysis and Insights",
                    "Continuous Engagement",
                    "Atomic Job Creations and Candidate Matching",
                    "Talent Pool Management",
                ] },
            { type: 1, text: "To try Karma Vitae Recruitment please contact us to request a Demo." }
        ]
    },
    "about": {
        title: "About Us",
        img: "assets/images/diamonds.png",
        quote: "With time, your experience crystalises into talent. Recognise and hone to make it sparkle.",
        content: [
            { type: 3, text: 'A thought on which Karma Vitae has been conceived, and created.  Through Karma Vitae, our endeavour is to:' },
            { type: 3, text: 'Help Build a Happy and Motivated Workforce Globally.' },
            { type: 3, text: 'According to the World Health Organisation, one of the top risks to mental health at work is the under-use of skills or being under-skilled. Various factors contribute to this, such as:' },
            { type: 2, list: [
                    'Underestimation or overestimation of skills',
                    'Insufficient awareness of one’s full potential',
                    'Undervalued due to biases'
                ] },
            { type: 3, text: 'Resulting in a distressing work environment for professionals. Also, a loss of productivity for businesses. ' },
            { type: 3, text: 'Karma Vitae is built with an objective to give you a detailed, measurable and unbiased talent assessment based on your experience. These insights are designed to empower you with your talent intelligence, thereby helping you make knowledgeable career choices, and plan your career effectively. ' },
            { type: 3, text: 'Additionally, Karma Vitae facilitates businesses to make well-informed Human Capital Management decisions based on our candidate talent insights. ' },
            { type: 3, text: 'Karma Vitae aims to enable you in planning a work-life balance beneficial to your overall well-being and work satisfaction. Thereby, enhancing your productivity and positive contribution to the businesses you work in.' },
            { type: 3, text: 'We look forward to welcome you at Karma Vitae.' },
        ]
    }
};
function getInfo(informationFor) {
    return articles[informationFor];
}
exports.getInfo = getInfo;
