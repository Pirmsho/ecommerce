import React from 'react'
import { productType } from '../utils/productType'

import styles from './Product.module.scss'

const Product = (props: productType) => {
  return (
    <article className={styles.product}>
      <h1>{props.title}</h1>
    </article>
  )
}

export default Product
