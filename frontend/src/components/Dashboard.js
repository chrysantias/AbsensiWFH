import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpired] = useState('');
    const [file, setFile] = useState('');
    const [date, setDate] = useState('');
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const saveAbsen = async (e) => {
        e.prevenDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("date", date);
        try {
            await axios.post("http://localhost:5000/absen", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        refreshToken();
    }, []);


    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/absensi");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    return (
        <div className="container mt-5">
            <h3 className='bold'>Welcome Back, {name}! </h3>
            <p className='title has-text-centered'>Absensi Karyawan WFH </p>
            <div className="columns is-centered mt-5">
                <div className="column is-half">
                    <form onSubmit={saveAbsen}>
                        <div className='field'>
                            <label className='label'>Nama Karyawan</label>
                            <div className="control">
                                <input type="text" className='input' value={name} disabled />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Tanggal</label>
                            <div className="control">
                                <input type="date" className='input' value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Bukti(screenshot)</label>
                            <div className="control">
                                <div className="file">
                                    <label className="file-label">
                                        <input type="file" className='file-input' onChange={loadImage} />
                                        <span className='file-cta'>
                                            <span className='file-label'>Choose a file.</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {preview ? (
                            <figure className='image is-128x128'>
                                <img src={preview} alt="preview image" />
                            </figure>
                        ) : (
                            ""
                        )
                        }
                        <div className='field'>
                            <div className="control">
                                <button className='button is-info' >Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Dashboard