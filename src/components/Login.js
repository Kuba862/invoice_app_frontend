import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleLoginData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:3002/login', {
                params: {
                    email: loginData.email,
                    password: loginData.password
                }
            })
            console.log(res.data)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Logowanie</h1>
            <input type="text" name="email" placeholder='email' onChange={(e) => handleLoginData(e)} />
            <input type="password" name="password" placeholder='hasło' onChange={(e) => handleLoginData(e)} />
            <button onClick={login} >zaloguj</button>
        </div>
    );
}

export default Login;
