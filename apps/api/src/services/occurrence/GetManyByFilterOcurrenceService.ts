import prismaClient from "../../prisma";

class GetManyByFilterOcurrenceService {
  async execute(cpf, cartao_beneficiario, status_id, nome, email) {
    status_id = Number(status_id)
    
    const ocurrence = await prismaClient.occurrence.findMany({
      
      where: {
        cpf: cpf,
        cartao_beneficiario: cartao_beneficiario,
        nome: nome,
        email: email,
        
        ...(status_id && { status_id: status_id })        
        
      }
    });
    
      if (ocurrence.length === 0) {
            return {status: 404,error: "Guia não encontrada com os parâmetros informado."}
        }

    return ocurrence;
  };
};
export {GetManyByFilterOcurrenceService};