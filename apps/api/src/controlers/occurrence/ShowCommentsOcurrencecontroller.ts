import { Request,Response } from "express";
import { AnswerCommentsOcurrenceService } from "../../services/occurrence/AnswerCommentsOcurrenceService";
import { ShowCommentsOcurrenceService } from "../../services/occurrence/ShowCommentsOcurrenceService";


class ShowCommentsOcurrenceController{
    async handle ( req: Request, res: Response){
        const protocolo = req.params.id;
        console.log(protocolo);
        
        const showCommentsOcurrenceService = new ShowCommentsOcurrenceService();
        const result = await  showCommentsOcurrenceService.execute(protocolo);

        if (!result.err) {
            return res.status(result.statusCode).json(result.content)      
        }else{
            return res.status(result.statusCode).json(result.text)
        }
    }
}
export {ShowCommentsOcurrenceController}