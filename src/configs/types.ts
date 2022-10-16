type ReservationInfo = {
  reservation_name: string;
  reservation_number?: number;
  patient_name: string;
  birth: string;
  date: Date;
  time: string;
  hospital_id: number;
  department_id: number;
  clinic_type_id: number;
}


type GetSearchAndList = {
  reservation_name?: string;
  reservation_number?: number;
}


type UpdateReservation = {
  patient_name: string;
  date: Date;
  time: string;
  clinic_type: string;
}


export { GetSearchAndList, ReservationInfo, UpdateReservation }