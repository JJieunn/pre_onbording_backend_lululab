import { ReservationInfo } from "../configs/types"
import reserveDao from "../models/reserve"
import hospitalDao from "../models/hospital"


const userCheck = async (userId: any) => {
  return await reserveDao.userCheck(userId)
}

// 같은 날, 시간에 다른 병원 예약했는지 체크
const timeCheck = async (userId: any, date: Date, time: string) => {
  return await reserveDao.timeCheck(userId, date, time)
}


const createReservation = async ( userId: any, reserveData: ReservationInfo ) => {

  // 시간 에러 체크
  const [detailInfo] = await hospitalDao.detailInfoByHospital(reserveData.hospital_id)
  if(reserveData.time < detailInfo.open) throw new Error("NOT_OPEN")
  if(reserveData.time > detailInfo.close) throw new Error("CLOSED")
  
  const lunchTime = detailInfo.lunch_time.split(" ~ ")
  if(lunchTime[0] < reserveData.time < lunchTime[1]) throw new Error("LUNCH_TIME")
  
  // 토요일 일요일 공휴일 체크
  // ?

  // time_interval에 따른 예약자 수 체크
  const [patientNumber] = await reserveDao.patientCheck(reserveData.hospital_id, reserveData.date, reserveData.time)
  if(detailInfo.time_interval == "30m") {
    if(patientNumber == 2) throw new Error("CAN_NOT_RESERVE")
  } else if(detailInfo.time_interval == "1h") {
    if(patientNumber == 1) throw new Error("CAN_NOT_RESERVE")
  }
  
  // 예약 번호 생성 - 문자 추가? >> 다시 수정
  let reservationNumber: string = "1";
  // reserveData.date.toDateString().split("-").join() + Math.floor(Math.random() * 10000)
  console.log(reservationNumber, typeof(reservationNumber))
  await reserveDao.createReservation(userId, reservationNumber, reserveData)

}

export default { userCheck, timeCheck, createReservation }