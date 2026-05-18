import { Request,Response } from "express";
import { GetListDocumentsOcurrenceService } from "../../services/occurrence/GetListDocumentsOcurrenceService";

class GetListDocumentsOcurrenceController{
    async handle (req: Request, res: Response){
            
        const protocolo = req.params.id

        const getListDocumentsOcurrenceService =  new GetListDocumentsOcurrenceService();
        const listDocument = await getListDocumentsOcurrenceService.execute(protocolo);
        // if (listDocument.status === "error") {
        //     return res.json({error: "Falha ao carregador os documentos anexos."}).status(404)
        // }
        return res.json(listDocument).status(200);
    }
}

export{GetListDocumentsOcurrenceController}