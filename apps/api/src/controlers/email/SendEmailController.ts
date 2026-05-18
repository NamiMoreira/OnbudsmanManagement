import { Request,Response } from "express";
import { SendEmailService } from "../../services/email/SendEmailService";

class SendEmailController {
    async handle(req: Request, res: Response){
        const email = new SendEmailService();
        const response = email.execute();
        if(response){
            res.status(200).send({status: "ok"})
        }else{
            res.status(400).send({error: "err"})
        }
    }
}

export { SendEmailController}