import prismaClient from "../../prisma";
import { sanitizeBoolean } from "../../utils/sanitizeBoolean";

class UpdateOcurrenceService {
  async execute(id, data) {

    
    
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
      telefone: data.telefone,
      objetivo: data.objetivo,
      observacao_interna: data.observacoes_internas,
      updated_at: new Date(), // Atualiza a data de modificação
      
    };

    // Adicionar relacionamentos apenas se os IDs existirem e forem válidos
    if (data.unidade_id && data.unidade_id !== '') {
      updateData.unidade = {
        connect: { unidade_id: Number(data.unidade_id) }
      };
    }

    if (data.canal_id && data.canal_id !== '') {
      updateData.canal = {
        connect: { canal_id: Number(data.canal_id) }
      };
    }

    if (data.tipo_contrato && data.tipo_contrato !== '') {
      updateData.tp_contrato = {
        connect: { tp_contrato_id: Number(data.tipo_contrato) }
      };
    }

    if (data.setor_interno && data.setor_interno !== '') {
      updateData.setor_intern = {
        connect: { setor_interno: Number(data.setor_interno) }
      };
    }

    if (data.status_id && data.status_id !== '') {
      updateData.status = {
        connect: { status_id: Number(data.status_id) }
      };
    }

    if (data.tipo_demandante && data.tipo_demandante !== '') {
      updateData.tp_demandante = {
        connect: { tp_demandante_id: Number(data.tipo_demandante) }
      };
    }
    console.log(updateData);

    const ocurrence = await prismaClient.occurrence.update({
      where: {
        protocolo: id,
      },
      data: updateData,
    }); 
    
    return ocurrence;
  }
}

export { UpdateOcurrenceService };