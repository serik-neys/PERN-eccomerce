import React, { useContext } from 'react';
import { useState } from 'react';
import { Container, Card, Form, Button, Row } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite"
import {Context} from "../index"

const Auth = observer(() => {

    const location = useLocation()
    const router = useNavigate()
    const isRegister = location.pathname === REGISTRATION_ROUTE

    const {user} = useContext(Context)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const click = async () => {
        try {
            let data;
        if (isRegister) {
            data = await registration(email, password)
        } else {
            data = await login(email, password)
        }
        user.setUser(user)
        user.setIsAuth(true)
        router(SHOP_ROUTE)

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <Container
            className="d-flex justify-content-ceneter align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5 m-auto" >
                <h2 className="m-auto mb-4">{isRegister ? "Регистрация" : "Авторизация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="mt-3"
                        placeholder='Введите ваш email...'
                    />
                    <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="mt-3"
                        placeholder='Введите ваш пароль...'
                    />
                    <Row className="d-flex justify-content-between mt-3">
                        <div>
                            {isRegister ? "Есть акааунт?" : "Нет акаунта?"}   <Link to={isRegister ? LOGIN_ROUTE : REGISTRATION_ROUTE}>{isRegister ? "Войти" : "Регистрация"}</Link>
                        </div>
                        <Button
                            onClick={click}
                            className="mt-3 align-self-end"
                            variant={"outline-success"}
                        >
                            {isRegister ? "Регистрация" : "Авторизация"}
                        </Button>
                    </Row>
                </Form>
            </Card>

        </Container>
    )
})

export default Auth;