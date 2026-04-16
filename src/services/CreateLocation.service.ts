import { prismaClient } from "#/config/prisma.js";
import type { LocationRepository, NewLocation } from "#repository";

export class CreateLocationService{
    constructor (private locationRepository:LocationRepository){}
    async exec({province, municipality, neighboor, reference}:NewLocation){
        return await prismaClient.$transaction(async (tx)=>{
            return await this.locationRepository.create({province, municipality, reference, neighboor}, tx)
        })
    }
}