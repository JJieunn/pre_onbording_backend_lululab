type ReservationInfo = {
  reservationName: string;
  reservationNumber: number;
  phoneNumber: string;
  email: string;
  patientName: string;
  date: Date;
  time: string;
  hospital: string;
  clinicType: string;
}


type GetSearchAndList = {
  reservationName?: string;
  reservationNumber?: number;
}

export { GetSearchAndList, ReservationInfo }