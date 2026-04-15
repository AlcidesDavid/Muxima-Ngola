import { prisma } from "#/prisma"

export type NewShelter = {
    name: string
    account_id: string 
    id_location: string 
    storage: number
    license: string

}

export class ShelterRepository{
    countShelter = ()=>{
        
    }

    create = async ({id_location, account_id, name, storage, license}:NewShelter)=>{
        return await prisma.shelter.create({data:{
            id_location,
            account_id,
            name,
            storage,
            license
        }})
    }
    
}