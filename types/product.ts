export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  currency: string
  category: string
  images: ProductImage[]
  materials: string[]
  care: string[]
  inStock: boolean
  featured: boolean
  createdAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  width: number
  height: number
  primary: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  slug: string
  name: string
  description: string
}
