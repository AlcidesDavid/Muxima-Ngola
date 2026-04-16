import type { TransactionClient } from "#/generated/prisma/internal/prismaNamespace.js"
import { prismaClient } from "#/prisma"
export class AccountRepository {
    findById = async (id:string, tx?:TransactionClient)=>{
        const prisma = tx || prismaClient
        return await prisma.account.findFirst({where:{id}})
    }

    findByEmail = async (email:string, tx?:TransactionClient)=>{
        const prisma = tx || prismaClient
        return await prisma.account.findFirst({where:{email}})
    }

    create = async (email:string, password:string, role:'Admin'|'Shelter' | 'User' = 'User' , tx?:TransactionClient)=>{
        const prisma = tx || prismaClient
        return await prisma.account.create({ data:{
            email,
            password,
            role
        }})
    }

}