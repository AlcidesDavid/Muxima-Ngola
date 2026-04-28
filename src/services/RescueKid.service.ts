import { BadRequestError, NotFoundError } from "#/config/errors.js";
import type { KidsRepository } from "#repository";

export class RescueKid{
    constructor(private kidRepository:KidsRepository){}

    async exec(id:string){
        const kid =  await this.kidRepository.findById(id)

        if(!kid){
            throw new NotFoundError('Criança não encontrada')
        }

        if(kid.status === "SHELTERED"){
            throw new BadRequestError("Criança já foi resgatda")
        }

        if(kid.status === "REUNITED"){
            throw new BadRequestError("Criança já no Seio Familiar")
        }

        return await this.kidRepository.rescue(id)

    }
}