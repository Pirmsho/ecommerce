import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import LoadingSpinner from '../components/UX/LoadingSpinner'
import { productType } from '../utils/productType'

const CategoryProducts = () => {
  let { category } = useParams()
  const [categoryProducts, setCategoryProducts] = useState<productType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        )
        if (!response.ok) {
          throw new Error(`Http error, status code ${response.status}`)
        }
        let data = await response.json()
        setCategoryProducts(data)
      } catch (error: any) {
        setHttpError(error)
        setCategoryProducts(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProductsByCategory()
  }, [category])
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
    <section className="product-section">
      {categoryProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          category={product.category}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </section>
  )
}

export default CategoryProducts
