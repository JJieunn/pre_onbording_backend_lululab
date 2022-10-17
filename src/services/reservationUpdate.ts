import updateDao from "../models/reservationUpdate"
import { UpdateReservation } from "../configs/types"


const isReservationCheck = async (reservationNumber: string) => {
  return await updateDao.reservationNumberCheck(reservationNumber)
}

const updateReservation = async (userId: any, reservationNumber: string, updateData: UpdateReservation) => {
  
  const [clinicType] = await updateDao.getClinicTypeIdByTypeName(updateData.clinic_type)

  let updateQuery: string;
  updateQuery = `patient_name = '${updateData.patient_name}',
                  clinic_type_id = '${clinicType.id}',
                  date = '${updateData.date}',
                  time = '${updateData.time}'`

  await updateDao.updateReservation(reservationNumber, updateQuery)
}

export default { isReservationCheck, updateReservation }