import { Response, Request } from "express";
import {UpdateOcurrenceService} from "../../services/occurrence/UpdateOcurrenceService"

class UpdateOcurrenceController{
    async handle( req: Request,res: Response){
        let {id} = req.params
        
        let data = req.body;

        const updateOcurrenceService = new UpdateOcurrenceService();
        const ocurrence = await updateOcurrenceService.execute(id,data );
        
        return res.json(ocurrence)
    
    }

    
};

export {UpdateOcurrenceController};