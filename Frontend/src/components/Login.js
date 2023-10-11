import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../css/login.css"

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://notemakerbackend-23oz.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showalert("Your have Logged In Successfully", "success");
            history("/");
        }
        else {
            props.showalert("Invalied Details", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-3 p-5 mb-2 rounded bg-transparent loginbody'>
            <h2>Login To Access NoteMaker</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control backlogin" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control backlogin" onChange={onChange} value={credentials.password} name="password" id="password" />
                </div>
                <button type="submit" className=" btn btn-primary">Login</button>
                <div id="emailHelp" className="form-text">SignUp if you dont have account.</div>
            </form>
        </div>
    )
}

export default Login
