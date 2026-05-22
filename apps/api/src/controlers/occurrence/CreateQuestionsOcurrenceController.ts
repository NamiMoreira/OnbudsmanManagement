import { Response, Request } from "express";
import { CreateQuestionsOcurrenceService } from "../../services/occurrence/CreateQuestionsOcurrenceService";
import { SendEmailService } from "../../services/email/SendEmailService";
import { readdirSync, readFileSync } from "fs";
const path = require("path");
import { createZipFromFiles } from "../../utils/createZipFromFiles";

class CreateQuestionsOcurrenceController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    const createQuestionsOcurrenceService =
      new CreateQuestionsOcurrenceService();
    const result = await createQuestionsOcurrenceService.execute(data);

    if (result.status === "error") {
      return res.status(result.statusCode).json(result);
    }

    try {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const seconds = String(today.getSeconds()).padStart(2, "0");
      const data_envio = `${day}_${month}_${year}_${hours}_${minutes}`
      const dir = path.resolve(__dirname,"../../templates/questionamentos_cliente.html");
      var template = readFileSync(dir, "utf-8");
      const filePath = readdirSync(path.resolve(__dirname,"..","..","uploads", "questions"));
      let files = [];

      template = template.replace('{{NOME_CLIENTE}}',data.manifestante)
      template = template.replaceAll('#{{PROTOCOLO}}',data.protocol)
      template = template.replace('{{NOME_EMISSOR}}',data.user_question)
      template = template.replace('{{MENSAGEM}}',data.question)
      setTimeout(async () => {
          
      for (let i = 0; i < filePath.length; i++) {
        let element = filePath[i];
        if (`${element.split("-")[0]}-${element.split("-")[1]}` ==`${data_envio}-${data.protocol}`) {
          element = path.resolve(__dirname,"..","..","uploads", "questions",element) 
          
          files.push(element);
        
        }

      }      
      if (files.length != 0) {
        template = template.replace('{{DOWNLOAD}}','Documentos anexos disponíveis para download.')
        const outputFolder = path.resolve(__dirname,"..","..","uploads","questions",'zip');
        const zipName = `${data_envio}_files.zip`;
        const zipFiles = await createZipFromFiles(files,outputFolder,zipName,'question');
     
        const payload = {
          from: "noreply@unimedpinda.com.br",
          to: result.email,
          subject: `Questionamento Ocorrencia - Protocolo: ${data.protocol}`,
          html: template,
          attachments: [{filename: `ocorrencia_${data.protocol}.zip`, path: zipFiles }],
        };
        
        
          const sendEmailService = new SendEmailService();
          const statusEmail = await sendEmailService.execute(payload);
      }else {
        template = template.replace('{{DOWNLOAD}}', '')
          
          const payload = {
          from: "noreply@unimedpinda.com.br",
          to: result.email,
          subject: `Questionamento Ocorrencia - Protocolo: ${data.protocol}`,
          html: template,
         
        };
        const sendEmailService = new SendEmailService();
        const statusEmail = await sendEmailService.execute(payload);
      }
      

      }, 5000);
      if (!result.err) {
        return res.status(result.statusCode).json(result);
      } else {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { CreateQuestionsOcurrenceController };
