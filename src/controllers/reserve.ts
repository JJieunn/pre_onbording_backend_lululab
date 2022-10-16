import reserveService from "../services/reserve"
import { Request, Response } from "express"
import { ReservationInfo } from "../configs/types";


    // 해당 예약자가 block 당한 사람은 아닌지 확인 후.


const createReservation = async (req: Request, res: Response) => {
  const { reservationName, phoneNumber, email, 
          patientName, date, time, hospital, clinicType }: ReservationInfo = req.body;

  try {
    await reserveService.createReservation(
      reservationName, phoneNumber, email,
      patientName, date, time, hospital, clinicType );
    res.status(200).json({ message: "RESERVATION_CREATED" })
  } catch (error) {
    console.log(error);
  }
}

export default { createReservation }