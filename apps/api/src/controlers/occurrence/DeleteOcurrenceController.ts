import { Request, Response } from "express";
import { DeleteOcurrenceService } from "../../services/occurrence/DeleteOcurrenceService";

class DeleteOcurrenceController {
  async handle(req: Request, res: Response) {
    let id = req.params;

    const deleteOcurrence = new DeleteOcurrenceService();
    try {
      const ocurrenceDeleted = await deleteOcurrence.execute(id);
      return res.json({ message: "registro excluido com sucesso" });
    } catch (err) {
      return res.json({ logError: "registro não localizado" });
    }
  }
}

export { DeleteOcurrenceController };
