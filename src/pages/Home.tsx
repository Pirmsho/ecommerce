import React, { useEffect, useState } from 'react'

function Home() {
  const [products, setProducts] = useState([])
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
  return (
    <ul>
      {products.map((product) => (
        <li>{product.title}</li>
      ))}
    </ul>
  )
}

export default Home
