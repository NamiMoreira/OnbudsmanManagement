import { Response,Request } from "express";
import { NotificationQuestionOcurrenceService } from "../../services/occurrence/NotificationQuestionOcurrenceService";

class NotificationQuestionOcurrenceController{
    async handle(req: Request,res: Response){
        const protocol = req.body;
            
            const notificationQuestionOcurrenceService = new NotificationQuestionOcurrenceService();
            const result = await notificationQuestionOcurrenceService.execute(protocol)
    
            if (!result.err) {
                return res.status(result.status).json({msg: result.text, total: result.total})
            }
            console.log(result);
            
            return res.status(result.status).json({msg: 'Falha na execução', err: result.err})
            

    }
}

export {NotificationQuestionOcurrenceController}