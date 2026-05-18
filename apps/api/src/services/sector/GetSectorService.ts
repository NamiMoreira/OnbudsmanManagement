import { log } from "node:console";
import prismaClient from "../../prisma";

class GetSectorService {
    async execute (name){
        try {
            const result = await prismaClient.sector.findFirst({
                where: {
                    name: name
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