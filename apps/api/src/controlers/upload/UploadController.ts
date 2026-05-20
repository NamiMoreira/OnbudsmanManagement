import { Request, Response } from "express";

class UploadController {
    async handle(req: Request, res: Response) {


        const files = req.files as Express.Multer.File[];
        
        if (files.length === 0) {
            return res.status(400).json({ 
                status: "error", 
                message: "Array de arquivos vazio." 
            });
        }

        res.status(200).json({
            status: "success",
            message: "Arquivos enviados com sucesso.",
            count: files.length,
            arquivos: files.map(f => ({
                filename: f.filename,
                originalname: f.originalname,
                size: f.size
            }))
        });
    }
}

export { UploadController };