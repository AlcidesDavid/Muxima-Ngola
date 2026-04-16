import { prismaClient } from "#/config/prisma.js"
import type { TransactionClient } from "#/generated/prisma/internal/prismaNamespace.js"
export type NewLocation = {
  province: string
  municipality: string 
  neighboor?: string 
  reference?: string
}
export class LocationRepository {
    async create({province, municipality, neighboor, reference}:NewLocation, tx?:TransactionClient){
        const prisma = tx || prismaClient

        return await prisma.location.create({data:{
            province,
            municipality,
            neighboor,
            reference
        }})
    }
}