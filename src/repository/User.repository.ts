import {prismaClient} from "#/prisma"
import { Prisma } from "#/generated/prisma/client.js"
import type { TransactionClient } from "#/generated/prisma/internal/prismaNamespace.js"

export type NewUser= {
    first_name:string
     last_name:string
     id_account:string
     birthday:Date
    }

export class UserRepository {
    findByName = ()=>{
        
    }   

    create = async ({first_name, last_name, id_account, birthday}:NewUser, tx?:TransactionClient)=>{
        const prisma = tx || prismaClient

        return await prisma.user.create({data:{
            first_name,
            last_name,
            account_id:id_account,
            birthday:new Date(birthday)
        }})
    }
}