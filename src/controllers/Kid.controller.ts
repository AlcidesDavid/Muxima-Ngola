import type { AuthRequest } from "#/types/controller.js";
import { kidValidator } from "#/utils/Validators.js";
import type { RegisterKid } from "#Services";
import type { NextFunction, Request, Response } from "express";


export class KidsController{
    constructor(private registerKid:RegisterKid){}
    register = [kidValidator,(req:AuthRequest, _res:Response, next:NextFunction)=>{
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
        req.body = {kid, location}
        next()
        

    }, async (req:Request, res:Response)=>{
        const {kid, location} = req.body
        
        const newKid = await this.registerKid.exec(kid, location)

        return res.status(201).json({message:"Criança cadastrada", kid:newKid})
    }]
}