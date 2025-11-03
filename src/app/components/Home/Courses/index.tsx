'use client'
import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { CourseDetailType } from '@/app/types/coursedetail'
import CourseDetailSkeleton from '../../Skeleton/CourseDetail'

const categories: {
  id: 'all' | 'fiction' | 'business' | 'technology' | 'selfhelp' | 'kids'
  label: string
  icon: string
}[] = [
  { id: 'all', label: 'Tất cả', icon: 'solar:bookshelf-bold-duotone' },
  { id: 'fiction', label: 'Tiểu thuyết', icon: 'mdi:book-open-page-variant' },
  { id: 'business', label: 'Kinh doanh', icon: 'solar:chart-square-bold-duotone' },
  { id: 'technology', label: 'Công nghệ', icon: 'solar:cpu-bolt-bold-duotone' },
  { id: 'selfhelp', label: 'Phát triển bản thân', icon: 'solar:sun-2-bold-duotone' },
  { id: 'kids', label: 'Thiếu nhi', icon: 'mdi:toy-brick' },
]

const NamesList = () => {
  const [courseDetail, setCourseDetail] = useState<CourseDetailType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number]['id']
  >('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch.')
        const data = await res.json()
        setCourseDetail(data.CourseDetailData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'all') return courseDetail
    return courseDetail.filter((book) => book.category === selectedCategory)
  }, [courseDetail, selectedCategory])

  return (
    <section id='catalog'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8'>
          <div>
            <h2 className='font-bold tracking-tight'>Danh mục sách nổi bật</h2>
            <p className='text-black/60 mt-3 max-w-2xl'>
              Chọn nhóm sách để xem trước giao diện danh sách sản phẩm kết nối trực tiếp tới các endpoint /api/books và hệ thống đánh giá.
            </p>
          </div>
          <button className='bg-transparent cursor-pointer hover:bg-primary text-primary font-medium hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300'>
            Tải danh mục đầy đủ
          </button>
        </div>
        <div className='flex nowhitespace space-x-4 rounded-xl bg-white/90 p-2 overflow-x-auto mb-6 shadow-sm'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm sm:text-base transition ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow'
                  : 'text-black/50 hover:text-primary'
              }`}>
              <Icon icon={category.icon} className='text-lg sm:text-xl' />
              {category.label}
            </button>
          ))}
        </div>
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <CourseDetailSkeleton key={i} />
              ))
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <article
                  key={book.title}
                  className='group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg shadow-primary/5 transition hover:-translate-y-1 hover:shadow-primary/20'>
                  <div className='overflow-hidden rounded-t-2xl bg-gray-100'>
                    <Image
                      src={book.imageSrc}
                      alt={book.title}
                      width={600}
                      height={420}
                      className='h-56 w-full object-cover transition duration-500 ease-in-out group-hover:scale-110'
                    />
                  </div>
                  <div className='flex flex-1 flex-col gap-4 p-5'>
                    <div className='flex items-start justify-between gap-3'>
                      <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide'>
                        {categories.find((c) => c.id === book.category)?.label}
                      </span>
                      <span className='text-sm font-semibold text-success'>{book.price}</span>
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-semibold text-black'>{book.title}</h3>
                      <p className='text-sm font-medium text-black/60'>Tác giả: {book.author}</p>
                      <p className='text-sm text-black/70 leading-6'>{book.description}</p>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {book.endpoints.map((endpoint) => (
                        <span
                          key={endpoint}
                          className='rounded-md bg-cream px-2 py-1 text-xs font-mono text-primary border border-primary/20'>
                          {endpoint}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className='text-black/60'>Hiện chưa có sách cho danh mục này.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NamesList
