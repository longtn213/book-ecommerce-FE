import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { CourseType } from '@/app/types/course'
import { Hourtype } from '@/app/types/hour'
import { CourseDetailType } from '@/app/types/coursedetail'
import { TestimonialType } from '@/app/types/testimonial'
import { FooterLinkType } from '@/app/types/footerlinks'

const HeaderData: HeaderItem[] = [
  { label: 'Trang chủ', href: '/#home' },
  { label: 'Danh mục sách', href: '/#catalog' },
  { label: 'Bản đồ API', href: '/#api-overview' },
  { label: 'Hành trình khách hàng', href: '/#journey' },
  { label: 'Góc cộng đồng', href: '/#testimonial-section' },
  { label: 'Liên hệ', href: '/#contact' },
  { label: 'Tài liệu', href: '/documentation' },
]

const CourseData: CourseType[] = [
  { name: 'Tất cả sách' },
  { name: 'Tiểu thuyết' },
  { name: 'Kinh doanh' },
  { name: 'Công nghệ' },
  { name: 'Thiếu nhi' },
]

const HourData: Hourtype[] = [
  { name: 'Gợi ý thông minh từ AI' },
  { name: 'Sách bán chạy' },
  { name: 'Mới phát hành' },
  { name: 'Đánh giá cao nhất' },
]

const Companiesdata: { imgSrc: string; name: string }[] = [
  {
    name: 'Penguin Random House',
    imgSrc: '/images/publishers/penguin.svg',
  },
  {
    name: 'HarperCollins',
    imgSrc: '/images/publishers/harper.svg',
  },
  {
    name: 'Simon & Schuster',
    imgSrc: '/images/publishers/simon.svg',
  },
  {
    name: 'Macmillan',
    imgSrc: '/images/publishers/macmillan.svg',
  },
  {
    name: 'Hachette Livre',
    imgSrc: '/images/publishers/hachette.svg',
  },
  {
    name: 'Scholastic',
    imgSrc: '/images/publishers/scholastic.svg',
  },
]

const CourseDetailData: CourseDetailType[] = [
  {
    title: 'The Midnight Library',
    imageSrc:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    author: 'Matt Haig',
    description:
      'Hành trình xuyên qua vô số thực tại giúp độc giả suy ngẫm về những lựa chọn của chính mình.',
    price: '189.000₫',
    category: 'fiction',
    endpoints: ['/api/books', '/api/reviews/book/{bookId}'],
  },
  {
    title: 'Atomic Habits',
    imageSrc:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=70',
    author: 'James Clear',
    description:
      'Bí kíp xây dựng thói quen nhỏ nhưng bền vững, kết nối trực tiếp với trải nghiệm người dùng trong app.',
    price: '215.000₫',
    category: 'selfhelp',
    endpoints: ['/api/user/wishlist', '/api/orders/checkout'],
  },
  {
    title: 'No Rules Rules',
    imageSrc:
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=800&q=80',
    author: 'Reed Hastings',
    description:
      'Câu chuyện Netflix đổi mới mô hình quản trị, phù hợp với nhóm sách kinh doanh hiện đại.',
    price: '245.000₫',
    category: 'business',
    endpoints: ['/api/books/featured', '/api/orders/{orderId}'],
  },
  {
    title: 'Clean Architecture',
    imageSrc:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    author: 'Robert C. Martin',
    description:
      'Định hình kiến trúc phần mềm bền vững dành cho kỹ sư công nghệ.',
    price: '399.000₫',
    category: 'technology',
    endpoints: ['/api/books/search', '/api/admin/books'],
  },
  {
    title: 'The Very Hungry Caterpillar',
    imageSrc:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    author: 'Eric Carle',
    description:
      'Truyện tranh thiếu nhi với hình ảnh sinh động, phù hợp cho chương trình thành viên gia đình.',
    price: '129.000₫',
    category: 'kids',
    endpoints: ['/api/cart/add', '/api/notifications'],
  },
  {
    title: 'Deep Work',
    imageSrc:
      'https://images.unsplash.com/photo-1457694587812-e8bf29a43845?auto=format&fit=crop&w=800&q=80',
    author: 'Cal Newport',
    description:
      'Xây dựng khả năng tập trung sâu giúp độc giả tối ưu thời gian đọc và học.',
    price: '205.000₫',
    category: 'selfhelp',
    endpoints: ['/api/user/notifications', '/api/coupons/apply'],
  },
  {
    title: 'The Lean Startup',
    imageSrc:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
    author: 'Eric Ries',
    description:
      'Bộ công cụ xây dựng sản phẩm tinh gọn, phù hợp với doanh nhân trẻ.',
    price: '275.000₫',
    category: 'business',
    endpoints: ['/api/user/orders', '/api/orders/{orderId}/cancel'],
  },
  {
    title: 'Coding for Kids',
    imageSrc:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    author: 'Adrienne Tacke',
    description:
      'Bộ sách lập trình dành cho trẻ em với bài tập tương tác phong phú.',
    price: '185.000₫',
    category: 'kids',
    endpoints: ['/api/user/wishlist', '/api/orders/checkout'],
  },
  {
    title: 'AI 2041',
    imageSrc:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=700&q=70',
    author: 'Kai-Fu Lee',
    description:
      'Viễn cảnh tương lai của trí tuệ nhân tạo kết hợp giữa khoa học và giả tưởng.',
    price: '289.000₫',
    category: 'technology',
    endpoints: ['/api/ai/chat', '/api/ai/feedback'],
  },
]

