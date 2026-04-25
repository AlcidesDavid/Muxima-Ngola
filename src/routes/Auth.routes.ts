import { AuthController } from "#Controllers";
import { LoginService, RefreshToken, RegisterShelter, RegisterUserService } from "#Services";
import { AccountRepository, LocationRepository, ShelterRepository, UserRepository } from "#repository";
import { Router } from "express";

const AuthRouter = Router()

const accountRepository = new AccountRepository;
const userRepository =  new UserRepository;
const shelterRepository = new ShelterRepository
const locationRepository = new LocationRepository

const registerUser = new RegisterUserService(accountRepository, userRepository)
const registerShelterService = new RegisterShelter(accountRepository,shelterRepository, locationRepository)
const loginService = new LoginService(accountRepository)
const refreshService = new RefreshToken(accountRepository)

const authController = new AuthController(registerUser, registerShelterService, loginService, refreshService)

AuthRouter.post('/register/user' , ...authController.registerUser )
AuthRouter.post('/register/shelter', ...authController.registerShelter)
AuthRouter.post('/login', ...authController.login)
AuthRouter.post('/refresh-token', ...authController.refresh)

export {AuthRouter}