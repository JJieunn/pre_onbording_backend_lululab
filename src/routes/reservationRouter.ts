import express from "express"
import listController from "../controllers/reservationList"
import reserveController from "../controllers/reserve"

const router = express.Router()

router.get('/list', listController.getSearchAndList)
router.post('/reserve', reserveController.createReservation)

export default router
