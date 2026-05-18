import { Response, Request } from "express";
import { GetAllOcurrenceService } from "../../services/occurrence/GetAllOcurrenceService";

class GetAllOcurrenceController{
    async handle(req: Request, res: Response){

        const {protocol} = req.params
        console.log(protocol);
        

        const getOcurrence = new GetAllOcurrenceService();
        const ocurrences =  await getOcurrence.execute(protocol);
        
        
        return res.json(ocurrences)
        
    }
}

export {GetAllOcurrenceController}