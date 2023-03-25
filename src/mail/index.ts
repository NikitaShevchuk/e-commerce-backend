import sgMail from "@sendgrid/mail";
import { emailApiKey } from "../environment-variables";

class Mail {
    constructor() {
        sgMail.setApiKey(emailApiKey !== undefined ? emailApiKey : "");
    }

    async registration(email: string): Promise<void> {
        try {
            await sgMail.send({
                to: email,
                from: "shevchuk.nikita.gh@gmail.com",
                subject: "Thank you for signing up!",
                html: `<h1>You've successfully registered new account with email: ${email}</h1>`
            });
        } catch (error) {
            console.log(error);
        }
    }

    async passwordReset(email: string, token: string): Promise<void> {
        try {
            await sgMail.send({
                to: email,
                from: "shevchuk.nikita.gh@gmail.com",
                subject: "E-commerce password reset",
                html: `
                <h1>You've required a password change for your account.</h1>
                <p>
                    Follow the link to change your password: 
                    <a target="_black" href="https://localhost:5000/reset/${token}">change password</a>.
                </p>
                <p>*do not click the link, if this password change request wasn't initiated by you.</p>
                `
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Mail();
