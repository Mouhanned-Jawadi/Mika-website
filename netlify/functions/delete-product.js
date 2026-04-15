/**
 * Netlify Function: Delete Product
 * DELETE /.netlify/functions/delete-product
 * Body: { id }
 */

import { connectDB, getProductModel } from './db.js'
import mongoose from 'mongoose'

export const handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { id } = JSON.parse(event.body)

    // Validate id
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid product ID' }),
      }
    }

    await connectDB()
    const Product = getProductModel()

    // Delete product
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Product not found' }),
      }
    }

    console.log('✅ Product deleted:', id)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Product deleted successfully',
        id: id,
      }),
    }
  } catch (error) {
    console.error('❌ Error deleting product:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to delete product',
        details: error.message,
      }),
    }
  }
}
