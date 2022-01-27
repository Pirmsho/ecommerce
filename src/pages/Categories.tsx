import React, { useEffect, useState } from 'react'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products/categories'
        )
        if (!response.ok) {
          throw new Error(`Http Error, Status code ${response.status}`)
        }
        let actualCategories = await response.json()
        setCategories(actualCategories)
      } catch (error: any) {
        setHttpError(error.message)
        setCategories(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])
  return <div></div>
}

export default Categories
