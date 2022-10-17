import myDataSource from "../configs/common"


const getSearchAndList = async (searchKeyword: any): Promise<object[]> => {
  return await myDataSource.query(`
  SELECT 
    r.id, r.reservation_number,
    r.patient_name,
    DATE_FORMAT(r.date, "%Y-%m-%d") AS date,
    r.time,
    u.name AS reservation_name, u.phone_number, u.email,
    h.name AS hospital,
    d.name AS department,
    c.name AS clinic_type,
    s.name AS status,
    DATE_FORMAT(r.created_at, "%Y-%m-%d %p %T") AS created_at,
    DATE_FORMAT(r.updated_at, "%Y-%m-%d %p %T") AS updated_at
  FROM reservations r
  JOIN users u ON r.user_id = u.id
  JOIN hospitals h ON r.hospital_id = h.id
  JOIN departments d ON h.department_id = d.id
  JOIN clinic_types c ON r.clinic_type_id = c.id
  JOIN statuses s ON r.status_id = s.id
  ${searchKeyword.query}
  ORDER BY id DESC;
  `)
}

const getList = async (reservationNumber: string): Promise<object[]> => {
  return await myDataSource.query(`
  SELECT 
    r.id, r.reservation_number,
    r.patient_name,
    DATE_FORMAT(r.date, "%Y-%m-%d") AS date,
    r.time,
    u.name AS reservation_name, u.phone_number, u.email,
    h.name AS hospital,
    d.name AS department,
    c.name AS clinic_type,
    s.name AS status,
    DATE_FORMAT(r.created_at, "%Y-%m-%d %p %T") AS created_at,
    DATE_FORMAT(r.updated_at, "%Y-%m-%d %p %T") AS updated_at
  FROM reservations r
  JOIN users u ON r.user_id = u.id
  JOIN hospitals h ON r.hospital_id = h.id
  JOIN departments d ON h.department_id = d.id
  JOIN clinic_types c ON r.clinic_type_id = c.id
  JOIN statuses s ON r.status_id = s.id
  WHERE r.reservation_number = ?;
  `, [reservationNumber])
}


export default { getSearchAndList, getList }