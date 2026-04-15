import { FaTrash, FaTimes } from 'react-icons/fa'

export const ConfirmDeleteModal = ({ productName, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border border-brand-gold/30 p-8 w-full max-w-md shadow-lg animate-in fade-in scale-95">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <FaTrash className="text-red-500 text-2xl" />
          </div>
        </div>

        {/* Content */}
        <h2 className="font-display text-2xl text-center text-brand-ink mb-3">Delete Product?</h2>
        <p className="text-center text-brand-muted mb-2">Are you sure you want to delete</p>
        <p className="text-center font-semibold text-brand-berry mb-6">"{productName}"</p>

        <p className="text-center text-sm text-brand-muted mb-8">
          This action cannot be undone. All product details and images will be permanently removed.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg border border-brand-gold/30 bg-white text-brand-ink font-medium transition hover:bg-brand-ivory disabled:opacity-50"
          >
            Keep It
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium transition hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FaTrash /> {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
