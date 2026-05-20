import { Response,Request } from "express";
import { GetOcurrenceStatusService } from "../../services/occurrence/GetOcurrenceStatusService";
type Status = {
    id: number,
    count: number
}

class GetOcurrenceStatusController{
    async handle(req: Request,res: Response){
        
        const getOcurrenceStatusService = new GetOcurrenceStatusService() 
        let data:Status[] = []
        for (let i = 0; i < 5; i++) {
            const count = await getOcurrenceStatusService.execute(i)
            data.push({id: i ,
                    count: count
                    })
              
        }
        res.status(200).send(data)        
    }
}

export {GetOcurrenceStatusController}