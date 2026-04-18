import jwt from "jsonwebtoken"
type Payload = {
    id_account:string,
    role:'Admin'|'Shelter' | 'User'
}

const ACCESS_SECRET = process.env.ACCESS_SECRET || ""
const REFRESH_SECRET = process.env.REFRESH_SECRET || ""

const accessEncoded = new TextEncoder().encode(ACCESS_SECRET)
export const generateAccessToken = (payload:Payload)=>{

    return jwt.sign({...payload, type:"access"},ACCESS_SECRET, {
        expiresIn:'15MIN',
        algorithm:"HS256"
    } )

}

export const generateRefreshToken = (payload:Payload)=>{

    return jwt.sign({...payload, type:"refresh"},REFRESH_SECRET, {
        expiresIn:'7DAYS',
        algorithm:"HS256",

    } )

}

export const generateCSRFToken = ()=>{

}