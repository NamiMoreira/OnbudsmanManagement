import { Response, Request } from "express";
import { CreateOcurrenceService } from "../../services/occurrence/CreateOcurrenceService";
const path = require("path");
import { readFileSync } from "fs";
import {SendEmailService} from "../../services/email/SendEmailService"

class CreateOcurrenceController {
  async handle(req: Request, res: Response) {
    const { recaptcha_token, ...formData } = req.body;
    if (!recaptcha_token) {
      return res.status(400).json({ error: "Captcha não enviado." });
    }

    const secretKey = "6LdqZvorAAAAACk0IIG--TwG1qpqoHawFEmLYvgy";

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha_token}`;

    const googleResponse = await fetch(verifyURL, { method: "POST" });
    const captchaData = await googleResponse.json();

    if (!captchaData.success) {
      return res.status(403).json({
        error: "Falha na verificação do reCAPTCHA.",
        details: captchaData["error-codes"],
      });
    }
    
    const data = req.body;
    const updateOcurrenceService = new CreateOcurrenceService();
    const ocurrence = await updateOcurrenceService.execute(data);
    try {
      const sendEmail = new SendEmailService();
      const dir = path.resolve(__dirname,"../../templates/notificacao_abertura.html");
      var htmlTemplate = readFileSync(dir);
      const payload = {
        from: "noreply",
        to: data.email,
        subject: "Manifestação de ocorrencia aberta",
        html: htmlTemplate,
      };
      
      await sendEmail.execute(payload );
      
    } catch (error) {
       console.log(error);
    };
    
    return res.json(ocurrence);

  };
};

export { CreateOcurrenceController };
