import { text } from "body-parser";
import prismaClient from "../../prisma";

class CreateQuestionsOcurrenceService {
  async execute(data) {
    try {
      const ocurrenceExists = await prismaClient.occurrence.findUnique({
        where: { protocolo: data.protocol },
      });
      if (!ocurrenceExists) {
        return {
          status: "error",
          statusCode: 404,
          text: "Protocolo não localizado",
          err: "Protocolo não localizado",
        };
      }
      const  content = await prismaClient.question.create({
        data: {
          ocurrence_id: data.protocol,
          content: data.question,
          user_created: data.user_question,
          
        },
      });
                   await prismaClient.occurrence.update({
                 data: {
                     status_id: 3
                 },
                 where: {
                     protocolo: data.protocol
                 }
             })

       return  {
          status: "success",
          statusCode: 200,
          text: "Questionamento enviado com sucesso",
          err: "",
          content: content ,
          email: ocurrenceExists.email }
        
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        statusCode: 400,
        text: "Falha ao enviar o questionamento...",
        err: error,
      };
    }

  }
}

export { CreateQuestionsOcurrenceService };
