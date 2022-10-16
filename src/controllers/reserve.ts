import reserveService from "../services/reserve"
import { Request, Response } from "express"
import { ReservationInfo } from "../configs/types"

// 병원 목록이 있고,
// 병원 선택시(병원 id 받아서), 병원 요일 / 시간정보 보내주기 >> hospital 파일에서
// user가 is_active = 1인지 확인하기(0이면 노쇼 유저)
// 예약 가능한 날짜(date, time) 선택하면 > 해당 날짜에 다른 병원 예약한 건 없는지 체크(user id, date, time 으로 reservations 테이블 체크)
// date, time, patient_name, 등 받아서 reservation 테이블에 insert


const createReservation = async (req: Request, res: Response) => {
  const userId = req.headers.id; // 토큰 검증?
  const reserveData: ReservationInfo = req.body; // 예약자, 예약 시간, 예약 날짜, 진료 종류, 환자 생일, 이름, 병원, 과, 


  try {
    const [userCheck] = await reserveService.userCheck(userId);
    if(!userCheck.is_active) {
      res.status(403).json({ error: "USER_BLOCKED" })
    }

    const [timeCheck] = await reserveService.timeCheck(userId, reserveData.date, reserveData.time)
    if(!timeCheck.exist) {
      res.status(400).json({ error: "ALREADY_RESERVE" })
    }

    await reserveService.createReservation( userId, reserveData );
    res.status(200).json({ message: "RESERVATION_CREATED" })
  } catch (error) {
    console.log(error);
  }
}

export default { createReservation }