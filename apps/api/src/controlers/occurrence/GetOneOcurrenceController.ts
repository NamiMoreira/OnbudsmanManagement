import { Request,Response } from "express";
import { GetOneOcurrenceService } from "../../services/occurrence/GetOneOcurrenceService";



class GetOneOcurrenceController {
    async handle (req: Request, res: Response){
        const protocolo = req.params.id
        const getOcurrenceService = new GetOneOcurrenceService();
        const ocurrence = await getOcurrenceService.execute(protocolo);
        
        return res.json(ocurrence).status(200)
    }
}

export{ GetOneOcurrenceController}