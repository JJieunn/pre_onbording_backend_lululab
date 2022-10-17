import { ReservationInfo } from "../configs/types"
import reserveDao from "../models/reserve"
import hospitalDao from "../models/hospital"
import listDao from "../models/reservationList"

const userCheck = async (userId: any) => {
  return await reserveDao.userCheck(userId)
}


const createReservation = async ( userId: any, reserveData: ReservationInfo ) => {

  // 같은 날, 시간에 다른 병원 예약 체크
  const [timeCheck] = await reserveDao.timeCheck(userId, reserveData.date, reserveData.time)
  if(timeCheck.exist === 1) { 
    const error: any = new Error("ALREADY_RESERVE")
    error.statusCode = 400
    throw error;
  }


  // 시간 에러 체크
  const [detailInfo] = await hospitalDao.detailInfoByHospital(reserveData.hospital_id)
  if(reserveData.time < detailInfo.open) {
    const error: any = new Error("NOT_OPEN")
    error.statusCode = 400
    throw error;
  }

  if(reserveData.time > detailInfo.close) {
    const error: any = new Error("CLOSED")
    error.statusCode = 400
    throw error;
  }

  const lunchTime = detailInfo.lunch_time.split(" ~ ")
  if(lunchTime[0] <= reserveData.time) {
    if(reserveData.time <= lunchTime[1]) {
      const error: any = new Error("LUNCH_TIME")
      error.statusCode = 400
      throw error;
    }
  }

  // 토요일 일요일 공휴일 체크
  // ...

  const [patientNumber] = await reserveDao.patientCheck(reserveData.hospital_id, reserveData.date, reserveData.time)
  if(detailInfo.diagnosis_interval == "30m") {
    if(patientNumber == 2) {
      const error: any = new Error("PATIENT_NUMBER_IS_FULL")
      error.statusCode = 400
      throw error;
    }
  } else if(detailInfo.diagnosis_interval == "1h") {
    if(patientNumber == 1) { 
      const error: any = new Error("PATIENT_NUMBER_IS_FULL")
      error.statusCode = 400
      throw error;
    }
  }
  
  const reservationNumber = new Date().toLocaleDateString().split(".").join(" ").replace(/ /g,"") + Math.floor(Math.random() * 10000)
  await reserveDao.createReservation(userId, reservationNumber, reserveData)
  return await listDao.getList(reservationNumber)
}

export default { userCheck, createReservation }