import { Request,Response,NextFunction } from "express";
import prismaClient from "../prisma";

export async function existProtocol (req: Request,res : Response , next : NextFunction){

    var protocol = req.body.protocol
    protocol = String (protocol);
    const ocurrence = await prismaClient.occurrence.findUnique({
        where: {
            protocolo : protocol
        }
    })
    
    
    if (ocurrence != null) {
        next();
    }else{
        return res.status(400).json({status: "Protocolo não localizado"})
    }

    


}