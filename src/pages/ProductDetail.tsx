import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/UX/LoadingSpinner'
import { productType } from '../utils/productType'

const ProductDetail = () => {
  // We get the exact query we defined in App.tsx Route
  let { productId } = useParams()

  // Declare product, loading and error state
  const [productDetail, setProductDetail] = useState<productType>()
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
        let actualProductDetail = await response.json()
        console.log(actualProductDetail)
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
  return <div>{productDetail.title}</div>
}

export default ProductDetail
