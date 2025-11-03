import { Icon } from '@iconify/react/dist/iconify.js'

const journey = [
  {
    icon: 'solar:login-2-bold-duotone',
    title: '1. Khởi tạo tài khoản',
    description:
      'Thiết kế màn hình đăng ký, đăng nhập và đổi mật khẩu dựa trên luồng JWT chuẩn để người dùng truy cập BookVerse an toàn.',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/auth/refresh',
      'POST /api/auth/forgot-password',
      'PUT /api/auth/change-password',
    ],
  },
  {
    icon: 'solar:user-rounded-bold-duotone',
    title: '2. Cá nhân hoá hồ sơ',
    description:
      'Cho phép độc giả cập nhật thông tin, quản lý avatar, theo dõi đơn hàng và danh sách yêu thích ngay trong dashboard.',
    endpoints: [
      'GET /api/user/',
      'PUT /api/user/update',
      'POST /api/user/avatar',
      'GET /api/user/orders',
      'GET /api/user/wishlist',
      'POST /api/user/wishlist/{bookId}',
    ],
  },
  {
    icon: 'solar:cart-large-2-bold-duotone',
    title: '3. Giỏ hàng & thanh toán',
    description:
      'Tạo hành trình checkout liền mạch: thêm sách, áp mã giảm giá và tạo đơn hàng chỉ với vài thao tác.',
    endpoints: [
      'POST /api/cart/add',
      'PUT /api/cart/update',
      'POST /api/coupons/apply',
      'POST /api/orders/checkout',
      'PUT /api/orders/{orderId}/cancel',
    ],
  },
  {
    icon: 'solar:bell-bold-duotone',
    title: '4. Chăm sóc sau mua',
    description:
      'Duy trì tương tác với khách hàng bằng thông báo, đánh giá và gợi ý AI để tăng tỷ lệ quay lại.',
    endpoints: [
      'GET /api/notifications/',
      'PUT /api/notifications/{id}/read',
      'POST /api/reviews/book/{bookId}',
      'POST /api/ai/chat',
      'POST /api/ai/feedback',
    ],
  },
]

const Mentor = () => {
  return (
    <section id='journey' className='bg-cream'>
      <div className='container'>
        <div className='flex flex-col sm:flex-row gap-5 justify-between sm:items-end mb-10'>
          <div className='max-w-3xl'>
            <h2 className='font-bold tracking-tight'>Hành trình khách hàng BookVerse</h2>
            <p className='text-lg text-black/60 mt-4'>
              Bốn giai đoạn chính giúp đội ngũ thiết kế bám sát luồng dữ liệu API. Mỗi bước đều liệt kê endpoint tương ứng để bạn chuyển đổi sang wireframe hoặc prototype dễ dàng.
            </p>
          </div>
          <button className='bg-transparent cursor-pointer hover:bg-primary text-primary font-medium hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300'>
            Xem tài liệu chi tiết
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {journey.map((step) => (
            <article
              key={step.title}
              className='rounded-2xl border border-primary/10 bg-white shadow-lg shadow-primary/5 p-6 flex flex-col gap-4'>
              <div className='flex items-center gap-3'>
                <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <Icon icon={step.icon} className='text-2xl' />
                </span>
                <h3 className='text-2xl font-semibold text-black'>{step.title}</h3>
              </div>
              <p className='text-base text-black/70 leading-7'>{step.description}</p>
              <div className='flex flex-wrap gap-2'>
                {step.endpoints.map((endpoint) => (
                  <span
                    key={endpoint}
                    className='rounded-md border border-primary/20 bg-white px-3 py-1 text-xs font-mono text-primary'>
                    {endpoint}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mentor
