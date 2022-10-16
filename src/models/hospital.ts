import myDataSource from "../configs/common"

const getHospitalList = async () => {
  return await myDataSource.query(`
    SELECT 
      h.id, h.name, h.address, h.open, h.close,
      d.name AS department
    FROM hospitals h
    JOIN departments d ON h.department_id = d.id
    WHERE h.is_active = 1
  `)
}

const getClinicTypes = async () => {
  return await myDataSource.query(`
    SELECT
      c.id, c.name AS clinic_type 
    FROM clinic_types
  `)
}

const detailInfoByHospital = async (hospitalId: string | number) => {
  return await myDataSource.query(`
    SELECT 
      h.id AS hospital_id, h.name, h.open, h.close, h.lunch_time, h.time_interval AS diagnosis_interval,
      d.id AS department_id, d.name AS department,
      o.saturday AS saturday_open,
      o.saturday_close_time,
      o.sunday AS sunday_open,
      o.sunday_close_time,
      o.holiday AS holiday_open,
      o.holiday_close_time
    FROM hospitals h 
    JOIN departments d ON h.department_id = d.id
    LEFT JOIN options o ON h.id = o.hospital_id
    WHERE h.id = ?
  `, [hospitalId])
}

export default { getHospitalList, getClinicTypes, detailInfoByHospital }