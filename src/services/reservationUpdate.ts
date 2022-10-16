import updateDao from "../models/reservationUpdate"
import { UpdateReservation } from "../configs/types"


const updateReservation = async (userId: any, updateData: UpdateReservation) => {
  // 예약 테이블에 존재하는 값인지 확인하는 과정 필요.

  const [reservationNumber] = await updateDao.findReservationNumber(userId)
  

  const [clinicType] = await updateDao.findClinicTypeIdByTypeName(updateData.clinic_type)

  let updateQuery: string;
  // Object.keys(updateData)

  updateQuery = `patient_name = '${updateData.patient_name}',
                  clinic_type_id = '${clinicType.id}',
                  date = '${updateData.date}',
                  time = '${updateData.time}'`

  await updateDao.updateReservation(reservationNumber.reservation_number, updateQuery)

}

export default { updateReservation }