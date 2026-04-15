import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const ProductCarousel = ({ images = [], alt = 'Product', className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-blush rounded-2xl aspect-square ${className}`}
      >
        <p className="text-brand-muted text-sm">No image</p>
      </div>
    )
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`${alt} - ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-2xl"
      />

      {/* Only show controls if multiple images */}
      {images.length > 1 && (
        <>
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-brand-berry" size={16} />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <FaChevronRight className="text-brand-berry" size={16} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  )
}
