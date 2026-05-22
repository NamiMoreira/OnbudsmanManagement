import { Response,Request } from "express";
import {SendEmailService} from "../../services/email/SendEmailService"
import { readFileSync } from "fs";
const path = require("path");
import {FinishOcurrenceService} from '../../services/occurrence/FinishOcurrenceService'

class FinishOcurrenceController {
    async handle (req:Request, res: Response){
        
        const data = req.body
        
        
        try {
          const finishOcurrenceService = new FinishOcurrenceService()
          const dataOcurrence = await finishOcurrenceService.execute(data.protocol)
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

          
          const info = await sendEmail.execute(payload )
          
          if (info.rejected.length === 0){
              await finishOcurrenceService.update(data.protocol)
              return res.status(200).json({
                message: "Ocorrência finalizada com sucesso"
              })
          }else{
              return res.status(400).json({
              message: "Falha ao enviar email"
          })
          }
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({
          error: "Erro interno do servidor"
          })
      
    };


    }
}

export{FinishOcurrenceController}