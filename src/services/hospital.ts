import hospitalDao from "../models/hospital"

const getHospitalList = async () => {
  return await hospitalDao.getHospitalList()
}

const getClinicTypes = async () => {
  return await hospitalDao.getClinicTypes()
}

const detailInfoByHospital = async (hospitalId: string) => {
  return await hospitalDao.detailInfoByHospital(hospitalId)
}


export default { getHospitalList, getClinicTypes, detailInfoByHospital }