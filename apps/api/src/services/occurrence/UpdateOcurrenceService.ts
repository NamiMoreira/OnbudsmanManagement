import prismaClient from "../../prisma";
import { sanitizeBoolean } from "../../utils/sanitizeBoolean";

class UpdateOcurrenceService {
  async execute(id, data) {

    
    try {
      data.reanalise = sanitizeBoolean(data.reanalise);
  
      // Construir o objeto data dinamicamente
      const updateData: any = {
        reanalise: data.reanalise,
        descricao: data.descricao,
        cartao_beneficiario: data.cartao_beneficiario,
        manifestacao_ant: data.manifestacao_ant,
        nome: data.nome,
        nome_cliente: data.nome_cliente,
        email: data.email,
        cpf: data.cpf,
        status_id: 4,
        telefone: data.telefone,
        objetivo: data.objetivo,
        observacao_interna: data.observacoes_internas,
        updated_at: new Date(), 
        
      };
      console.log(updateData);
      
  
      const ocurrence = await prismaClient.occurrence.update({
        where: {
          protocolo: id,
        },
        data: updateData 
      }); 

      
      return ocurrence;
      
    } catch (error) {
      return {"err":" Erro na execução!"}
    }
  }
}

export { UpdateOcurrenceService };