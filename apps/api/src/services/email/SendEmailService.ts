import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

class SendEmailService {
  async execute(mailOptions) {
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3', 
        rejectUnauthorized: false 
    },
    requireTLS: true, 
});
    try {
      const info = await transporter.sendMail(mailOptions);

      console.log("✅ Email enviado com sucesso!")

      return info;
    } catch (error) {
      console.error("❌ Erro ao enviar email:", error);
      throw error;
      return false
    }
  }
}

export { SendEmailService };
