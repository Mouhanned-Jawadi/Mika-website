/**
 * Netlify Function: Update Product
 * PUT /.netlify/functions/update-product
 * Body: { id, name, price, description, images, colors, inStock, featured }
 */

import { connectDB, getProductModel } from './db.js'
import mongoose from 'mongoose'

export const handler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { id, name, price, description, instagramLink, images = [], colors = [], inStock, featured } = JSON.parse(event.body)

    // Validate id
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid product ID' }),
      }
    }

    await connectDB()
    const Product = getProductModel()

    // Build update object with only provided fields
    const updateData = {}
    if (name !== undefined) updateData.name = name.trim()
    if (price !== undefined) updateData.price = parseFloat(price)
    if (description !== undefined) updateData.description = description.trim()
    else if (instagramLink !== undefined) updateData.description = instagramLink.trim()
    if (images !== undefined) updateData.images = images.filter((img) => img)
    if (colors !== undefined) updateData.colors = colors.filter((color) => color)
    if (inStock !== undefined) updateData.inStock = Boolean(inStock)
    if (featured !== undefined) updateData.featured = Boolean(featured)

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true }).lean()

    if (!updatedProduct) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Product not found' }),
      }
    }

    // Format response
    const formattedProduct = {
      id: updatedProduct._id.toString(),
      ...updatedProduct,
      _id: undefined,
    }

    console.log('✅ Product updated:', id)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: formattedProduct,
      }),
    }
  } catch (error) {
    console.error('❌ Error updating product:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to update product',
        details: error.message,
      }),
    }
  }
}
