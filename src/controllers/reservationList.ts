import listService from "../services/reservationList"
import { Request, Response } from "express"
import { ReservationInfo } from "../configs/types"

const getSearchAndList = async (req: Request, res: Response) => {
  const searchKeyword = req.query

  if(!searchKeyword.reservationNumber && !searchKeyword.reservationName) res.status(400).json({ error: "INPUT_KEY" })

  try{
    // 예약 번호 혹은 예약자 이름으로 조회
    const list = await listService.getSearchAndList(searchKeyword)
    res.status(200).json(list)
  } catch(error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }

}


export default { getSearchAndList }