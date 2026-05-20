import prismaClient from "../../prisma";

class AnswerCommentsOcurrenceService{
    async execute(data){
        
        try {
        const result = await prismaClient.comment.create({
            data:{
                occurrence_id : data.protocolo,
                content: data.resposta,        
                name : data.usuario_resposta
            }
        })

        await prismaClient.comment.updateMany({
            data:{
                answered: false
            },
            where: {
                occurrence_id: data.protocolo
            }
        })

        await prismaClient.occurrence.update({
            data:{
                message: false,
                status_id: 4
            },
            where: {
                protocolo: data.protocolo
            }
        })
                
            return {status: 200, content:result, text: "Sucesso na execução!"}
        } catch (error) {
            return {err: error, status: 400, text: "Falha na execução"}
        }

        
    }
}

export{AnswerCommentsOcurrenceService}