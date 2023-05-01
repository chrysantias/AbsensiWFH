import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password,
            });
            navigate("/absen");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className='box'>
                                <h1 className="title has-text-centered">
                                    Absensi Karyawan
                                </h1>
                                <div className="field mt-5">
                                    <label className='label'>Email or username</label>
                                    <div className="controls">
                                        <input type="text" className='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className='label'>Password</label>
                                    <div className="controls">
                                        <input type="password" className='input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                                    </div>
                                </div>
                                <p className='is-danger has-text-centered mb-2'>{msg}</p>
                                <div className="field">
                                    <button className='button is-info is-fullwidth'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login