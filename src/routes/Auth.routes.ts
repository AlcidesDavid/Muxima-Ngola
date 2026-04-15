import { AuthController } from "#Controllers";
import { RegisterUserService } from "#Services";
import { AccountRepository, UserRepository } from "#repository";
import { Router } from "express";

const AuthRouter = Router()

const accountRepository = new AccountRepository;
const userRepository =  new UserRepository;

const registerUser = new RegisterUserService(accountRepository, userRepository)
const authController = new AuthController(registerUser)
AuthRouter.post('/register/user' , authController.registerUser )

export {AuthRouter}