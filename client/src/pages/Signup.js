import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Form, Button } from 'semantic-ui-react';

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
            <h2>Signup</h2>
            <div className="form-div">
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <label htmlFor='username'>Username: </label>
                    <input
                        placeholder='johndoe'
                        name='username'
                        type='text'
                        id='username'
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='firstName'>First Name: </label>
                    <input
                        placeholder='John'
                        name='firstName'
                        type='text'
                        id='firstName'
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='lastName'>Last Name: </label>
                    <input
                        placeholder='Doe'
                        name='lastName'
                        type='text'
                        id='lastName'
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="email">Email: </label>
                    <input
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
                        placeholder="******"
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </Form.Field>
                <div>
                    <Button type="submit">
                        Signup
                    </Button>
                    <br></br>
                    <br></br>
                    <Link to='/login' className="instead">
                        Login instead
                    </Link>
                </div>
            </Form>
            </div>
            {error && <div>Signup failed, please try again!</div>}
        </div>
    );
};

export default Signup;