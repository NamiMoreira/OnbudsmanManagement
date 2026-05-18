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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOcurrenceController = void 0;
const CreateOcurrenceService_1 = require("../../services/occurrence/CreateOcurrenceService");
class CreateOcurrenceController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            const { reanalise, classificacao_id, unidade_id, descricao, cartao_beneficiario, manifestacao_ant, identificacao_id, forma_resposta_id, assunto_id, sub_assunto_id, nome, email, cpf, telefone, canal_id } = req.body;
            console.log('teste');
            const updateOcurrenceService = new CreateOcurrenceService_1.CreateOcurrenceService();
            const ocurrence = yield updateOcurrenceService.execute({ reanalise, classificacao_id, unidade_id, descricao, cartao_beneficiario, manifestacao_ant, identificacao_id, forma_resposta_id, assunto_id, sub_assunto_id, nome, email, cpf, telefone, canal_id });
            return res.json(ocurrence);
        });
    }
}
exports.CreateOcurrenceController = CreateOcurrenceController;
;
