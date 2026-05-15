const { BrevoClient } = require('@getbrevo/brevo');

const sendEmail = async ({ to, subject, html }) => {
    try {
        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY
        });

        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: subject,
            htmlContent: html,
            sender: {
                name: "AIRA",
                email: process.env.BREVO_SENDER_EMAIL
            },
            to: [{ email: to }]
        });

        console.log("✅ TEST SUCCESS:", result.messageId);
        return result;

    } catch (error) {
        console.error("❌ STILL 401:", error.message);
        return null;
    }
};

module.exports = sendEmail;