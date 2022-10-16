import listDao from "../models/reservationList"



const getSearchAndList = async (searchKeyword: any) => {
  searchKeyword
  let reservation: string;

/*   if(reservationName) {
    reservation = 'WHERE u.name = ' + reservationName
    return await listDao.getSearchAndList(reservation)
  } else if(reservationNumber) {
    reservation =  'WHERE r.reservation_number = ' + reservationNumber
    return await listDao.getSearchAndList(reservation)
  } */
}

export default{ getSearchAndList }