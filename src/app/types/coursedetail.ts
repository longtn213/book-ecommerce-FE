export type CourseDetailType = {
  title: string
  imageSrc: string
  author: string
  description: string
  price: string
  category: 'fiction' | 'business' | 'technology' | 'selfhelp' | 'kids'
  endpoints: string[]
}
