import React from 'react';
import { useContext } from 'react';
import { Navbar, Nav, Button, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {observer} from "mobx-react-lite"

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const router = useNavigate()

    const logout = () => {
        user.setUser(false)
        user.setIsAuth(false)
        localStorage.removeItem("token")
    }

    return (
        <>
            <Navbar  bg="dark" variant="dark">
                <Container>
                <Link style={{ color: "white", textDecoration:"none" }} to={SHOP_ROUTE}>Купите девайс</Link>
                {
                    user.isAuth ?
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <Button onClick={() => router(ADMIN_ROUTE)} style={{marginRight: 10}}  variant={'outline-light'}>Адмен панель</Button>
                            <Button onClick={logout} variant={'outline-light'}>Выйти</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <Button onClick={() => router(LOGIN_ROUTE)} variant={'outline-light'}>Авторизация</Button>
                        </Nav>
                    }
                </Container>
            

            </Navbar>
            <br />

        </>
    );

})

export default NavBar;