import { RegisterKid } from "#Services";
import { KidsController } from "#Controllers";
import { Router } from "express";
import { KidsRepository, LocationRepository } from "#repository";

const kidRouter = Router()


const locationRepository = new LocationRepository
const kidRepository = new KidsRepository

const registerKid = new RegisterKid(kidRepository, locationRepository)

const kidsController = new KidsController(registerKid)

kidRouter.post('/register', ...kidsController.register)

export {kidRouter}