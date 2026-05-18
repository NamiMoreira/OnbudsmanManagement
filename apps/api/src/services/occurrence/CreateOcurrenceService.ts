import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma";
import {gerarProtocolo} from "../../utils/gerarProtocolo"

class CreateOcurrenceService {
  async execute({
    reanalise,
    unidade_id,
    descricao,
    cartao_beneficiario,
    manifestacao_ant,
    nome,
    nome_cliente,
    email,
    cpf,
    telefone,
    objetivo
    
  }) {
    const hoje = new Date();
    const prazo_final = new Date();
    const prazo_interno = new Date();
    prazo_final.setDate(hoje.getDate() + 60);
    prazo_interno.setDate(hoje.getDate() + 30);
    unidade_id = Number(unidade_id)
    const protocolo = gerarProtocolo();

    if (reanalise === "true") {
      reanalise = true;
    } else {
      reanalise = false;
    }
const occurrence = await prismaClient.occurrence.create({

  data: {
    reanalise,//ok
    unidade_id: Number(unidade_id),//ok
    descricao,//ok
    cartao_beneficiario,//ok
    manifestacao_ant,//ok
    nome, //ok
    nome_cliente,//ok
    email,//ok
    cpf,//ok
    telefone,//ok
    prazo_final,
    prazo_interno,
    protocolo,
    objetivo
    
  }
});



    return occurrence;
  }
}

export { CreateOcurrenceService };
