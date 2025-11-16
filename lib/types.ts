export interface Product {
  id: string
  name: string
  image: string
  secondaryImage: string
  price: number
  description: string
}

export interface Category {
  id: string
  name: string
  image: string
  description: string
}

export interface SearchResponse {
  products: Product[]
}
