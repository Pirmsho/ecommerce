import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/UX/LoadingSpinner'
import { Category } from '../utils/categoryType'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
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
    <section className="categories-section">
      {categories.map((category, index) => (
        <Link to={`/categories/${category}`} key={index}>
          <h2>{category}</h2>
        </Link>
      ))}
    </section>
  )
}

export default Categories
