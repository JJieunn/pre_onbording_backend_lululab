import express from "express"
import reservationRouter from "./reservationRouter"
import hospitalRouter from "./hospitalRouter"

const router = express.Router()

router.use('/reservation', reservationRouter)
router.use('/hospital', hospitalRouter)

export default router