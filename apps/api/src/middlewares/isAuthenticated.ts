import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface payload {
  sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction  ){

    const authToken = req.headers.authorization
    
        
        
    if (authToken == undefined) {

        return res.status(401).end()
    }

    const [, token] = authToken.split(" ");
    try{
        const{sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as payload;
        
        req.user_id = sub

        return next();

    } catch (err) {
        return res.status(401).end()
    }



};
