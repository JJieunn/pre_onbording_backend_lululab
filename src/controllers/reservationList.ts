import listService from "../services/reservationList"
import { Request, Response } from "express"
import { ReservationInfo } from "../configs/types"

const getSearchAndList = async (req: Request, res: Response) => {
  const { reservationNumber , reservationName }: ReservationInfo = req.body
  try{
    // 예약 번호 혹은 예약자 이름으로 조회
    const list = await listService.getSearchAndList(reservationNumber, reservationName)
    res.status(200).json(list)
  } catch(error) {
    console.log(error)
    // res.status( err.statusCode || 500 )
  }

}


export default { getSearchAndList }