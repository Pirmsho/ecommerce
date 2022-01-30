import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './TheHeader.module.scss'
import { RootState } from '../index'
const TheHeader = () => {
  const { totalQuantity } = useSelector((state: RootState) => state.cart)
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/categories">Categories</Link>
        <Link to="/">ReduxShop</Link>
        <div>
          <Link to="/cart">Cart</Link>
          <span>{totalQuantity}</span>
        </div>
      </nav>
    </header>
  )
}

export default TheHeader
