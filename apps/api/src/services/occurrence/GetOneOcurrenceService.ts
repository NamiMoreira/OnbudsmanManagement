import prismaClient from "../../prisma";

class GetOneOcurrenceService {
    async execute (protocolo){     
        const ocurrence = await prismaClient.occurrence.findUnique({
            where: {
                protocolo: protocolo
            }
        })   
        

        if (!ocurrence) {
            return {status: 404,error: "Guia não encontrada com o protocolo informado."}
        }else{
            return {status: 200, text: "Guia carregada com sucesso!",content: ocurrence}
        }
        
        
    }
}

export{ GetOneOcurrenceService}