import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { Card, FormGroup, FormControl, Button } from 'react-bootstrap';

const Registrer = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseRegister, setResponseRegister] = useState('');
    
    const history = useHistory();

    const dispatch = useDispatch();
    const onRegistrer = useCallback((userData) => dispatch(actions.registrer(userData)), [dispatch]);
    
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
        setResponseRegister(message)
    }, [message]);

    const handleSubmit = async e => {
        e.preventDefault();

        onRegistrer({
            username: username,
            email: email,
            password: password
        });

    }

    return (
        <div className="registrer-section">
            <div className="title">Register</div>
            <div className="card-wrapper">
                <Card
                    bg='dark'
                    className="form-card"
                >
                    <Card.Body>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup controlId="formBasicText">
                                {/* <FormLabel>Need to be at least 5 letters</FormLabel> */}
                                <FormControl
                                    type="text"
                                    value={username}
                                    placeholder="Enter username"
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <FormControl.Feedback />
                                {/* <Alert>Validation is based on string length.</Alert> */}
                            </FormGroup>

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
                        <p style={{ color: user ? 'green' : 'red' }}>{responseRegister}</p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
    // TODO: [MT-5] when registrer is success redirect to user settings/manage
};

export default Registrer;
