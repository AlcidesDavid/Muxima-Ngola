import { createHashedPassword } from "#Utils";
import { BadRequestError } from "#Errors";
import type { AccountRepository, ShelterRepository, UserRepository,NewUser, NewShelter } from "#repository";

export class RegisterUserService {
    constructor(private accountRepository:AccountRepository,private userRepository:UserRepository){}    
    
        async exec (email:string, password:string, role:'Shelter' | 'User' = 'User', profile:Omit<NewUser, "id_account">){
            const account = await this.accountRepository.findByEmail(email)
    
            if(account){
                throw new BadRequestError("Email Já cadastrado")
            }
    
            const hashedpassword = await createHashedPassword(password)
    
            const newAccount = await this.accountRepository.create(email, hashedpassword, role)
           
            const newUser = await this.userRepository.create({...profile, id_account:newAccount.id})

            return newUser

        }
} 