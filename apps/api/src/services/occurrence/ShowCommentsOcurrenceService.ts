import { STATUS_CODES } from "http";
import prismaClient from "../../prisma";

class ShowCommentsOcurrenceService {
  async execute(protocol) {
    console.log(protocol);
    
    try {
        const comments = await prismaClient.comment.findMany({
            where: {
                occurrence_id : protocol
            }
        });
        console.log(comments);
        
     return {
      text: "Executado com sucesso",
      statusCode: 200,
      content: comments
     }

    } catch (err) {
      return {
        text: "Falha na execução",
        statusCode: 400,
        err: err,
      };
    }


     
    };
  }


export { ShowCommentsOcurrenceService };
