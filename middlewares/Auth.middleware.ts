import { ForbidenError, InvalidTokenError } from "#/config/errors.js";
import { decodeToken } from "#/utils/token.js";
import type { NextFunction, Request, Response } from "express";

const AuthMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.accessToken

    if(!token){
        throw new InvalidTokenError()
    }

    const decodedToken = decodeToken(token)

    

}