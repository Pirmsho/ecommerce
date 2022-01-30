import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import LoadingSpinner from '../components/UX/LoadingSpinner'
import { productType } from '../utils/productType'

const ProductDetail = () => {
  // We get the exact query we defined in App.tsx Route
  let { productId } = useParams()

  // Declare product, loading and error state
  const [productDetail, setProductDetail] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchAllProductDetail = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}` // Pass in the query we received to API call
        )
        if (!response.ok) {
          throw new Error(`HTTP Error, status code ${response.status}`)
        }
        let actualProductDetail: productType = await response.json()

        setProductDetail(actualProductDetail)
      } catch (error: any) {
        setHttpError(error.message)
        setProductDetail(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllProductDetail()
  }, [productId]) // pass in the query as the dependency, so useEffect reruns when it changes
  if (isLoading) {
    return (
      <section className="LoadingSection">
        <LoadingSpinner />
      </section>
    )
  }
  if (httpError) {
    return (
      <section className="LoadingSection">
        <p>{httpError}</p>
      </section>
    )
  }
  return (
    <section className="container">
      <Product
        id={productDetail.id}
        title={productDetail.title}
        description={productDetail.description}
        category={productDetail.category}
        price={productDetail.price}
        image={productDetail.image}
      ></Product>
    </section>
  )
}

export default ProductDetail
