import { Response,Request } from "express";
import {ChangeSectorOcurrenceService} from "../../services/occurrence/ChangeSectorOcurrenceService"
import { SendEmailService } from "../../services/email/SendEmailService";
import { AuthUserService } from "../../services/user/AuthUserService";
import { readFileSync } from "fs";
import { GetSectorService } from "../../services/sector/GetSectorService";
const path = require("path");

class ChangeSectorOcurrenceController{
    async handle (req: Request,res: Response,){
        const data = req.body        
        const changeSectorOcurrenceService = new ChangeSectorOcurrenceService();
        const response = await changeSectorOcurrenceService.execute(data);
        
        if (response.status === "error") {
         res.json(response.text).status(400);   
        }else{
        res.json(response.text).status(200);
        }

        const getSectorService = new GetSectorService();
        const dataSector = await getSectorService.execute(data.sector_destiny)
        const dir = path.resolve(__dirname, "../../templates/questionamento_ouvidoria.html");
        var template = readFileSync(dir,'utf-8')
        

        template = template.replace("$observacao",data.observacao )
        template = template.replace("$protocolo",data.protocol )
        var payload = {
            from: "noreply@unimedpinda.com.br",
            to: dataSector.email, 
            subject:"Demanda Atribuída - Ocorrencia Ouvidoria",
            html: template
        }
       

         const sendEmailService = new SendEmailService();
         const sendEmail = sendEmailService.execute(payload)
    };
};

export{ChangeSectorOcurrenceController}

