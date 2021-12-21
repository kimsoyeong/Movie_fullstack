import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import { Button, Typography } from 'antd';

const { Title } = Typography;

function LoinPage() {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }


        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                navigate('/');
            } else {
                alert('Error');
            }
        });
    }

    return (
        <div className="app">
            <Title level={2}>Log In</Title>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh'
            }}>
                <form style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={onSubmitHandler}
                >
                    <label>Email</label>
                    <input type="email" value={ Email } onChange={onEmailHandler} />
                    <label>Password</label>
                    <input type="password" value={ Password } onChange={onPasswordHandler} />

                    <br />
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }}>
                        Log in
                    </Button>

                    <a href="/register">register now!</a>
                </form>
            </div>
        </div>
    );    
}

export default LoinPage;