import prismaClient from "../../prisma";

class GetAllOcurrenceService{

    async execute(protocol: string){
        const ocurrence = prismaClient.occurrence.findMany({
    
        })
        return ocurrence;

    }
}

export {GetAllOcurrenceService}