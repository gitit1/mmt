import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { Card, FormGroup, FormControl, Button } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseLogin, setResponseLogin] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();
    const onLogin = useCallback((userData) => dispatch(actions.login(userData)), [dispatch]);
    
    const message = useSelector(state => state.users.message)
    const user = useSelector(state => state.users.user)

    useEffect(() => {
        if(user){
            setTimeout(() => {
                history.push(`/`);
            }, 1000);
        }
    }, [user, history]);

    useEffect(() => {
        setResponseLogin(message);
    }, [message]);

    const handleSubmit = async e => {
        e.preventDefault();

        onLogin({
            email: email,
            password: password
        });

    }

    return (
        <div className="registrer-section">
            <div className="title">Login</div>
            <div className="card-wrapper">
                <Card
                    bg='dark'
                    className="form-card"
                >
                    <Card.Body>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup controlId="formBasicText">
                                <FormControl
                                    type="email"
                                    value={email}
                                    placeholder="Email address"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup controlId="formBasicText">
                                <FormControl
                                    type="password"
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormGroup>

                            <Button type="submit" variant="light">Submit</Button>
                        </form>
                        <p style={{ color: user ? 'green' : 'red' }}>{responseLogin}</p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
};

export default Login;
