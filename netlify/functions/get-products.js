/**
 * Netlify Function: Get Products
 * GET /.netlify/functions/get-products
 */

import { connectDB, getProductModel } from './db.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    await connectDB()
    const Product = getProductModel()

    // Get all products sorted by creation date
    const products = await Product.find({}).sort({ createdAt: -1 }).lean()

    // Convert MongoDB _id to id for frontend
    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      ...product,
      _id: undefined,
    }))

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: formattedProducts,
      }),
    }
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch products',
        details: error.message,
      }),
    }
  }
}
