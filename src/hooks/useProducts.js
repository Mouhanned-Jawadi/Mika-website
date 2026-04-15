import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'queenbags_products'

// Initial products data
const defaultProducts = [
  { id: 1, name: 'Queen #1', images: [], price: '145', instagramLink: 'https://www.instagram.com/p/EXAMPLE/', createdAt: Date.now() },
  { id: 2, name: 'Queen #2', images: [], price: '125', instagramLink: 'https://www.instagram.com/p/EXAMPLE/', createdAt: Date.now() },
  { id: 3, name: 'Queen #3', images: [], price: '159', instagramLink: 'https://www.instagram.com/p/EXAMPLE/', createdAt: Date.now() },
  { id: 4, name: 'Queen #4', images: [], price: '138', instagramLink: 'https://www.instagram.com/p/EXAMPLE/', createdAt: Date.now() },
  { id: 5, name: 'Queen #5', images: [], price: '149', instagramLink: 'https://www.instagram.com/p/EXAMPLE/', createdAt: Date.now() },
  { id: 6, name: 'Queen #6', images: [], price: '132', instagramLink: 'https://www.instagram.com/p/EXAMPLE/', createdAt: Date.now() },
]

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setProducts(JSON.parse(stored))
      } else {
        setProducts(defaultProducts)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts))
      }
    } catch {
      setProducts(defaultProducts)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever products change
  const saveProducts = useCallback((updatedProducts) => {
    setProducts(updatedProducts)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts))
    } catch (error) {
      console.error('Failed to save products:', error)
    }
  }, [])

  const addProduct = useCallback((productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: Date.now(),
    }
    const updated = [...products, newProduct]
    saveProducts(updated)
    return newProduct
  }, [products, saveProducts])

  const updateProduct = useCallback((id, productData) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...productData, id: p.id, createdAt: p.createdAt } : p
    )
    saveProducts(updated)
  }, [products, saveProducts])

  const deleteProduct = useCallback((id) => {
    const updated = products.filter((p) => p.id !== id)
    saveProducts(updated)
  }, [products, saveProducts])

  const getProductById = useCallback((id) => {
    return products.find((p) => p.id === id)
  }, [products])

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  }
}
