import { useState, useCallback, useEffect } from 'react'

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
      console.log('🌐 Fetching products from MongoDB...')
      const response = await fetch('/.netlify/functions/get-products', {
        cache: 'no-store',
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)

      const result = await response.json()
      console.log('✅ Products loaded from MongoDB:', result.data?.length || 0)
      setProducts(result.data || [])
    } catch (err) {
      console.error('❌ Failed to load products from MongoDB:', err.message)
      setError(err.message)
      setProducts([])
    } finally {
      setIsLoading(false)
      setIsLoaded(true)
    }
  }, [])

  // Load products on mount
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Re-fetch every 15 seconds so admin changes propagate to open tabs quickly
  useEffect(() => {
    const interval = setInterval(fetchProducts, 15000)
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
    setError(null)
    console.log('📤 Adding product:', productData.name)

    const response = await fetch('/.netlify/functions/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      throw new Error(`Failed to add product (${response.status}): ${errBody}`)
    }

    const result = await response.json()
    const newProduct = result.data
    console.log('✅ Product saved to MongoDB:', newProduct.id)

    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }, [])

  const updateProduct = useCallback(async (id, productData) => {
    setError(null)
    console.log('✏️ Updating product:', id)

    const response = await fetch('/.netlify/functions/update-product', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...productData }),
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      throw new Error(`Failed to update product (${response.status}): ${errBody}`)
    }

    const result = await response.json()
    const updatedProduct = result.data
    console.log('✅ Product updated in MongoDB')

    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
  }, [])

  const deleteProduct = useCallback(async (id) => {
    setError(null)
    console.log('🗑️ Deleting product:', id)

    const response = await fetch('/.netlify/functions/delete-product', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      throw new Error(`Failed to delete product (${response.status}): ${errBody}`)
    }

    console.log('✅ Product deleted from MongoDB')
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const getProductById = useCallback((id) => {
    return products.find((p) => p.id === id)
  }, [products])

  // Clear any stale localStorage from the old fallback implementation
  useEffect(() => {
    try {
      localStorage.removeItem('queenbags_products')
    } catch {
      // ignore
    }
  }, [])

  return {
    products,
    isLoaded,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refetch: fetchProducts,
  }
}