const TestimonialData: TestimonialType[] = [
  {
    profession: 'Product Manager tại Readify',
    name: 'Lan Anh',
    imgSrc: '/images/testimonial/user-1.jpg',
    starimg: '/images/testimonial/stars.png',
    detail:
      '“BookVerse giúp đội ngũ của tôi thử nghiệm UX mới nhanh chóng nhờ mô phỏng rõ ràng cách các endpoint vận hành.”',
  },
  {
    profession: 'Lead Engineer tại Sách Xanh',
    name: 'Nam Phan',
    imgSrc: '/images/testimonial/user-2.jpg',
    starimg: '/images/testimonial/stars.png',
    detail:
      '“API giỏ hàng và đơn hàng rõ ràng, dễ dàng tích hợp với hệ thống thanh toán của chúng tôi chỉ trong vài ngày.”',
  },
  {
    profession: 'Growth Marketer tại Mọt Sách',
    name: 'Thảo Trần',
    imgSrc: '/images/testimonial/user-3.jpg',
    starimg: '/images/testimonial/stars.png',
    detail:
      '“Hệ thống thông báo và mã giảm giá giúp chúng tôi tăng 32% tỷ lệ quay lại trong chiến dịch hè.”',
  },
]

const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Khám phá',
    links: [
      { label: 'Trang chủ', href: '/#home' },
      { label: 'Danh mục sách', href: '/#catalog' },
      { label: 'Bản đồ API', href: '/#api-overview' },
      { label: 'Ưu đãi & newsletter', href: '/#join-section' },
    ],
  },
  {
    section: 'Tài khoản',
    links: [
      { label: 'Đăng nhập', href: '/#home' },
      { label: 'Đơn hàng của tôi', href: '/#journey' },
      { label: 'Danh sách yêu thích', href: '/#catalog' },
      { label: 'Thông báo', href: '/#journey' },
    ],
  },
  {
    section: 'Hỗ trợ',
    links: [
      { label: 'Trung tâm trợ giúp', href: '/documentation' },
      { label: 'Điều khoản dịch vụ', href: '/' },
      { label: 'Chính sách bảo mật', href: '/' },
      { label: 'Liên hệ', href: '/#contact' },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    CourseData,
    HourData,
    Companiesdata,
    CourseDetailData,
    TestimonialData,
    FooterLinkData,
  })
}
