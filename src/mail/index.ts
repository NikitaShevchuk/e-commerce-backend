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
}

export default new Mail();
