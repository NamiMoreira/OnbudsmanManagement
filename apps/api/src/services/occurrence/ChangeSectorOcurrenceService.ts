import { data } from "react-router-dom";
import prismaClient from "../../prisma";
import { text } from "body-parser";

class ChangeSectorOcurrenceService{
    async execute (data){
        
        try {      
            const response = await prismaClient.histor_sector.create({
                 data: {
                     protocol: data.protocol,
                     sector_destiny: data.sector_destiny,
                     sector_origin: data.sector_origin,
                     observacao: data.observacao,
                     user_send: data.user_send,
                     date_send: data.date_send
                 }
             })
     
             await prismaClient.occurrence.update({
                 data: { 
                     status_id: 2
                 },
                 where: {
                     protocolo: data.protocol
                 }
             })
             if (!response) {
                 return {text: "Falha ao enviar para outro setor!",status: "error"}
             }else{
                 return{text: "Enviado para outro setor com sucesso",status: "ok"}
             }
        } catch (error) {
           console.log(error);     
        }
        
    }
}

export {ChangeSectorOcurrenceService}
