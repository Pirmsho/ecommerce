import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cart/cartSlice'
import { productType } from '../utils/productType'

import styles from './Product.module.scss'

const Product = (props: productType) => {
  const dispatch = useDispatch()
  const addToCartHandler = (product: productType) => {
    dispatch(addToCart(product))
  }
  return (
    <article className={styles.product}>
      <Link to={`/${props.id}`}>
        <h1>{props.title}</h1>
      </Link>
      <Link to={`/${props.id}`}>
        <div className={styles.img_container}>
          <img src={props.image} alt="Product-Thumbnail" />
        </div>
      </Link>
      <p>
        Price: <strong>{props.price}$</strong>
      </p>
      <p>
        Category:{' '}
        <strong>
          <Link to={`/categories/${props.category}`}>{props.category}</Link>
        </strong>
      </p>
      <p>{props.description}</p>
      <button onClick={() => addToCartHandler(props)}>+ Add To Cart</button>
    </article>
  )
}

export default Product
