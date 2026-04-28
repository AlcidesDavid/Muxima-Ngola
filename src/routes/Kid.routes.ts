import { RegisterKid, RescueKid } from "#Services";
import { KidsController } from "#Controllers";
import { Router } from "express";
import { KidsRepository, LocationRepository } from "#repository";
import { GetKids } from "#/services/GetKids.service.js";

const kidRouter = Router()


const locationRepository = new LocationRepository
const kidRepository = new KidsRepository

const registerKid = new RegisterKid(kidRepository, locationRepository)
const getKid = new GetKids(kidRepository)
const rescueKid = new RescueKid(kidRepository)

const kidsController = new KidsController(registerKid,rescueKid, getKid)

kidRouter.post('/register', ...kidsController.register)
kidRouter.get('/', ...kidsController.getKids)

export {kidRouter}