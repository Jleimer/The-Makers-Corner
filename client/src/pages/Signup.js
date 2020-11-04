import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Signup = (props) => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                username: formState.username,
                email: formState.email, 
                password: formState.password,
                firstName: formState.firstName, 
                lastName: formState.lastName
            }
        });

        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = event => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value
        });
    };
    
    return (
        <div>
            <Link to='/login'>
                Login instead
            </Link>

            <h2>Signup</h2>
            <div className="form-div">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <br></br>
                    <input
                        className="input"
                        placeholder="johndoe"
                        name="username"
                        type="username"
                        id="username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <br></br>
                    <input 
                        className="input"
                        placeholder="John"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <br></br>
                    <input
                        className="input"
                        placeholder="Doe"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <br></br>
                    <input
                        className="input"
                        placeholder="johndoe@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <br></br>
                    <input
                        className="input"
                        placeholder="******"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">
                        Signup
                    </button>
                </div>
            </form>
            </div>
            {error && <div>Signup failed, please try again!</div>}
        </div>
    );
};

export default Signup;