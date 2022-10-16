import { Request, Response } from "express"
import { UpdateReservation } from "../configs/types"
import updateService from "../services/reservationUpdate"

// 예약 번호로 환자이름, 시간, 종류 변경가능
const updateReservation = async (req: Request, res: Response) => {
  const userId = req.headers.id // 토큰으로 구현?
  const updateData: UpdateReservation = req.body

  await updateService.updateReservation(userId, updateData)
  res.status(200).json({ message: "UPDATE_SUCCESS" })
}

export default { updateReservation }