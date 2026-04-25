import { InvalidTokenError } from "#/config/errors.js";
import type { AccountRepository } from "#/repository/Account.repository.js";
import { getTokens, type Payload } from "#/utils/token.js";
export class RefreshToken{
    constructor (private accountRepository:AccountRepository){}
    async exec(payload:Payload){
        const {id_account, role} = payload
        const account = await this.accountRepository.findById(id_account)

        if(account?.id != id_account || account.role != role){
            throw new InvalidTokenError
        }

        const {accessToken, refreshToken} = getTokens({id_account:account.id, role:account.role})

        return {accessToken, refreshToken}

    }
}