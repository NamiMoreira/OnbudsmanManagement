import prismaClient from "../../prisma";



class GetOcurrenceStatusService{
    async execute (status){
    const result = await prismaClient.occurrence.count({
            where:{
                status_id : status
            }
        })
    return Number(result)
    } 
    
}

export {GetOcurrenceStatusService}