import myDataSource from "../configs/common"
import { ReservationInfo } from "../configs/types"


const userCheck = async (userId: string) => {
  return await myDataSource.query(`
    SELECT is_active FROM users WHERE id = ?
  `, [userId])
}

const timeCheck = async (userId: string, date: Date, time: string) => {
  return await myDataSource.query(`
    SELECT EXISTS (SELECT id FROM reservations WHERE user_id = ? AND date = ? AND time = ?) AS exist
  `, [userId, date, time])
}

const patientCheck = async (hospitalId: number, date: Date, time: string) => {
  return await myDataSource.query(`
    SELECT COUNT(id) AS count FROM reservations WHERE hospital_id = ? AND date = ? AND time = ?
  `, [hospitalId, date, time])
}

const createReservation = async ( userId: any, reservationNumber: string, reserveData: ReservationInfo ) => {
  await myDataSource.query(`
    INSERT INTO reservations (user_id, reservation_number, patient_name, birth, date, time, hospital_id, department_id, clinic_type_id)
    VALUES (?,?,?,?,?,?,?,?,?)
    `, [userId, reservationNumber, reserveData.patient_name, reserveData.birth, reserveData.date,
        reserveData.time, reserveData.hospital_id, reserveData.department_id, reserveData.clinic_type_id])
}

export default { userCheck, timeCheck, patientCheck, createReservation }