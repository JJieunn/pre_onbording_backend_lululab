import hospitalService from "../services/hospital"
import { Request, Response } from "express"


// 병원들 목록 보여주기
const getHospitalList = async (req: Request, res: Response) => {
  try {
    const hospitalList = await hospitalService.getHospitalList()
    res.status(200).json(hospitalList)
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
}

// 병원의 예약 가능 날짜
const detailInfoByHospital = async (req: Request, res: Response) => {
  const hospitalId = req.params.hospitalid;

  try{
    const [hospitalInfo] = await hospitalService.detailInfoByHospital(hospitalId)
    res.status(200).json(hospitalInfo)
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
}

// 진료 종류
const getClinicTypes = async (req: Request, res: Response) => {
  try {
    const clinicTypes = await hospitalService.getClinicTypes()
    res.status(200).json(clinicTypes)
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
}

export default { getHospitalList, getClinicTypes, detailInfoByHospital }