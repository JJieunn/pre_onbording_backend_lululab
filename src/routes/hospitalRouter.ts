import express from "express"
import hospitalContrller from "../controllers/hospital"

const router = express.Router()

router.get('/list', hospitalContrller.getHospitalList)
router.get('/clinic', hospitalContrller.getClinicTypes)
router.get('/date-list/:hospitalid', hospitalContrller.detailInfoByHospital)


export default router
