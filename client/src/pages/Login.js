import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
// import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    // const [login, { error }] = useMutation(LOGIN);

    // const handleFormSubmit = async event => {
    //     event.preventDefault();
    //     try {
    //         const mutationResponse = await login({
    //             variables: { email: formState.email, password: formState.password}
    //         });
    //         const token = mutationResponse.data.login.token;
    //         Auth.login(token);
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // };

    const handleChange = event => {
        const { name, value } = event.target; 
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div>
            <Link to='/signup'>
                Signup instead
            </Link>

            <h2>Login Page</h2>
            {/* <form onSubmit={handleFormSubmit}> */}
                <div>
                    <label htmlFor="email">Email address: </label>
                    <input
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                    {/* {
                        error ? <div>
                            <p> Oops. Looks like the credentials provided are incorrect. Please try again!</p>
                        </div> : null
                    } */}
                <div>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            {/* </form> */}
        </div>
    );
};

export default Login;