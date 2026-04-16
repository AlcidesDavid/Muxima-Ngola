import { createHashedPassword } from "#Utils";
import { BadRequestError } from "#Errors";
import type { AccountRepository, ShelterRepository, NewShelter, NewLocation, LocationRepository } from "#repository";
import { prismaClient } from "#/config/prisma.js";

export class RegisterShelter {
    constructor(private accountRepository:AccountRepository,private shelterRepository:ShelterRepository, private locationRepository:LocationRepository){}    
    
        async exec (email:string, password:string, role:'Shelter' | 'User' = 'User', profile:Omit<NewShelter, 'id_location' | "account_id">, location:NewLocation){
            return await prismaClient.$transaction(async tx=>{
                const account = await this.accountRepository.findByEmail(email,tx)
    
            if(account){
                throw new BadRequestError("Email Já cadastrado")
            }
    
            const hashedpassword = await createHashedPassword(password)
    
            const newAccount = await this.accountRepository.create(email, hashedpassword, role, tx)
            const newLocation = await this.locationRepository.create(location, tx)
            const newShelter = await this.shelterRepository.create({...profile, account_id:newAccount.id, id_location:newLocation.id}, tx)

            return newShelter
            })

        }
} 