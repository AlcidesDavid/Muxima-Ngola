import bcrypt from "bcrypt"

const SALT_NUMBER = process.env.SALT_NUMBER || 8
export const createHashedPassword = async (password:string)=>{
    return await bcrypt.hash(password,SALT_NUMBER)
}

export const compareHash = async (password:string, hash:string)=>{
    return await bcrypt.compare(password, hash)
}