import myDataSource from "../configs/common"

const reservationNumberCheck = async (reservationNumber: string) => {
  return await myDataSource.query(`
    SELECT 
      r.id, r.status_id,
      s.name AS status
    FROM reservations r
    JOIN statuses s ON r.status_id = s.id
    WHERE reservation_number = ?
  `, [reservationNumber])
}

const getClinicTypeIdByTypeName = async (clinicTypeName: string) => {
  return await myDataSource.query(`
    SELECT id FROM clinic_types WHERE name = ?
  `, [clinicTypeName])
}

const updateReservation = async (reservationNumber: string, updateQuery: string) => {
  await myDataSource.query(`
    UPDATE reservations SET
    ${updateQuery}
    WHERE reservation_number = ?
  `, [reservationNumber])
}

export default { reservationNumberCheck, getClinicTypeIdByTypeName, updateReservation }