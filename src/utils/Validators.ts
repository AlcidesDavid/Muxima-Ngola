import { BadRequestError } from "#/config/errors.js";
import type { NextFunction, Request, Response } from "express";
import { body, matchedData, validationResult } from "express-validator";


export const validateRequest = (req:Request, _res:Response, next:NextFunction)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return next(new BadRequestError("Erro de validacao", errors.array()))
    }

    req.body = matchedData(req, {includeOptionals:true})
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
    .notEmpty().withMessage('Primeiro nome é obrigatório campo: {first_name}')
    .trim(),

  body('last_name')
    .notEmpty().withMessage('Sobrenome é obrigatório campo: {last_name}')
    .trim(),

  body('birthday')
    .notEmpty().withMessage('Data de nascimento é obrigatória campo {birthday}')
    .isISO8601().withMessage('Formato de data inválido (AAAA-MM-DD)'),

  validateRequest
];

export const locationValidator = [ 
  body('province').notEmpty().withMessage("Provincia é obrigatorio preencha o campo {province}").trim(),
  body('municipality').notEmpty().withMessage("Municipio e um campo obrigatorio preencha o campo {municipality}").trim(),
  body('neighboor').notEmpty().withMessage("Bairro e um campo obrigatorio preencha o campo {neighboor}").trim(),
  body('reference').notEmpty().withMessage("insira ao menos uma referencia preencha o campo {reference}").trim(),
  validateRequest
]

export const shelterValidator = [
  ...accountValidator.slice(0, -1),
  ...locationValidator.slice(0, -1),
  body('name').notEmpty().withMessage('Nome é obrigatorio preencha o campo {name}').trim(),
  body('license').notEmpty().withMessage('Alvara de Funcionamento é obrigatorio preencha o campo {licensa}').trim(),
  body('storage').notEmpty().withMessage("Capacidade é obrigatorio preencha o campo {storage}").isInt({min:10}).withMessage('Deve ter capacidade para abirgar no minimo 10 crianças'),
  validateRequest
]

export const kidValidator = [
  ...locationValidator.slice(0,-1),
   body('first_name')
    .notEmpty().withMessage('Primeiro nome é obrigatório campo: {first_name}')
    .trim(),

  body('last_name')
    .optional()
    .trim(),

  body('nickname')
    .optional()
    .trim(),

  body('birth_day')
    .optional()
    .isISO8601().withMessage('Formato de data inválido campo: {birth_day}'),

  body('photo')
    .optional()
    .isURL().withMessage('URL da foto inválida campo: {photo}'),

  body('note')
    .optional()
    .trim(),

  body('gender')
    .notEmpty().withMessage('Gênero é obrigatório campo: {gender}')
    .isIn(['Male', 'Female']).withMessage('Gênero deve ser Male ou Female campo: {gender}'),

  body('is_alone')
    .notEmpty().withMessage('O campo is_alone é obrigatório campo: {is_alone}')
    .isBoolean().withMessage('is_alone deve ser um booleano campo: {is_alone}'),

  body('aproximate_age')
    .notEmpty().withMessage('Idade aproximada é obrigatória campo: {aproximate_age}')
    .isInt({ min: 0 }).withMessage('Idade deve ser um número válido campo: {aproximate_age}'),

  validateRequest
];