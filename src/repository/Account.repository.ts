import { prisma } from "#/prisma"
export class AccountRepository {
    findById = async (id:string)=>{
        return await prisma.account.findFirst({where:{id}})
    }

    findByEmail = async (email:string)=>{
        return await prisma.account.findFirst({where:{email}})
    }

    create = async (email:string, password:string, role:'Admin'|'Shelter' | 'User' = 'User')=>{
        return await prisma.account.create({ data:{
            email,
            password,
            role
        }})
    }

}