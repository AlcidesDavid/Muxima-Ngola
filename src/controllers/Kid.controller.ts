import { NotFoundError } from "#/config/errors.js";
import { AuthMiddleware } from "#/middlewares/Auth.middleware.js";
import type { GetKids } from "#/services/GetKids.service.js";
import type { AuthRequest } from "#/types/controller.js";
import { kidStatusValidator, kidValidator, rescueValidator } from "#/utils/Validators.js";
import type { RegisterKid, RescueKid } from "#Services";
import type { NextFunction, Request, Response } from "express";


export class KidsController{
    constructor(private registerKid:RegisterKid,private rescueKid:RescueKid, private getKidsService:GetKids){}
    register = [AuthMiddleware,kidValidator,(req:AuthRequest, _res:Response, next:NextFunction)=>{
        const requestBody = req.body
        let location:any = {}
        let kid:any = {}
        const kidAtrributes = [
            'first_name','last_name'
            ,'nickname','birth_day',
            'photo','note','gender'
            ,'is_alone','aproximate_age'
        ]

        const locationAttributes = [ 'province','municipality', 'neighboor', 'reference']
        for(const key in requestBody){
            if(kidAtrributes.includes(key)){
   
                kid[key] = requestBody[key]
            }

            if(locationAttributes.includes(key)){
                location[key] = requestBody[key]
            }
        }
        kid['account'] = req?.id_account
        kid['birth_day'] =  new Date(kid?.birth_day)
        req.body = {kid, location}
        next()
        

    }, async (req:Request, res:Response)=>{
        const {kid, location} = req.body
        
        const newKid = await this.registerKid.exec(kid, location)

        
        return res.status(201).json({message:"Criança cadastrada", kid:newKid})
    }]

    changeStatus = [AuthMiddleware, kidStatusValidator, ]

    rescue = [AuthMiddleware, rescueValidator,async (req:Request, res:Response)=>{
        const id = req.params.id
        const kid = await this.rescueKid.exec(id as string)
        return res.status(201).json({message:"Criança resgatada"})
    }]

    getKids = [AuthMiddleware, async (req:Request, res:Response)=>{
        const idKid = req.query.id as string

        const kids = await this.getKidsService.exec(idKid && idKid)
        if(!kids) throw new NotFoundError("Nenhuma criança cadastrada")
        return res.status(200).json({kids})
    }]
    
}