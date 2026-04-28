import { BadRequestError, NotFoundError } from "#/config/errors.js";
import type { KidsRepository } from "#repository";

export class ChangeKidStatus{
    constructor(private kidRepository:KidsRepository){}

    async exec(id:string, status:"REPORTED" |  "REVIEWING" | "REUNITED" | "SHELTERED"){
        const kid =  await this.kidRepository.findById(id)

        if(!kid){
            throw new NotFoundError('Criança não encontrada')
        }

        if(kid.status === status){
            throw new BadRequestError("Estado ja é o mesmo")
        }

        if(kid.status === "REUNITED"){
            throw new BadRequestError("Criança já no Seio Familiar")
        }

        return await this.kidRepository.changeStatus(id, status)

    }
}