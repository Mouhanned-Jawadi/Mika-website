import { useState, useCallback, useEffect } from 'react'

// Helper to save to local backup
const saveToLocalStorage = (products) => {
  try {
    localStorage.setItem('queenbags_products', JSON.stringify(products))
  } catch (e) {
    console.warn('Could not save to localStorage:', e)
  }
}

// Helper to load from local backup
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('queenbags_products')
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    console.warn('Could not load from localStorage:', e)
    return null
  }
}

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all products from MongoDB
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('🌐 Fetching products from API...')
      const response = await fetch('/.netlify/functions/get-products')
      
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      
      const result = await response.json()
      console.log('✅ Products loaded from MongoDB:', result.data?.length || 0)
      setProducts(result.data || [])
      saveToLocalStorage(result.data || [])
    } catch (err) {
      console.warn('⚠️ API fetch failed, using localStorage fallback:', err.message)
      setError(null) // Don't show error to user, use fallback instead
      
      // Fallback to localStorage
      const localProducts = loadFromLocalStorage()
      if (localProducts) {
        console.log('📂 Loaded products from localStorage:', localProducts.length)
        setProducts(localProducts)
      } else {
        console.log('📂 No products in localStorage either')
        setProducts([])
      }
    } finally {
      setIsLoading(false)
      setIsLoaded(true)
    }
  }, [])

  // Load products on mount
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Re-fetch every 60 seconds so admin changes are reflected for all users
  useEffect(() => {
    const interval = setInterval(fetchProducts, 60000)
    return () => clearInterval(interval)
  }, [fetchProducts])

  // Immediately re-fetch when the user returns to the tab
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) fetchProducts()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [fetchProducts])

  const addProduct = useCallback(async (productData) => {
    try {
      setError(null)
      console.log('📤 Adding product:', productData.name)
      
      const response = await fetch('/.netlify/functions/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      console.log('📬 Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Product saved to MongoDB')
        const newProduct = result.data
        
        setProducts((prev) => {
          const updated = [newProduct, ...prev]
          saveToLocalStorage(updated)
          return updated
        })
        
        return newProduct
      } else {
        throw new Error(`API error: ${response.status}`)
      }
    } catch (err) {
      console.warn('⚠️ MongoDB save failed, using localStorage:', err.message)
      
      // Fallback: save to localStorage instead
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date().toISOString(),
      }
      
      setProducts((prev) => {
        const updated = [newProduct, ...prev]
        saveToLocalStorage(updated)
        return updated
      })
      
      console.log('📂 Product saved to localStorage:', newProduct.id)
      return newProduct
    }
  }, [])

  const updateProduct = useCallback(async (id, productData) => {
    try {
      setError(null)
      console.log('✏️ Updating product:', id)
      
      const response = await fetch('/.netlify/functions/update-product', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...productData }),
      })

      if (response.ok) {
        const result = await response.json()
        const updatedProduct = result.data
        
        setProducts((prev) => {
          const updated = prev.map((p) => (p.id === id ? updatedProduct : p))
          saveToLocalStorage(updated)
          return updated
        })
        console.log('✅ Product updated in MongoDB')
        return
      } else {
        throw new Error(`API error: ${response.status}`)
      }
    } catch (err) {
      console.warn('⚠️ MongoDB update failed, using localStorage:', err.message)
      
      // Fallback: update in localStorage
      const updatedProduct = { id, ...productData }
      
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? updatedProduct : p))
        saveToLocalStorage(updated)
        return updated
      })
      
      console.log('📂 Product updated in localStorage:', id)
    }
  }, [])

  const deleteProduct = useCallback(async (id) => {
    try {
      setError(null)
      console.log('🗑️ Deleting product:', id)
      
      const response = await fetch('/.netlify/functions/delete-product', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setProducts((prev) => {
          const updated = prev.filter((p) => p.id !== id)
          saveToLocalStorage(updated)
          return updated
        })
        console.log('✅ Product deleted from MongoDB')
        return
      } else {
        throw new Error(`API error: ${response.status}`)
      }
    } catch (err) {
      console.warn('⚠️ MongoDB delete failed, using localStorage:', err.message)
      
      // Fallback: delete from localStorage
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id)
        saveToLocalStorage(updated)
        return updated
      })
      
      console.log('📂 Product deleted from localStorage:', id)
    }
  }, [])

  const getProductById = useCallback((id) => {
    return products.find((p) => p.id === id)
  }, [products])

  return {
    products,
    isLoaded,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refetch: fetchProducts, // Allow manual refresh
  }
}
