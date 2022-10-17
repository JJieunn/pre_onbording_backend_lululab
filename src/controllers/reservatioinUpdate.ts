import { Request, Response } from "express"
import { UpdateReservation } from "../configs/types"
import updateService from "../services/reservationUpdate"

const updateReservation = async (req: Request, res: Response) => {
  const userId = req.headers.id // 토큰으로 구현?
  const reservationNumber: string = req.params.reservationNumber
  const updateData: UpdateReservation = req.body

  try{const [reservationCheck] = await updateService.isReservationCheck(reservationNumber)
  if(!reservationCheck.id) res.status(404).json({ error: "RESERVATION_NOT_EXIST" })

  if(reservationCheck.status === '예약완료') await updateService.updateReservation(userId, reservationNumber, updateData)
  else res.status(400).json({ error: "ALREADY_OVER" })

  res.status(200).json({ message: "UPDATE_SUCCESS" })
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
}

export default { updateReservation }