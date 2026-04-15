import { AuthRouter } from '#Routes'
import express, {type Response, type Request, type NextFunction} from 'express'

const app = express()


app.use((req:Request, res:Response, next:NextFunction)=>{
    res.on('finish', ()=>{
        console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode}`)
    })
    next()
})

app.use('/auth', AuthRouter)

app.get('/helth', (_req:Request, res:Response)=>{
    return res.send("Server is Running")
})

export default app