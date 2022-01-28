import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import LoadingSpinner from '../components/UX/LoadingSpinner'
import { productType } from '../utils/productType'

function Home() {
  const [products, setProducts] = useState<productType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error(`HTTP Error, status code ${response.status}`)
        }
        let actualProducts = await response.json()
        setProducts(actualProducts)
      } catch (error: any) {
        setHttpError(error.message)
        setProducts(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllProducts()
  }, [])
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
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </section>
  )
}

export default Home
