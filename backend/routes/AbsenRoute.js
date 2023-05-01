import express from "express";
import {
    getAbsens,
    getAbsenById,
    saveAbsen,
} from "../controllers/AbsenController.js";

const router = express.Router()


router.get('/absen', getAbsens);
router.get('/absen/:id', getAbsenById);
router.post('/absen', saveAbsen);

export default router;