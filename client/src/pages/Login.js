import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button } from 'semantic-ui-react';

const Login = (props) => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { 
                    username: formState.username,
                    email: formState.email, 
                    password: formState.password}
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        }
        catch (e) {
            console.log(e)
        }
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
            <h2>Login</h2>
            <div className="form-div">
                <Form onSubmit={handleFormSubmit}>
                    <Form.Field>
                        <label htmlFor="email">Email address: </label>
                        <input
                            className="input"
                            placeholder="johndoe@test.com"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">Password: </label>
                        <input
                            className="input"
                            placeholder="******"
                            name="password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />
                    </Form.Field>
                        {
                            error ? <div>
                                <p> Oops. Looks like the credentials provided are incorrect. Please try again!</p>
                            </div> : null
                        }
                    <div>
                        <Button type='submit'>
                            Submit
                        </Button>
                        <br></br>
                        <br></br>
                        <Link to='/signup' className="instead">
                            Signup instead
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;