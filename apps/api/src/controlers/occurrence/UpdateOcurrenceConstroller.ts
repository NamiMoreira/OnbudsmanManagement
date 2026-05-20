import { Response, Request } from "express";
import {UpdateOcurrenceService} from "../../services/occurrence/UpdateOcurrenceService"

class UpdateOcurrenceController{
    async handle( req: Request,res: Response){
        let {id} = req.params
        
        let data = req.body;
        try {
            const updateOcurrenceService = new UpdateOcurrenceService();
            const ocurrence = await updateOcurrenceService.execute(id,data );

            
            return res.json(ocurrence)
        } catch (error) {
            return res.json({"error": error}).status(500)
        }
        
    
    }
 
    
};

export {UpdateOcurrenceController};