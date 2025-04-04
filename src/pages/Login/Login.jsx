import React, { useState } from "react";
import styles from './Login.module.css';
import { login } from "../../api/users";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: 'kauaanmatheus@gmail.com',
        password: 'Kauan123@'
    });

    const setState = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });


    const sendLogin = async () => {
        try {
            const response = await login(formData);

            localStorage.setItem('userId', response.id);

            navigate('/home');
        } catch (e) {
            console.log(e);
        }
    }

    return <>
        <div className={styles.form}>
            <h1>Login</h1>

            <input name={'email'} onInput={e => setState(e)} type={'text'} placeholder={'Kauan Oliveira'} value={formData.email} />
            <input name={'password'} onInput={e => setState(e)} type={'password'} placeholder={'*******'} value={formData.password} />

            <button onClick={() => sendLogin()}>Entrar</button>
        </div>
    </>
}