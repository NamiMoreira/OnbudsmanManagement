import prismaClient from "../../prisma";

class FinishOcurrenceService {
    async execute (id){
        const result = await prismaClient.occurrence.findFirst(
            {
                where: {protocolo: id}
            }
        )
        return result ; 
    }
    
    async update(id){
        await prismaClient.occurrence.update({
            where: {
                protocolo: id,
            },
            data: {
                status_id: 10
            }
        }); 
        return 
    }
}

export { FinishOcurrenceService }