 import { prismaClient } from "#/config/prisma.js";
import type { TransactionClient } from "#/generated/prisma/internal/prismaNamespace.js";
import { connect } from "node:http2";

export type NewKid = {
  first_name: string
  last_name?: string
  nickname?: string
  birth_day?: Date
  photo?: string
  note?: string
  location: string
  gender: "Male"|"Female"
  is_alone: boolean
  aproximate_age: number
  account:string
}
export class KidsRepository{
    async findById(id:string, tx?:TransactionClient){
        const prisma = tx || prismaClient
        return prisma.kid.findFirst({where:{id}})
    }

    async create(kid:NewKid, tx?:TransactionClient){
        const prisma = tx || prismaClient
        return prisma.kid.create({data:{
            ...kid,
            location:{
                connect:{
                    id:kid.location
                }
            },
            account:{
                connect:{
                    id:kid.account
                }
            }
        }})
    }
}