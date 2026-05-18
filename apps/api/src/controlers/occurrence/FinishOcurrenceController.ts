import { Response,Request } from "express";
import {SendEmailService} from "../../services/email/SendEmailService"
import { readFileSync } from "fs";
const path = require("path");
import {FinishOcurrenceService} from '../../services/occurrence/FinishOcurrenceService'
import prismaClient from "../../prisma";

class FinishOcurrenceController {
    async handle (req:Request, res: Response){

        const data = req.body
        
        const finishOcurrenceController = new FinishOcurrenceService()
        const dataOcurrence = await finishOcurrenceController.execute(data.protocol)

        try {
      const sendEmail = new SendEmailService();
      const dir = path.resolve(__dirname,"../../templates/finalizacao_ocorrencia.html");
      var template = readFileSync(dir,'utf-8');
      template = template.replace('{{NOME_BENEFICIARIO}}',dataOcurrence.nome)      
      template = template.replace('{{MENSAGEM_RESPOSTA}}',data.resolucao)      

      const payload = {
        from: "noreply@unimedpinda.com.br",
        to: dataOcurrence.email,
        subject: "Finalização Ocorrencia - Ouvidoria",
        html: template,
      };
      
      await sendEmail.execute(payload );
      //await finishOcurrenceController.update(data.protocol)

    } catch (error) {
       console.log(error);
    };


        return res.status(200)
    }
}

export{FinishOcurrenceController}