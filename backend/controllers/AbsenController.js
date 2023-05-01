//controller absensi karyawan
import Absen from "../models/AbsenModel.js";
import path from "path";

export const getAbsens = async (req, res) => {
    try {
        const response = await Absen.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAbsenById = async (req, res) => {
    try {
        const response = await Absen.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveAbsen = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });
    const name = req.body.title;
    const date = new Date();
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowType = ['.png', '.jpg', '.jpeg'];

    if (!allowType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must less than 5MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: msg.message });

        try {
            await Absen.create({ name: name, date: date, img: fileName, url: url });
            res.status(201).json({ msg: "Success Added" });
        } catch (error) {
            console.log(error.message);
        }
    });
}

