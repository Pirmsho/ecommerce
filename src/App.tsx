import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import TheHeader from './components/TheHeader'

import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'
import Cart from './pages/Cart'

import './App.css'
function App() {
  return (
    <Router>
      <TheHeader></TheHeader>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/categories/:category"
          element={<CategoryProducts />}
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
