import transporter from "../config/email.config.js";

const emailProvider = {
    async sendEmail({emailFrom, emailTo, emailSubject, emailText}){
        await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: emailSubject,
            text: emailText,
        });
    },

};
Object.freeze(emailProvider);
export default emailProvider;