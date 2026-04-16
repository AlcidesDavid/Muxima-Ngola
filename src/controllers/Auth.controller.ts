import { shelterValidator, userValidator, validateRequest } from "#Validators"
import type { RegisterShelter, RegisterUserService } from "#Services"
import type { Request, Response } from "express"
export class AuthController{
    constructor(private registerUserService:RegisterUserService, private registerShelterService:RegisterShelter){}
        registerUser = [userValidator, async  (req:Request, res:Response)=>{
            const {first_name, last_name, email, password, birthday} = req.body
            const newProfile = await this.registerUserService.exec(email, password,'User', {first_name, last_name, birthday})
            return res.status(201).json(newProfile)
        }]

        registerShelter = [shelterValidator, async (req:Request, res:Response)=>{
            const {email, password,name, storage, license, province, municipality, neighboor, reference} = req.body
            const newProfile = await this.registerShelterService.exec(email, password, 'Shelter', {name, license, storage}, {province, municipality, neighboor, reference})
            return res.status(201).json({profile:newProfile})
        }]
}