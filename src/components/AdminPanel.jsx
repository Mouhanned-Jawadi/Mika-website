import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa'
import { ProductForm } from './ProductForm'
import { ProductCarousel } from './ProductCarousel'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

export const AdminPanel = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onLogout }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.price.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = (formData) => {
    onAddProduct(formData)
    setShowForm(false)
    toast.success('✅ Product added successfully!')
  }

  const handleUpdateProduct = (formData) => {
    onUpdateProduct(editingProduct.id, formData)
    setEditingProduct(null)
    setShowForm(false)
    toast.success('✏️ Product updated successfully!')
  }

  const handleDeleteProduct = (id, productName) => {
    setDeleteConfirm({ id, name: productName })
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return
    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    onDeleteProduct(deleteConfirm.id)
    toast.success('🗑️ Product deleted successfully!')
    setDeleteConfirm(null)
    setIsDeleting(false)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
    toast.success('✏️ Editing product...')
  }

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-brand-gold/30 bg-brand-ivory/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-2xl tracking-wide">QueensBags Admin 👑</h1>
            <p className="text-sm text-brand-muted">Manage your products</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg border border-brand-berry/30 bg-white px-4 py-2 text-sm font-medium text-brand-berry transition hover:bg-brand-blush"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-brand-ink">Products ({filteredProducts.length})</h2>
            <p className="text-sm text-brand-muted">Create, edit, and manage your product catalog</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            className="btn-primary !w-max"
          >
            <FaPlus /> Add New Product
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or price..."
            className="input-field w-full"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-brand-gold/30 bg-white/50 p-12 text-center">
            <p className="text-brand-muted mb-4">No products found</p>
            <button
              onClick={() => {
                setEditingProduct(null)
                setShowForm(true)
              }}
              className="btn-primary"
            >
              <FaPlus /> Create Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-brand-gold/30 bg-white shadow-soft transition hover:shadow-lg"
              >
                {/* Product Image Carousel */}
                <div className="h-64 w-full overflow-hidden">
                  <ProductCarousel images={product.images} alt={product.name} className="!rounded-none w-full h-full" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-display text-xl text-brand-ink line-clamp-2">{product.name}</h3>
                  <p className="mt-2 text-sm text-brand-muted line-clamp-1">{product.instagramLink}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-brand-blush px-3 py-1 text-sm font-semibold text-brand-berry">
                      {product.price}
                    </span>
                    <span className="text-xs text-brand-muted">
                      {product.images.length} image{product.images.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-brand-berry/30 bg-white px-3 py-2 text-sm font-medium text-brand-berry transition hover:bg-brand-blush"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Confirm Delete Modal */}
      {deleteConfirm && (
        <ConfirmDeleteModal
          productName={deleteConfirm.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          isLoading={isDeleting}
        />
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}
