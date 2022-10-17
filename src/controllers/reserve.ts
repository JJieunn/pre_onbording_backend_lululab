import reserveService from "../services/reserve"
import { Request, Response } from "express"
import { ReservationInfo } from "../configs/types"


const createReservation = async (req: Request, res: Response) => {
  const userId = req.headers.id; // 토큰 검증?
  const reserveData: ReservationInfo = req.body; // 예약자, 예약 시간, 예약 날짜, 진료 종류, 환자 생일, 이름, 병원, 과 번호 

  try {
    const [userCheck] = await reserveService.userCheck(userId);
    if(!userCheck.is_active) {
      res.status(403).json({ error: "USER_BLOCKED" })
    }

    const reservationRes = await reserveService.createReservation( userId, reserveData );
    res.status(200).json({ message: "RESERVATION_CREATED", reservationRes })
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
}

export default { createReservation }