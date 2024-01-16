import React from 'react';
import { useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import { Context } from '../index';
import NotFound from '../page/NotFound';
import { authRoutes, publicRoutes } from '../routes';
import {observer} from "mobx-react-lite"


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user._isAuth && authRoutes.map( ({path, Component}) => (
            <Route key={path} path={path} element={Component} />
           ))}
           {publicRoutes.map( ({path, Component}) => (
            <Route key={path} path={path} element={Component} />
           ))}
           <Route path='*' element={<NotFound/>} />
        </Routes>
    )
})

export default AppRouter;