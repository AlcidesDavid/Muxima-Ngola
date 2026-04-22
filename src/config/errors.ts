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

export class ForbidenError extends Error {
    constructor(public message:string){
        super(message)
    }
}

export class InvalidTokenError extends ForbidenError {
    constructor(){
        super('Token invalido ou expirado')
    }
}