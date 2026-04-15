/**
 * MongoDB Connection Utility
 * Handles connection pooling for Netlify Functions
 */

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:HSFiubXrfbCUKtTTslqtvejkbJKujbnQ@nozomi.proxy.rlwy.net:24744'
const MONGODB_DB = process.env.MONGODB_DB || 'queenbags'

// Cache connection
let cachedConnection = null

export async function connectDB() {
  if (cachedConnection) {
    console.log('✅ Using cached MongoDB connection')
    return cachedConnection
  }

  try {
    console.log('🔌 Connecting to MongoDB...')
    
    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    })

    cachedConnection = connection
    console.log('✅ MongoDB connected successfully')
    return connection
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    throw error
  }
}

/**
 * Product Schema
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // Array of base64 or URLs
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

/**
 * Get or create Product model
 */
export function getProductModel() {
  if (mongoose.models.Product) {
    return mongoose.models.Product
  }
  return mongoose.model('Product', productSchema)
}
