import listDao from "../models/reservationList"


const getSearchAndList = async (searchKeyword: any) => {

  if(!searchKeyword.reservationName && searchKeyword.reservationNumber) 
  { searchKeyword.query = `WHERE r.reservation_number = '${searchKeyword.reservationNumber}'` }
  else if(!searchKeyword.reservationNumber && searchKeyword.reservationName) 
  { searchKeyword.query = `WHERE u.name = '${searchKeyword.reservationName}'` }

  return await listDao.getSearchAndList(searchKeyword)
}

export default{ getSearchAndList }