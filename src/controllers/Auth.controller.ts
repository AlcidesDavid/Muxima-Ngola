import { userValidator, validateRequest } from "#Validators"
import type { RegisterUserService } from "#Services"
import type { Request, Response } from "express"
export class AuthController{
    constructor(private registerUserService:RegisterUserService){}
    registerUser = [userValidator, async  (req:Request, res:Response)=>{
        const {first_name, last_name, email, password, birthday} = req.body
        const newProfile = await this.registerUserService.exec(email, password,'User', {first_name, last_name, birthday})
        return res.status(201).json(newProfile)
    }]
}