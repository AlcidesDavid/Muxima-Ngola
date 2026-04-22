import type { Request } from "express"
export type AuthRequest = Request & {
    id_account?:string
    type?:'access' | "refresh"
    role?:'Admin'|'Shelter' | 'User'
}