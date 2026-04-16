import { BadRequestError } from "#/config/errors.js";
import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";


export const validateRequest = (req:Request, _res:Response, next:NextFunction)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return next(new BadRequestError("Erro de validacao", errors.array()))
    }
    next()
}

export const accountValidator = [
  body('email')
    .notEmpty().withMessage('Email obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
    
  body('password')
    .notEmpty().withMessage('Senha obrigatória')
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  
  validateRequest
];

export const userValidator = [
  // Reaproveita as regras de email e password (sem o middleware intermediário)
  ...accountValidator.slice(0, -1), 

  body('first_name')
    .notEmpty().withMessage('Primeiro nome é obrigatório')
    .trim(),

  body('last_name')
    .notEmpty().withMessage('Sobrenome é obrigatório')
    .trim(),

  body('birthday')
    .notEmpty().withMessage('Data de nascimento é obrigatória')
    .isISO8601().withMessage('Formato de data inválido (AAAA-MM-DD)'),

  validateRequest
];