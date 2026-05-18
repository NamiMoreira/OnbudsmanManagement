import { log } from "node:console";
import prismaClient from "../../prisma";

class NotificationQuestionOcurrenceService{
    async execute (protocol){

        try {
            const result = await prismaClient.comment.findFirst({
                where:{
                    occurrence_id: protocol,
                    
                },
                  orderBy: {
                 comment_id: 'desc' 
                }
            })   
            console.log(result);
            
                          
            if (result.answered == false) {
                return {err: '' , status: 200, total:0, text: "Sucesso na execução!"} 
                  
            }
            else {
                return {err: '' , status: 200, total:1, text: "Sucesso na execução!"}
            }

        } catch (error) {
            return  {err: error, status: 400, text: "Falha na execução"}
        }
    }
}
export {NotificationQuestionOcurrenceService}