import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 465,
        service: process.env.SMTP_SERVICE || "gmail",
        auth: {
            user: process.env.EMAIL_USER || process.env.SMTP_MAIL,
            pass: process.env.EMAIL_PASS || process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER || process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
