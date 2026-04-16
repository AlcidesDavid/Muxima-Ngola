import { createHashedPassword } from "#Utils";
import { BadRequestError } from "#Errors";
import type { AccountRepository, ShelterRepository, UserRepository,NewUser, NewShelter } from "#repository";
import { prismaClient } from "#/config/prisma.js";

export class RegisterUserService {
    constructor(private accountRepository:AccountRepository,private userRepository:UserRepository){}    
    
        async exec (email:string, password:string, role:'Shelter' | 'User' = 'User', profile:Omit<NewUser, "id_account">){
            return await prismaClient.$transaction(async (tx)=>{
                const account = await this.accountRepository.findByEmail(email, tx)
    
            if(account){
                throw new BadRequestError("Email Já cadastrado")
            }
    
            const hashedpassword = await createHashedPassword(password)
    
            const newAccount = await this.accountRepository.create(email, hashedpassword, role, tx)
           
            const newUser = await this.userRepository.create({...profile, id_account:newAccount.id}, tx)

            return newUser
            })

        }
} 