export interface Categories {
  can_create_category: boolean
  can_create_topic: boolean
  categories: Category[]
}

export interface Category {
  id: number
  name: string
}
