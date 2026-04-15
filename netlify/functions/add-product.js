/**
 * Netlify Function: Add Product
 * POST /.netlify/functions/add-product
 * Body: { name, price, description, images, colors, inStock, featured }
 */

import { connectDB, getProductModel } from './db.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { name, price, description, instagramLink, images = [], colors = [], inStock = true, featured = false } = JSON.parse(event.body)

    // Validate required fields
    if (!name || !price) {
      console.error('❌ Missing required fields:', { name, price })
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: name, price' }),
      }
    }

    await connectDB()
    const Product = getProductModel()

    // Create new product
    const newProduct = new Product({
      name: name.trim(),
      price: parseFloat(price),
      description: (description || instagramLink || 'Available on Instagram').trim(),
      images: images.filter((img) => img), // Remove empty strings
      colors: colors.filter((color) => color),
      inStock: Boolean(inStock),
      featured: Boolean(featured),
    })

    const savedProduct = await newProduct.save()

    // Format response
    const formattedProduct = {
      id: savedProduct._id.toString(),
      name: savedProduct.name,
      price: savedProduct.price,
      description: savedProduct.description,
      images: savedProduct.images,
      colors: savedProduct.colors,
      inStock: savedProduct.inStock,
      featured: savedProduct.featured,
      createdAt: savedProduct.createdAt,
    }

    console.log('✅ Product added:', formattedProduct.id)

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        data: formattedProduct,
      }),
    }
  } catch (error) {
    console.error('❌ Error adding product:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to add product',
        details: error.message,
      }),
    }
  }
}
