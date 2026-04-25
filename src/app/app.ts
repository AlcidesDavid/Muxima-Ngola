import { BadRequestError, ForbidenError, NotFoundError } from '#/config/errors.js'
import {  Routers } from '#Routes'
import express, {type Response, type Request, type NextFunction} from 'express'
import cors from "cors"
import type { ValidationError } from 'express-validator'
import cookieParser from 'cookie-parser'
const app = express()

//Config
    app.use(cors({
        credentials:true
    }))
    app.use(cookieParser())
    app.use(express.json())
// Handlers
app.use((req:Request, res:Response, next:NextFunction)=>{
    res.on('finish', ()=>{
        console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode}`)
    })
    next()
})

app.use((err:any, _req:Request, res:Response, next:NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ 
      error: "JSON Inválido", 
      message: "O corpo da requisição não é um JSON bem formatado." 
    });
  }
  next();
});

app.use(Routers)

app.get('/helth', (_req:Request, res:Response)=>{
    return res.send("Server is Running")
})


app.use((req: Request, _res: Response, next: NextFunction) => {
    // Cria o erro e passa-o para o Error Handler
    const error = new NotFoundError(`A rota ${req.originalUrl} com o método ${req.method} não existe no servidor.`);
    next(error); 
});
app.use((error:any, _req:Request, res:Response, _next: NextFunction)=>{
    let statusCode = 500
    let message = "Erro interno do Servidor"
    let errors = null
    if(error instanceof BadRequestError){
        statusCode = 400
        message = error.message
        if(error.errors){
            errors = error.errors.map((error:ValidationError)=>error.msg)
        }
    }

    if(error instanceof NotFoundError){
        statusCode = 404
        message = error.message    
    }

    if(error instanceof ForbidenError){
        statusCode = 401
        message = error.message
    }



    console.error(error.message)

    return res.status(statusCode).json({message, errors})

})

export default app