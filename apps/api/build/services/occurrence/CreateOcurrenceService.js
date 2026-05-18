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
exports.CreateOcurrenceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateOcurrenceService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ reanalise, classificacao_id, unidade_id, descricao, cartao_beneficiario, manifestacao_ant, identificacao_id, forma_resposta_id, assunto_id, sub_assunto_id, nome, email, cpf, telefone, canal_id, }) {
            const hoje = new Date();
            const prazo_final = new Date();
            const prazo_interno = new Date();
            prazo_final.setDate(hoje.getDate() + 60);
            prazo_interno.setDate(hoje.getDate() + 30);
            function gerarProtocolo() {
                const agora = new Date();
                const ano = agora.getFullYear().toString().slice(-2); // últimos 2 dígitos do ano
                const mes = String(agora.getMonth() + 1).padStart(2, "0");
                const dia = String(agora.getDate()).padStart(2, "0");
                const hora = String(agora.getHours()).padStart(2, "0");
                const min = String(agora.getMinutes()).padStart(2, "0");
                const seg = String(agora.getSeconds()).padStart(2, "0");
                const ms = String(agora.getMilliseconds()).padStart(3, "0");
                // Exemplo: 251007-112030567 (07/10/2025 11:20:30.567)
                return `${ano}${mes}${dia}-${hora}${min}${seg}${ms}`;
            }
            const protocolo = gerarProtocolo();
            if (reanalise === "true") {
                reanalise = true;
            }
            else {
                reanalise = false;
            }
            const occurrence = yield prisma_1.default.occurrence.create({
                data: {
                    reanalise,
                    classificacao_id,
                    unidade_id,
                    descricao,
                    cartao_beneficiario,
                    manifestacao_ant,
                    identificacao_id,
                    forma_resposta_id,
                    assunto_id,
                    sub_assunto_id,
                    nome,
                    email,
                    cpf: cpf,
                    telefone,
                    canal_id,
                    prazo_final,
                    prazo_interno,
                    protocolo
                }
            });
            return occurrence;
        });
    }
}
exports.CreateOcurrenceService = CreateOcurrenceService;
