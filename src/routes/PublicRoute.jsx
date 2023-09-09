import React from 'react';
import {Routes, Route} from "react-router-dom"
import Homepage from "../pages/Homepage"
import Authentication from '../pages/Authentication';
import Calories from '../pages/Calories';
function PublicRoute(props) {
    return (
        <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/authentication' element={<Authentication/>} />
            <Route path='/calorie' element={<Calories/>} />
        </Routes>
    );
}

export default PublicRoute;