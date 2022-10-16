import express from "express"
import listController from "../controllers/reservationList"
import reserveController from "../controllers/reserve"
import updateController from "../controllers/reservatioinUpdate"

const router = express.Router()

router.get('/reservation-list', listController.getSearchAndList)
router.post('/reserve', reserveController.createReservation)
router.post('/update', updateController.updateReservation)

export default router
