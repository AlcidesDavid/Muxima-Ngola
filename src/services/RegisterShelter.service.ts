import { createHashedPassword } from "#Utils";
import { BadRequestError } from "#Errors";
import type { AccountRepository, ShelterRepository, NewShelter } from "#repository";

export class RegisterShelter {
    constructor(private accountRepository:AccountRepository,private shelterRepository:ShelterRepository){}    
    
        async exec (email:string, password:string, role:'Shelter' | 'User' = 'User', profile:NewShelter){
            const account = await this.accountRepository.findByEmail(email)
    
            if(account){
                throw new BadRequestError("Email Já cadastrado")
            }
    
            const hashedpassword = await createHashedPassword(password)
    
            const newAccount = await this.accountRepository.create(email, hashedpassword, role)
           
            const newShelter = await this.shelterRepository.create({...profile, account_id:newAccount.id})

            return newShelter

        }
} 