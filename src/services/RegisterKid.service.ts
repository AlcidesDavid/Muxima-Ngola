import { prismaClient } from "#/config/prisma.js";
import type { KidsRepository, LocationRepository, NewKid, NewLocation } from "#repository";

type KidProps = Omit<NewKid, 'last_location'>
export class RegisterKid{
    constructor(private kidsRepository:KidsRepository, private locationRepository:LocationRepository){}
    async exec(kid:KidProps, location:NewLocation){
        return await prismaClient.$transaction(async (tx)=>{
            const newLocation = await this.locationRepository.create(location, tx)
            const newKid = await this.kidsRepository.create({...kid, location:newLocation.id})
            return newKid
        })
    }
}