import { products } from '../../data/products'

export default eventHandler((event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined

  let result = products

  if (category) {
    result = products.filter((p) => p.category === category)
  }

  // Return products without full image metadata for the listing (lighter payload)
  return result.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    price: p.price,
    currency: p.currency,
    category: p.category,
    image: p.images.find((i) => i.primary) ?? p.images[0],
    inStock: p.inStock,
    featured: p.featured,
  }))
})
