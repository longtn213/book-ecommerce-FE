import React from 'react'
import Hero from '@/app/components/Home/Hero'
import Companies from '@/app/components/Home/Companies'
import NamesList from '@/app/components/Home/Courses'
import Mentor from '@/app/components/Home/Mentor'
import Testimonial from '@/app/components/Home/Testimonial'
import Newsletter from '@/app/components/Home/Newsletter'
import { Metadata } from 'next'
import ContactForm from './components/Contact/Form'
import ApiOverview from './components/Home/ApiOverview'

export const metadata: Metadata = {
  title: 'BookVerse Commerce',
  description:
    'BookVerse Commerce giúp bạn trải nghiệm toàn bộ quy trình mua sách với các API hiện đại: từ xác thực, giỏ hàng, thanh toán tới gợi ý AI.',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Companies />
      <ApiOverview />
      <NamesList />
      <Mentor />
      <Testimonial />
      <ContactForm />
      <Newsletter />
    </main>
  )
}
