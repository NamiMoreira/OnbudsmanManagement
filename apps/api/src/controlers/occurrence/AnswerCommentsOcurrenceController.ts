import { Request,Response } from "express";
import { AnswerCommentsOcurrenceService } from "../../services/occurrence/AnswerCommentsOcurrenceService";
import {SendEmailService} from "../../services/email/SendEmailService"
import {formatarDataCustom} from "../../utils/horaFormatada"
import { readFileSync } from "fs";
import prismaClient from "../../prisma";
import { error } from "console";
const path = require("path");

class AnswerCommentsOcurrenceController {
    async handle ( req: Request,res: Response){
        const data = req.body;   
        
        try {
            const dataOcurrence = await prismaClient.occurrence.findFirst(
            {where: {protocolo: data.protocolo }
            })  
            if (!dataOcurrence.email) {
                res.send(422).json({"Erro":"Email do beneficiário não encontrado!"})
                throw error({"Erro":"Email do beneficiário não encontrado!"})
            }
            
            const dir = path.resolve(__dirname, "../../templates/resposta_beneficiario.html");
            var template = readFileSync(dir, "utf8")
            template = template.replaceAll("{{DATA_RESPOSTA}}", formatarDataCustom(new Date()));
            template = template.replaceAll("{{NOME_ANALISTA}}", data.usuario_resposta);
            template = template.replaceAll("{{NOME}}", dataOcurrence.nome);
            template = template.replaceAll("{{TEXTO_RESPOSTA}}", data.resposta);
            var payload = {
                from: "noreply@unimedpinda.com.br",
                to: dataOcurrence.email, 
                subject:"Comentário Adicionado - Ocorrencia Ouvidoria",
                html: template}
                
                const sendEmailService = new SendEmailService();
                const sendEmail = await sendEmailService.execute(payload)
            
                const answerCommentsOcurrenceService = new AnswerCommentsOcurrenceService();
                var result = await answerCommentsOcurrenceService.execute(data);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({"erro": "erro na execução"})
            
        }
        

            if (!result.err) {
                return res.status(result.status).json({content: result.content,text: result.text})       
            }else{
                return res.status(result.status).json(result.err)
            };
        };  
    };
    export {AnswerCommentsOcurrenceController}