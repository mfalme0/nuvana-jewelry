import { products } from '../../data/products'

export default eventHandler((event) => {
  const routes = [
    { url: '/' },
    { url: '/products' },
    { url: '/cart' },
    { url: '/checkout' },
  ]

  // Add a route for each product
  products.forEach((product) => {
    routes.push({ url: `/products/${product.slug}` })
  })

  return routes
})
