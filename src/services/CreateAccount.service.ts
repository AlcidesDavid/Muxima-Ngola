import { createHashedPassword } from "#Utils";
import { BadRequestError } from "#Errors";
import type { AccountRepository } from "#repository";

export class CreateAccountService{
    constructor(private accountRepository:AccountRepository){}

    exec = async (email:string, password:string, role:'Admin'|'Shelter' | 'User' = 'User')=>{
        const account = await this.accountRepository.findByEmail(email)

        if(account){
            throw new BadRequestError("Email Já cadastrado")
        }

        const hashedpassword = await createHashedPassword(password)

        const newAccount = await this.accountRepository.create(email, hashedpassword, role)

        return newAccount
    } 
}