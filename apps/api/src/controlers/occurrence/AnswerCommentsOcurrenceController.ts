import { Request,Response } from "express";
import { AnswerCommentsOcurrenceService } from "../../services/occurrence/AnswerCommentsOcurrenceService";
import {SendEmailService} from "../../services/email/SendEmailService"
import {formatarDataCustom} from "../../utils/horaFormatada"
import { readFileSync } from "fs";
import prismaClient from "../../prisma";
const path = require("path");

class AnswerCommentsOcurrenceController {
    async handle ( req: Request,res: Response){
        const data = req.body;
        
        const answerCommentsOcurrenceService = new AnswerCommentsOcurrenceService();
        const result = await answerCommentsOcurrenceService.execute(data);
        const dataOcurrence = await prismaClient.occurrence.findFirst(
            {where: {protocolo: data.protocolo }
         })
        console.log(dataOcurrence);
        
        
        try {
            const dir = path.resolve(__dirname, "../../templates/resposta_beneficiario.html");
            var template = readFileSync(dir, "utf8")
                template = template.replaceAll("{{DATA_RESPOSTA}}", formatarDataCustom(new Date()));
                template = template.replaceAll("{{NOME_ANALISTA}}", data.usuario_resposta);
                template = template.replaceAll("{{NOME}}", dataOcurrence.nome);
                template = template.replaceAll("{{TEXTO_RESPOSTA}}", data.resposta);
            var payload = {
                from: "noreply@unimedpinda.com.br",
                to: "ti.naomi@unimedpinda.com.br", 
                subject:"Comentário Adicionado - Ocorrencia Ouvidoria",
                html: template}
                
             const sendEmailService = new SendEmailService();
             const sendEmail = sendEmailService.execute(payload)
            
        } catch (error) {
            console.log(error);
            
        }

            if (!result.err) {
                return res.status(result.status).json({content: result.content,text: result.text})       
            }else{
                return res.status(result.status).json(result.err)
            };
        };  
    };
    export {AnswerCommentsOcurrenceController}