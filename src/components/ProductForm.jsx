import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaTimes, FaPlus, FaImage, FaTrash, FaUpload } from 'react-icons/fa'
import { ProductCarousel } from './ProductCarousel'

export const ProductForm = ({ product = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    instagramLink: '',
    images: [],
  })
  const [imageInput, setImageInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle URL input
  const handleAddImage = () => {
    if (!imageInput.trim()) {
      toast.error('❌ Please enter an image URL')
      return
    }

    // Basic URL validation
    if (!imageInput.startsWith('http')) {
      toast.error('❌ Please enter a valid image URL (starting with http)')
      return
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageInput.trim()],
    }))
    setImageInput('')
    toast.success('✅ Image added!')
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`❌ ${file.name} is not an image file`)
        return
      }

      // Validate file size (max 5MB per image)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`❌ ${file.name} is too large. Max 5MB per image.`)
        return
      }

      // Convert to base64
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target.result
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, base64],
        }))
        toast.success(`📸 ${file.name} uploaded!`)
      }
      reader.onerror = () => {
        toast.error(`❌ Failed to read ${file.name}`)
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    e.target.value = ''
  }

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    toast.success('🗑️ Image removed')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.name.trim()) {
      toast.error('❌ Product name is required')
      setIsSubmitting(false)
      return
    }

    if (!formData.price.trim()) {
      toast.error('❌ Price is required')
      setIsSubmitting(false)
      return
    }

    if (formData.images.length === 0) {
      toast.error('❌ Please add at least one image')
      setIsSubmitting(false)
      return
    }

    if (!formData.instagramLink?.trim()) {
      toast.error('❌ Instagram link is required')
      setIsSubmitting(false)
      return
    }

    try {
      // Wait for the save to complete
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      // Call onSave and wait for it to complete
      await onSave(formData)
      
      // Only reset if save was successful
      setFormData({
        name: '',
        price: '',
        instagramLink: '',
        images: [],
      })
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('❌ Failed to save product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border border-brand-gold/30 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-brand-ink">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-brand-blush rounded-full transition"
          >
            <FaTimes className="text-brand-berry" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <label className="label-block">
            <span>Product Name *</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., Queen #1 - Berry Paradise"
            />
          </label>

          {/* Price */}
          <label className="label-block">
            <span>Price *</span>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., 145 TND"
            />
          </label>

          {/* Instagram Link */}
          <label className="label-block">
            <span>Instagram Link (Reel/Post URL) *</span>
            <input
              type="url"
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleInputChange}
              className="input-field"
              placeholder="https://www.instagram.com/p/XXXXXX/"
            />
          </label>

          {/* Images Section */}
          <div>
            <h3 className="font-semibold text-brand-ink mb-4">Product Images (Multiple) *</h3>

            {/* Image Input - Option 1: URL */}
            <div className="mb-4">
              <label className="text-sm font-medium text-brand-muted block mb-2">From URL:</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
                  className="input-field flex-1"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="btn-secondary"
                >
                  <FaPlus /> Add URL
                </button>
              </div>
            </div>

            {/* Image Input - Option 2: File Upload */}
            <div className="mb-4">
              <label className="text-sm font-medium text-brand-muted block mb-2">Or Upload from Device:</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-brand-gold/30 rounded-2xl p-6 cursor-pointer hover:border-brand-berry/50 transition bg-brand-ivory/30">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <FaUpload className="text-brand-berry text-3xl mb-2" />
                <p className="text-sm font-medium text-brand-ink">Click to upload images</p>
                <p className="text-xs text-brand-muted">or drag & drop (Max 5MB each)</p>
              </label>
            </div>

            {/* Image Counter */}
            {formData.images.length > 0 && (
              <p className="text-sm text-brand-muted mb-4">
                {formData.images.length} image{formData.images.length > 1 ? 's' : ''} added
              </p>
            )}

            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group rounded-2xl overflow-hidden border border-brand-gold/30"
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect fill=%22%23f5e6e1%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaTrash className="text-white" size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-brand-gold/20">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
