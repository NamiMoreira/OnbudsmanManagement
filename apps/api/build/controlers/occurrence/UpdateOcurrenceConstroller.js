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
exports.UpdateOcurrenceController = void 0;
const UpdateOcurrenceService_1 = require("../../services/occurrence/UpdateOcurrenceService");
class UpdateOcurrenceController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            const { reanalise, classificacao_id, unidade_id, descricao, cartao_beneficiario, manifestacao_ant, identificacao_id, forma_resposta_id, assunto_id, sub_assunto_id, nome, email, CPF, telefone, canal_id } = req.body;
            console.log('teste');
            const updateOcurrenceService = new UpdateOcurrenceService_1.UpdateOcurrenceService();
            const ocurrence = yield updateOcurrenceService.execute(id, { reanalise, classificacao_id, unidade_id, descricao, cartao_beneficiario, manifestacao_ant, identificacao_id, forma_resposta_id, assunto_id, sub_assunto_id, nome, email, CPF, telefone, canal_id });
            return res.json(ocurrence);
        });
    }
}
exports.UpdateOcurrenceController = UpdateOcurrenceController;
;
