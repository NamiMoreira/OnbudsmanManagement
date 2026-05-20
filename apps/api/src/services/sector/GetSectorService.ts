import { log } from "node:console";
import prismaClient from "../../prisma";

class GetSectorService {
    async execute (id){
        try {
            const result = await prismaClient.sector.findFirst({
                where: {
                    id: id
                }
            });
            if (!result) {
                throw new Error('Dados do setor nao econtrados!')
                return null
            }
            return result
            
        } catch (error) {
            console.log('Erro na execução');
            
        }
    }
}

export {GetSectorService}