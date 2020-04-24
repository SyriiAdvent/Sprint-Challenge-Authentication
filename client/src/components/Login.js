import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();

    const[values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        const { name, value } = event.target
        setValues({
            ...values, 
            [name]: value
        })
    };

    const submitForm = event => {
        event.preventDefault();

        axios
        .post(`http://localhost:5000/api/auth/login`, values)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            history.push(`/protected`);
        })
        .catch(error => {
            console.log(error)
        })

        setValues({
            username: "",
            password: ""
        })
    };

    return (
        <div>
            <div className="login-panel">
                <h1>User Log In</h1>
                <form onSubmit={submitForm}>
                    <div>
                        <input name="username" type="text" value={values.username} onChange={handleChange} placeholder="Username"/>
                    </div>
                    <div>
                        <input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password"/>
                    </div>
                    <button type="submit">Log In</button>
                    <div >
                        <br />
                    <button><NavLink to="/register">Register</NavLink></button>
                    </div>
                </form>
            </div>
        </div>
    )
}