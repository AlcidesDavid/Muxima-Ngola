import { ForbidenError, InvalidTokenError } from "#/config/errors.js";
import type { AuthRequest } from "#/types/controller.js";
import { decodeToken } from "#/utils/token.js";
import type { NextFunction, Request, Response } from "express";

export const AuthMiddleware = async (req:AuthRequest, _res:Response, next:NextFunction)=>{
    const token = req.cookies?.['accessToken']
  
    if(!token){
        throw new InvalidTokenError()
    }

    const decodedToken = decodeToken(token)

    if(decodedToken?.type !== 'access'){
        throw new InvalidTokenError
    }

    req.id_account = decodedToken.id_account
    req.role = decodedToken.role
    req.type = decodedToken.type

    next()   

}


export const RefreshMiddleware = async (req:AuthRequest, _res:Response, next:NextFunction)=>{
        const token = req.cookies?.['refreshToken']
        if(!token){
            throw new InvalidTokenError()
        }
        
        const decodedToken = decodeToken(token)
        

        if(decodedToken?.type !== 'refresh'){
            throw new InvalidTokenError
        }

        req.id_account = decodedToken.id_account
        req.role = decodedToken.role
        req.type = decodedToken.type
        
        next()   

}
