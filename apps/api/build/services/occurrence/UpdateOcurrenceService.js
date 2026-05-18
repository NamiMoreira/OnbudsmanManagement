"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOcurrenceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateOcurrenceService {
    execute(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { reanalise, classificacao_id, unidade_id, descricao, cartao_beneficiario, manifestacao_ant, identificacao_id, forma_resposta_id, assunto_id, sub_assunto_id, nome, email, CPF, telefone, canal_id, }) {
            id = parseInt(id);
            const ocurrence = yield prisma_1.default.occurrence.update({
                where: {
                    id: id,
                },
                data: {
                    reanalise: reanalise,
                    classificacao_id: classificacao_id,
                    unidade_id: unidade_id,
                    descricao: descricao,
                    cartao_beneficiario: cartao_beneficiario,
                    manifestacao_ant: manifestacao_ant,
                    identificacao_id: identificacao_id,
                    forma_resposta_id: forma_resposta_id,
                    assunto_id: assunto_id,
                    sub_assunto_id: sub_assunto_id,
                    nome: nome,
                    email: email,
                    cpf: CPF,
                    telefone: telefone,
                    canal_id: canal_id
                },
            });
            return ocurrence;
        });
    }
}
exports.UpdateOcurrenceService = UpdateOcurrenceService;
