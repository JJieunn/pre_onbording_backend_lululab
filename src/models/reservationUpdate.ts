import myDataSource from "../configs/common"

const findReservationNumber = async (userId: any) => {
  return await myDataSource.query(`
    SELECT reservation_number FROM reservations WHERE user_id = ?
  `, [userId])
}

const findClinicTypeIdByTypeName = async (clinicTypeName: string) => {
  return await myDataSource.query(`
    SELECT id FROM clinic_types WHERE name = ?
  `, [clinicTypeName])
}

const updateReservation = async (reservationNumber: number, updateQuery: string) => {
  console.log('number - ', reservationNumber, 'query - ', updateQuery)

  myDataSource.query(`
    UPDATE reservations SET
    ${updateQuery}
    WHERE reservation_number = ?
  `, [reservationNumber])
}

export default { findReservationNumber, findClinicTypeIdByTypeName, updateReservation }