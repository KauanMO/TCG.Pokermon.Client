import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import './global.css';
import CardSet from './pages/CardSet/CardSet';
import Cards from './pages/Cards/Cards';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <div className={'container'}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/cards' element={<Cards />} />
                <Route path='cardset/:cardSetId' element={<CardSet />} />
            </Routes>
        </BrowserRouter>
    </div>
);