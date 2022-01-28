import React from 'react'
import { Link } from 'react-router-dom'
import { productType } from '../utils/productType'

import styles from './Product.module.scss'

const Product = (props: productType) => {
  return (
    <article className={styles.product}>
      <Link to={`/${props.id}`}>
        <h1>{props.title}</h1>
      </Link>
      <Link to="/:product">
        <div className={styles.img_container}>
          <img src={props.image} alt="Product-Thumbnail" />
        </div>
      </Link>
      <p>Price: {props.price}$</p>
      <p>{props.description}</p>
    </article>
  )
}

export default Product
