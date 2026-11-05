import { products } from '../../../data/products'

export default eventHandler((event) => {
  const slug = event.context.params?.slug as string | undefined

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})
