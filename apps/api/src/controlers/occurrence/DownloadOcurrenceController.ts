import { Request, Response } from "express";
import { DownloadOcurrenceService } from "../../services/occurrence/DownloadOcurrenceService";
const path = require("path");


class DownloadOcurrenceController {
  async handle(req: Request, res: Response) {
    const protocolo = req.params.id;
    
    const downloadOcurrence = new DownloadOcurrenceService();
    const filePath = await downloadOcurrence.execute(protocolo);
    
    if (!filePath.err) {
      return res.status(200).download(filePath.content as string, (err) => {
        if (err) {
          res.status(400).json({err: "Ocorreu um erro na execução !"});
        }
      });
    } else {
      res.status(400).json(filePath.err);}
  }

}

 
export { DownloadOcurrenceController };
