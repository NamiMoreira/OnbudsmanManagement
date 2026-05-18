import { Response,Request } from "express";
import {GetManyByFilterOcurrenceService } from "../../services/occurrence/GetManyByFilterOcurrenceService";


class GetManyByFilterOcurrenceController{
    async handle (req: Request, res : Response){
        const {cpf, cartao_beneficiario, status_id, nome, email} = req.query
        
        const getManyByFilterOcurrenceService = new GetManyByFilterOcurrenceService();
        const ocurrence = await getManyByFilterOcurrenceService.execute(cpf, cartao_beneficiario, status_id, nome, email); 

        return res.status(200).json(ocurrence)
    }
};

export { GetManyByFilterOcurrenceController };