import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default () => {
	const history = useHistory();

	const [values, setValues] = useState({
		username: '',
		password: '',
	});

	const handleChange = event => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const submitForm = event => {
		event.preventDefault();

		axios
			.post(`http://localhost:5000/api/auth/register`, {
				username: values.username,
				password: values.password,
			})
			.then(response => {
				console.log(response);
				localStorage.setItem('token', response.data.token);
				history.push(`/protected`);
			})
			.catch(error => {
				console.log(error);
			});

		setValues({
			username: '',
			password: '',
		});
	};

	return (
		<div>
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={submitForm}>
					<div>
						<input
							name='username'
							type='text'
							value={values.username}
							onChange={handleChange}
							placeholder='Create Username'
						/>
					</div>
					<div>
						<input
							name='password'
							type='password'
							value={values.password}
							onChange={handleChange}
							placeholder='Create Password'
						/>
					</div>
					<button type='submit'>Sign up</button>
					<div>
						<br />
						<button>
							<NavLink to='/'>Log in</NavLink>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
