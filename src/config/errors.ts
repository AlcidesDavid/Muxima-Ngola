export class NotFoundError extends Error {
    constructor(public message:string){
        super(message)
    }
}
export class BadRequestError extends Error {
    constructor(public message:string,public errors:any = []){
        super(message)
    }
}