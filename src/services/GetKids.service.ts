import type { KidsRepository } from "#/repository/Kids.repository.js";

export class GetKids{
    constructor(private kidsRepository:KidsRepository){}

    async exec(id?:string){
        
        if(id){
            return await this.kidsRepository.findById(id)
        }

        return await this.kidsRepository.findAll()

    }
}