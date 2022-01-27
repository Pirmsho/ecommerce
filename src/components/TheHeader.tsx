import React from 'react'

import { Link } from 'react-router-dom'

import styles from './TheHeader.module.scss'
const TheHeader = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/categories">Categories</Link>
        <Link to="/">ReduxShop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  )
}

export default TheHeader
