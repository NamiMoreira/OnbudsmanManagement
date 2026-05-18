import { Request,Response } from "express";
import { SocketService } from "../../services/socket/SocketService";


class SocketController{
   async handle (req: Request, res: Response){
    
        const socketService = new SocketService();
        socketService.execute();
    }
}

export {SocketController}