import express from "express"
import reservationRouter from "./reservationRouter"

const router = express.Router()

router.use('/reservation', reservationRouter)

export default router