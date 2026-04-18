import { NotFoundError } from "#/config/errors.js";
import type { AccountRepository } from "#/repository/Account.repository.js";
import { compareHash } from "#/utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "#/utils/token.js";

export class LoginService {
    constructor(private accountRepository:AccountRepository){}
    exec = async (email:string, password:string)=>{
        const account = await this.accountRepository.findByEmail(email);

        if(!account){
            throw new NotFoundError("Email ou senha invalidos")
        }

        const isValidPassword = await compareHash(password, account.password)

        if(!isValidPassword){
            throw new NotFoundError("Email ou senha invalidos")
        }

        const accessToken = generateAccessToken({role:account.role, id_account:account.id})
        const refreshToken = generateRefreshToken({role:account.role, id_account:account.id})

        return {accessToken, refreshToken}
    }
}